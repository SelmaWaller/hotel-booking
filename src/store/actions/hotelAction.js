import {GET_HOTELS, NO_HOTELS} from './actionTypes';

const hotels = require('../../lib/establishments.json');

export const CharactersAction = (page, name) => {
  return dispatch => {
    return fetch(
      `https://rickandmortyapi.com/api/character/?page=${page}&name=${name}`
    )
      .then(response => {
        return response.json();
      })
      .then(hotel => {
        dispatch({
          type: GET_HOTELS,
          name: hotel.establishmentName,
          email: hotel.establishmentEmail,
          image: hotel.imageURL,
          price: hotel.price,
          guests: hotel.maxGuests,
          googleLat: hotel.googleLat,
          googleLong: hotel.googleLong,
          description: hotel.description,
          catering: hotel.selfCatering,
          id: hotel.id,
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
