import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const RideAlertBox = () => {
  const [timer, setTimer] = useState(20); // Initial time
  const [visible, setVisible] = useState(true); // To toggle visibility
  const translateY = useRef(new Animated.Value(-300)).current; // Initial position off-screen
  
  useEffect(() => {
    // Set the alert to show after 1 second for testing
    setTimeout(() => {
        setShowRideAlert(true);
    }, 1000);
}, []);


  useEffect(() => {
    // Animation for alert box coming down
    Animated.timing(translateY, {
      toValue: 0, // Box moves to half-screen
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    if (timer > 0 && visible) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer, visible]);

  const handleAccept = () => {
    setVisible(false); // Close the alert box on accept
  };

  const handleSkip = () => {
    setVisible(false); // Close the alert box on skip
  };

  if (!visible) return null; // If not visible, return nothing

  return (
    <Animated.View style={[styles.alertBox, { transform: [{ translateY }] }]}>
      <View style={styles.pickupContainer}>
        <Icon name="map-marker" size={25} color="green" style={styles.pin} />
        <Text>Pickup Point</Text>
      </View>
      <View style={styles.destinationContainer}>
        <Icon name="map-marker" size={25} color="red" style={styles.pin} />
        <Text>Destination Point</Text>
      </View>
      <View style={styles.distanceFareContainer}>
        <Text>Distance: 10 km</Text>
        <Text>Fare: ₹ 200</Text>
        <Text>Time: 20 min</Text>
      </View>
      <View style={styles.kmContainer}>
        <Text>Pickup Point: 5 km</Text>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={handleAccept} style={styles.acceptButton}>
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
          <Text style={styles.buttonText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>{timer}s</Text>
      </View>
      
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  alertBox: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '50%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    borderWidth: 1,
    borderColor: '#0F4A97',
    justifyContent: 'space-between',
    paddingBottom: 30,
  },
  pickupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  destinationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pin: {
    marginRight: 10,
  },
  distanceFareContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  kmContainer: {
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  acceptButton: {
    backgroundColor: '#0F4A97',
    padding: 10,
    borderRadius: 5,
  },
  skipButton: {
    backgroundColor: '#FF0000',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  timerContainer: {
    position: 'absolute',
    bottom: 10,
    left: '50%',
    transform: [{ translateX: '-50%' }],
    backgroundColor: 'green',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerText: {
    color: 'white',
    fontSize: 20,
  },
});

export default RideAlertBox;
