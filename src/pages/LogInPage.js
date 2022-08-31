import React, { useState } from "react";
import "../styles/logInPageStyles.scss";
import { useNavigate } from "react-router-dom";

export default function LogInPage() {
  const [loginVals, setLoginVals] = useState({
    UserName: "",
    Password: "",
  });
  const navigate = useNavigate();

  function handleLogin(event) {
    event.preventDefault();
    console.log(loginVals.UserName);
    if (localStorage.getItem(loginVals.UserName)) {
      const creds = JSON.parse(localStorage.getItem(loginVals.UserName));
      if (creds.Password === loginVals.Password) {
        alert("Login SuccessFul!");
        localStorage.setItem("sessionKey", loginVals.UserName);
        console.log(localStorage.getItem("sessionKey"));
        navigate("/DashBoard");
      } else {
        alert("Invalid Password!");
        setLoginVals({
          UserName: "",
          Password: "",
        });
      }
    } else {
      alert("Please Register First!!");
      navigate("/Registration");
    }
  }
  return (
    <div className="logIn">
      <h3 className="logIn__Heading">Welcome! Please Login!</h3>
      <div className="logIn__Container">
        <form className="logIn__Container__form" onSubmit={handleLogin}>
          <div className="logIn__Container__form__element">
            <label
              className={"logIn__Container__form__element__label mandateText"}
            >
              UserName:
            </label>
            <input
              className="regContainer__form__element__input"
              type="text"
              name="UserName"
              id="UserName"
              maxLength="30"
              required
              value={loginVals["UserName"]}
              onChange={(e) =>
                setLoginVals({ ...loginVals, UserName: e.target.value })
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
              required
              value={loginVals["Password"]}
              onChange={(e) =>
                setLoginVals({ ...loginVals, Password: e.target.value })
              }
            />
          </div>
          <div className="regContainer__LogIn_button">
            <button className="regContainer__form__submitButton">
              <span className="regContainer__form__submitButton__text">
                Log In
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
