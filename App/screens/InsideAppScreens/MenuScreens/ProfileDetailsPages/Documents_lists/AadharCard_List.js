import React, { useEffect } from 'react';
import { View, Text, Image, TextInput, StyleSheet } from 'react-native';

const AadharCard_List = ({ route, navigation }) => {
  useEffect(() => {
    navigation.setOptions({ title: 'My Aadhar' });
  }, [navigation]);

  const { aadharNumber, aadharFront, aadharBack, aadharFrontFile, aadharBackFile } = route.params;

  const displayAadharFront = aadharFront || (aadharFrontFile && aadharFrontFile.uri);
  const displayAadharBack = aadharBack || (aadharBackFile && aadharBackFile.uri);

  return (
    <View style={styles.container}>

      <Text style={styles.boxHeading}>Aadhar Number</Text>
      <TextInput
        style={styles.aadharNumber}
        value={aadharNumber || 'Not Available'}
        editable={false}
        selectTextOnFocus={false} 
      />

      <View style={styles.imageContainer}>
        {displayAadharFront ? (
          <View style={styles.imageWrapper}>
            <Text style={styles.imageLabel}>Aadhar Front</Text>
            <Image
              source={{ uri: displayAadharFront }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
        ) : (
          <Text>No Aadhar Front image available</Text>
        )}

        {displayAadharBack ? (
          <View style={styles.imageWrapper}>
            <Text style={styles.imageLabel}>Aadhar Back</Text>
            <Image
              source={{ uri: displayAadharBack }}
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
    marginBottom: 10,
  },
  aadharNumber: {
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
    width: 700,  
    height:200, 
    borderRadius: 0, 
    marginBottom: 10,
    resizeMode: 'cover',
  },
});

export default AadharCard_List;
