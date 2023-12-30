import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  Button,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

const Home = ({ activeLot, setActiveLot }) => {
  const [data, setData] = useState(null);
  const [secondsUntilUpdate, setSecondsUntilUpdate] = useState(30);
  const isMounted = useRef(false);
  const navigation = useNavigation(); // Hook from React Navigation
  const [modalVisible, setModalVisible] = useState(false);

  const [image, setImage] = useState(
    `http://192.168.254.135:8080/image/${activeLot.id}`
  ); // initialize it to an empty string

  const rotateValue = useRef(new Animated.Value(0)).current;

  const rotateRefresh = () => {
    Animated.timing(rotateValue, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start(() => {
      // Reset the animated value after the animation completes
      rotateValue.setValue(0);
    });
  };

  const spin = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "720deg"],
  });

  const fetchData = async () => {
    if (activeLot.id === null) return;

    try {
      const res_data = await fetch(
        `http://192.168.254.135:8080/data/${activeLot.id}`
      );
      const result = await res_data.json();
      setData(result);

      // const res_img = await fetch(
      //   `http://192.168.254.135:8080/image/${activeLot.id}`
      // );
      // const data = await res_img.blob();
      setImage(`http://192.168.254.135:8080/image/${activeLot.id}`);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (!isMounted.current) {
      // Skip the API call on initial mount
      isMounted.current = true;
      return;
    }

    fetchData();

    // Set up an interval to fetch data every 10 seconds
    const intervalId = setInterval(() => {
      fetchData();

      setSecondsUntilUpdate(30); // Reset the timer after fetching data
    }, 30000);

    // Set up an interval to update the timer every second
    const timerIntervalId = setInterval(() => {
      setSecondsUntilUpdate((prevSeconds) => prevSeconds - 1);
    }, 1000);

    // Clean up the intervals when the component is unmounted
    return () => {
      clearInterval(intervalId);
      clearInterval(timerIntervalId);
    };
  }, [activeLot]);

  // Update tab bar header dynamically
  useEffect(() => {
    navigation.setOptions({
      title: activeLot.name, // Assuming 'name' is the property containing the name of the activeLot
    });
  }, [activeLot, navigation]);

  return (
    <View className="flex-1 bg-white">
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View className="flex-1 justify-center items-center">
          <View
            className="bg-white rounded-xl p-6 relative z-20"
            style={{
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <Text className="text-lg font-bold">Parking Hours:</Text>
            <Text>{activeLot.hours}</Text>
            <View className="absolute right-1 top-[-4px]">
              <Button
                title="x"
                onPress={() => setModalVisible(!modalVisible)}
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* Top Bar */}
      <View className="flex-row justify-between">
        <View className="items-center p-4">
        <TouchableOpacity onPress={rotateRefresh}>
        <Animated.View style={{ transform: [{ rotate: spin }] }}>
          <Icon name="refresh" size={35}/>
        </Animated.View>
      </TouchableOpacity>
          <Text className="text-sm text-center">{secondsUntilUpdate}</Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
          className="items-center p-4"
        >
          <Icon name="information-circle-outline" size={35} />
        </TouchableOpacity>
      </View>

      {/* Image */}
      <View className="flex-1">
        {activeLot.id ? (
          <Image
            className="w-full h-full"
            source={{
              uri: image,
            }}
            resizeMode="contain"
            alt="No Lot selected"
          />
        ) : (
          <View className="w-full h-full justify-center">
            <Text className="text-center">No lot selected</Text>
          </View>
        )}
      </View>
      {activeLot.id && (
        <View className="p-4 flex-row justify-center space-x-2">
          <Text className="text-center text-xl italic">
            {activeLot.location}
          </Text>
          <Text className="text-xs self-center">(ID: {activeLot.id})</Text>
        </View>
      )}

      {/* Data */}
      <View
        className="h-1/3 bg-[#007aff] justify-center 
      rounded-t-2xl p-6 relative"
        style={{
          shadowOpacity: 0.3,
          shadowRadius: 3,
          elevation: 5,
        }}
      >
        <View className="absolute top-1 left-1 w-14 h-16">
          <Image
            source={require("../../assets/logo.png")}
            className="w-full h-full"
          />
        </View>

        <View className="absolute top-1 right-1 p-2">
          <Text className="text-center text-xl">{data?.total_spaces}</Text>
          <Text className="text-center text-lg">Total</Text>
        </View>
        {/* Free spaces */}
        {activeLot.id ? (
          <View className="p-2">
            <Text className="text-center text-white text-8xl font-bold">
              {data?.free_spots.length}
            </Text>
            <Text className="text-center text-4xl text-white">Spaces Free</Text>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => navigation.navigate("Lots" as never)}
          >
            <View
              className="rounded-lg bg-white w-4/5 self-center"
              style={{
                shadowOpacity: 3,
                shadowRadius: 5,
                shadowOffset: { width: 0, height: 3 },
              }}
            >
              <Text className="text-center text-2xl text-black">
                Find a lot to view!
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Home;
