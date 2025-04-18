import { Outlet } from "react-router";
import { NavLink } from "react-router";

export default function NotificationRoot() {
  let activeClass =
    "activeInConnection text-base sm:text-lg md:text-xl font-menu tracking-[0.1rem]";
  let nonActiveClass =
    "text-light1 text-sm sm:text-lg font-menu hover:text-light2";
  return (
    <>
      <header className="p-2 bg-dark w-full">
        <div className="container mx-auto flex flex-wrap justify-center items-center gap-x-4 sm:gap-x-16 gap-y-2 text-center">
          <NavLink
            to="/notifications"
            className={({ isActive }) =>
              isActive ? activeClass : nonActiveClass
            }
            end
          >
            Notifications
          </NavLink>
          <NavLink
            to="/notifications/my-likes"
            className={({ isActive }) =>
              isActive ? activeClass : nonActiveClass
            }
          >
            My Likes
          </NavLink>
        </div>
      </header>
      <Outlet />
    </>
  );
}
