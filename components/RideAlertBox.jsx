import { StyleSheet, View, Text, TouchableOpacity, Animated } from 'react-native';
import React, { useEffect, useState, useRef, useContext } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Audio } from 'expo-av';
import { AlertsContext } from '../App/Context/AlertsContext';

const RideAlertBox = ({ alertData, onAccept, onSkip }) => {
  const { isOnline, alerts } = useContext(AlertsContext);
  const [alertOpacity] = useState(new Animated.Value(0));
  const soundRef = useRef(null);

  useEffect(() => {
    Animated.timing(alertOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    if (isOnline && alerts.length > 0) {
      playSound();
    }
    // Cleanup on unmount
    return () => {
      stopSound();
    };
  }, [isOnline, alerts.length]);

  useEffect(() => {
    if (!isOnline) {
      stopSound();
    }
  }, [isOnline]);

  const playSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/sounds/phone-ringing.mp3'),
        { isLooping: true }
      );
      soundRef.current = sound;
      await sound.playAsync();
    } catch (error) {
      console.log('Error playing sound:', error);
    }
  };

  const stopSound = async () => {
    if (soundRef.current) {
      try {
        await soundRef.current.stopAsync();
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      } catch (error) {
        console.log('Error stopping sound:', error);
      }
    }
  };

  const handleAccept = async () => {
    await stopSound();
    onAccept();
  };

  const handleSkip = async () => {
    await stopSound();
    onSkip();
  };

  return (
    <Animated.View style={[styles.alertBox, { opacity: alertOpacity }]}>
      <View style={styles.alertContent}>
        <View style={styles.pinContainer}>
          <Icon name="map-pin" size={24} color="green" />
          <Text style={styles.pinText}>Pickup: {alertData.pickup}</Text>
        </View>
        <View style={styles.pinContainer}>
          <Icon name="map-pin" size={24} color="red" />
          <Text style={styles.pinText}>Destination: {alertData.destination}</Text>
        </View>

        <View style={styles.fareContainer}>
          <Text style={styles.fareText}>Fare: ₹ {alertData.fare}.00</Text>
          <Text style={styles.fareText}>Time: {alertData.time}</Text>
          <Text style={styles.fareText}>Distance: {alertData.distance}</Text>
        </View>
        <Text style={styles.fareText}>{alertData.distanceToPickup} to Pickup Point</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleAccept} style={styles.button}>
            <Text style={styles.buttonText}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSkip} style={styles.button}>
            <Text style={styles.buttonText}>Skip</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};

export default RideAlertBox;

const styles = StyleSheet.create({
  alertBox: {
    flex: 1,
    position: 'relative',
    width: 300,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: '40%',
    borderWidth: 2,
    borderColor: '#0F4A97',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
    zIndex: 10,
    padding: 10,
    marginBottom: 20,
  },
  alertContent: {
    height: 400,
    width: 300,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  pinContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 5,
  },
  pinText: {
    marginLeft: 10,
    textAlign: 'justify',
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  fareContainer: {
    marginVertical: 10,
    paddingVertical: 3,
    borderTopWidth: 1,
    borderTopColor: 'white',
    marginHorizontal: 10,
  },
  fareText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#0F4A97',
    padding: 15,
    borderRadius: 30,
    marginHorizontal: 10,
    minWidth: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});
