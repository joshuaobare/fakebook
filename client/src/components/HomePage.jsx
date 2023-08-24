import fblogo from "../assets/fblogo.png";

const HomePage = () => {
    return(
        <div className="homepage">
            <div className="homepage-create-post">
            <img src={fblogo} alt="Profile Pic Icon" className="navbar-profile-pic" />
                <input type="text" placeholder="What's on your mind, user?" className="homepage-create-post-input" />
            </div>
        </div>
    )
};

export default HomePage;
