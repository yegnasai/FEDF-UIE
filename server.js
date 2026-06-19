const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let habits = [];

app.get("/habits", (req, res) => {
    res.json(habits);
});

app.post("/habits", (req, res) => {
    const habit = {
        id: Date.now(),
        name: req.body.name,
        completed: false
    };

    habits.push(habit);
    res.json(habit);
});

app.put("/habits/:id", (req, res) => {
    const id = Number(req.params.id);

    habits = habits.map(h =>
        h.id === id ? { ...h, completed: !h.completed } : h
    );

    res.json({ message: "Updated" });
});

app.delete("/habits/:id", (req, res) => {
    const id = Number(req.params.id);

    habits = habits.filter(h => h.id !== id);

    res.json({ message: "Deleted" });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
