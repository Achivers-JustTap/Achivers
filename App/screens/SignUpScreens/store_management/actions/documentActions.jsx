export const setAadharDetails = (number, frontImage = null, backImage = null) => ({
  type: 'SET_AADHAR_DETAILS',
  payload: { number, frontImage, backImage },
});
  
export const setPanDetails = (panDetails) => ({
  type: 'SET_PAN_DETAILS',
  payload: {
    number: panDetails.number || '',
    frontImage: panDetails.frontImage || null,
    backImage: panDetails.backImage || null,
  },
});

  
  export const setDrivingLicenseDetails = (drivingLicenseDetails) => ({
    type: 'SET_DRIVING_LICENSE_DETAILS',
    payload: drivingLicenseDetails,
  });
  
  export const setRcDetails = (rcDetails) => ({
    type: 'SET_RC_DETAILS',
    payload: rcDetails,
  });
  
  export const setBankAccountDetails = (bankAccountDetails) => ({
    type: 'SET_BANK_ACCOUNT_DETAILS',
    payload: bankAccountDetails,
  });
  export const setVehicleType = (vehicleType) => ({
    type: 'SET_VEHICLE_TYPE',
    payload: vehicleType,
  });