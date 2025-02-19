const initialState = {
  aadhar: {
    number: '',
    frontImage: { uri: null, name: '', type: '' },
    backImage: { uri: null, name: '', type: '' },
  },
  pan: {
    number: '',
    frontImage: { uri: null, name: '', type: '' },
    backImage: { uri: null, name: '', type: '' },
  },
  drivingLicense: {
    number: '',
    validDate: '',
    frontImage: { uri: null, name: '', type: '' },
    backImage: { uri: null, name: '', type: '' },
  },
  rc: {
    number: '',
    frontImage: { uri: null, name: '', type: '' },
    backImage: { uri: null, name: '', type: '' },
  },
  bankAccountDetails: {
    accountNumber: '',
    ifscCode: '',
    bankName: '',
    upi: '',
  },
  vehicleType: '',
  mobileNumberExists: false, // New state for mobile number existence
  captain: null, // New state for storing captain details
};

const documentReducer = (state = initialState, action) => {
  switch (action.type) {
    // Existing cases...
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
        }

    case 'SET_MOBILE_NUMBER_EXISTS':
      return {
        ...state,
        mobileNumberExists: action.payload.exists,
      };

    case 'SET_CAPTAIN_DETAILS':
      return {
        ...state,
        captain: action.payload, // Store the captain details
      };

    default:
      return state;
  }
};

export default documentReducer;
