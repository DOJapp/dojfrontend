import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as PartnerActions from '../../redux/Actions/partnerActions';
import BasicDetails from './view/BasicDetails';
import GstDetails from './view/GstDetails';
import FirmDetails from './view/FrimDetails';
import BankDetails from './view/BankDetails';
import PartnerDetails from './view/PartnerDetails';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

function View({ dispatch, partner, loading, error }) {
    const { id } = useParams();

    useEffect(() => {
        const fetchPartnerDetails = async () => {
            try {
                await dispatch(PartnerActions.getPartnerById(id));
            } catch (error) {
                Swal.fire('Error!', 'Failed to fetch Partner details.', 'error');
            }
        };

        fetchPartnerDetails();
    }, [id, dispatch]);

    return (
        <>
            <BasicDetails partner={partner} isLoading={loading} />
            <GstDetails partner={partner} isLoading={loading} />
            <FirmDetails partner={partner} isLoading={loading} />
            <BankDetails partner={partner} isLoading={loading} />
            <PartnerDetails partner={partner} isLoading={loading} />
        </>
    );
}

const mapStateToProps = (state) => ({
    partner: state.partner.partner,
    loading: state.partner.loading,
    error: state.partner.error,
});

export default connect(mapStateToProps)(View);
