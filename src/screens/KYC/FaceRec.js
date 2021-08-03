import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { Camera } from 'expo-camera';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import i18n from 'i18n-js';

export default function () {
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
    <View style={{ flex: 1, backgroundColor: '#000000', alignItems: 'center' }}>
      {Platform.OS === 'ios' ? <StatusBar barStyle="light-content" /> : null}
      <View
        style={{ height: 300, width: 300, borderRadius: 200, overflow: 'hidden', marginTop: 30 }}>
        <Camera
          ratio="1:1"
          style={{ width: 300, height: 300 }}
          type={Camera.Constants.Type.front}
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
      </View>
      <Text
        style={{
          color: '#FFF',
          textAlign: 'center',
          width: '85%',
          fontWeight: 'bold',
          marginTop: 30,
        }}>
        {i18n.t('FinCCP::CcpKYC.HoldYourFaceFirmlyForAuthentication')}
      </Text>
      <TouchableOpacity
        style={{ alignSelf: 'center', marginTop: 70 }}
        onPress={async () => {
          if (cameraRef) {
            let FaceRec = await cameraRef.takePictureAsync({ skipProcessing: true });
            let F = {
              uri: FaceRec.uri,
              type: getImageType(
                FaceRec.uri.substring(FaceRec.uri.lastIndexOf('.') + 1, FaceRec.uri.length),
              ),
              name: FaceRec.uri.substring(FaceRec.uri.lastIndexOf('/') + 1, FaceRec.uri.length),
            };
            navigaton.navigate('CardKyc', { F });
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
