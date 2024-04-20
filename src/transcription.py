from openai import OpenAI
import time

def audio_to_text(path) -> str:
    client = OpenAI()

    audio_file= open(path, "rb")

    transcription = client.audio.transcriptions.create(
        model="whisper-1", 
        file=audio_file
    )

    return transcription.text

# start = time.time()
# # text = audio_to_text("presentation.wav")
# text = audio_to_text("presentation.wav")
# print(text)
# # print(text_to_keywords(text))
# print(time.time() - start)