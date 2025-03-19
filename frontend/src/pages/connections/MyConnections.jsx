import { posts, user } from "../../db.js";
import ConnectionList from "../../components/connectionsUI/ConnectionList.jsx";

export default function MyConnections() {
  const myPosts = posts.filter((post) => post.user._id === user._id);
  return (
    <div className="min-h-screen">
      <ConnectionList posts={myPosts} />
    </div>
  );
}
