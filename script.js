let word = "";
let sentence = "";
let keyDownTime = 0;
let text = document.getElementById("main_text");
let timeout;
let speak_timeout;
let voice_option = 160;

document.addEventListener("keydown", function (event) {
  clearTimeout(timeout);
  let nowTime = Date.now();
  let delay = nowTime - keyDownTime;

  if (delay > 50) {
    word = "";
  }

  switch (event.key) {
    case "Backspace":
      text.textContent = "";
      sentence = sentence.slice(0, -1);
    case "Escape":
      sentence = "";
      text.textContent = "";
    case "Enter":
      speak_text(sentence);
  }
  if (event.key.length > 2) {
    console.log(event.key);
    return;
  }

  word += event.key;
  text.textContent = word;

  //animation
  text.classList.add("active");
  setTimeout(() => {
    text.classList.remove("active");
  }, 100);

  //speak sentence making
  timeout = setTimeout(() => {
    if (word.length == 1) {
      word = word.toLowerCase();
    }
    sentence += word;
    //speak_text(sentence);
  }, 50);
  speak_timeout = setTimeout(() => {
    speak_text(sentence);
  }, 1000);

  keyDownTime = Date.now();
});

//speech
let synth = null;
if ("speechSynthesis" in window) {
  synth = window.speechSynthesis;
} else {
  // Web Speech API is not supported
  alert("Sorry, your browser does not support text-to-speech.");
}

function speak_text() {
  if (sentence) {
    text.textContent = sentence;
    console.log(sentence);

    const utterance = new SpeechSynthesisUtterance(sentence);
    const voices = synth.getVoices();
    console.log(voices);
    utterance.voice = voices[voice_option];
    synth.speak(utterance);
    sentence = "";
  }
}
