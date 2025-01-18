import React, { useEffect } from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

const DriverLicence_list = ({ route, navigation }) => {
  const {drivingLicense} = useSelector(state=>state.documents);

  useEffect(() => {
    navigation.setOptions({ title: 'My Driver Licence' });
  }, [navigation]);

   const handleTakeLicenseImage = () => {
      const validationError = validateLicenseNumber();
      if (validationError) {
        Alert.alert('Error', validationError);
        return;
      }
      navigation.navigate('LicenseImageChange');
    };
  

    const handleUploadFromFiles = () => {
      const validationError = validateLicenseNumber();
      if (validationError) {
        Alert.alert('Error', validationError);
        return;
      }
      navigation.navigate('LicenseFileChange');
    };



  return (
    <View style={styles.container}>

      <Text style={styles.boxHeading}>DL Number</Text>
      <TextInput
        style={styles.licenceNumber}
        value={drivingLicense.number || 'Not Available'}
        editable={false}
        selectTextOnFocus={false} 
      />
       <Text style={styles.boxHeading}>Valid Till</Text>
      <TextInput
        style={styles.licenceNumber}
        value={drivingLicense.validDate || 'Not Available'}
        editable={false}
        selectTextOnFocus={false} 
      />

      <View style={styles.imageContainer}>
        {drivingLicense.frontImage ? (
          <View style={styles.imageWrapper}>
            <Text style={styles.imageLabel}>Driver Licence Front</Text>
            <Image
              source={{ uri: drivingLicense.frontImage }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
        ) : (
          <Text>No Driving license Front image available</Text>
        )}

        {drivingLicense.backImage ? (
          <View style={styles.imageWrapper}>
            <Text style={styles.imageLabel}>Driver Licence Back</Text>
            <Image
              source={{ uri: drivingLicense.backImage }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
        ) : (
          <Text>No Aadhar Back image available</Text>
        )}
      </View>
      <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleTakeLicenseImage}>
                <Text style={styles.buttonText}>Take Driving License Image</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={handleUploadFromFiles}>
                <Text style={styles.buttonText}>Upload from Files</Text>
              </TouchableOpacity>
            </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor:'white'
  },
  boxHeading: {
    fontSize: 18,
    textAlign: "left",
    fontWeight: 'bold',
  },
  licenceNumber: {
    height: 40,
    width: '100%',
    borderColor: '#eaf0fa',
    backgroundColor:'#eaf0fa',
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 16,
    paddingLeft: 10,
    marginBottom: 20,
    color: 'black',
  },
  imageContainer: {
    alignItems: 'center',
  },
  imageWrapper: {
    marginBottom: 20,
    alignItems: 'center',
  },
  imageLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: 500,  
    height:200, 
    borderRadius: 0, 
    marginBottom: 10,
    resizeMode: 'cover',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginTop: 30, 
  },
  button: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    flex: 1,
    marginBottom: 30,
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default DriverLicence_list;
