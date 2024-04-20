import speech_recognition as sr

def audio_to_text(audioName) -> str:
    r = sr.Recognizer()
    with sr.AudioFile(audioName) as source:
        # listen for the data (load audio to memory)
        audio_data = r.record(source)
        # recognize (convert from speech to text)
        text = r.recognize_google(audio_data)
        print(text)


filename = "16-122828-0002.wav"
audio_to_text(filename)