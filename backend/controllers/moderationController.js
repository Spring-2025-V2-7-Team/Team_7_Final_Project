const db = require("../db");

exports.getFlaggedPosts = async (req, res) => {
  try {
    const { rows } = await db.query(
      `SELECT posts.*, users.name as author
       FROM posts
       JOIN users ON posts.user_id = users.id
       WHERE posts.flagged = true`
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch flagged posts" });
  }
};

exports.getReportedUsers = async (req, res) => {
  try {
    const { rows } = await db.query(
      `SELECT * FROM users WHERE reported = true`
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch reported users" });
  }
};

exports.ignoreUser = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query(`UPDATE users SET reported = false WHERE id = $1`, [id]);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: "Failed to ignore user" });
  }
};

exports.approvePost = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query(`UPDATE posts SET flagged = false WHERE id = $1`, [id]);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: "Failed to approve post" });
  }
};

exports.deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query(`DELETE FROM posts WHERE id = $1`, [id]);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: "Failed to delete post" });
  }
};

exports.banUser = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query(`UPDATE users SET banned = true WHERE id = $1`, [id]);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: "Failed to ban user" });
  }
};