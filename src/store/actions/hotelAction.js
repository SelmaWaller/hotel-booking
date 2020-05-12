import { GET_HOTELS, NO_HOTELS } from "./actionTypes";

const hotelData = require("./../../lib/establishments.json");

export const HotelAction = (name, price, guests, selfCatering) => {
  return (dispatch) => {
    hotelData
      .then((response) => {
        return response.json();
      })
      .then((results) => {
        console.log(results.data.establishmentName);
        dispatch({
          type: GET_HOTELS,
          image: results.imageURL,
          name: results.establishmentName,
          price: results.price,
          guests: results.maxGuests,
        });
      })
      .catch(() => {
        dispatch({
          type: NO_HOTELS,
          name,
        });
      });
  };
};
