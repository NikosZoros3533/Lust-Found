import { formatDistanceToNow } from "date-fns";
import {
  ChatBubbleBottomCenterTextIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router";

export default function NotificationItem({ notification }) {
  const { _id, type, read, createdAt, from, onPostItemId } = notification;

  const icon =
    type === "comment" ? (
      <ChatBubbleBottomCenterTextIcon className="w-6 h-6 text-light2" />
    ) : (
      <HeartIcon className="w-6 h-6 text-light2" />
    );

  const message =
    type === "comment" ? "commented on your post" : "liked your post";

  return (
    <li
      className={`flex items-start gap-4 p-6 border-b ${
        read ? "bg-light3" : "bg-light1"
      } hover:bg-light3 transition-colors duration-200`}
      key={_id}
    >
      <Link to={`/connections/${onPostItemId}`}>
        <div className="flex-shrink-0">{icon}</div>
        <div className="flex-1 text-base md:text-lg">
          <p className="text-dark">
            <span className="font-menu text-xl">{from.nickname}</span> {message}
          </p>
          <p className="text-xs text-gray-500">
            {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
          </p>
        </div>
        {!read && <span className="w-2 h-2 bg-light2 rounded-full mt-1" />}
      </Link>
    </li>
  );
}
