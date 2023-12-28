import { useState } from "react";
import { View, Text, Switch, TouchableOpacity, StyleSheet } from "react-native";
import Contact from "../components/Setting"; // Import the SettingComponents

interface SettingsProps {
  // Add any necessary props based on your requirements
}

const Settings = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [locationSharingEnabled, setLocationSharingEnabled] =
    useState(false);

  const handleToggleDarkMode = (value: boolean) => {
    setDarkModeEnabled(value);
  };

  return (
    <View className="flex-1 p-8 flex-col space-y-8">
      
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
            <Switch value={notificationsEnabled} onValueChange={() => {}} />
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
        <Text className="text-lg ">Location Sharing</Text>
        <Switch
          value={locationSharingEnabled}
          onValueChange={(value) => setLocationSharingEnabled(value)}
        />
      </View>

      {/* Contact Support */}
      <Contact />

    </View>
  );
};

export default Settings;
