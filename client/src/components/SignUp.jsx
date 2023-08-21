/* eslint-disable react/no-unescaped-entities */
export default function SignUp() {
  return (
    <div className="sign-up">
      <div>
        <div>Sign Up</div>
        <div>It's quick and easy</div>
      </div>
      <form action="">
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input type="text" name="fullName" id="fullName" />
        </div>
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" name="confirmPassword" id="confirmPassword" />
        </div>
        <div>
            <button>Sign Up</button>
        </div>
      </form>
    </div>
  );
}
