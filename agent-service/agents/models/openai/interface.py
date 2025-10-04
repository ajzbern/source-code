import os
from pathlib import Path
from dotenv import load_dotenv
from langchain_openai import OpenAI

BASE_DIR = Path(__file__).resolve().parent
env_path = str(Path(BASE_DIR, '.env.dev'))

load_dotenv(env_path)

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

temperature = 1

if OPENAI_API_KEY:
    pass
    # print("API Key loaded successfully")
else:
    pass
    # print("API Key not found!")


def init_openai(model):
    llm = OpenAI(
        model=model,
        api_key=OPENAI_API_KEY,
        temperature=temperature
    )
    # print("openai initialized successfully")
    return llm


