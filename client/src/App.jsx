import { useState } from "react";
import "./App.css";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import NavBar from "./components/NavBar";
import FullPost from "./components/FullPost";
import Profile from "./components/Profile";

function App() {
  const [activePostData, setActivePostData] = useState({
    postId:"",
    userId:""
  });
  const [postDialogOpen, setPostDialogOpen] = useState(false);

  const dialogOpener = (postData) => {
    setPostDialogOpen(true);

    if (postData !== undefined) {
      setActivePostData(postData);
    }
  };

  const dialogCloser = () => {
    setPostDialogOpen(false)
    setActivePostData({
      postId:"",
      userId:""
    })
  }

  return (
    <>
      <NavBar />
      {/*<HomePage dialogHandler={dialogOpener} dialogCloser={dialogCloser} activePostData={activePostData} postDialogOpen={postDialogOpen}/>
     */}

     <Profile />
    </>
  );
}

export default App;
