const pool = require("../config/db");

exports.submitRating = async (req, res) => {
  try {
    const userId = req.user.id;
    const { store_id, rating } = req.body;

    if (!store_id || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Invalid data" });
    }

    await pool.query(
      `
      INSERT INTO ratings (user_id, store_id, rating)
      VALUES ($1, $2, $3)
      ON CONFLICT (user_id, store_id)
      DO UPDATE SET rating = $3
      `,
      [userId, store_id, rating]
    );

    res.json({ message: "Rating submitted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};