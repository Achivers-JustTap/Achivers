import React, { useEffect } from 'react';
import { View, Text, Image, TextInput, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const AadharCard_List = ({ navigation }) => {
  const {aadhar} = useSelector(state=>state.documents);
  useEffect(() => {
    navigation.setOptions({ title: 'My Aadhar' });
  }, [navigation]);



  return (
    <View style={styles.container}>

      <Text style={styles.boxHeading}>Aadhar Number</Text>
      <TextInput
        style={styles.aadharNumber}
        value={aadhar.number || 'Not Available'}
        editable={false}
        selectTextOnFocus={false} 
      />

      <View style={styles.imageContainer}>
        {aadhar.frontImage ? (
          <View style={styles.imageWrapper}>
            <Text style={styles.imageLabel}>Aadhar Front</Text>
            <Image
              source={{ uri: aadhar.frontImage }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
        ) : (
          <Text>No Aadhar Front image available</Text>
        )}

        {aadhar.backImage ? (
          <View style={styles.imageWrapper}>
            <Text style={styles.imageLabel}>Aadhar Back</Text>
            <Image
              source={{ uri: aadhar.backImage }}
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
