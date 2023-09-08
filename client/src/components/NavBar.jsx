import fblogo from "../assets/fblogo.png";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [profiles, setProfiles] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [foundProfiles, setFoundProfiles] = useState([]);

  const fetchProfiles = async () => {
    const request = await fetch(`http://localhost:3000/api/users`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const response = await request.json();

    if (response.users !== undefined) {
      const allProfiles = [...response.users]
      const index = allProfiles.findIndex(
        (profile) => profile._id.toString() === user._id.toString()
      );
      allProfiles.splice(index, 1);
      setProfiles(allProfiles);
    }
  };

  const searchHandler = (e) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  useEffect(() => {
    const filteredValue = profiles.filter((profile) => {
      if (searchValue === "") {
        return "";
      } else {
        return (profile.fullName).toLowerCase().includes(searchValue.toLowerCase());
      }
    });
    setFoundProfiles(filteredValue);
  }, [searchValue]);

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
            name="search"
            value={searchValue}
            onChange={searchHandler}
          />
          <div className="search-bar-results">{foundProfiles.map(profile => <li key={profile._id} className="search-bar-result-item">{profile.fullName}</li>)}</div>
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
        <img
          src={user.avatar}
          alt="Profile Pic Icon"
          className="navbar-profile-pic"
        />
      </div>
    </nav>
  );
};

export default NavBar;
