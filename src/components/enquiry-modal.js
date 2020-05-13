import React from 'react';

const EnquiryModal = ({name, calendarCheckIn, calendarCheckOut}) => {
  return (
    <div className="container__inner">
      <div className="modal">
        <h2>Establishment</h2>
        <p>{name}</p>
        <div className="form">
          <form method="POST" action="enquiry-success.php">
            <label for="clientName">Full name</label>
            <input type="text" name="clientName" id="clientName" />
            <label for="email">Email Address</label>
            <input type="text" name="email" id="email" />
            <label for="checkin">Check-in</label>
            {calendarCheckIn}
            <label for="checkout">Check-out</label>
            {calendarCheckOut}
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EnquiryModal;
