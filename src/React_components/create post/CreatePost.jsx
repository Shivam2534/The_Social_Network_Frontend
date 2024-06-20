import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userRequest } from "@/Axios_instance.jsx";
import { toast } from "sonner";
import { PostSchema } from "@/Schemas/PostSchema.js";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button.jsx";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Dialog } from "@/components/ui/dialog.jsx";
import { Host_Name } from "../../../constant.js";

function CreatePost() {
  const form = useForm({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      text: "",
      location: "",
    },
  });
  const navigate = useNavigate();
  const [mediafiles, setmediafiles] = useState([]);
  const [postStatus, setpostStatus] = useState(false);

  const onSubmit = async (data) => {
    // data.preventDefault(); can not be used because data is not an event .
    console.log(data);
    if (mediafiles.length > 0 || (data.text != "" && data.location != "")) {
      setpostStatus(true);

      try {
        const formData = new FormData();
        formData.append("text", data.text);
        formData.append("location", data.location);

        for (let i = 0; i < mediafiles.length; i++) {
          formData.append("media", mediafiles[i]);
        }
        const res = await userRequest.post(
          `${Host_Name}/post/newpost`,
          formData
        );
        console.log("response is-", res);
        toast.success("Post uploaded successfully");
        navigate("/");
      } catch (error) {
        toast.error("Something went wrong while posting");
        console.log("Error while making a request to create post", error);
      } finally {
        setpostStatus(false);
      }
    } else {
      toast("Please create a post before posting");
    }
  };

  return (
    <Dialog>
      <div className="max-w-lg mx-auto bg-white p-8 rounded-md shadow-md mt-10">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Create New Post
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="media"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold text-gray-700">
                    Upload Media{" "}
                    <span className="text-slate-400">
                      (multimedia is supported *max 10)
                    </span>
                  </FormLabel>
                  <FormControl>
                    <input
                      type="file"
                      multiple
                      onChange={(e) => setmediafiles(e.target.files)}
                      className="w-full border-gray-300 rounded-lg text-lg p-3 focus:ring-2 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold text-gray-700">
                    Caption
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Awesome ❤️❤️"
                      {...field}
                      className="w-full border-gray-300 rounded-lg text-lg text-slate-400 p-3 focus:ring-2 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold text-gray-700">
                    Location
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter location"
                      {...field}
                      className="w-full border-gray-300 rounded-lg text-lg text-slate-400 p-3 focus:ring-2 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-300 shadow-lg"
            >
              {postStatus ? "Uploading post..." : "Create Post"}
            </Button>
          </form>
        </Form>
      </div>
    </Dialog>
  );
}

export default CreatePost;
