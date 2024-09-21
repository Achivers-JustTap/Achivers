// redux/reducer.js
import {
    SET_PHONE_NUMBER,
    SET_OTP,
    SET_PROFILE_DETAILS,
    SET_PROFILE_IMAGE,
    SET_AADHAR_IMAGE,
    SET_DRIVER_LICENSE_IMAGE,
    SET_PAN_IMAGE,
  } from './actionTypes';
  
  const initialState = {
    phoneNumber: '',
    otp: '',
    name: '',
    email: '',
    dateOfBirth: '',
    gender: '',
    profileImage: '',
    aadharImage: '',
    driverLicenseImage: '',
    panImage: '',
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_PHONE_NUMBER:
        return { ...state, phoneNumber: action.payload };
      case SET_OTP:
        return { ...state, otp: action.payload };
      case SET_PROFILE_DETAILS:
        return { ...state, ...action.payload }; // Merge profile details
      case SET_PROFILE_IMAGE:
        return { ...state, profileImage: action.payload };
      case SET_AADHAR_IMAGE:
        return { ...state, aadharImage: action.payload };
      case SET_DRIVER_LICENSE_IMAGE:
        return { ...state, driverLicenseImage: action.payload };
      case SET_PAN_IMAGE:
        return { ...state, panImage: action.payload };
      default:
        return state;
    }
  };
  
  export default userReducer;
  