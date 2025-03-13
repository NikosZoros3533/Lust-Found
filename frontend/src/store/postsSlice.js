import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "1",
    title: "Saw you on the subway",
    encounterDescription:
      "You were reading a book with a red cover. Our eyes met, but I hesitated...",
    encounterCity: "New York, NY",
    encounterPoint: "subway",
    gender: "male",
    targetGender: "female",
    createdAt: "2024-02-14",
    interests: ["asdasdasdas","asdasdasdada"],
    comments: [
      { text: "Esena leei ksipna", user: "NikosZoros" },
      { text: "Ela na ton pareis", user: "NikosZoros" },
    ],
  },
  {
    id: "2",
    title: "Saw you on the Restaurant",
    encounterDescription:
      "You were eating fish. Our eyes met, but I hesitated...",
    encounterCity: "New York, NY",
    encounterPoint: "restaurant",
    gender: "male",
    targetGender: "female",
    createdAt: "2024-02-15",
    interests: ["asdasdasdas","asdasdasdada"],
    comments: [
      { text: "Esena leei ksipna", user: "NikosZoros" },
      { text: "Ela na ton pareis", user: "NikosZoros" },
    ],
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
