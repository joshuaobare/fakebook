import { useState } from "react";

/* eslint-disable react/no-unescaped-entities */
function SignUp() {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: ""
  });
  const [submissionError, setSubmissionError] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: ""
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
          <label htmlFor="avatar-input">Avatar</label>
          <div
            className="flex items-center justify-center w-full"
            id="avatar-input-cont"
          >
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                name="avatar"
                onChange={handleSignUpChange}                
              />
            </label>
          </div>
        </div>
        <div>
          <button>Sign Up</button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
