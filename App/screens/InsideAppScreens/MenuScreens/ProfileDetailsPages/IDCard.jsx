import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import React, { useEffect } from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5'; 
import Ionicon from 'react-native-vector-icons/Ionicons';  
import { FlatList } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

const IDCard = ({navigation }) => {
  const {name,profilePicture,mobileNumber} = useSelector(state=>state.user)
  const {drivingLicense,} = useSelector(state => state.documents)
  useEffect(() => {
    navigation.setOptions({ title: "My ID" });
  }, [navigation]);

  const handleHelpPress = () => {
    navigation.navigate('Help');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View>
          <TouchableOpacity style={styles.helpButton} onPress={handleHelpPress}>
            <FontAwesomeIcon name="hands-helping" size={15} color="#fff" />
            <Text style={styles.help}>Help</Text>
          </TouchableOpacity>
        </View>
          
        <View style={styles.idcontainer}>
  
          <View style={styles.idheader}>
            <Text style={styles.idheaderText}>
              <Text style={styles.justTapText}>JUST TAP!</Text>
              {' '}ID
            </Text>
          </View>

          {profilePicture ? (
            <View style={styles.profileContainer}>
              <Image
                source={{ uri: profilePicture }} 
                style={styles.profileImage}
                onError={(error) => console.log('Error loading image: ', error)}
              />
            </View>
          ) : (
            <Text>No profile image available</Text>
          )}

          <Text style={styles.text}>{name}</Text>

          <View style={styles.detailsRow}>
            <View style={styles.detailColumn}>
              <Text style={styles.detailstext}>MOBILE NUMBER</Text>
              <Text style={styles.detailstextsub}>{mobileNumber}</Text>
            </View>
            <View style={styles.detailColumn}>
              <Text style={styles.detailstext}>ID</Text>
              <Text style={styles.detailstextsub}>JUSTAP12345</Text>
            </View>
          </View>

          <View style={styles.detailsRow}>
            <View style={styles.detailColumn}>
              <Text style={styles.detailstext}>LICENSE NUMBER</Text>
              <TextInput
                  style={styles.detailstextsub}
                  value={drivingLicense.number || 'Not Available'}
                  editable={false}
                  selectTextOnFocus={false} 
              /> 
            </View>
            <View style={styles.detailColumn}>
              <Text style={styles.detailstext}>LICENSE VALIDITY</Text>
              <TextInput
                  style={styles.detailstextsub}
                  value={drivingLicense.validDate || 'Not Available'}
                  editable={false}
                  selectTextOnFocus={false} 
              /> 
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  idcontainer: {
    backgroundColor: '#ffffff',  
    borderRadius: 15,           
    padding: 20,                 
    marginBottom: 20,            
    shadowColor: '#000',       
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,         
    shadowRadius: 10,          
    elevation: 5,   
    marginTop:80             
  },
  idheader: {
    width: '100%',
    height: 150,
    borderRadius: 20,
    backgroundColor: '#0F4A97',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20, 
  },
  
  idheaderText: {
    color: 'white',
    fontSize: 27,
    fontWeight: 'bold',
  },
  justTapText: {
    fontFamily: 'SofadiOne',
    fontSize: 30,
    color: 'white',
  },
  profileContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    top: -60,
    left: '5%',
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingLeft: 5,
    marginTop: -40,
    textAlign: 'left',
  },
  detailsRow: {
    flexDirection: 'row',
    marginTop: 40,
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  detailColumn: {
    alignItems: 'center',
  },
  detailstext: {
    color: "#737476",
    fontWeight: "bold",
    fontSize: 12,
  },
  detailstextsub: {
    color: "black",
    fontWeight: "bold",
    fontSize: 14,
    marginTop: 5,
  },
  helpButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#0F4A97',
    paddingVertical: 7,
    paddingHorizontal: 7,
    borderRadius: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  help: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  scrollContent: {
    paddingBottom: 100,
  },
});

export default IDCard;
