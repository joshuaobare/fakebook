/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { ReactComponent as LikeIcon } from "../assets/fbLike.svg";
import { ReactComponent as CommentIcon } from "../assets/comment.svg";
import { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import { Close } from "@mui/icons-material";

const FullPost = (props) => {
  const [postData, setPostData] = useState({});
  const [user, setUser] = useState({});
  const [comments, setComments] = useState([]);

  const fetchPost = async () => {
    const request = await fetch(
      `http://localhost:3000/api/post/${props.activePostData.postId}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const response = await request.json();
    setPostData(response.post[0]);
    setComments(response.comments);
  };
  const fetchUser = async () => {
    const request = await fetch(
      `http://localhost:3000/api/user/${props.activePostData.userId}`,
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

  console.log(postData);

  useEffect(() => {
    fetchPost();
    fetchUser();
  }, []);

  return (
    <div>
      <Dialog open={props.postDialogOpen}>
        <div className="full-post-header">
          <div className="full-post-header-title">{user.fullName.split(" ")[0]}'s Post</div>
          <div className="dialog-close"><Close /></div>
        </div>
        <div className="post-header">
          <img
            src={user.avatar}
            alt="User Avatar"
            className="navbar-profile-pic"
          />
          <div className="post-header-name-section">
            <div className="post-header-username">{user.fullName}</div>
            <div className="post-header-timestamp">{postData.timestamp}</div>
          </div>
        </div>
        <div>{postData.text}</div>
        <div className="like-comment-count-section">
          <div>
            {/* {postData.likes.length}{" "}
            {postData.likes.length === 1 ? "like" : "likes"} */}
          </div>
          <div>
            {comments.length} {comments.length === 1 ? "comment" : "comments"}
          </div>
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
      </Dialog>
    </div>
  );
};

export default FullPost;
