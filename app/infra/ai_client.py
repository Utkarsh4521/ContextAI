
        
# import os
# from google import genai
# from google.genai import types

# class AIChatMessage:
#     def __init__(self, role, content):
#         self.role = role
#         self.content = content

# class OpenAIClient:
#     def __init__(self, system_prompt):
#         # Nayi library ke sath client initialization
#         self.client = genai.Client(api_key=os.getenv("GOOGLE_API_KEY"))
#         self.system_prompt = system_prompt

#     def chat(self, prompt, history=None):
#         try:
#             # History format prepare karna
#             contents = []
#             if history:
#                 for msg in history:
#                     role = "user" if msg.role == "user" else "model"
#                     contents.append(types.Content(role=role, parts=[types.Part.from_text(text=msg.content)]))
            
#             # Naya prompt add karna
#             contents.append(types.Content(role="user", parts=[types.Part.from_text(text=prompt)]))
            
#             # Response generate karna (Gemini 2.0 Flash best hai abhi)
#             response = self.client.models.generate_content(
#                 model="gemini-2.0-flash",
#                 contents=contents,
#                 config=types.GenerateContentConfig(system_instruction=self.system_prompt)
#             )
#             return response.text
#         except Exception as e:
#             print(f"Gemini API Error: {e}")
#             return "Sorry, I am having trouble connecting to the AI model right now."

import os
from google import genai
from google.genai import types

class AIChatMessage:
    def __init__(self, role, content):
        self.role = role
        self.content = content

class OpenAIClient:
    def __init__(self, system_prompt):
        # Nayi library client initialize karega automatically check karke GOOGLE_API_KEY env var
        self.client = genai.Client()
        self.system_prompt = system_prompt
        # Gemini 3.5 Flash use karenge jo tumhari list mein active dikh raha hai
        self.model_name = "gemini-3.5-flash" 

    def chat(self, prompt, history=None):
        try:
            # History ko sahi formats mein map karo
            contents = []
            if history:
                for msg in history:
                    role = "user" if msg.role == "user" else "model"
                    contents.append(
                        types.Content(
                            role=role, 
                            parts=[types.Part.from_text(text=msg.content)]
                        )
                    )
            
            # Current message add karo
            contents.append(
                types.Content(
                    role="user", 
                    parts=[types.Part.from_text(text=prompt)]
                )
            )
            
            # API Call latest Gemini 3.5 Flash ke sath
            response = self.client.models.generate_content(
                model=self.model_name,
                contents=contents,
                config=types.GenerateContentConfig(
                    system_instruction=self.system_prompt
                )
            )
            return response.text
            
        except Exception as e:
            print(f"Gemini API Error: {e}")
            return "Sorry, I am having trouble connecting to the AI model right now."