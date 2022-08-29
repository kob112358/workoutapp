import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  const homeHandler = () => {
    navigate("/");
  };
  return (
    <>
      <div>You have visited a url that doesn't exist</div>
      <div>
        <button onClick={homeHandler}>Back to home</button>
      </div>
    </>
  );
};

export default ErrorPage;
