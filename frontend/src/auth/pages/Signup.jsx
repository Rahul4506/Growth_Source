import React, { useState, useRef } from "react";
import { Link, Redirect } from "react-router-dom";
import classes from "../css/Login.module.css";
import logoImage from "../../images/logo.png";

import { signup } from "../helpers";

const initialState = {
  loading: false,
  error: "",
  isSuccess: false,
  didRedirect: false,
};

const Signup = () => {
  const [authState, setAuthState] = useState(initialState);
  const userIdRef = useRef();
  const firstNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    setAuthState((prevAuth) => ({
      ...prevAuth,
      loading: true,
    }));

    const userID = userIdRef.current.value;
    const firstName = firstNameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    signup({ user_id: userID, password , first_name: firstName, email })
      .then((data) => {
        if (!data.success) {
          setAuthState((prevAuth) => ({
            ...prevAuth,
            loading: false,
            isSuccess: false,
            error: data.message,
          }));
        } else {
          setAuthState((prevAuth) => ({
            ...prevAuth,
            isSuccess: true,
            loading: false,
            error: data.message,
            didRedirect: true,
          }));
        }
      })
      .catch((err) => {
        setAuthState((prevAuth) => ({
          ...prevAuth,
          isSuccess: true,
          loading: false,
          error: err,
        }));
      });
  };

  const performRedirect = () => {
    if (authState.didRedirect) {
      return <Redirect to="/" />;
    } else {
      return null;
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes["form-container"]}>
        <img src={logoImage} alt="" className={classes.logo} />
        <h4>Sign Up Canis</h4>

        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="User ID (eg: AB0001)" ref={userIdRef} />
          <input type="text" placeholder="First Name" ref={firstNameRef} />
          <input type="text" placeholder="Email" ref={emailRef} />
          <input type="password" placeholder="Password" ref={passwordRef} />

          <button type="submit" className={classes["btn-primary"]}>
            {authState.loading ? "Signing Up" : "Sign Up"}
          </button>
        </form>

        <Link to="/login" className={classes["already-registered"]}>
          Already registered? Login here.
        </Link>

        {authState.error && <div className={classes["error-message"]}>{authState.error}</div>}
      </div>
      {performRedirect()}
    </div>
  );
};

export default Signup;