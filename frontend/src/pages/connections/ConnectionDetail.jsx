import { useParams } from "react-router";
import ConnectionItem from "../../components/connectionsUI/ConnectionItem";
import { useQuery } from "@tanstack/react-query";
import { getConnection } from "../../fetchFunctions";
import LoaderSpinner from "../../components/connectionsUI/Skeletons/LoaderSpinner";

export default function ConnectionDetail() {
  const params = useParams();
  const { data: post, isLoading } = useQuery({
    queryKey: ["posts", params.id],
    queryFn: ({ signal }) => getConnection({ signal, id: params.id }),
  });

  return (
    <div className="min-h-screen">
      <div className="mt-10">
        {isLoading && (
          <LoaderSpinner/>
        )}
        {post && <ConnectionItem post={post} />}
      </div>
    </div>
  );
}
