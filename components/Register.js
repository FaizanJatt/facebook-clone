import router from "next/router";
import Modal from "react-modal";
import { useState } from "react";
import { useRouter } from "next/router";
export default function Register({ toggleModal }) {
  const [modalIsOpen, setIsOpen] = useState(true);
  const router = useRouter();
  ///Register states
  const [registerInfo, setRegisterInfo] = useState({
    first: "",
    last: "",
    email: "",
    password: "",
    dob: "",
    gender: "",
  });
  const [registerInfoErrorsList, setRegisterInfoErrorsList] = useState({
    first: false,
    last: false,
    email: false,
    password: false,
    dob: false,
    gender: false,
  });
  const [isOptionDisabled, setIsOptionDisabled] = useState({
    male: false,
    female: false,
    other: false,
  });

  //Registration Logic

  const handleRegisterChange = (e) => {
    setRegisterInfoErrorsList({});
    setRegisterInfo((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleRegisterSubmit = async (e) => {
    //validate information before submitting
    e.preventDefault();
    const keysOfRegisterInfo = Object.keys(registerInfo);
    const errs = [];

    keysOfRegisterInfo.forEach((key) => {
      if (!registerInfo[key]) errs.push(key);
    });
    errs.forEach((error) => {
      setRegisterInfoErrorsList((prev) => {
        return {
          ...prev,
          [error]: true,
        };
      });
    });
    if (Object.keys(errs).length === 0) {
      RegisterUser();
    } else {
      return;
    }
  };
  const RegisterUser = async () => {
    console.log("entering registration");
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
    toggleModal();
  }
  Modal.setAppElement("#__next");
  //   const openModal = (e) => {
  //     e.preventDefault();
  //     setIsOpen(true);
  //   };
  const checkHandler = (e) => {
    if (e.target.checked === true) {
      const Selected = e.target.dataset.gender;
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
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        contentLabel="example"
        style={customStyles}
        // onRequestClose={closeModal}
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
                className={
                  registerInfoErrorsList.first
                    ? "register-first register-input reg-err"
                    : "register-first register-input"
                }
                type="text"
                placeholder="First Name"
                value={registerInfo.username}
                onChange={handleRegisterChange}
                name="first"
              />
              <input
                className={
                  registerInfoErrorsList.last
                    ? "register-last register-input reg-err"
                    : "register-last register-input"
                }
                type="text"
                placeholder="Surname"
                value={registerInfo.username}
                onChange={handleRegisterChange}
                name="last"
              />
            </div>
            <input
              className={
                registerInfoErrorsList.email
                  ? "register-email register-input reg-err"
                  : "register-email register-input"
              }
              type="email"
              placeholder="Email address"
              value={registerInfo.email}
              onChange={handleRegisterChange}
              name="email"
            />
            <input
              className={
                registerInfoErrorsList.password
                  ? "register-password register-input reg-err"
                  : "register-password register-input"
              }
              type="password"
              placeholder="*******"
              value={registerInfo.password}
              onChange={handleRegisterChange}
              name="password"
            />
            <input
              className={
                registerInfoErrorsList.dob
                  ? "register-dob register-input reg-err"
                  : "register-dob register-input"
              }
              type="date"
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
                  // className={registerInfoErrorsList.first && "reg-err"}
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
    </>
  );
}