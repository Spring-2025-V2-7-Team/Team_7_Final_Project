const db = require("../db");

exports.getPosts = async (req, res) => {
  const currentUserId = req.user?.id || null;

  try {
    const posts = await db.query(
      `
        SELECT 
          posts.*,
          users.name AS author,
          users.avatar_url,
          COUNT(likes.id) AS like_count,
          BOOL_OR(likes.user_id = $1) AS liked_by_user
        FROM posts
        JOIN users ON posts.user_id = users.id
        LEFT JOIN likes ON likes.post_id = posts.id
        GROUP BY posts.id, users.name, users.avatar_url
        ORDER BY posts.created_at DESC
      `,
      [currentUserId]
    );

    res.json(
      posts.rows.map((post) => ({
        ...post,
        like_count: parseInt(post.like_count),
        liked_by_user: post.liked_by_user === true,
      }))
    );
  } catch (err) {
    console.error("getPosts failed:", err);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};

exports.createPost = async (req, res) => {
  const { user_id, content, image_url } = req.body;
  try {
    const result = await db.query(
      `INSERT INTO posts (user_id, content, image_url) VALUES ($1, $2, $3) RETURNING *`,
      [user_id, content, image_url]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Post creation failed" });
  }
};

const Post = require("../models/Post");

exports.toggleLike = async (req, res) => {
  const userId = req.user.id;
  const postId = req.params.postId;

  try {
    const result = await db.query(
      `SELECT * FROM likes WHERE user_id = $1 AND post_id = $2`,
      [userId, postId]
    );

    if (result.rows.length > 0) {
      await Post.unlike(postId, userId);
    } else {
      await Post.like(postId, userId);

      const post = await db.query(`SELECT user_id FROM posts WHERE id = $1`, [
        postId,
      ]);
      if (post.rows.length && post.rows[0].user_id !== userId) {
        const addNotification = require("../utils/addNotification");
        await addNotification(
          post.rows[0].user_id,
          "like",
          `${req.user.name} liked your post`
        );
      }
    }

    const likeCount = await Post.getLikesCount(postId);

    res.json({ likes: likeCount });
  } catch (err) {
    console.error("Toggle like failed:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.addComment = async (req, res) => {
  const userId = req.user.id;
  const postId = req.params.postId;
  const { text } = req.body;

  try {
    const result = await db.query(
      `INSERT INTO comments (user_id, post_id, text) VALUES ($1, $2, $3) RETURNING *`,
      [userId, postId, text]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Add comment failed:", err);
    res.status(500).json({ error: "Failed to add comment" });
  }
};