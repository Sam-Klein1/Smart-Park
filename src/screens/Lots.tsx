import { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import SearchBar from "../components/SearchBar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Lot from "../components/Lot";

export default function Lots({ activeLot, setActiveLot }) {
  const [myLots, setMyLots] = useState([]);
  const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false);

  useEffect(() => {
    const loadMyLots = async () => {
      try {
        await AsyncStorage.removeItem("parkingLots");
        const storedLots = await AsyncStorage.getItem("parkingLots");
        // console.log(storedLots)
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
          setActiveLot={setActiveLot}
        />

        {/* My Lots */}
        <View className="pb-6">
          {activeLot.id && (
            <View className="flex-row space-x-2 justify-center">
              <Text className="text-center text-xl font-bold">
                {activeLot.name}
              </Text>
              {/* <Text className="text-lg self-center">(ID: {activeLot.id})</Text> */}
              <Text className="text-center italic text-xs self-center text-green-700">(Active)</Text>
            </View>
          )}
        </View>

        <FlatList
          data={myLots}
          keyExtractor={(item) => item?.id.toString()}
          renderItem={({ item }) => (
            <Lot
              lot={item}
              activeLot={activeLot}
              setactiveLot={setActiveLot}
              setlots={setMyLots}
              mylots={myLots}
            />
          )}
          ListEmptyComponent={() => (
            <View className="items-center">
              <Text>No parking lots added yet...</Text>
            </View>
          )}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}
