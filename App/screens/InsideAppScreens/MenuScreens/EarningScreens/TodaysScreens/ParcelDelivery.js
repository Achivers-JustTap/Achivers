import { StyleSheet, Text, View,TouchableOpacity, ScrollView} from 'react-native'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import React from 'react'

const ParcelDelivery = () => {
    return (
        <ScrollView style={styles.container}>
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
      
        </ScrollView>
      );

}

const styles = StyleSheet.create({
  
    container: {
        flex: 1,
        margin: 10,
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
  
export default ParcelDelivery;

