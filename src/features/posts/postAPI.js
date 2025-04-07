// let postId = 1;
// let fakeDB = [];

// export const getPosts = async () => {
//   return fakeDB;
// };

// export const createPost = async ({ content, image }) => {
//   let imageUrl = "";
//   if (image) {
//     imageUrl = URL.createObjectURL(image);
//   }
//   const post = {
//     id: postId++,
//     content,
//     imageUrl,
//     author: "Admin User",
//     createdAt: new Date().toISOString(),
//   };
//   fakeDB.push(post);
//   return post;
// };

// src/features/posts/postAPI.js

let postId = 6;

let fakeDB = [
    {
      id: 1,
      content: "A beautiful sunset I captured last week.",
      imageUrl: "https://picsum.photos/seed/post1/400/300",
      author: "Jane Doe",
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      content: "Coding in the wild 🧑‍💻",
      imageUrl: "https://picsum.photos/seed/post2/400/300",
      author: "John Smith",
      createdAt: new Date().toISOString()
    },
    {
      id: 3,
      content: "This framework is amazing. Highly recommend!",
      imageUrl: "https://picsum.photos/seed/post3/400/300",
      author: "Developer",
      createdAt: new Date().toISOString()
    },
    {
      id: 4,
      content: "React + Redux + SCSS = 😍",
      imageUrl: "https://picsum.photos/seed/post4/400/300",
      author: "UI Nerd",
      createdAt: new Date().toISOString()
    },
    {
      id: 5,
      content: "Here's a no-image post for variety.",
      imageUrl: "",
      author: "Minimalist",
      createdAt: new Date().toISOString()
    }
  ];  

export const getPosts = async () => {
  return fakeDB;
};

export const createPost = async ({ content, image }) => {
  let imageUrl = "";
  if (image) {
    imageUrl = URL.createObjectURL(image);
  }

  const post = {
    id: postId++,
    content,
    imageUrl,
    author: "Admin User",
    createdAt: new Date().toISOString(),
  };

  fakeDB.push(post);
  return post;
};