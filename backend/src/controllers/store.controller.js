const pool = require("../config/db");

exports.getStoresForUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      `
      SELECT 
        s.id,
        s.name,
        s.address,
        COALESCE(ROUND(AVG(r.rating),1), 0) AS overall_rating,
        ur.rating AS user_rating
      FROM stores s
      LEFT JOIN ratings r ON s.id = r.store_id
      LEFT JOIN ratings ur 
        ON s.id = ur.store_id AND ur.user_id = $1
      GROUP BY s.id, ur.rating
      ORDER BY s.name ASC
      `,
      [userId]
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};