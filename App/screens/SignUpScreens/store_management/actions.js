// redux/actions.js
import {
    SET_PHONE_NUMBER,
    SET_OTP,
    SET_PROFILE_DETAILS,
    SET_PROFILE_IMAGE,
    SET_AADHAR_IMAGE,
    SET_DRIVER_LICENSE_IMAGE,
    SET_PAN_IMAGE,
  } from './actionTypes';
  
  export const setPhoneNumber = (phoneNumber) => ({
    type: SET_PHONE_NUMBER,
    payload: phoneNumber,
  });
  
  export const setOTP = (otp) => ({
    type: SET_OTP,
    payload: otp,
  });
  
  export const setProfileDetails = (profileDetails) => ({
    type: SET_PROFILE_DETAILS,
    payload: profileDetails,
  });
  
  export const setProfileImage = (imageUri) => ({
    type: SET_PROFILE_IMAGE,
    payload: imageUri,
  });
  
  export const setAadharImage = (imageUri) => ({
    type: SET_AADHAR_IMAGE,
    payload: imageUri,
  });
  
  export const setDriverLicenseImage = (imageUri) => ({
    type: SET_DRIVER_LICENSE_IMAGE,
    payload: imageUri,
  });
  
  export const setPanImage = (imageUri) => ({
    type: SET_PAN_IMAGE,
    payload: imageUri,
  });
  