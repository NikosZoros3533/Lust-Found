import { useQuery } from "@tanstack/react-query";

import NotificationItem from "../../components/notifications/NotificationItem";
import { getNotifications } from "../../fetchFunctions";
import LoaderSpinner from "./../../components/connectionsUI/Skeletons/LoaderSpinner";
import ClearButton from "../../components/notifications/ClearButton";

export default function Notifications() {
  const { data: notifications, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
  });

  return (
    <div className="min-h-screen">
      <div className="max-w-2xl mx-auto px-8 py-8">
        <div className="w-full p-6 flex justify-end items-center">
          <ClearButton disabled={notifications && notifications.length === 0 }>Clear</ClearButton>
        </div>

        {isLoading && <LoaderSpinner />}
        {notifications &&
          (notifications.length === 0 ? (
            <div className="text-light3 text-center py-12">
              No notifications yet
            </div>
          ) : (
            <ul className="bg-white shadow rounded-lg divide-y">
              {notifications.map((notif) => (
                <NotificationItem key={notif._id} notification={notif} />
              ))}
            </ul>
          ))}
      </div>
    </div>
  );
}
