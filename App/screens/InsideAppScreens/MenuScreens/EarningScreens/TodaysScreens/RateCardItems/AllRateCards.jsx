import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';

const AllRateCards = ({ activeTab }) => {
  const vehicleType = useSelector(state => state.documents.vehicleType);
  console.log('Vehicle Type:', vehicleType);
  const [rateCard, setRateCard] = useState();
  const [loading, setLoading] = useState(true);

  const showAlert = () => {
    Alert.alert(
      'Fare Information',
      `Base Fare, Distance Fare, Minute Fare and more details.`,
      [{ text: 'OK' }]
    );
  };

  useEffect(() => {
    const fetchRateCard = async () => {
      try {
        const response = await fetch(`http://192.168.29.13:5000/rides/ratecard?vehicleType=${vehicleType}`);

        const data = await response.json();
        setRateCard(data)
        console.log('Rate Card Data:', data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchRateCard();
  }, [activeTab, vehicleType]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#3949AB" />
        <Text style={{ marginTop: 10, color: '#3949AB', fontWeight: '600' }}>Loading Rate Card...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        <Text style={styles.header}>JUST TAP!</Text> Your Fare Guide
      </Text>

      <Text style={styles.days}>Monday - Sunday</Text>

      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>00:00 AM - 11:59 PM</Text>
      </View>

      <View style={styles.rateContainer}>
        <View style={styles.rateItem}><Text style={styles.label}>Base Fare</Text><Text style={styles.value}>₹{rateCard.rateCard.Basefare}</Text></View>
        <View style={styles.rateItem}><Text style={styles.label}>Distance Cost</Text><Text style={styles.value}>₹{rateCard.rateCard.Distancefare1}/km</Text></View>
        <View style={styles.subItem}><Text style={styles.subLabel}>• First 0 kms</Text><Text style={styles.value}>₹{rateCard.rateCard.Distancefare1}/km</Text></View>
        <View style={styles.subItem}><Text style={styles.subLabel}>• Beyond 0 kms</Text><Text style={styles.value}>₹{rateCard.rateCard.distancefare2}/km</Text></View>
        <View style={styles.rateItem}><Text style={styles.label}>Minute Cost</Text><Text style={styles.value}>₹{rateCard.rateCard.Minutecost}/min</Text></View>
        <View style={styles.rateItem}><Text style={styles.label}>Waiting (Post 3 mins)</Text><Text style={styles.value}>₹{rateCard.rateCard.Waitingchargecost}/min</Text></View>
        <View style={styles.rateItem}><Text style={styles.label}>Platform Fee</Text><Text style={styles.value}>₹{rateCard.rateCard.Platformfee}</Text></View>
        <View style={styles.rateItem}><Text style={styles.label}>Pickup (Extra KM)</Text><Text style={styles.value}>₹{rateCard.rateCard.Longpickup}/km</Text></View>
        <View style={styles.rateItem}><Text style={styles.label}>Cancellation Fee</Text><Text style={styles.value}>₹{rateCard.rateCard.Cancellationfee}</Text></View>
        <View style={styles.rateItem}><Text style={styles.label}>Surge Fare</Text><Text style={styles.value}>₹{rateCard.rateCard.Surgefare}</Text></View>
        <View style={styles.rateItem}><Text style={styles.label}>Night Fare (11pm - 6am)</Text><Text style={styles.value}>{rateCard.rateCard.Nightfare}%</Text></View>
      </View>

      <Text style={styles.ratecardText}>Just Tap! Commission</Text>
      <Text style={styles.ratecardText1}>11% (order + surge, Long Pickup & Night Fare)</Text>

      <Text style={styles.ratecardText}>GST</Text>
      <Text style={styles.ratecardText1}>Which is paid to Government</Text>

      <Text style={styles.ratecardText}>Handling Fee</Text>
      <Text style={styles.ratecardText1}>For Facilitating a Safe Ride</Text>

      <Text style={styles.note}>* Fares may vary based on traffic, surge, or time of day.</Text>

      <Button title="More Info" onPress={showAlert} />
    </View>
  );
};

export default AllRateCards;

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  container: {
    padding: 20,
    backgroundColor: '#f2f6ff',
  },
  title: {
    fontSize: 22,
    color: '#3F51B5',
    marginBottom: 8,
    textAlign: 'center',
  },
  header: {
    fontSize: 26,
    color: '#3949AB',
  },
  days: {
    fontSize: 16,
    fontWeight: '600',
    color: '#5C6BC0',
    marginBottom: 8,
  },
  timeContainer: {
    backgroundColor: '#E3F2FD',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  timeText: {
    fontSize: 14,
    color: '#1E88E5',
    fontWeight: '500',
  },
  rateContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  rateItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 0.8,
    borderBottomColor: '#BBDEFB',
  },
  subItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    paddingLeft: 10,
  },
  label: {
    fontSize: 14,
    color: '#5C6BC0',
    fontWeight: '500',
  },
  subLabel: {
    fontSize: 12,
    color: '#90A4AE',
    fontWeight: '400',
  },
  value: {
    fontSize: 14,
    color: '#283593',
    fontWeight: 'bold',
  },
  note: {
    fontSize: 12,
    color: '#607D8B',
    textAlign: 'center',
    marginTop: 12,
  },
  ratecardText: {
    fontSize: 16,
    color: '#0f4a97',
    marginTop: 20,
    fontWeight: 'bold',
  },
  ratecardText1: {
    fontSize: 14,
    color: '#000',
    marginTop: 5,
    fontWeight: 'bold',
  },
});
