let themeBtn = document.getElementById("themeToggle");
let textBox = document.getElementById("textArea");
const saveBtn = document.getElementById("saveBtn");
const deleteBtn = document.getElementById("closeBtn");
const editBtn = document.getElementById("editBtn");
let textvalue = document.getElementById("textArea").value;

themeBtn.addEventListener("click", () => {
  textBox.classList.toggle("darkTheme");
});

function saveNotes() {
  let savepage = document.createElement("div");
  savepage.classList.add('savepage');
  savepage.innerHTML = `<div class="savefield">
  <label for="userFile">Write file name :</label>
  <input type="text" id="userFile" placeholder="write name here...">
<div class="savepagebtn">
<button id="finelsavebtn">SAVE</button>
<button id="closesavebtn">CLOSE</button>
</div>
</div>`;
  document.body.appendChild(savepage);
  console.log('done');
  let userFile= document.getElementById('userFile');
  // const userFile = prompt("enter file");
  localStorage.setItem(userFile, encodeURIComponent(textvalue));
  document.getElementById("textArea").value = "";
  alert(`data saved with Key :${userFile}`);
}

saveBtn.addEventListener("click", saveNotes);
