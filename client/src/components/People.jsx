import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const People = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [profiles, setProfiles] = useState([]);

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
      const nonFriends = response.users.filter(
        (friend) => !user.friends.includes(friend._id.toString())
      );
      const index = nonFriends.findIndex(
        (profile) => profile._id.toString() === user._id.toString()
      );
      nonFriends.splice(index, 1);
      setProfiles(nonFriends);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  return (
    <div>
      <h4>People you may know</h4>
      {profiles.map((profile) => (
        <div key={profile._id}>
          <Link to={`/user/${profile._id}`} className="friends-tab-friend">
            <img
              src={profile.avatar}
              alt="friend-avatar"
              className="navbar-profile-pic"
            />
            <div>{profile.fullName}</div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default People;