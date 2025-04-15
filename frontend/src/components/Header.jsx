import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"; 
import LogoutButton from "./LogoutButton";
import { getMe } from "../fetchFunctions";
import { useQuery } from "@tanstack/react-query";



export default function Header() {
  
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  
  const {data:user}=useQuery({
    queryKey: ["user"],
    queryFn: getMe,
  });

  let activeClass = "text-xl font-menu text-light2";
  let nonActiveClass = "text-dark text-lg font-menu hover:text-light2";

  return (
    <header className="bg-light3 p-4 sm:p-6 shadow-md ">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <NavLink
          to="/"
          className="text-light2 font-bold gap-2 tracking-wide text-2xl sm:text-3xl font-menu flex flex-row items-end"
        >
          Lust <span className="text-light1">&</span> Found
        </NavLink>

        {/* Hamburger Menu Button (Visible on small screens) */}
        <button className="sm:hidden text-dark" onClick={toggleMenu}>
          {isOpen ? (
            <XMarkIcon className="h-8 w-8" />
          ) : (
            <Bars3Icon className="h-8 w-8" />
          )}
        </button>

        {/* Navigation Menu */}
        <nav
          className={`absolute sm:static top-16 left-0 w-full sm:w-auto bg-light3 sm:bg-transparent shadow-md sm:shadow-none transition-all ${
            isOpen ? "block" : "hidden sm:flex"
          }`}
        >
          <ul className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 p-4 sm:p-0">
            {user && (
              <li>
                <NavLink
                  to="profile"
                  className={({ isActive }) =>
                    isActive ? activeClass : nonActiveClass
                  }
                  onClick={toggleMenu}
                >
                  Profile
                </NavLink>
              </li>
            )}

            <li>
              <NavLink
                to="/connections"
                className={({ isActive }) =>
                  isActive ? activeClass : nonActiveClass
                }
                onClick={toggleMenu}
              >
                Connections
              </NavLink>
            </li>
            {user ? (
              <li>
                <LogoutButton />
              </li>
            ) : (
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive
                      ? "ml-3 text-lg font-menu bg-dark text-light2 rounded-2xl p-4 "
                      : "group relative inline-flex font-menu ml-3 text-lg px-2 py-0.5 items-center justify-center overflow-hidden rounded-2xl border border-dark  text-dark bg-light2 transition-all duration-100 [box-shadow:8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] hover:[box-shadow:0px_0px_rgb(82_82_82)]"
                  }
                  onClick={toggleMenu}
                >
                  Log In 
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
