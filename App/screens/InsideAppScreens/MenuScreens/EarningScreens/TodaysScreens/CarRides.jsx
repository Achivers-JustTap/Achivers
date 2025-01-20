import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import React, { useState } from 'react';

const CarRides = () => {
  // State to manage the visibility of the incentives and bonuses dropdown
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

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

        {/* Conditional rendering of the dropdown content */}
        {isDropdownVisible && (
          <View style={styles.dropdownContent}>
            <Text style={styles.dropdownText}>Bonus 1: ₹500</Text>
            <Text style={styles.dropdownText}>Bonus 2: ₹1000</Text>
            <Text style={styles.dropdownText}>Incentive 1: ₹200</Text>
          </View>
        )}
      </View>

      <TouchableOpacity onPress={() => console.log('completed orders page mounted')} style={styles.box4WithShadow}>
        <View style={styles.row}>
          <Text style={styles.boldText}>0</Text>
          <Text style={{ fontSize: 15, padding: 7, color: 'green' }}>Completed Orders</Text>
          <View style={styles.ratingContainer}>
            <FontAwesomeIcon name="star" size={18} color="gold" />
            <Text style={styles.text}>0.0</Text>
            <Text style={styles.text}>₹ 0.0</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.item}>
            <Text style={styles.heading}>Total KM</Text>
            <Text style={styles.value}>0.0 km</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.heading}>Order + Extra Earnings</Text>
            <Text style={styles.value}>₹ 0.00</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.heading}>Penalty</Text>
            <Text style={styles.value}>₹ 0</Text>
          </View>
          <FontAwesomeIcon name="angle-right" size={18} color="#000" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => console.log('missed orders page mounted')} style={styles.box5WithShadow}>
        <View style={styles.row}>
          <Text style={styles.boldText}>0</Text>
          <Text style={{ fontSize: 15, padding: 7, color: 'red' }}>Missed Orders</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.text}>₹ 0.0</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.item}>
            <Text style={styles.heading}>Adjustments</Text>
            <Text style={styles.value}>₹ 0.0</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.heading}>Penalty</Text>
            <Text style={styles.value}>₹ 0.0</Text>
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
    marginBottom: 100,
  },
});

export default CarRides;
