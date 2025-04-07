const db = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.register = (req, res) => {
  try {
    if (req.body == null) {
       return res.status(400).json({
            isError: true,
            errorMessage: "Request body is missing",
        })
    }
    const { name, email, password } = req.body;
    const hashedPassword = bcrypt.hash(password, 10);

    const [rows] = db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );
    res.status(201).json({ message: "User registered" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    const user = users[0];

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.json({ token });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUsers = async (req, res) => {
  const [rows] = await db.query("SELECT id, name, email FROM users");
  res.json(rows);
};

exports.getUser = async (req, res) => {
  const { id } = req.params;
  const [rows] = await db.query(
    "SELECT id, name, email FROM users WHERE id = ?",
    [id]
  );
  if (rows.length === 0)
    return res.status(404).json({ error: "User not found" });
  res.json(rows[0]);
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  await db.query("UPDATE users SET name = ? WHERE id = ?", [name, id]);
  res.json({ message: "User updated" });
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  await db.query("DELETE FROM users WHERE id = ?", [id]);
  res.json({ message: "User deleted" });
};
