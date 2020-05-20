import React from 'react';

import home_icon_white from '../svgs/icons/home_icon_white.svg';
import home_icon_black from '../svgs/icons/home_icon_black.svg';
import user_icon_white from '../svgs/icons/user_icon_white.svg';
import user_icon_black from '../svgs/icons/user_icon_black.svg';
import visitor_email_icon_white from '../svgs/icons/visitor_email_icon_white.svg';
import visitor_email_icon_black from '../svgs/icons/visitor_email_icon_black.svg';
import check_in_icon_white from '../svgs/icons/check_in_icon_white.svg';
import check_in_icon_black from '../svgs/icons/check_in_icon_black.svg';
import check_out_icon_white from '../svgs/icons/check_out_icon_white.svg';
import check_out_icon_black from '../svgs/icons/check_out_icon_black.svg';
const EnquiriesComponent = ({
  newEnquiry,
  establishment,
  name,
  email,
  checkin,
  checkout,
  adults,
  children,
  notes,
}) => {
  return (
    <>
      <h3>
        <img src={newEnquiry ? home_icon_white : home_icon_black} alt="icon" />
        {establishment}
      </h3>
      <p>
        <img src={newEnquiry ? user_icon_white : user_icon_black} alt="icon" />
        {name}
      </p>
      <p>
        <img
          src={newEnquiry ? visitor_email_icon_white : visitor_email_icon_black}
          alt="icon"
        />
        <a href={`mailto:${email}`} target="_blank">
          {email}
        </a>
      </p>
      <p>
        <img
          src={newEnquiry ? check_in_icon_white : check_in_icon_black}
          alt="icon"
        />
        {checkin}
      </p>
      <p>
        <img
          src={newEnquiry ? check_out_icon_white : check_out_icon_black}
          alt="icon"
        />
        {checkout}
      </p>
      <p>
        <span>Adults:</span> {adults ? adults : 1}
      </p>
      <p>
        <span>Children:</span> {children ? children : 0}
      </p>
      <p>
        <span>Notes:</span> {notes ? notes : ''}
      </p>
    </>
  );
};

export default EnquiriesComponent;
