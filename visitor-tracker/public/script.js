const API = "http://localhost:3000/visitors";

let capturedImage = "";

// Fetch visitors
async function fetchVisitors() {
    const res = await fetch(API);
    const data = await res.json();

    const list = document.getElementById("list");
    list.innerHTML = "";

    data.forEach(v => {
        const li = document.createElement("li");

        const statusClass = v.status === "IN" ? "in" : "out";

        li.innerHTML = `
      <img src="${v.photo || ''}" width="50" height="50">
      ${v.name} - ${v.purpose} - ${v.time}
      <span class="${statusClass}">[${v.status}]</span>
      <button onclick="toggleStatus(${v.id})">Toggle</button>
      <button onclick="deleteVisitor(${v.id})">Delete</button>
    `;

        list.appendChild(li);
    });

    // Dashboard
    document.getElementById("total").innerText = data.length;
    document.getElementById("inCount").innerText = data.filter(v => v.status === "IN").length;
    document.getElementById("outCount").innerText = data.filter(v => v.status === "OUT").length;
}

// Add visitor
async function addVisitor() {
    const name = document.getElementById("name").value;
    const purpose = document.getElementById("purpose").value;

    console.log("Captured Image:", capturedImage); // DEBUG

    if (!name || !purpose) {
        alert("Enter all details!");
        return;
    }

    if (!capturedImage) {
        alert("Please capture photo first!");
        return;
    }

    await fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, purpose, photo: capturedImage })
    });

    document.getElementById("name").value = "";
    document.getElementById("purpose").value = "";
    capturedImage = "";

    fetchVisitors();
}

// Delete
async function deleteVisitor(id) {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    fetchVisitors();
}

// Toggle IN/OUT
async function toggleStatus(id) {
    await fetch(`${API}/${id}`, { method: "PUT" });
    fetchVisitors();
}

// Search
function searchVisitor() {
    const input = document.getElementById("search").value.toLowerCase();
    const items = document.querySelectorAll("#list li");

    items.forEach(item => {
        item.style.display = item.innerText.toLowerCase().includes(input) ? "block" : "none";
    });
}

// Start camera
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        document.getElementById("video").srcObject = stream;
    })
    .catch(err => {
        alert("Camera not working: " + err);
    });

// Capture image
function capture() {
    const canvas = document.getElementById("canvas");
    const video = document.getElementById("video");

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, 200, 150);

    capturedImage = canvas.toDataURL("image/png");

    console.log("Image captured:", capturedImage); // DEBUG

    alert("Photo captured!");
}

// Load data
fetchVisitors();
