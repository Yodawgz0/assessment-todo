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
        maxlength="30"
        pattern={pattern}
        required={mandateText}
        value={formVals[title]}
        onChange={(e) => setFormVals({ ...formVals, [title]: e.target.value })}
      />
    </div>
  );
}
