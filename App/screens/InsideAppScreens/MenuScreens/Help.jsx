import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput, ScrollView, Linking } from 'react-native'
import React, { useState } from 'react';
import { Feather, MaterialIcons } from '@expo/vector-icons';


const Help = () => {
  const [selectedConcern, setSelectedConcern] = useState(null)
  const [selectedSubquery, setSelectedSubquery] = useState(null)
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
    {
      id: '1',
      title: 'Not getting rides?',
      subqueries: [
        {
          id: '1-1',
          title: 'Please check your internet connection and ensure that you have location access enabled. If rides are still unavailable, it could be due to a high demand in your area. You can try refreshing the app or waiting a few minutes and trying again.'
        },
      ]
    },
    {
      id: '2',
      title: 'Showing less Kms?',
      subqueries: [
        {
          id: '2-1',
          title: 'Why is the distance showing less than expected?',
          answer: 'The distance shown may be based on the optimized route calculation or app-based estimations. If you believe the calculation is incorrect, please contact customer support with your trip details.'
        },
        {
          id: '2-2',
          title: 'Is the app showing the correct distance?',
          answer: 'The app uses GPS data to calculate the distance. In some cases, signal issues or map errors could cause slight discrepancies. Ensure your location settings and GPS are enabled correctly.'
        },
        {
          id: '2-3',
          title: 'Why did the app show a different distance than what I saw on my map?',
          answer: 'The app might calculate the distance using the most efficient route, which could differ slightly from the route you see on the map. If you feel the distance is incorrect, please reach out to our support team for clarification.'
        }
      ]
    },
    {
      id: '3',
      title: 'Payment Problem?',

      subqueries: [
        {
          id: '3-1',
          title: 'Why was my payment declined?',
          answer: 'Payment declines can happen due to issues with your payment method, such as insufficient funds or incorrect card details. Please check your payment method and try again. If the issue persists, contact your bank or payment provider.'
        },
        {
          id: '3-2',
          title: 'Why am I being charged more than expected?',
          answer: 'The final charge can vary due to factors like surge pricing, distance, and traffic conditions. Please check your ride details and fare breakdown for any additional charges. If you believe there is an error, contact support with the ride information.'
        },
        {
          id: '3-3',
          title: 'Can I change my payment method?',
          answer: 'Yes, you can update your payment method in the app under your account settings. Please ensure that the new payment method is correctly linked to avoid payment issues.'
        }
      ]
    },
    {
      id: '4',
      title: 'Account suspended?',
      subqueries: [
        {
          id: '4-1',
          title: 'Why is my account suspended?',
          answer: 'Accounts can be suspended due to violations of our terms and conditions, such as fraudulent activity or repeated cancellations. Please check your email for a notification from our team regarding the reason for the suspension.'
        },
        {
          id: '4-2',
          title: 'Can I get my account reinstated?',
          answer: 'If your account was suspended, please reach out to our support team with your account details for further clarification and to appeal the suspension if necessary.'
        },
        {
          id: '4-3',
          title: 'How do I know if my account suspension was lifted?',
          answer: 'Once your account suspension is lifted, you will receive a notification via email or in-app message. You can also try logging in again to confirm that your account is active.'
        }]
    },
    {
      id: '5',
      title: 'Account related problems?',
      subqueries: [
        {
          id: '5-1',
          title: 'I forgot my password, what should I do?',
          answer: 'If you forgot your password, click on "Forgot Password" on the login screen, and follow the instructions to reset it via email.'
        },
        {
          id: '5-2',
          title: 'How can I update my account details?',
          answer: 'To update your account details such as name, email, or phone number, go to the "Settings" section of your account and update the information there.'
        },
        {
          id: '5-3',
          title: 'How can I deactivate or delete my account?',
          answer: 'To deactivate or delete your account, please contact customer support. Deactivation or deletion cannot be done directly through the app.'
        },
      ]
    },
    {
      id: '6',
      title: 'App is not working?',
      subqueries: [
        {
          id: '6-1',
          title: 'The app crashes when I try to open it.',
          answer: 'Please try restarting your device and updating the app to the latest version from the app store. If the issue persists, try reinstalling the app. If the issue still occurs, please reach out to our support team with your device details.'
        },
        {
          id: '6-2',
          title: 'The app is very slow.',
          answer: "App slowness can be caused by low device storage or a weak internet connection. Please check your device's storage and network settings. Restarting the app or device may also help improve performance."
        },
        {
          id: '6-3',
          title: 'I am unable to sign in.',
          answer: 'Ensure that your login credentials are correct. If you’ve forgotten your password, you can reset it using the "Forgot Password" option. If you still have trouble signing in, please contact our support team.'
        }
      ]
    },
    {
      id: '7',
      title: 'Problem with customer?',
      subqueries: [
        {
          id: '7-1',
          title: 'I had a problem with a customer during the ride.',
          answer: 'We are sorry to hear about your experience. Please provide details of the incident, and we will investigate the matter. You can report any issues via the app or contact our customer support team for assistance.'
        },
        {
          id: '7-2',
          title: 'The customer did not pay the correct fare.',
          answer: 'If the customer has a payment issue, please contact support with the ride details, and we will investigate the situation.'
        },
        {
          id: '7-3',
          title: 'How do I report a problematic customer?',
          answer: 'If you encounter a problematic customer, please report the issue via the in-app support feature or contact customer service directly. We take such complaints seriously and will investigate further.'
        }
      ]
    },
    {
      id: '8',
      title: 'Emergency',
      subqueries: [
        {
          id: '8-1',
          title: 'What should I do in case of an emergency?',
          answer: 'If you are in an emergency situation, please call your local emergency services immediately. If it’s related to your ride, you can contact our support team through the app or use the emergency contact feature available in the app.'
        },
        {
          id: '8-2',
          title: 'Is there an emergency button in the app?',
          answer: 'Yes, the app has an emergency button that you can use to quickly contact support or alert authorities during an emergency. Please ensure your app is up to date to access this feature.'
        },

      ]
    }

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
                  {item.subqueries?.map((subquery, index) => (
                    <TouchableOpacity
                      key={subquery.id}
                      style={styles.subqueryContainer}
                      onPress={() =>
                        setSelectedSubquery(subquery.id === selectedSubquery ? null : subquery.id)
                      }
                    >
                      <Text style={styles.subqueryTitle}>{subquery.title}</Text>
                      {!(item.id === '1' && index === 0) && (
                        <Feather name="chevron-down" size={18} color="#0F4A97" marginLeft={270} marginTop={-17} />
                      )}
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

export default Help;

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
  subqueriesContainer: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  subqueryContainer: {
    padding: 3,
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