let addBtn = document.getElementById("addBtn");
let itemsBox = document.getElementById("itemsArea");
let themeBtn = document.getElementById("themeToggle");
let newpage = document.querySelector(".newpage");

// console.log(cancelbtn);

let localStoreItems = [];

// ------------------- theme function---------------
themeBtn.addEventListener("click", themeTogglefun);
function themeTogglefun() {
  itemsBox.classList.toggle("darkTheme");
}

// ------------------------ add new text page ---------------------
addBtn.addEventListener("click", newPagefun);

function newPagefun() {
  // ------------ hide add btn -------
  // location = "/newpage.html";
  addBtn.style.visibility = "hidden";
  let textdiv = document.createElement("div");
  textdiv.classList = "textdiv";
  textdiv.innerHTML = `
  <textarea name="Note-Pad" id="textArea" placeholder="| Text here to add things or click to continue"
    class="lightTheme textArea" spellcheck="true" autocomplete="language" autocorrect="true"></textarea>
  <div class="newpagebtn">
       <button class="cancelBtn buttons" id="cancelBtn">-</button>
       <button class="saveBtn buttons" id="saveBtn">✔</button>
  </div>
`;
  document.body.appendChild(textdiv);
  itemsBox.style.opacity = ".2";

  textdiv.style.display = "flex";
  let textBox = document.getElementById("textArea");
  let cancelbtn = document.getElementById("cancelBtn");
  cancelbtn.addEventListener("click", hidetextdiv);
  function hidetextdiv() {
    textdiv.style.display = "none";
    itemsBox.style.opacity = "1";
  addBtn.style.visibility = "visible";

  }
  let savebtn = document.getElementById("saveBtn");
  savebtn.addEventListener("click", savefun);
  function savefun() {
    textdiv.style.display = "none";
    let localContent = textBox.value;
    let saveCard = document.createElement("div");
    saveCard.classList = "savefield";
    saveCard.style.display = "flex";

    saveCard.innerHTML = ` 
           
        <input type="text" id="localkey" placeholder="file name">
        <div class="savepagebtn">
            <button id="submitbtn">SAVE</button>
            <button id="exitbtn">CLOSE</button>
        </div>`;
    document.body.appendChild(saveCard);
    let submitbtn = document.getElementById("submitbtn");
    let exitbtn = document.getElementById("exitbtn");
    submitbtn.addEventListener("click", submitfun);
    exitbtn.addEventListener("click", hideSaveCard);

    function hideSaveCard() {
      saveCard.style.display = "none";
      itemsBox.style.opacity = "1";
    }
    function submitfun() {
      let localkey = document.getElementById("localkey").value;
      // let localkey = prompt("To save data ", " file name");
      localStorage.setItem(localkey, localContent);
      alert("data saved with the name : " + localkey);
      console.log(
        localStorage.getItem(localkey),
        ": data is saved with id : " + localkey
      );
      localkey = "";
      localContent = "";
      hideSaveCard();
    }
    submitbtn.addEventListener("click", hideSaveCard);
    storedItems();
  }
}

function storedItems() {
  if (localStorage.length > 0) {
    // Check if there are items in localStorage
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);

      // Create a container for each item
      let itemContainer = document.createElement("div");
      itemContainer.classList = "items";

      itemContainer.innerHTML = `
        <div class="left">
          <h3 class="itemname">${key}</h3>
        </div>
        <div class="right">
          <button class="editBtn editdeletebtn" id="editBtn">🖊</button>
          <button class="deleteBtn editdeletebtn" id="deleteBtn">X</button>
        </div>`;

      itemsBox.appendChild(itemContainer);

      // Attach event listener to delete button
      const deleteButton = itemContainer.querySelector("#deleteBtn");
      deleteButton.addEventListener("click", () => {
        localStorage.removeItem(key);
        itemContainer.remove();
      });

      const editButton = itemContainer.querySelector("#editBtn");
      editButton.addEventListener("click", () => {
        const editData = localStorage.getItem(key);
        console.log(editData);
        let textdiv = document.createElement("div");
        textdiv.classList = "textdiv";
        textdiv.innerHTML = `
        <textarea name="Note-Pad" id="textArea" placeholder="| Text here to add things or click to continue"
          class="lightTheme textArea" spellcheck="true" autocomplete="language" autocorrect="true">${editData}</textarea>
        <div class="newpagebtn">
             <button class="cancelBtn buttons" id="cancelBtn">-</button>
             <button class="saveBtn buttons" id="saveBtn">✔</button>
        </div>
      `;
        document.body.appendChild(textdiv);
        textdiv.style.display = "flex";
        let textBox = document.getElementById("textArea");
        let cancelbtn = document.querySelector(".cancelBtn");
        cancelbtn.addEventListener("click", hidetextdiv);
        function hidetextdiv() {
          cancelbtn.style.visibility = "hidden";
          savebtn.style.visibility = "hidden";
          textdiv.style.display = "none";
        }
        let savebtn = document.querySelector(".saveBtn");
        savebtn.addEventListener("click", savefun);
        function savefun() {
          textdiv.style.display = "none";

          let localContent = textBox.value;
          let saveCard = document.createElement("div");
          saveCard.classList = "savefield";
          saveCard.style.display = "flex";

          saveCard.innerHTML = ` 
                  <!--<label for="userFile">To save data</label> -->
              <input type="text" id="localkey" placeholder="file name">
              <div class="savepagebtn">
                  <button id="submitbtn">SAVE</button>
                  <button id="exitbtn">CLOSE</button>
              </div>`;
          document.body.appendChild(saveCard);
          let submitbtn = document.getElementById("submitbtn");
          let exitbtn = document.getElementById("exitbtn");
          submitbtn.addEventListener("click", submitfun);
          exitbtn.addEventListener("click", hideSaveCard);

          function hideSaveCard() {
            saveCard.style.display = "none";
          }
          function submitfun() {
            let localkey = document.getElementById("localkey").value;

            console.log(localkey);
            // let localkey = prompt("To save data ", " file name");
            localStorage.setItem(localkey, localContent);
            alert("data saved with the name " + localkey);
            console.log(
              localStorage.getItem(localkey),
              "your data is saved with id" + localkey
            );
            localkey = "";
            localContent = "";
            hideSaveCard();
          }
          submitbtn.addEventListener("click", hideSaveCard);
          storedItems();
        }
      });
    }

    // Create a "Delete all" button
    let allDeleteBtn = document.createElement("button");
    allDeleteBtn.classList = "alldeletebtn button";
    allDeleteBtn.innerText = "Delete all";
    allDeleteBtn.style.display = "static";
    itemsBox.appendChild(allDeleteBtn);

    allDeleteBtn.addEventListener("click", () => {
      localStorage.clear();
      itemsBox.innerHTML = ""; // Clear all items from the display
    });
  } else {
    // If localStorage is empty, show a message
    // allDeleteBtn.style.display="none";
    let emptyBox = document.createElement("div");
    emptyBox.classList = "emptybox";
    emptyBox.innerHTML = `
      <p>Empty</p>
      <p>Click on the add button to add items</p>`;
    itemsBox.appendChild(emptyBox);
  }
}

storedItems();
