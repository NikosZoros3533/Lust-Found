import { useParams } from "react-router";
import { posts } from "../../db";
import ConnectionItem from "../../components/connectionsUI/ConnectionItem";

export default function ConnectionDetail() {
  const params = useParams();
  const post = posts.find((post) => post._id === params.id);
  console.log(post);

  return (
    <div className="min-h-screen">
      <div className="mt-10">
        <ConnectionItem post={post} />
      </div>
    </div>
  );
}
