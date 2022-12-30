import React from "react";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import monthsArray from "../utils/monthsArray";
import CreateComment from "../components/CreateComment";
import Post from "./Post";
const Posts = ({ posts, user }) => {
  return (
    <div className="posts-container">
      {posts &&
        posts.map((post) => {
          return <Post key={post._id} post={post} posts={posts} user={user} />;
          //   const [liked, setLiked] = useState(false);
          //   const [commentsNum, setCommentsNum] = useState("");

          //   useEffect(() => {
          //     const commentsList = fetch(
          //       `/api/UsersApi/posts/comments?postId=${post._id}`,
          //       {
          //         method: "GET",
          //       }
          //     )
          //       .then((res) => res.json())
          //       .then((data) => {
          //         const comments = data.comments;
          //         setCommentsNum(comments.length);
          //       });
          //   }, []);

          //   /// 24-12-2022
          //   let initialDate = post.postDate.split("T")[0];
          //   let formatChange = initialDate.split("-").reverse();
          //   /// 12-24-2022
          //   formatChange[1] = monthsArray[formatChange[1] - 1];
          //   const Arr = [];
          //   Arr.push(formatChange[0], formatChange[1]);
          //   const next = Arr.reverse().join(" ");
          //   const DateArr = [];
          //   DateArr.push(next, formatChange[2]);
          //   let postDate = DateArr.join(",");
          //   /// DateFormat is now December 24,2022
          //   const date = new Date().getDate();
          //   let month = new Date().getMonth();
          //   month = monthsArray[month];
          //   const year = new Date().getFullYear();
          //   const hours = new Date().getHours();
          //   const minutes = new Date().getMinutes();
          //   const seconds = new Date().getSeconds();
          //   const CurrentTimeInSeconds = hours * 60 * 60 + minutes * 60 + seconds;
          //   const currentDate = date + " " + month + " " + year;
          //   let AdaptableDate;
          //   const difference = CurrentTimeInSeconds - post.postTime;
          //   const differenceInMinutes = Math.round(difference / 60);
          //   const differenceInHours = Math.round(differenceInMinutes / 60);
          //   if (year == formatChange[2]) {
          //     if (month == formatChange[1]) {
          //       if (date == formatChange[0]) {
          //         if (difference <= 60) {
          //           AdaptableDate = `${difference}s`;
          //         } else if (difference <= 3600) {
          //           AdaptableDate = `${differenceInMinutes}m`;
          //         } else if (difference <= 82800) {
          //           AdaptableDate = `${differenceInHours}h`;
          //         } else {
          //           AdaptableDate = "Yesterday";
          //         }
          //       }
          //       if (date - 1 == formatChange[0]) {
          //         AdaptableDate = "Yesterday";
          //       } else if (date > formatChange[0]) {
          //         AdaptableDate = `${date - formatChange[0]}d`;
          //       }
          //     }
          //   }
          //   if (AdaptableDate !== undefined) {
          //     postDate = AdaptableDate;
          //   }

          //   useEffect(() => {
          //     let HasAlreadyLiked = post.liked.filter((item) => {
          //       return item._id === user._id;
          //     });
          //     if (HasAlreadyLiked[0]) {
          //       if (liked == false) setLiked(true);
          //     }
          //   }, []);
          //   let HasAlreadyLiked = post.liked.filter((item) => {
          //     return item._id === user._id;
          //   });
          //   let userAlreadyLiked = HasAlreadyLiked[0];

          //   const handleLikeButton = async (e) => {
          //     if (!liked) {
          //       try {
          //         setLiked((prev) => true);
          //         const res = await fetch(
          //           `http://localhost:3000/api/UsersApi/posts/${post._id}?user=${user._id}&&a=like`,
          //           {
          //             method: "PUT",
          //           }
          //         );
          //       } catch (error) {
          //         console.log(error, "error occursed");
          //       }
          //     } else {
          //       //   userAlreadyLiked = undefined;
          //       setLiked(false);
          //       try {
          //         const res = await fetch(
          //           `http://localhost:3000/api/UsersApi/posts/${post._id}?user=${user._id}&&a=unlike`,
          //           {
          //             method: "PUT",
          //           }
          //         );

          //         // userAlreadyLiked = undefined;
          //       } catch (error) {
          //         console.log(error);
          //       }
          //     }
          //   };
          //   const hasListChanged = () => {
          //     setCommentsNum((prev) => prev + 1);
          //   };
          //   const postStats = () => {
          //     const currentUserId = user._id;
          //     const likedList = post.liked;
          //     const numberOfLikes = post.liked.length;

          //     if (numberOfLikes > 1) {
          //       return (
          //         <div className="post---likes">
          //           <div className="post-likes-comments">
          //             <i
          //               style={{ color: "blue" }}
          //               className="fa-regular fa-thumbs-up"
          //             ></i>
          //             <p>
          //               {likedList[0].first} {likedList[0].last} and
          //               {numberOfLikes - 1} others
          //             </p>
          //           </div>
          //           <p>{commentsNum} comments</p>
          //         </div>
          //       );
          //     } else if (likedList[0]) {
          //       if (likedList[0]._id == currentUserId && !liked) {
          //         return;
          //       }

          //       return (
          //         <div className="post---likes">
          //           <div className="post-likes-comments">
          //             <i
          //               style={{ color: "blue" }}
          //               className="fa-regular fa-thumbs-up"
          //             ></i>
          //             <p>
          //               {likedList[0].first} {likedList[0].last}
          //             </p>
          //           </div>
          //           <p>{commentsNum} comments</p>
          //         </div>
          //       );
          //     } else if (!likedList[0] && liked) {
          //       return (
          //         <div className="post---likes">
          //           <div className="post-likes-comments">
          //             <i
          //               style={{ color: "blue" }}
          //               className="fa-regular fa-thumbs-up"
          //             ></i>
          //             <p>You</p>
          //           </div>
          //           <p>{commentsNum} comments</p>
          //         </div>
          //       );
          //     }
          //   };
          //   return (
          //     <div className="post-cont" key={post._id}>
          //       <div className="post-main">
          //         <div className="post-user">
          //           <img
          //             className="post-avatar-img"
          //             src={post.author.avatarImg}
          //             alt="avatarImg"
          //           ></img>
          //           <div className="post-userinfo">
          //             <p className="post-user-name">
          //               {post.author.first} {post.author.last}
          //             </p>
          //             <p className="post-date">{postDate}</p>
          //           </div>
          //         </div>
          //         <div className="post-info">
          //           <p>{post.postText}</p>
          //         </div>
          //       </div>
          //       <div
          //         style={{
          //           backgroundColor: "white",
          //           padding: "5px 10px",
          //         }}
          //       >
          //         {postStats()}
          //       </div>
          //       <hr></hr>
          //       <div className="post-bottom">
          //         <div className="post-bottom-section">
          //           <i
          //             style={liked ? { color: "blue" } : undefined}
          //             className="fa-regular fa-thumbs-up"
          //           ></i>
          //           <p
          //             style={liked ? { color: "blue" } : undefined}
          //             onClick={handleLikeButton}
          //           >
          //             Like
          //           </p>
          //         </div>
          //         <div className="post-bottom-section">
          //           <i className="fa-regular fa-message"></i>
          //           <p>Comment</p>
          //         </div>
          //         <div className="post-bottom-section">
          //           <i className="fa-solid fa-share"></i>
          //           <p>Share</p>
          //         </div>
          //       </div>
          //       <hr></hr>
          //       <CreateComment
          //         hasListChanged={() => {
          //           hasListChanged(commentsNum);
          //         }}
          //         user={user}
          //         post={post}
          //       />
          //     </div>
          //   );
        })}
    </div>
  );
};

export default Posts;
