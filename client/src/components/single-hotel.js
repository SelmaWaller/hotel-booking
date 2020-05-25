import React from 'react';

import user_icon_light from '../svgs/icons/user_icon_light.svg';

const SingleHotel = ({
  name,
  image,
  guests,
  price,
  catering,
  email,
  description,
}) => {
  return (
    <>
      <div className="header-area">
        <div className="hotel-image">
          <img src={image} alt={name} />
        </div>
        <h1>{name}</h1>
      </div>
      <div className="container__inner">
        <div className="hotel-details">
          <div className="paired">
            <div className="paired">
              <img src={user_icon_light} alt="max-guests" />
              <p>{guests}</p>
            </div>
            <div className="paired">
              <div className="dot"></div>
            </div>
            <div className="paired">
              <p>${price}</p>
            </div>
            <div className="paired">
              <div className="dot"></div>
            </div>
            {catering === 'true' ? (
              <p>Self-catering</p>
            ) : (
              <p>No self-catering</p>
            )}
          </div>
          <a href={`mailto:${email}`}>{email}</a>
          <p>{description}</p>
        </div>
      </div>
    </>
  );
};

export default SingleHotel;
