/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { ReactComponent as LikeIcon } from "../assets/fbLike.svg";
import { ReactComponent as CommentIcon } from "../assets/comment.svg";
import { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import { Close } from "@mui/icons-material";

const FullPost = (props) => {
  const [postData, setPostData] = useState({
    likes: [],
  });
  const [poster, setPoster] = useState({
    fullName: "",
  });
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState({
      avatar:""
  })

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
  const fetchPoster = async () => {
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

    setPoster(response.user);
  };

  console.log(user);

  useEffect(() => {
    fetchPost();
    fetchPoster();
    setUser(JSON.parse(localStorage.getItem("user")))
  }, []);

  return (
    <Dialog open={props.postDialogOpen}>
      <div className="full-post">
        <div className="full-post-header">
          <div className="full-post-header-title">
            {poster.fullName.split(" ")[0]}'s Post
          </div>
          <div className="dialog-close" onClick={props.dialogCloser}>
            <Close />
          </div>
        </div>
        <div>
          <div className="post-header">
            <img
              src={poster.avatar}
              alt="Poster Avatar"
              className="navbar-profile-pic"
            />
            <div className="post-header-name-section">
              <div className="post-header-username">{poster.fullName}</div>
              <div className="post-header-timestamp">{postData.timestamp}</div>
            </div>
          </div>
          <div className="post-text">{postData.text}</div>
          <div className="like-comment-count-section">
            <div>
              {postData.likes.length}{" "}
              {postData.likes.length === 1 ? "like" : "likes"}
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
        </div>
        <div>
          <img
            src={user.avatar}
            alt="User Avatar"
            className="comment-pic"
          />
          <div></div>
        </div>
      </div>
    </Dialog>
  );
};

export default FullPost;
