import React, {useEffect, useState} from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';

import EnquiriesComponent from '../../components/enquiries-component';
import {ENQUIRIES_API} from '../../constants/constants';

export default function Enquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [newEnquiry, setNewEnquiry] = useState(true);

  useEffect(() => {
    axios.get(ENQUIRIES_API).then((enquiries) => {
      setEnquiries(enquiries.data);
    });
  }, []);

  let readEnquiry = () => {
    setNewEnquiry(false);
  };
  return (
    <div className="enquiries-and-messages">
      <div className="container__inner">
        <h1>Enquiries</h1>
      </div>
      <div className="admin-grid">
        {enquiries ? (
          enquiries.map((enquiry, index) => {
            return (
              <div
                className={newEnquiry ? 'card' : 'card__read'}
                key={index}
                onClick={readEnquiry}
              >
                <EnquiriesComponent
                  newEnquiry={newEnquiry}
                  key={index}
                  establishment={enquiry.establishment}
                  name={enquiry.clientName}
                  email={enquiry.email}
                  checkin={enquiry.checkin}
                  checkout={enquiry.checkout}
                  adults={enquiry.adults}
                  children={enquiry.children}
                  notes={enquiry.notes}
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
        <div className="card"></div>
      </div>
    </div>
  );
}
