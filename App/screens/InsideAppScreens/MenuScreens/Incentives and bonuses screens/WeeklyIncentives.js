import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LinearGradient } from 'expo-linear-gradient';

const WeeklyIncentives = ({ route, navigation }) => {
  const [selectedVehicleType, setSelectedVehicleType] = useState(route.params?.selectedVehicleName || 'Moto');
  const [weekStart, setWeekStart] = useState('');
  const [weekEnd, setWeekEnd] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [isWeekSelected, setIsWeekSelected] = useState(false);
  const [isFutureWeek, setIsFutureWeek] = useState(false);
  const [isCurrentWeek, setIsCurrentWeek] = useState(false);

  const timeSlots = [
    {
      title: 'Earn Upto ₹1000',
      time: '7:00 AM - 11:59 PM',
      gradientColors: ['#96c93d', '#00b09b'],
      rides: ['40', '60', '75'],
      amounts: ['250', '300', '450'],
      start: '07:00',
      end: '11:59'
    },
  ];

  useEffect(() => {
    if (route.params?.vehicleType) {
      setSelectedVehicleType(route.params.vehicleType);
    }

    const currentDate = new Date();
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);

    setWeekStart(`${getDayName(startOfWeek)} (${startOfWeek.toLocaleDateString('en-GB')})`);
    setWeekEnd(`${getDayName(endOfWeek)} (${endOfWeek.toLocaleDateString('en-GB')})`);
    setIsWeekSelected(true);
    setIsCurrentWeek(true);
    setIsFutureWeek(false);
  }, [route.params]);

  const getDayName = (date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
  };

  const isFutureDate = (selectedDate) => {
    const currentDate = new Date();
    return selectedDate > currentDate;
  };

  const isCurrentWeekCheck = (selectedDate) => {
    const currentDate = new Date();
    const startOfWeek = new Date(selectedDate);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);
    return currentDate >= startOfWeek && currentDate <= endOfWeek;
  };

  const onChange = (event, selectedDate) => {
    if (selectedDate) {
      const startOfWeek = new Date(selectedDate);
      const endOfWeek = new Date(selectedDate);

      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
      endOfWeek.setDate(endOfWeek.getDate() + 6);

      setWeekStart(`${getDayName(startOfWeek)} (${startOfWeek.toLocaleDateString('en-GB')})`);
      setWeekEnd(`${getDayName(endOfWeek)} (${endOfWeek.toLocaleDateString('en-GB')})`);
      setIsWeekSelected(true);

      if (isFutureDate(startOfWeek)) {
        setIsFutureWeek(true);
        setIsCurrentWeek(false);
      } else if (isCurrentWeekCheck(startOfWeek)) {
        setIsCurrentWeek(true);
        setIsFutureWeek(false);
      } else {
        setIsFutureWeek(false);
        setIsCurrentWeek(false);
      }
    }
    setShowPicker(false);
  };

  const handleBackPress = () => {
    setIsWeekSelected(false);
    setWeekStart('');
    setWeekEnd('');
    setIsFutureWeek(false);
    setIsCurrentWeek(false);
  };

  const renderCard = (title, time, gradientColors, rides, amounts, start, end, key) => {
    return (
      <View key={key} style={styles.cardContainer}>
        <LinearGradient colors={gradientColors} style={styles.cardHeaderContainer}>
          <Text style={styles.cardHeader}>{time}</Text>
        </LinearGradient>
        <View style={styles.cardBodyContainer}>
          {isWeekSelected ? (
            isFutureWeek ? (
              <Text style={styles.noWeekMessage}>These incentives are not yet released!</Text>
            ) : isCurrentWeek ? (
              <>
                <Text style={styles.cardTitle}>{title}</Text>
                <View style={styles.cardContent}>
                  {rides.map((ride, index) => (
                    <View key={index} style={styles.rowContent}>
                      <Text style={[styles.dot, { color: gradientColors[0] }]}>●</Text>
                      <Text style={styles.rideText}>{ride} rides</Text>
                      <Text style={styles.amountText}>₹{amounts[index]}</Text>
                    </View>
                  ))}
                </View>
              </>
            ) : (
              <Text style={styles.PastWeekMessage}>These incentives are unavailable now!</Text>
            )
          ) : (
            <Text style={styles.noWeekMessage}>Please select a week to get incentives!</Text>
          )}
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.datePickerContainer}>
        {isWeekSelected ? (
          <View style={styles.dateSelectedContainer}>
            <View style={styles.weekDisplay}>
              <Text style={styles.dateText}>{weekStart}</Text>
              <Text style={styles.toText}>to</Text>
              <Text style={styles.dateText}>{weekEnd}</Text>
            </View>
            <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.dateButton} onPress={() => setShowPicker(true)}>
            <Text style={styles.dateButtonText}>Select Week</Text>
          </TouchableOpacity>
        )}

        {showPicker && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            display="default"
            onChange={onChange}
          />
        )}
      </View>

      {timeSlots.map((slot, index) =>
        renderCard(slot.title, slot.time, slot.gradientColors, slot.rides, slot.amounts, slot.start, slot.end, index)
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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
    alignItems: 'center',
  },
  weekDisplay: {
    alignItems: 'center',
    marginBottom: 10,
  },
  dateText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0F4A97',
    textAlign: 'center',
  },
  toText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#444',
    marginVertical: 2,
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
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginTop: 4,
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
    flex: 1,
    textAlign: 'left',
    paddingLeft: 10,
  },
  amountText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  noWeekMessage: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
    textAlign: 'center',
    marginTop: 10,
  },
  PastWeekMessage: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  }
});

export default WeeklyIncentives;
