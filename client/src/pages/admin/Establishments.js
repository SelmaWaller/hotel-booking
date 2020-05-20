import React, {useState} from 'react';

export default function Establishments() {
  const [openModal, setOpenModal] = useState(false);

  let createNew = () => {
    setOpenModal(true);
  };

  return (
    <>
      <button onClick={createNew}>Create new</button>
    </>
  );
}
