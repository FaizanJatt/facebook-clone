import { useState, useEffect } from "react";
import { useRef } from "react";
const CreateComment = ({ user, post, hasListChanged }) => {
  const [comment, setComment] = useState({
    author: user._id,
    post: post._id,
    comment: "",
    likes: 0,
  });
  const [submitting, setSubmitting] = useState(false);
  const [commentsList, setCommentsList] = useState({});
  const [isNewCommentAdded, setIsNewCommentAdded] = useState(false);
  const handleCommentChange = (e) => {
    setComment((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleCommentSubmit = (e) => {
    if (e.keyCode == 13) {
      if (comment.comment.length !== 0) {
        createComment();
      }
    }
  };
  const createComment = async () => {
    try {
      const res = await fetch("/api/UsersApi/posts/comments", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(comment),
      });
      setSubmitting((prev) => !prev);
      setIsNewCommentAdded((prev) => true);
      hasListChanged();
    } catch (error) {
      console.log(error);
    }
  };
  let commentInput = useRef();
  if (submitting === true) {
    if (commentInput.current.value.length > 0) {
      commentInput.current.value = " ";
      setSubmitting((prev) => {
        !prev;
      });
    }
  }
  useEffect(() => {
    const commentsList = fetch(
      `/api/UsersApi/posts/comments?postId=${post._id}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        const comments = data.comments;
        setCommentsList((prev) => {
          return {
            comments,
          };
        });
      });
    if (isNewCommentAdded) {
      setIsNewCommentAdded((prev) => {
        false;
      });
    }
  }, [isNewCommentAdded]);
  let com;
  if (commentsList.comments) {
    if (com === undefined) {
      com = commentsList.comments;
    }
  }

  return (
    <>
      <div className="Createcomment">
        <img className="commentcreate-img" src={user.avatarImg}></img>
        <textarea
          onChange={handleCommentChange}
          className="comment-create-msg"
          //   type="text"
          placeholder="Write a Comment..."
          name="comment"
          onKeyUpCapture={handleCommentSubmit}
          ref={commentInput}
        />
      </div>
      <div className="comments-section-container">
        {com &&
          com.map((comment) => {
            return (
              <div key={comment._id} className="comments-section">
                <img src={comment.author.avatarImg} />
                <div className="comment-content">
                  <p>
                    {comment.author.first} {comment.author.last}
                  </p>
                  <p>{comment.comment}</p>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default CreateComment;
