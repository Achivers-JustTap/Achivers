import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LinearGradient } from 'expo-linear-gradient';

const DailyIncentives = ({ route, navigation }) => {
  const [selectedVehicleType, setSelectedVehicleType] = useState(route.params?.selectedVehicleName || 'Moto');
  const [activeTab, setActiveTab] = useState('Bike Taxi');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [isDateSelected, setIsDateSelected] = useState(true); // Set to true to show today's date
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isPresentDate, setIsPresentDate] = useState(false);
  const [isPastDate, setIsPastDate] = useState(false);
  const [isFutureDate, setIsFutureDate] = useState(false);

  const timeSlots = [
    { title: 'Earn Upto ₹85', time: '7:00 AM - 11:59 AM', gradientColors: ['#96c93d', '#00b09b'], rides: ['3', '6', '9'], amounts: ['15', '30', '40'], start: '07:00', end: '11:59' },
    { title: 'Earn Upto ₹95', time: '1:00 PM - 5:59 PM', gradientColors: ['#64B5F6', '#90CAF9'], rides: ['3', '6', '9'], amounts: ['15', '35', '55'], start: '13:00', end: '17:59' },
    { title: 'Earn Upto ₹115', time: '7:00 PM - 11:59 PM', gradientColors: ['#FFE324', '#FFB533'], rides: ['3', '6', '9'], amounts: ['25', '40', '50'], start: '19:00', end: '23:59' }
  ];

  const getCurrentTime = () => {
    const now = new Date();
    return now.getHours() * 100 + now.getMinutes();
  };

  const checkIfSlotPassed = (start, end) => {
    const currentTime = getCurrentTime();
    const startTime = parseInt(start.replace(':', ''), 10);
    const endTime = parseInt(end.replace(':', ''), 10);
    return currentTime > endTime;
  };

  useEffect(() => {
    if (route.params?.vehicleType) {
      setSelectedVehicleType(route.params.vehicleType);
    }

    setIsDateSelected(true);
    setDate(new Date());

    const currentDate = new Date();
    if (date.toLocaleDateString('en-GB') !== currentDate.toLocaleDateString('en-GB')) {
      setIsPresentDate(false);
      setIsPastDate(date < currentDate);
      setIsFutureDate(date > currentDate);
    } else {
      setIsPresentDate(true);
      setIsPastDate(false);
      setIsFutureDate(false);
    }

    setCurrentTime(new Date());
  }, [route.params]);

  const handleTabPress = (tab) => {
    setActiveTab(tab);
  };

  const onChange = (event, selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate);
      setIsDateSelected(true);
    }
    setShowPicker(false);
  };

  const handleBackPress = () => {
    setIsDateSelected(false);
    setDate(new Date());
    setShowPicker(false);
    setIsPresentDate(false);
    setIsPastDate(false);
    setIsFutureDate(false);
  };

  const renderCard = (title, time, gradientColors, rides, amounts, start, end) => {
    const isSlotPassed = checkIfSlotPassed(start, end);
    const headerGradient = isPastDate || (isPresentDate && isSlotPassed) ? ['#FF0000', '#FF3333'] : gradientColors;
    const message = (isSlotPassed && isPresentDate) || isPastDate ? 'You Cannot get this incentive today!' : '';
    const noDateMessage = !isDateSelected ? 'Select a date to see the incentives' : null;
    const futureDateMessage = isFutureDate && isDateSelected ? 'These incentives are not yet released!' : null;

    return (
      <View style={styles.cardContainer}>
        <LinearGradient colors={headerGradient} style={styles.cardHeaderContainer}>
          <Text style={styles.cardHeader}>{time}</Text>
        </LinearGradient>
        <View style={styles.cardBodyContainer}>
          <Text style={styles.cardTitle}>{!isDateSelected || isFutureDate ? '' : title}</Text>
          {noDateMessage || futureDateMessage ? (
            <Text style={[styles.incentiveMessage, { color: headerGradient[0] }]}>
              {noDateMessage || futureDateMessage}
            </Text>
          ) : (
            <View style={styles.cardContent}>
              {rides.map((ride, index) => (
                <View key={index} style={styles.rowContent}>
                  <Text style={[styles.dot, { color: headerGradient[0] }]}>●</Text>
                  <Text style={styles.rideText}>{ride} rides</Text>
                  <Text style={styles.amountText}>₹{amounts[index]}</Text>
                </View>
              ))}
            </View>
          )}
          {message ? <Text style={styles.incentiveMessage}>{message}</Text> : null}
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Date Picker Section */}
      <View style={styles.datePickerContainer}>
        {isDateSelected ? (
          <View style={styles.dateSelectedContainer}>
            <Text style={styles.dateText}>{date.toLocaleDateString('en-GB')}</Text>
            <TouchableOpacity
              style={styles.backButton}
              onPress={handleBackPress}
            >
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowPicker(true)}
          >
            <Text style={styles.dateButtonText}>Select Date</Text>
          </TouchableOpacity>
        )}

        {showPicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChange}
          />
        )}
      </View>

      {isPastDate && isDateSelected && (
        <View style={styles.pastDateMessageContainer}>
          <Text style={styles.pastDateMessage}>These incentives are unavailable!</Text>
        </View>
      )}

       {isFutureDate && isDateSelected && (
        <View style={styles.pastDateMessageContainer}>
          <Text style={styles.pastDateMessage}>These Incentives Are Not yet released</Text>
        </View>
      )}

      {timeSlots.map((slot, index) => 
        renderCard(slot.title, slot.time, slot.gradientColors, slot.rides, slot.amounts, slot.start, slot.end)
      )}
      <Text styles={{paddingBottom: 70}}></Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  datePickerContainer: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    elevation: 5,
  },
  dateSelectedContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 20,
    left: 10,
    fontWeight: 'bold',
    color: '#0F4A97',
  },
  dateButton: {
    backgroundColor: '#0F4A97',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  dateButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#FFB74D',
    padding: 10,
    borderRadius: 5,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cardContainer: {
    padding: 0,
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: '#fff',
    elevation: 5,
  },
  cardHeaderContainer: {
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardBodyContainer: {
    padding: 10,
  },
  cardHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center', 
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 2,
    textAlign: 'center', 
  },
  cardContent: {
    marginTop: 3,
  },
  rowContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  dot: {
    fontSize: 20,
    marginRight: 10,
  },
  rideText: {
    fontSize: 16,
    left: -100,
    textAlign: 'left',  
  },
  amountText: {
    fontSize: 16,
    right:20,
    fontWeight: 'bold',
    textAlign: 'right',  
  },
  incentiveMessage: {
    color: '#FF0000',
    fontWeight: 'bold',
    fontSize:17,
    textAlign: 'center',
    marginTop: 10,
  },
  pastDateMessageContainer: {
    padding: 10,
    backgroundColor: '#FFEBEE',
    borderRadius: 5,
    marginBottom: 10,
  },
  pastDateMessage: {
    color: '#FF0000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  homeButton: {
    backgroundColor: '#64B5F6',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  homeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default DailyIncentives;