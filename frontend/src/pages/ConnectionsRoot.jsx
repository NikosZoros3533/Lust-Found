import { Outlet } from "react-router";
import ConnectionNavigation from "../components/connectionsUI/ConnectionNavigation"

export default function ConnectionsRoot() {
  return (
    <>
      <ConnectionNavigation />
      <Outlet />
    </>
  );
}
