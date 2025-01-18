import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';

const SubscriptionHelp = () => {
  const [selectedConcern, setSelectedConcern] = useState(null)
  const [selectedSubquery, setSelectedSubquery] = useState(null)
  const [driverConcern, setDriverConcern] = useState('')
  const [driverName, setDriverName] = useState('')
  const [driverPhone, setDriverPhone] = useState('')
  const [driverEmail, setDriverEmail] = useState('')

  const concerns = [
    {
      id: '1',
      title: 'I have an issue with my Earnings / Money',
      subqueries: [
        {
          id: '1-1',
          title: 'I did not receive money for an Order',
          answer: 'You should check your payment history in the app and ensure that the payment method is correctly linked. If the issue persists, contact customer support for further assistance.',
        },
        {
          id: '1-2',
          title: 'I did not receive my incentive',
          answer: 'Verify if the incentive eligibility criteria have been met. Sometimes, there could be delays or issues with the system processing the incentives. If everything is correct, reach out to customer support for clarification.',
        },
        {
          id: '1-3',
          title: 'I could not achieve my incentive',
          answer: "Ensure you're meeting the required criteria for the incentive. Review your performance, such as the number of trips completed, ratings, or specific goals. If you need more help, contact support for guidance.",
        },
        {
          id: '1-4',
          title: 'I was charged a penalty',
          answer: 'You can earn incentives by completing certain rides, driving during peak hours, or fulfilling other specific requirements.',
        },
      ],
    },
    {
      id: '2',
      title: 'I have an issue with my Redeem',
      subqueries: [
        {
          id: '2-1',
          title: 'My Redeem is on hold',
          answer: `If your redeem (payment or incentive) is on hold, it could be due to several reasons, such as missing documents, violation of terms, or pending verification. To resolve this issue:

1.Check if all your documents and account details are up to date.
2.Verify if you meet all the necessary requirements for the redeem.
3.Contact customer support to get specific details about why your redeem is on hold and how to resolve it.`,
        },
        {
          id: '2-2',
          title: 'I was charged penalty',
          answer: `Penalties are usually imposed for violations such as:

1.Late cancellations of rides.
2.Not adhering to the company’s guidelines or service standards.
3.Customer complaints.

To address a penalty:

1.Review your recent activities to understand the reason for the penalty.
2.Check the penalty details in your app to understand the exact reason for the charge.
3.If you believe the penalty was incorrectly charged, contact customer support to appeal or get further clarification.`
        },
      ],
    },
    {
      id: '3',
      title: 'I have an Issue with the App',
      subqueries: [
        {
          id: '3-1',
          title: 'I want to change my mobile number',
          answer: 'To change your mobile number, you typically need to navigate to the "Account Settings" or "Profile" section of the app. There should be an option to update your phone number within these settings. If you can’t find this option, it’s best to reach out to customer support for assistance in changing your number. They may require you to verify your new number through an OTP (One-Time Password) to ensure the update is secure.',
        },
        {
          id: '3-2',
          title: 'I am not able to upload my documents',
          answer: "If you're facing issues uploading your documents, there are a few steps you can take to resolve this. First, make sure the document files are in the correct format and within the size limits specified by the app. A slow or unstable internet connection could also cause issues with uploads, so ensure your connection is stable. If you're still facing problems, try clearing the app cache or reinstalling it to see if that resolves the issue. If the problem persists, don't hesitate to contact customer support, as they can provide further assistance and troubleshoot the issue for you.",
        },
        {
          id: '3-3',
          title: 'I want to change my bike',
          answer: `To change your bike, you will need to check the app for any vehicle management options, usually found in the "Settings" or "Profile" section. In this section, you should be able to update or register a new vehicle. If you can't find the option to change your bike, it's a good idea to reach out to customer support. They can guide you through the process and help you update your vehicle details.`,
        },
        {
          id: '3-4',
          title: 'I am not able to go online',
          answer: "If you're unable to go online, it could be due to several reasons. First, ensure your internet connection is stable and strong. It's also important to check that your location services are enabled and that the app is functioning correctly. If your app is up-to-date and your account status is clear, but you’re still unable to go online, try restarting the app or reinstalling it. In case the issue persists, there might be an account-specific issue or a restriction preventing you from going online. In such cases, it's best to contact customer support to investigate further and resolve the issue.",
        },
      ],
    },
    {
      id: '4',
      title: 'I have an issue with my previous Orders',
      subqueries: [
        {
          id: '4-1',
          title: 'There was an issue with the Pickup Location',
          answer: 'To update your driving license, navigate to the Documents section in the app and follow the instructions.',
        },
        {
          id: '4-2',
          title: 'There was an issue with the Drop location',
          answer: 'To update your driving license, navigate to the Documents section in the app and follow the instructions.',
        },
        {
          id: '4-3',
          title: 'There was an issue with the route',
          answer: 'To update your driving license, navigate to the Documents section in the app and follow the instructions.',
        },
        {
          id: '4-4',
          title: 'Customer Cancelled the Order',
          answer: 'To update your driving license, navigate to the Documents section in the app and follow the instructions.',
        },
      ],
    },
    {
      id: '5',
      title: 'Demand and more earning options',
      subqueries: [
        {
          id: '5-1',
          title: 'Why am I not getting orders',
          answer: `If you're not receiving orders, it could be due to low demand in your area, a poor internet connection, or being marked as "offline" in the app. Ensure your app is up-to-date, your location services are on, and your profile is in good standing. Try moving to a busier area or check if there are any restrictions in your app settings. If the issue persists, contact customer support for assistance.`,
        },
        {
          id: '5-2',
          title: 'Where should I go to get more orders?',
          answer: 'Generally, orders are more frequent in areas with high demand. You can use the app to identify demand zones or "hot spots" where more orders are typically available.',
        },
        {
          id: '5-3',
          title: 'I am not getting my route orders',
          answer: 'Try to ensure your location services are turned on and that you are in an area with higher demand. If you’re still not receiving orders, contact support to check if there’s a system issue.',
        },
        {
          id: '5-4',
          title: 'What are Demand Areas how should I use them?',
          answer: 'Demand areas are specific zones where orders are more likely to be available. To use them effectively, monitor your app for these areas and try to position yourself within or near these zones to increase your chances of getting more orders.',
        },
        {
          id: '5-5',
          title: 'How to get more orders in Just Tap?',
          answer: 'To get more orders in Just Tap, try positioning yourself in high-demand zones, maintain a good rating, and ensure your app is working smoothly. Participating in promotions or incentives offered by Just Tap can also help increase your order volume.',
        },
      ],
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

                <Feather name="chevron-down" size={18} color="#0F4A97" /> 
              </TouchableOpacity>
              {selectedConcern === item.id && (
                <View style={styles.subqueriesContainer}>
                  {item.subqueries.map((subquery) => (
                    <TouchableOpacity
                      key={subquery.id}
                      style={styles.subqueryContainer}
                      onPress={() =>
                        setSelectedSubquery(subquery.id === selectedSubquery ? null : subquery.id)
                      }
                    >
                      <Text style={styles.subqueryTitle}>{subquery.title}</Text>
                      <Feather name="chevron-down" size={18} color="#0F4A97" marginLeft={260} marginTop={-17}/> 
                      {selectedSubquery === subquery.id && (
                        <Text style={styles.answerText}>{subquery.answer}</Text>
                      )}
                    </TouchableOpacity>
                  ))}
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

export default SubscriptionHelp;

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
  subqueriesContainer: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  subqueryContainer: {
    padding: 8,
  },
  subqueryTitle: {
    fontSize: 14,
    fontWeight: 'bold',
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
    marginBottom: 30,
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
