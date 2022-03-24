import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import user from "../api/user";

export default function LoginForm(props) {
  const initialState = {
    email: "",
    password: "",
  };
  const [{ email, password }, setState] = useState(initialState);
  const errorMessage = useSelector((state) => state.authState.errorMessage);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = { email, password };
    user.login(dispatch, data);
  };
  const onChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };
  const btnStyle = {
    cursor: "pointer",
    float: "right",
    width: "initial",
  };
  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <h1>LOGIN</h1>
        {errorMessage && <p>{errorMessage}</p>}
        <label>Email:</label>
        <br />
        <input
          type="email"
          name="email"
          className="input"
          value={email}
          onChange={onChange}
        />
        <br />
        <label>Password:</label>
        <br />
        <input
          type="password"
          name="password"
          className="input"
          value={password}
          onChange={onChange}
        />
        <br />
        <input style={btnStyle} type="submit" value="Login" />
      </form>
    </div>
  );
}
