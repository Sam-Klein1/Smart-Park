import React from "react";
import { View, Text, Switch, TouchableOpacity, StyleSheet } from "react-native";
import SettingComponents from "../components/Setting"; // Import the SettingComponents

interface SettingsProps {
  // Add any necessary props based on your requirements
}

const Settings: React.FC<SettingsProps> = () => {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);
  const [locationSharingEnabled, setLocationSharingEnabled] = React.useState(false);

  const handleToggleDarkMode = (value: boolean) => {
    setDarkModeEnabled(value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notification Preferences</Text>
        <Text style={styles.subTitle}>Notifications Enabled</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={(value) => setNotificationsEnabled(value)}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Appearance</Text>
        <TouchableOpacity
          style={[styles.button, !darkModeEnabled ? styles.selectedButton : null]}
          onPress={() => handleToggleDarkMode(false)}
        >
          <Text style={styles.buttonText}>Always Light</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, darkModeEnabled ? styles.selectedButton : null]}
          onPress={() => handleToggleDarkMode(true)}
        >
          <Text style={styles.buttonText}>Always Dark</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Privacy and Security</Text>
        <Text style={styles.subTitle}>Location Sharing</Text>
        <Switch
          value={locationSharingEnabled}
          onValueChange={(value) => setLocationSharingEnabled(value)}
        />
      </View>

      {/* Contact Support Section */}
      {/* Replace the static content with the SettingComponents */}
      <SettingComponents onDarkModeToggle={handleToggleDarkMode} />

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
    fontWeight: "bold",
    marginBottom: 8,
  },
  subTitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  button: {
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  selectedButton: {
    backgroundColor: "#007BFF", // Blue color for the selected button
    borderColor: "#007BFF",
  },
  buttonText: {
    fontSize: 16,
    textAlign: "center",
    color: "#333",
  },
});


export default Settings;
