import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput, ScrollView, Linking } from 'react-native'
import React, { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';


const EarningsHelp = () => {
  const [selectedConcern, setSelectedConcern] = useState(null)
  const [driverConcern, setDriverConcern] = useState('')
  const [driverName, setDriverName] = useState('')
  const [driverPhone, setDriverPhone] = useState('')
  const [driverEmail, setDriverEmail] = useState('')

  const handleCallSupport = () => {
    const phoneNumber = 'tel:8340863204';
    Linking.openURL(phoneNumber).catch((err) =>
      alert('Unable to make the call. Please try again later.')
    );
  };

  const concerns = [
    { id: '1', title: 'Learn More About Your Earnings', 
      answer: 'Your earnings on the Just Tap app are calculated based on the trips you complete. You can view a detailed breakdown of your earnings in the "Earnings" section of your profile. This section includes the total amount earned, the distance traveled, time spent, and any bonuses or incentives you may have earned during the day.For any clarification or further details, you can always contact customer support from the app.' },

    { id: '2', title: ' Route/Location Related Issues', 
    answer:  `If you’re facing route or location-related issues, here are some things to check:

GPS Accuracy: Ensure that your phone’s GPS is enabled and is functioning correctly. If GPS is not accurate, it may cause delays or errors in the route calculation.
Network Issues: A weak or no network connection can affect the routing. Ensure you have a stable internet connection to allow the app to calculate the best route.
App Updates: Make sure the app is up to date, as updates may include improvements to the routing system.

If the problem persists, you can contact customer support with specific details about the issue, and we will assist you in resolving it.` },

    { id: '3', title: 'How Can I Transfer My Earnings to My Bank Account?', 
      answer:  `To transfer your earnings to your bank account, follow these steps:

      Go to Your Profile: Open the Just Tap app and navigate to your profile section.
      Earnings Section: Tap on "Earnings" to view your available balance.
      Withdraw Option: Click on the "Withdraw" button and select "Bank Transfer."
      Enter Bank Details: Fill in your bank account details if you haven’t already done so.
      Confirm Transfer: Once your bank details are verified, confirm the transfer.

      Please note that transfers are processed within 1-3 business days depending on your bank.` },

    { id: '4', title: 'Issue with Transferring Earnings to My Bank Account', 
      answer: `If you're facing an issue with transferring your earnings, consider the following:

      Bank Account Details: Double-check that the bank account details entered in the app are correct and up to date.
      Minimum Transfer Limit: Ensure that you have met the minimum transfer amount required for withdrawals.
      Pending Transfers: If you have any pending transfers, they must be completed before initiating another transfer.
      App Updates: Make sure that your app is updated to the latest version to avoid any issues related to bank transfers.
      
      If the issue persists, please contact our customer support team with the details of the error, and we’ll help you resolve it as soon as possible.` },
  ]

  const handleSubmitConcern = () => {
    if (driverConcern.trim() && driverName.trim() && driverPhone.trim() && driverEmail.trim()) {
      console.log('Sending concern:', driverConcern)
      console.log('Driver Details:', { name: driverName, phone: driverPhone, email: driverEmail })
      setDriverConcern('')
      setDriverName('')
      setDriverPhone('')
      setDriverEmail('')
    } else {
      alert('Please fill in all the fields')
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Support</Text>
      
      <View style={styles.concernsList}>
        <FlatList
          data={concerns}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.concernContainer}>
              <TouchableOpacity
                style={styles.concernTitleContainer}
                onPress={() => setSelectedConcern(item.id === selectedConcern ? null : item.id)}
              >
                <Text style={styles.concernTitle}>{item.title}</Text>
              </TouchableOpacity>
              {selectedConcern === item.id && (
                <View style={styles.answerContainer}>
                  <Text style={styles.answerTitle}>Answer:</Text>
                  <Text style={styles.answerText}>{item.answer}</Text>
                </View>
              )}
            </View>
          )}
        />
      </View>

       
      <TouchableOpacity onPress={handleCallSupport} style={styles.callIcon}>
          <Text style={styles.callIconText}>Call Support </Text>
          <MaterialIcons name="call" size={24} color="#0F4A97" style={styles.callIconButton} />
        </TouchableOpacity>
          <Text style={{textAlign:'center'}}> Or </Text>
      
      <View style={styles.submitContainer}>
        <Text style={styles.subheading}>Have a concern?</Text>
        
        <TextInput
          style={styles.textInput}
          placeholder="Your Name"
          value={driverName}
          onChangeText={setDriverName}
        />
        
        <TextInput
          style={styles.textInput}
          placeholder="Your Phone Number"
          keyboardType="phone-pad"
          value={driverPhone}
          onChangeText={setDriverPhone}
        />
        
        <TextInput
          style={styles.textInput}
          placeholder="Your Email Address"
          keyboardType="email-address"
          value={driverEmail}
          onChangeText={setDriverEmail}
        />
        
        <TextInput
          style={styles.textInput}
          placeholder="Describe your concern..."
          multiline
          value={driverConcern}
          onChangeText={setDriverConcern}
        />
        
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmitConcern}>
          <Text style={styles.submitButtonText}>Submit Concern</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 12,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0F4A97',
    marginBottom: 16,
    textAlign: 'center',
  },
  callIcon: {
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: '#F0F4F8',
    padding: 8,
    borderRadius: 8,
  },
  callIconText: {
    color: "#0F4A97",
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  callIconButton: {
    marginTop: 2, 
  },
  concernsList: {
    flex: 1,
  },
  concernContainer: {
    marginBottom: 12,
    padding: 14,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  concernTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  concernTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F4A97',
    flex: 1,
  },
  answerContainer: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  answerTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#333',
  },
  answerText: {
    marginTop: 4,
    fontSize: 12,
    color: '#555',
  },
  subheading: {
    fontSize: 16,
    marginTop: 24,
    fontWeight: '600',
    color: '#0F4A97',
    textAlign: 'center',
  },
  textInput: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    marginTop: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    fontSize: 14,
    color: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  submitContainer: {
    marginTop: 24,
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    marginHorizontal: 8,
    marginBottom: 30
  },
  submitButton: {
    marginTop: 14,
    backgroundColor: '#0F4A97',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
})

export default EarningsHelp;
