// const newMessage = ` 
//   <div class="row last-row">
//     <img class="avatar" src="images/avatar-1.jpg" />
//     <div class="text-container">
//       <h6>John Doe</h6>
//       <p>New message</p>
//     </div>
//     <span class="delete">✖</span>
//   </div>
// `;

// document.querySelector('#msg-container').innerHTML += newMessage;

const messagesCount = document.querySelectorAll('p').length;
document.querySelector('#count').textContent = messagesCount;

let year = new Date().getUTCFullYear();
let month;
let day;

if (new Date().getMonth() < 9) {
  month = "0" + (new Date().getMonth() + 1);
} else {
  month = new Date().getMonth() + 1;
}

if (new Date().getDate() < 9) {
  day = "0" + new Date().getDate();
} else {
  day = new Date().getDate();
}

const date = year + "-" + month + "-" + day;
document.querySelector('#footer').innerHTML += `<span id="date">${date}</span>`;

const counter = document.querySelector("#count");
const newMessageField = document.querySelector("#add-message");
const searchField = document.querySelector("#search-message");
const messageContainer = document.querySelector("#msg-container");

function deleteMessage(message) {
  message.remove();
  updateMessageCounter();
}

function updateMessageCounter() {
  counter.textContent = document.querySelectorAll(".row").length;
}

function updateBoundaryClasses(){
  const messages = document.querySelectorAll('.row');  
  for(let i = 0; i < messages.length - 1; i++) {      
    messages[i].classList.remove('last-row');
    messages[i].classList.add('row');
  }
  messages[messages.length - 1].classList.add('row');
  messages[messages.length - 1].classList.add('last-row');  
}

function addNewMessage(message) {
  messageContainer.innerHTML +=
  `
    <div class="row">
      <img class="avatar" src="images/avatar-1.jpg" />
        <div class="text-container">
          <h6>Asen Iliev</h6>
          <p>` +
      message +
      `</p>
        </div>
      <span class="delete">✖</span>
    </div>
  `;
  updateMessageCounter();
  updateBoundaryClasses()
}

function initializeNewMessageField() {
  newMessageField.value = "";
  newMessageField.setAttribute("placeholder", " 📩 New message...");
}

function initializeSearchField() {
  searchField.value = "";
  searchField.setAttribute("placeholder", " 🔎 Search message...");
}

function addDeleteEventListener() {
  const delButtons = document.querySelectorAll(".delete");
  for (let i = 0; i < delButtons.length; i++) {
    delButtons[i].addEventListener("click", function () {
      console.log(this);
      deleteMessage(this.parentNode);
    });
  }
}

function visualizeAllMessages(){
  const allMessages = document.querySelectorAll('.row');
  for(let i = 0; i < allMessages.length; i++){
    allMessages[i].style.display = '';
  }
}

//updateBoundaryClasses();

document.querySelector("#btn-add").addEventListener("click", function () {
  const message = newMessageField.value;
  console.log(message);
  addNewMessage(message);
  initializeNewMessageField();
  addDeleteEventListener();
});

addDeleteEventListener();

document.querySelector("#btn-search").addEventListener("click", function () {
  const textToCompare = searchField.value.toLowerCase();
  if (textToCompare !== "") {
    const messages = document.querySelectorAll("h6");
    for (let i = 0; i < messages.length; i++) {
      if (!messages[i].textContent.toLowerCase().includes(textToCompare)) {
        messages[i].parentNode.parentNode.style.display = 'none';
      }
      else{
        messages[i].parentNode.parentNode.style.display = '';
      }
    }
    initializeSearchField();
  } else {
    visualizeAllMessages();
  }
});
