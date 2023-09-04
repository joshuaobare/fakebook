/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as LikeIcon } from "../assets/fbLike.svg";
import { ReactComponent as LikedIcon } from "../assets/fbLiked.svg";
import { ReactComponent as CommentIcon } from "../assets/comment.svg";
//import Comment from "./Comment";

const Post = (props) => {
  const [poster, setPoster] = useState({});
  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const likePost = async (refresh) => {
    const request = await fetch(
      `http://localhost:3000/api/post/${props.post._id}/like`,
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
    refresh();
    setLiked(prevState => !prevState)
  };

  useEffect(() => {
    const fetchPoster = async () => {
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
      setPoster(response.user);
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
      setComments(response.comments);
    };
    fetchPoster();
    fetchComments();

    const hasLiked = props.post.likes.some(
      (like) => like.toString() === user._id.toString()
    );
    console.log(user)

    if (hasLiked) {
      setLiked(true);
    }
  }, []);

  return (
    <div className="post">
      <div className="post-header">
        <img
          src={poster.avatar}
          alt="User Avatar"
          className="navbar-profile-pic"
        />
        <div className="post-header-name-section">
          <div className="post-header-username">
            <Link to={`/user/${props.post.userId}`}>{poster.fullName}</Link>
          </div>
          <div className="post-header-timestamp">{props.post.timestamp}</div>
        </div>
      </div>
      <div className="post-text">{props.post.text}</div>
      <div className="like-comment-count-section">
        <div>
          {props.post.likes.length}{" "}
          {props.post.likes.length === 1 ? "like" : "likes"}
        </div>
        <div>
          {comments.length} {comments.length === 1 ? "comment" : "comments"}
        </div>
      </div>
      <div className="like-comment-section">
        <div
          className="like-section"
          onClick={() => likePost(props.fetchPosts)}
        >
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
        <div
          className="comment-section"
          onClick={() =>
            props.dialogHandler({
              postId: props.post._id,
              userId: props.post.userId,
            })
          }
        >
          <CommentIcon />
          <div>Comment</div>
        </div>
      </div>
    </div>
  );
};

export default Post;
