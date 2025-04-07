import { useParams } from "react-router";
import ConnectionItem from "../../components/connectionsUI/ConnectionItem";
import { useQuery } from "@tanstack/react-query";
import { getConnection } from "../../fetchFunctions";

export default function ConnectionDetail() {
  const params = useParams();
  const{data:post}=useQuery({
    queryKey: ["posts",params.id],
    queryFn: ({signal})=>getConnection({signal,id:params.id}),
  })
  console.log(post);

  return (
    <div className="min-h-screen">
      <div className="mt-10">
        {/* <ConnectionItem post={post} /> */}
      </div>
    </div>
  );
}
