import { StyleSheet, Text, View, Button, Alert,ScrollView } from 'react-native';
import React from 'react';

const BikeRateCard = () => {
  const showAlert = () => {
    Alert.alert(
      'Fare Information',
      `
      1. Base Fare: 
      The base amount upon which distance fare and time fare is added. For every order, you will receive Base fare + ride distance * Price per km + ride time * Price per min.

      2. Minimum Fare: 
      The minimum amount you would receive per order.

      3. Price per minute: 
      The ride time amount earned per minute.

      4. Platform Charges: 
      Amount you would be charged per order for Rapido services.

      5. Pickup Extra Km Fare post 0 km (Max 0): 
      Extra amount you would receive if pickup distance exceeds 0 km. You will be paid extra only for the distance travelled beyond 0 km.

      Terms and Conditions:
      - You will be paid only as per the route given by Rapido.
      - You might not receive the bonus amount if you are involved in any fraud, and additionally, you will be penalized.
      - Captain denied duties, cancellations, and asking the customers for extra cash are strictly not acceptable.
      `,
      [
        { text: 'OK' }
      ]
    );
  };

  return (
    <ScrollView>
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
          <Text style={styles.value}>₹0</Text>
        </View>


        <View style={styles.rateItem}>
          <Text style={styles.label}>Distance Cost</Text>
          <Text style={styles.value}>₹0/km</Text>
        </View>

        <View style={styles.subItem}>
          <Text style={styles.subLabel}>• First 0 kms</Text>
          <Text style={styles.value}>₹0/km</Text>
        </View>

        <View style={styles.subItem}>
          <Text style={styles.subLabel}>• Beyond 0 kms</Text>
          <Text style={styles.value}>₹0/km</Text>
        </View>

        <View style={styles.rateItem}>
          <Text style={styles.label}>Minute Cost</Text>
          <Text style={styles.value}>₹0/min</Text>
        </View>

        <View style={styles.rateItem}>
          <Text style={styles.label}>Waiting (Post 0 mins)</Text>
          <Text style={styles.value}>₹0/min</Text>
        </View>

        <View style={styles.rateItem}>
          <Text style={styles.label}>Platform Fee</Text>
          <Text style={styles.value}>₹0</Text>
        </View>

        <View style={styles.rateItem}>
          <Text style={styles.label}>Pickup (Extra KM)</Text>
          <Text style={styles.value}>₹0/km</Text>
        </View>

        <View style={styles.rateItem}>
          <Text style={styles.label}>Cancellation Fee</Text>
          <Text style={styles.value}>₹0</Text>
        </View>

        
        <View style={styles.rateItem}>
          <Text style={styles.label}>Surge Fare</Text>
          <Text style={styles.value}>₹0</Text>
        </View>

        
        <View style={styles.rateItem}>
          <Text style={styles.label}>Night Fare(11pm - 6am)</Text>
          <Text style={styles.value}>0%</Text>
        </View>

      
      </View>
      <Text style={styles.ratecardText}>Just Tap! Commision</Text>
      <Text style={styles.ratecardText1}>11%(order + surge, Long Pickup & Night Fare)</Text>

      <Text style={styles.ratecardText}>GST</Text>
      <Text style={styles.ratecardText1}>Which is paid to Government</Text>

      <Text style={styles.ratecardText}>Handling Fee</Text>
      <Text style={styles.ratecardText1}>For Facilitating a Safe Ride</Text>

      <Text style={styles.note}>
        * Fares may vary based on traffic, surge, or time of day.
      </Text>

      {/* More Info Button */}
      <Button title="More Info" onPress={showAlert} />

    </View>
    </ScrollView>
  );
};

export default BikeRateCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f6ff',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
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
  ratecardText:{
    fontSize: 16,
    color: '#0f4a97',
    marginTop: 20,
    fontWeight: 'bold',
  },
  ratecardText1:{
    fontSize: 14,
    color: '#000',
    marginTop: 5,
    fontWeight: 'bold',
  },
});
