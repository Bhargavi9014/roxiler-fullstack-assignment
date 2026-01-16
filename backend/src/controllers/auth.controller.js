const pool = require("../config/db");
const jwt = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../utils/password.util");

exports.signup = async (req, res) => {
  try {
    const { name, email, password, address } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const hashedPassword = await hashPassword(password);

    const result = await pool.query(
      `INSERT INTO users (name, email, password, address, role)
       VALUES ($1, $2, $3, $4, 'USER')
       RETURNING id, name, email, role`,
      [name, email, hashedPassword, address]
    );

    res.status(201).json({
      message: "User registered successfully",
      user: result.rows[0]
    });
  } catch (err) {
    if (err.code === "23505") {
      return res.status(400).json({ message: "Email already exists" });
    }
    res.status(500).json({ message: err.message });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = result.rows[0];
    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      role: user.role
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};