import React, { useEffect, useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import RideAlertBox from '../../../components/RideAlertBox';
import { AlertsContext } from '../../Context/AlertsContext';

const RideAlertsPage = ({ navigation }) => {
  const { alerts, clearAlerts, closeAlertsPage, alertsPageVisible, removeAlert, isHalfPageVisible } = useContext(AlertsContext);

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

  const handleAccept = (index) => {
    removeAlert(index);
  };

  const handleSkip = (index) => {
    removeAlert(index);
  };

  if (!alertsPageVisible) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      {isHalfPageVisible && (
        <TouchableOpacity style={styles.downArrowContainer} onPress={closeAlertsPage}>
          <Icon name="angle-down" size={30} color="#0F4A97" />
        </TouchableOpacity>
      )}
      <ScrollView contentContainerStyle={styles.alertsContainer}>
        {alerts.length === 0 ? (
          <Text style={styles.noAlertsText}>No ride alerts</Text>
        ) : (
          alerts.map((alert, index) => (
            <RideAlertBox
              key={index}
              alertData={alert}
              onAccept={() => handleAccept(index)}
              onSkip={() => handleSkip(index)}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  downArrowContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0F4A97',
    marginRight: 40, // to center title considering back button width
  },
  alertsContainer: {
    padding: 10,
    alignItems: 'center',
  },
  noAlertsText: {
    fontSize: 16,
    color: '#555',
    marginTop: 20,
  },
});

export default RideAlertsPage;
