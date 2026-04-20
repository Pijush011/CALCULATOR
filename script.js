let display = document.getElementById("display");
let aiBox = document.getElementById("aiBox");
let history = document.getElementById("history");

// Input
function append(val) {
  display.value += val;
  aiSuggest();
}

function clearDisplay() {
  display.value = "";
}

// AI Suggestion (simple intelligence)
function aiSuggest() {
  let val = display.value;

  if (val.includes("++") || val.includes("--")) {
    aiBox.innerText = "⚠️ Invalid operator sequence";
  } else if (val.includes("/0")) {
    aiBox.innerText = "⚠️ Division by zero risk";
  } else if (val.length > 10) {
    aiBox.innerText = "💡 Complex calculation detected";
  } else {
    aiBox.innerText = "AI ready...";
  }
}

// Calculate
function calculate() {
  try {
    let result = eval(display.value);
    addHistory(display.value + " = " + result);
    display.value = result;
    aiBox.innerText = "✅ Calculated successfully";
  } catch {
    aiBox.innerText = "❌ Error in expression";
  }
}

// History
function addHistory(text) {
  let li = document.createElement("li");
  li.innerText = text;
  history.prepend(li);
}

// Voice input
function voiceInput() {
  let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.start();

  recognition.onresult = function(e) {
    let text = e.results[0][0].transcript;
    display.value = text.replace(/plus/g, "+").replace(/minus/g, "-");
    aiBox.innerText = "🎙️ Voice input received";
  }
}