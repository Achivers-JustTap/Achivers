import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const All = ({ vehicleType }) => {
  const navigation = useNavigation();
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

 
  const [data, setData] = useState({
    completedOrders: 0,
    rating: 0.0,
    earnings: 0.0,
    totalKM: 0.0,
    orderEarnings: 0.0,
    penalty: 0,
    missedOrders: 0,
    missedAdjustments: 0.0,
    missedPenalty: 0.0,
    cancelledOrders: 0,
    cancelledAdjustments: 0.0,
    cancelledPenalty: 0.0,
    bonuses: [
      { label: 'Bonus 1', amount: '₹000' },
      { label: 'Bonus 2', amount: '₹1000' },
      { label: 'Incentive 1', amount: '₹200' },
    ],
  });

  useEffect(() => {
    // Update data based on vehicleType
    // This is placeholder logic; replace with backend data integration later
    if (vehicleType === 'car') {
      setData({
        completedOrders: 5,
        rating: 4.5,
        earnings: 1500,
        totalKM: 120.5,
        orderEarnings: 1400,
        penalty: 50,
        missedOrders: 1,
        missedAdjustments: 20,
        missedPenalty: 10,
        cancelledOrders: 0,
        cancelledAdjustments: 0,
        cancelledPenalty: 0,
        bonuses: [
          { label: 'Car Bonus 1', amount: '₹500' },
          { label: 'Car Bonus 2', amount: '₹300' },
          { label: 'Car Incentive 1', amount: '₹200' },
        ],
      });
    } else if (vehicleType === 'auto') {
      setData({
        completedOrders: 3,
        rating: 4.0,
        earnings: 900,
        totalKM: 80.0,
        orderEarnings: 850,
        penalty: 30,
        missedOrders: 2,
        missedAdjustments: 15,
        missedPenalty: 5,
        cancelledOrders: 1,
        cancelledAdjustments: 10,
        cancelledPenalty: 5,
        bonuses: [
          { label: 'Auto Bonus 1', amount: '₹400' },
          { label: 'Auto Bonus 2', amount: '₹200' },
          { label: 'Auto Incentive 1', amount: '₹100' },
        ],
      });
    } else if (vehicleType === 'bike') {
      setData({
        completedOrders: 7,
        rating: 4.8,
        earnings: 1800,
        totalKM: 150.0,
        orderEarnings: 1700,
        penalty: 20,
        missedOrders: 0,
        missedAdjustments: 0,
        missedPenalty: 0,
        cancelledOrders: 0,
        cancelledAdjustments: 0,
        cancelledPenalty: 0,
        bonuses: [
          { label: 'Bike Bonus 1', amount: '₹600' },
          { label: 'Bike Bonus 2', amount: '₹400' },
          { label: 'Bike Incentive 1', amount: '₹300' },
        ],
      });
    } else {
      // Default or unknown vehicle type
      setData({
        completedOrders: 0,
        rating: 0.0,
        earnings: 0.0,
        totalKM: 0.0,
        orderEarnings: 0.0,
        penalty: 0,
        missedOrders: 0,
        missedAdjustments: 0.0,
        missedPenalty: 0.0,
        cancelledOrders: 0,
        cancelledAdjustments: 0.0,
        cancelledPenalty: 0.0,
        bonuses: [
          { label: 'Bonus 1', amount: '₹000' },
          { label: 'Bonus 2', amount: '₹1000' },
          { label: 'Incentive 1', amount: '₹200' },
        ],
      });
    }
  }, [vehicleType]);

  return (
    <ScrollView style={styles.container}>
      <View>
        <TouchableOpacity onPress={toggleDropdown} style={styles.box2WithShadow}>
          <Text style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 16 }}>
            Incentives and Bonuses
          </Text>
          <Text style={{ fontWeight: 'bold', textAlign: 'center', right: 20, fontSize: 20, position: 'absolute' }}>
            <FontAwesomeIcon name="angle-down" size={20} color="black" />
          </Text>
        </TouchableOpacity>

        {isDropdownVisible && (
          <View style={styles.dropdownContent}>
            {data.bonuses.map((bonus, index) => (
              <Text key={index} style={styles.dropdownText}>
                {bonus.label}: {bonus.amount}
              </Text>
            ))}
          </View>
        )}
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('CompletedRides')} style={styles.box4WithShadow}>
        <View style={styles.row}>
          <Text style={styles.boldText}>{data.completedOrders}</Text>
          <Text style={{ fontSize: 15, padding: 7, color: 'green' }}>Completed Orders</Text>
          <View style={styles.ratingContainer}>
            <FontAwesomeIcon name="star" size={18} color="gold" />
            <Text style={styles.text}>{data.rating.toFixed(1)}</Text>
            <Text style={styles.text}>₹ {data.earnings.toFixed(1)}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.item}>
            <Text style={styles.heading}>Total KM</Text>
            <Text style={styles.value}>{data.totalKM.toFixed(1)} km</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.heading}>Order + Extra Earnings</Text>
            <Text style={styles.value}>₹ {data.orderEarnings.toFixed(2)}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.heading}>Penalty</Text>
            <Text style={styles.value}>₹ {data.penalty}</Text>
          </View>
          <FontAwesomeIcon name="angle-right" size={18} color="#000" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('MissedOrders')} style={styles.box5WithShadow}>
        <View style={styles.row}>
          <Text style={styles.boldText}>{data.missedOrders}</Text>
          <Text style={{ fontSize: 15, padding: 7, color: 'red' }}>Missed Orders</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.text}>₹ {data.missedAdjustments.toFixed(1)}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.item}>
            <Text style={styles.heading}>Adjustments</Text>
            <Text style={styles.value}>₹ {data.missedAdjustments.toFixed(1)}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.heading}>Penalty</Text>
            <Text style={styles.value}>₹ {data.missedPenalty.toFixed(1)}</Text>
          </View>
          <FontAwesomeIcon name="angle-right" size={18} color="#000" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('CancelledOrders')} style={styles.box5WithShadow}>
        <View style={styles.row}>
          <Text style={styles.boldText}>{data.cancelledOrders}</Text>
          <Text style={{ fontSize: 15, padding: 7, color: 'red' }}>Cancelled Orders</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.text}>₹ {data.cancelledAdjustments.toFixed(1)}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.item}>
            <Text style={styles.heading}>Adjustments</Text>
            <Text style={styles.value}>₹ {data.cancelledAdjustments.toFixed(1)}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.heading}>Penalty</Text>
            <Text style={styles.value}>₹ {data.cancelledPenalty.toFixed(1)}</Text>
          </View>
          <FontAwesomeIcon name="angle-right" size={18} color="#000" />
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  box2WithShadow: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#0F4A97',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownContent: {
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    marginTop: 10,
  },
  dropdownText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  box4WithShadow: {
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#0F4A97',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 8,
    padding: 15,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  boldText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  text: {
    fontSize: 13,
    padding: 7,
    color: '#555',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    alignItems: 'center',
  },
  heading: {
    fontSize: 12,
    padding: 5,
    fontWeight: 'bold',
    color: '#000',
  },
  value: {
    fontSize: 12,
    color: '#333',
  },
  box5WithShadow: {
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#0F4A97',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 8,
    padding: 15,
    marginBottom: 20,
  },
});

export default All;
