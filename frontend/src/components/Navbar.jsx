import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { name: "Home", route: "/" },
  { name: "Instructors", route: "/instructors" },
  { name: "Classes", route: "/classes" },
];
const Navbar = () => {
  const [navBg, setnavBg] = useState("bg-[#15151580]");
  return (
    <nav>
      <div className="lg:w-[90%] mx-auto sm:px-6">
        <div className="p-4 flex justify-between items-center">
          {/* logo */}
          <div>
            <h1 className="text-2xl inline-flex gap-2 items-center font-bold">
              YogaGuru <img src="/logo.png" alt="" className="w-8" />
            </h1>
            <div className=" font-bold text-[13px] tracking-[8px] ">
              Find Yourself
            </div>
          </div>

          {/* navigation links */}
          <div className="hidden md:block text-black dark:text-white">
            <div className="">
              <ul className="flex space-x-4 pr-6">
                {navItems?.map((item) => (
                  <li key={item.route}>
                    <NavLink
                      to={item.route}
                      className={({ isActive }) =>
                        `font-bold ${
                          isActive
                            ? "text-secondary"
                            : `${
                                navBg.includes("bg-transparent")
                                  ? "text-white"
                                  : "text-black dark:text-white"
                              }`
                        } hover:text-secondary duration-300`
                      }
                    >
                      {item.name}
                    </NavLink>
                  </li>
                  
                ))}
                <li>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      `font-bold ${
                        isActive
                          ? "text-secondary"
                          : `${
                              navBg.includes("bg-transparent")
                                ? "text-white"
                                : "text-black dark:text-white"
                            }`
                      } hover:text-secondary duration-300`
                    }
                  >
                    Login
                  </NavLink>
                </li>
                <li></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
