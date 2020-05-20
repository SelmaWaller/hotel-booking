import React from 'react';

const MyEstablishments = ({
  img,
  name,
  email,
  price,
  guests,
  catering,
  lat,
  lng,
  description,
}) => {
  return (
    <>
      <div className="my-establishments">
        <div className="hotel-image">
          <img src={img} alt={name} />
        </div>
        <div className="hotel-info">
          <p>
            <span>Name: </span>
            {name}
          </p>
          <p>
            <span>Email: </span>
            {email}
          </p>
          <p>
            <span>Price: </span>${price}
          </p>
          <p>
            <span>Max guests: </span>
            {guests}
          </p>
          <p>
            <span>Self-catering: </span>
            {catering ? 'Yes' : 'No'}
          </p>

          <p>
            <span>Latitude: </span>
            {lat}
          </p>
          <p>
            <span>Longitude: </span>
            {lng}
          </p>
        </div>
      </div>
      <p className="description">{description}</p>
    </>
  );
};

export default MyEstablishments;
