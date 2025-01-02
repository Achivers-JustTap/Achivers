import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const WeeklyIncentives = ({ route, navigation }) => {
  const [selectedVehicleType, setSelectedVehicleType] = useState(route.params?.selectedVehicleName || 'Moto');
  const [activeTab, setActiveTab] = useState('Bike Taxi');
  const [week, setWeek] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [isWeekSelected, setIsWeekSelected] = useState(false);

  useEffect(() => {
    if (route.params?.vehicleType) {
      setSelectedVehicleType(route.params.vehicleType);
    }
  }, [route.params]);

  const handleTabPress = (tab) => {
    setActiveTab(tab);
  };

  const getDayName = (date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
  };

  const onChange = (event, selectedDate) => {
    if (selectedDate) {
      const startOfWeek = new Date(selectedDate);
      const endOfWeek = new Date(selectedDate);

      // Calculate start and end of the week
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Sunday
      endOfWeek.setDate(endOfWeek.getDate() + (6 - endOfWeek.getDay())); // Saturday

      setWeek(
        `${getDayName(startOfWeek)} (${startOfWeek.toLocaleDateString('en-GB')}) - ${getDayName(endOfWeek)} (${endOfWeek.toLocaleDateString('en-GB')})`
      );
      setIsWeekSelected(true);
    }
    setShowPicker(false);
  };

  const handleBackPress = () => {
    setIsWeekSelected(false);
    setWeek('');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Week Picker Section */}
      <View style={styles.datePickerContainer}>
        {isWeekSelected ? (
          <View style={styles.dateSelectedContainer}>
            <Text style={styles.dateText}>{week}</Text>
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
            <Text style={styles.dateButtonText}>Select Week</Text>
          </TouchableOpacity>
        )}

        {/* DateTimePicker */}
        {showPicker && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            display="default"
            onChange={onChange}
          />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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
    fontSize: 12,
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
    backgroundColor: '#FF5733',
    padding: 10,
    borderRadius: 5,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default WeeklyIncentives;
