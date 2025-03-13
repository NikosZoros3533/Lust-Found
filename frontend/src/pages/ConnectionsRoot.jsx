import { Outlet } from "react-router";
import ConnectionNavigation from "../components/ConnectionNavigation"

export default function ConnectionsRoot() {
  return (
    <>
      <ConnectionNavigation />
      <Outlet />
    </>
  );
}
