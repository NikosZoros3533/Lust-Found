import { useQuery } from "@tanstack/react-query";
import ConnectionList from "../../components/connectionsUI/ConnectionList.jsx";
import { getConnections, queryClient } from "../../fetchFunctions.js";
import SkeletonConnItem from "../../components/connectionsUI/Skeletons/SkeletonConnItem.jsx";

export default function MyConnections() {
  const user = queryClient.getQueryData(["user"]);
  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: getConnections,
  });

  const myPosts = posts?.filter((post) => post.user._id === user._id);

  
  return (
    <div className="min-h-screen">
      {isLoading && (
              <div className="max-w-4xl mx-auto p-4 mt-5">
                <ul className="space-y-6">
                  <li>
                    <SkeletonConnItem />
                  </li>
                  <li>
                    <SkeletonConnItem />
                  </li>
                </ul>
              </div>
            )}
      {myPosts && <ConnectionList posts={myPosts} />}
      
    </div>
  );
}
