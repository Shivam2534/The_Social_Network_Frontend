import React, { useState } from "react";
import { Button } from "@/components/ui/button.jsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.jsx";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "@/store/authSlice.js";
import { DeleteCurrentUserPosts } from "@/store/authSlice.js";

function Logout() {
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const checkString = async () => {
    if (text.trim() === "logout") {
      try {
        dispatch(logout());
        dispatch(DeleteCurrentUserPosts());
        localStorage.setItem("Authorization", "");
        localStorage.setItem("userData", "");
        toast.success("Logout Successfully");
        navigate("/login");
      } catch (error) {
        console.log("Something went wrong while logout");
        toast.error("Logout failed");
      }
    } else {
      toast.error("Please type 'logout' to confirm");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-red-600 text-white hover:bg-red-700"
        >
          Logout from this device
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white rounded-lg shadow-lg p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800">
            Logout Profile
          </DialogTitle>
          <DialogDescription className="text-lg text-gray-600">
            Really you want to{" "}
            <span className="font-bold text-red-600">logout</span> from this
            device?
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-lg text-gray-700 col-span-1">
              Confirm
            </label>
            <input
              id="name"
              type="text"
              onChange={(e) => setText(e.target.value)}
              autoComplete="off"
              className="col-span-3 border-gray-300 rounded-lg text-lg p-2 focus:ring-2 focus:ring-blue-500"
              placeholder="Type 'logout'"
            />
          </div>
        </div>
        <DialogFooter>
          <button
            onClick={checkString}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors duration-300"
          >
            Logout
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default Logout;
