import React, {useEffect, useState} from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';

import EnquiriesComponent from '../../components/enquiries-component';
import {ENQUIRIES_API} from '../../constants/constants';
import Illustration from '../../components/illustration';

export default function Enquiries() {
  const [enquiries, setEnquiries] = useState([]);

  useEffect(() => {
    document.title = 'Holidaze | Enquiries';
    axios.get(ENQUIRIES_API).then((enquiries) => {
      setEnquiries(
        enquiries.data.sort(function (older, newer) {
          return (
            new Date(newer.time).getTime() - new Date(older.time).getTime()
          );
        })
      );
    });
  }, []);

  return (
    <div className="styled-scroll">
      <div className="blur">
        <Illustration />
      </div>
      <div className="enquiries-and-messages container__outer">
        <div className="enquiries">
          <div className="container__inner">
            <h1>Enquiries</h1>
          </div>
          {enquiries ? (
            enquiries.map((enquiry, index) => {
              return (
                <EnquiriesComponent
                  key={index}
                  establishment={enquiry.establishment}
                  name={enquiry.clientName}
                  email={enquiry.email}
                  checkin={enquiry.checkin}
                  checkout={enquiry.checkout}
                  adults={enquiry.adults}
                  children={enquiry.children}
                  notes={enquiry.notes}
                  time={new Date(enquiry.time)
                    .toLocaleDateString()
                    .split('.')
                    .join('/')}
                />
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
      </div>
    </div>
  );
}
