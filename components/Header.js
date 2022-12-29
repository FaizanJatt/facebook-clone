import Script from "next/script";
import { useState } from "react";
function Header({ user }) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const openSettings = (e) => {
    setIsSettingsOpen((prev) => !prev);
  };
  console.log(isSettingsOpen);
  return (
    <>
      <Script src="https://kit.fontawesome.com/ad91fb5d97.js" />
      <div className="header">
        <div className="header-left">
          <i className="fa-brands fa-facebook "></i>
          <div className="logo-container">
            <i className="fa-solid fa-magnifying-glass "></i>
          </div>
        </div>
        <div className="header-right">
          <div className="logo-container header-user">
            <img
              className="currentUser-img"
              src={user.avatarImg}
              alt="currentUserImg"
            />
            <p className="header-user-name" style={{ fontWeight: "bold" }}>
              {user.first}
            </p>
          </div>

          <div className="logo-container">
            <i className="fa-solid fa-bell"></i>
          </div>
          <div
            onClick={openSettings}
            style={isSettingsOpen ? { backgroundColor: "#a7bac7" } : undefined}
            className="logo-container"
          >
            <i className="fa-sharp fa-solid fa-sort-down"></i>
          </div>
          <div
            style={isSettingsOpen ? undefined : { display: "none" }}
            className="settings"
          >
            <div className="settings-self">
              <div className="settings-top">
                <img
                  className="settings-user-img"
                  src={user.avatarImg}
                  alt="userImg"
                />
                <div className="settings-profile">
                  <p className="settings-self-name">
                    {user.first} {user.last}
                  </p>
                  <p className="settings-profile-link">See your Profile</p>
                </div>
              </div>
              <hr className="settings-hr"></hr>
              <div className="settings-logout">
                <div className="logo-container">
                  <i className="fa-sharp fa-solid fa-arrow-right-from-bracket"></i>
                </div>
                <p>Log Out</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
