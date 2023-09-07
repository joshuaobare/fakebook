import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FriendsTab = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [friendRequests, setFriendRequests] = useState([]);
  const [friends, setFriends] = useState([]);
  const [profiles, setProfiles] = useState([]);

  const populateFriends = (profiles) => {
    const requestProfiles = [];
    const friendProfiles = [];

    user.friendRequests.forEach((request) => {
      const requester = profiles.find(
        (user) => user._id.toString() === request.toString()
      );
      requestProfiles.push(requester);
    });

    user.friends.forEach((friend) => {
      const foundFriend = profiles.find(
        (user) => user._id.toString() === friend.toString()
      );
      friendProfiles.push(foundFriend);
    });

    setFriendRequests(requestProfiles);
    setFriends(friendProfiles);
  };

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
      setProfiles(response.users);
      populateFriends(response.users);
    }
  };

  const acceptRequest = async () => {
      
  }

  useEffect(() => {
    fetchProfiles();
  }, []);

  return (
    <div className="friends-tab">
      <div>
        <h1>Friend Requests</h1>
        {friends.length === 0 ? (
          <div>No friend requests to show</div>
        ) : (
            friends.map((request) => (
              <div key={request._id} className="friends-tab-requests">
                <Link to={`/user/${request._id}`} className="friends-tab-friend">
                  <img
                    src={request.avatar}
                    alt="friend-avatar"
                    className="navbar-profile-pic"
                  />
                  <div>{request.fullName}</div>
                </Link>
                <div>
                    <button>Accept Request</button>
                    <button>Reject Request</button>
                </div>
              </div>
            ))
          )}
      </div>
      <div>
        <h1>Friends</h1>
        {friends.length === 0 ? (
          <div>No friends</div>
        ) : (
          friends.map((friend) => (
            <div key={friend._id} >
              <Link to={`/user/${friend._id}`} className="friends-tab-friend">
                <img
                  src={friend.avatar}
                  alt="friend-avatar"
                  className="navbar-profile-pic"
                />
                <div>{friend.fullName}</div>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FriendsTab;
