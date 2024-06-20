import React from "react";
import { IoHomeSharp, IoSearchOutline } from "react-icons/io5";
import { LuMessagesSquare } from "react-icons/lu";
import { TbSquareRoundedPlus } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function Navbar() {
  const isuserloggedin = useSelector((state) => state.auth.isUserLoggedIn);
  const userdata = useSelector((state) => state.auth.userData);
  // console.log("userdata from navabr-",userdata.fullname)
  console.log("user status:", isuserloggedin);
  return (
    <div className="min-h-screen bg-gray-800 text-white p-4">
      <div className="mb-8 text-2xl font-bold">The Social Media</div>
      <div className="space-y-6">
        <NavLink to={"/"} className="flex items-center space-x-4">
          <IoHomeSharp size={24} />
          <div className="text-lg">Home</div>
        </NavLink>
        <NavLink to={"/search"} className="flex items-center space-x-4">
          <IoSearchOutline size={24} />
          <div className="text-lg">Search</div>
        </NavLink>
        <NavLink to={"/message"} className="flex items-center space-x-4">
          <LuMessagesSquare size={24} />
          <div className="text-lg">Message</div>
        </NavLink>
        <NavLink to={"/createpost"} className="flex items-center space-x-4">
          <TbSquareRoundedPlus size={24} />
          <div className="text-lg">Create post</div>
        </NavLink>
        {!isuserloggedin && (
          <NavLink to={"/login"} className="flex items-center space-x-4">
            <TbSquareRoundedPlus size={24} />
            <div className="text-lg">Login</div>
          </NavLink>
        )}
        {!isuserloggedin && (
          <NavLink to={"/signup"} className="flex items-center space-x-4">
            <TbSquareRoundedPlus size={24} />
            <div className="text-lg">Signup</div>
          </NavLink>
        )}
        {isuserloggedin && (
          <NavLink to={"/logout"} className="flex items-center space-x-4">
            <TbSquareRoundedPlus size={24} />
            <div className="text-lg">Logout</div>
          </NavLink>
        )}
        <NavLink to={"/profile"} className="flex items-center space-x-4">
          <CgProfile size={24} />
          <div className="text-lg">Profile</div>
        </NavLink>

        {isuserloggedin && (
          <div className="flex items-center space-x-4 text-xl">
            welcome, {userdata.fullname}
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
