import { Outlet } from "react-router";
import ConnectionNavigation from "../components/connectionsUI/ConnectionNavigation";
import { useSelector } from "react-redux";

export default function ConnectionsRoot() {
  const { authUser } = useSelector((state) => state.auth);
  return (
    <>
      {authUser && <ConnectionNavigation />}
      <Outlet />
    </>
  );
}
