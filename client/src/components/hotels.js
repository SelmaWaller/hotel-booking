import React from 'react';
import {Link} from 'react-router-dom';

import user_icon_light from './../svgs/icons/user_icon_light.svg';

const Hotels = ({img, name, price, guests, selfCatering, id}) => {
  return (
    <div className="hotel-cards">
      <Link to={`/hotel-specific/${id}`}>
        <div className="hotel-image">
          <img src={img} alt={name} />
        </div>
        <div className="hotel-details">
          <p className="hotel-name">{name}</p>
          <div className="paired">
            <div className="guest-counter">
              <img src={user_icon_light} alt="guests" />
              <p>{guests}</p>
            </div>
            <p>${price}</p>
          </div>
          <div
            className={selfCatering === 'true' ? 'cooking' : 'cooking__none'}
          >
            <p>Cooking</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Hotels;
