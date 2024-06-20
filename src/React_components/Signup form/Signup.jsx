import React, { useState } from "react";
import { SignupSchema } from "@/Schemas/SignupSchema.js";
import { useForm } from "react-hook-form";
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
import axios from "axios";
import { toast } from "sonner";
import { NavLink, useNavigate } from "react-router-dom";
import { Host_Name } from "../../../constant.js";

function Signup() {
  const form = useForm({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      username: "",
      fullname: "",
      email: "",
      password: "",
    },
  });
  const [signupStatus, setsignupStatus] = useState(false);
  const navigate = useNavigate();
  const [avatarfile, setavatarfile] = useState("");

  async function onSubmiting(values) {
    setsignupStatus(true);
    const formdata = new FormData();
    formdata.append("username", values.username);
    formdata.append("fullname", values.fullname);
    formdata.append("email", values.email);
    formdata.append("password", values.password);
    formdata.append("avatar", avatarfile);

    try {
      const response = await axios.post(
        `${Host_Name}/user/signupnewuser`,
        formdata
      );

      console.log(response);
      toast.success("Signup successfully");
      navigate("/login");
    } catch (error) {
      console.log("Error while Registration: ", error);
      toast("Something went wrong while signup");
    } finally {
      setsignupStatus(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-xl rounded-lg p-8 space-y-8 border border-gray-200">
        <h2 className="text-3xl font-extrabold text-center text-gray-900">
          Sign Up
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmiting)} className="space-y-6">
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Fullname</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John Doe"
                      {...field}
                      className="border-gray-300 rounded-lg text-lg p-2 focus:ring-2 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="johndoe"
                      {...field}
                      className="border-gray-300 rounded-lg text-lg p-2 focus:ring-2 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="email@example.com"
                      {...field}
                      className="border-gray-300 rounded-lg text-lg p-2 focus:ring-2 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      {...field}
                      className="border-gray-300 rounded-lg text-lg p-2 focus:ring-2 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Profile Picture</FormLabel>
                  <FormControl>
                    <input
                      type="file"
                      onChange={(e) => setavatarfile(e.target.files[0])}
                      className="border-gray-300 rounded-lg text-lg p-2 focus:ring-2 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors duration-300"
            >
              {signupStatus ? "Signup please wait..." : "Signup"}
            </Button>
          </form>
        </Form>
        <div className="text-center">
          <p className="text-gray-700">
            Already registered?{" "}
            <NavLink to="/login" className="text-blue-500 hover:underline">
              Log in
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
