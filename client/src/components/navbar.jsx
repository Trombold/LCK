// components/Navbar.jsx
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { useAuth } from "../contexts/auth_context";
import { ToastContainer } from "react-toastify";
import ImageUser from "./profile/image_user";
import NavItem from "./nav_item";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, logout, user } = useAuth();

  const { image, name, lastname, role } = user || {};

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isAdmin = role?.includes("admin");
  const isSystemManager = role?.includes("system");
  const isPilot = role?.includes("pilot");

  return (
    <nav className="sticky top-0 z-50 w-full bg-white bg-opacity-80 backdrop-blur-sm dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <ToastContainer />
      <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={logo} className="h-8" alt="LCK Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            LKC
          </span>
        </Link>
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
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
        <div
          className={`w-full md:block md:w-auto ${
            isMenuOpen ? "block" : "hidden"
          }`}
          id="navbar-default"
        >
          <ul className="flex flex-wrap justify-end items-center gap-2 md:flex-row p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:bg-transparent md:space-x-8 md:mt-0 md:border-0 dark:bg-gray-800  dark:border-gray-700 font-semibold">
            {!isAuthenticated && (
              <>
                <NavItem to="/">Home</NavItem>
                <NavItem to="/about">About</NavItem>
                
                <NavItem to="/register">Registro</NavItem>
                <NavItem to="/login">Inicia Sesión</NavItem>
              </>
            )}
            {isAuthenticated && (
              <>
                {(isAdmin || isPilot) && (<NavItem to="/karts">Karts</NavItem>)}
                {(isAdmin || isPilot) && (<NavItem to="/validates">Válidas</NavItem>)}
                {isAdmin && <NavItem to="/manage/validates">Gestión Válidas</NavItem>}
                {isAdmin && <NavItem to="/manage/championship">Gestión Campeonatos</NavItem>}
                {isAdmin && <NavItem to="/manage/inscriptions">Gestión de Inscripciones</NavItem>}
                {(isAdmin || isPilot) && (<NavItem to="/results">Resultados</NavItem>)}
                {isAdmin && <NavItem to="/manage/results">Gestión Resultados</NavItem>}
                {(isSystemManager || isAdmin) && <NavItem to="/manage/transponders">Gestión Transpoders</NavItem>}
                <li>
                  <button
                    onClick={logout}
                    className="block py-2 px-3 rounded md:bg-transparent md:p-0 dark:text-white dark:hover:text-blue-500 dark:hover:underline hover:text-blue-700 hover:underline"
                  >
                    Cerrar Sesión
                  </button>
                </li>
                <li>
                  <Link
                    to="/profile"
                    className={`block py-2 px-3 rounded md:bg-transparent md:p-0 ${
                      location.pathname === "/profile"
                        ? "text-white bg-blue-700 md:text-blue-700 md:dark:text-blue-500"
                        : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    }`}
                  >
                    <ImageUser
                      image={image}
                      name={name}
                      lastname={lastname}
                      forNavigate={true}
                    />
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
