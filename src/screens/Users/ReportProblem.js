import React, { useEffect, useState } from 'react';
import { StyleSheet, ImageBackground, View, StatusBar, Dimensions, Image, TouchableOpacity, Text } from 'react-native';
import { Platform } from 'react-native';
import { ScrollView } from 'react-native';
import Textarea from 'react-native-textarea';
import * as ImagePicker from 'expo-image-picker';
import { Button, Icon } from 'native-base';
import i18n from 'i18n-js';



const windowWidth = Dimensions.get('window').width;
function ReportProblem() {
    const [content, setContent] = useState("")
    const [image, setImage] = useState(null);
    const showImagePicker = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("You've refused to allow this appp to access your photos!");
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync();
        if (!result.cancelled) {
            setImage(result.uri);
        }
    }
    return (
        <ImageBackground
            style={styles.bgrContainer}
            source={require('../../../assets/Rectangle-76.png')}>
            {Platform.OS === 'ios' ? <StatusBar barStyle="dark-content" /> : null}
            <ScrollView>
                <View style={styles.view}>
                    <Textarea
                        containerStyle={styles.textareaContainer}
                        style={styles.textarea}
                        onChangeText={(content) => setContent(content)}
                        value={content}
                        maxLength={240}
                        placeholder={i18n.t('FinCCP::CcpReport.WhatHappened')}
                        placeholderTextColor={'#c7c7c7'}
                        underlineColorAndroid={'transparent'}
                    />
                    <View style={styles.imageReport}>
                        {image == null ?
                            <TouchableOpacity onPress={showImagePicker} style={styles.containerImage}>
                                <Icon
                                    name="image-outline"
                                    style={[styles.iconPicture, { color: 'gray', fontSize: 40 }]}
                                />
                                <Text>{i18n.t('FinCCP::CcpStatement.DropPicturesHere')}</Text>
                            </TouchableOpacity>
                            :
                            <View style={styles.containerImage}>
                                <TouchableOpacity
                                    style={styles.close}
                                    onPress={() => setImage(null)}>
                                    <Image
                                        source={require('../../../assets/deleteimage.png')}
                                        style={styles.iconClose}
                                    />
                                </TouchableOpacity>
                                <Image source={{ uri: image }} style={styles.styleImage} />
                            </View>
                        }
                        <TouchableOpacity style={styles.chooseImage} onPress={showImagePicker}>
                            <Icon
                                name="image-outline"
                                style={styles.iconPicture}
                            />
                            <Text style={styles.textChupanh}>{i18n.t('FinCCP::CcpUpdate.Chosse')}</Text>
                        </TouchableOpacity>
                    </View>
                    <Button abpButton style={styles.buttonStyle}>
                        <Text style={styles.confirm}>{i18n.t('FinCCP::CcpReport.SendFeedback')}</Text>
                    </Button>
                </View>
            </ScrollView>
        </ImageBackground>
    );
}
export default ReportProblem;

const styles = StyleSheet.create({
    bgrContainer: { flex: 1 },
    textareaContainer: {
        height: 180,
        backgroundColor: 'white',
        width: windowWidth - 50,
        height: 100,
        marginVertical: 20, borderWidth: 0.5, borderRadius: 8, borderColor: 'grey'
    },
    textarea: {
        textAlignVertical: 'top',
        fontSize: 14,
        color: '#333',
    },
    chooseImage: {
        flexDirection: 'row',
        height: 35,
        paddingVertical: '1.5%',
        paddingHorizontal: 10,
        backgroundColor: '#2CD1F8',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20
    },
    textChupanh: { color: 'white' },
    buttonStyle: {
        backgroundColor: '#2CD1F8',
        width: '90%',
        borderRadius: 8,
        textTransform: 'none',
        marginBottom: 20
    },
    confirm: { fontSize: 16, fontWeight: 'bold', color: 'white' },
    containerImage: { backgroundColor: 'white', width: windowWidth - 160, height: 400, borderWidth: 0.5, borderRadius: 8, borderColor: 'grey', alignItems: 'center', justifyContent: 'center' },
    close: { position: 'absolute', top: 10, right: 10, zIndex: 11 },
    iconClose: { width: 30, height: 30 },
    styleImage: { width: '100%', height: 400, borderRadius: 8 },
    iconPicture: { fontSize: 20, color: 'white', paddingRight: 5 },
    imageReport: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    view: { flex: 1, alignItems: 'center' }

});
