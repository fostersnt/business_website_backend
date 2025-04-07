const db = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// const { isError } = require("joi");
const {
  insertUserQuery,
  updateUserQuery,
  getUserQuery,
} = require("../database/usersQuery");
const {
  insertResponse,
  updateResponse,
  getResponse,
} = require("../responses/apiResponse");

exports.register = async (req, res) => {
  try {
    if (req.body == null) {
      return res.status(400).json({
        isError: true,
        errorMessage: "Request body is missing",
      });
    }
    const { name, email, password } = req.body;
    // const hashedPassword = await bcrypt.hash(password, 10);
    const userData = {
      name: name,
      email: email,
      password: password,
    };

    const result = await insertUserQuery(userData);
    // const row = await db.query(
    //   "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    //   [name, email, hashedPassword]
    // );
    // return res.json(result)
    if (result.isError === false) {
      res
        .status(201)
        .json(
          insertResponse(
            result.isError,
            result.data["insertId"],
            result.model_name
          )
        );
    } else {
      res
        .status(400)
        .json(insertResponse(result.isError, result.data, result.model_name));
    }
  } catch (err) {
    res.status(500).json(insertResponse(result.isError, null, err));
  }
};

exports.login = async (req, res) => {
  try {
    if (!req.body) {
      return res.json({
        isError: true,
        errorMessage: "Request body is missing",
      });
    }
    const { email, password } = req.body;
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
  try {
    if (!req.params) {
      return res.json(getResponse(true, null, "User id missing"));
    }

    const { id } = req.params;

    const result = await getUserQuery(id);
    if (result.isError === false) {
       return res.status(200).json(getResponse(false, result.data[0], "success"));
    } else {
        return res.status(404).json(getResponse(true, null, "Failed"));
    }
  } catch (err) {
  }
};

exports.updateUser = async (req, res) => {
  try {
    if (req.body == null) {
      return res.status(400).json({
        isError: true,
        errorMessage: "Request body is missing",
      });
    }

    const id = req.params.id;
    const { name, email } = req.body;
    // res.json(req.params);
    // return;
    const userData = {
      id: id,
      name: name,
      email: email,
    };

    const result = await updateUserQuery(userData);

    if (result.isError === false) {
      res
        .status(201)
        .json(updateResponse(result.isError, result.data, result.model_name));
    } else {
      res
        .status(400)
        .json(updateResponse(result.isError, result.data, result.model_name));
    }
  } catch (err) {
    res.status(500).json(updateResponse(result.isError, null, err));
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  await db.query("DELETE FROM users WHERE id = ?", [id]);
  res.json({ message: "User deleted" });
};
