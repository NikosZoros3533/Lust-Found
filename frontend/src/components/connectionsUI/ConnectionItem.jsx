import {
  MapPinIcon,
  UserCircleIcon,
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
} from "@heroicons/react/24/solid";
import Comment from "./Comment";
import { useState } from "react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "../../fetchFunctions";
import CommentInput from "./CommentInput";
import LikeButton from "./LikeButton";
import SettingsButton from "./SettingsButton";

export default function ConnectionItem({ post }) {
  const [showComments, setShowComments] = useState(false);
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getMe,
  });

  function toggleShowComments() {
    setShowComments((prevState) => !prevState);
  }

  function checkProperty() {
    const postUserId = post.user._id;
    const myId = user._id;

    return postUserId === myId;
  }
  const property = checkProperty();
  return (
    <div className="bg-light2 p-12 rounded-lg shadow-md hover:shadow-lg transition-all space-y-3">
      {property && (
        <div className="w-full flex justify-end">
          <SettingsButton/>
        </div>
      )}
      {/* Header - User & Date */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <UserCircleIcon className="h-14 w-14 text-dark" />
          <div>
            <h2 className="text-lg font-normal">{post.user.nickname}</h2>
            <p className="text-sm text-light1">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Title & Description */}
      <Link to={`/connections/${post._id}`} className="text-2xl font-normal">
        {post.title}
      </Link>
      <p className="text-xl text-dark font-menu">{post.encounterDescription}</p>

      {/* Location & Date */}
      <div className="flex items-center text-base text-light1 font-normal space-x-2">
        <MapPinIcon className="h-4 w-4 text-light1" />
        <span>
          {post.encounterPoint}, {post.encounterCity.City} (
          {post.encounterCity.Region})
        </span>
        <span>• {new Date(post.createdAt).toLocaleDateString()}</span>
      </div>

      {/* Likes & Comments Count */}
      <div className="flex justify-end items-center text-base">
        <LikeButton post={post} />
      </div>

      {/* Comments Section */}
      {post.comments.length > 0 &&
        (showComments ? (
          <div className="space-y-3">
            {post.comments.map((comment, index) => (
              <Comment key={index} comment={comment} />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            <Comment comment={post.comments[0]} />
          </div>
        ))}
      {post.comments.length > 1 && (
        <div className="w-full flex justify-center">
          <button onClick={toggleShowComments}>
            {showComments ? (
              <ArrowUpCircleIcon className="h-8 w-8" />
            ) : (
              <ArrowDownCircleIcon className="h-8 w-8" />
            )}
          </button>
        </div>
      )}
      {user && <CommentInput postId={post._id} />}
    </div>
  );
}
