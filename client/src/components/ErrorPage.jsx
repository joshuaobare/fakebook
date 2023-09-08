import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div id="wrapper">
      <Link to="/">
        <img src="https://i.imgur.com/qIufhof.png" />
        <div id="info">
          <h3>This page could not be found</h3>
        </div>
      </Link>
    </div>
  );
};

export default ErrorPage;
