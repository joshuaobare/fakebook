import { useEffect, useState } from "react";
import fblogo from "../assets/fblogo.png";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  
  const fetchPosts = async () => {
      const request = await fetch("http://localhost:3000/api/posts", {
          method:'GET',
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
      })
      const response = request.json()
      setPosts(response)

  };

  useEffect(() => {
      fetchPosts()
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
    </div>
  );
};

export default HomePage;
