const initialState = {
    mobileNumber: '',
    isVerified: false,
    name: '',
    gender: '',
    dateOfBirth: '',
    email: '',
    profilePicture: null,
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
      default:
        return state;
    }
  };
  
  export default userReducer;
  