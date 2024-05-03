
# to_markdown(response.text)

import google.generativeai as genai

genai.configure(api_key="api_key")

# Create a new conversation
response = genai.chat(messages='give 5 richest person name but in json formated')

# Last contains the model's response:
print(response.last)