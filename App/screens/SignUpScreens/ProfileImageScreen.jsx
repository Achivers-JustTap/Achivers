import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React, { useState, useRef } from 'react';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import { manipulateAsync } from 'expo-image-manipulator';

const ProfilePicture = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [imageUri, setImageUri] = useState(null); // Remove explicit typing
  const [base64Image, setBase64Image] = useState(null); // Remove explicit typing
  const cameraRef = useRef(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to use the camera</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.button}>
          <Text style={styles.text}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  async function takePicture() {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();

        if (photo && photo.uri) {
          setImageUri(photo.uri);

          // Save the picture to the file system
          const fileUri = FileSystem.documentDirectory + 'photo.jpg';
          await FileSystem.moveAsync({
            from: photo.uri,
            to: fileUri,
          });

          // Convert the image to base64
          const { base64 } = await manipulateAsync(fileUri, [], { base64: true });
          setBase64Image(base64 || null);
          console.log('Base64 Image:', base64);
        } else {
          console.error('Failed to capture photo: photo or photo.uri is undefined');
        }
      } catch (error) {
        console.error('An error occurred while taking the picture:', error);
      }
    }
  }

  return (
    <View style={styles.container}>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.image} />
      ) : (
        <CameraView style={styles.camera} ref={cameraRef}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={takePicture}>
              <Text style={styles.text}>Take Picture</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default ProfilePicture;
