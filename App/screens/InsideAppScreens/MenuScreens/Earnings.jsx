import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import EarningsLayout from '../../../../components/EarningsLayout';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';

const Earnings = ({ navigation, route }) => {
  const [activeTab, setActiveTab] = useState('Today');
  const [selectedCategory, setSelectedCategory] = useState('All'); 
  const [selectedVehicleType, setSelectedVehicleType] = useState(route.params?.selectedVehicleName || 'Moto'); 

  const vehicleAltImage = route.params?.vehicleAltImage;
  const { RC, rcFrontImage, rcBackImage, rcFrontFile, selectedVehicleType: selectedVehicleName , rcBackFile, panNumber, panFrontImage, panBackImage, panFrontFile, panBackFile, licenseFrontFile, licenseBackFile, licenseFront, licenseBack, licenseNumber, validTillDate, name, email, gender, dateOfBirth, phoneNumber, profileImageBase64, aadharNumber, aadharFront, aadharBack, aadharFrontFile, aadharBackFile } = route.params;

  useEffect(() => {
    if (route.params?.vehicleType) {
      setSelectedVehicleType(route.params.vehicleType); 
    }
  }, [route.params]);

  const handleTabPress = (tab) => {
    setActiveTab(tab);
  };

  const renderCategoryContent = () => {
    
  switch (selectedCategory) {
    case 'Bike Taxi':
      return (
        <View>
         
        </View>
      );
    case 'Parcel Delivery':
      return (
        <View>
          
        </View>
      );
    case 'Grocery Delivery':
      return (
        <View>
         
        </View>
      );
    case 'Auto Ride':
      return (
        <View>
          
        </View>
      );
    case 'Cab Ride':
      return (
        <View>
          
        </View>
      );
    case 'All':
    default:
      return (
        <View>
          <View>
           <TouchableOpacity onPress={() => console.log('bounus mounted')} style={styles.box2WithShadow}>
              <Text style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 16 }}>Incentives and Bounuses</Text>
              <Text style={{ fontWeight: 'bold', textAlign: 'center', right:20,fontSize: 20,position:'absolute' }}>
                <FontAwesomeIcon name="angle-down" size={20} color="black" />
                </Text>
            </TouchableOpacity>
          </View>
       <TouchableOpacity onPress={() => console.log('completed orders page mounted')} style={styles.box4WithShadow}> 
       <View style={styles.row}>
          <Text style={styles.boldText}>0</Text>
          <Text style={{ fontSize: 15,padding:7, color: 'green',}}>Completed Orders</Text>
          <View style={styles.ratingContainer}>
            <FontAwesomeIcon name="star" size={18} color="gold" />
            <Text style={styles.text}>0.0</Text>
            <Text style={styles.text}>₹ 0.0</Text>
          </View>
       </View>
        <View style={styles.row}>
          <View style={styles.item}>
            <Text style={styles.heading}>Total KM</Text>
            <Text style={styles.value}>0.0 km</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.heading}>Order + Extra Earnings</Text>
            <Text style={styles.value}>₹ 0.00</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.heading}>Penalty</Text>
            <Text style={styles.value}>₹ 0</Text>
            
          </View>
          <FontAwesomeIcon name="angle-right" size={18} color="#000" />
        </View>
       </TouchableOpacity>
       <TouchableOpacity onPress={() => console.log('missed orders page mounted')} style={styles.box5WithShadow}> 
       <View style={styles.row}>
          <Text style={styles.boldText}>0</Text>
          <Text style={{ fontSize: 15,padding:7, color: 'red',}}>Missed Orders</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.text}>₹ 0.0</Text>
          </View>
       </View>
        <View style={styles.row}>
          <View style={styles.item}>
            <Text style={styles.heading}>Adjustments</Text>
            <Text style={styles.value}>₹ 0.0</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.heading}>Penalty</Text>
            <Text style={styles.value}>₹ 0.0</Text>
            
          </View>
          <FontAwesomeIcon name="angle-right" size={18} color="#000" />
        </View>
       </TouchableOpacity>
      
        </View>
      );
  }
  };

  const renderNavigationBar = () => {
    let categories = [];
    
    if (selectedVehicleType === 'Moto') {
      categories = ['All', 'Bike Taxi', 'Parcel Delivery', 'Grocery Delivery']; 
    } else if (selectedVehicleType === 'Auto') {
      categories = ['All', 'Auto Ride']; 
    } else if (selectedVehicleType === 'Car') {
      categories = ['All', 'Cab Ride']; 
    } else {
      categories = ['All'];
    }

    return (
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.navigationBar}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[styles.navButton, selectedCategory === category && styles.selectedNavButton]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={[styles.navButtonText, selectedCategory === category && styles.selectedNavButtonText]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Wallet':
        return (
          <View style={styles.content}>
            <Text>Wallet Content</Text>
          </View>
        );
      case 'History':
        return (
          <View style={styles.content}>
            <Text>History Content</Text>
          </View>
        );
      case 'Today':
      default:
        return (
          <ScrollView style={styles.container}>
            <View style={styles.boxWithShadow}>
              <View style={styles.headerBox}>
                <Text style={styles.headerText}>₹ 0.0</Text>
                <Text style={styles.subHeaderText}>
                  Today's Earnings <FontAwesomeIcon name="arrow-right" size={13} color="white" />
                </Text>
              </View>
              <View style={styles.line} />
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                <Text style={styles.footerText}>Cash Collected</Text>
                <Text style={styles.footerText}>₹ 0.0</Text>
              </View>
            </View>

            <TouchableOpacity onPress={() => console.log('Rate Card mouted')} style={styles.box2WithShadow}>
              <Image source={require('../../../../assets/images/rupee.png')} style={styles.image} />
              <Text style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 20 }}>Rate Card</Text>
              <Text style={{ fontWeight: 'bold', fontSize: 20, right: 10, top: 'auto', position: 'absolute' }}>{'>'}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => console.log('know more')} style={styles.box3WithShadow}>
              <Image source={require('../../../../assets/images/silver-star.png')} style={styles.image2} />
              <Text
                style={{
                  fontWeight: 'bold',
                  padding: 1,
                  backgroundColor: '#0F4A97',
                  color: 'white',
                  left: 10,
                  textAlign: 'center',
                  position: 'absolute',
                }}
              >
                Guidelines for doing Orders
              </Text>
              <Text
                style={{
                  fontWeight: 'bold',
                  padding: 1,
                  color: 'gold',
                  right: 10,
                  backgroundColor: '#0F4A97',
                  top: 'auto',
                  position: 'absolute',
                }}
              >
                Know More
              </Text>
            </TouchableOpacity>
            <View style={{height: 1.5,
                          backgroundColor: '#466b9b',
                          marginBottom:5,
                          marginVertical:20,}} />
            <Text style={{fontWeight:'bold', textAlign:'center',fontSize: 20,color:'#0F4A97',marginBottom:5}}>Earning Details</Text>
            {renderNavigationBar()}
            
            <View style={styles.categoryContent}>{renderCategoryContent()}</View>
          </ScrollView>
        );
    }
  };

  return (
    <EarningsLayout navigation={navigation} activeTab={activeTab} onTabPress={handleTabPress}>
      {renderContent()}
    </EarningsLayout>
  );
};

