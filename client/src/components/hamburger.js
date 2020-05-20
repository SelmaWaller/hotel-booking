import React from 'react';

const Hamburger = ({navOpen}) => {
  return (
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
  );
};

export default Hamburger;
