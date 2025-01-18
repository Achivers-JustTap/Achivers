import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'; 
import FontAwesome from 'react-native-vector-icons/FontAwesome5';


const Rewards = ({navigation}) => {
  const handleKnowMore = (section) => {
    console.log(`Know more about: ${section}`)
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
              <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <FontAwesomeIcon name="arrow-left" size={20} color="black" />
                <Text style={styles.headerText}>My Rewards</Text>
              </TouchableOpacity>
            </View>
      <TouchableOpacity style={styles.helpButton} onPress={() => navigation.navigate('RewardsHelp')}>
                    <FontAwesome name="hands-helping" size={15} color="#fff" />
                    <Text style={styles.helpText}>Help</Text>
                  </TouchableOpacity>
      <View style={styles.section}>
        <Text style={styles.heading}>Health Insurance</Text>
        <Text style={styles.info}>Health insurance helps cover the cost of medical expenses and provides financial protection.</Text>
        <Image source={require('../../../../../assets/images/HealthInsurance.jpg')} style={styles.image} />
        <TouchableOpacity onPress={() => handleKnowMore('Health Insurance')} style={styles.button}>
          <Text style={styles.buttonText}>Know More</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Accident Insurance</Text>
        <Text style={styles.info}>Accident insurance covers injuries and damages caused by accidents, offering financial assistance.</Text>
        <Image source={require('../../../../../assets/images/AccidentInsurance.jpg')} style={styles.image} />
        <TouchableOpacity onPress={() => handleKnowMore('Accident Insurance')} style={styles.button}>
          <Text style={styles.buttonText}>Know More</Text>
        </TouchableOpacity>
      </View>

      <View style={{...styles.section, marginBottom: 70}}>

        <Text style={styles.heading}>Medical Discount</Text>
        <Text style={styles.info}>Get discounts on medical services and healthcare products to make health management more affordable.</Text>
        <Image source={require('../../../../../assets/images/MedicineDiscount.jpg')} style={styles.image} />
        <TouchableOpacity onPress={() => handleKnowMore('Medical Discount')} style={styles.button}>
          <Text style={styles.buttonText}>Know More</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default Rewards

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    paddingTop: 30,
    
  },
  header: {
    height: 60,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingBottom: 15,
    paddingTop: 15,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 10,
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
    zIndex: 10,
  },
  helpText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 5,
  },
  section: {
    margin:20,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 5,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0F4A97',
    marginBottom: 12,
    marginTop: 20,
    textAlign: 'center',
    letterSpacing: 1.5,
  },
  info: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 12,
    paddingHorizontal: 20,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    marginBottom: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  button: {
    backgroundColor: '#0F4A97',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
    marginBottom: 20,
    alignSelf: 'center',
    marginTop: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
})
