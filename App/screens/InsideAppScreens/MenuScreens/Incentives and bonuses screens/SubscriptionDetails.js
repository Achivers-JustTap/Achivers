import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';

const SubscriptionDetails = ({navigation}) => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [subscriptionMessage, setSubscriptionMessage] = useState('');

  const handleSubscribe = () => {
    if (selectedPlan) {
      setSubscriptionMessage(`Congratulations! You've successfully subscribed for Just Tap Subscription plans for ${selectedPlan.days} days! Have fun with driving for earning more.`);
    } else {
      setSubscriptionMessage('Please select a subscription plan.');
    }
  };

  const plans = [
    { id: 1, amount: 500, days: 1, earnings: 30 },
    { id: 2, amount: 1000, days: 3, earnings: 50 },
    { id: 3, amount: 1500, days: 5, earnings: 80 },
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.helpButton} onPress={() => navigation.navigate('SubscriptionHelp')}>
              <FontAwesomeIcon name="hands-helping" size={15} color="#fff" />
              <Text style={styles.helpText}>Help</Text>
            </TouchableOpacity>
      <Text style={styles.heading}>Select Your Plan</Text>

      <View style={styles.planContainer}>
        <View style={styles.planBox}>
          {plans.map((plan) => (
            <TouchableOpacity
              key={plan.id}
              style={[styles.plan, selectedPlan?.id === plan.id && styles.selectedPlan]}
              onPress={() => setSelectedPlan(plan)}
            >
              <Text style={styles.planText}>₹{plan.amount}</Text>
              <Text style={styles.subHeading}>Earnings</Text>
              <Text style={styles.subText}>{plan.earnings} per day</Text>
              <Text style={styles.subHeading}>{plan.days} Days</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Text style={styles.termsHeading}>Terms & Conditions</Text>
      <Text style={styles.termsText}>
        By subscribing, you agree to the Just Tap terms and conditions for drivers. Ensure you follow all the necessary safety measures while driving.
      </Text>
      
     
      {subscriptionMessage && (
        <View style={styles.messageBox}>
          <Text style={styles.messageText}>{subscriptionMessage}</Text>
        </View>
      )}

      <View style={styles.selectedPlanBox}>
        <Text style={styles.selectedPlanText}>
          {selectedPlan ? `Selected Plan: ₹${selectedPlan.amount} for ${selectedPlan.days} days` : 'No plan selected'}
        </Text>
      </View>

      <TouchableOpacity style={styles.subscribeButton} onPress={handleSubscribe}>
        <Text style={styles.subscribeText}>Subscribe to {''}<Text style={styles.justTapText}>JUST TAP!</Text></Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  helpButton: {
    position: 'absolute',
    top: 12,
    right: 15,
    backgroundColor: '#0F4A97',
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    top:-45,
    zIndex: 10,
  },
  helpText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 5,
  },
  heading: {
    fontSize: 24,
    color: '#0F4A97',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  planContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width:'100%',
    marginBottom: 20,
  },
  planBox: {
    flexDirection: 'row',
    width:'100%',
    justifyContent: 'space-between',
  },
  plan: {
    backgroundColor: '#f1f1f1',
    padding: 15,
    width: '30%',
    borderRadius: 8,
    alignItems: 'center',
  },
  selectedPlan: {
    backgroundColor: '#0cc0df'
  },
  planText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subHeading: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 14,
    color: '#777',
  },
  termsHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  termsText: {
    fontSize: 14,
    color: '#555',
    textAlign:'justify',
    marginBottom: 20
  },
  selectedPlanBox: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  selectedPlanText: {
    fontSize: 16,
    color: '#333',
  },
  subscribeButton: {
    backgroundColor: '#ff6347',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  subscribeText: {
    color: '#fff',
    fontSize: 18,
  },
  messageBox: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#c6d6eb',
    borderRadius: 8,
    marginBottom: 30,
  },
  messageText: {
    fontSize: 16,
    fontWeight:'bold',
    color: '#0F4A97',
    textAlign: 'center',
  },
  justTapText: {
    fontFamily: 'SofadiOne',
    fontSize: 18,
    color: 'white',
   
  },
});

export default SubscriptionDetails;
