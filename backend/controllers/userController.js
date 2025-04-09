const db = require("../db");

exports.getProfile = async (req, res) => {
  const userId = req.user.id;
  try {
    const result = await db.query(
      `SELECT id, name, email, avatar_url, bio, interests FROM users WHERE id = $1`,
      [userId]
    );
    const user = result.rows[0];
    res.json({
      ...user,
      avatarUrl: user.avatar_url,
    });
  } catch (err) {
    console.error("Failed to fetch profile:", err);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
};

exports.updateProfile = async (req, res) => {
  const userId = req.user.id;
  const { name, bio, interests } = req.body;
  try {
    const result = await db.query(
      `UPDATE users
       SET name = $1, bio = $2, interests = $3
       WHERE id = $4
       RETURNING id, name, email, avatar_url, bio, interests`,
      [name, bio, interests, userId]
    );
    const updated = result.rows[0];
    res.json({
      ...updated,
      avatarUrl: updated.avatar_url,
    });
  } catch (err) {
    console.error("Failed to update profile:", err);
    res.status(500).json({ error: "Failed to update profile" });
  }
};