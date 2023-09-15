/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { ReactComponent as LikeIcon } from "../assets/fbLike.svg";
import { ReactComponent as CommentIcon } from "../assets/comment.svg";
import { ReactComponent as LikedIcon } from "../assets/fbLiked.svg";
import { useEffect, useState, useRef } from "react";
import Dialog from "@mui/material/Dialog";
import { Close } from "@mui/icons-material";
import Comment from "./Comment";

const FullPost = (props) => {
  const [postData, setPostData] = useState({
    likes: [],
  });
  const [poster, setPoster] = useState({
    fullName: "",
  });
  const [comments, setComments] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const [liked, setLiked] = useState(false);
  const [formData, setFormData] = useState({
    text: "",
    postId: props.activePostData.postId,
    userId: user._id,
  });
  const postElement = useRef(null)

  const likePost = async () => {
    const request = await fetch(
      `http://localhost:3000/api/post/${postData._id}/like`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ userId: user._id }),
      }
    );
    const response = await request.json();
    console.log(response);
    fetchPost();
    setLiked((prevState) => !prevState);
  };

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

  const handleChange = (e) => {
    setFormData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const request = await fetch(`http://localhost:3000/api/post/${props.activePostData.postId}/comment`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    });
    const response = await request.json()
    
    if(response.message !== undefined){
      setFormData({
        text: "",
        postId: props.activePostData.postId,
        userId: props.activePostData.userId,
      })
      fetchPost()      
    }
  };

  useEffect(() => {
    fetchPost();
    fetchPoster();
    document.onreadystatechange = () => {
      console.log(postElement.current.clientHeight);
    };
  }, []);

  useEffect(() => {
    const hasLiked = postData.likes.some(
      (like) => like.toString() === user._id.toString()
    );
    
    if (hasLiked) {
      setLiked(true);
    }
    
  }, [postData]);

  const commentSectionStyle = {
    minHeight: `calc(55vh - 10vh)`
      //${postElement.current.clientHeight}px)`
  }

  return (
    <Dialog open={props.postDialogOpen}>
      <div className="full-post">
        <div className="full-post-header">
          <div className="full-post-header-title">
            {poster.fullName.split(" ")[0]}'s Post
          </div>
          <div className="dialog-close" onClick={() => {
            props.dialogCloser()
            props.fetchPosts()
            }}>
            <Close />
          </div>
        </div>
        <div className="full-post-center">
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
            <div className="like-section" onClick={() => likePost()}>
              {!liked ? (
                <div className="like-section">
                  <LikeIcon />
                  <div>Like</div>
                </div>
              ) : (
                <div className="like-section">
                  <LikedIcon /> <div>Unlike</div>
                </div>
              )}
            </div>
            <div className="comment-section">
              <CommentIcon />
              <div>Comment</div>
            </div>
          </div>
          <div className="full-post-comments" ref={postElement} >
            {comments.map((comment) => (
              <Comment key={comment._id} comment={comment} />
            ))}
          </div>
        </div>
        <div className="full-post-add-comment-section">
          <img src={user.avatar} alt="User Avatar" className="commenter-pic" />
          <form
            action=""
            method="post"
            className="comment-form"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Write a comment..."
              className="full-post-comment-input"
              name="text"
              value={formData.text}
              onChange={handleChange}
            />
            <button className="create-post-form-btn">
              <span className="material-symbols-outlined">send</span>
            </button>
          </form>
        </div>
      </div>
    </Dialog>
  );
};

export default FullPost;
