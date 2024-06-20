import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { userRequest } from "@/Axios_instance.jsx";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card.jsx";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button.jsx";
import { Host_Name } from "../../../constant.js";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel.jsx";
import { useSelector, useDispatch } from "react-redux";

function Searchprofile() {
  const userdata = useSelector((state) => state.auth.userData);
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [post, setpost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  let isUserFollowHer = userData?.followers?.some(
    (follower) => follower.toString() === userdata._id.toString()
  );

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await userRequest.get(`${Host_Name}/user/${userId}`);
        setUserData(response.data.data.user);
        setpost(response.data.data.posts);
        console.log(response.data.data);
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Something went wrong while fetching the user data."
        );
        toast(
          error.response?.data?.message ||
            "Something went wrong while fetching the user data."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const Gobacktosearch = () => {
    navigate(-1);
  };

  const addNewFollower = async (user_follow_to) => {
    // jis user ko follow kiya uski id
    try {
      setUserData((prevState) => ({
        ...prevState,
        followers: [...prevState.followers, userdata._id],
      }));

      const res = await userRequest.post(`${Host_Name}/follower/newfollower`, {
        user_follow_to: user_follow_to,
      });

      if (res.statusCode == 200) {
        isUserFollowHer = true;
      }

      console.log(res.data);
    } catch (error) {
      toast("Something went wrong while following");
    }
  };

  const unFollow = async (user_unfollow_to) => {
    // jis user ko unfollow krna hai uski id
    try {
      setUserData((prevState) => ({
        ...prevState,
        followers: prevState.followers.filter(
          (follower) => follower.toString() !== userdata._id.toString()
        ),
      }));

      const res = await userRequest.post(`${Host_Name}/follower/unfollow`, {
        user_unfollow_to: user_unfollow_to,
      });

      if (res.statusCode == 200) {
        isUserFollowHer = false;
      }

      console.log(res.data);
    } catch (error) {
      toast("Something went wrong while following");
    }
  };

  if (loading) {
    return (
      <div
        role="status"
        className=" min-h-screen flex justify-center items-center"
      >
        <svg
          aria-hidden="true"
          class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        {error}
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        User not found
      </div>
    );
  }

  return userData != null ? (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-5">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-4xl">
        <div className="flex items-center">
          <img
            src={userData.avatar}
            alt={`${userData.username}'s avatar`}
            className="w-40 h-40 rounded-full object-cover mr-6"
          />
          <div>
            <div className="text-2xl font-bold flex gap-8">
              <p>{userData.username}</p>
              <p>
                {isUserFollowHer ? (
                  <Button
                    onClick={() => unFollow(userData._id)}
                    className="border border-gray-400 rounded-3xl text-sm"
                  >
                    Unfollow
                  </Button>
                ) : (
                  <Button
                    className="border border-gray-400 rounded-3xl text-sm"
                    onClick={() => addNewFollower(userData._id)}
                  >
                    follow
                  </Button>
                )}
              </p>
            </div>
            <div className="flex space-x-4 mt-2">
              <div>
                <span className="font-semibold">{userData.posts.length}</span>{" "}
                posts
              </div>
              <div>
                <span className="font-semibold">
                  {userData.followers.length}
                </span>{" "}
                followers
              </div>
              <div>
                <span className="font-semibold">{userData.follow.length}</span>{" "}
                following
              </div>
            </div>
            <div className="mt-4">
              <div className="text-lg font-semibold">{userData.fullname}</div>
              <div className="text-gray-600">{userData.email}</div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          {post &&
            post.map((post, ind) => (
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
            ))}
        </div>
        <div className="flex justify-end">
          <Button
            onClick={Gobacktosearch}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Back
          </Button>{" "}
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
}

export default Searchprofile;
