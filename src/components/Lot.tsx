import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

export default function Lot({ lot, activeLot, setactiveLot, mylots, setlots }) {
  const navigation = useNavigation();

  const handleItemPress = (lot: any) => {
    setactiveLot(lot);
    // navigation.navigate("Home" as never);
  };

  const handleDelete = async (lot) => {
    try {
      // Filter out the selected lot from mylots
      const updatedLots = mylots.filter((item) => item.id !== lot?.id);

      //remove active lot
      if (updatedLots.length === 0) setactiveLot(null);

      setlots(updatedLots);
      // setactiveLot(null)

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
      className={`p-4 flex-row space-x-4 bg-gray-200 ${
        activeLot && activeLot.id === lot?.id ? "bg-gray-300" : ""
      }`}
      onPress={() => handleItemPress(lot)}
    >
      {activeLot && activeLot.id === lot?.id ? (
        <Text className="text-xl self-center">🅿️</Text>
      ) : (
        <Text className="text-xl self-center">🅿</Text>
      )}
      <Text className="font-bold self-center">{lot?.name}</Text>
      <Text className="self-center">-</Text>
      <Text className="italic self-center">{lot?.location}</Text>
      <TouchableOpacity
        className="flex-1 self-center items-end"
        onPress={(e) => {
          e.stopPropagation();
          if (lot.id === activeLot.id) {
            Alert.alert(
              "Error!",
              "Cannot remove an active lot.",
              [
                {
                  text: "OK",
                  onPress: () => console.log("OK Pressed"),
                },
              ],
              { cancelable: false }
            );
          }
          else
            handleDelete(lot);
        }}
      >
        <Icon name="trash-outline" size={23} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
