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
  openModal,
}) => {
  return (
    <>
      <div className="container__inner">
        <h1>{name}</h1>
      </div>
      <div className="hotel-image">
        <img src={image} alt={name} />
      </div>
      <div className="container__inner">
        <div className="hotel-details">
          <div className="paired">
            <img src={user_icon_light} alt="max-guests" />
            <p>{guests}</p>
          </div>
          <div className="paired">
            <p>${price}</p>
          </div>
          <div className="paired">{catering ? <p>Self-Catering</p> : ''}</div>
          <div className="paired">
            <a href={`mailto:${email}`}>{email}</a>
          </div>
        </div>
        <p>{description}</p>
        <button onClick={openModal}>Make enquiry</button>
      </div>
    </>
  );
};

export default SingleHotel;
