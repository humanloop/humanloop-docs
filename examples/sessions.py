from humanloop import ChatMessage, PromptKernelRequest
from humanloop.client import Humanloop


"""
# Humanloop sessions tutorial example
Given a user request, the code does the following:
1. Checks if the user is attempting to abuse the AI assistant.
2. Looks up Google for helpful information.
3. Answers the user's question.
V1 / 2
This is the initial version of the code.
"""
import os
from dotenv import load_dotenv
load_dotenv()


HUMANLOOP_API_KEY = os.getenv("HUMANLOOP_API_KEY")
if HUMANLOOP_API_KEY is None:
    raise ValueError("HUMANLOOP_API_KEY not found in environment variables")


hl = Humanloop(api_key=HUMANLOOP_API_KEY, base_url="https://neostaging.humanloop.ml/v5")

print(hl.prompts.list())




