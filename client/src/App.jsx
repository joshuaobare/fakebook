import { useState, useEffect } from "react";
import "./App.css";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import NavBar from "./components/NavBar";
import FullPost from "./components/FullPost";
import Profile from "./components/Profile";
import FriendsTab from "./components/FriendsTab";
import { HashRouter, BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [activePostData, setActivePostData] = useState({
    postId: "",
    userId: "",
  });
  const [postDialogOpen, setPostDialogOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const dialogOpener = (postData) => {
    setPostDialogOpen(true);

    if (postData !== undefined) {
      setActivePostData(postData);
    }
  };

  const dialogCloser = () => {
    setPostDialogOpen(false);
    setActivePostData({
      postId: "",
      userId: "",
    });
  };
  const loginHandler = () => {
    setLoggedIn(true)
  }

  const loginCheck = async () => {
    const request = await fetch(`http://localhost:3000/api/verification`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const response = await request.json();
    console.log(response);

    if (response.error === undefined) {
      localStorage.setItem("user", JSON.stringify(response.user.user));
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  };
  console.log(loggedIn);

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {      
      loginCheck();
    }
  }, []);

  return (
    <>
      <BrowserRouter basename="/">
        {/*<NavBar />*/}
        <main className="main-body">
          <Routes>
            <Route
              path="/"
              exact
              element={
                loggedIn ? (
                  <HomePage
                    dialogHandler={dialogOpener}
                    dialogCloser={dialogCloser}
                    activePostData={activePostData}
                    postDialogOpen={postDialogOpen}
                  />
                ) : (
                  <Login loginHandler={loginHandler}/>
                )
              }
            />
            <Route
              path="/user/:id"
              exact
              element={
                <Profile
                  dialogCloser={dialogCloser}
                  activePostData={activePostData}
                  dialogHandler={dialogOpener}
                  postDialogOpen={postDialogOpen}
                />
              }
            />
            <Route path="/friends" element={<FriendsTab />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
