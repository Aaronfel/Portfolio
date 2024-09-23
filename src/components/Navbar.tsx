import React, { useState } from "react";
import { useRouter } from "next/router";

const Navbar: React.FC = () => {
  const router = useRouter();
  const [showHamburguer, setShowHamburguer] = useState<boolean>(false);

  const handleChangeSection = (section: string) => {
    router.query.section = section;
    router.push(
      {
        pathname: "/",
        query: { section },
      },
      undefined,
      {}
    );
  };

  return (
    <nav className="w-full relative border-gray-200">
      <div className="md:flex items-center justify-between mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl min-w-[100px]">Aaron Feldman</h1>
          <button
            onClick={() => setShowHamburguer(!showHamburguer)}
            data-collapse-toggle="navbar-solid-bg"
            type="button"
            className="items-center p-2 w-10 h-10 justify-center text-sm rounded-lg block md:hidden focus:outline-none focus:ring-2  text-gray-400 hover:bg-gray-700 focus:ring-gray-600"
            aria-controls="navbar-solid-bg"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="false"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        {/* Mobile */}
        <div
          className={`${
            showHamburguer ? "absolute z-50" : "hidden"
          } w-full md:hidden md:w-auto"`}
        >
          <ul className="flex flex-col font-medium mt-4 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 bg-gray-800 md:bg-transparent border-gray-700">
            <li
              className="block py-3 px-3 md:p-0 rounded md:border-0 text-white md:hover:text-blue-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent cursor-pointer"
              onClick={() => {
                handleChangeSection("About");
                setShowHamburguer(false);
              }}
            >
              About
            </li>
            <li
              className="block py-3 px-3 md:p-0 rounded md:border-0 text-white md:hover:text-blue-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent cursor-pointer"
              onClick={() => {
                handleChangeSection("Skills");
                setShowHamburguer(false);
              }}
            >
              Skills
            </li>
            <li
              className="block py-3 px-3 md:p-0 rounded md:border-0 text-white md:hover:text-blue-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent cursor-pointer"
              onClick={() => {
                handleChangeSection("Projects");
                setShowHamburguer(false);
              }}
            >
              Projects
            </li>
          </ul>
        </div>
        {/* Desktop */}
        <div className="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
          <ul className="flex flex-col font-medium mt-4 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent bg-gray-800 md:dark:bg-transparent border-gray-700">
            <li
              className="block py-2 px-3 md:p-0 rounded md:border-0 text-white md:hover:text-blue-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent cursor-pointer"
              onClick={() => handleChangeSection("About")}
            >
              About
            </li>
            <li
              className="block py-2 px-3 md:p-0 rounded md:border-0 text-white md:hover:text-blue-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent cursor-pointer"
              onClick={() => handleChangeSection("Skills")}
            >
              Skills
            </li>
            <li
              className="block py-2 px-3 md:p-0 rounded md:border-0 text-white md:hover:text-blue-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent cursor-pointer"
              onClick={() => handleChangeSection("Projects")}
            >
              Projects
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
