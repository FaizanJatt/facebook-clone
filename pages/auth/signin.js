import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Modal from "react-modal";
import Register from "../../components/Register";
const signin = () => {
  const router = useRouter();
  //Login States
  const [openRegister, setOpenRegister] = useState(false);
  const toggleModal = () => {
    setOpenRegister((prev) => !prev);
  };
  // const [modalIsOpen, setIsOpen] = useState(false);
  const [loginUserInfo, setloginUserInfo] = useState({
    email: "",
    password: "",
  });
  const [loginErrors, setLoginErrors] = useState({});

  //Login Logic
  const handleLoginChange = (e) => {
    setLoginErrors({});
    setloginUserInfo((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleLoginSubmit = async (e) => {
    //validate information before submitting
    e.preventDefault();
    let err = {};
    if (!loginUserInfo.email) err.email = "Please enter an email";
    if (!loginUserInfo.password) err.password = "Please Enter a password";
    const errObj = Object.keys(err);
    if (errObj == "") {
      const res = await signIn("credentials", {
        email: loginUserInfo.email,
        password: loginUserInfo.password,
        redirect: false,
      });
      router.push("/");
    } else {
      errObj.forEach((item) => {
        setLoginErrors((prev) => {
          return {
            ...prev,
            [item]: item,
          };
        });
      });
    }
  };

  return (
    <div className="form-container">
      <div className="top">
        <p className="top--h1">Fakebook</p>
        <p className="top--description">
          Fakebook helps people connect and share with people
        </p>
      </div>
      {openRegister && <Register toggleModal={() => toggleModal()} />}

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
            value={loginUserInfo.email}
            onChange={handleLoginChange}
            name="email"
            style={
              loginErrors.email && {
                borderColor: "red",
              }
            }
          />
          <input
            className="form-password"
            type="password"
            placeholder="Password"
            value={loginUserInfo.password}
            onChange={handleLoginChange}
            name="password"
            style={
              loginErrors.password && {
                borderColor: "red",
              }
            }
          />
        </div>
        <input className="login--btn" type="submit" value="Login" />
        <div className="login--new">
          <p className="bottom-text">Don't have an account?</p>

          <span onClick={toggleModal} className="bottom-btn">
            Sign up
          </span>
        </div>
      </form>
      <Modal />
    </div>
  );
};

export default signin;
