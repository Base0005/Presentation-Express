const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;
const path = require("path");
app.use(cors());

// Middleware
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '..')));

//Data

let users = [
  {
    ID: 1,
    Name: "Davis-Cedrick Baseka",
    Email: "base0005@algonquinlive.com",
    Role: "Project Manager/Front-End Developer",
  },
  {
    ID: 2,
    Name: "Mahsa Sadeghpour",
    Email: "sade0040@algonquinlive.com",
    Role: "UX/UI Designer",
  },
  {
    ID: 3,
    Name: "Mami Shiozaki (Mary)",
    Email: "shio0001@algonquinlive.com",
    Role: "Back-End Developer",
  },
  {
    ID: 4,
    Name: "Farhan Malik",
    Email: "mali0139@algonquinlive.com",
    Role: "Front-End Developer",
  },
  {
    ID: 5,
    Name: "Arthur Duarte",
    Email: "leit0037@algonquinlive.com",
    Role: "UX/UI Designer",
  },
  {
    ID: 6,
    Name: "Diya Dangol",
    Email: "dang0164@algonquinlive.com",
    Role: "Back-End Developer",
  },
];
//Get all Users
app.get("/users", (req, res) => {
    res.status(200).json(users)
});

//Get a single User
app.get("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find((user) => user.ID === id);
    if (!user) {
    return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
})
//Post a new User
app.post("/users", (req, res) => {
    const { name, email, role } = req.body;

    if (!name || !email || !role) {
    return res
        .status(400)
        .json({ message: "Name, email, and role are required" });
    }

    const newUser = {
        ID: users.length + 1,
        Name: name,
        Email: email,
        Role: role,
    };

    users.push(newUser);
    res.status(201).json({ message: "User created successfully", user: newUser });
});

//To Update a User
app.put("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email, role } = req.body;
    const user = users.find((user) => user.ID === id);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    user.Name = name || user.Name;
    user.Email = email || user.Email;
    user.Role = role || user.Role;
    res.status(200).json({ message: "User updated successfully", user });
    })
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/index.html`);
});