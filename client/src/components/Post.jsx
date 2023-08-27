/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { ReactComponent as LikeIcon } from "../assets/fbLike.svg";
import { ReactComponent as CommentIcon } from "../assets/comment.svg";
import Comment from "./Comment";

const Post = (props) => {
  const [user, setUser] = useState({});
  const [comments, setComments] = useState([]);

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

      setUser(response.user);
    };
    const fetchComments = async () => {
      const request = await fetch(
        `http://localhost:3000/api/post/${props.post._id}/comments`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const response = await request.json();
      setComments(response.comments)
    };
    fetchUser();
    fetchComments();
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
          <div className="post-header-username">{user.fullName}</div>
          <div className="post-header-timestamp">{props.post.timestamp}</div>
        </div>
      </div>
      <div>{props.post.text}</div>
      <div className="like-comment-count-section">
        <div>
          {props.post.likes.length}{" "}
          {props.post.likes.length === 1 ? "like" : "likes"}
        </div>
        <div>{comments.length}{" "}
          {comments.length === 1 ? "comment" : "comments"}</div>
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
      <div>
        {comments.map(comment => <Comment key={comment._id} comment = {comment}/>)}
      </div>
    </div>
  );
};

export default Post;
