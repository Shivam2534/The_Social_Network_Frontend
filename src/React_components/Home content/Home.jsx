import { userRequest } from "@/Axios_instance.jsx";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card.jsx";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel.jsx";
import { FaRegHeart, FaHeart, FaRegComment, FaRegStar } from "react-icons/fa6";
import { IoMdPaperPlane } from "react-icons/io";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button.jsx";
import { ChevronsUpDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible.jsx";
import { NavLink } from "react-router-dom";
import { Host_Name } from "../../../constant.js";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");
  const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);
  const userData = useSelector((state) => state.auth.userData);
  const [isOpen, setIsOpen] = useState(false);
  const [CommentDropdown, setCommentDropdown] = useState();

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await userRequest.get(`${Host_Name}/post/findnewposts`);
      setPosts(res.data.data);
      // console.log(res.data.data);
    } catch (error) {
      toast("Please login to see new posts 😊");
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (postId) => {
    if (!isUserLoggedIn) {
      toast("Please login to like a post");
      return;
    }

    try {
      let userHasLiked;
      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          if (post._id === postId) {
            userHasLiked = post.likes.some((like) => like === userData._id);
            const updatedLikes = userHasLiked
              ? post.likes.filter((like) => like !== userData._id)
              : [...post.likes, userData._id];

            return { ...post, likes: updatedLikes };
          }
          return post;
        })
      );

      await userRequest.post(`${Host_Name}/like/createlike`, {
        post_liked_to: postId,
      });
    } catch (error) {
      toast("Like on a post failed");
    }
  };

  const handleComment = async (postId) => {
    if (!isUserLoggedIn || comment.trim().length === 0) {
      toast("Please login first to comment");
      return;
    }

    const newComment = {
      comment: comment,
      comment_by: userData.avatar,
    };

    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId
          ? { ...post, comments: [...post.comments, newComment] }
          : post
      )
    );

    try {
      await userRequest.post(`${Host_Name}/comment/createcomment`, {
        comment: comment,
        comment_to_post: postId,
      });
      setComment("");
      setIsOpen(false);
    } catch (error) {
      toast("Comment failed");
    }
  };

  const toggleCommentsection = (postId) => {
    setCommentDropdown(postId);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return loading ? (
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
      <span class="sr-only">Loading...</span>
    </div>
  ) : (
    <div className="p-4 flex flex-col justify-center items-center">
      {posts.map((post) => (
        <div
          key={post._id}
          className="flex flex-col items-center mb-8 p-4 rounded shadow-md"
        >
          <div>
            <NavLink
              to={`/searchprofile/${post.user_created_post._id}`}
              className="flex mb-4"
            >
              <img
                src={post.user_created_post.avatar}
                alt="user profile"
                className="w-12 h-12 rounded-full object-cover mr-4"
              />
              <div>
                <p className="font-bold">{post.user_created_post.username}</p>
                <p className="text-sm text-gray-600">{post.location}</p>
              </div>
            </NavLink>
            <div className="mb-4">
              <Carousel className="w-full max-w-lg">
                <CarouselContent>
                  {post.media.map((mediaItem, index) => (
                    <CarouselItem key={index}>
                      <div className="p-1">
                        <Card>
                          {mediaItem.type === "video" ? (
                            <CardContent className="flex aspect-square items-center justify-center p-6">
                              <video
                                src={mediaItem.url}
                                controls
                                alt={`media-${index}`}
                                className="w-full h-full object-cover"
                              />
                            </CardContent>
                          ) : (
                            <CardContent className="flex aspect-square items-center justify-center p-6">
                              <img
                                src={mediaItem.url}
                                alt={`media-${index}`}
                                className="w-full h-full object-cover"
                              />
                            </CardContent>
                          )}
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
            <div className="flex justify-between px-2">
              <div className="flex gap-5">
                <div onClick={() => handleLike(post._id)}>
                  {post.likes.some((like) => like === userData._id) ? (
                    <FaHeart className="cursor-pointer text-red-500 size-6" />
                  ) : (
                    <FaRegHeart className="cursor-pointer size-6" />
                  )}
                </div>
                <div onClick={() => toggleCommentsection(post._id)}>
                  <FaRegComment className="cursor-pointer size-6" />
                </div>
                <div>
                  <IoMdPaperPlane className="cursor-pointer size-6" />
                </div>
              </div>
              <div>
                <FaRegStar className="cursor-pointer size-6" />
              </div>
            </div>
            <div className="p-2">
              <div>{post.likes.length} likes</div>
              <div className="flex flex-wrap">{post.text}</div>
              {post.comments.length > 0 && (
                <Collapsible
                  open={isOpen}
                  onOpenChange={setIsOpen}
                  className="w-[350px] space-y-2"
                >
                  <div className="flex items-center justify-between space-x-4 px-4">
                    <h4 className="text-md font-semibold">
                      <div>View all {post.comments.length} comments</div>
                    </h4>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm" className="w-9 p-0">
                        <ChevronsUpDown className="h-4 w-4" />
                        <span className="sr-only">Toggle</span>
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                  <CollapsibleContent className="space-y-2 px-4">
                    {post.comments.map((comment, ind) => (
                      <div
                        key={ind}
                        className="rounded-md border px-4 py-3 font-mono text-sm flex"
                      >
                        <div className="mr-4">
                          <img
                            className="w-6 h-6 rounded-full object-cover"
                            src={comment.comment_by.avatar}
                            alt=""
                          />
                        </div>
                        {comment.comment}
                      </div>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              )}
              <div
                className={`${
                  CommentDropdown === post._id ? "block" : "hidden"
                } flex justify-between gap-3 mt-4`}
              >
                <input
                  type="text"
                  className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add a comment..."
                  value={comment}
                />
                <button
                  onClick={() => handleComment(post._id)}
                  className="text-blue-500 px-4 py-2 rounded-md"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
