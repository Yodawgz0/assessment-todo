import React from "react";
import "../../styles/regPageStyle.scss";

export default function RegInput({
  title,
  formVals,
  setFormVals,
  mandateText,
  pattern,
  type = "text",
}) {
  return (
    <div className="regContainer__form__element">
      <label
        className={
          "regContainer__form__element__label" +
          (mandateText ? " mandateText" : "")
        }
      >
        {title}:
      </label>
      <input
        className="regContainer__form__element__input"
        type={type}
        name={title}
        id={title}
        maxLength="30"
        minLength={type === "Password" ? "8" : "3"}
        pattern={pattern}
        required={mandateText}
        value={formVals[title.toLowerCase()]}
        onChange={(e) =>
          setFormVals({ ...formVals, [title.toLowerCase()]: e.target.value })
        }
      />
    </div>
  );
}
