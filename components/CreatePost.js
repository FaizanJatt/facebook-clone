import router from "next/router";
import Modal from "react-modal";
import { useState } from "react";
import { useRouter } from "next/router";
export default function CreatePost({ togglePostModal, user }) {
  const [modalIsOpen, setIsOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  ///Register states

  const hours = new Date().getHours();
  const minutes = new Date().getMinutes();
  const seconds = new Date().getSeconds();
  const Time = `${hours}:${minutes}:${seconds}`;
  const TimeInSeconds = hours * 60 * 60 + minutes * 60 + seconds;

  const [post, setPost] = useState({
    author: user._id,
    preference: "public",
    postText: "",
    likes: 0,
    postTime: TimeInSeconds,
  });
  const [postDisabled, setPostDisabled] = useState(true);

  //Post create Logic

  const handlePostChange = (e) => {
    setPost((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
    if (post.postText.length >= 1) {
      setPostDisabled(false);
    }
  };

  const changePrefHandler = (e) => {
    setPost((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handlePostSubmit = async (e) => {
    setIsLoading(true);
    //validate information before submitting
    e.preventDefault();
    createPost();
  };
  const createPost = async () => {
    console.log("creating post");
    try {
      const res = await fetch("/api/UsersApi/posts", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(post),
      });
      setIsLoading(false);
      router.reload();
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      width: "450px",
      height: "400px",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      boxShadow: "1px 1px 3px 3px #dadada",
    },
  };
  function closeModal() {
    togglePostModal();
  }
  Modal.setAppElement("#__next");

  if (post.postText.length === 0) {
    if (postDisabled === false) {
      setPostDisabled(true);
    }
  }

  return (
    <>
      <Modal isOpen={modalIsOpen} contentLabel="example" style={customStyles}>
        <i
          style={!isLoading ? { display: "none" } : undefined}
          className="fa-solid fa-spinner"
        ></i>
        <div className="modal postmodal">
          <div className="post--top">
            <p className="post-title">Create a Post</p>
            <div className="close-container">
              <span className="post-close" onClick={closeModal}>
                X
              </span>
            </div>
          </div>
          <div className="post--mid">
            <div className="post-img-container">
              <img src={user.avatarImg} className="post-img" />
            </div>
            <div className="mid--intersection">
              <p>{user.first}</p>
              <div className="post-select-container">
                <select
                  className="post-select"
                  name="preference"
                  onChange={changePrefHandler}
                  defaultValue="public"
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>
              </div>
            </div>
          </div>
          <form onSubmit={handlePostSubmit}>
            <div>
              <textarea
                className="post-textarea"
                name="postText"
                placeholder={`What's on your mind, ${user.first}?`}
                onChange={handlePostChange}
              ></textarea>
            </div>
            <div className="post-btn-container">
              <input
                disabled={postDisabled}
                className={postDisabled ? "post-btn disabled" : "post-btn"}
                type="submit"
                value="Post"
              />
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
