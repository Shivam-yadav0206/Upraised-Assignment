import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = ({ setIsAuthenticated }) => {
  const location = useLocation();
  const [menuIcon, setMenuIcon] = useState("menu");

  useEffect(() => {
    onToggleMenu();
  }, [location.pathname]);

  useEffect(() => {
    setMenuIcon("menu");
    const navLinks = document.querySelector(".nav-links");
    navLinks.classList.toggle("top-[9%]", false);
  }, []);

  function onToggleMenu() {
    setMenuIcon((prevIcon) => (prevIcon === "menu" ? "close" : "menu"));
    const navLinks = document.querySelector(".nav-links");
    navLinks.classList.toggle("top-[9%]");
  }

  return (
    <header className="bg-gray-100 p-3">
      <nav className="flex justify-between items-center w-[92%] mx-auto mb-2">
        <div>
          <img
            src="https://images.yourstory.com/cs/images/companies/Upraised-1623934137623.jpg?fm=auto&ar=1:1&mode=fill&fill=solid&fill-color=fff"
            alt="Logo"
            style={{ height: "50px", width: "50px" }}
          />
        </div>
        <div className="nav-links nav-links-transition duration-500 md:static absolute bg-gray-100 md:min-h-fit min-h-[60vh] left-0 top-[-100%] md:w-auto w-full flex items-center px-5">
          <ul className="ml-28 flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8">
            <li>
              <Link to="/home" className="hover:text-primary-700">
                Home
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="hover:text-primary-700">
                Dashboard
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center lg:order-2">
            <div className="mt-1 text-inherit cursor-pointer">
              <button
                className="px-3 py-3 md:px-9 md:py-4 bg-white font-medium md:font-semibold text-gray-700 text-md rounded-md hover:bg-gray-700 hover:text-white transition ease-linear duration-500"
                onClick={() => setIsAuthenticated(false)}>
                LogOut
              </button>
            </div>
          </div>
          <div className="flex items-center gap-6  md:hidden">
            <ion-icon
              className="text-3xl cursor-pointer"
              onClick={() => onToggleMenu()}
              name={menuIcon}></ion-icon>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
