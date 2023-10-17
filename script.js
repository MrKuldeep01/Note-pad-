let themeBtn = document.getElementById("themeToggle");
let textBox = document.getElementById("textArea");
const saveBtn = document.getElementById("saveBtn");
const deleteBtn = document.getElementById("closeBtn");
const editBtn = document.getElementById("editBtn");

themeBtn.addEventListener("click", () => {
  textBox.classList.toggle("darkTheme");
});

function saveNotes() {
  let textBox = document.getElementById("textArea").value;
  const userFile = prompt("enter file");
  localStorage.setItem(userFile, textBox);

  document.getElementById("textArea").value = "";
}

saveBtn.addEventListener("click", saveNotes);
