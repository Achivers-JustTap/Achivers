import { StyleSheet, Text, View, TouchableOpacity, SectionList } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';  

const Activity = ({ navigation }) => {

  const rides = [
    {
      id: '12345',
      time: '10:00 AM',
      distance: '15 km',
      source: 'PickUp Point A',
      destination: 'Destination Point A',
      fare: '₹200',
      date: '2025/01/25',
    },
    {
      id: '12346',
      time: '11:30 AM',
      distance: '10 km',
      source: 'PickUp Point B',
      destination: 'Destination Point B',
      fare: '₹150',
      date: '2025/01/25',
    },
    {
      id: '12347',
      time: '01:00 PM',
      distance: '20 km',
      source: 'PickUp Point C',
      destination: 'Destination Point C',
      fare: '₹300',
      date: '2025/01/24',
    },
  ];

  const vehicle = useSelector((state) => state.documents.vehicleType);

  const groupedRides = rides.reduce((groups, ride) => {
    if (!groups[ride.date]) {
      groups[ride.date] = [];
    }
    groups[ride.date].push(ride);
    return groups;
  }, {});

  const sections = Object.keys(groupedRides).map((date) => ({
    title: date,
    data: groupedRides[date],
  }));

  const renderRide = ({ item }) => (
    <View style={styles.card}>
      <LinearGradient colors={["#0F4A97", "#4D91E3"]} style={styles.cardGradient}>
        <View style={styles.header}>
          <Text style={styles.rideId}>Ride ID: {item.id}</Text>
          <Text style={styles.mode}>Mode: {vehicle || 'Not Specified'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.time}>Time: {item.time}</Text>
          <Text style={styles.distance}>Distance: {item.distance}</Text>
        </View>
        <Text style={styles.source}>Source: {item.source}</Text>
        <Text style={styles.destination}>Destination: {item.destination}</Text>
        <Text style={styles.fare}>Fare: {item.fare}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('History')}
        >
          <Text style={styles.buttonText}>Know More</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );

  return (
    <View style={styles.container}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={renderRide}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title === '2025/01/25' ? 'Today' : title}</Text>
        )}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </View>
  );
};

export default Activity;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#eef2f3',
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop: 16,
    color: '#0F4A97',
    textTransform: 'uppercase',
  },
  card: {
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 4,
  },
  cardGradient: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  rideId: {
    fontWeight: 'bold',
    color: '#fff',
  },
  mode: {
    fontWeight: 'bold',
    color: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  time: {
    color: '#e0e0e0',
  },
  distance: {
    color: '#e0e0e0',
  },
  source: {
    marginBottom: 4,
    color: '#fff',
  },
  destination: {
    marginBottom: 4,
    color: '#fff',
  },
  fare: {
    marginBottom: 8,
    color: '#fff',
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#0F4A97',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
