import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5'; 
import Ionicon from 'react-native-vector-icons/Ionicons';  

const ProfiledetailsPage = ({ route, navigation }) => {
  const {RC,rcFrontImage,rcBackImage,rcFrontFile,rcBackFile,panNumber , panFrontImage,panBackImage,panFrontFile,panBackFile,licenseFrontFile,licenseBackFile,licenseFront,licenseBack,licenseNumber, validTillDate, name,email,gender,dateOfBirth,phoneNumber,profileImageBase64,aadharNumber,aadharFront,aadharBack,aadharFrontFile,aadharBackFile } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: "My Profile" });
  }, [navigation]);

  const handleHelpPress = () => {
    navigation.navigate('Help');
  };

  const handleLogout = () => {
    navigation.navigate('WelcomeScreen');
    console.log('Logging out...');
  };

  const handleDeleteAccount = () => {
    navigation.navigate('WelcomeScreen');
    console.log('Deleting account...');
  };

  const Items = [
    { id: '1', title: 'Best Performance', route: 'BestPerformance', icon: 'tachometer-alt', iconLibrary: 'FontAwesome5',params:{RC,rcFrontImage,rcBackImage,rcFrontFile,rcBackFile,panNumber , panFrontImage,panBackImage,panFrontFile,panBackFile,licenseFrontFile,licenseBackFile,licenseFront,licenseBack,licenseNumber, validTillDate, name,email,gender,dateOfBirth,phoneNumber,profileImageBase64,aadharNumber,aadharFront,aadharBack,aadharFrontFile,aadharBackFile} },
    { id: '2', title: 'Id Card', route: 'IDCard', icon: 'id-card', iconLibrary: 'FontAwesome5',params:{RC,rcFrontImage,rcBackImage,rcFrontFile,rcBackFile,panNumber , panFrontImage,panBackImage,panFrontFile,panBackFile,licenseFrontFile,licenseBackFile,licenseFront,licenseBack,licenseNumber, validTillDate, name,email,gender,dateOfBirth,phoneNumber,profileImageBase64,aadharNumber,aadharFront,aadharBack,aadharFrontFile,aadharBackFile }  },
    { id: '3', title: 'Documents', route: 'Documents', icon: 'document', iconLibrary: 'Ionicons',params:{RC,rcFrontImage,rcBackImage,rcFrontFile,rcBackFile,panNumber , panFrontImage,panBackImage,panFrontFile,panBackFile,licenseFrontFile,licenseBackFile,licenseFront,licenseBack,licenseNumber, validTillDate, name,email,gender,dateOfBirth,phoneNumber,profileImageBase64,aadharNumber,aadharFront,aadharBack,aadharFrontFile,aadharBackFile}  },
    { id: '4', title: 'Language Settings', route: 'LanguageSettings', icon: 'language', iconLibrary: 'Ionicons',params:{RC,rcFrontImage,rcBackImage,rcFrontFile,rcBackFile,panNumber , panFrontImage,panBackImage,panFrontFile,panBackFile,licenseFrontFile,licenseBackFile,licenseFront,licenseBack,licenseNumber, validTillDate, name,email,gender,dateOfBirth,phoneNumber,profileImageBase64,aadharNumber,aadharFront,aadharBack,aadharFrontFile,aadharBackFile}  },
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View>
          <Image
            source={require('./../../../assets/images/profileBackground.jpg')}
            style={styles.bgimage}
          />

          <TouchableOpacity style={styles.helpButton} onPress={handleHelpPress}>
            <FontAwesomeIcon name="hands-helping" size={15} color="#fff" />
            <Text style={styles.help}>Help</Text>
          </TouchableOpacity>

          {profileImageBase64 ? (
            <View style={styles.profileContainer}>
              <Image
                source={{ uri: profileImageBase64 }} 
                style={styles.profileImage}
                onError={(error) => console.log('Error loading image: ', error)}
              />
            </View>
          ) : (
            <Text>No profile image available</Text>
          )}
        </View>

        <Text style={styles.text}>{name}</Text>

        <View style={styles.profileDetails}>
          <View style={styles.profileDetailItem}>
            <FontAwesomeIcon name="star" size={20} color="#FFD700" />
            <Text style={styles.profileDetailText}>0.0</Text>
          </View>

          <View style={styles.profileDetailItem}>
            <Text style={styles.profiledetails}>0</Text>
            <Text style={styles.profileDetailText}>Orders</Text>
          </View>

          <View style={styles.profileDetailItem}>
            <Text style={styles.profiledetails}>0</Text>
            <Text style={styles.profileDetailText}>Months</Text>
          </View>
        </View>

        <FlatList
          data={Items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate(item.route, item.params)}>
              <View style={styles.listItem}>
                {item.iconLibrary === 'FontAwesome5' ? (
                  <FontAwesomeIcon name={item.icon} size={20} color="white" style={styles.icon} />
                ) : (
                  <Ionicon name={item.icon} size={20} color="white" style={styles.icon} />
                )}
                <Text style={styles.listItemText}>{item.title}</Text>
                <Text style={styles.arrow}> {'>'} </Text>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.listContainer}
        />

        
      <View style={styles.bottomButtonsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleDeleteAccount}>
          <Text style={styles.buttonText}>Delete Account</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>

    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
  },
  bgimage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  profileContainer: {
    width: 100,
    height: 100,
    marginTop: 100,
    borderRadius: 50,
    top: '25%',
    left: '36%',
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#0F4A97',
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
    marginTop: 80,
    textAlign: 'center',
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
  profileDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 3,
  },
  profileDetailItem: {
    alignItems: 'center',
    flex: 1,
  },
  profiledetails: {
    fontSize: 16,
  },
  profileDetailText: {
    marginTop: 2,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F4A97',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  listItem: {
    paddingVertical: 15, 
    backgroundColor: '#0F4A97',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', 
    borderRadius: 8,
    marginBottom: 10,
  },
  listItemText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    flex: 1, 
  },
  icon: {
    paddingLeft:10,
    marginRight: 10, 
  },
  arrow: {
    paddingRight:10,
    fontSize: 20,
    color: 'white',
  },
  bottomButtonsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20, 
  },
  button: {
    backgroundColor: '#cccccc',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#b30000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollContent: {
    paddingBottom: 100,
  },

});

export default ProfiledetailsPage;
