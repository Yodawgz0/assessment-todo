import React, { useState } from "react";
import "../styles/regPageStyle.scss";
import RegInput from "../components/RegPage/RegInput";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const RegPage = () => {
  const [formVals, setFormVals] = useState({
    name: "",
    username: "",
    email: "",
    contactNo: "",
    password: "",
  });
  const navigate = useNavigate();
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = await axios.post(
      "https://api-nodejs-todolist.herokuapp.com/user/register",
      JSON.stringify(formVals),
      { headers: { "Content-Type": "application/json" } }
    );
    if (result.status === 201) {
      localStorage.setItem("sessionkey", result.data.token);
      navigate(0);
      navigate("/DashBoard");
    }
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
            type={""}
          />
          <RegInput
            title="Username"
            formVals={formVals}
            setFormVals={setFormVals}
            mandateText={true}
            pattern=".+"
            type={""}
          />
          <RegInput
            title="Email"
            formVals={formVals}
            setFormVals={setFormVals}
            mandateText={true}
            pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
            type={""}
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
            pattern=".+"
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
            id="registerButton"
            type="submit"
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
