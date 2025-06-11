import React, { createContext, useState, useEffect, useRef, useContext } from 'react';
import { Audio } from 'expo-av';
import { SocketContext } from '../Context/SocketContext';

export const AlertsContext = createContext();

export const AlertsProvider = ({ children }) => {
  const { socket } = useContext(SocketContext);

  const [alerts, setAlerts] = useState([]);

  const [isOnline, setIsOnline] = useState(false);
  const [alertsPageVisible, setAlertsPageVisible] = useState(false);
  const [sound, setSound] = useState(null);
  const [isSoundPlaying, setIsSoundPlaying] = useState(false);
  const playSoundTimeout = useRef(null);

  useEffect(() => {
    if (!socket) return;

    const handleNewRide = (data) => {
      console.log('Received new ride:', data);
      setAlerts((prevAlerts) => [data, ...prevAlerts]);
    };

    socket.on('new-ride', handleNewRide);

    return () => {
      socket.off('new-ride', handleNewRide);
    };
  }, [socket]);

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
