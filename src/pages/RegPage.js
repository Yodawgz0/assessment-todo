import React from "react";
import "../styles/regPageStyle.scss";

const RegPage = () => {
  return (
    <div className="regContainer">
      <form className="regContainer__form">
        <div className="regContainer__form__element">
          <label className="regContainer__form__element__label mandateText">
            FullName:
          </label>
          <input
            className="regContainer__form__element__input"
            type="text"
            name="FullName"
            id="FullName"
          />
        </div>
        <div className="regContainer__form__element">
          <label className="regContainer__form__element__label mandateText">
            UserName:
          </label>
          <input
            className="regContainer__form__element__input "
            type="text"
            name="UserName"
            id="UserName"
            required
          />
        </div>
        <div className="regContainer__form__element">
          <label className="regContainer__form__element__label mandateText">
            E-Mail:
          </label>
          <input
            className="regContainer__form__element__input"
            type="text"
            name="E-Mail"
            id="E-Mail"
            required
          />
        </div>
        <div className="regContainer__form__element">
          <label className="regContainer__form__element__label">
            Contact Number:
          </label>
          <input
            className="regContainer__form__element__input"
            type="text"
            name="Contact Number"
            id="Contact Number"
            required
          />
        </div>
        <div className="regContainer__form__element">
          <label className="regContainer__form__element__label mandateText">
            Password:
          </label>
          <input
            className="regContainer__form__element__input"
            type="text"
            name="Password"
            id="Password"
            required
          />
        </div>
        <div className="regContainer__form__element">
          <label className="regContainer__form__element__label">
            Profile Image:
          </label>
          <input
            className="regContainer__form__element__input"
            type="text"
            name="Profile Image"
            id="Profile Image"
            required
          />
        </div>
      </form>
    </div>
  );
};

export default RegPage;
