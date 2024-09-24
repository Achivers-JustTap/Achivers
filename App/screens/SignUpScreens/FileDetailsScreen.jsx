import React from 'react';
import { View, Text, Image, StyleSheet, Alert,TouchableOpacity } from 'react-native';

const FileDetailsScreen = ({navigation ,route }) => {
  const { file } = route.params;

  const handleFileUpload = async () => {
    try {
      // Upload file to your backend or database
      const formData = new FormData();
      formData.append('file', {
        uri: file.uri,
        name: file.name,
        type: file.mimeType,
      });

      // Make an API call to upload the file (update the URL and API method accordingly)
      // const response = await fetch('https://your-api-url.com/upload', {
      //   method: 'POST',
      //   body: formData,
      // });

      Alert.alert('File Uploaded', 'Your file has been uploaded successfully.');
    } catch (error) {
      Alert.alert('Error', 'Failed to upload file.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>File Details</Text>

      <Text style={styles.label}>File Name: {file.name}</Text>
      <Text style={styles.label}>File Type: {file.mimeType}</Text>

      {file.mimeType.startsWith('image/') && (
        <Image source={{ uri: file.uri }} style={styles.imagePreview} />
      )}

      <TouchableOpacity style={styles.uploadButton} onPress={handleFileUpload}>
        <Text style={styles.buttonText}>Upload File</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  imagePreview: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  uploadButton: {
    backgroundColor: '#0F4A97',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '80%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FileDetailsScreen;
