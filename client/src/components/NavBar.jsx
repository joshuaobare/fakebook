import fblogo from "../assets/fblogo.png";

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={fblogo} alt="Fakebook Logo" className="navbar-logo" />
        <div className="navbar-search-section">
          <span className="material-symbols-outlined navbar-search-icon">
            search
          </span>
          <input
            type="text"
            placeholder="Search Fakebook"
            className="navbar-search-input"
          />
        </div>
      </div>
      <div className="navbar-center">
        <div className="navbar-icon-cont">
          <span className="material-symbols-outlined navbar-middle-tab">
            home
          </span>
        </div>
        <div className="navbar-icon-cont">
          <span className="material-symbols-outlined navbar-middle-tab">
            group
          </span>
        </div>
      </div>
      <div className="navbar-right">
        <img src={fblogo} alt="Profile Pic Icon" className="navbar-profile-pic" />
      </div>
    </nav>
  );
};

export default NavBar;
