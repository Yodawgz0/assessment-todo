import React from "react";
import { Row, Col } from "react-grid-system";
import "../styles/regPageStyle.scss";

const RegPage = () => {
  return (
    <div className="regContainer">
      <form className="regContainer__form">
        <div className="regContainer__form__element">
          Name
          <input value={0} />
        </div>
        <div className="regContainer__form__element">
          UserName
          <input value={0} />
        </div>
        <div className="regContainer__form__element">
          E-Mail
          <input value={0} />
        </div>
        <div className="regContainer__form__element">
          Contact Number
          <input value={0} />
        </div>
        <div className="regContainer__form__element">
          Password
          <input value={0} />
        </div>
        <div className="regContainer__form__element">
          Profile Image
          <input value={0} />
        </div>
      </form>
    </div>
  );
};

export default RegPage;
