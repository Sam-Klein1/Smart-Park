import React from 'react';
import { Linking, Alert, StyleSheet, View, Text, TouchableOpacity } from 'react-native';


export default function Contact()
{
    const handleEmailLink = () => {
        Linking.openURL('mailto:parkingsmartsolutions@gmail.com');
    };

    const handleCallNumber = () => {
        Alert.alert(
            'Call Support',
            'Do you want to call smart park support?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Call',
                    onPress: () => {
                        Linking.openURL('tel:+16079531980');
                    },
                },
            ],
            { cancelable: false }
        );
    };

    return (
        <View className="mb-16">
            <Text className="text-lg font-bold">Contact Support</Text>
            <TouchableOpacity onPress={handleEmailLink}>
                <Text className="text-color-700 text-decoration-line: underline text-blue-700">Email: parkingsmartsolutions@gmail.com</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCallNumber}>
                <Text className="text-color-700 text-decoration-line: underline text-blue-700">Phone: (607)-953-1980</Text>
            </TouchableOpacity>
        </View>
    );
};
