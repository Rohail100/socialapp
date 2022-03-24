import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import user from "../../api/user";
import Searchform from "../Searchform";

function Header(props) {
  const isAuthenticated = useSelector(
    (state) => state.authState.isAuthenticated
  );
  const id = useSelector((state) => state.userState._id);

  const dispatch = useDispatch();
  const Logout = (e) => {
    e.preventDefault();
    user.logout(dispatch);
    localStorage.setItem("fetched", false);
  };

  return (
    <header style={headerStyle} className="header">
      <div>
        <Link style={linkStyle} to="/">
          <h2 style={{ margin: 0 }}>SOCIAL APP</h2>
        </Link>
      </div>
      <Searchform />
      {isAuthenticated && (
        <div style={{marginTop: "2px"}}>
          <Link to="/" style={linkStyle}>
            HOME
          </Link>{" "}
          |{" "}
          <Link to={"/user/" + id} style={linkStyle}>
            PROFILE
          </Link>
        </div>
      )}
      <div>
        {isAuthenticated ? (
          <button onClick={Logout} style={btnStyle}>
            Logout
          </button>
        ) : (
          <div>
            <Link style={linkStyle} to="/">
              Login
            </Link>{" "}
            |{" "}
            <Link style={linkStyle} to="/register">
              Register
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

const headerStyle = {
  background: "#333",
  color: "#fff",
  display: "flex",
  flexWrap: "wrap",
};

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
};

const btnStyle = {
  fontSize: "16px",
  color: "#fff",
  borderStyle: "none",
  background: "#333",
  textDecoration: "none",
  cursor: "pointer",
};

export default Header;
