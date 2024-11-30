import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux'; // Import Provider to connect Redux to your app
import store from './App/screens/store_management/store';
// Import all screens
import WelcomeScreen from './App/screens/SignUpScreens/WelcomeScreen';
import MobileOTPScreen from './App/screens/SignUpScreens/MobileOTPScreen';
import MobileOTPVerifyScreen from './App/screens/SignUpScreens/MobileOTPVerifyScreen';
import ProfileDetailsScreen from './App/screens/SignUpScreens/ProfileDetails';

import ProfileImageScreen from './App/screens/SignUpScreens/ProfileImageScreen';
import AadharUpload from './App/screens/SignUpScreens/AadharUpload';
import AadharImageUpload from './App/screens/SignUpScreens/AadharImageUpload';
import PanCard from './App/screens/SignUpScreens/PanCard';
import PanCardUpload from './App/screens/SignUpScreens/PanCardUpload';
import DriverLicense from './App/screens/SignUpScreens/DriverLicense';
import LicenseImageUpload from './App/screens/SignUpScreens/LicenseImageUpload';
import RC from './App/screens/SignUpScreens/RC';
import RCUpload from './App/screens/SignUpScreens/RCUpload';
import Processing from './App/screens/SignUpScreens/Processing';
import AadharUploadFromFile from './App/screens/SignUpScreens/AadharUploadFromFile';
import PanCardUploadFromFile from './App/screens/SignUpScreens/PanCardUploadFromFile';
import DrivingLicenseUpload from './App/screens/SignUpScreens/DrivingLicenseUpload';
import RCUploadFromFiles from './App/screens/SignUpScreens/RCUploadFromFiles';
import BankDetailsScreen from './App/screens/SignUpScreens/BankDetailsScreen';
import VehicleTypeScreen from './App/screens/SignUpScreens/VehicleTypeScreen';

// Create the stack navigator
const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}> 
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen name="MobileOTPScreen" component={MobileOTPScreen} />
          <Stack.Screen name="MobileOTPVerifyScreen" component={MobileOTPVerifyScreen} />
          <Stack.Screen name="ProfileDetailsScreen" component={ProfileDetailsScreen} />
          <Stack.Screen name="ProfileImageScreen" component={ProfileImageScreen} />
          <Stack.Screen name="AadharUpload" component={AadharUpload} />
          <Stack.Screen name="AadharImageUpload" component={AadharImageUpload} />
          <Stack.Screen name="AadharUploadFromFile" component={AadharUploadFromFile} />
          <Stack.Screen name="PanCard" component={PanCard} />
          <Stack.Screen name="PanCardUpload" component={PanCardUpload} />
          <Stack.Screen name="PanCardUploadFromFile" component={PanCardUploadFromFile} />
          <Stack.Screen name="DriverLicense" component={DriverLicense} />
          <Stack.Screen name="DrivingLicenseUpload" component={DrivingLicenseUpload} />
          <Stack.Screen name="LicenseImageUpload" component={LicenseImageUpload} />
          <Stack.Screen name="RC" component={RC} />
          <Stack.Screen name="RCUploadFromFiles" component={RCUploadFromFiles} />
          <Stack.Screen name="RCUpload" component={RCUpload} />
          <Stack.Screen name="BankDetailsScreen" component={BankDetailsScreen} />
          <Stack.Screen name="VehicleTypeScreen" component={VehicleTypeScreen} />
          <Stack.Screen name="Processing" component={Processing} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

