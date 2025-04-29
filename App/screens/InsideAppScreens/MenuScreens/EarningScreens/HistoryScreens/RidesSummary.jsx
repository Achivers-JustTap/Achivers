import { StyleSheet, Text, View, TouchableOpacity, Animated, Easing, Alert,ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';

const RidesSummary = ({ route, navigation }) => {
  const { transaction } = route.params;

  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, []);

  const isAmountAdded = transaction.amountType === 'added';

  const formattedDate = moment(transaction.date).format('YYYY-MM-DD');
  const formattedDay = moment(transaction.date).format('dddd');

  // Function to show alert with order timeline
  const showOrderTimeline = () => {
    Alert.alert(
      "Order Timeline",
      "Your order timeline consists of 3 main stages: Assigned, Started, and Completed. Whenever an order is Cancelled or Aborted, you can view it on the timeline.\n\n" +
      "The First Mile distance and time (from order assignment point to pickup point) are shown on the timeline between Assigned and Started.\n" +
      "The Last Mile distance and time (from pickup point to drop point) are shown on the timeline between Started and Completed.\n\n" +
      "The distance and time shown on the timeline are based on the data provided by Google."
    );
  };

  // Function to show info about Tax, Time Taken, and Platform Fee
  const showInfo = (label) => {
    let message = '';
    switch (label) {
      case 'tax':
        message = 'Goods and Service Tax levied on Ride Charges and Booking/Convenience fees paid by Customer to the Government Authorities.';
        break;
      case 'timeTaken':
        message = 'Rupees 0.0/min';
        break;
      case 'platformFee':
        message = 'Platform charge 0% for each.';
        break;
      default:
        message = '';
    }
    Alert.alert(label.charAt(0).toUpperCase() + label.slice(1), message);
  };

  return (
    <ScrollView>
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[styles.iconButton, { backgroundColor: isAmountAdded ? '#96c93d' : '#ff7e5f' }]} >
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.orderIdContainer}>
          <Text style={styles.orderId}>Order ID: {transaction.id}</Text>
          <Text style={styles.dateText}>{formattedDate} - {formattedDay}</Text>
        </View>
        <TouchableOpacity
          style={[styles.helpButton, { backgroundColor: isAmountAdded ? '#96c93d' : '#ff7e5f' }]}
          onPress={() => navigation.navigate('Help')}>
          <FontAwesomeIcon name="hands-helping" size={15} color="#fff" />
          <Text style={styles.help}>Help</Text>
        </TouchableOpacity>
      </View>

      <LinearGradient
        colors={isAmountAdded ? ['#00b09b', '#96c93d'] : ['#ff7e5f', '#feb47b']}
        style={styles.serviceStatusContainer}>
        <Text style={styles.serviceType}>{transaction.service}</Text>
        <Text style={styles.status}>{transaction.Status}</Text>
      </LinearGradient>

      <TouchableOpacity style={styles.howItWorksButton} onPress={showOrderTimeline}>
        <Text style={styles.howItWorksText}>How it works?</Text>
      </TouchableOpacity>

      <View style={styles.bookingStatusContainer}>
        <View style={styles.routeContainer}>
          <View style={styles.routeStep}>
            <View style={[styles.dot, { backgroundColor: isAmountAdded ? '#96c93d' : '#ff7e5f' }]}></View>
            <Text style={styles.routeLabel}>Booking Accepted</Text>
            <Text style={styles.routeTime}>{transaction.BookingAccepted}</Text>
          </View>

          <View style={styles.routeStep}>
            <View style={[styles.dot, { backgroundColor: isAmountAdded ? '#96c93d' : '#ff7e5f' }]}></View>
            <Text style={styles.routeLabel}>Start Time</Text>
            <Text style={styles.routeTime}>{transaction.startTime}</Text>
          </View>

          <View style={styles.routeStep}>
            <View style={[styles.dot, { backgroundColor: isAmountAdded ? '#96c93d' : '#ff7e5f' }]}></View>
            <Text style={styles.routeLabel}>End Time</Text>
            <Text style={styles.routeTime}>{transaction.endTime}</Text>
          </View>
        </View>
      </View>

      <View style={styles.locationDetailsContainer}>
        <Text style={[styles.locationText, { color: '#96c93d' }]}>Pickup Point: <Text style={[styles.locationText, { color: '#000' }]}>{transaction.Pickup}</Text></Text>
        <Text style={[styles.locationText, { color: '#ff7e5f' }]}>Dropping Point: <Text style={[styles.locationText, { color: '#000' }]}>{transaction.Dropping}</Text></Text>
      </View>

      <View style={styles.costContainer}>
        <View style={styles.costRow}>
          <Text style={styles.costLabel}>Trip Charges:</Text>
          <Text style={styles.costValue}>{transaction.TripCharges}</Text>
        </View>
        <View style={styles.costRow}>
          <Text style={styles.costLabel}>Tax Collected</Text>
          <TouchableOpacity onPress={() => showInfo('tax')}>
            <FontAwesomeIcon name="info-circle" size={18} color="#ff7e5f" style={styles.infoIcon} />
          </TouchableOpacity>
          <Text style={styles.costValue}>{transaction.tax}</Text>
        </View>
        <View style={styles.costRow}>
          <Text style={styles.costLabel}>Total Earnings:</Text>
          <Text style={styles.costValue}>{transaction.TotalEarnings}</Text>
        </View>
        <View style={styles.costRow}>
          <Text style={styles.costLabel}>Base Amount:</Text>
          <Text style={styles.costValue}>{transaction.baseAmount}</Text>
        </View>

        <View style={styles.costRow}>
          <Text style={styles.routeLabel}>Time Taken({transaction.timeTaken})</Text>
          <TouchableOpacity onPress={() => showInfo('timeTaken')}>
            <FontAwesomeIcon name="info-circle" size={18} color="#ff7e5f" style={styles.infoIcon} />
          </TouchableOpacity>
          <Text style={styles.costValue}>{transaction.timeCharges}</Text>
        </View>

        <View style={styles.costRow}>
          <Text style={styles.routeLabel}>Distance({transaction.distance})</Text>
          <Text style={styles.costValue}>{transaction.distanceCharges}</Text>
        </View>

        <View style={styles.costRow}>
          <Text style={styles.routeLabel}>Wait Time Fee {transaction.waitingTime ? `(${transaction.waitingTime})` : ''}</Text>
          <Text style={styles.costValue}>{transaction.waitTimeFee}</Text>
        </View>

        <View style={styles.costRow}>
          <Text style={styles.routeLabel}>Platform Fee</Text>
          <TouchableOpacity onPress={() => showInfo('platformFee')}>
            <FontAwesomeIcon name="info-circle" size={18} color="#ff7e5f" style={styles.infoIcon} />
          </TouchableOpacity>
          <Text style={styles.costValue}>11.7</Text>
        </View>
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
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 14,
    right: 20,
    color: 'gray',
  },
  iconButton: {
    borderRadius: 30,
    padding: 10,
  },
  orderIdContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderId: {
    fontSize: 18,
    right: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  helpButton: {
    position: 'absolute',
    top: 10,
    right: -10,
    paddingVertical: 7,
    paddingHorizontal: 7,
    borderRadius: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  help: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  howItWorksButton: {
    marginVertical: 10,
    padding: 10,
    borderRadius: 30,
    alignItems: 'center',
  },
  howItWorksText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  serviceStatusContainer: {
    marginTop: 20,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  serviceType: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  status: {
    fontSize: 16,
    color: 'white',
    marginTop: 5,
  },
  bookingStatusContainer: {
    marginBottom: 20,
  },
  routeContainer: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  routeStep: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#ff7e5f',
    marginRight: 10,
  },
  routeLabel: {
    fontSize: 16,
    color: '#333',
    marginRight: 10,
  },
  routeTime: {
    fontSize: 16,
    color: '#888',
  },
  locationDetailsContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
  locationText: {
    fontSize: 14,
    marginBottom: 5,
  },
  costContainer: {
    marginBottom: 50,
  },
  costRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  costLabel: {
    fontSize: 16,
    color: '#333',
  },
  costValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  infoIcon: {
    marginLeft: -80,
    marginTop: 2
  },
});

export default RidesSummary;
