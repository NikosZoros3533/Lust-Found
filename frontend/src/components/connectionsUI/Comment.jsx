import { UserCircleIcon } from "@heroicons/react/24/solid";
import { queryClient } from "../../fetchFunctions";
import SettingsButton from "./SettingsButton";

export default function Comment({ comment }) {
  const user = queryClient.getQueryData(["user"]);

  function checkProperty() {
    const commentUserId = comment.user._id;
    const myId = user._id;

    return commentUserId === myId;
  }

  let property = null;
  if (user) {
     property = checkProperty();
  }
  const item = { type: "comment", itemObject: comment };

  return (
    <div className="bg-light1 p-3 rounded-xl shadow-md">
      {property && (
        <div className="w-full flex justify-end">
          <SettingsButton item={item}/>
        </div>
      )}
      <p className="text-sm font-semibold text-dark mb-1 flex flex-row items-end">
        <UserCircleIcon className="h-6 w-6 text-dark" />
        {comment.user.nickname}
      </p>
      <p className="text-base text-dark">{comment.text}</p>
    </div>
  );
}
