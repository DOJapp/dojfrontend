import React from 'react'
import BankDetails from './Edit/BankDetails';
import FrimDetails from './Edit/FrimDetails';
import GstDetails from './Edit/GstDetails';
import BasicDetails from './Edit/BasicDetails';
import PartnerDetails from './Edit/PartnerDetails';
function Edit() {
  return (
    <>
      <BasicDetails />
      <GstDetails />
      <FrimDetails />
      <BankDetails />
      <PartnerDetails />
    </>
  )
}

export default Edit
