import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Modal from "react-modal";
const signin = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [registerInfo, setRegisterInfo] = useState({
    first: "",
    last: "",
    email: "",
    password: "",
    dob: "",
    gender: "",
  });
  const [isOptionDisabled, setIsOptionDisabled] = useState({
    male: false,
    female: false,
    other: false,
  });
  const router = useRouter();
  const handleLoginChange = (e) => {
    setUserInfo((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleRegisterChange = (e) => {
    console.log(e);
    if (e.target.name === "dob") {
      console.log("DOB");
      console.log(e.target.value);
    }

    setRegisterInfo((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleRegisterSubmit = async (e) => {
    const errors = {};
    //validate information before submitting
    e.preventDefault();
    if (userInfo.password !== userInfo.confirmpassword) {
      errors.password = "Passwords must be same";
    }
    if (!errors) {
      return;
    }

    RegisterUser();
  };
  const RegisterUser = async () => {
    try {
      const res = await fetch("/api/UsersApi", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(registerInfo),
      });
      router.push(`/`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoginSubmit = async (e) => {
    //validate information before submitting
    e.preventDefault();
    const res = await signIn("credentials", {
      email: userInfo.email,
      password: userInfo.password,
      redirect: false,
    });
    console.log(res);
    router.push("/");
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
  function closeModal() {
    setIsOpen(false);
  }
  Modal.setAppElement("#__next");
  const openModal = (e) => {
    e.preventDefault();
    setIsOpen(true);
  };
  const checkHandler = (e) => {
    if (e.target.checked === true) {
      const Selected = e.target.dataset.gender;
      // disabledNonSelected(Selected);
      setIsOptionDisabled((prev) => {
        if ("male" !== Selected) prev.male = true;
        if ("female" !== Selected) prev.female = true;
        if ("other" !== Selected) prev.other = true;
        return {
          ...prev,
        };
      });
      setRegisterInfo((prev) => {
        return {
          ...prev,
          gender: Selected,
        };
      });
    } else {
      setIsOptionDisabled((prev) => {
        prev.male = false;
        prev.female = false;
        prev.other = false;
        return {
          ...prev,
        };
      });
      setRegisterInfo((prev) => {
        return {
          ...prev,
          gender: "",
        };
      });
    }
  };
  console.log(isOptionDisabled);
  console.log(registerInfo);

  return (
    <div className="form-container">
      <div className="top">
        <h1 className="top--h1">Fakebook</h1>
        <p className="top--description">
          Fakebook helps people connect and share with people
        </p>
      </div>
      <Modal
        isOpen={modalIsOpen}
        contentLabel="example"
        style={customStyles}
        onRequestClose={closeModal}
      >
        <div className="modal">
          <div className="register--top">
            <h3>Sign up</h3>
            <span onClick={closeModal}>X</span>
          </div>
          <div>It's easy to get started</div>
          <form onSubmit={handleRegisterSubmit} className="register-form">
            <div className="register-name">
              <input
                className="register-first register-input"
                type="text"
                placeholder="First Name"
                value={registerInfo.username}
                onChange={handleRegisterChange}
                name="first"
              />
              <input
                className="register-last register-input"
                type="text"
                placeholder="Surname"
                value={registerInfo.username}
                onChange={handleRegisterChange}
                name="last"
              />
            </div>
            <input
              className="register-email register-input"
              type="email"
              placeholder="Email address"
              value={registerInfo.email}
              onChange={handleRegisterChange}
              name="email"
            />
            <input
              className="register-password register-input"
              type="password"
              placeholder="*******"
              value={registerInfo.password}
              onChange={handleRegisterChange}
              name="password"
            />
            <input
              type="date"
              className="register-dob register-input"
              name="dob"
              onChange={handleRegisterChange}
            />
            <div className="gender--options">
              <div className="gender--option male">
                <p>Male</p>
                <input
                  onChange={checkHandler}
                  type="checkbox"
                  name="dob"
                  data-gender="male"
                  disabled={isOptionDisabled.male}
                />
              </div>
              <div className="gender--option female">
                <p>Female</p>
                <input
                  onChange={checkHandler}
                  type="checkbox"
                  name="dob"
                  data-gender="female"
                  disabled={isOptionDisabled.female}
                />
              </div>
              <div className="gender--option other">
                <p>Other</p>
                <input
                  onChange={checkHandler}
                  type="checkbox"
                  name="dob"
                  data-gender="other"
                  disabled={isOptionDisabled.other}
                />
              </div>
            </div>
            <div className="register-btn-container">
              <input className="register--btn" type="submit" value="Sign Up" />
            </div>
          </form>
        </div>
      </Modal>
      <form
        method="GET"
        className="form"
        onSubmit={(e) => handleLoginSubmit(e)}
      >
        <div className="login--form">
          <input
            className="form-email"
            type="email"
            placeholder="Email Address"
            value={userInfo.email}
            onChange={handleLoginChange}
            name="email"
          />
          <input
            className="form-password"
            type="password"
            placeholder="Password"
            value={userInfo.password}
            onChange={handleLoginChange}
            name="password"
          />
        </div>
        <input className="login--btn" type="submit" value="Login" />
        <div className="login--new">
          <p className="bottom-text">Don't have an account?</p>

          <span onClick={openModal} className="bottom-btn">
            Sign up
          </span>
        </div>
      </form>
      <Modal />
    </div>
  );
};

export default signin;
