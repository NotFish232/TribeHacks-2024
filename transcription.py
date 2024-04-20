import speech_recognition as sr # type: ignore

def audio_to_text(audio_name) -> str:
    r = sr.Recognizer()
    with sr.AudioFile(audio_name) as source:
        audio_data = r.record(source)
      
        text = r.recognize_google(audio_data)

        return text