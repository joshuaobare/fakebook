/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import fblogo from "../assets/fblogo.png";
import Post from "./Post";
import FullPost from "./FullPost";
import CreatePost from "./CreatePost";

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
    setPosts([...response.posts]);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    fetchPosts();    
  }, [props.activePostData, props.postDialogOpen]);

  return (
    <div className="homepage">
      {props.postDialogOpen ? (
        <FullPost postDialogOpen={props.postDialogOpen} dialogCloser={props.dialogCloser} activePostData={props.activePostData} fetchPosts={fetchPosts}/>
      ) : null}
      <CreatePost fetchPosts={fetchPosts} />
      <div className="homepage-posts-section">
        {posts.map((post) => {
          console.log("Posts changed")
          return <Post key={post._id} post={post} dialogHandler = {props.dialogHandler} activePostData={props.activePostData} fetchPosts={fetchPosts} />}
        )}
      </div>
    </div>
  );
};

export default HomePage;
