import "../index.css";
import logoPath from "../images/Logo.svg";

const Header = () => {
  return (
    <header className="header">
      <img className="header__logo" src={logoPath} alt="лого" />
    </header>
  );
};

export default Header;
