import "./App.css";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./React_components/Navbar section/Navbar.jsx";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { login } from "./store/authSlice.js";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      dispatch(login(JSON.parse(userData)));
    }

    navigate("/");
  }, [dispatch, navigate]);

  return (
    <div className="min-h-screen flex bg-gray-100">
      <div className="w-64 bg-slate-800 text-white p-4 fixed h-full">
        <Navbar />
      </div>
      <div className="ml-64 p-4 flex-1 min-h-full border overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
