import re
import json
from flask import Flask, request, jsonify
import joblib
import googleapiclient.discovery
import googleapiclient.errors
import os
from dotenv import load_dotenv,dotenv_values
from flask_cors import CORS
import google.generativeai as genai


app = Flask(__name__)
# Load the sentiment analysis model

svm_model = joblib.load("svm_model.joblib")
CORS(app)
load_dotenv()

# Access DEVELOPER_KEY from environment variable
DEVELOPER_KEY = os.getenv("DEVELOPER_KEY")
API_KEY_AI = os.getenv("API-KEY")


# Check if keys are loaded correctly
if not DEVELOPER_KEY or not API_KEY_AI:
    raise ValueError("API keys are not set properly in the environment variables.")

# Set up the YouTube API
api_service_name = "youtube"
api_version = 'v3'
Developer_key = DEVELOPER_KEY


youtube = googleapiclient.discovery.build(
    api_service_name, api_version, developerKey=Developer_key
)

def get_youtube_comments(video_id, max_results=2000):
    request = youtube.commentThreads().list(
        part='snippet',
        videoId=video_id,
        maxResults=max_results
    )
    res = request.execute()

    comments = []
    for item in res.get('items', []):
        comment_text = item['snippet']['topLevelComment']['snippet']['textDisplay']
        comments.append(comment_text)

    return comments

def predict_sentiment(comments):
    predictions = svm_model.predict(comments)
    return predictions.tolist()

@app.route('/get_comments', methods=['POST'])
def get_comments():
    try:
        # Get input data from the request
        data = request.get_json(force=True)
        
        # Assuming 'videoId' is the input YouTube video ID
        video_id = data.get('videoId')

        # Get comments from YouTube API
        comments = get_youtube_comments(video_id)

        # Predict sentiment for each comment
        predictions = predict_sentiment(comments)

        # Combine comments with predictions
        result = [{'comment': comment, 'sentiment': sentiment} for comment, sentiment in zip(comments, predictions)]

        # Return result as JSON
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)})

@app.route('/AnalysisWithAi', methods=['POST'])
def hello_world():
    try:
        # Accessing environment variable
        genai.configure(api_key = API_KEY_AI)
        
        data = request.json

        # Access the array of messages
        messages = data.get('messages',[])
        print(messages)
        
        # Create a new conversation
        response = genai.chat(messages=f'{messages} \n take this messages and give best 7 suggestions to how to impove My youtube content based on this negative comments and give all suggestions and every suggestion with discription compulsory json data and return array of json')
        print(response.last,"__________")
        
        # Use regular expression to extract JSON data
        json_data = re.search(r'```json\n(.*?)\n```', response.last, re.DOTALL).group(1)

        # Parse the JSON data
        parsed_data = json.loads(json_data)
            
        # Return the last response from the model as JSON
        return jsonify({'data':json.loads(json.dumps(parsed_data, indent=2))})
    except Exception as e:
        # Handle any errors and return JSON data with error message
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(port=5000, debug=True)
