import React, { useEffect, useState, useCallback } from "react";
import { userRequest } from "@/Axios_instance.jsx";
import { toast } from "sonner";
import debounce from "lodash/debounce";
import { NavLink } from "react-router-dom";
import { Host_Name } from "../../../constant.js";

function Search() {
  const [searchitem, setsearchitem] = useState("");
  const [accounts, setaccounts] = useState([]);

  const MakeSearch = async (searchitem) => {
    try {
      const res = await userRequest.post(`${Host_Name}/user/searchbar`, {
        searchitem: searchitem.trim(),
      });

      console.log(res.data);
      setaccounts(res.data.data);
    } catch (error) {
      toast("Something went wrong while searching");
    }
  };

  const debouncedSearch = useCallback(
    debounce((searchitem) => {
      if (searchitem.trim().length > 0) {
        MakeSearch(searchitem);
      }
    }, 300),
    []
  );

  useEffect(() => {
    debouncedSearch(searchitem);
  }, [searchitem, debouncedSearch]);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-5">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <input
          type="text"
          placeholder="Type here..."
          value={searchitem}
          onChange={(e) => setsearchitem(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="mt-4">
          {accounts.length > 0 ? (
            accounts.map((account, ind) => (
              <NavLink
                to={`/searchprofile/${account._id}`}
                key={ind}
                className="flex items-center p-2 mb-2 border-b border-gray-200"
              >
                <img
                  src={account.avatar}
                  alt="user"
                  className="w-10 h-10 rounded-full object-cover mr-4"
                />
                <div>
                  <p className="font-semibold text-gray-800">
                    {account.username}
                  </p>
                  <p className="text-gray-600">{account.fullname}</p>
                </div>
              </NavLink>
            ))
          ) : (
            <p className="text-gray-500">No results found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
