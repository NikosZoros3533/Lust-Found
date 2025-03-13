import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"; // Heroicons

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  let activeClass = "text-xl font-menu text-light2";
  let nonActiveClass = "text-dark text-lg font-menu hover:text-light2";

  return (
    <header className="bg-light3 p-4 sm:p-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <NavLink
          to="/"
          className="text-light2 font-bold tracking-wide text-2xl sm:text-3xl font-menu"
        >
          Lust & Found
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
            <li>
              <NavLink
                to=""
                className={({ isActive }) =>
                  isActive ? activeClass : nonActiveClass
                }
              >
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/connections"
                className={({ isActive }) =>
                  isActive ? activeClass : nonActiveClass
                }
              >
                Connections
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? activeClass
                    : nonActiveClass + " border rounded-2xl p-2"
                }
              >
                Log In
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
