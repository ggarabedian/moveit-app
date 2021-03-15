import React from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { logout } from "../actions/user.actions";

const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const logOut = (e) => {
    e.preventDefault();

    dispatch(logout());
  };

  return (
    <div className="ui secondary pointing menu">
      <Link to="/" className="item">
        MOVEit
      </Link>
      <div className="right menu">
        {isLoggedIn ? (
          <a href="/" className="ui item" onClick={logOut}>
            Log Out
          </a>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Header;