const styles = StyleSheet.create({
  
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  boxWithShadow: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#0F4A97',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 8,
  },
  headerBox: {
    backgroundColor: '#0F4A97',
    borderRadius: 5,
    padding: 40,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subHeaderText: {
    fontSize: 14,
    color: '#fff',
    marginTop: 4,
    padding: 5,
  },
  line: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 8,
  },
  footerText: {
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#4471ab',
  },
  box2WithShadow: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#0F4A97',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 40,
    height: 40,
    margin: 5,
  },
  box3WithShadow: {
    backgroundColor: '#0F4A97',
    borderRadius: 10,
    shadowColor: '#0F4A97',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  image2: {
    width: '100%',
    height: 50,
  },
  navigationBar: {
    flexDirection: 'row',
    paddingVertical: 10, 
    paddingHorizontal: 5,
    borderRadius: 20,
    backgroundColor: '#0F4A97',
  },
  categoryContent: {
    marginTop: 0, 
    paddingTop: 10, 
  },
  navButton: {
    paddingVertical: 8, 
    paddingHorizontal: 10, 
    marginRight: 10,
    borderRadius: 5,
    backgroundColor: '#0F4A97',
  },
  selectedNavButton: {
    backgroundColor: '#0cdfdf', 
    borderRadius: 15,
  },
  navButtonText: {
    color: '#fff', 
    fontSize: 14, 
    fontWeight: 'bold', 
  },
  selectedNavButtonText: {
    color: '#0F4A97',
    fontWeight: 'bold',
  },
 
  categoryText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
  box4WithShadow:{
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#0F4A97',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 8,
    padding:15,
    marginBottom:20
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  boldText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  text: {
    fontSize: 13,
    padding:7,
    color: '#555',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    alignItems: 'center',
  },
  heading: {
    fontSize: 12,
    padding: 5,
    fontWeight: 'bold',
    color: '#000',
  },
  value: {
    fontSize: 12,
    color: '#333',
  },
  box5WithShadow:{
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#0F4A97',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 8,
    padding:15,
    marginBottom:100,
  },
});

export default Earnings;
