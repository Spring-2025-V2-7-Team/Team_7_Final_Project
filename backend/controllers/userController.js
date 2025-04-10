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

exports.getAllUsers = async (req, res) => {
  try {
    const { rows } = await db.query("SELECT id, name, avatar_url FROM users");
    res.json(rows);
  } catch (err) {
    console.error("Failed to fetch users:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

exports.updateProfile = async (req, res) => {
  const userId = req.user.id;
  const { name, bio, interests, avatarUrl } = req.body;

  try {
    const result = await db.query(
      `SELECT name, bio, interests, avatar_url FROM users WHERE id = $1`,
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const current = result.rows[0];

    const updatedName = name ?? current.name;
    const updatedBio = bio ?? current.bio;
    const updatedInterests = interests ?? current.interests;
    const updatedAvatarUrl = avatarUrl ?? current.avatar_url;

    const updateResult = await db.query(
      `UPDATE users
       SET name = $1, bio = $2, interests = $3, avatar_url = $4
       WHERE id = $5
       RETURNING id, name, email, avatar_url, bio, interests`,
      [updatedName, updatedBio, updatedInterests, updatedAvatarUrl, userId]
    );

    const updated = updateResult.rows[0];
    res.json({
      ...updated,
      avatarUrl: updated.avatar_url,
    });
  } catch (err) {
    console.error("Failed to update profile:", err);
    res.status(500).json({ error: "Failed to update profile" });
  }
};

exports.getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const result = await db.query(
      "SELECT id, name, email, avatar_url, bio, interests FROM users WHERE id = $1",
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching user by ID:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};