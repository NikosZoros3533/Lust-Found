import express from "express";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();


router.get("/", (req, res) => {
  res.send(posts);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  const foundPost = posts.find((post) => post.id === id);
  if (!foundPost) {
    res.sendStatus(404);
  }
  res.send(foundPost);
});

router.post("/", (req, res) => {
  const post = req.body;
  console.log(post);
  posts.push({ ...post, id: uuidv4() });
  res.send(`${post.title} has been added to the database`);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  posts = posts.filter((post) => post.id !== id);

  res.send(`${id} deleted from database`);
});

export default router;
