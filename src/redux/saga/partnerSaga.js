import * as actionTypes from "../actionTypes";
import { call, put, takeLeading } from "redux-saga/effects";
import Swal from "sweetalert2";
import { ApiRequest } from "../../utils/apiRequest";
import { api_url, partners, partner_bank_details, partner_basic_details, partner_gst_details, partner_firm_details, partner_details } from "../../utils/Constants";
import { Colors } from "../../assets/styles";
import {
  setPartners,
  setPartner,
  getPartners,
  createPartnerSuccess,
  createPartnerFailure,
  updatePartnerSuccess,
  updatePartnerFailure,
  deletePartnerSuccess,
  deletePartnerFailure,
  updatePartnerBankDetails,
  updatePartnerBankDetailsFailure,
  updatePartnerBankDetailsSuccess,
  updatePartnerBasicDetails,
  updatePartnerBasicDetailsFailure,
  updatePartnerBasicDetailsSuccess,
  updatePartnerGstDetails,
  updatePartnerGstDetailsFailure,
  updatePartnerGstDetailsSuccess,
  updatePartnerFirmDetails,
  updatePartnerFirmDetailsFailure,
  updatePartnerFirmDetailsSuccess,
  updatePartnerDetails,
  updatePartnerDetailsFailure,
  updatePartnerDetailsSuccess,


} from "../Actions/partnerActions";

// Helper function for displaying alerts
const showAlert = (icon, title, text) => {
  Swal.fire({
    icon,
    title,
    text,
  });
};

