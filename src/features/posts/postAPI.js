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
    content: "Excited to join ConnectWise! 🚀",
    imageUrl: "https://source.unsplash.com/random/800x600?tech",
    author: "Jane Doe",
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    content: "Just finished building the profile page. Loving Material UI.",
    imageUrl: "https://source.unsplash.com/random/800x600?design",
    author: "John Smith",
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    content: "Test post with no image — clean and simple.",
    imageUrl: "",
    author: "Alex Johnson",
    createdAt: new Date().toISOString(),
  },
  {
    id: 4,
    content: "Anyone else working on cool React+Redux projects?",
    imageUrl: "https://source.unsplash.com/random/800x600?code",
    author: "Dev Geek",
    createdAt: new Date().toISOString(),
  },
  {
    id: 5,
    content: "Friday deploys are the best... or the worst?",
    imageUrl: "https://source.unsplash.com/random/800x600?friday",
    author: "Meme Lord",
    createdAt: new Date().toISOString(),
  },
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