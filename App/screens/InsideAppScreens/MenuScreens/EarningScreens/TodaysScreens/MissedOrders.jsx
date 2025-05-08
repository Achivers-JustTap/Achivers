import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';

const MissedOrders = ({navigation}) => {
  const missedRides = [
    {
      orderId: 'JTRID123456',
      service: 'Bike',
      time: '9:00 AM',
      Date:'05-06-2024',
      pickup: 'Koramangala',
      drop: 'BTM Layout',
      status: 'Missed',
    },
    {
      orderId: 'JTRID2345',
      service: 'Parcel',
      time: '1:45 PM',
      Date:'05-06-2024',
      pickup: 'Hebbal',
      drop: 'Electronic City',
      status: 'Skipped',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {missedRides.map((ride, index) => (
          <TouchableOpacity key={index} onPress={() => navigation.navigate('MissedOrdersSummary', { missedRides: ride })}>
            <View style={styles.rideBox}>
              <View style={styles.rideTopRow}>
                <Text style={styles.serviceName}>{ride.service}</Text>
                <Text style={styles.timeText}>{ride.time}</Text>
                <Text style={styles.rupeeText}>₹0</Text>
              </View>
              <Text style={styles.locationText}>From: {ride.pickup} → To: {ride.drop}</Text>
              <Text style={styles.statusText}>{ride.status}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MissedOrders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#F5F9FF',
  },
  rideBox: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 15,
    borderRadius: 12,
    
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
