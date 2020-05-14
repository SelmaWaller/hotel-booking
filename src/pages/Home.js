import React from 'react';
import ReactLoading from 'react-loading';
import Collapsible from 'react-collapsible';

import Illustration from '../components/illustration';
import SearchBar from '../components/search-bar';
import Hotels from '../components/hotels';
import AllHotelLocations from '../components/all-hotel-locations';

import user_icon_light from '../svgs/icons/user_icon_light.svg';
import ReactSlider from 'react-slider';

function Home() {
  const hotels = require('../lib/establishments.json');

  let applyFilter;

  return (
    <>
      <Illustration />

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

      <main>
        <section className="container__inner">
          <Collapsible trigger="Filter hotels" open={true}>
            <p>Prince per night</p>
            <ReactSlider
              className="slider"
              thumbClassName="slider__thumb"
              trackClassName="slider__track"
              defaultValue={[0, 200]}
              min={0}
              max={200}
              step={10}
              ariaLabel={['Min price', 'Max price']}
              ariaValuetext={currentValue =>
                console.log(`Current value ${currentValue.valueNow}`)
              }
              renderThumb={(props, state) => (
                <div className="currentValue" {...props}>
                  {`$` + state.valueNow}
                </div>
              )}
              pearling
              minDistance={10}
            />

            <div className="aligned-options">
              <div className="self-catering">
                <p>Self catering</p>
                <div className="switch">
                  <input type="checkbox" defaultChecked />
                  <div className="switchThumb"></div>
                </div>
              </div>
              <div className="guests">
                <p>Guests</p>
                <div className="guest-counter">
                  <input type="number" min="1" max="20" />
                  <img src={user_icon_light} alt="guests" />
                </div>
              </div>
            </div>
            <button onClick={applyFilter}>Apply filters</button>
          </Collapsible>
        </section>

        <div className="grid container__inner">
          {hotels ? (
            hotels.map((value, index) => {
              return (
                <div className="card" key={index}>
                  <Hotels
                    key={index}
                    img={value.imageUrl}
                    name={value.establishmentName}
                    price={value.price}
                    guests={value.maxGuests}
                    id={value.id}
                  />
                </div>
              );
            })
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
          )}
        </div>

        <AllHotelLocations hotels={hotels} />
      </main>
    </>
  );
}

export default Home;
