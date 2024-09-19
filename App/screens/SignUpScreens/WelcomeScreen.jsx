import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Achivers!</Text>
      <Text style={styles.description}>
        Become a captain and earn money on your own terms.
      </Text>
      <Button title="Register" onPress={() => navigation.navigate('MobileOTPScreen')} style={styles.registerButton} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Black background
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF9900', // Orange text
    marginBottom: 10,
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