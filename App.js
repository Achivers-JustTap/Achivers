import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './App/screens/SignUpScreens/WelcomeScreen';
import MobileOTPScreen from './App/screens/SignUpScreens/MobileOTPScreen';
import MobileOTPVerifyScreen from './App/screens/SignUpScreens/MobileOTPVerifyScreen';
import ProfileDetailsScreen from './App/screens/SignUpScreens/ProfileDetails';
import TakeSelfie from './App/screens/SignUpScreens/TakeSelfie';
import ProfileImageScreen from './App/screens/SignUpScreens/ProfileImageScreen';
import AadharUpload from './App/screens/SignUpScreens/AadharUpload';
import AadharImageUpload from './App/screens/SignUpScreens/AadharImageUpload';
import PanCard from './App/screens/SignUpScreens/PanCard';
import PanCardUpload from './App/screens/SignUpScreens/PanCardUpload';
import DriverLicense from './App/screens/SignUpScreens/DriverLicense';
import LicenseImageUpload from './App/screens/SignUpScreens/LicenseImageUpload';
import RC from './App/screens/SignUpScreens/RC';
import RCUpload from './App/screens/SignUpScreens/RCUpload';



const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="MobileOTPScreen" component={MobileOTPScreen} />
        <Stack.Screen name = "MobileOTPVerifyScreen" component={MobileOTPVerifyScreen}/>
        <Stack.Screen name = "ProfileDetailsScreen" component={ProfileDetailsScreen}/>
        <Stack.Screen name = "TakeSelfie" component={TakeSelfie}/>
        <Stack.Screen name = "ProfileImageScreen" component={ProfileImageScreen}/>
        <Stack.Screen name = "AadharUpload" component={AadharUpload}/>
        <Stack.Screen name = "AadharImageUpload" component={AadharImageUpload}/>
        <Stack.Screen name = "PanCard" component={PanCard}/>
        <Stack.Screen name = "PanCardUpload" component={PanCardUpload}/>
        <Stack.Screen name = "DriverLicense" component={DriverLicense}/>
        <Stack.Screen name = "LicenseImageUpload" component={LicenseImageUpload}/>
        <Stack.Screen name = "RC" component={RC}/>
        <Stack.Screen name = "RCUpload" component={RCUpload}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});