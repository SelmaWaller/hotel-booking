import React from 'react';

import home_icon_black from '../svgs/icons/home_icon_black.svg';
import user_icon_black from '../svgs/icons/user_icon_black.svg';
import visitor_email_icon_black from '../svgs/icons/visitor_email_icon_black.svg';
import check_in_icon_black from '../svgs/icons/check_in_icon_black.svg';
import check_out_icon_black from '../svgs/icons/check_out_icon_black.svg';
const EnquiriesComponent = ({
  establishment,
  name,
  email,
  checkin,
  checkout,
  adults,
  children,
  notes,
  time,
}) => {
  return (
    <div className="received-card">
      <div className="received-enquiries">
        <h3>
          <img src={home_icon_black} alt="icon" />
          {establishment}
        </h3>
        <p>
          <img src={user_icon_black} alt="icon" />
          {name}
        </p>
        <p>
          <img src={visitor_email_icon_black} alt="icon" />
          <a href={`mailto:${email}`}>{email}</a>
        </p>
        <p>
          <img src={check_in_icon_black} alt="icon" />
          {checkin}
        </p>
        <p>
          <img src={check_out_icon_black} alt="icon" />
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
        <p>
          <span>Received: </span>
          {time}
        </p>
      </div>
    </div>
  );
};

export default EnquiriesComponent;
