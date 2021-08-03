import React from 'react';
import { ListItem, Text, Left, Body } from 'native-base';
import { StyleSheet, ImageBackground, StatusBar, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import i18n from 'i18n-js';
import { Platform } from 'react-native';
import { Image } from 'react-native';

function HelpMe() {
    const navigation = useNavigation();
    return (
        <ImageBackground
            source={require('../../../assets/Rectangle-76.png')}
            style={{ flex: 1, alignItems: 'center' }}>
            {Platform.OS === 'ios' ? <StatusBar barStyle="dark-content" /> : null}
            <View style={{ width: '90%' }}>
                <View style={styles.item}>
                    <ListItem noIndent icon style={styles.list} onPress={() => navigation.navigate('Help')}>
                        <Left>
                            <Image style={styles.imageIcon} source={require('../../../assets/question.png')} />
                        </Left>
                        <Body style={styles.bodyStyle}>
                            <Text style={styles.text}>{i18n.t('FinCCP::CcpHelp.FrequentlyAskedQuestions')}</Text>
                        </Body>
                    </ListItem>
                </View>
                <View style={styles.item}>
                    <ListItem noIndent icon style={styles.list} onPress={() => navigation.navigate('ReportProblem')}>
                        <Left>
                            <Image style={styles.imageIcon} source={require('../../../assets/canhbao.png')} />
                        </Left>
                        <Body style={styles.bodyStyle}>
                            <Text style={styles.text}>{i18n.t('FinCCP::CcpReport.ReportProblem')}</Text>
                        </Body>
                    </ListItem>
                </View>
            </View>
            
        </ImageBackground>
    );
}

export default HelpMe;
const styles = StyleSheet.create({
    imageIcon: { width: 50, height: 50 },
    text: {
        fontWeight: '600',
        fontSize: 17,
        paddingLeft: 0,
    },
    list: {
        height: 60,
        borderColor: 'grey',
        marginVertical: 5,
    },
    bodyStyle: {
        borderBottomWidth: null,
    },
    item: {
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginTop: 5,
        marginBottom: 10,
        borderRadius: 10,
    },
});
