import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { commentOnPost, queryClient } from "../../fetchFunctions";
import toast from "react-hot-toast";

export default function CommentInput({ postId }) {
  const [comment, setComment] = useState("");
  const inputRef=useRef(null)
  const { mutate } = useMutation({
    mutationFn: commentOnPost,
    onSuccess:()=>{
      toast.success("Commented")
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      inputRef.current.blur()
      setComment("")
    }
  });

  const handleSubmit = async (e) => {
    if (e.key === "Enter" && comment.trim()) {
      e.preventDefault();
      setComment((prevComment) => prevComment.trim());
      const commentToSend = { comment: { text: comment }, postId };
      mutate(commentToSend);
    }
  };
  
  return (
    <input
      type="text"
      ref={inputRef}
      value={comment}
      onChange={(e) => setComment(e.target.value)}
      className="w-full p-2 border rounded focus:bg-light3 focus:outline-0"
      placeholder="Comment..."
      onKeyDown={handleSubmit}
    />
  );
}
