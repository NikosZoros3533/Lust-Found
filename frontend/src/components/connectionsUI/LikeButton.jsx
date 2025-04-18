import { HeartIcon } from "@heroicons/react/24/solid";
import { useMutation } from "@tanstack/react-query";
import { likeConnection, queryClient } from "../../fetchFunctions";

export default function LikeButton({ post }) {
  const { mutate, isPending } = useMutation({
    mutationFn: likeConnection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  function handleLike() {
    mutate(post);
  }

  return (
    <button
      onClick={handleLike}
      disabled={isPending}
      className="flex items-center space-x-1 bg-dark text-light2 p-3 rounded-3xl cursor-pointer"
    >
      <HeartIcon className="h-4 w-4 text-light3" />
      <span>{post.interests.length}</span>
    </button>
  );
}
