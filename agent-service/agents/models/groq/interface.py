import os
from pathlib import Path
from dotenv import load_dotenv
from langchain_groq import ChatGroq

BASE_DIR = Path(__file__).resolve().parent
env_path = str(Path(BASE_DIR, '.env.dev'))
# print(str(Path(BASE_DIR, '.env')))

load_dotenv(env_path)

GROQ_API = os.getenv("GROQ_API")

temperature = 1

if GROQ_API:
    pass
    # print("API Key loaded successfully")
else:
    pass
    # print("API Key not found!")


def init_groq(model):
    llm = ChatGroq(
        model=model,
        api_key=GROQ_API,
        temperature=temperature
    )
    # print("groq initialized successfully")
    return llm
