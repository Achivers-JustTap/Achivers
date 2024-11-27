import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';

const Documents = ({ route, navigation }) => {
  const {
    RC, rcFrontImage, rcBackImage, rcFrontFile, rcBackFile, panNumber, panFrontImage,
    panBackImage, panFrontFile, panBackFile, licenseFrontFile, licenseBackFile, licenseFront,
    licenseBack, licenseNumber, validTillDate, name, email, gender, dateOfBirth, phoneNumber,
    profileImageBase64, aadharNumber, aadharFront, aadharBack, aadharFrontFile, aadharBackFile
  } = route.params || {};

  useEffect(() => {
    navigation.setOptions({ title: 'My Documents' });
  }, [navigation]);

  const [formData, setFormData] = useState({
    name: name || '',
    mobileNumber: phoneNumber || '',
    email: email || '',
    dob: dateOfBirth || '',
    gender: gender || '',
    addresses: [],
    languages: [],
  });

  const [currentAddress, setCurrentAddress] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState('');

  const addAddress = () => {
    if (currentAddress.trim()) {
      setFormData((prev) => ({
        ...prev,
        addresses: [...prev.addresses, currentAddress],
      }));
      setCurrentAddress('');
    }
  };

  const addLanguage = () => {
    if (currentLanguage.trim()) {
      setFormData((prev) => ({
        ...prev,
        languages: [...prev.languages, currentLanguage],
      }));
      setCurrentLanguage('');
    }
  };

  const document_list = [
    {
      id: '1',
      Title: 'Driver Licence',
      route: 'DriverLicence_list',
      params: {
        licenseNumber,
        validTillDate,
        licenseBack, licenseFront, licenseFrontFile, licenseBackFile
      },
    },
    {
      id: '2',
      Title: 'RC',
      route: 'RC_List',
      params: { RC, rcFrontImage, rcBackImage, rcFrontFile, rcBackFile },
    },
    {
      id: '3',
      Title: 'Aadhar Card',
      route: 'AadharCard_List',
      params: {
        aadharNumber,
        aadharFront,
        aadharBack,
        aadharFrontFile,
        aadharBackFile,
      },
    },
    {
      id: '4',
      Title: 'PAN Card',
      route: 'PanCard_List',
      params: { panNumber, panFrontImage, panBackImage, panFrontFile, panBackFile },
    },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate(item.route, item.params)}
    >
      <View style={styles.itemContent}>
        <Text style={styles.title}>{item.Title}</Text>
        <Text style={styles.arrow}>{'>'}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollView}>
      <FlatList
        data={document_list}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.form}>
        <Text style={styles.formTitle}>Personal Information</Text>
        <Text style={styles.sectionTitle}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={formData.name}
          editable={false}
        />
        <Text style={styles.sectionTitle}>Mobile Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Mobile Number"
          value={formData.mobileNumber}
          keyboardType="phone-pad"
          editable={false}
        />
        <Text style={styles.sectionTitle}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={formData.email}
          editable={false}
        />
        <Text style={styles.sectionTitle}>Gender</Text>
        <TextInput
          style={styles.input}
          placeholder="Gender"
          value={formData.gender}
          editable={false}
        />
        <Text style={styles.sectionTitle}>Date of Birth</Text>
        <TextInput
          style={styles.input}
          placeholder="Date of Birth (DD/MM/YYYY)"
          value={formData.dob}
          editable={false}
        />
        <Text style={styles.sectionTitle}>Address</Text>
        {formData.addresses.map((address, index) => (
          <Text key={index} style={styles.itemText}>
            {address}
          </Text>
        ))}
        <TextInput
          style={styles.input}
          placeholder="Add Address"
          value={currentAddress}
          onChangeText={setCurrentAddress}
        />
        <TouchableOpacity style={styles.addButton} onPress={addAddress}>
          <Text style={styles.addButtonText}>Add Address</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Languages Spoken</Text>
        {formData.languages.map((language, index) => (
          <Text key={index} style={styles.itemText}>
            {language}
          </Text>
        ))}
        <TextInput
          style={styles.input}
          placeholder="Add Language"
          value={currentLanguage}
          onChangeText={setCurrentLanguage}
        />
        <TouchableOpacity style={styles.addButton} onPress={addLanguage}>
          <Text style={styles.addButtonText}>Add Language</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    paddingBottom: 100,
  },
  item: {
    backgroundColor: '#0F4A97',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 12,
  },
  itemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  arrow: {
    fontSize: 24,
    color: 'white',
  },
  form: {
    margin: 10,
    borderColor: '#0F4A97',
    borderWidth: 1,
    borderRadius: 5,
    padding: 20,
    paddingHorizontal: 16,
  },
  formTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#0F4A97',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#eaf0fa',
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 16,
    paddingLeft: 10,
    marginBottom: 20,
    color: 'black',
    backgroundColor:"#eaf0fa"
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  itemText: {
    fontSize: 16,
    color: '#34495e',
    marginBottom: 5,
  },
  addButton: {
    backgroundColor: '#0F4A97',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Documents;
