/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { ReactComponent as LikeIcon } from "../assets/fbLike.svg";
import { ReactComponent as CommentIcon } from "../assets/comment.svg";

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
      const response = await request.json();
      console.log(response);
      setUser(response.user);
    };
    fetchUser();
  }, []);

  return (
    <div className="post">
      <div className="post-header">
        <img
          src={user.avatar}
          alt="User Avatar"
          className="navbar-profile-pic"
        />
        <div className="post-header-name-section">
          <div className="post-header-username">{user.username}</div>
          <div className="post-header-timestamp">{props.post.timestamp}</div>
        </div>
      </div>
      <div>{props.post.text}</div>
      <div className="like-comment-count-section">
        <div>Like count</div>
        <div>Comment count</div>
      </div>
      <div className="like-comment-section">
        <div className="like-section">
          <LikeIcon />
          <div>Like</div>
        </div>
        <div className="comment-section">
            <CommentIcon />
            <div>Comment</div> 
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Post;
