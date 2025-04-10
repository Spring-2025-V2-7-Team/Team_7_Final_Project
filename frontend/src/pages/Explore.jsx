import { useEffect, useState } from "react";
import PostCard from "../components/posts/PostCard";
import { fetchPosts } from "../features/posts/postAPI";
import { Grid } from "@mui/material";
import '../styles/Timeline.scss';

export default function Timeline() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchFeed = async () => {
      const data = await fetchPosts();
      setPosts(data.reverse());
    };
    fetchFeed();
  }, []);

  return (
    <div style={{ maxWidth: "95%", margin: "auto", padding: "2rem" }}>
      <Grid container spacing={3} className="post-grid">
        {posts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <PostCard post={post} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}