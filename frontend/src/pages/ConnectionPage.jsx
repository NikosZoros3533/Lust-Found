import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Post from "../components/Post";

export default function ConnectionPage() {
  const { id } = useParams();
  const posts = useSelector((state) => state.posts);
  const post = posts.find((p) => p.id === id);
  if (!post) {
    return (
      <div className="p-6 mt-60 text-center text-red-500">Post not found.</div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-50 p-6 bg-light3 rounded-2xl">
      <Post post={post} />
    </div>
  );
}
