import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';

import login_icon_dark from '../svgs/icons/login_icon_dark.svg';
import login_icon_white from '../svgs/icons/login_icon_white.svg';
import logo_dark from '../svgs/logo_dark.svg';
import logo_white from '../svgs/logo_white.svg';
import home_icon_dark from '../svgs/icons/home_icon_dark.svg';
import home_icon_white from '../svgs/icons/home_icon_white.svg';
import contact_icon_dark from '../svgs/icons/contact_icon_dark.svg';
import contact_icon_white from '../svgs/icons/contact_icon_white.svg';
import new_establishment_icon from '../svgs/icons/new_establishment_icon.svg';
import enquiries_icon from '../svgs/icons/enquiries_icon.svg';
import messages_icon from '../svgs/icons/messages_icon.svg';

const Navigation = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [loginInfo, setLoginInfo] = useState(false);
  const [usernameError, setUsernameError] = useState(true);
  const [passwordError, setPasswordError] = useState(true);

  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  let closeMenu = () => {
    setNavOpen(false);
  };

  const loginTokenExists = localStorage.getItem('token');

  let handleChange = (input) => {
    let name = input.target.name;
    let value = input.target.value;
    let username = /^admin$/;
    let password = /^admin$/;

    switch (name) {
      case 'username':
        username.test(value) ? setUsernameError(false) : setUsernameError(true);
        break;
      case 'password':
        password.test(value) ? setPasswordError(false) : setPasswordError(true);
        break;
      default:
        break;
    }
  };

  let handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem('admin', 'admin');
    localStorage.setItem('password', 'admin');
    localStorage.setItem('token', 'faketoken');
    setLoginInfo(false);
  };

  let cancelLogin = (event) => {
    event.preventDefault();
    localStorage.removeItem('admin');
    localStorage.removeItem('password');
    localStorage.removeItem('token');
    setLoginInfo(false);
  };

  return (
    <>
      <div className="navigation">
        <button className="toggle-button" onClick={toggleNav}></button>
        <div className="hamburger">
          <div className="paired">
            <div
              className={navOpen ? 'hamburger__top1--close' : 'hamburger__top1'}
            ></div>
            <div
              className={navOpen ? 'hamburger__top2--close' : 'hamburger__top2'}
            ></div>
          </div>

          <div className="paired">
            <div
              className={
                navOpen ? 'hamburger__middle1--close' : 'hamburger__middle1'
              }
            ></div>
            <div
              className={
                navOpen ? 'hamburger__middle2--close' : 'hamburger__middle2'
              }
            ></div>
          </div>
          <div className="paired">
            <div
              className={
                navOpen ? 'hamburger__bottom1--close' : 'hamburger__bottom1'
              }
            ></div>
            <div
              className={
                navOpen ? 'hamburger__bottom2--close' : 'hamburger__bottom2'
              }
            ></div>
          </div>
        </div>
      </div>

      <div
        className={
          navOpen ? 'transparent-background' : 'transparent-background__hidden'
        }
        onClick={closeMenu}
      ></div>
      <div className={loginTokenExists ? 'admin' : 'visitor'}>
        <div className={navOpen ? 'content' : 'content__hidden'}>
          <div className="logo">
            <img src={loginTokenExists ? logo_white : logo_dark} alt="logo" />
            <h3>HOLIDAZE</h3>
          </div>
          <div className="login">
            <img
              src={
                localStorage.getItem('token')
                  ? login_icon_white
                  : login_icon_dark
              }
              alt="icon"
            />
            <h3>{loginTokenExists ? 'Admin' : 'Visitor'}</h3>
            <button
              onClick={
                localStorage.getItem('token')
                  ? () => {
                      setNavOpen(false);
                      localStorage.removeItem('admin');
                      localStorage.removeItem('password');
                      localStorage.removeItem('token');
                      if (/admin/.test(window.location.href)) {
                        window.location = '/';
                      }
                    }
                  : () => {
                      setLoginInfo(true);
                    }
              }
            >
              {loginTokenExists ? 'Sign out' : 'Sign in'}
            </button>
          </div>
          <div className="pages">
            <ul>
              <li onClick={closeMenu}>
                <NavLink to="/">
                  <img
                    src={
                      localStorage.getItem('token')
                        ? home_icon_white
                        : home_icon_dark
                    }
                    alt="icon"
                  />
                  <h3>Home</h3>
                </NavLink>
              </li>
              <li onClick={closeMenu}>
                <NavLink to="/contact">
                  <img
                    src={
                      localStorage.getItem('token')
                        ? contact_icon_white
                        : contact_icon_dark
                    }
                    alt="icon"
                  />
                  <h3>Contact</h3>
                </NavLink>
              </li>

              <div className="admin-link">
                <li onClick={closeMenu}>
                  <NavLink to="/admin/establishments">
                    <img src={new_establishment_icon} alt="icon" />
                    <h3>Establishments</h3>
                  </NavLink>
                </li>

                <li onClick={closeMenu}>
                  <NavLink to="/admin/enquiries">
                    <img src={enquiries_icon} alt="icon" />
                    <h3>Enquiries</h3>
                  </NavLink>
                </li>

                <li onClick={closeMenu}>
                  <NavLink to="/admin/messages">
                    <img src={messages_icon} alt="icon" />
                    <h3>Messages</h3>
                  </NavLink>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </div>

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

      <div
        className={
          navOpen ? 'content-background' : 'content-background__hidden'
        }
      ></div>
    </>
  );
};

export default Navigation;
