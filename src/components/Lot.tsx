import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function Lot({ lot, activeLot, setActiveLot, mylots, setlots }) {
  const handleItemPress = (lot) => {
    setActiveLot(lot);
    // Additional logic to handle item press as needed
  };

  const handleDelete = async (lot) => {
    try {
      // Filter out the selected lot from mylots
      const updatedLots = mylots.filter((item) => item.id !== lot.id);
      setlots(updatedLots);
  
      // Update AsyncStorage
      await AsyncStorage.setItem("parkingLots", JSON.stringify(updatedLots));
    } catch (error) {
      console.error("Error updating AsyncStorage:", error);
    }
  };
  

  return (
    <View
      className={`p-6 border-b relative ${
        activeLot && activeLot.id === lot.id ? "bg-gray-300" : ""
      }`}
      onTouchEnd={() => handleItemPress(lot)}
    >
      <Text>{lot.name}</Text>
      {/* Add more details about the parking lot as needed */}
      <View className="absolute right-4 top-[17px]" onTouchEnd={() => handleDelete(lot)}>
        <Icon name="trash-outline" size={28} />
      </View>
    </View>
  );
}
