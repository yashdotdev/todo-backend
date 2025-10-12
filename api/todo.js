import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// In-memory dummy todos
const todos = {
  1: {
    id: "1",
    title: "Buy groceries",
    description: "Milk, eggs, bread, and cheese",
  },
  2: {
    id: "2",
    title: "Complete assignment",
    description: "Finish the Node.js homework by Monday",
  },
  3: {
    id: "3",
    title: "Workout",
    description: "1-hour cardio at the gym",
  },
  4: {
    id: "4",
    title: "Call mom",
    description: "Catch up with her about the weekend plans",
  },
  5: {
    id: "5",
    title: "Read a book",
    description: "Continue reading 'Atomic Habits'",
  },
  6: {
    id: "6",
    title: "Plan vacation",
    description: "Look into flights and hotels for Japan trip",
  },
  7: {
    id: "7",
    title: "Meditation",
    description: "15 minutes of guided meditation",
  },
  8: {
    id: "8",
    title: "Water plants",
    description: "Indoor and outdoor plants need watering",
  },
  9: {
    id: "9",
    title: "Team meeting",
    description: "Sync with dev team at 10 AM",
  },
  10: {
    id: "10",
    title: "Write blog post",
    description: "Draft a blog on Express.js basics",
  },
};

// Get all todos
app.get("/todos", (req, res) => {
  res.json(todos);
});

//  Get a specific todo
app.get("/todos/:id", (req, res) => {
  const todo = todos[req.params.id];
  if (todo) {
    res.json(todo);
  } else {
    res.status(404).json({ error: "Todo not found" });
  }
});

//  Create a new todo
app.post("/todos", (req, res) => {
  const { id, title, description } = req.body;
  if (!id || !title || !description) {
    return res.status(400).json({ error: "Missing id, title, or description" });
  }

  if (todos[id]) {
    return res.status(409).json({ error: "Todo with this ID already exists" });
  }

  todos[id] = { id, title, description };
  res.status(201).json(todos[id]);
});

// Update an existing todo
app.put("/todos/:id", (req, res) => {
  const { title, description } = req.body;
  const todo = todos[req.params.id];

  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }

  todos[req.params.id] = {
    ...todo,
    title: title || todo.title,
    description: description || todo.description,
  };

  res.json(todos[req.params.id]);
});

//  Delete a todo
app.delete("/todos/:id", (req, res) => {
  if (todos[req.params.id]) {
    delete todos[req.params.id];
    res.json({ success: true });
  } else {
    res.status(404).json({ error: "Todo not found" });
  }
});

// Root
app.get("/", (req, res) => {
  res.send("📝 Todo backend is running!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
