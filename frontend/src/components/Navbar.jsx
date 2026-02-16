import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const user = { name: "Aditya Tripathi" };
  const navigate = useNavigate();
  const logoutUser = () => {
     navigate("/")
  }
  return (
    <div className="shadow bg-white">
      <nav className=" flex items-center justify-between max-w-7xl mx-auto px-4 py-3.5 text-slate-800 transition-all">
        <Link className="flex items-center">
          <img src="/resumly.png" alt="logo" className="h-11 w-auto" />
          <span className="text-pink-500 font-bold pl-1 text-2xl">Res</span><span className="text-2xl text-blue-700 font-bold">umly</span>
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <p className="md:font-semibold gap-1">Hi, {user.name}</p>
          <button
            onClick={logoutUser}
            className="bg-white hover:bg-slate-50 border border-gray-300 px-7 py-1.5 rounded-full active:scale-95 transition-all cursor-pointer">
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
