from openai import OpenAI
import time
from .generator import text_to_keywords


def audio_to_text(path: str) -> str:
    client = OpenAI()

    audio_file= open(path, "rb")

    transcription = client.audio.transcriptions.create(
        model="whisper-1", 
        file=audio_file
    )

    return transcription.text
