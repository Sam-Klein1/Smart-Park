import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Button,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
        console.log("Parking lot does not exist in the database.");
        return; // Do not add the lot if it doesn't exist in the database
      }

      const isDuplicateLot = mylots.some((lot) => lot?.id === selectedLot.id);

      if (isDuplicateLot) {
        console.log("Parking lot with the same ID already exists.");
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

      console.log("Parking lot added successfully");
      setlots(existingParkingLots);
      if(mylots.length <= 1)
        setActiveLot(selectedLot)
    } catch (error) {
      console.error("Error adding parking lot:", error);
    }
  };

  return (
    <View className="p-8 bg-gray-200">
      <Text className="mb-2 text-2xl">Find a lot</Text>

      <View className="relative">
        <TextInput
          className="p-4 bg-white rounded"
          placeholder="Enter lot ID or search for parking lots"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <View className="relative bg-slate-500 rounded">
          <Button title="+" color="#ffffff" onPress={addLot} />
        </View>
      </View>
      {isSuggestionsVisible && filteredParkingLots.length > 0 && (
        <View className="p-3 bg-white">
          <FlatList
            data={filteredParkingLots}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  setSearchQuery(`${item.id}`);
                  setSelectedLot({
                    id: item.id,
                    name: item.name,
                    location: item.location,
                  });
                }}
              >
                <Text className="p-2">{`${item.name} - ${item.location} - ${item.id}`}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
}
