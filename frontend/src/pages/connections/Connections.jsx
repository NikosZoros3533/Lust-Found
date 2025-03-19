import { posts } from "../../db.js";
import ConnectionList from "../../components/connectionsUI/ConnectionList.jsx";

export default function Connections() {
  return (
    <div className="min-h-screen">
      <ConnectionList posts={posts} />
    </div>
  );
}
