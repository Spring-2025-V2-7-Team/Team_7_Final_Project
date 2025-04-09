import CreatePost from "../components/posts/CreatePost";

export default function CreatePostPage() {
  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      <h2>Create Post</h2>
      <CreatePost
        onSubmit={(post) => {
          console.log("Post created (simulate backend save):", post);
        }}
      />
    </div>
  );
}