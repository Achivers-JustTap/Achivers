import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React, { useState } from 'react'

const ServiceManagerHelp = () => {
  const [selectedConcern, setSelectedConcern] = useState(null)
  const [driverConcern, setDriverConcern] = useState('')
  const [driverName, setDriverName] = useState('')
  const [driverPhone, setDriverPhone] = useState('')
  const [driverEmail, setDriverEmail] = useState('')

  const concerns = [
    { id: '1', title: 'What are the other services provided by Just Tap?', answer: 'Just Tap offers multiple Services, including: Bike Metro, Bike, Bike Boost, Parcel Delivery, Groceries Delivery, Auto Rides and Cab rides' },
    {
      id: '2', title: 'How can I become a food delivery partner with Just Tap?',
      answer: `To become a food delivery partner:
1.Download the Just Tap Driver App and register.
2.Upload the required documents (ID proof, driving license, vehicle details, etc.).
3.Wait Till Your Documents Get Approved.
4.After Your Documents ot approved go to Service manager and Activate food Delivery Option.
5.Start accepting delivery orders.` },
    {
      id: '3', title: ' What are the working hours for a food delivery partner at Just Tap?',
      answer: `Incentives may not appear for the day if:
1.Just Tap offers flexible working hours.
2.You can log in and log out at your convenience.
3.Peak hours typically offer higher earnings (e.g., lunch and dinner times).`
    },
    {
      id: '4', title: 'How much more can I earn with Just Tap by becoming a food delivery partner?',
      answer: `1.Earnings depend on the number of deliveries, distance covered, and peak hours bonuses.
2.Additional income is possible through incentives, cashback offers, and referral bonuses.` },
    {
      id: '5', title: 'When and how will I be paid by Just Tap?',
      answer: `You can track your progress by:
1.Payments are credited weekly to your registered bank account.
2.You can track your earnings through the earnings page.`
    },
    {
      id: '6', title: 'How will I get the cashback?',
      answer: `Cashback is credited directly to your account after meeting the target requirements set during registration or promotional offers.` },
      {
        id: '7', title: 'When will I get the cashback?',
        answer: `Cashback is usually credited within 7-10 working days after achieving the specified target (rides/deliveries or active days).`
      },
      {
        id: '8', title: ' How can I track my progress for rides and number of days left to complete the target?',
        answer: `Use the Driver App Dashboard to monitor:
1.Total rides/deliveries completed.
2.Pending targets.
3.Days left to complete your goal.`
      },
      {
        id: '9', title:  'What will happen if I change my city or mobile number after paying the joining fee and before receiving the cashback?',
        answer: `1.Changing your city or mobile number may delay cashback processing.
2.Inform customer support immediately to update your details and avoid issues.`
      },
      {
        id: '10', title: 'Can I Turn Off a service?',
        answer: `Yes, you can:
1.Pause or stop accepting rides/deliveries temporarily using the Service Manager.
2.Reactivate services whenever required.`
      },
      {
        id: '11', title: 'A service has been suspended for my account. What should I do?',
        answer: `1.Check the Driver App Notifications for details on the suspension.
2.Review any pending documents or unresolved complaints.
3.Contact customer support to resolve the issue and reactivate the service`
      },
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

export default ServiceManagerHelp;

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
