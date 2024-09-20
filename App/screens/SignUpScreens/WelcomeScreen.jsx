import React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground } from 'react-native';
import MyCarousel from '../../../components/MyCarousal';
import { SafeAreaView } from 'react-native-safe-area-context';

const WelcomeScreen = ({ navigation }) => {
  return (

    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome to JUST TAP!</Text>
      <MyCarousel style ={styles.carauselContainer}/>
      <Text style={styles.description}>
        Become a captain and earn money on your own terms.
      </Text>
      <Button title="Register" onPress={() => navigation.navigate('MobileOTPScreen')} style={styles.registerButton} />
      <Text style={styles.description}>
          Just Tap is your one-stop solution for convenient rides and flexible earnings.
          Join our community of drivers and start making a difference today!
        </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black', // Black background
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    alignContent:'flex-start',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF9900', // Orange text
    marginBottom: 10,
  },
  carouselContainer:{

  },
  description: {
    textAlign: 'center',
    color: '#FF9900', // Orange text
    marginBottom: 20,
  },
  registerButton: {
    backgroundColor: '#FF9900', // Orange background
    padding: 10,
    borderRadius: 5,
  },
});

export default WelcomeScreen;