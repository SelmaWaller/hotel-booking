import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import Collapsible from "react-collapsible";

import establishments from "./../lib/establishments.json";

import Hotels from "./../components/hotels";

import search_icon from "./../svgs/icons/search_icon.svg";
import user_icon_light from "./../svgs/icons/user_icon_light.svg";
import ReactSlider from "react-slider";

function Home() {
  useEffect(() => {}, []);

  let handleHotelSearch = (input) => {
    const hotelSearch = input.target.value;
  };

  let handleHotelFilter;

  let isSelfCatering;

  let applyFilter;
  return (
    <>
      <header>
        <div className="header">
          <h1>BERGEN</h1>
          <p>
            Explore the city of Norway <br />
            surrounded by The Seven Mountains
          </p>
          <div className="searchBar">
            <input
              type="text"
              placeholder={`Search for a hotel`}
              onChange={handleHotelFilter}
            />
            <button onClick={handleHotelSearch}>
              <img src={search_icon} alt="search" />
            </button>
          </div>
        </div>
      </header>

      <main>
        <section>
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
              ariaLabel={["Min price", "Max price"]}
              ariaValuetext={(currentValue) =>
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
        <div className="grid">
          {establishments ? (
            establishments.map((value, index) => {
              return (
                <div className="card" key={index}>
                  <Hotels
                    key={index}
                    img={value.imageUrl}
                    name={value.establishmentName}
                    price={value.price}
                    guests={value.maxGuests}
                  />
                </div>
              );
            })
          ) : (
            <>
              <div className="loading-circle">
                <ReactLoading
                  type={"spinningBubbles"}
                  color={"#ffc69c"}
                  height={100}
                  width={100}
                />
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}

export default Home;
