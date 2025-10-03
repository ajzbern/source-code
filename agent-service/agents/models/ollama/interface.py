import os
from pathlib import Path
from dotenv import load_dotenv
from langchain_ollama import OllamaLLM

temperature = 1


def init_ollama(model):
    llm = OllamaLLM(
        model=model,
        temperature=temperature,
        format="json"
    )
    # print("LLM initialized successfully")
    return llm
