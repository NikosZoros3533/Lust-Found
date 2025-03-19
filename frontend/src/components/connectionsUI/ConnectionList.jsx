import { useEffect, useState } from "react";
import ConnectionItem from "../connectionsUI/ConnectionItem";
import SkeletonConnItem from "./Skeletons/SkeletonConnItem";

export default function ConnectionList({ posts }) {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(()=>{
    setTimeout(()=>{setIsLoading(false)},1000)
  },[])
  return (
    <div className="max-w-4xl mx-auto p-4 mt-5">
      <ul className="space-y-6">
        {isLoading ? (
          <>
            <li>
              <SkeletonConnItem />
            </li>
            <li>
              <SkeletonConnItem />
            </li>
          </>
        ) : (
          posts.map((post) => (
            <li key={post._id}>
              <ConnectionItem post={post} />
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
