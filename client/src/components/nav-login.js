import React from 'react';

const NavLogin = ({
  loginInfo,
  setLoginInfo,
  navOpen,
  logo_dark,
  handleChange,
  handleSubmit,
  usernameError,
  passwordError,
}) => {
  let cancelLogin = (event) => {
    event.preventDefault();
    localStorage.removeItem('admin');
    localStorage.removeItem('password');
    localStorage.removeItem('token');
    setLoginInfo(false);
  };
  return (
    <div className={loginInfo ? 'login' : 'login__hidden'}>
      <div className={navOpen ? 'content' : 'content__hidden'}>
        <div className="logo">
          <img src={logo_dark} alt="logo" />
          <h3>HOLIDAZE</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <h3>
            <label htmlFor="username">Username</label>
          </h3>
          <input
            onChange={handleChange}
            type="text"
            name="username"
            id="username"
            placeholder="admin"
          />
          <p className={usernameError ? 'error' : 'error__hidden'}>
            Username is 'admin'
          </p>
          <h3>
            <label htmlFor="password">Password</label>
          </h3>
          <input
            onChange={handleChange}
            type="text"
            name="password"
            id="password"
            placeholder="••••••••"
          />
          <p className={passwordError ? 'error' : 'error__hidden'}>
            Password is 'admin'
          </p>
          <div className="paired">
            <button
              type="submit"
              disabled={usernameError || passwordError}
              className="submitButton"
            >
              Confirm
            </button>
            <button className="secondaryButton" onClick={cancelLogin}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NavLogin;
