import speech_recognition as sr
import os 
from pydub import AudioSegment

def chunked_audio_to_text(audio_name) -> str:
    r = sr.Recognizer()
    with sr.AudioFile(audio_name) as source:
        audio_data = r.record(source)

        text = r.recognize_google(audio_data)

        return text

def speech_recognition_audio_to_text(path, minutes=1/6):
    """Splitting the large audio file into fixed interval chunks
    and apply speech recognition on each of these chunks"""
    sound = AudioSegment.from_file(path)  
    chunk_length_ms = int(1000 * 60 * minutes)
    chunks = [sound[i:i + chunk_length_ms] for i in range(0, len(sound), chunk_length_ms)]
    # chunks = split_on_silence(sound,
    #     # experiment with this value for your target audio file
    #     min_silence_len = 500,
    #     # adjust this per requirement
    #     silence_thresh = sound.dBFS-14,
    #     # keep the silence for 1 second, adjustable as well
    #     keep_silence=500,
    # )
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