import { useQuery } from "@tanstack/react-query";
import ConnectionList from "../../components/connectionsUI/ConnectionList.jsx";
import { getConnections } from "../../fetchFunctions.js";
import LoaderSpinner from "../../components/connectionsUI/Skeletons/LoaderSpinner.jsx";
import SkeletonConnItem from "../../components/connectionsUI/Skeletons/SkeletonConnItem.jsx";

export default function Connections() {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: getConnections,
  });
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
      {posts && <ConnectionList posts={posts} />}
    </div>
  );
}
