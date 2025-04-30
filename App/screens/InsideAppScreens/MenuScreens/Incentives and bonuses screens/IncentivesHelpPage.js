import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput, ScrollView, Linking } from 'react-native'
import React, { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';


const IncentivesHelpPage = () => {
  const [selectedConcern, setSelectedConcern] = useState(null)
  const [driverConcern, setDriverConcern] = useState('')
  const [driverName, setDriverName] = useState('')
  const [driverPhone, setDriverPhone] = useState('')
  const [driverEmail, setDriverEmail] = useState('')

  const concerns = [
    { id: '1', title: 'What are incentives?', answer: 'Incentives are additional earnings offered to drivers for achieving specific targets, such as completing a certain number of rides, driving during peak hours, or covering specific zones. These are designed to boost earnings and reward performance.' },
    {
      id: '2', title: 'How can I check what incentives I am eligible for?',
      answer: `You can check your eligible incentives by:
1.Opening the Just Tap Driver App.
2.Navigating to the Earnings tab from the menu.
3.Clicking on the Incentives section to view available offers and details about eligibility criteria.` },
    {
      id: '3', title: 'Can I update my driving license?',
      answer: `Incentives may not appear for the day if:
1.There are no active incentive programs scheduled for the current day.
2.You have already completed the incentive target for the current day.
3.Your app is not updated.

Solution:
1.Check the app for updates in the Play Store or App Store.
2.Ensure your profile and documents are verified and active.
3.Contact support through the Help Center in the app for further assistance.`
    },
    {
      id: '4', title: 'What should I do if my incentive amount is not added after completing the incentive target?',
      answer: `If your incentive amount is missing even after meeting the target:
1.Go to the Earnings tab and review your Ride History and Incentives section.
2.Confirm that you have met all the requirements for the incentive.
3.Wait for 24 hours, as incentives are sometimes updated at the end of the day.
4.If the issue persists, contact Support via the app and share the details of the incentive target and ride history.` },
    {
      id: '5', title: 'How can I track my progress towards my incentive target?',
      answer: `You can track your progress by:
1.Opening the Incentives section under the Earnings tab.
2.Viewing the Incentive Tracker, which displays your completed rides or earnings versus the target.
3.Ensuring that your rides are counted in real-time for an accurate status update.`
    },
    {
      id: '7', title: ' I did not receive my incentive.',
      answer: `If you didn’t receive your incentive:
1.Verify the incentive details in the Earnings tab.
2.Confirm if all conditions, such as ride count, time frame, or zones, were met.
3.Wait for 24 hours to allow for processing.
4.If the incentive is still missing, contact Support through the app and submit your ride details and screenshots if needed.` },
  ]

  const handleCallSupport = () => {
    const phoneNumber = 'tel:8340863204';
    Linking.openURL(phoneNumber).catch((err) =>
      alert('Unable to make the call. Please try again later.')
    );
  };
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
          <Text style={{textAlign:'center', fontSize: 16, fontWeight: 'bold', marginTop: 20 }}> Or </Text>

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

export default IncentivesHelpPage;

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