// Saga to get all Partners
function* getPartnersSaga() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield call(ApiRequest.getRequest, {
      url: api_url + partners,
    });

    if (response?.success) {
      yield put(setPartners(response.data)); // Dispatch the setPartners action
    } else {
      yield put(createPartnerFailure(response.message));
      showAlert("error", "Error", response.message || "Failed to fetch Partners");
    }
  } catch (error) {
    yield put(createPartnerFailure(error.message));
    showAlert("error", "Error", error.message);
  } finally {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

// Saga to get Partner by ID
function* getPartnerByIdSaga(action) {
  try {
    const { payload } = action;

    const response = yield call(ApiRequest.getRequest, {
      url: `${api_url}${partners}/${payload}`,
    });

    if (response?.success) {
      yield put(setPartner(response.data));
    } else {
      showAlert("error", "Error", response.message || "Failed to fetch the Partner");
    }
  } catch (error) {
    showAlert("error", "Error", error.message);
  }
}

// Saga to delete a Partner
function* deletePartnerSaga(action) {
  try {
    const { payload } = action;

    const result = yield Swal.fire({
      title: `Are you sure you want to delete this Partner?`,
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: Colors.primaryLight,
      cancelButtonColor: Colors.red,
      confirmButtonText: "Delete",
    });

    if (result.isConfirmed) {
      const response = yield call(ApiRequest.deleteRequest, {
        url: `${api_url}${partners}/${payload}`,
      });

      if (response?.success) {
        yield put(deletePartnerSuccess(payload));
        yield put(getPartners());
        showAlert("success", "Deleted!", "The Partner has been deleted successfully.");
      } else {
        yield put(deletePartnerFailure(response.message));
        showAlert("error", "Deletion Failed", "Failed to delete the Partner. Please try again.");
      }
    }
  } catch (error) {
    yield put(deletePartnerFailure(error.message));
    showAlert("error", "Error", error.message);
  }
}

// Saga to create a Partner
function* createPartnerSaga(action) {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const { payload } = action;

    const response = yield call(ApiRequest.postRequest, {
      url: `${api_url}${partners}`,
      data: payload,
    });

    if (response?.success) {
      yield put(createPartnerSuccess(response.data));
      showAlert("success", "Partner Created", "The Partner has been successfully created.");
    } else {
      yield put(createPartnerFailure(response.message));
      showAlert("error", "Error", response.message || "Failed to create Partner");
    }
  } catch (error) {
    yield put(createPartnerFailure(error.message));
    showAlert("error", "Error", error.message);
  } finally {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

// Saga to update a Partner
function* updatePartnerSaga(action) {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const { id, data } = action.payload;

    const response = yield call(ApiRequest.putRequest, {
      url: `${api_url}${partners}/${id}`,
      data,
    });

    if (response?.success) {
      yield put(updatePartnerSuccess(response.data));
      showAlert("success", "Partner Updated", "The Partner has been successfully updated.");
    } else {
      yield put(updatePartnerFailure(response.message));
      showAlert("error", "Error", response.message || "Failed to update Partner");
    }
  } catch (error) {
    yield put(updatePartnerFailure(error.message));
    showAlert("error", "Error", error.message);
  } finally {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}


function* updatePartnerBankDetailsSaga(action) {

  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const { id, data } = action.payload;
    console.log(id);
    console.log(data);
    const response = yield call(ApiRequest.putRequest, {
      url: `${api_url}${partner_bank_details}/${id}`,
      data,
      header: 'json'
    });

    if (response?.success) {
      yield put(updatePartnerBankDetailsSuccess(response.data));
      showAlert("success", "Partner Updated", "The Partner Bank Details has been successfully updated.");
    } else {
      yield put(updatePartnerBankDetailsFailure(response.message));
      showAlert("error", "Error", response.message || "Failed to update Bank Details");
    }
  } catch (error) {
    yield put(updatePartnerBankDetailsFailure(error.message));
    showAlert("error", "Error", error.message);
  } finally {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* updatePartnerBasicDetailsSaga(action) {

  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const { id, data } = action.payload;

    const response = yield call(ApiRequest.putRequest, {
      url: `${api_url}${partner_basic_details}/${id}`,
      data,
      header: 'json'
    });

    if (response?.success) {
      yield put(updatePartnerBasicDetailsSuccess(response.data));
      showAlert("success", "Partner Updated", "The Partner Basic Details has been successfully updated.");
    } else {
      yield put(updatePartnerBasicDetailsFailure(response.message));
      showAlert("error", "Error", response.message || "Failed to update Basic Details");
    }
  } catch (error) {
    yield put(updatePartnerBasicDetailsFailure(error.message));
    showAlert("error", "Error", error.message);
  } finally {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* updatePartnerGstDetailsSaga(action) {

  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const { id, data } = action.payload;

    const response = yield call(ApiRequest.putRequest, {
      url: `${api_url}${partner_gst_details}/${id}`,
      data
    });

    if (response?.success) {
      yield put(updatePartnerGstDetailsSuccess(response.data));
      showAlert("success", "Partner Updated", "The Partner Gst Details has been successfully updated.");
    } else {
      yield put(updatePartnerGstDetailsFailure(response.message));
      showAlert("error", "Error", response.message || "Failed to update Gst Details");
    }
  } catch (error) {
    yield put(updatePartnerGstDetailsFailure(error.message));
    showAlert("error", "Error", error.message);
  } finally {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* updatePartnerFirmDetailsSaga(action) {

  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const { id, data } = action.payload;

    const response = yield call(ApiRequest.putRequest, {
      url: `${api_url}${partner_firm_details}/${id}`,
      data,
      header: 'json'
    });

    if (response?.success) {
      yield put(updatePartnerFirmDetailsSuccess(response.data));
      showAlert("success", "Partner Updated", "The Partner Firm Details has been successfully updated.");
    } else {
      yield put(updatePartnerFirmDetailsFailure(response.message));
      showAlert("error", "Error", response.message || "Failed to update Firm Details");
    }
  } catch (error) {
    yield put(updatePartnerFirmDetailsFailure(error.message));
    showAlert("error", "Error", error.message);
  } finally {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* updatePartnerDetailsSaga(action) {

  try {

    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const { id, data } = action.payload;

    const response = yield call(ApiRequest.putRequest, {
      url: `${api_url}${partner_details}/${id}`,
      data,
      header: 'json'
    });

    if (response?.success) {
      yield put(updatePartnerDetailsSuccess(response.data));
      showAlert("success", "Partner Updated", "The Partner Details has been successfully updated.");
    } else {
      yield put(updatePartnerDetailsFailure(response.message));
      showAlert("error", "Error", response.message || "Failed to update Firm Details");
    }
  } catch (error) {
    yield put(updatePartnerDetailsFailure(error.message));
    showAlert("error", "Error", error.message);
  } finally {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

// Root saga to watch for Partner-related actions
export default function* partnerSaga() {
  yield takeLeading(actionTypes.GET_PARTNERS, getPartnersSaga);
  yield takeLeading(actionTypes.GET_PARTNER_BY_ID, getPartnerByIdSaga);
  yield takeLeading(actionTypes.DELETE_PARTNER, deletePartnerSaga);
  yield takeLeading(actionTypes.CREATE_PARTNER, createPartnerSaga);
  yield takeLeading(actionTypes.UPDATE_PARTNER, updatePartnerSaga);
  yield takeLeading(actionTypes.UPDATE_PARTNER_BANK_DETAILS, updatePartnerBankDetailsSaga);
  yield takeLeading(actionTypes.UPDATE_PARTNER_BASIC_DETAILS, updatePartnerBasicDetailsSaga);
  yield takeLeading(actionTypes.UPDATE_PARTNER_GST_DETAILS, updatePartnerGstDetailsSaga);
  yield takeLeading(actionTypes.UPDATE_PARTNER_FIRM_DETAILS, updatePartnerFirmDetailsSaga);
  yield takeLeading(actionTypes.UPDATE_PARTNER_DETAILS, updatePartnerDetailsSaga);
}
