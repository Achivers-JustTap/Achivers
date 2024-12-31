import React, { useEffect } from 'react';
import { View, Text, Image, TextInput, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const PanCard_List = ({ navigation }) => {
  const{pan} = useSelector(state=>state.documents)

  useEffect(() => {
    navigation.setOptions({ title: 'My PAN Card' });
  }, [navigation]);



  return (
    <View style={styles.container}>

      <Text style={styles.boxHeading}>PAN Number</Text>
      <TextInput
        style={styles.panNumber}
        value={pan.number || 'Not Available'}
        editable={false}
        selectTextOnFocus={false} 
      />

      <View style={styles.imageContainer}>
        {pan.frontImage ? (
          <View style={styles.imageWrapper}>
            <Text style={styles.imageLabel}>Pan Card Front</Text>
            <Image
              source={{ uri: pan.frontImage }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
        ) : (
          <Text>No pan Front image available</Text>
        )}

        {pan.backImage ? (
          <View style={styles.imageWrapper}>
            <Text style={styles.imageLabel}>Pan Card Back</Text>
            <Image
              source={{ uri: pan.backImage }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
        ) : (
          <Text>No pan Back image available</Text>
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
  panNumber: {
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

export default PanCard_List;
