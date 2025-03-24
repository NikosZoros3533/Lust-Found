import { Outlet } from "react-router";
import ConnectionNavigation from "../components/connectionsUI/ConnectionNavigation";
import { getMe } from "../fetchFunctions";
import { useQuery } from "@tanstack/react-query";

export default function ConnectionsRoot() {
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getMe,
  });
  return (
    <>
      {user && <ConnectionNavigation />}
      <Outlet />
    </>
  );
}
