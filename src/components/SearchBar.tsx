import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Button,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function SearchBar({
  isSuggestionsVisible,
  setIsSuggestionsVisible,
  mylots,
  setlots,
  setActiveLot,
}) {
  const [parkingLots, setParkingLots] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredParkingLots, setFilteredParkingLots] = useState([]);
  const [selectedLot, setSelectedLot] = useState({
    id: null,
    name: "",
    location: "",
  }); // Initialize with an empty object
  const [showDuplicateError, setShowDuplicateError] = useState(false);

  useEffect(() => {
    const fetchParkingLots = async () => {
      try {
        const response = await fetch("http://192.168.254.135:8080/lots");
        const data = await response.json();
        setParkingLots(data);
      } catch (error) {
        console.error("Error fetching parking lots:", error);
      }
    };

    fetchParkingLots();
  }, []);

  useEffect(() => {
    // Filter parking lots based on the search query
    const filteredLots = parkingLots.filter(
      (lot) =>
        lot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lot.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredParkingLots(filteredLots);
  }, [searchQuery, parkingLots]);

  useEffect(() => {
    // Show the error message for 3 seconds when isDuplicateLot is true
    if (showDuplicateError) {
      const timeoutId = setTimeout(() => {
        setShowDuplicateError(false);
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [showDuplicateError]);

  const handleFocus = () => {
    setIsSuggestionsVisible(true);
  };

  const handleBlur = () => {
    setIsSuggestionsVisible(false);
  };

  const addLot = async () => {
    try {
      // Check if the selected lot exists in the database
      const doesLotExist = parkingLots.some(
        (lot) => lot?.id === selectedLot.id
      );

      if (!doesLotExist) {
        Alert.alert(
          "Error!",
          "Parking lot does not exist in our database",
          [
            {
              text: "OK",
              onPress: () => console.log("OK Pressed"),
            },
          ],
          { cancelable: false }
        );
        return; // Do not add the lot if it doesn't exist in the database
      }

      const isDuplicateLot = mylots.some((lot) => lot?.id === selectedLot.id);

      if (isDuplicateLot) {
        console.log("Parking lot with the same ID already exists.");
        setShowDuplicateError(true);
        return; // Do not add the lot if it's a duplicate
      }

      // Retrieve existing parking lots from AsyncStorage
      const existingParkingLotsString = await AsyncStorage.getItem(
        "parkingLots"
      );

      // Parse the existing string to get the array of parking lots
      let existingParkingLots = existingParkingLotsString
        ? JSON.parse(existingParkingLotsString)
        : [];

      // Ensure existingParkingLots is an array
      if (!Array.isArray(existingParkingLots)) {
        existingParkingLots = [];
      }

      // Append the new parking lot to the array
      existingParkingLots.push(selectedLot);

      // Convert the updated array back to a string
      const updatedParkingLotsString = JSON.stringify(existingParkingLots);

      // Save the updated string back to AsyncStorage
      await AsyncStorage.setItem("parkingLots", updatedParkingLotsString);

      Alert.alert(
        "Lot Added!",
        "",
        [
          {
            text: "OK",
            onPress: () => console.log("OK Pressed"),
          },
        ],
        { cancelable: false }
      );
      setIsSuggestionsVisible(false);
      setlots(existingParkingLots);
      if (mylots.length <= 1) setActiveLot(selectedLot);
      setSearchQuery("");
      setSelectedLot({
        id: null,
        name: "",
        location: "",
      });
    } catch (error) {
      console.error("Error adding parking lot:", error);
    }
  };

  return (
    <View className="p-6 bg-gray-300">
      <View className="z-10 bg-white shadow-md rounded-xl p-6">
        
        <Text className="mb-2 text-2xl">Find a lot</Text>

        {/* Search bar */}
        <View className="flex-row">
        {/* <Icon name="search" size={20}/> */}
          <TextInput
            className="p-4 border border-gray-300 rounded w-5/6 rounded-r-none"
            placeholder="Enter lot ID or search for lots"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <View className="bg-[#007aff] rounded p-1 flex-1 rounded-l-none justify-center">
            <Button title="+" color="#ffffff" onPress={addLot} />
          </View>
        </View>

        {showDuplicateError && (
          <Text className="relative text-red-600 text-center top-4">
            Lot with the same ID has already been added
          </Text>
        )}
        
        {isSuggestionsVisible && filteredParkingLots.length > 0 && (
          <View className="p-4 bg-white rounded-b">
            <FlatList
              data={filteredParkingLots}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="flex-row items-center py-1"
                  onPress={() => {
                    setSearchQuery(`${item.id}`);
                    setSelectedLot({
                      id: item.id,
                      name: item.name,
                      location: item.location,
                    });
                  }}
                >
                  <View>
                    <Text className="text-xl font-bold text-[#007aff]">
                      {item.name}
                    </Text>
                    <Text className="text-base italic">{item.location}</Text>
                  </View>
                  <Text className="flex-1 text-right mr-6">ID: {item.id}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </View>
    </View>
  );
}
