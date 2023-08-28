import { useState } from "react";
import "./App.css";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import NavBar from "./components/NavBar";
import FullPost from "./components/FullPost";

function App() {
  const [activePostData, setActivePostData] = useState({
    postId:"",
    userId:""
  });
  const [postDialogOpen, setPostDialogOpen] = useState(false);

  const dialogHandler = (postData) => {
    setPostDialogOpen((prevState) => !prevState);

    if (postData !== undefined) {
      setActivePostData(postData);
    }
  };

  return (
    <>
      <NavBar />
      <HomePage dialogHandler={dialogHandler} activePostData={activePostData} postDialogOpen={postDialogOpen}/>
     
    </>
  );
}

export default App;
