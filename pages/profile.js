import { useSession } from "next-auth/react";
import { authOptions } from "./api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import { useState, useEffect } from "react";
import { useRef } from "react";
import Modal from "react-modal";
import "cropperjs/dist/cropper.css";
import CCropper from "../components/Cropper";
import { useRouter } from "next/router";
import PCropper from "../components/PCropper";

import Header from "../components/Header";
const Profile = ({ user, posts, currentCover, covers }) => {
  const [readerCoverImg, setReaderCoverImg] = useState();
  const [readerPfp, setReaderPfp] = useState();
  const [croppedCover, setCroppedCover] = useState();
  const [croppedPfp, setCroppedPfp] = useState();
  const [coverModalIsOpen, setCoverModalIsOpen] = useState(false);
  const [profileModalIsOpen, setProfileModalIsOpen] = useState(false);
  const [errors, SetErrors] = useState({});
  const [file, setFile] = useState();
  const router = useRouter();
  ////////////////////////////////////////////Time LOGIC ///////////////////////////////////////////////////////////////////////////////////////
  const date = new Date(); //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const hours = date.getHours(); ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const minutes = date.getMinutes(); ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const seconds = date.getSeconds(); ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const Time = `${hours}:${minutes}:${seconds}`; ////////////////////////////////////////////////////////////////////////////////////////////////
  const TimeInSeconds = hours * 60 * 60 + minutes * 60 + seconds; ///////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [coverForm, setCoverForm] = useState({
    cover: "",
    postTime: TimeInSeconds,
    user: user._id,
  });
  const [pfpForm, setPfpForm] = useState({
    pfp: "",
    postTime: TimeInSeconds,
    user: user._id,
  });

  const session = useSession();
  const inputRef = useRef();
  const coverSubmitRef = useRef();
  const pfpRef = useRef();
  const pfpSubmitRef = useRef();
  const handleCoverImage = (coverImageChangeEvent) => {
    if (coverImageChangeEvent.target.dataset.attribute) {
      if (coverImageChangeEvent.target.value == null) return;
      const reader = new FileReader();
      let image = new Image();
      console.log("pfp");
      reader.onload = function (readerLoadEvent) {
        image.src = readerLoadEvent.srcElement.result;
        setReaderPfp(readerLoadEvent.srcElement.result);
        setProfileModalIsOpen(true);
      };
      image.onload = function () {
        let height = this.height;
        let width = this.width;
        if (width >= 400 && height >= 150) {
          console.log("Here");
        } else {
          setReaderPfp(undefined);
          setProfileModalIsOpen(false);
          SetErrors({
            profileError:
              "Picture is too small, Must be at least 300 height/ 400 width",
          });
        }
      };
      if (pfpSubmitRef.current.childNodes[0].files[0]) {
        reader.readAsDataURL(pfpSubmitRef.current.childNodes[0].files[0]);
        setFile(pfpSubmitRef.current.childNodes[0].files[0]);
      } else return;
    } else {
      if (coverImageChangeEvent.target.value == null) return;
      const reader = new FileReader();
      let image = new Image();
      console.log("its cover Img");
      reader.onload = function (readerLoadEvent) {
        console.log(readerLoadEvent);
        console.log(coverModalIsOpen);
        image.src = readerLoadEvent.srcElement.result;
        setReaderCoverImg(readerLoadEvent.srcElement.result);
        setCoverModalIsOpen(true);
      };
      image.onload = function () {
        let height = this.height;
        let width = this.width;
        if (width >= 400 && height >= 300) {
        } else {
          setReaderCoverImg(undefined);
          setCoverModalIsOpen(false);
          SetErrors({
            coverImgError:
              "Picture is too small, Must be at least 300 height/ 400 width",
          });
        }
      };
      if (coverSubmitRef.current.childNodes[0].files[0]) {
        reader.readAsDataURL(coverSubmitRef.current.childNodes[0].files[0]);
        setFile(coverSubmitRef.current.childNodes[0].files[0]);
      } else return;
    }
  };

  const handleOnSubmit = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    formData.append("upload_preset", "fbclone");
    const coverImg = await fetch(
      "https://api.cloudinary.com/v1_1/dguei52eb/image/upload",
      {
        method: "POST",
        body: formData,
      }
    ).then((r) => r.json());
    if (readerCoverImg) {
      if (coverImg.height > 500 && coverImg.width > 400) {
        setCoverForm((prev) => {
          return {
            ...prev,
            ["cover"]: coverImg.secure_url,
          };
        });
        createImg();
      }
    } else if (readerPfp) {
      if (coverImg.height > 150 && coverImg.width > 400) {
        setPfpForm((prev) => {
          return {
            ...prev,
            ["pfp"]: coverImg.secure_url,
          };
        });
        createImg();
      }
    }
  };

  const createImg = async () => {
    if (!coverForm.cover) return;
    if (coverForm.cover) {
      try {
        const res = await fetch("/api/UsersApi/cover", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
          body: JSON.stringify(coverForm),
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      if (!pfpForm.pfp) return;
      try {
        const res = await fetch("/api/UsersApi/profile", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
          body: JSON.stringify(pfpForm),
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  const updateUser = async () => {
    try {
      const res = await fetch(`/api/UsersApi/${user._id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(pfpForm.pfp),
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (readerCoverImg) {
    if (!coverForm.cover) {
      if (file) {
        if (croppedCover) {
          handleOnSubmit(file);
        }
      }
    } else if (coverForm.cover) {
      createImg();

      //   router.reload();
    }
  }
  console.log(coverForm);
  if (readerPfp) {
    if (!pfpForm.pfp) {
      if (file) {
        if (croppedPfp) {
          handleOnSubmit(file);
        }
      }
    } else if (pfpForm.pfp) {
      createImg();
      updateUser();
      console.log("UPDATED");
      router.reload();
    }
  }
  const getCroppedCoverFromCropper = (image) => {
    setCroppedCover(image);
  };
  const getCroppedPfpFromCropper = (image) => {
    setCroppedPfp(image);
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      width: "400px",
      height: "400px",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      height: "fit-content",
    },
  };
  function closeCoverModal() {
    console.log("closing");
    setCoverModalIsOpen(false);
  }
  function closePfpModal() {
    console.log("closing");
    setProfileModalIsOpen(false);
  }
  Modal.setAppElement("#__next");

  return (
    <>
      <div className="profile--main">
        <Header user={user} />
        <div className="profile">
          <Modal
            isOpen={coverModalIsOpen}
            contentLabel="example"
            style={customStyles}
          >
            <CCropper
              closeModal={closeCoverModal}
              getImg={getCroppedCoverFromCropper}
              src={readerCoverImg}
            />
          </Modal>
          <Modal
            isOpen={profileModalIsOpen}
            contentLabel="k"
            style={customStyles}
          >
            <PCropper
              closeModal={closePfpModal}
              getImg={getCroppedPfpFromCropper}
              src={readerPfp}
            />
          </Modal>
          <div className="profile-top">
            <div className="profile-cover">
              <div className="profile-cover-img-container">
                <img
                  className="profile-cover-img"
                  src={
                    croppedCover
                      ? croppedCover
                      : currentCover
                      ? currentCover.cover
                      : undefined
                  }
                />
                <p
                  style={
                    errors && errors.coverImgError
                      ? undefined
                      : { display: "none" }
                  }
                  className="coverErr"
                >
                  {errors && errors.coverImgError}
                </p>
              </div>
              <div
                onClick={() => inputRef.current.click()}
                className="fa-camera-container"
              >
                <i className="fa-solid fa-camera fa-camera-cover"></i>
              </div>
              <div className="pfp-mid">
                <div className="profile---mid">
                  <div className="profile-user-img-container">
                    <img
                      className="profile-user-img"
                      src={
                        croppedPfp
                          ? croppedPfp
                          : user.avatarImg
                          ? user.avatarImg
                          : undefined
                      }
                      alt="userimg"
                    />
                  </div>
                  <div
                    onClick={() => pfpRef.current.click()}
                    className="pfp-camera-container"
                  >
                    <i className="fa-solid fa-camera camera-profilepic"></i>
                  </div>

                  <div className="self">
                    <p className="self-name">
                      {user.first} {user.last}
                    </p>
                    <p>___ Friends</p>
                    <form ref={coverSubmitRef} onSubmit={handleOnSubmit}>
                      <input
                        ref={inputRef}
                        type="file"
                        style={{ display: "none" }}
                        onChange={handleCoverImage}
                      />
                    </form>
                    <form ref={pfpSubmitRef} onSubmit={handleOnSubmit}>
                      <input
                        ref={pfpRef}
                        type="file"
                        data-attribute="pfp"
                        style={{ display: "none" }}
                        onChange={handleCoverImage}
                      />
                    </form>
                    <div>avatars ofFriends</div>
                  </div>
                </div>
              </div>
              <div className="cutline">
                <hr></hr>
                <div className="profile-nav">
                  <span className="profile-nav-item">Posts</span>
                  <span className="profile-nav-item">About</span>
                  <span className="profile-nav-item">Friends</span>
                  <span className="profile-nav-item">Photos</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

export const getServerSideProps = async (context) => {
  const get = await fetch(`${process.env.NEXT_PUBLIC_HomePage}/api/UsersApi`);
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );
  if (session) {
    const userId = session.user.email.id;
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_HomePage}/api/UsersApi/${userId}`,
      {
        method: "GET",
      }
    );
    const response = await data.json();
    const res = response.data[0];

    const getPosts = await fetch(
      `${process.env.NEXT_PUBLIC_HomePage}/api/UsersApi/posts`
    );
    const posts = await getPosts.json();
    const postsData = posts.data;

    const getCovers = await fetch(
      `${process.env.NEXT_PUBLIC_HomePage}/api/UsersApi/cover/${userId}`
    );
    let currentCover = "empty";
    let coversData = "empty";
    console.log(getCovers);
    console.log(getCovers !== undefined);
    if (getCovers !== undefined) {
      const covers = await getCovers.json();
      coversData = covers.data;
      currentCover = coversData[0];
    }
    return {
      props: {
        user: res,
        posts: postsData,
        currentCover,
        covers: coversData,
      },
    };
  } else {
    if (!session) {
      router.push("/");
    }
    return {
      props: {
        user: "guest",
      },
    };
  }
};
