import { useState } from "react";
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

  return (
    <>
      <BrowserRouter basename="/">
        <NavBar />
        <main className="main-body">
        <Routes>
          <Route
            path="/"
            exact
            element={
              <HomePage
                dialogHandler={dialogOpener}
                dialogCloser={dialogCloser}
                activePostData={activePostData}
                postDialogOpen={postDialogOpen}
              />
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
          <Route 
          path="/friends"
          element={<FriendsTab />}
          
          />
        </Routes>
        </main>
        
      </BrowserRouter>
    </>
  );
}

export default App;
