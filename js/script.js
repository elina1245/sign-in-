
const form = document.querySelector("form");
const submitBtn = document.getElementById("submit-btn");


const tableBody = document.querySelector(".contactlist");

let editMode = false;
let currentRow = null;


window.addEventListener("load", () => {
  loadContacts();
});


form.addEventListener("submit", function (event) {
  
  event.preventDefault();

 
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;

  if (editMode) {
   
    currentRow.cells[1].textContent = name;
    currentRow.cells[2].textContent = phone;
    currentRow.cells[3].textContent = email;
    saveContacts();
    currentRow = null;
    editMode = false;
    submitBtn.textContent = "submit";
  } else {
    
    const newRow = document.createElement("tr");

    
    newRow.innerHTML = `
            <td>${tableBody.children.length + 1}</td>
            <td>${name}</td>
            <td>${phone}</td>
            <td>${email}</td>
            <td>${new Date().toLocaleDateString()}</td>
            <td>
                <button class="btn bg-primary btn-edit text-white m-2">Edit</button>
                <button class="btn bg-danger btn-delete text-white">Delete</button>
            </td>
        `;

    
    tableBody.appendChild(newRow);

    newRow.querySelector(".btn-edit").addEventListener("click", function () {
      editContact(newRow);
    });

    newRow.querySelector(".btn-delete").addEventListener("click", function () {
      deleteContact(newRow);
    });

    saveContacts();
  }

  
});

function updateRowNumbers() {
  const rows = tableBody.getElementsByTagName("tr");
  for (let i = 0; i < rows.length; i++) {
    rows[i].cells[0].textContent = i + 1;
  }
}

function saveContacts() {
  const rows = tableBody.getElementsByTagName("tr");
  const contacts = [];
  for (let row of rows) {
    const cells = row.getElementsByTagName("td");
    const contact = {
      name: cells[1].textContent,
      phone: cells[2].textContent,
      email: cells[3].textContent,
      date: cells[4].textContent,
    };
    contacts.push(contact);
  }
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

function loadContacts() {
  const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
  for (let contact of contacts) {
    const newRow = document.createElement("tr");

    // Insert data into the row
    newRow.innerHTML = `
            <td>${tableBody.children.length + 1}</td>
            <td>${contact.name}</td>
            <td>${contact.phone}</td>
            <td>${contact.email}</td>
            <td>${contact.date}</td>
            <td>
                <button class="btn bg-primary btn-edit text-white m-2">Edit</button>
                <button class="btn bg-danger btn-delete text-white">Delete</button>
            </td>
        `;

    // Append the new row to the table body
    tableBody.appendChild(newRow);

    // Add event listeners to the buttons
    newRow.querySelector(".btn-edit").addEventListener("click", function () {
      editContact(newRow);
    });

    newRow.querySelector(".btn-delete").addEventListener("click", function () {
      deleteContact(newRow);
    });
  }
}


function editContact(row) {
  const cells = row.getElementsByTagName("td");
  document.getElementById("name").value = cells[1].textContent;
  document.getElementById("phone").value = cells[2].textContent;
  document.getElementById("email").value = cells[3].textContent;

  editMode = true;
  currentRow = row;
  submitBtn.textContent = "Edit";
}

function deleteContact(row) {
  row.parentNode.removeChild(row);
  updateRowNumbers();
  saveContacts();
}

