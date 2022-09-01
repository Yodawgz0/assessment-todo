import React, { useState } from "react";
import "../styles/logInPageStyles.scss";
import { useNavigate } from "react-router-dom";

export default function LogInPage() {
  const [loginVals, setLoginVals] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();
    let userHeader = new Headers();

    userHeader.append("Content-Type", "application/json");
    const userDetails = JSON.stringify(loginVals);
    const requestOptions = {
      method: "POST",
      headers: userHeader,
      body: userDetails,
      redirect: "follow",
    };
    await fetch(
      "https://api-nodejs-todolist.herokuapp.com/user/login",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        if (result.includes("Unable to login")) {
          alert(result);
        } else {
          sessionStorage.setItem("sessionkey", JSON.parse(result).token);
          navigate(0);
          navigate("/DashBoard");
        }
      })
      .catch((error) => {
        alert("Something Went Wrong!!");
        console.log(error);
      });
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
              maxLength="30"
              required
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
              required
              value={loginVals["Password"]}
              onChange={(e) =>
                setLoginVals({ ...loginVals, password: e.target.value })
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
