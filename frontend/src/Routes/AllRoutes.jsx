import React from "react";
import { Routes, Route } from "react-router-dom";
import Blogs from "../components/Blogs";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Singleblog from "../components/Singleblog";
import BlogCreate from "../pages/BlogCreate";

export const AllRoutes = () => {
  return (
    <div>
      {/* Add Routes here */}
      {
        <Routes>
          <Route path="/" element={<Blogs />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/blog/:_id" element={<Singleblog />}></Route>
          <Route path="/blog/create" element={<BlogCreate />}></Route>
        </Routes>
      }
    </div>
  );
};
