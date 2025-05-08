import { SafeAreaView, StyleSheet, Text, View, ScrollView,TouchableOpacity } from 'react-native';
import React from 'react';

const CancelledOrders = ({navigation}) => {
  const cancelledRides = [
    {
      orderId: 'JTRID123456',
      service: 'Parcel',
      time: '10:30 AM',
      Date:'05-06-2024',
      pickup:'chintal',
      dropLocation: 'MG Road',
      cancelledBy: 'Customer',
    },
    {
      orderId: 'JTRID2345',
      service: 'Bike',
      time: '12:15 PM',
      Date:'05-06-2024',
      pickup:'chintal',
      dropLocation: 'Indira Nagar',
      cancelledBy: 'Earner',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        
        {cancelledRides.map((ride, index) => (
          <TouchableOpacity key={index} onPress={() => navigation.navigate('CancelledOrdersSummary', { cancelledRides: ride })}>
          <View key={index} style={styles.rideBox}>
            <View style={styles.rideTopRow}>
              <Text style={styles.serviceName}>{ride.service}</Text>
              <Text style={styles.timeText}>{ride.time}</Text>
              <Text style={styles.rupeeText}>₹0</Text>
            </View>
            <Text style={styles.locationText}>Drop: {ride.dropLocation}</Text>
            <Text style={styles.statusText}>
              Accepted - Cancelled by {ride.cancelledBy}
            </Text>
          </View>
          </TouchableOpacity>
        ))}
        
      </ScrollView>
    </SafeAreaView>
  );
};

export default CancelledOrders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F9FF',
    paddingTop: 20,
  },
  rideBox: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  rideTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  serviceName: {
    fontWeight: 'bold',
    color: '#0F4A97',
  },
  timeText: {
    color: '#555',
  },
  rupeeText: {
    color: '#0F4A97',
    fontWeight: '600',
  },
  locationText: {
    fontSize: 15,
    marginVertical: 4,
  },
  statusText: {
    fontStyle: 'italic',
    color: '#999',
  },
});
