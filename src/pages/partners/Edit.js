import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as PartnerActions from '../../redux/Actions/partnerActions';
import BasicDetails from './Edit/BasicDetails';
import GstDetails from './Edit/GstDetails';
import FrimDetails from './Edit/FrimDetails';
import BankDetails from './Edit/BankDetails';
import PartnerDetails from './Edit/PartnerDetails';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

function Edit({ dispatch, partner, loading, error }) {
  const { id } = useParams(); // Getting partner ID from URL
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Function to fetch partner details by ID
    const fetchPartnerDetails = async () => {
      setIsLoading(true);
      try {
        await dispatch(PartnerActions.getPartnerById(id)); // Dispatch the action to fetch partner by ID
      } catch (error) {
        Swal.fire('Error!', 'Failed to fetch Partner details.', 'error'); // Show error if fetching fails
      } finally {
        setIsLoading(false);
      }
    };

    fetchPartnerDetails();
  }, [id, dispatch]); // Re-fetch when ID changes or dispatch changes

  // Handle loading or error states
  if (isLoading || loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <BasicDetails partner={partner} isLoading={isLoading} />
      <GstDetails partner={partner} isLoading={isLoading} />
      <FrimDetails partner={partner} isLoading={isLoading} />
      <BankDetails partner={partner} isLoading={isLoading} />
      <PartnerDetails partner={partner} isLoading={isLoading} />
    </>
  );
}

// Map the necessary Redux state to props
const mapStateToProps = (state) => ({
  partner: state.partner.partner,
  loading: state.partner.loading,
  error: state.partner.error,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
