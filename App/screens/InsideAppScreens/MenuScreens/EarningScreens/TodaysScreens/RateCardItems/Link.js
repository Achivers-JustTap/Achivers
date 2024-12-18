import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Link = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        <Text style={styles.header}>JUST TAP!</Text> Your Fare Guide
      </Text>

      <Text style={styles.days}>Monday - Sunday</Text>

      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>00:00 AM - 11:59 PM</Text>
      </View>

      <View style={styles.rateContainer}>
        <View style={styles.rateItem}>
          <Text style={styles.label}>Base Fare</Text>
          <Text style={styles.value}>₹25</Text>
        </View>

        <View style={styles.rateItem}>
          <Text style={styles.label}>Minimum Charge</Text>
          <Text style={styles.value}>₹35</Text>
        </View>

        <View style={styles.rateItem}>
          <Text style={styles.label}>Distance Cost</Text>
          <Text style={styles.value}>₹10/km</Text>
        </View>

        <View style={styles.subItem}>
          <Text style={styles.subLabel}>• First 8 kms</Text>
          <Text style={styles.value}>₹10/km</Text>
        </View>

        <View style={styles.subItem}>
          <Text style={styles.subLabel}>• Beyond 8 kms</Text>
          <Text style={styles.value}>₹12/km</Text>
        </View>

        <View style={styles.rateItem}>
          <Text style={styles.label}>Minute Cost</Text>
          <Text style={styles.value}>₹1/min</Text>
        </View>

        <View style={styles.rateItem}>
          <Text style={styles.label}>Waiting (Post 3 mins)</Text>
          <Text style={styles.value}>₹1.5/min</Text>
        </View>

        <View style={styles.rateItem}>
          <Text style={styles.label}>Platform Fee</Text>
          <Text style={styles.value}>₹5</Text>
        </View>

        <View style={styles.rateItem}>
          <Text style={styles.label}>Pickup (Extra KM)</Text>
          <Text style={styles.value}>₹8/km</Text>
        </View>
      </View>

      <Text style={styles.note}>
        * Fares may vary based on traffic, surge, or time of day.
      </Text>
    </View>
  );
};

export default Link;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f6ff',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3F51B5',
    marginBottom: 8,
    textAlign: 'center',
  },
  header: {
    fontFamily: 'SofadiOne',
    fontSize: 26,
    color: '#3949AB',
    textShadowColor: '#9FA8DA',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  days: {
    fontSize: 16,
    fontWeight: '600',
    color: '#5C6BC0',
    marginBottom: 8,
  },
  timeContainer: {
    backgroundColor: '#E3F2FD',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 16,
    width: '100%',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 14,
    color: '#1E88E5',
    fontWeight: '500',
  },
  rateContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 12,
    width: '100%',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  rateItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 0.8,
    borderBottomColor: '#BBDEFB',
  },
  subItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    paddingLeft: 10,
  },
  label: {
    fontSize: 14,
    color: '#5C6BC0',
    fontWeight: '500',
  },
  subLabel: {
    fontSize: 12,
    color: '#90A4AE',
    fontWeight: '400',
  },
  value: {
    fontSize: 14,
    color: '#283593',
    fontWeight: 'bold',
  },
  note: {
    fontSize: 12,
    color: '#607D8B',
    textAlign: 'center',
    marginTop: 12,
  },
});