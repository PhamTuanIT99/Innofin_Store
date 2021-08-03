import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, StatusBar, Platform } from 'react-native';
import { Camera } from 'expo-camera';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import i18n from 'i18n-js';
import * as ImageManipulator from 'expo-image-manipulator';

export default function TakeAfter() {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const navigaton = useNavigation();
  const getImageType = fileType => {
    switch (fileType) {
      case '.gif':
        return 'image/gif';
      case '.jpg':
        return 'image/jpeg';
      case '.jpeg':
        return 'image/jpeg';
      case '.jfif':
        return 'image/jpeg';
      case '.pjpeg':
        return 'image/jpeg';
      case '.png':
        return 'image/png';
      case '.svg':
        return 'image/svg+xml';
      default:
        return 'image/jpeg';
    }
  };
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1, backgroundColor: '#606060', alignItems: 'center' }}>
      {Platform.OS === 'ios' ? <StatusBar barStyle="light-content" /> : null}
      <Camera
        style={{ width: '90%', height: 217, marginTop: 80, borderWidth: 1 }}
        ratio="1:1"
        ref={ref => {
          setCameraRef(ref);
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            justifyContent: 'flex-end',
          }}></View>
      </Camera>
      <Text
        style={{
          color: '#FFF',
          textAlign: 'center',
          width: '85%',
          fontWeight: 'bold',
          marginTop: 30,
        }}>
        {i18n.t('FinCCP::CcpKYC.Warning')}
      </Text>
      <TouchableOpacity
        style={{ alignSelf: 'center', marginTop: 100 }}
        onPress={async () => {
          if (cameraRef) {
            let photoAfter = await cameraRef.takePictureAsync({ skipProcessing: true });
            let reSize = async () => {
              const setImg = await ImageManipulator.manipulateAsync(photoAfter.uri, [], {
                compress: Platform.OS === 'ios' ? 0 : 0.5,
              });
              let A = {
                uri: setImg.uri,
                type: getImageType(
                  photoAfter.uri.substring(
                    photoAfter.uri.lastIndexOf('.') + 1,
                    photoAfter.uri.length,
                  ),
                ),
                name: photoAfter.uri.substring(
                  photoAfter.uri.lastIndexOf('/') + 1,
                  photoAfter.uri.length,
                ),
              };
              navigaton.navigate('CmndAfter', { A });
            };
            reSize();
          }
        }}>
        <View style={styles.chupanh}>
          <Ionicons name="camera" size={40} color="white" />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  chupanh: {
    backgroundColor: '#2CD1F8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chupanh: {
    height: 65,
    width: 65,
    paddingVertical: '1.5%',
    paddingHorizontal: 10,
    backgroundColor: '#2CD1F8',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
