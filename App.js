import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './App/screens/SignUpScreens/WelcomeScreen';
import MobileOTPScreen from './App/screens/SignUpScreens/MobileOTPScreen';
import MobileOTPVerifyScreen from './App/screens/SignUpScreens/MobileOTPVerifyScreen';
import ProfileDetailsScreen from './App/screens/SignUpScreens/ProfileDetails';
import ProfileImageScreen from './App/screens/SignUpScreens/ProfileImageScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="MobileOTPScreen" component={MobileOTPScreen} />
        <Stack.Screen name = "MobileOTPVerifyScreen" component={MobileOTPVerifyScreen}/>
        <Stack.Screen name = "ProfileDetailsScreen" component={ProfileDetailsScreen}/>
        <Stack.Screen name = "ProfileImageScreen" component={ProfileImageScreen}/>
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