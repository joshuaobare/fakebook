import fblogo from "../assets/fblogo.png";

const Profile = () => {
  const style = {
    backgroundImage: `url(${fblogo})`,
    background: "cover",
  };
  return (
    <div className="profile">
      <div className="profile-cont">
        <div className="profile-top">
          <div className="profile-cover" style={style}></div>
          <div className="profile-header">
            <img src={fblogo} alt="Profile Picture" className="profile-pic" />
            <div>
              <h1 className="profile-header-username">Profile Name</h1>
              <div>Friend Count</div>
            </div>
          </div>
        </div>
        <div className="profile-bottom">
          <aside></aside>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
