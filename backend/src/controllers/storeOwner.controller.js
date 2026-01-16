const pool = require("../config/db");

exports.getStoreDashboard = async (req, res) => {
  try {
    const ownerId = req.user.id;

    const storeResult = await pool.query(
      "SELECT id, name FROM stores WHERE owner_id = $1",
      [ownerId]
    );

    if (storeResult.rows.length === 0) {
      return res.status(404).json({ message: "Store not found for owner" });
    }

    const storeId = storeResult.rows[0].id;

    const ratingsResult = await pool.query(
      `
      SELECT 
        u.name AS user_name,
        u.email AS user_email,
        r.rating
      FROM ratings r
      JOIN users u ON r.user_id = u.id
      WHERE r.store_id = $1
      `,
      [storeId]
    );

    //average rating
    const avgResult = await pool.query(
      "SELECT COALESCE(ROUND(AVG(rating),1),0) AS average_rating FROM ratings WHERE store_id = $1",
      [storeId]
    );

    res.json({
      store: storeResult.rows[0],
      average_rating: avgResult.rows[0].average_rating,
      ratings: ratingsResult.rows
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};