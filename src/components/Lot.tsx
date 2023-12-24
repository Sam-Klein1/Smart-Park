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
      className={`p-6 border-b flex-row space-x-4 bg-gray-200 ${
        activeLot && activeLot.id === lot.id ? "bg-gray-300" : ""
      }`}
      onTouchEnd={() => handleItemPress(lot)}
    >
      {activeLot && activeLot.id === lot.id ? <Text>🔘</Text> : <Text>⚪️</Text>}
      <Text>{lot.name}</Text>
      <Text>-</Text>
      <Text className="italic">{lot.location}</Text>
      <View
        className="absolute right-4 top-[22px]"
        onTouchEnd={() => handleDelete(lot)}
      >
        <Icon name="trash-outline" size={23} />
      </View>
    </View>
  );
}
