import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

export default function Lot({ lot, activeLot, setactiveLot, mylots, setlots }) {
  const navigation = useNavigation();

  const handleItemPress = (lot: any) => {
    setactiveLot(lot);
    navigation.navigate("Home" as never);
  };

  const handleDelete = async (lot) => {
    try {
      // Filter out the selected lot from mylots
      const updatedLots = mylots.filter((item) => item.id !== lot?.id);

      //remove active lot
      if (updatedLots.length === 0) setactiveLot(null);

      setlots(updatedLots);

      // Update AsyncStorage
      await AsyncStorage.setItem("parkingLots", JSON.stringify(updatedLots));
      Alert.alert(
        "Lot Deleted!",
        "",
        [
          {
            text: "OK",
            onPress: () => console.log("OK Pressed"),
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error("Error updating AsyncStorage:", error);
    }
  };

  return (
    <TouchableOpacity
      className={`p-6 flex-row space-x-4 bg-gray-200 ${
        activeLot && activeLot.id === lot?.id ? "bg-gray-300" : ""
      }`}
      onPress={() => handleItemPress(lot)}
    >
      {activeLot && activeLot.id === lot?.id ? (
        <Text>🔘</Text>
      ) : (
        <Text>⚪️</Text>
      )}
      <Text className="font-bold">{lot?.name}</Text>
      <Text>-</Text>
      <Text className="italic">{lot?.location}</Text>
      <TouchableOpacity
        className="absolute right-4 top-[22px]"
        onPress={(e) => {
          e.stopPropagation();
          handleDelete(lot);
        }}
      >
        <Icon name="trash-outline" size={23} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
