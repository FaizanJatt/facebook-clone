import React from "react";

import Post from "./Post";
const Posts = ({ posts, user, cls, hasNoPosts }) => {
  if (!cls) cls = "";
  if (hasNoPosts) {
    return (
      <div className="no-posts-container">
        <div>You have no posts Yet.</div>
        <div>Create one to get started!</div>
      </div>
    );
  }
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
