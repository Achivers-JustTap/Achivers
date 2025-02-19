export const setMobileNumber = (mobileNumber) => ({
    type: 'SET_MOBILE_NUMBER',
    payload: mobileNumber,
  });
  
  export const setVerified = (isVerified) => ({
    type: 'SET_VERIFIED',
    payload: isVerified,
  });
  
  export const setUserDetails = (name, email, gender, dateOfBirth,_id) => ({
    type: 'SET_USER_DETAILS',
    payload: { name, email, gender, dateOfBirth,_id },
  });
  
  export const setProfilePicture = (picture) => ({
    type: 'SET_PROFILE_PICTURE',
    payload: picture,
  });

  export const activateService = ({ id, type }) => ({
    type: 'ACTIVATE_SERVICE',
    payload: { id, type },
  });
  
  export const deactivateService = ({ id, type }) => ({
    type: 'DEACTIVATE_SERVICE',
    payload: { id, type },
  });
  
  export const fetchServicesForVehicle = (vehicleType) => ({
    type: 'FETCH_SERVICES',
    payload: vehicleType,
  });
  
  