/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Post from "./Post";
import FullPost from "./FullPost";
import CreatePost from "./CreatePost";
import People from "./People";

const HomePage = (props) => {
  const [posts, setPosts] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  const postsSorter = (postsArray) => {
    const friendsPosts = [];

    user.friends.forEach((friend) => {
      const posts = postsArray.filter(
        (post) => post.userId.toString() === friend.toString()
      );

      posts.forEach((post) => friendsPosts.push(post));
    });

    const userPosts = postsArray.filter(
      (post) => post.userId.toString() === user._id.toString()
    );

    userPosts.forEach((post) => friendsPosts.push(post));

    friendsPosts.sort((x, y) => {
      return new Date(y.timestamp).getTime() - new Date(x.timestamp).getTime();
    });

    setPosts([...friendsPosts]);
  };

  const fetchPosts = async () => {
    const request = await fetch("http://localhost:3000/api/posts", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const response = await request.json();

    if (response.posts !== undefined) {
      if (user.friends.length !== 0) {
        postsSorter(response.posts);
      } else {
        response.posts.sort((x, y) => {
          return (
            new Date(y.timestamp).getTime() - new Date(x.timestamp).getTime()
          );
        });
        setPosts([...response.posts]);
      }
    }
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
        <FullPost
          postDialogOpen={props.postDialogOpen}
          dialogCloser={props.dialogCloser}
          activePostData={props.activePostData}
          fetchPosts={fetchPosts}
        />
      ) : null}
      
      <main className="homepage-main">
        <div className="homepage-posts-section">
        <CreatePost fetchPosts={fetchPosts} />
          {posts.map((post) => {
            return (
              <Post
                key={post._id}
                post={post}
                dialogHandler={props.dialogHandler}
                activePostData={props.activePostData}
                fetchPosts={fetchPosts}
              />
            );
          })}
        </div>
        <aside className="homepage-people-section">
          <People />
        </aside>
      </main>
    </div>
  );
};

export default HomePage;
