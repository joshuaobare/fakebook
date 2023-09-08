import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div id="error-page">
      <Link to="/">
        <img src="https://miro.medium.com/v2/resize:fit:1080/format:webp/1*DeBkx8vjbumpCO-ZkPE9Cw.png" />
        <div id="info">
          <h3>This page could not be found</h3>
        </div>
      </Link>
    </div>
  );
};

export default ErrorPage;
