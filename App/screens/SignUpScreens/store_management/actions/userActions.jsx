export const setMobileNumber = (mobileNumber) => ({
    type: 'SET_MOBILE_NUMBER',
    payload: mobileNumber,
  });
  
  export const setVerified = (isVerified) => ({
    type: 'SET_VERIFIED',
    payload: isVerified,
  });
  
  export const setUserDetails = (name, email, gender, dateOfBirth) => ({
    type: 'SET_USER_DETAILS',
    payload: { name, email, gender, dateOfBirth },
  });
  
  export const setProfilePicture = (picture) => ({
    type: 'SET_PROFILE_PICTURE',
    payload: picture,
  });
  
  