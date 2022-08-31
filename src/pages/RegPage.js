import React, { useState } from "react";
import "../styles/regPageStyle.scss";
import RegInput from "../components/RegPage/RegInput";
import { Link } from "react-router-dom";
const RegPage = () => {
  const [formVals, setFormVals] = useState({
    FullName: "",
    UserName: "",
    Email: "",
    ContactNo: "",
    Password: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (localStorage.getItem(formVals.UserName)) {
      alert("User Already Exists with This, Please Login!!");
    } else {
      localStorage.setItem(formVals.UserName, JSON.stringify(formVals));
    }
  };
  return (
    <>
      <div className="regContainer">
        <form className="regContainer__form" onSubmit={handleSubmit}>
          <RegInput
            title="FullName"
            formVals={formVals}
            setFormVals={setFormVals}
            mandateText={true}
            pattern="[A-Za-z]*"
          />
          <RegInput
            title="UserName"
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
          <button className="regContainer__form__submitButton">
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
