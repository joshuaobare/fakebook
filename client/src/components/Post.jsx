/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const Post = (props) => {
  const [user, setUser] = useState({});
  
  useEffect(() => {
    const fetchUser = async () => {
        const request = await fetch(
          `http://localhost:3000/api/user/${props.post.userId}`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const response = await request.json()
        console.log(response)
        setUser(response.user)
      };
      fetchUser()
  }, []);

  return (
    <div>
      <div>{user.username}</div>
      <div>{props.post.text}</div>
      <div>{props.post.timestamp}</div>
      <div>{props.post.userId}</div>
    </div>
  );
};

export default Post;
