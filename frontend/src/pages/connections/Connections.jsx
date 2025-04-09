import { useQuery } from "@tanstack/react-query";
import ConnectionList from "../../components/connectionsUI/ConnectionList.jsx";
import { getConnections } from "../../fetchFunctions.js";

export default function Connections() {
  const {data:posts,isLoading}=useQuery({
    queryKey:["posts"],
    queryFn: getConnections,
  })
  return (
    <div className="min-h-screen">
      {isLoading && <div className="flex justify-center items-center"><p>Loading...</p></div> }
      {posts && <ConnectionList posts={posts} />}
    </div>
  );
}
