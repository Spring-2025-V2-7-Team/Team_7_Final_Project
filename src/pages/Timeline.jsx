import { useEffect, useState } from 'react';
import PostCard from '../components/posts/PostCard';
import { getPosts } from '../features/posts/postAPI';

export default function Timeline() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchFeed = async () => {
      const data = await getPosts();
      setPosts(data.reverse()); // newest first
    };
    fetchFeed();
  }, []);

  return (
    <div style={{ maxWidth: 600, margin: 'auto' }}>
      <h2>Timeline</h2>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        posts.map((post) => <PostCard key={post.id} post={post} />)
      )}
    </div>
  );
}