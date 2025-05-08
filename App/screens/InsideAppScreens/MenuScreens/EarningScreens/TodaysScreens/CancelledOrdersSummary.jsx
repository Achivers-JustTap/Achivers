import { StyleSheet, Text, View, TouchableOpacity, Animated, Easing, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';

const CancelledOrdersSummary = ({ route, navigation }) => {
  const { cancelledRides } = route.params;
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, []);

  const formattedDate = moment(cancelledRides.date).format('DD-MM-YYYY');
  const formattedDay = moment(cancelledRides.date).format('dddd');

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
            <AntDesign name="arrowleft" size={24} color="#ff7e5f" />
          </TouchableOpacity>



          <TouchableOpacity style={styles.helpButton} onPress={() => navigation.navigate('Help')}>
            <FontAwesomeIcon name="hands-helping" size={15} color="#ff7e5f" />
            <Text style={styles.help}>Help</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.orderIdContainer}>
          <Text style={styles.orderId}>Order ID: {cancelledRides.orderId}</Text>
          <Text style={styles.dateText}>Time: {cancelledRides.time}</Text>
          <Text style={styles.dateText}>{formattedDate} - {formattedDay}</Text>
        </View>

        {/* Status */}
        <LinearGradient colors={['#ff7e5f', '#feb47b']} style={styles.serviceStatusContainer}>
          <Text style={styles.serviceType}>{cancelledRides.service}</Text>

          <Text style={styles.statusDescription}>
            {cancelledRides.cancelledBy === 'Customer'
              ? 'Customer Cancelled Ride'
              : 'This Order was Cancelled by You'}
          </Text>

        </LinearGradient>

        {/* Earnings */}
        <View style={styles.earningsBox}>
          <Text style={styles.earningsTitle}>Your Earnings</Text>
          <Text style={styles.earningsAmount}>₹0</Text>
        </View>

        {/* Location Info */}
        <View style={styles.locationDetailsContainer}>
          <Text style={[styles.locationTextHighlight, { color: '#96c93d' }]}>
            Pickup Point: <Text style={styles.locationTextNormal}>{cancelledRides.pickup}</Text>
          </Text>
          <Text style={[styles.locationTextHighlight, { color: '#ff7e5f' }]}>
            Dropping Point: <Text style={styles.locationTextNormal}>{cancelledRides.dropLocation}</Text>
          </Text>
        </View>
      </Animated.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 45,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconButton: {
    borderRadius: 30,
    padding: 10,
    backgroundColor: 'white',
  },
  orderIdContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderId: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  dateText: {
    fontSize: 14,
    color: '#333',
  },
  helpButton: {
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#c89c2c',
  },
  help: {
    color: '#ff7e5f',
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 5,
  },
  serviceStatusContainer: {
    marginTop: 25,
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 3,
  },
  serviceType: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  status: {
    fontSize: 15,
    color: 'white',
    marginTop: 5,
    fontWeight: '600',
  },
  statusDescription: {
    marginTop: 4,
    color: '#fff',
    fontSize: 14,
  },
  earningsBox: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#ff7e5f',
    padding: 15,
    borderRadius: 10,
    marginVertical: 15,
    alignItems: 'center',
  },
  earningsTitle: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
  },
  earningsAmount: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
    marginTop: 5,
  },
  locationDetailsContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
  locationTextHighlight: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#c89c2c',
  },
  locationTextNormal: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'normal',
  },
});

export default CancelledOrdersSummary;
