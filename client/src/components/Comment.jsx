import { useEffect, useState } from "react";

/* eslint-disable react/prop-types */
const Comment = (props) => {
  const [commenter, setCommenter] = useState({})

  const fetchUser = async () => {
    const request = await fetch(
      `http://localhost:3000/api/user/${props.comment.userId}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const response = await request.json();

    setCommenter(response.user);
  };

  useEffect(()=>{
    fetchUser()
  },[])


  return (
    <div className="comment">
      <img src={commenter.avatar} className="navbar-profile-pic" alt="Commenter Avatar" />
      <div>
        <div>{commenter.fullName}</div>
        <div>{props.comment.text}</div>
      </div>
    </div>
  );
};

export default Comment;
