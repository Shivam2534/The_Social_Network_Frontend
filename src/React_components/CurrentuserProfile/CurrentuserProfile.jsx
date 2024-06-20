import { userRequest } from "@/Axios_instance.jsx";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useSelector, useDispatch } from "react-redux";
import { SetCurrentUserPosts } from "@/store/authSlice.js";
import { Card, CardContent } from "@/components/ui/card.jsx";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel.jsx";
import { Host_Name } from "../../../constant.js";
import { Button } from "@/components/ui/button.jsx";
import { updateCurrentUserData } from "@/store/authSlice.js";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu.jsx";
import { useNavigate } from "react-router-dom";

function CurrentuserProfile() {
  const Currentuserposts = useSelector((state) => state.auth.CurrentUserPosts);
  const userdata = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  const [changetoinputfield, setchangetoinputfield] = useState(false);
  const [username, setusername] = useState("");
  const [fullname, setfullname] = useState("");
  const [email, setemail] = useState("");
  const navigate = useNavigate();


  const formatDuration = (createdAt) => {
    const createdAtDate = new Date(createdAt);
    if (isNaN(createdAtDate.getTime())) {
      console.error("Invalid createdAt date:", createdAt);
      return "Unknown";
    }

    const diff = Date.now() - createdAtDate.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) {
      return `${years} year${years > 1 ? "s" : ""} ago`;
    } else if (months > 0) {
      return `${months} month${months > 1 ? "s" : ""} ago`;
    } else if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else {
      return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
    }
  };

  const findCuurrentuserPosts = async () => {
    try {
      const res = await userRequest.get(`${Host_Name}/post/CurrentUserPost`);
      dispatch(SetCurrentUserPosts(res.data.data));
    } catch (error) {
      toast(error.response.message);
    }
  };

  const editprofile = async (value) => {
    console.log(value);
    if (value == "edit") {
      setchangetoinputfield(true);
    } else {
      setchangetoinputfield(false);
      if (username.length > 0 || fullname.length > 0 || email.length > 0) {
        const res = await userRequest.post(`${Host_Name}/user/edit`, {
          username: username,
          fullname: fullname,
          email: email,
        });
        localStorage.setItem("userData", JSON.stringify(res.data.data));
        dispatch(updateCurrentUserData(res.data.data));
        // console.log(res.data);
      }
    }
  };

  const fetchUpdatedData = async () => {
    try {
      const res = await userRequest.post(`${Host_Name}/user/currentdata`);
      
      dispatch(updateCurrentUserData(res.data.data));
      localStorage.setItem("userData", JSON.stringify(res.data.data));
    } catch (error) {
      toast("Unable to fetch updated data");
    }
  };

  const DeletePost = async (postIdToDelete) => {
    try {
      const res = await userRequest.post(`${Host_Name}/post/deletepost`, {
        postIdToDelete: postIdToDelete,
      });

      console.log(res.data);
      toast(res.data.message);
      findCuurrentuserPosts();
      fetchUpdatedData();
    } catch (error) {
      toast("Unable to delete post");
    }
  };

  const GoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    fetchUpdatedData();
    findCuurrentuserPosts();
  }, []);

  return (
    <div className="min-h-screen  flex flex-col items-center py-5">
      <div className=" shadow-lg rounded-lg p-6 min-h-screen w-full max-w-4xl">
        <div className="flex justify-between mb-6">
          <div className="flex">
            <img
              src={userdata.avatar}
              alt={`${userdata.username}'s avatar`}
              className="w-40 h-40 rounded-full object-cover mr-6 shadow-md"
            />
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {changetoinputfield ? (
                  <input
                    type="text"
                    defaultValue={userdata.username}
                    onChange={(e) => setusername(e.target.value)}
                    className="w-full p-1 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Type new username"
                  />
                ) : (
                  <p className="text-2xl font-bold text-gray-900 cursor-pointer hover:text-blue-500">
                    {userdata.username}
                  </p>
                )}
              </div>
              <div className="flex space-x-4 mt-2 text-gray-600">
                <div>
                  <span className="font-semibold">{userdata.posts.length}</span>{" "}
                  posts
                </div>
                <div>
                  <span className="font-semibold">
                    {userdata.followers.length}
                  </span>{" "}
                  followers
                </div>
                <div>
                  <span className="font-semibold">
                    {userdata.follow.length}
                  </span>{" "}
                  following
                </div>
              </div>
              <div className="mt-4 text-gray-700">
                <div className="text-lg font-semibold">
                  {changetoinputfield ? (
                    <input
                      type="text"
                      defaultValue={userdata.fullname}
                      onChange={(e) => setfullname(e.target.value)}
                      className="w-full p-1 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Type new username"
                    />
                  ) : (
                    <p>{userdata.fullname}</p>
                  )}
                </div>
                <div>
                  {changetoinputfield ? (
                    <input
                      type="text"
                      defaultValue={userdata.email}
                      onChange={(e) => setemail(e.target.value)}
                      className="w-full p-1 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Type new username"
                    />
                  ) : (
                    <p>{userdata.email}</p>
                  )}
                </div>
                <div>Joined {formatDuration(userdata.createdAt)}</div>
              </div>
            </div>
          </div>
          <div>
            {changetoinputfield ? (
              <Button
                onClick={() => editprofile("save")}
                className="border border-gray-400 hover:bg-gray-400  text-black font-bold px-3 rounded"
              >
                Save
              </Button>
            ) : (
              <Button
                onClick={() => editprofile("edit")}
                className="border border-gray-400 hover:bg-gray-400  text-black font-bold px-3 rounded"
              >
                Edit
              </Button>
            )}
          </div>
        </div>

        {userdata.isPrivate ? (
          <div className="mt-6 text-center">
            {isUserFollowHer ? (
              <div className="text-green-500">You are following this user.</div>
            ) : (
              <div className="text-red-500">
                You are not following this user.
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-28">
            {Currentuserposts &&
              Currentuserposts.map((post, ind) => (
                <ContextMenu>
                  <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
                    <Carousel
                      key={ind}
                      className="w-full max-w-lg bg-white shadow-md rounded-lg overflow-hidden"
                    >
                      <CarouselContent>
                        {post.media.map((mediaItem, index) => (
                          <CarouselItem key={index} className="p-1">
                            <Card className="rounded-lg shadow-md overflow-hidden">
                              {mediaItem.type === "video" ? (
                                <CardContent className="flex aspect-square items-center justify-center p-2">
                                  <video
                                    src={mediaItem.url}
                                    controls
                                    alt={`media-${index}`}
                                    className="w-full h-full object-cover rounded-lg"
                                  />
                                </CardContent>
                              ) : (
                                <CardContent className="flex aspect-square items-center justify-center p-2">
                                  <img
                                    src={mediaItem.url}
                                    alt={`media-${index}`}
                                    className="w-full h-full object-cover rounded-lg"
                                  />
                                </CardContent>
                              )}
                            </Card>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious />
                      <CarouselNext />
                    </Carousel>
                  </ContextMenuTrigger>
                  <ContextMenuContent className="w-64 bg-black text-white">
                    <ContextMenuItem inset onClick={GoBack}>
                      Back
                      <ContextMenuShortcut>⌘[</ContextMenuShortcut>
                    </ContextMenuItem>

                    <ContextMenuItem inset onClick={() => DeletePost(post._id)}>
                      Delete
                      <ContextMenuShortcut>⌘R</ContextMenuShortcut>
                    </ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
              ))}
          </div>
        )}
        <div className="flex mt-48 text-sm justify-end text-gray-400">
          <div className="flex flex-col">
            <p>*Swipe images to to see</p>
            <p>*Double click on post to delete</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrentuserProfile;
