import React, {useEffect, useState} from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';

import Illustration from '../components/illustration';
import SearchBar from '../components/search-bar';
import Hotels from '../components/hotels';
import AllHotelLocations from '../components/all-hotel-locations';

import user_icon_light from '../svgs/icons/user_icon_light.svg';
import ReactSlider from 'react-slider';
import {ESTABLISHMENTS_API} from '../constants/constants';

export default function Home() {
  const [hotels, setHotels] = useState([]);
  const [filteredGuests, setFilteredGuests] = useState(2);
  const [switchButton, setSwitchButton] = useState(true);
  const [filteredCatering, setFilteredCatering] = useState(true);
  const [filteredPrice, setFilteredPrice] = useState({min: 0, max: 300});
  const [filteredMatches, setFilterMatches] = useState([]);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    axios.get(ESTABLISHMENTS_API).then((hotels) => {
      setHotels(hotels.data);
    });
  }, []);

  let handleFilter = (input) => {
    let name = input.target.name;
    let value = input.target.value;

    switch (name) {
      case 'guests':
        setFilteredGuests(value);
        break;
      default:
        break;
    }
  };

  let toggleSwitch = () => {
    setSwitchButton(!switchButton);
    setFilteredCatering(!filteredCatering);
  };

  const applyFilter = () => {
    setNoResults(true);
    let checkCatering = String(filteredCatering);
    const filter = hotels.filter(
      (hotel) =>
        parseFloat(hotel.price) >= filteredPrice.min &&
        parseFloat(hotel.price) <= filteredPrice.max &&
        parseFloat(hotel.maxGuests) >= filteredGuests &&
        hotel.selfCatering === checkCatering
    );
    setFilterMatches(filter);
  };

  return (
    <>
      <div className="home-illustration">
        <Illustration />
      </div>
      <header className="container__inner">
        <div className="header">
          <h1>BERGEN</h1>
          <p>
            Explore the city of Norway <br />
            surrounded by The Seven Mountains
          </p>
          <SearchBar hotels={hotels} />
        </div>
      </header>

      <main className="content-animation">
        <section>
          <div className="filter-box">
            <div className="aligned-options">
              <div className="catering">
                <p>Self-catering</p>
                <div className="switch">
                  <div
                    className={
                      switchButton ? 'switch__on' : 'switch__on--hidden'
                    }
                  >
                    <input
                      onClick={toggleSwitch}
                      type="radio"
                      name="selfCatering"
                      value="false"
                    />
                    <span>Yes</span>
                    <div className="switchThumb"></div>
                  </div>

                  <div
                    className={
                      switchButton ? 'switch__off--hidden' : 'switch__off'
                    }
                  >
                    <input
                      onClick={toggleSwitch}
                      type="radio"
                      name="selfCatering"
                      value={'true'}
                      defaultChecked={true}
                    />
                    <span>No</span>
                    <div className="switchThumb"></div>
                  </div>
                </div>
              </div>

              <div className="guests">
                <p>Min guests</p>
                <div className="guest-counter">
                  <input
                    name="guests"
                    type="number"
                    defaultValue={2}
                    min="1"
                    max="999"
                    onChange={handleFilter}
                  />
                  <img src={user_icon_light} alt="guests" />
                </div>
              </div>
            </div>

            <p>Price range</p>
            <div className="slider-container">
              <ReactSlider
                className="slider"
                thumbClassName="slider__thumb"
                trackClassName="slider__track"
                defaultValue={[0, 300]}
                min={0}
                max={300}
                step={10}
                onChange={(newValue) => {
                  setFilteredPrice({min: newValue[0], max: newValue[1]});
                  console.log(filteredPrice);
                }}
                renderThumb={(props, state) => (
                  <div className="currentValue" {...props}>
                    {`$` + state.valueNow}
                  </div>
                )}
                pearling
                minDistance={10}
              />
            </div>
            <button onClick={applyFilter}>Apply filters</button>
            <button
              className="secondaryButton"
              onClick={() => {
                setFilterMatches([]);
                setNoResults(false);
              }}
            >
              Remove filters
            </button>
          </div>
        </section>

        {filteredMatches.length === 0 ? (
          hotels ? (
            <>
              <div className="container__inner filter-status">
                <h3>
                  {noResults
                    ? 'No results, showing all hotels:'
                    : 'All hotels:'}
                </h3>
              </div>
              <div className="grid all-hotels">
                {hotels.map((hotel, index) => {
                  return (
                    <div className="card" key={index}>
                      <Hotels
                        key={index}
                        img={hotel.imageUrl}
                        name={hotel.establishmentName}
                        price={hotel.price}
                        guests={hotel.maxGuests}
                        selfCatering={hotel.selfCatering}
                        id={hotel.id}
                      />
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <>
              <div className="loading-circle">
                <ReactLoading
                  type={'spinningBubbles'}
                  color={'#ffc69c'}
                  height={100}
                  width={100}
                />
              </div>
            </>
          )
        ) : (
          <>
            <div className="container__inner  filter-status">
              <h3>Filtered results:</h3>
            </div>
            <div className="grid all-hotels">
              {filteredMatches.map((hotel, index) => {
                return (
                  <div className="card" key={index}>
                    <Hotels
                      key={index}
                      img={hotel.imageUrl}
                      name={hotel.establishmentName}
                      price={hotel.price}
                      guests={hotel.maxGuests}
                      selfCatering={hotel.selfCatering}
                      id={hotel.id}
                    />
                  </div>
                );
              })}
            </div>
          </>
        )}

        <div className="google-map">
          <AllHotelLocations hotels={hotels} />
        </div>
      </main>
    </>
  );
}
