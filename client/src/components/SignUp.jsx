import { useState } from "react";

/* eslint-disable react/no-unescaped-entities */
function SignUp() {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [submissionError, setSubmissionError] = useState({
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
    console.log(formData);
  };

  const handleSignUpSubmission = async (e) => {
    e.preventDefault();
    try {
      const request = await fetch("http://localhost:3000/api/user/", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(formData),
      });
      const response = await request.json();
      console.log(response);

      if (response.errors) {
        response.errors.forEach((error) => {
          setSubmissionError((prevState) => {
            return { ...prevState, [error.path]: error.msg };
          });
        });
      } else {
        setFormData({
          fullName: "",
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="sign-up">
      <div>
        <div>Sign Up</div>
        <div>It's quick and easy</div>
      </div>
      <form
        action=""
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        method="post"
        onSubmit={handleSignUpSubmission}
      >
        <div>
          <label
            htmlFor="fullName"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={formData.fullName}
            onChange={handleSignUpChange}
          />
          <span className="error-msg">{submissionError.fullName}</span>
        </div>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            value={formData.username}
            onChange={handleSignUpChange}
          />
          <span className="error-msg">{submissionError.username}</span>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleSignUpChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <span className="error-msg">{submissionError.email}</span>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            value={formData.password}
            onChange={handleSignUpChange}
          />
          <span className="error-msg">{submissionError.password}</span>
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={formData.confirmPassword}
            onChange={handleSignUpChange}
          />
          <span className="error-msg">{submissionError.confirmPassword}</span>
        </div>
        <div>
          <button>Sign Up</button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
