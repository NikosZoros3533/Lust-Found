import { UserCircleIcon } from "@heroicons/react/24/solid";

export default function Comment({ comment }) {
  return (
    <div  className="bg-light1 p-3 rounded-xl shadow-md">
      <p className="text-sm font-semibold text-dark mb-1 flex flex-row items-end">
        <UserCircleIcon className="h-6 w-6 text-dark" />
        {comment.user.nickname}
      </p>
      <p className="text-base text-dark">{comment.text}</p>
    </div>
  );
}
