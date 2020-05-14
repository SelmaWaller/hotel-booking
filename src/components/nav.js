import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';

import login_icon_dark from './../svgs/icons/login_icon_dark.svg';
import logo from './../svgs/logo_dark.svg';
import home_icon_dark from './../svgs/icons/home_icon_dark.svg';
import contact_icon_dark from './../svgs/icons/contact_icon_dark.svg';

const Navigation = ({login}) => {
  const [navOpen, setNavOpen] = useState(false);

  const toggleNav = () => {
    setNavOpen(!navOpen);
    toggleBodyScroll(!navOpen);
  };

  const toggleBodyScroll = hidden => {
    document.body.style.overflow = hidden ? 'hidden' : 'inherit';
  };

  let closeMenu = () => {
    setNavOpen(false);
    toggleBodyScroll(false);
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
      <div className={navOpen ? 'content' : 'content__hidden'}>
        <div className="logo">
          <img src={logo} alt="logo" />
          <h3>HOLIDAZE</h3>
        </div>
        <div className="login">
          <img src={login_icon_dark} alt="icon" />
          <h3>Visitor</h3>
          <button onClick={login}>Sign in</button>
        </div>
        <div className="pages">
          <ul>
            <li onClick={closeMenu}>
              <NavLink to="/">
                <img src={home_icon_dark} alt="home" />
                <h3>Home</h3>
              </NavLink>
            </li>
            <li onClick={closeMenu}>
              <NavLink to="/contact">
                <img src={contact_icon_dark} alt="contact" />
                <h3>Contact</h3>
              </NavLink>
            </li>
          </ul>
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
