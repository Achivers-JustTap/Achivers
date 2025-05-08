import React, { createContext, useState, useEffect, useRef } from 'react';
import { Audio } from 'expo-av';

export const AlertsContext = createContext();

export const AlertsProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([
    {
      pickup: "48-320/sri nilayam,ganesh Nagar, chintal,qutbullarpur,hyderadab,telangana",
      destination: "Opp. Laxmikaka and Sashikala Theaters, Bhavani Nagar Moosapet, Near State Bank Of Hyderabad, Hyderabad, Telangana 500018, India",
      fare: 150,
      time: "15 mins",
      distance: "5 km",
      distanceToPickup: "1.0 km"
    },
    {
      pickup: "123 Main Street, City A",
      destination: "456 Elm Street, City B",
      fare: 200,
      time: "20 mins",
      distance: "8 km",
      distanceToPickup: "2.5 km",
      tip: 50,
    },
    {
      pickup: "789 Oak Avenue, City C",
      destination: "321 Pine Road, City D",
      fare: 180,
      time: "18 mins",
      distance: "6 km",
      distanceToPickup: "1.8 km"
    }
  ]);

  const [isOnline, setIsOnline] = useState(false);
  const [alertsPageVisible, setAlertsPageVisible] = useState(false);
  const [isHalfPageVisible, setIsHalfPageVisible] = useState(false);
  const [sound, setSound] = useState(null);
  const [isSoundPlaying, setIsSoundPlaying] = useState(false);
  const playSoundTimeout = useRef(null);

  useEffect(() => {
   // Play or stop sound based on alerts presence and page visibility
    if (alerts.length > 0 && isOnline && alertsPageVisible) {
      playSound();
    } else {
      stopSound();
    }
  }, [alerts, isOnline, alertsPageVisible]);

  const playSound = async () => {
    if (isSoundPlaying) return;
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../../assets/sounds/phone-ringing.mp3'),
        { isLooping: true }
      );
      setSound(sound);
      await sound.playAsync();
      setIsSoundPlaying(true);
    } catch (error) {
      console.log('Error playing sound:', error);
    }
  };

  const stopSound = async () => {
    if (sound) {
      try {
        await sound.stopAsync();
        await sound.unloadAsync();
      } catch (error) {
        console.log('Error stopping sound:', error);
      }
      setSound(null);
      setIsSoundPlaying(false);
    }
  };


  const clearAlerts = () => {
    setAlerts([]);
    stopSound();
  };

  const removeAlert = (index) => {
    setAlerts((prevAlerts) => {
      const newAlerts = [...prevAlerts];
      newAlerts.splice(index, 1);
      return newAlerts;
    });
  };

  const goOnline = () => {
    setIsOnline(true);
    setAlertsPageVisible(true);
  };

  const goOffline = () => {
    setIsOnline(false);
    setAlertsPageVisible(false);
    if (playSoundTimeout.current) {
      clearTimeout(playSoundTimeout.current);
    }
    stopSound();
    setAlerts([]); // Clear alerts to prevent alerts after going offline
  };

  const openAlertsPage = () => {
    setAlertsPageVisible(true);
  };
  const closeAlertsPage = () => {
 setAlertsPageVisible(false);
    // Do not stop sound here if alerts exist, sound continues
  };

 return (
   <AlertsContext.Provider
      value={{
        alerts,
        setAlerts,
        clearAlerts,
        removeAlert,
        isOnline,
        goOnline,
        goOffline,
        alertsPageVisible,
        openAlertsPage,
        closeAlertsPage,
      }}
    >
    {children}
    </AlertsContext.Provider>
  );
};
