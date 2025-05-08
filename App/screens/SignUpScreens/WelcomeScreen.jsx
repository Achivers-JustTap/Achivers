import React, { useEffect } from 'react';
import { View, SafeAreaView, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';
import MyCarousel from '../../../components/MyCarousal';

const WelcomeScreen = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    'SofadiOne': require('../../../assets/fonts/SofadiOne-Regular.ttf'),
  });

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#fff" style={styles.loader} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Welcome to{' '}
        <Text style={styles.justTapText}>JUST TAP!</Text>
      </Text>
      <MyCarousel style={styles.carouselContainer} />
      <Text style={styles.memberText}>
        Want to be a member?{' '}
        <Text style={{ fontSize: 19, fontFamily: 'SofadiOne' }}>JUST TAP!</Text>
      </Text>

      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => navigation.navigate('MobileOTPScreen', { isRegister: true })}
      >
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('MobileOTPScreen', { isRegister: false })}
      >
        <Text style={styles.loginText}>Have An Account? Log In</Text>
      </TouchableOpacity>

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
    backgroundColor: '#0F4A97',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0F4A97',
  },
  title: {
    paddingTop: 50,
    fontSize: 22,
    color: 'white',
    marginBottom: 10,
  },
  justTapText: {
    fontFamily: 'SofadiOne',
    fontSize: 35,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  carouselContainer: {
    alignContent: 'flex-start',
    marginBottom: 30,
  },
  memberText: {
    textAlign: 'center',
    color: 'white',
    marginBottom: 30,
  },
  registerButton: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 5,
    marginBottom: 10,
    width: '50%',
    alignItems: 'center',
  },
  registerButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loginText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 100,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  description: {
    textAlign: 'center',
    color: 'white',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
});

export default WelcomeScreen;
