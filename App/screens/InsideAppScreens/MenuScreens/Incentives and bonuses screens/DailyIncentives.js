import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const SubscriptionDetails = () => {
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
        <Text style={styles.subscribeText}>Subscribe to Just Tap</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#0F4A97',
    textTransform: 'uppercase',
    fontFamily: 'Montserrat-Bold',
  },
  planContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
    width: '100%',
  },
  planBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    width: '100%',
  },
  plan: {
    backgroundColor: '#FF6347',
    paddingVertical: 20,
    paddingHorizontal: 15,
    width: '30%',
    marginBottom: 20,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  selectedPlan: {
    backgroundColor: '#FFD700',
    shadowOpacity: 0.4,
  },
  planText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  subHeading: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 5,
  },
  subText: {
    fontSize: 14,
    color: '#FFF',
    marginBottom: 5,
  },
  termsHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
  },
  termsText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
    lineHeight: 22,
    textAlign: 'center',
  },
  selectedPlanBox: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 30,
    width: '100%',
    elevation: 8,
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  selectedPlanText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    fontWeight: '500',
  },
  subscribeButton: {
    backgroundColor: '#20B2AA',
    paddingVertical: 18,
    paddingHorizontal: 25,
    borderRadius: 50,
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  subscribeText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  messageBox: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#E0F7FA',
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    elevation: 8,
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  messageText: {
    fontSize: 16,
    color: '#0F4A97',
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default SubscriptionDetails;
