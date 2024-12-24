const initialState = {
    aadhar: {
      number: '',
      frontImage: null,
      backImage: null,
    },
    pan: {
      number: '',
      frontImage: null,
      backImage: null,
    },
    drivingLicense: {
      number: '',
      validDate: '',
      frontImage: null,
      backImage: null,
    },
    rc: {
      number: '',
      frontImage: null,
      backImage: null,
    },
    bankAccountDetails: {
      accountNumber: '',
      ifscCode: '',
      bankName: '',
      upi: '',
    },
     vehicleType: ''
  };
  
  const documentReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_AADHAR_DETAILS':
        return {
          ...state,
          aadhar: {
            ...state.aadhar,
            number: action.payload.number || state.aadhar.number, // Preserve existing number
            frontImage: action.payload.frontImage || state.aadhar.frontImage,
            backImage: action.payload.backImage || state.aadhar.backImage,
          },
        };
  
      case 'SET_PAN_DETAILS':
        return {
          ...state,
          pan: {
            ...state.pan,
            number: action.payload.number || state.pan.number,
            frontImage: action.payload.frontImage || state.pan.frontImage,
            backImage: action.payload.backImage || state.pan.backImage,
          },
        };
      case 'SET_DRIVING_LICENSE_DETAILS':
        return {
          ...state,
          drivingLicense: {
            ...state.drivingLicense,
            ...action.payload,
          },
        };
        case 'SET_BANK_ACCOUNT_DETAILS':
      return {
        ...state,
        bankAccountDetails: {
          ...state.bankAccountDetails,
          ...action.payload,
        },
      };
      case 'SET_RC_DETAILS':
        return {
          ...state,
          rc: {
            ...state.rc,
            ...action.payload,
          },
        };
        case 'SET_VEHICLE_TYPE':
          return {
            ...state,
            vehicleType: action.payload,
          };
      default:
        return state;
    }
  };
  
  export default documentReducer;
  