import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput, ScrollView, Linking } from 'react-native'
import React, { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';


const RewardsHelp = () => {
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
    { id: '1', title: 'What are Rewards?', answer: 'Rewards are a loyalty program offered by the Just Tap. Users can earn rewards by booking rides, referring friends, and participating in special offers or promotions. These rewards typically come in the form of points or credits, which can be redeemed for discounts on future rides, free rides, or other benefits.'},
    {
      id: '2', title: 'Where can I see my Rewards?',
      answer: `You can see Rewards by following below steps:
1.Open menu in Just Tap Driver App.
2.Navigate to Incentives and Bonuses Page.
3.Click on rewards feild to view Rewards Just Tap provide.` },
    
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

export default RewardsHelp;

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
