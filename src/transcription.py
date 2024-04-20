import speech_recognition as sr # type: ignore
import os 
from pydub import AudioSegment
import time

def chunked_audio_to_text(audio_name) -> str:
    r = sr.Recognizer()
    with sr.AudioFile(audio_name) as source:
        audio_data = r.record(source)
      
        text = r.recognize_google(audio_data)

        return text
    
def audio_to_text(path, minutes=1/6):
    """Splitting the large audio file into fixed interval chunks
    and apply speech recognition on each of these chunks"""
    sound = AudioSegment.from_file(path)  
    chunk_length_ms = int(1000 * 60 * minutes)
    chunks = [sound[i:i + chunk_length_ms] for i in range(0, len(sound), chunk_length_ms)]
    folder_name = "audio-chunks"
    if not os.path.isdir(folder_name):
        os.mkdir(folder_name)
    whole_text = ""
    # process each chunk 
    for i, audio_chunk in enumerate(chunks, start=1):
        chunk_filename = os.path.join(folder_name, f"chunk{i}.wav")
        audio_chunk.export(chunk_filename, format="wav")
        try:
            text = chunked_audio_to_text(chunk_filename)
        except sr.UnknownValueError as e:
            print("Error:", str(e))
        else:
            text = f"{text.capitalize()}. "
            # print(chunk_filename, ":", text)
            whole_text += text
    return whole_text

# start = time.time()
# print(audio_to_text("7601-291468-0006.wav"))
# print(time.time() - start)