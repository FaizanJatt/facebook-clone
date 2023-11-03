import React from "react";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import monthsArray from "../utils/monthsArray";
import CreateComment from "../components/CreateComment";
import Post from "./Post";
const Posts = ({ posts, user, cls }) => {
  if (!cls) cls = "";
  return (
    <div className={`posts-container ${cls}`}>
      {posts &&
        posts.map((post) => {
          return <Post key={post._id} post={post} posts={posts} user={user} />;
        })}
    </div>
  );
};

export default Posts;
