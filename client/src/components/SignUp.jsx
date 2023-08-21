import { useState } from "react";

/* eslint-disable react/no-unescaped-entities */
export default function SignUp() {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSignUpChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  return (
    <div className="sign-up">
      <div>
        <div>Sign Up</div>
        <div>It's quick and easy</div>
      </div>
      <form action="">
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            value={formData.fullName}
            onChange={handleSignUpChange}
          />
        </div>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleSignUpChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" value={formData.email} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleSignUpChange}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleSignUpChange}
          />
        </div>
        <div>
          <button>Sign Up</button>
        </div>
      </form>
    </div>
  );
}
