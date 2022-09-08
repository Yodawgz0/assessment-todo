import React, { useState } from "react";
import "../styles/regPageStyle.scss";
import RegInput from "../components/RegPage/RegInput";
import { Link, useNavigate } from "react-router-dom";
const RegPage = () => {
  const [formVals, setFormVals] = useState({
    name: "",
    Username: "",
    email: "",
    ContactNo: "",
    password: "",
  });
  const navigate = useNavigate();
  async function handleSubmit(event) {
    event.preventDefault();
    let userHeader = new Headers();
    userHeader.append("Content-Type", "application/json");
    const userDetails = JSON.stringify(formVals);
    const requestOptions = {
      method: "POST",
      headers: userHeader,
      body: userDetails,
      redirect: "follow",
    };
    await fetch(
      "https://api-nodejs-todolist.herokuapp.com/user/register",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        if (result.includes("E11000")) {
          alert("user already exists! Please login!");
          navigate("/LogIn");
        } else {
          localStorage.setItem("sessionkey", JSON.parse(result).token);
          navigate(0);
          navigate("/DashBoard");
        }
      })
      .catch((error) => {
        alert("Something Went Wrong!!");
        console.log(error);
      });
  }

  return (
    <>
      <div className="regContainer">
        <form className="regContainer__form" onSubmit={handleSubmit}>
          <RegInput
            title="Name"
            formVals={formVals}
            setFormVals={setFormVals}
            mandateText={true}
            pattern="[A-Za-z]*"
          />
          <RegInput
            title="Username"
            formVals={formVals}
            setFormVals={setFormVals}
            mandateText={true}
          />
          <RegInput
            title="Email"
            formVals={formVals}
            setFormVals={setFormVals}
            mandateText={true}
            pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
          />
          <RegInput
            title="ContactNo"
            formVals={formVals}
            type="number"
            setFormVals={setFormVals}
            mandateText={false}
            pattern="[\d]{10}"
          />
          <RegInput
            title="Password"
            formVals={formVals}
            setFormVals={setFormVals}
            mandateText={true}
            type="Password"
          />
          <div className="regContainer__form__element">
            <label className="regContainer__form__element__label">
              Profile Image:
            </label>
            <input
              accept="image/*"
              className="regContainer__form__element__input"
              id="Profile Image"
              type="file"
              disabled={false}
              name="Profile Image"
            />
          </div>
          <button
            aria-label="RegisterButton"
            className="regContainer__form__submitButton"
          >
            <span className="regContainer__form__submitButton__text">
              Register
            </span>
          </button>
        </form>
      </div>
      <div className="regContainer__LogIn_button">
        <Link to="/LogIn">
          <button className="regContainer__form__submitButton">
            <span className="regContainer__form__submitButton__text">
              Log In
            </span>
          </button>
        </Link>
      </div>
    </>
  );
};

export default RegPage;
