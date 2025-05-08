import React, { useEffect, useState, useContext, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, BackHandler, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AlertsContext } from '../../Context/AlertsContext';
import { Audio } from 'expo-av';

const RideAlertsPage = ({ navigation }) => {
  const { alerts, closeAlertsPage, alertsPageVisible, removeAlert, isOnline } = useContext(AlertsContext);
  const [alertOpacity] = useState(new Animated.Value(0));
  const soundRef = useRef(null);
  const [activeAlerts, setActiveAlerts] = useState([]);
  const timerRefs = useRef([]);

  useEffect(() => {
    const backAction = () => {
      closeAlertsPage();
      return true; // prevent default behavior
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [closeAlertsPage]);

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
    return () => {
      stopSound();
    };
  }, [isOnline, alerts.length]);

  useEffect(() => {
    if (!isOnline) {
      stopSound();
    }
  }, [isOnline]);

  // Refactored timer management without calling hooks inside loops
  const countdownRefs = useRef([]);

  useEffect(() => {
    // Initialize countdownRefs for each alert
    countdownRefs.current = alerts.map(() => 20);

    setActiveAlerts(alerts.map((alert, index) => ({
      ...alert,
      timer: 20,
      accepted: false,
      index: index,
    })));

    const timers = alerts.map((alert, index) => {
      const timer = setInterval(() => {
        if (countdownRefs.current[index] > 0) {
          countdownRefs.current[index] -= 1;
          setActiveAlerts((prevAlerts) => {
            const updatedAlerts = [...prevAlerts];
            updatedAlerts[index] = { ...updatedAlerts[index], timer: countdownRefs.current[index] };
            return updatedAlerts;
          });
        } else {
          setActiveAlerts((prevAlerts) => prevAlerts.map(a =>
            a.index === index ? { ...a, accepted: true, timer: 'Sorry! Other drivers accepted' } : a
          ));
          setTimeout(() => removeAlert(index), 2000);
          clearInterval(timer);
        }
      }, 1000);

      return timer;
    });

    timerRefs.current = timers;

    return () => {
      timers.forEach(timer => clearInterval(timer));
    };
  }, [alerts]);

  const playSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../../../assets/sounds/phone-ringing.mp3'),
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

  const handleAccept = async (index) => {
    await stopSound();
    removeAlert(index);
    navigation.navigate("CustomerDetails");
  };

  const handleSkip = async (index) => {
    await stopSound();
    removeAlert(index);
  };

  const handleAlertAccept = (alert, index) => {
    if (!alert.accepted) {
      handleAccept(index);
    }
  };

  const handleAlertSkip = (index) => {
    handleSkip(index);
  };

  if (!alertsPageVisible) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.alertsContainer}>
        {activeAlerts.length === 0 ? (
          <Text style={styles.noAlertsText}>No ride alerts</Text>
        ) : (
          activeAlerts.map((alert, index) => (
            <Animated.View key={index} style={[styles.alertBox, { opacity: alertOpacity }]}>
              <View style={styles.alertContent}>
                <View style={styles.pinContainer}>
                  <Icon name="map-pin" size={24} color="green" />
                  <Text style={styles.pinText}>Pickup: {alert.pickup}</Text>
                </View>
                <View style={styles.pinContainer}>
                  <Icon name="map-pin" size={24} color="red" />
                  <Text style={styles.pinText}>Destination: {alert.destination}</Text>
                </View>
                <View style={styles.fareContainer}>
                  <Text style={styles.fareText}>Fare: ₹ {alert.fare}.00</Text>
                  <Text style={styles.fareText}>Time: {alert.time}</Text>
                  <Text style={styles.fareText}>Distance: {alert.distance}</Text>
                </View>
                <Text style={styles.fareText}>{alert.distanceToPickup} to Pickup Point</Text>
                {alert.tip && (
                  <Text style={styles.tipText}>Customer added tip: ₹ {alert.tip}.00</Text>
                )}
                {/* Display the countdown timer */}
                {!alert.accepted && (
                  <Text style={styles.timerText}>{alert.timer} sec</Text>
                )}
                {alert.accepted ? (
                  <Text style={styles.sorryText}>Sorry! Other drivers accepted</Text>
                ) : (
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => handleAlertAccept(alert, index)} style={styles.button}>
                      <Text style={styles.buttonText}>Accept</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleAlertSkip(index)} style={styles.button}>
                      <Text style={styles.buttonText}>Skip</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </Animated.View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

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
  tipText: {
    color: 'yellow',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 5,
  },
  timerText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  sorryText: {
    color: 'red',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
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
  noAlertsText: {
    fontSize: 16,
    color: '#555',
    marginTop: 20,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  alertsContainer: {
    padding: 10,
    alignItems: 'center',
  },
});

export default RideAlertsPage;
