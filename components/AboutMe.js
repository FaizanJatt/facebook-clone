function AboutMe({ user }) {
  let Dob = new Date(user.dob);
  let r = new Date(user.registrationDate);
  console.log(r);
  let dob = {
    day: Dob.getDate() > 9 ? Dob.getDate() : `0${Dob.getDate()}`,
    date: Dob.getMonth() > 8 ? Dob.getMonth() + 1 : `0${Dob.getMonth() + 1}`,
    year: Dob.getFullYear(),
  };
  let joined = {
    day: r.getDate() > 9 ? r.getDate() : `0${r.getDate()}`,
    date: r.getMonth() > 8 ? r.getMonth() + 1 : `0${r.getMonth() + 1}`,
    year: r.getFullYear(),
  };

  return (
    <div
      className="about-me"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <div className="about-me-header">Intro</div>

      <div className="about-me-container">
        <div className="about-me-detail">
          <div className="about-me-title"> Bio</div>
          <div className="about-me-info">Placeholder Bio</div>
        </div>
        <div className="about-me-detail">
          <div className="about-me-title"> Date of Birth:</div>
          <div className="about-me-info">
            {dob.day}-{dob.date}-{dob.year}
          </div>
        </div>
        <div className="about-me-detail">
          <div className="about-me-title"> Joined</div>
          <div className="about-me-info">
            {joined.day}-{joined.date}-{joined.year}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutMe;
