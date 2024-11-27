import React, { useEffect } from 'react';
import { View, Text, Image, TextInput, StyleSheet } from 'react-native';

const DriverLicence_list = ({ route, navigation }) => {
  useEffect(() => {
    navigation.setOptions({ title: 'My Driver Licence' });
  }, [navigation]);

  const { licenseNumber,validTillDate,licenseBack,licenseFront,licenseFrontFile,licenseBackFile } = route.params;

  const displayLicenceFront = licenseFront || (licenseFrontFile && licenseFrontFile.uri);
  const displayLicenceBack = licenseBack || (licenseBackFile  && licenseBackFile.uri);

  return (
    <View style={styles.container}>

      <Text style={styles.boxHeading}>DL Number</Text>
      <TextInput
        style={styles.licenceNumber}
        value={licenseNumber || 'Not Available'}
        editable={false}
        selectTextOnFocus={false} 
      />
       <Text style={styles.boxHeading}>Valid Till</Text>
      <TextInput
        style={styles.licenceNumber}
        value={validTillDate || 'Not Available'}
        editable={false}
        selectTextOnFocus={false} 
      />

      <View style={styles.imageContainer}>
        {displayLicenceFront ? (
          <View style={styles.imageWrapper}>
            <Text style={styles.imageLabel}>Driver Licence Front</Text>
            <Image
              source={{ uri: displayLicenceFront }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
        ) : (
          <Text>No Aadhar Front image available</Text>
        )}

        {displayLicenceBack ? (
          <View style={styles.imageWrapper}>
            <Text style={styles.imageLabel}>Driver Licence Back</Text>
            <Image
              source={{ uri: displayLicenceBack }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
        ) : (
          <Text>No Aadhar Back image available</Text>
        )}
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
});

export default DriverLicence_list;
