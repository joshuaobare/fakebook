const CreatePost = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="homepage-create-post">
      <img
        src={user.avatar}
        alt="Profile Pic Icon"
        className="navbar-profile-pic"
      />
      <form action="" className="create-post-form">
        <input
          type="text"
          placeholder={`What's on your mind, ${user.fullName.split(" ")[0]}?`}
          className="homepage-create-post-input"
        />
        <button className="create-post-form-btn">
          <span className="material-symbols-outlined">send</span>
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
