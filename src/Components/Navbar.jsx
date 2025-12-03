import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import Container from "./Container";
import logo from "../assets/logo3.svg fill.png";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";

const navLinkClasses = ({ isActive }) =>
  [
    "inline-block text-[16px] font-semibold transition-colors",
    isActive
      ? "bg-[#F8721F] bg-clip-text text-transparent"
      : "text-slate-700 hover:bg-gradient-to-r hover:from-[#632EE3] hover:to-[#F8721F] hover:bg-clip-text hover:text-transparent",
  ].join(" ");

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const avatar =
    user?.photoURL ||
    "https://cdn-icons-png.freepik.com/512/6596/6596121.png"; // fallback avatar


  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Logged out successfully");
        
      })
      .catch((err) => console.error("Error logging out:", err));
  };




  return (
    <Container>
      <div className="navbar bg-base-100 shadow-sm">
        {/* Left */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              <li>
                <NavLink to="/" end className={navLinkClasses}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/apps" className={navLinkClasses}>
                  Services
                </NavLink>
              </li>
              <li>
                <NavLink to="/installation" className={navLinkClasses}>
                  My Products
                </NavLink>
              </li>
              <li>
                <NavLink to="/my-profile" className={navLinkClasses}>
                  My Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/about-us" className={navLinkClasses}>
                  About Us
                </NavLink>
              </li>
            </ul>
          </div>

          <Link
            to="/"
            className=" normal-case text-xl flex items-center"
          >
            <img
              className="inline-block mr-2 w-30 h-10"
              src={logo}
              alt="Logo"
            />
          </Link>
        </div>

        {/* Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <NavLink to="/" end className={navLinkClasses}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/apps" className={navLinkClasses}>
                Services
              </NavLink>
            </li>
            <li>
              <NavLink to="/installation" className={navLinkClasses}>
                My Products
              </NavLink>
            </li>
            <li>
              <NavLink to="/my-profile" className={navLinkClasses}>
                My Profile
              </NavLink>
            </li>
            <li>
              <NavLink to="/about-us" className={navLinkClasses}>
                About Us
              </NavLink>
            </li>
          </ul>

        </div>




        {/* Right */}
        <div className="navbar-end gap-3">
          {user ? (

            <>
              {/* avatar with hover name */}
              <div
                className="tooltip tooltip-left"
                data-tip={user.displayName || user.email}
              >
                <Link  to="/my-profile">
                  <img
                    src={avatar}
                    alt="User Avatar"
                    className="w-15 h-15 rounded-full border border-slate-300 object-cover"
                  />
                </Link>
              </div>
              <span className="hidden md:inline text-sm text-slate-700 font-medium">
                {user.displayName || user.email}
              </span>

              <button
                onClick={handleLogOut}
                className="btn text-black bg-[#F4E11B] border border-[#02000F] rounded-[40px] hover:bg-[#e0cb16]"
              >
                Logout
              </button>
            </>
          ) : (

            <>
              <NavLink
                to="/auth/login"
                className="btn border text-black bg-[#F4E11B] border-[#02000F] rounded-[40px] hover:bg-[#e0cb16]"
              >
                Login

              </NavLink>
              <NavLink to="/auth/register" className="btn btn-ghost">
                Register
              </NavLink>
            </>

          )}
        </div>
      </div>
      
    </Container>
  );
};

export default Navbar;
