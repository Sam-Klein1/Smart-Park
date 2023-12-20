import { View, Text, FlatList } from "react-native";
import SearchBar from "../components/SearchBar";

export default function Lots() {
  const lots = [
    {
      name: "lot m",
      totalspaces: 10,
      amtOccupied: 5,
      amtFree: 5,
    },
    {
      name: "lot k",
      totalspaces: 50,
      amtOccupied: 32,
      amtFree: 12,
    },
    {
      name: "lot Z",
      totalspaces: 40,
      amtOccupied: 12,
      amtFree: 7,
    },
  ];

  return (
    <View className="flex-1">
      <SearchBar />

      {/* My Lots */}
      <View className="border-y">
        <Text className="p-2 text-3xl font-bold">MY LOTS:</Text>
      </View>

    </View>
  );
}
