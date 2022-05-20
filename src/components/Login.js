import React from "react";
import "../index.css";
import LogForm from "../components/LogForm";
import { useState, useEffect } from "react";

const Login = ({ onLogin, error }) => {
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

  const handleEmailChange = e => {
    setMail(e.target.value);
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    onLogin(email, password);
  }

  return (
    <LogForm title="Вход" btnText="Войти" onSubmit={handleSubmit}>
      <input
        className="form__field form__field_type_dark"
        placeholder="Email"
        type="email"
        onChange={handleEmailChange}
        value={email || ""}
      />
      <input
        className="form__field form__field_type_dark"
        placeholder="Пароль"
        type="password"
        onChange={handlePasswordChange}
        value={password || ""}
      />
    </LogForm>
  );
};

export default Login;
