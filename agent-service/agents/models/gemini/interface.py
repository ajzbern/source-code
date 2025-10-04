import os
from pathlib import Path
from dotenv import load_dotenv
from langchain_google_genai import GoogleGenerativeAI

BASE_DIR = Path(__file__).resolve().parent
env_path = str(Path(BASE_DIR, '.env.dev'))
# print(str(Path(BASE_DIR, '.env')))

load_dotenv(env_path)

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")


if GOOGLE_API_KEY:
    pass
    # print("API Key loaded successfully")
else:
    pass
    # print("API Key not found!")


def init_gemini(temperature=1):
    gemini = GoogleGenerativeAI(
        model="gemini-2.0-flash",
        temperature=temperature,
        api_key=GOOGLE_API_KEY
    )
    # print("Gemini initialized successfully")
    return gemini
