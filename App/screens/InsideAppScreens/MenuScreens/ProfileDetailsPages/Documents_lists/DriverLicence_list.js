import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useSelector } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';

const DriverLicence_list = ({ route, navigation }) => {
  const { drivingLicense } = useSelector((state) => state.documents);
  const [isEditingDLNumber, setIsEditingDLNumber] = useState(false);
  const [isEditingValidTill, setIsEditingValidTill] = useState(false);
  const [dlNumber, setDlNumber] = useState(drivingLicense.number || 'Not Available');
  const [validTill, setValidTill] = useState(drivingLicense.validDate || getCurrentDate());
  const [showSendButton, setShowSendButton] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [message, setMessage] = useState('');

  const [dlNumberError, setDlNumberError] = useState('');

  useEffect(() => {
    navigation.setOptions({ title: 'My Driver Licence' });
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
  

  const handleTakeLicenseImage = () => {
    navigation.navigate('LicenseImageChange', {
      dlNumber,
      validTill,
    });
  };
  
  const handleUploadFromFiles = () => {
    navigation.navigate('LicenseFileChange', {
      dlNumber,
      validTill,
    });
  };
  
  useEffect(() => {
    if (route.params?.licenseFrontFile && route.params?.licenseBackFile) {
      setMessage(route.params.uploadSuccess ? 'Files uploaded successfully!' : '');
      setShowSendButton(true);
  
      dispatch(
        setDrivingLicenseDetails({
          ...drivingLicense,
          frontImage: route.params.licenseFrontFile.uri,
          backImage: route.params.licenseBackFile.uri,
        })
      );
    }
  }, [route.params]);
  

  const handleSendDetails = () => {
    setMessage('Your details were sent and you will be notified within 24 hours. Until then, you will not be able to take any rides.');
    setShowSendButton(false);
  };

  const handleSaveDLNumber = () => {
    const regex = /^[A-Z]{2}[0-9]{1}[0-9]{13}$/;
    if (!regex.test(dlNumber)) {
      setDlNumberError('Invalid Driver Licence Number');
    } else {
      setDlNumberError('');
      setIsEditingDLNumber(false);
      setShowSendButton(true);
    }
  };
  
  const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = formatDate(selectedDate);
      setValidTill(formattedDate);
      setShowSendButton(true);
    }
  };
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <ScrollView style={styles.container}>
      {message ? <Text style={styles.errorMessage}>{message}</Text> : null}
      {dlNumberError ? <Text style={styles.errorMessage}>{dlNumberError}</Text> : null}

      <Text style={styles.boxHeading}>DL Number</Text>
      <View style={styles.editableContainer}>
        <TextInput
          style={[styles.licenceNumber, isEditingDLNumber && styles.editMode]}
          value={dlNumber}
          onChangeText={setDlNumber}
          editable={isEditingDLNumber}
        />
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => {
            if (isEditingDLNumber) {
              handleSaveDLNumber();
            } else {
              setIsEditingDLNumber(true);
            }
          }}
        >
          <Text style={styles.editButtonText}>
            {isEditingDLNumber ? 'Save' : 'Edit'}
          </Text>
        </TouchableOpacity>
      </View>
     

      
      <Text style={styles.boxHeading}>Valid Till</Text>
      <View style={styles.editableContainer}>
        <TextInput
          style={[styles.licenceNumber, isEditingValidTill && styles.editMode]}
          value={validTill}
          editable={false} // Make TextInput non-editable
        />
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      {showSendButton && (
        <TouchableOpacity
          style={styles.sendButton}
          onPress={handleSendDetails}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      )}

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
          <Text>No Driving license Back image available</Text>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleTakeLicenseImage}
        >
          <Text style={styles.buttonText}>Take Driving License Image</Text>
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
  licenceNumber: {
    height: 40,
    width: '80%',
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
    marginBottom: 20,
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

export default DriverLicence_list;
