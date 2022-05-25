import React from "react";
import "../index.css";
import LogForm from "../components/LogForm";
import { useState, useEffect } from "react";

const Register = ({ onRegister, error }) => {
  const [email, setMail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(
    () => {
      if(error !== ""){
        setMail("");
        setPassword("");
      }
    },
    [error]
  );

  function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    onRegister(email, password);
  }

  const handleEmailChange = e => {
    setMail(e.target.value);
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  return (
    <LogForm
      title="Регистрация"
      btnText="Зарегистрироваться"
      linkText="Войти"
      onSubmit={handleSubmit}
    >
      <input
        className="form__field form__field_type_dark"
        placeholder="Email"
        value={email || ""}
        onChange={handleEmailChange}
        type="email"
      />
      <input
        className="form__field form__field_type_dark"
        placeholder="Пароль"
        value={password || ""}
        onChange={handlePasswordChange}
        type="password"
      />
    </LogForm>
  );
};

export default Register;
