const initialState = {
  mobileNumber: '',
  isVerified: false,
  name: '',
  gender: '',
  dateOfBirth: '',
  email: '',
  profilePicture: null,
  services: [], 
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MOBILE_NUMBER':
      return { ...state, mobileNumber: action.payload };
    case 'SET_VERIFIED':
      return { ...state, isVerified: action.payload };
    case 'SET_USER_DETAILS':
      return {
        ...state,
        name: action.payload.name,
        gender: action.payload.gender,
        dateOfBirth: action.payload.dateOfBirth,
        email: action.payload.email,
      };
    case 'SET_PROFILE_PICTURE':
      return { ...state, profilePicture: action.payload };
    case 'SET_SERVICES': 
      return { ...state, services: action.payload };
    case 'ACTIVATE_SERVICE': 
    return {
      ...state,
      [action.payload.type]: state[action.payload.type].map(service => 
        service.id === action.payload.id ? { ...service, active: true } : service
      ),
    };
  case 'DEACTIVATE_SERVICE':
    return {
      ...state,
      [action.payload.type]: state[action.payload.type].map(service => 
        service.id === action.payload.id ? { ...service, active: false } : service
      ),
    };
    default:
      return state;
  }
};

export default userReducer;
