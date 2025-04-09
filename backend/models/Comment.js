
const db = require('../db');

const Comment = {
  async add(post_id, user_id, text) {
    const result = await db.query(
      `INSERT INTO comments (post_id, user_id, text)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [post_id, user_id, text]
    );
    return result.rows[0];
  },

  async getByPost(postId) {
    const result = await db.query(
      `SELECT comments.*, users.name, users.avatar_url
       FROM comments
       JOIN users ON comments.user_id = users.id
       WHERE post_id = $1 ORDER BY created_at ASC`,
      [postId]
    );
    return result.rows;
  }
};

module.exports = Comment;