/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import fblogo from "../assets/fblogo.png";
import Post from "./Post";

const HomePage = (props) => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const request = await fetch("http://localhost:3000/api/posts", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const response = await request.json();
    setPosts(response.posts);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="homepage">
      <div className="homepage-create-post">
        <img
          src={fblogo}
          alt="Profile Pic Icon"
          className="navbar-profile-pic"
        />
        <input
          type="text"
          placeholder="What's on your mind, user?"
          className="homepage-create-post-input"
        />
      </div>
      <div className="homepage-posts-section">
        {posts.map((post) => (
          <Post key={post._id} post={post} dialogHandler = {props.dialogHandler} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
