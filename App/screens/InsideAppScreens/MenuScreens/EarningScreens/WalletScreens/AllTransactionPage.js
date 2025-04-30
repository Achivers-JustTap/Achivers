import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const AllTransactionPage = () => {
  const navigation = useNavigation();

  const transactions = [
    {
      id: 'JTRID001',
      amount: '-₹200',
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
    id: 'Wallet Recharged',
      amount: '+₹100',
      Time: '7:00 PM',
      date: '2024-12-5',
    },
    {
      id: 'JTRID003',
      amount: '-₹100',
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
    navigation.navigate('TransactionDetailsPage', { transaction });
  };

  const renderItem = (item) => (
    <TouchableOpacity
    style={[styles.card, item.amountType === 'added' ? styles.cardAdded : {}]}
    onPress={() => (item.id !== 'Wallet Recharged' ? handleNavigate(item) : null)} // Check for Wallet Recharged id
  >
    {item.id === 'Wallet Recharged' ? (
      // Display details for Wallet Recharge transaction
      <>
      <View style={styles.cardHeader}>
        <Text style={styles.transactionText}>Wallet Recharged</Text>
        <Text style={styles.dateText}>{item.date}</Text>
        </View>
        <Text style={styles.amountAdded}>{item.amount}</Text>
        <Text style={styles.timeText}>{item.Time}</Text>
        
      </>
    ) : (
      // other transactions
      <>
        <View style={styles.cardHeader}>
          <Text style={styles.transactionText}>{item.id}</Text>
          <Text style={styles.dateText}>{item.date}</Text>
        </View>
        <View style={styles.cardBody}>
          <Text style={item.amountType === 'deducted' ? styles.amountDeducted : styles.amountAdded}>
            {item.amount}
          </Text>
          <Text style={styles.timeText}>Start: {item.startTime}</Text>
          <Text style={styles.timeText}>End: {item.endTime}</Text>
        </View>
        <FontAwesome name="arrow-right" size={20} color="black" style={styles.arrowIcon} />
      </>
    )}
  </TouchableOpacity>
);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {transactions.map((item) => renderItem(item))}
    </ScrollView>
  );
};

export default AllTransactionPage;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', 
    flexWrap: 'wrap', 
  },
  
 
  
  cardBody: {
    marginTop: 10,
  },
  transactionText: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 10, 
  },
  dateText: {
    fontSize: 14,
    color: 'gray',
  },
  amountDeducted: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
  },
  amountAdded: {
    color: 'green',
    fontSize: 16,
    fontWeight: 'bold',
  },
  timeText: {
    fontSize: 14,
    color: 'gray',
    marginTop: 5,
  },
  arrowIcon: {
    position: 'absolute',
    bottom: 15,
    right: 15,
  },
});
