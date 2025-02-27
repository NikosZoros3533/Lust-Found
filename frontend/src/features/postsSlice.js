import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "1",
    title: "Saw you on the subway",
    description:
      "You were reading a book with a red cover. Our eyes met, but I hesitated...",
    location: "New York, NY",
    encounterDate: "2024-02-10",
    date: "2024-02-14",
  },
  {
    id: "2",
    title: "Coffee Shop Mystery",
    description:
      "You ordered a caramel latte and smiled at me. I wanted to say hi...",
    location: "Los Angeles, CA",
    encounterDate: "2024-02-08",
    date: "2024-02-13",
  },
];

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.push(action.payload); // Add new post
    },
    deletePost: (state, action) => {
      state = state.filter((post) => post.id !== action.payload); // Remove post
    },
  },
});

export const { addPost, deletePost } = postsSlice.actions;
export default postsSlice.reducer;
