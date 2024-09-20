import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';

import MyCarousel from '../../../components/MyCarousal';

const WelcomeScreen = ({ navigation }) => {
  // Load the custom font
  const [fontsLoaded] = useFonts({
    'SofadiOne': require('../../../assets/fonts/SofadiOne-Regular.ttf'), // Adjust the path as per your project structure
  });

 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Welcome to{' '}
        <Text style={styles.justTapText}>JUST TAP!</Text>
      </Text>
      <MyCarousel style={styles.carouselContainer} />
      <Text style={styles.memberText}>
        Want to be a member?{' '} 
        <Text style={{fontSize:19,fontFamily:'SofadiOne'}}>JUST TAP!</Text>
      </Text>

      {/* Custom TouchableOpacity button */}
      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => navigation.navigate('MobileOTPScreen')}
      >
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>

      <Text style={styles.description}>
        Just Tap is your one-stop solution for convenient rides and flexible earnings.
        Join our community of drivers and start making a difference today!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F4A97', // Black background
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    paddingTop: 20,
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  justTapText: {
    fontFamily: 'SofadiOne', // Use the custom font
    fontSize: 35,
    color: 'white', // Primary color for the text

    // Adding shadow for double shade effect
    textShadowColor: 'rgba(0, 0, 0, 0.75)', // Shadow color (dark)
    textShadowOffset: { width: 2, height: 2 }, // Shadow offset for the shadow position
    textShadowRadius: 4, // Blurring effect for the shadow
  },
  carouselContainer: {
    alignContent: 'flex-start',
    marginBottom: 30,
  },
  memberText: {
    fontWeight:'700',
    textAlign: 'center',
    color: 'white',
    marginBottom: 30, // Adjusted margin
  },
  registerButton: {
    backgroundColor: 'white', // Button background color
    padding: 12,
    borderRadius: 5,
    marginBottom: 100, // Adjust as needed
    width: '50%',
    alignItems: 'center', // Center the text inside
  },
  registerButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  description: {
    textAlign: 'center',
    color: 'white',
    marginBottom: 100,
    paddingHorizontal: 20, // Optional padding for better text alignment
     
  },
});

export default WelcomeScreen;
