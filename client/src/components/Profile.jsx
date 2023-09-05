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
  const [profile, setProfile] = useState({
    friends: [],
  });
  const [posts, setPosts] = useState([]);
  const [currentUserProfile, setCurrentUserProfile] = useState(false);
  const [isFriend, setIsFriend] = useState(false)
  const user = JSON.parse(localStorage.getItem("user"));

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

  const userCheck = () => {   
    
    if (user._id === id) {
      setCurrentUserProfile(true);
    }
  };

  const friendsCheck = () => {
    const check = profile.friends.some(friend => friend === user._id)

    if(check) {
      setIsFriend(true)
    } else {
      setIsFriend(false)
    }
  }
  const style = {
    backgroundImage: `url(${profile.avatar})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };

  useEffect(() => {
    fetchPosts();
    fetchProfile();
    userCheck();
  }, []);

  useEffect(() => {
    friendsCheck()
  }, [profile])

  return (
    <div className="profile">
      {props.postDialogOpen ? (
        <FullPost
          postDialogOpen={props.postDialogOpen}
          dialogCloser={props.dialogCloser}
          activePostData={props.activePostData}
        />
      ) : null}
      <div className="profile-cont">
        <div className="profile-top">
          <div className="profile-cover" style={style}></div>
          <div className="profile-header-cont">
            <div className="profile-header">
              <img
                src={profile.avatar}
                alt="Profile Picture"
                className="profile-pic"
              />
              <div>
                <h1 className="profile-header-username">{profile.fullName}</h1>
                <div>{profile.friends.length} friends</div>
              </div>
            </div>
            <div>
              {currentUserProfile ? (
                <button>Edit Profile</button>
              ) : (
                <button>Add friend</button>
              )}
            </div>
          </div>
        </div>
        <div className="profile-bottom">
          <div>
            <div>Intro</div>
            <div>{profile.bio}</div>
            <div className="profile-intro-item">
              <img src={worklogo} alt="" /> {profile.jobTitle}
            </div>
            <div className="profile-intro-item">
              {" "}
              <img src={locationlogo} alt="" /> {profile.homeLocation}
            </div>
            <div className="profile-intro-item">
              {" "}
              <img src={rellogo} alt="" /> {profile.relationshipStatus}
            </div>
          </div>
          <div>
            {posts.map((post) => (
              <Post
                key={post._id}
                post={post}
                dialogHandler={props.dialogHandler}
                fetchPosts={fetchPosts}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
