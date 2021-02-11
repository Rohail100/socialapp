import React, { useState } from "react";
import {useDispatch} from 'react-redux';
import user from "../api/user"

export default function RegistrationForm(props) {

  const initialState = {
      name: "",
      email: "",
      password: "",
      password2: ""
  }
  const [{name,email,password,password2}, setState] = useState(initialState);
  const [error, setError] = useState("");

  const dispatch = useDispatch()

  const handleSubmit = e => {
    e.preventDefault();
    if(password!==password2)
      return setError("Passwords not match")
    const nam = toTitleCase(name)
    console.log(nam)
    const data = {name: nam,email,password}
    user.register(dispatch,data).then(err=>{
      setError(err)
      if(err) return;
      props.history.push("/");
    })
        
  };
  function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}
  const onChange = e => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };
  const btnStyle = {
    cursor: 'pointer',
    float: 'right',
    width: 'initial'
  }
  return (
    <div className="form">
    <form onSubmit={handleSubmit}>
    <h1>REGISTRATION</h1>
    {
      error && (<p>{error}</p>)
    }
      <label>Full Name:</label>
      <br />
      <input
        type="text"
        name="name"
        className="input"
        value={name}
        onChange={onChange}
      />
      <br />
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
      <label>ReType-Password:</label>
      <br />
      <input
        type="password"
        name="password2"
        className="input"
        value={password2}
        onChange={onChange}
      />
      <br />
      <input style={btnStyle} type="submit" value="Register" />
    </form>
    </div>
  );
}
