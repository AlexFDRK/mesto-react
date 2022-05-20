import React from "react";
import "../index.css";
import { Link } from "react-router-dom";

const LogForm = ({ title, children, btnText, linkText, onSubmit }) => {
  return (
    <form className="form form_type_dark" noValidate onSubmit={onSubmit}>
      <h3 className="form__title form__title_type_dark">
        {title}
      </h3>
      <div className="form__fields">
        {children}
      </div>
      <button type="submit" className="form__button form__button_type_dark">
        {btnText}
      </button>
      {linkText
        ? <Link to="/sign-in" className="form__link form__link_type_dark">
            {linkText}
          </Link>
        : ""}
    </form>
  );
};

export default LogForm;
