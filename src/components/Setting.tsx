import React from 'react';
import { Linking, Alert, StyleSheet, View, Text, TouchableOpacity } from 'react-native';

interface SettingsProps {
    onDarkModeToggle: (value: boolean) => void;
}

const SettingComponents: React.FC<SettingsProps> = ({ onDarkModeToggle }) => {
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
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contact Support</Text>
            <TouchableOpacity onPress={handleEmailLink}>
                <Text style={[styles.text, styles.link]}>Email: parkingsmartsolutions@gmail.com</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCallNumber}>
                <Text style={[styles.text, styles.link]}>Phone: (607)-953-1980</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    section: {
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    text: {
        color: '#333',
    },
    link: {
        textDecorationLine: 'underline',
        color: 'blue',
    },
});

export default SettingComponents;
