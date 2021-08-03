import { Button } from 'native-base';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, ImageBackground, TextInput } from 'react-native';
import { StyleSheet, View, KeyboardAvoidingView, Text } from 'react-native';
import i18n from 'i18n-js';

export default function ConfirmOTP() {
    let textInput = useRef(null)
    const lengthInput = 4;
    const [internalVal, setInternalVal] = useState("")
    console.log(internalVal)
    const onChangeText = (val) => {
        setInternalVal(val.replace(/[^0-9]/g, ''))
    }
    useEffect(() => {
        textInput.focus();
    }, [])
    return (
        <ImageBackground source={require('../../../assets/Rectangle-76.png')} style={styles.container}>
            <KeyboardAvoidingView
                style={styles.containerOvaidingView}
            >
                <Text style={[styles.titleStyle, styles.confirmOTP]}>Xác thực mã OTP</Text>
                <Text style={[styles.titleStyle, { fontWeight: 'bold' }]}>Mã xác thực đã được gửi qua SĐT:</Text>
                <Text style={[styles.titleStyle, styles.sdt]}>01667728899</Text>
                <Text style={[styles.titleStyle, { marginBottom: 10 }]}>Nhập mã OTP</Text>
                <View>
                    <TextInput
                        ref={(input) => textInput = input}
                        onChangeText={onChangeText}
                        style={styles.buttonClick}
                        value={internalVal}
                        maxlength={lengthInput}
                        returnKeyType="done"
                        keyboardType="numeric"
                        maxLength={4}
                    />
                    <View style={styles.containerInput}>
                        {
                            Array(lengthInput).fill().map((data, index) => (
                                <View key={index} style={[styles.cellView, { borderBottomColor: index === internalVal.length ? '#2CD1F8' : 'black' }]}
                                >
                                    <Text style={styles.cellText}
                                        onPress={() => textInput.focus()}
                                    >
                                        {internalVal && internalVal.length > 0 ? internalVal[index] : ""}
                                    </Text>
                                </View>
                            ))
                        }
                    </View>
                </View>
                <Text style={[styles.titleStyle, { marginBottom: 20 }]}>Bạn chưa nhận được mã? <Text onPress={() => Alert.alert('heloo')} style={{ color: '#FF8000' }}>Gửi lại OTP</Text></Text>
                <Button
                    abpButton
                    style={styles.buttonStyle}
                >
                    <Text style={styles.confirm}>{i18n.t('FinCCP::CcpKYC.Confirm')}</Text>
                </Button>
            </KeyboardAvoidingView>
        </ImageBackground >
    )
}
const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center' },
    containerOvaidingView: {
        width: '90%', alignItems: 'center', paddingHorizontal: 10, marginTop: '25%', shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: 'white',
        borderRadius: 8, paddingVertical: 30
    },
    titleStyle: { fontSize: 16 },
    containerInput: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
    cellView: { paddingBottom: 11, width: 40, height: 5, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1.5, marginLeft: 5 },
    cellText: { textAlign: 'center', fontSize: 16 },
    buttonStyle: {
        backgroundColor: '#2CD1F8',
        width: '90%',
        borderRadius: 8,
        textTransform: 'none',
    },
    confirm: { fontSize: 16, fontWeight: 'bold', color: 'white' },
    confirmOTP: { fontSize: 18, fontWeight: 'bold', paddingBottom: '8%', color: 'black' },
    buttonClick: { width: 270, height: 0 },
    sdt: { fontWeight: 'bold', marginBottom: 20 }
})