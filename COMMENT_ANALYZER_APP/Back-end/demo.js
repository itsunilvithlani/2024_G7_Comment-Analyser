import requests

api_key = 'your-api-key-here'
endpoint = 'https://api.openai.com/v1/completions'

headers = {
    'Content-Type': 'application/json',
    'Authorization': f'Bearer {api_key}',
}

data = {
    'model': 'text-davinci-003',  # Choose the model you want to use
    'prompt': 'Once upon a time,',
    'max_tokens': 50,  # Adjust based on desired length of completion
}

response = requests.post(endpoint, headers=headers, json=data)

if response.status_code == 200:
    completion = response.json()['choices'][0]['text']
    print(completion)
else:
    print('Error:', response.text)
