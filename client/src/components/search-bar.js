import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import search_icon from './../svgs/icons/search_icon.svg';

const SearchBar = ({hotels}) => {
  const [hotelMatches, setHotelMatches] = useState([]);

  const findMatches = searchValue => {
    const simplifiedValue = searchValue
      .toLowerCase()
      .split(' ')
      .join('');
    const matches =
      simplifiedValue && simplifiedValue.length > 0
        ? hotels.filter(hotel =>
            hotel.establishmentName
              .toLowerCase()
              .split(' ')
              .join('')
              .includes(simplifiedValue)
          )
        : [];

    setHotelMatches(matches);
  };

  const onSearchChange = event => {
    const value = event.target.value;

    findMatches(value);
  };

  return (
    <>
      <div className="searchBar">
        <input
          type="text"
          placeholder={`Search for a hotel`}
          onChange={onSearchChange}
        />
        <button>
          <img src={search_icon} alt="search" />
        </button>
        <ul>
          {hotelMatches.map(hotel => (
            <Link key={hotel.id} to={`/hotel-specific/${hotel.id}`}>
              <li>{hotel.establishmentName}</li>
            </Link>
          ))}
        </ul>
      </div>
    </>
  );
};

export default SearchBar;
