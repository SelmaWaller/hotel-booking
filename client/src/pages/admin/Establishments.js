import React, {useEffect, useState} from 'react';
import axios from 'axios';

import trees from '../../svgs/trees.svg';
import Illustration from '../../components/illustration';
import {ESTABLISHMENTS_API} from '../../constants/constants';
import MyEstablishments from '../../components/my-establishments';
import EstablishmentModal from '../../components/establishment-modal';

export default function Establishments() {
  const [modalOpen, setModalOpen] = useState(false);
  const [establishments, setEstablishments] = useState([]);

  useEffect(() => {
    document.title = 'Holidaze | Establishments';
    axios.get(ESTABLISHMENTS_API).then((establishments) => {
      setEstablishments(establishments.data);
    });
  }, []);

  const openModal = () => {
    window.scrollTo(0, 0);
    setModalOpen(!modalOpen);
  };

  return (
    <>
      <div className={modalOpen ? 'modal__closed' : 'blur'}>
        <Illustration />
      </div>
      <EstablishmentModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        establishments={establishments}
      />
      <div
        className={
          modalOpen ? 'new-establishment__hidden' : 'new-establishment'
        }
      >
        <div className="new-establishment__background">
          <div
            className={
              modalOpen ? 'container__inner--hidden' : 'container__inner'
            }
          >
            <button onClick={openModal}>Create new</button>
            {establishments.length > 0 ? (
              <h1>My establishments</h1>
            ) : (
              <h1>No establishments published yet</h1>
            )}
            {establishments.length > 17 ? (
              //if the length of the array could be changed,the condition would look for a value of this admin's establishments
              establishments.slice(17).map((establishment, index) => {
                return (
                  <div className="card" key={index}>
                    <MyEstablishments
                      key={index}
                      img={establishment.imageUrl}
                      name={establishment.establishmentName}
                      email={establishment.establishmentEmail}
                      price={establishment.price}
                      guests={establishment.maxGuests}
                      catering={establishment.selfCatering}
                      lat={establishment.googleLat}
                      lng={establishment.googleLong}
                      id={establishment.id}
                      description={establishment.description}
                    />
                  </div>
                );
              })
            ) : (
              <>
                <div className="card establishment-placeholder">
                  <p>Your establishments will appear here</p>
                  <img src={trees} alt="illustration" />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
