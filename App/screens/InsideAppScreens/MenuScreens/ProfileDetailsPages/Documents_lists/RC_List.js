import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';

const RC_List = ({ route, navigation }) => {
  const { rc } = useSelector(state => state.documents);
  const [isEditingRCNumber, setIsEditingRCNumber] = useState(false);
  const [rcNumber, setRcNumber] = useState(rc.number || 'Not Available');
  const [rcNumberError, setRcNumberError] = useState('');
    const [showSendButton, setShowSendButton] = useState(false);
  
    const [message, setMessage] = useState('');

  useEffect(() => {
    navigation.setOptions({ title: 'My RC' });
  }, [navigation]);

  useEffect(() => {
      if (route.params?.frontImage && route.params?.backImage) {
        setMessage(route.params.successMessage || '');
        dispatch(setDrivingLicenseDetails({
          ...drivingLicense,
          frontImage: route.params.frontImage,
          backImage: route.params.backImage,
        }));
      }
    }, [route.params]);

  const handleSaveRCNumber = () => {
    const regex = /^[A-Za-z]{2}\d{2}[A-Za-z]{2}\d{4}$/;
    if (!regex.test(rcNumber)) {
      setRcNumberError('Invalid RC Number');
    } else {
      setRcNumberError('');
      setIsEditingRCNumber(false);
      setShowSendButton(true);
    }
  };

  const handleSendDetails = () => {
    setMessage('Your details were sent and you will be notified within 24 hours. Until then, you will not be able to take any rides.');
    setShowSendButton(false);
  };

  const handleTakeRCImage = () => {
    navigation.navigate('RCImageChange');
  };

  const handleUploadFromFiles = () => {
    navigation.navigate('RCFileChange');
  };

  return (
    <ScrollView style={styles.container}>
            {message ? <Text style={styles.errorMessage}>{message}</Text> : null}
      
      {rcNumberError ? <Text style={styles.errorMessage}>{rcNumberError}</Text> : null}

      <Text style={styles.boxHeading}>Vehicle Number</Text>
      <View style={styles.editableContainer}>
        <TextInput
          style={[styles.rcNumber, isEditingRCNumber && styles.editMode]}
          value={rcNumber}
          onChangeText={setRcNumber}
          editable={isEditingRCNumber}
        />
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => {
            if (isEditingRCNumber) {
              handleSaveRCNumber();
            } else {
              setIsEditingRCNumber(true);
            }
          }}
        >
          <Text style={styles.editButtonText}>
            {isEditingRCNumber ? 'Save' : 'Edit'}
          </Text>
        </TouchableOpacity>
      </View>

        {showSendButton && (
              <TouchableOpacity
                style={styles.sendButton}
                onPress={handleSendDetails}
              >
                <Text style={styles.sendButtonText}>Send</Text>
              </TouchableOpacity>
            )}

      <Text style={styles.boxHeading}>RC Images</Text>
      <View style={styles.imageContainer}>
        {rc.frontImage ? (
          <View style={styles.imageWrapper}>
            <Text style={styles.imageLabel}>RC Front</Text>
            <Image
              source={{ uri: rc.frontImage }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
        ) : (
          <Text>No RC Front image available</Text>
        )}

        {rc.backImage ? (
          <View style={styles.imageWrapper}>
            <Text style={styles.imageLabel}>RC Back</Text>
            <Image
              source={{ uri: rc.backImage }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
        ) : (
          <Text>No RC Back image available</Text>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleTakeRCImage}
        >
          <Text style={styles.buttonText}>Take RC Image</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={handleUploadFromFiles}
        >
          <Text style={styles.buttonText}>Upload from Files</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  errorMessage: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
  boxHeading: {
    fontSize: 18,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  rcNumber: {
    height: 40,
    flex: 1, // changed from width: '80%'
    borderColor: '#eaf0fa',
    backgroundColor: '#eaf0fa',
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 16,
    paddingLeft: 10,
    color: 'black',
  },

  
  editMode: {
    backgroundColor: '#fff4c9',
  },
  editableContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10, // Optional: if supported
    marginVertical: 10,
  },
  editButton: {
    marginLeft: 10,
    backgroundColor: '#007bff',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  editButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  sendButton: {
    marginTop: 20,
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 8,
  },
  sendButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
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
    height: 200,
    borderRadius: 0,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 30,
  },
  button: {
    backgroundColor: '#0F4A97',
    padding: 15,
    borderRadius: 8,
    flex: 1,
    marginBottom: 30,
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default RC_List;
