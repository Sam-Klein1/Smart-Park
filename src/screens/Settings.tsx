import { useState } from "react";
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  Alert,
  Linking,
} from "react-native";

const Settings = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  // const [locationSharingEnabled, setLocationSharingEnabled] = useState(false);

  const handleToggleDarkMode = (value: boolean) => {
    setDarkModeEnabled(value);
  };
  
  const handleEmailLink = () => {
    Linking.openURL("mailto:parkingsmartsolutions@gmail.com");
  };

  const handleCallNumber = () => {
    Alert.alert(
      "Call Support",
      "Do you want to call smart park support?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Call",
          onPress: () => {
            Linking.openURL("tel:+16079531980");
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View className="flex-1 p-6 flex-col justify-between">
      {/* Notifs */}
      <View>
        <Text className="text-lg font-bold">Notification Preferences</Text>
        <View className="flex-row">
          <Text className="text-lg ">Notifications Enabled</Text>
          <View className="flex-1 items-end">
            <Switch
              value={notificationsEnabled}
              onValueChange={(value) => setNotificationsEnabled(value)}
            />
          </View>
        </View>
      </View>

      {/* Appearance */}
      <View>
        <Text className="text-lg font-bold">Appearance</Text>

        <View className="flex-row">
          <Text className="text-lg ">Use device settings</Text>
          <View className="flex-1 items-end">
            {/* <Switch value={} onValueChange={() => {}} /> */}
          </View>
        </View>
        <Text className="text-sm pr-8 text-gray-400 mb-2">
          Match the appearance of your device's display & Brightness settings
        </Text>

        <View className="flex-row">
          <TouchableOpacity
            className="bg-gray-500 rounded p-4 w-1/2"
            onPress={() => handleToggleDarkMode(false)}
          >
            <Text className="text-center">Always Light</Text>
          </TouchableOpacity>

          <View className="w-2"></View>

          <TouchableOpacity
            className="bg-gray-500 rounded p-4 w-1/2"
            onPress={() => handleToggleDarkMode(false)}
          >
            <Text className="text-center">Always Dark</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Privacy & Security */}
      <View>
        <Text className="text-lg font-bold">Privacy and Security</Text>
        <View className="flex-row">
          <Text className="text-lg ">Location Sharing</Text>
          <View className="flex-1 items-end">
            {/* <Switch value={} onValueChange={() => {}} /> */}
          </View>
        </View>
        <Text className="text-sm pr-8 text-gray-400">
          Used for finding parking lots nearby you
        </Text>
      </View>

      {/* Contact Support */}
      <View>
        <Text className="text-lg font-bold">Contact Support</Text>
        <TouchableOpacity className="flex-row" onPress={handleEmailLink}>
          <Text>Email: </Text>
          <Text className="text-color-700 text-decoration-line: underline text-blue-700">
            parkingsmartsolutions@gmail.com
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row" onPress={handleCallNumber}>
          <Text>Phone: </Text>
          <Text className="text-color-700 text-decoration-line: underline text-blue-700">
            (607)-953-1980
          </Text>
        </TouchableOpacity>
      </View>

      {/* TODO: Terms & Conditions */}
      

    </View>
  );
};

export default Settings;
