const pool = require("../config/db");
const { hashPassword } = require("../utils/password.util");

exports.addUser = async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const hashedPassword = await hashPassword(password);

    const result = await pool.query(
      `INSERT INTO users (name, email, password, address, role)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, name, email, role`,
      [name, email, hashedPassword, address, role]
    );

    res.status(201).json({
      message: "User added successfully",
      user: result.rows[0]
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addStore = async (req, res) => {
  try {
    const { name, email, address, owner_id } = req.body;

    const result = await pool.query(
      `INSERT INTO stores (name, email, address, owner_id)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [name, email, address, owner_id]
    );

    res.status(201).json({
      message: "Store added successfully",
      store: result.rows[0]
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUsers = async (req, res) => {
  const result = await pool.query(
    "SELECT id, name, email, address, role FROM users"
  );
  res.json(result.rows);
};

exports.getStores = async (req, res) => {
  const result = await pool.query(`
    SELECT s.id, s.name, s.email, s.address,
    COALESCE(AVG(r.rating),0) AS rating
    FROM stores s
    LEFT JOIN ratings r ON s.id = r.store_id
    GROUP BY s.id
  `);
  res.json(result.rows);
};