import React from "react";

import home_icon_black from "./../svgs/icons/home_icon_black.svg";

const HotelLocations = ({ name, latitude, longitude }) => {
  return (
    <>
      latitude={}
      text={<img src={home_icon_black} alt={name} />}
    </>
  );
};

export default HotelLocations;
