import { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loginError, setLoginError] = useState(false)

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleLoginSubmission = async (e) => {
    e.preventDefault();
    try {
      const request = await fetch("http://localhost:3000/api/login/", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(formData),
      });
      const response = await request.json()

      localStorage.setItem("token", response.token)
      localStorage.setItem("user", response.user)      
      setLoginError(false)
    } catch (err) {
        setLoginError(true)
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form action="" method="post" onSubmit={handleLoginSubmission}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleLoginChange}
          />
          <span className="error-msg"></span>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            onChange={handleLoginChange}
          />
          <span className="error-msg"></span>
        </div>
        
        <div>
            <button>Log In</button>
        </div>
        <div>
            {loginError? "Invalid credentials, try again": ""}
        </div>
      </form>
    </div>
  );
};

export default Login;
