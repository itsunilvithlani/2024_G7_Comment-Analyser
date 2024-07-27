import os
import google.generativeai as genai

# Accessing environment variable

genai.configure(api_key="AIzaSyCfKuk2qFxV_VKlnwrO72T2JBG063fJLKQ")

# Create a new conversation
response = genai.chat(messages='No i am give some comment and that comment based can you give how impove youtube content')

# Last contains the model's response:
print(response.last)

