// static/js/script.js
const dropArea = document.getElementById("drop-area");
const fileInput = document.getElementById("fileElem");
const preview = document.getElementById("preview");
const spinner = document.getElementById("spinner");
const captionOutput = document.getElementById("caption-output");

// Drag & Drop Styling
['dragenter', 'dragover'].forEach(event => {
  dropArea.addEventListener(event, e => {
    e.preventDefault();
    e.stopPropagation();
    dropArea.classList.add("highlight");
  });
});

['dragleave', 'drop'].forEach(event => {
  dropArea.addEventListener(event, e => {
    e.preventDefault();
    e.stopPropagation();
    dropArea.classList.remove("highlight");
  });
});

// Drop handler
dropArea.addEventListener("drop", handleDrop);
dropArea.addEventListener("click", () => fileInput.click());
fileInput.addEventListener("change", () => handleFiles(fileInput.files));

function handleDrop(e) {
  const dt = e.dataTransfer;
  const files = dt.files;
  handleFiles(files);
}

function handleFiles(files) {
  const file = files[0];
  if (!file || !file.type.startsWith("image/")) return;
  previewFile(file);
  uploadFile(file);
}

function previewFile(file) {
  const reader = new FileReader();
  reader.onloadend = () => {
    preview.src = reader.result;
    preview.classList.remove("d-none");
  };
  reader.readAsDataURL(file);
}

function uploadFile(file) {
  spinner.classList.remove("d-none");
  captionOutput.textContent = "";

  const formData = new FormData();
  formData.append("file", file);

  fetch("/", {
    method: "POST",
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    spinner.classList.add("d-none");
    captionOutput.textContent = `📝 ${data.caption}`;
    speak(data.caption);
  })
  .catch(err => {
    spinner.classList.add("d-none");
    captionOutput.textContent = "Error generating caption.";
    console.error(err);
  });
}

function speak(text) {
  if ('speechSynthesis' in window) {
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 1;
    utter.pitch = 1;
    speechSynthesis.speak(utter);
  }
}
