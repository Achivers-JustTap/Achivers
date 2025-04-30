import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setPanDetails } from '../../../../SignUpScreens/store_management/actions/documentActions'; 

const PanCard_List = ({ navigation }) => {
  const { pan } = useSelector(state => state.documents);
  const dispatch = useDispatch();
  const [isEditingPanNumber, setIsEditingPanNumber] = useState(false);
  const [panNumber, setPanNumber] = useState(pan.number || 'Not Available');
  const [panNumberError, setPanNumberError] = useState('');
  const [showSendButton, setShowSendButton] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    navigation.setOptions({ title: 'My PAN Card' });
  }, [navigation]);

  const handleSavePanNumber = () => {
    const regex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/; // PAN number format
    if (!regex.test(panNumber)) {
      setPanNumberError('Invalid PAN Number');
    } else {
      setPanNumberError('');
      setIsEditingPanNumber(false);
      setShowSendButton(true);
    }
  };

  const handleSendDetails = () => {
    setMessage('Your details were sent and you will be notified within 24 hours. Until then, you will not be able to take any rides.');
    setShowSendButton(false);
    dispatch(setPanDetails({ number: panNumber }));
  };

  const handleTakePanImage = () => {
    navigation.navigate('PanImageChange');
  };

  const handleUploadFromFiles = () => {
    navigation.navigate('PanFileChange');
  };

  return (
    <ScrollView style={styles.container}>
      {message ? <Text style={styles.successMessage}>{message}</Text> : null}

      {panNumberError ? <Text style={styles.errorMessage}>{panNumberError}</Text> : null}

      <Text style={styles.boxHeading}>PAN Number</Text>
      <View style={styles.editableContainer}>
        <TextInput
          style={[styles.panNumber, isEditingPanNumber && styles.editMode]}
          value={panNumber}
          onChangeText={setPanNumber}
          editable={isEditingPanNumber}
          selectTextOnFocus={true}
        />
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => {
            if (isEditingPanNumber) {
              handleSavePanNumber();
            } else {
              setIsEditingPanNumber(true);
            }
          }}
        >
          <Text style={styles.editButtonText}>
            {isEditingPanNumber ? 'Save' : 'Edit'}
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

      <Text style={styles.boxHeading}>PAN Images</Text>
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
          <Text>No Pan Front image available</Text>
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
          <Text>No Pan Back image available</Text>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleTakePanImage}
        >
          <Text style={styles.buttonText}>Take Pan Image</Text>
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
  panNumber: {
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

export default PanCard_List;
