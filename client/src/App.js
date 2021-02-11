import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import user from "./api/user";
import Header from "./components/layout/Header";
import Home from "./components/home/Home";
import RegistrationForm from "./components/RegistrationForm";
import User from "./components/User";
import Search from "./components/Search";
import Suggestions from "./components/Suggestions";


import "./App.css";

function App(props) {
  const dispatch = useDispatch();
  user.isAuthenticated().then((data) => {
    if (data) {
      dispatch({ type: "LOGIN_SUCCESS" });
      user.getUser(dispatch);
    }
  });
  const isAuthenticated = useSelector(
    (state) => state.authState.isAuthenticated
  );
  const appleft = {
    width: !isAuthenticated && "100%"
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div style={{ display: "flex" }}>
          <div className="appleft" style={appleft}>
            <Route exact path="/" component={Home} />
            <Route path="/register" component={RegistrationForm} />
            <Route path="/user/:id" component={User} />
            <Route path="/search/:query" component={Search} />
            <Route path="/suggestions" component={Suggestions} />
          </div>
          {isAuthenticated && (
            <div className="appright">
              <Suggestions />
            </div>
          )}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
