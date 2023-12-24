import { useState, useEffect } from "react";
import { View, Text, FlatList, Keyboard, TouchableWithoutFeedback } from "react-native";
import SearchBar from "../components/SearchBar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Lot from "../components/Lot";

export default function Lots() {
  const [myLots, setMyLots] = useState([]);
  const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false);
  const [activeLot, setActiveLot] = useState(null);

  useEffect(() => {
    const loadMyLots = async () => {
      try {
        const storedLots = await AsyncStorage.getItem("parkingLots");
        console.log(storedLots)
        if (storedLots) {
          const parsedLots = JSON.parse(storedLots);
          setMyLots(parsedLots);
        }
      } catch (error) {
        console.error("Error loading parking lots:", error);
      }
    };

    loadMyLots();
  }, []);

  const handleTouchablePress = () => {
    Keyboard.dismiss(); // Dismiss the keyboard
    setIsSuggestionsVisible(false);
  };

  return (
    <TouchableWithoutFeedback onPress={handleTouchablePress}>
      <View className="flex-1">
        <SearchBar
          isSuggestionsVisible={isSuggestionsVisible}
          setIsSuggestionsVisible={setIsSuggestionsVisible}
          setlots={setMyLots}
          mylots={myLots}
        />

        {/* My Lots */}
        <View className="border-y">
          <Text className="p-4 text-xl font-bold">MY LOTS:</Text>
        </View>

        <FlatList
          data={myLots}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Lot lot={item} activeLot={activeLot} setActiveLot={setActiveLot} setlots={setMyLots}
            mylots={myLots}/>
          )}
          ListEmptyComponent={() => (
            <View className="items-center p-4">
              <Text>No parking added yet...</Text>
            </View>
          )}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}
