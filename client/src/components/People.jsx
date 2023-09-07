import { useEffect, useState } from "react";

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
      const nonFriends = response.users.filter((friend) =>
        user.friends.includes(friend._id.toString())
      );
      console.log(nonFriends);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  return (
    <div>
      <h4>People you may know</h4>
    </div>
  );
};

export default People;
