import React from "react";
import "../index.css";
import logoPath from "../images/Logo.svg";
import burgerPath from "../images/burger.svg";
import closePath from "../images/CloseIcon.svg";
import { Link } from "react-router-dom";
import { useState } from "react";

const Header = ({ linkTo, linkText, signOut, loggedEmail }) => {
  const [isBurgerVisible, toggleBurgerVisible] = useState(true);

  const burgerClick = () => {
    toggleBurgerVisible(!isBurgerVisible);
  };

  return (
    <header
      className={`header ${isBurgerVisible ? "" : "header__type-column"}`}
    >
      <div className="header__logo-group">
        <img className="header__logo" src={logoPath} alt="лого" />
        <img
          className="header__burger"
          src={isBurgerVisible ? burgerPath : closePath}
          alt="бургер"
          onClick={burgerClick}
        />
      </div>
      <div
        className={`header__login ${isBurgerVisible
          ? ""
          : "header__login_type-visible header__login_type-column"}`}
      >
        <p className="header__login-mail">
          {loggedEmail}
        </p>
        <Link onClick={signOut} to={linkTo} className="header__login-link">
          {linkText}
        </Link>
      </div>
    </header>
  );
};

export default Header;
