const Sidebar = ({ user }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-item">
        <i className="fa-solid fa-house"></i>
        <p> Home</p>
      </div>
      <div className="sidebar-item">
        <img className="sidebar-userimg" src={user.avatarImg}></img>
        <p>
          {user.first} {user.last}
        </p>
      </div>
      <hr />
      <div className="sidebar-item">
        <i className="fa-solid fa-user-group"></i>
        <p>Friends</p>
      </div>
    </div>
  );
};

export default Sidebar;
