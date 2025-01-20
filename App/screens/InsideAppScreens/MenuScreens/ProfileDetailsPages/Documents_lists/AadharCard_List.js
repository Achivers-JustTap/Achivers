import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setAadharDetails } from '../../../../SignUpScreens/store_management/actions/documentActions'; 

const AadharCard_List = ({ navigation }) => {
  const { aadhar } = useSelector(state => state.documents);
  const dispatch = useDispatch();
  const [isEditingAadharNumber, setIsEditingAadharNumber] = useState(false);
  const [aadharNumber, setAadharNumber] = useState(aadhar.number || 'Not Available');
  const [aadharNumberError, setAadharNumberError] = useState('');
  const [showSendButton, setShowSendButton] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    navigation.setOptions({ title: 'My Aadhar' });
  }, [navigation]);

  const handleSaveAadharNumber = () => {
    const regex =/^\d{12}$/; 
    if (!regex.test(aadharNumber)) {
      setAadharNumberError('Invalid Aadhar Number');
    } else {
      setAadharNumberError('');
      setIsEditingAadharNumber(false);
      setShowSendButton(true);
    }
  };

  const handleSendDetails = () => {
    setMessage('Your details were sent and you will be notified within 24 hours. Until then, you will not be able to take any rides.');
    setShowSendButton(false);
    dispatch(setAadharDetails({ number: aadharNumber })); 
  };

  const handleTakeAadharImage = () => {
    navigation.navigate('AadharImageChange');
  };

  const handleUploadFromFiles = () => {
    navigation.navigate('AadharFileChange');
  };


  return (
    <ScrollView style={styles.container}>
      {message ? <Text style={styles.successMessage}>{message}</Text> : null}

      {aadharNumberError ? <Text style={styles.errorMessage}>{aadharNumberError}</Text> : null}

      <Text style={styles.boxHeading}>Aadhar Number</Text>
      <View style={styles.editableContainer}>
        <TextInput
          style={[styles.aadharNumber, isEditingAadharNumber && styles.editMode]}
          value={aadharNumber}
          onChangeText={setAadharNumber}
          editable={isEditingAadharNumber}
          selectTextOnFocus={true}
        />
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => {
            if (isEditingAadharNumber) {
              handleSaveAadharNumber();
            } else {
              setIsEditingAadharNumber(true);
            }
          }}
        >
          <Text style={styles.editButtonText}>
            {isEditingAadharNumber ? 'Save' : 'Edit'}
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

      <Text style={styles.boxHeading}>Aadhar Images</Text>
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
      <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={handleTakeAadharImage}
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
  successMessage: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
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
    marginBottom: 10,
  },
  aadharNumber: {
    height: 40,
    width: '80%',
    borderColor: '#eaf0fa',
    backgroundColor: '#eaf0fa',
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 16,
    paddingLeft: 10,
    marginBottom: 20,
    color: 'black',
  },
  editMode: {
    backgroundColor: '#fff4c9',
  },
  editableContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    
  },
  editButton: {
    marginTop: -20,
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
    width: 700,
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

export default AadharCard_List;
