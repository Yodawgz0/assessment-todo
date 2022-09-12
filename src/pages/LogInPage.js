import React, { useState } from "react";
import "../styles/logInPageStyles.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogIn } from "../reducers/getUserOps";

export default function LogInPage() {
  const [loginVals, setLoginVals] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatchLoginDetails = useDispatch();
  const { status } = useSelector((state) => state.userLoginAPI);

  async function handleLogin(event) {
    event.preventDefault();
    dispatchLoginDetails(userLogIn(JSON.stringify(loginVals)));
    if (status === "Error") {
      return alert("Unable to Login");
    }
    navigate(0);
    navigate("/Dashboard");
  }
  const handleRegdirect = () => {
    navigate("/Registration");
  };
  return (
    <div className="logIn">
      <h3 className="logIn__Heading">Welcome! Please Login!</h3>
      <div className="logIn__Container">
        <form className="logIn__Container__form" onSubmit={handleLogin}>
          <div className="logIn__Container__form__element">
            <label
              className={"logIn__Container__form__element__label mandateText"}
            >
              Email:
            </label>
            <input
              className="regContainer__form__element__input"
              type="text"
              name="Email"
              id="Email"
              minLength="7"
              required
              pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
              value={loginVals["Email"]}
              onChange={(e) =>
                setLoginVals({ ...loginVals, email: e.target.value })
              }
            />
          </div>
          <div className="logIn__Container__form__element">
            <label className="logIn__Container__form__element__label mandateText">
              Password:
            </label>
            <input
              className="regContainer__form__element__input"
              type="password"
              name="Password"
              id="Password"
              minLength="8"
              required
              value={loginVals["Password"]}
              onChange={(e) =>
                setLoginVals({ ...loginVals, password: e.target.value })
              }
            />
          </div>
          <div className="regContainer__LogIn_button">
            <button className="regContainer__form__submitButton">
              <span
                aria-label="LoginButton"
                className="regContainer__form__submitButton__text"
              >
                Log In
              </span>
            </button>
          </div>
        </form>
        <button
          className="regContainer__form__submitButton regdirect_button"
          onClick={handleRegdirect}
        >
          <span className="regContainer__form__submitButton__text">
            Register
          </span>
        </button>
      </div>
    </div>
  );
}
