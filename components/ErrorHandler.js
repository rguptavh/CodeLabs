// import React from "react";

const ErrorHandler = (error) => {
  const errorMsg = error.message;
  if (errorMsg === "The email address is badly formatted.") {
    alert("Please enter a valid email address.");
  } else if (
    errorMsg === "The password is invalid or the user does not have a password."
  ) {
    alert("Password is incorrect, please try again.");
  } else {
    console.log(errorMsg);
  }
};

export default ErrorHandler;
