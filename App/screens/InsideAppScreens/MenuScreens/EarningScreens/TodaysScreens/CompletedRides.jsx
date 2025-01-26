import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons'; 

const CompletedRides = () => {
  const navigation = useNavigation();
  useEffect(() => {  
    navigation.setOptions({ title: "Completd Orders" });
  }, [navigation]);

  const transactions = [
    {
      id: 'JTRID001',
      amountType: 'deducted',
      startTime: '12:30 PM',
      endTime: '1:00 PM',
      service: 'Bike',
      Status: 'completed',
      BookingAccepted: '12:25 PM',
      waitingTime: '2min',
      Pickup: 'Chintal',
      Dropping: 'KPHB',
      TripCharges: '₹156.07',
      tax: '₹7.09',
      TotalEarnings: '₹149.08',
      baseAmount: '₹10',
      timeTaken: '30min',
      timeCharges: '₹10',
      distance: '20kms',
      distanceCharges: '₹20',
      waitTimeFee: '₹1',
      date: '2025-01-01',
    },
    {
      id: 'JTRID003',
      amountType: 'deducted',
      startTime: '7:00 PM',
      endTime: '7:45 PM',
      service: 'Auto',
      Status: 'completed',
      BookingAccepted: '6:55 PM',
      waitingTime: '0min',
      Pickup: 'Hitech City',
      Dropping: 'Banjara Hills',
      TripCharges: '₹130.00',
      tax: '₹6.00',
      TotalEarnings: '₹124.00',
      baseAmount: '₹10',
      timeTaken: '45min',
      timeCharges: '₹10',
      distance: '20kms',
      distanceCharges: '₹20',
      waitTimeFee: '₹0',
      date: '2024-12-5',
    },
  ];

  const handleNavigate = (transaction) => {
    navigation.navigate('RidesSummary', { transaction });
  };

  return (
    <ScrollView style={styles.container}>
      
      {transactions.map((item) => (
        <TouchableOpacity
          key={item.id}  
          style={[styles.card, item.amountType === 'added' ? styles.cardAdded : {}]}
          onPress={() => (handleNavigate(item))}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.transactionText}>{item.id}</Text>
            <Text style={styles.dateText}>{item.date}</Text>
          </View>
          <View style={styles.cardBody}>
            <Text style={item.amountType === 'deducted' ? styles.amountDeducted : styles.amountAdded}>
              {item.amount}
            </Text>
             <View style={styles.locationDetailsContainer}>
                       <Text style={[styles.locationText, { color: '#96c93d' }]}>Pickup Point: <Text style={[styles.locationText, { color: '#000' }]}>{item.Pickup}</Text></Text>
                       
             
                       <Text style={[styles.locationText, { color: '#ff7e5f' }]}>Dropping Point: <Text style={[styles.locationText, { color: '#000' }]}>{item.Dropping}</Text></Text>
                       
                     </View>
          </View>
          <FontAwesome name="arrow-right" size={20} color="black" style={styles.arrowIcon} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default CompletedRides;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#0F4A97',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  transactionText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 14,
    color: '#888',
  },
  cardBody: {
    marginTop: 10,
  },
  amountAdded: {
    fontSize: 16,
    color: 'green',
  },
  amountDeducted: {
    fontSize: 16,
    color: 'red',
  },
  timeText: {
    fontSize: 14,
    color: '#555',
  },
  locationDetailsContainer: {
    marginBottom: 10,
    
  },
  locationText: {
    fontSize: 16,
    marginBottom: 5,
  },
  arrowIcon: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },
});
