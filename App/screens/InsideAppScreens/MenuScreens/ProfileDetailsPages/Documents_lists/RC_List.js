import React, { useEffect } from 'react';
import { View, Text, Image, TextInput, StyleSheet } from 'react-native';

const RC_List = ({ route, navigation }) => {
  useEffect(() => {
    navigation.setOptions({ title: 'My PAN Card' });
  }, [navigation]);

  const { RC,rcFrontImage,rcBackImage,rcFrontFile,rcBackFile  } = route.params;

  const displayRCFront = rcFrontImage || (rcFrontFile && rcFrontFile.uri);
  const displayRCBack = rcBackImage || (rcBackFile && rcBackFile.uri);

  return (
    <View style={styles.container}>

      <Text style={styles.boxHeading}>Vehcile Number</Text>
      <TextInput
        style={styles.rcNumber}
        value={RC || 'Not Available'}
        editable={false}
        selectTextOnFocus={false} 
      />

      <View style={styles.imageContainer}>
        {displayRCFront ? (
          <View style={styles.imageWrapper}>
            <Text style={styles.imageLabel}>RC Front</Text>
            <Image
              source={{ uri: displayRCFront }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
        ) : (
          <Text>No pan Front image available</Text>
        )}

        {displayRCBack ? (
          <View style={styles.imageWrapper}>
            <Text style={styles.imageLabel}>RC Back</Text>
            <Image
              source={{ uri: displayRCBack }}
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
  rcNumber: {
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

export default RC_List;
