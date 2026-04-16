const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(express.json({ limit: "10mb" })); // important for images
app.use(cors());
app.use(express.static("public"));

const DATA_FILE = "./data/visitors.json";

// Get all visitors
app.get("/visitors", (req, res) => {
    const data = JSON.parse(fs.readFileSync(DATA_FILE));
    res.json(data);
});

// Add visitor
app.post("/visitors", (req, res) => {
    const data = JSON.parse(fs.readFileSync(DATA_FILE));

    console.log("Incoming Photo:", req.body.photo); // DEBUG

    const newVisitor = {
        id: Date.now(),
        name: req.body.name,
        purpose: req.body.purpose,
        time: new Date().toLocaleString(),
        status: "IN",
        photo: req.body.photo || ""
    };

    data.push(newVisitor);
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

    res.json(newVisitor);
});

// Toggle IN/OUT
app.put("/visitors/:id", (req, res) => {
    let data = JSON.parse(fs.readFileSync(DATA_FILE));

    data = data.map(v => {
        if (v.id == req.params.id) {
            v.status = v.status === "IN" ? "OUT" : "IN";
        }
        return v;
    });

    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    res.json({ message: "Updated" });
});

// Delete visitor
app.delete("/visitors/:id", (req, res) => {
    let data = JSON.parse(fs.readFileSync(DATA_FILE));

    data = data.filter(v => v.id != req.params.id);
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

    res.json({ message: "Deleted" });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
