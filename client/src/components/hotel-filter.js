import React, {useState} from 'react';
import Collapsible from 'react-collapsible';
import ReactSlider from 'react-slider';

import user_icon_light from '../svgs/icons/user_icon_light.svg';

const HotelFilter = ({hotels, setNoResults, setFilterMatches}) => {
  const [filteredGuests, setFilteredGuests] = useState(1);
  const [filteredPrice, setFilteredPrice] = useState({min: 0, max: 300});
  const [sortedLow, setSortedLow] = useState(undefined);

  let handleFilter = () => {
    setNoResults(true);
    const filter = hotels.filter(
      (hotel) =>
        parseFloat(hotel.price) >= filteredPrice.min &&
        parseFloat(hotel.price) <= filteredPrice.max &&
        parseFloat(hotel.maxGuests) >= filteredGuests
    );

    setFilterMatches(filter);
  };
  return (
    <Collapsible trigger="Filter hotels">
      <div className="filter-box">
        <div className="options-grid">
          <div className="sort-price">
            <p>Sort price</p>
            <div className="switch">
              <div className={sortedLow ? 'switch__on' : 'switch__off'}>
                <input
                  type="checkbox"
                  onClick={() => {
                    setSortedLow(!sortedLow);
                    hotels.sort(function (low, high) {
                      if (sortedLow === true) {
                        return low.price - high.price;
                      } else {
                        return high.price - low.price;
                      }
                    });
                    handleFilter();
                  }}
                />
                <p>{sortedLow ? 'High' : 'Low'}</p>
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
                defaultValue={1}
                min="1"
                max="99"
                onChange={(input) => {
                  setFilteredGuests(input.target.value);
                  handleFilter();
                }}
              />
              <img src={user_icon_light} alt="guests" />
            </div>
          </div>
          <div className="reset-button">
            <button
              onClick={() => {
                setFilterMatches([]);
                setNoResults(false);
                hotels.sort(function (low, high) {
                  return high.id - low.id;
                });
              }}
            >
              Show all
            </button>
          </div>
        </div>

        <p>Price range</p>
        <div className="slider-container">
          <ReactSlider
            className="slider"
            thumbClassName="slider__thumb"
            trackClassName="slider__track"
            defaultValue={[0, 200]}
            min={0}
            max={200}
            step={10}
            onChange={(newValue) => {
              setFilteredPrice({min: newValue[0], max: newValue[1]});
              handleFilter();
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
      </div>
    </Collapsible>
  );
};

export default HotelFilter;
