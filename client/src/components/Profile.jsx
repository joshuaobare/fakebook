/* eslint-disable react/prop-types */
import fblogo from "../assets/fblogo.png";
import educationlogo from "../assets/educationlogo.png";
import locationlogo from "../assets/locationlogo.png";
import worklogo from "../assets/worklogo.png";
import rellogo from "../assets/rellogo.png";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Post from "./Post";
import FullPost from "./FullPost";

const Profile = (props) => {
  const { id } = useParams();
  const [profile, setProfile] = useState({});
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const request = await fetch(`http://localhost:3000/api/user/${id}/posts`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const response = await request.json();
    setPosts(response.posts);
  };

  const fetchProfile = async () => {
    const request = await fetch(`http://localhost:3000/api/user/${id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const response = await request.json();
    setProfile(response.user);
  };
  const style = {
    backgroundImage: `url(${profile.avatar})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };

  useEffect(() => {
    fetchPosts();
    fetchProfile();
  }, []);

  return (
    <div className="profile">
      {props.postDialogOpen ? (
        <FullPost postDialogOpen={props.postDialogOpen} dialogCloser={props.dialogCloser} activePostData={props.activePostData} />
      ) : null}
      <div className="profile-cont">
        <div className="profile-top">
          <div className="profile-cover" style={style}></div>
          <div className="profile-header">
            <img
              src={profile.avatar}
              alt="Profile Picture"
              className="profile-pic"
            />
            <div>
              <h1 className="profile-header-username">{profile.fullName}</h1>
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
          <div>
            {posts.map((post) => (
              <Post
                key={post._id}
                post={post}
                dialogHandler={props.dialogHandler}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
