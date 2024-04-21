# <center>Forge: An Educational Tool</center>

<center>Level up your studying by playing interactive trivia games

constructed straight from your lecture recordings and notes!</center>

### Inspiration
The inspiration for this project came from websites such as Quizlet, which uses keywords and definitions to make games. However, it was time-consuming to manually input all the keywords and their definitions, especially for longer lectures. Our vision was to make a way to easily input text or audio and play a fun game based on the generated keywords and definitions.

### What it does
Forge takes in an audio file, such as a lecture recording, or text, such as notes, and converts it into a set of keywords and definitions. If the file is an audio file, it will use OpenAI's whisper model to transcribe the audio file. At that point, the two input methods converge. Our code will convert the text to a dictionary of keywords with their definitions. Forge will use this dictionary to make questions for the game. The game itself has a hammer slowly falling towards poor Clawdius. The only way to save him is to connect the term with the correct definition! If the user fails or runs out of time, poor Clawdius gets smooshed. Fail three times, and it's game over!

### How we built it
We used hand-made assets using Adobe Photoshop. To make the website and interface, we used Flask, HTML, JavaScript, and Tailwind to take in the data and display the game. Using the Whisper model, we were able to turn .wav files into a text transcript, but if we were given a .txt file or manual input, we would use that instead. From this, we would leverage prompt engineering to extract the keywords from the lecture and find suitable definitions for such keywords. We would then use these keywords and definitions as questions/answers for the game.

### Challenges we ran into
This was our first time making animations and music, so we had to learn it from scratch. Additionally, at first, we used the SpeechRecognition library to try to process audio. However, it took too long to process the files. Because of this, we had to go back to square one and do more research, eventually finding the Whisper model. Learning Tailwind for the first time was also a daunting challenge.

### Accomplishments that we're proud of
We managed to make polished animations and music from scratch! Our website looks clean and has a user-friendly interface. We genuinely believe our product can help students learn better, easier, and in a more fun way. With our product, students don't have to worry about missing a lecture or studying for a quiz! Lastly, we process the audio and text files quickly.

### What we learned
On the asset side, we learned animation with Photoshop and how to make music. On the website side, we learned Tailwind and how to integrate all the parts of the website. Lastly, on the back-end side, we learned how to implement the Whisper model and parse text into keywords and definitions.

### What's next for Forge
We want to make more types of games, such as a Monopoly-like board game or a memory-matching game. We could also implement many quality-of-life features in the future, such as saving the data, sharing with friends, and leaderboards.

#### Built With
`flask` `html5` `javascript` `jquery` `openai` 
`photoshop` `python` `tailwind` `whisper`
