import fblogo from "../assets/fblogo.png";
import educationlogo from "../assets/educationlogo.png";
import locationlogo from "../assets/locationlogo.png";
import worklogo from "../assets/worklogo.png";
import rellogo from "../assets/rellogo.png";

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
          <div>
            <div>Intro</div>
            <div className="profile-intro-item">
              <img src={worklogo} alt="" /> Works At
            </div>
            <div className="profile-intro-item">
              <img src={educationlogo} alt="" /> Education
            </div>
            <div className="profile-intro-item">
              {" "}
              <img src={locationlogo} alt="" /> Home Location
            </div>
            <div className="profile-intro-item">
              {" "}
              <img src={rellogo} alt="" /> Relationship Status
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
