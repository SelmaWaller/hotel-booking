import React from "react";

import user_icon_light from "./../svgs/icons/user_icon_light.svg";

const Hotels = ({ img, name, price, guests }) => {
  return (
    <>
      <div className="hotel-image">
        <img src={img} alt={name} />
      </div>
      <div className="hotel-details">
        <p className="hotel-name">{name}</p>
        <div className="small-grid">
          <div className="guest-counter">
            <img src={user_icon_light} alt="guests" />
            <p>{guests}</p>
          </div>
          <p>${price}</p>
        </div>
      </div>
    </>
  );
};

export default Hotels;
