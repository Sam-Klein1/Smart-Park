import React, { useEffect, useRef, useState } from "react";
import { Text, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Timer component
const Timer = ({ seconds }) => {
  return (
    <View className="absolute top-4 left-4">
      <Text className="justify-center">update in</Text>
      <Text className="text-2xl text-center">{seconds}</Text>
    </View>
  );
};

const Home = ({ activeLot, setActiveLot }) => {
  const [data, setData] = useState(null);
  const [secondsUntilUpdate, setSecondsUntilUpdate] = useState(10);
  const isMounted = useRef(false);
  const navigation = useNavigation(); // Hook from React Navigation

  const [imageURI, setImageURI] = useState(
    `http://192.168.254.135:8080/image/${activeLot.id}`
  ); // initialize it to an empty string

  const fetchData = async () => {
    if (activeLot.id === null) return;

    try {
      const response = await fetch(
        `http://192.168.254.135:8080/data/${activeLot.id}`
      );
      const result = await response.json();
      setData(result);

      // Update the uri with a timestamp to force image reload
      setImageURI(
        `http://192.168.254.135:8080/image/${
          activeLot.id
        }?timestamp=${Date.now()}`
      );
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

      setSecondsUntilUpdate(10); // Reset the timer after fetching data
    }, 10000);

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
      {/* Image */}
      <View className="flex-1">
        <Image
          className="w-full h-full"
          source={{
            uri: imageURI,
          }}
          resizeMode="contain"
          alt="No Lot selected"
        />
      </View>

      <View className="p-4">
        <Text className="text-center text-xl italic">{activeLot.location}</Text>
      </View>

      {/* Data */}
      <View className="h-1/3 bg-[#007aff] justify-center rounded-t-2xl shadow-lg p-6">
        {/* Free spaces */}
        <View>
          {activeLot.id ? (
            <>
              <Text className="text-center text-8xl text-white">
                {data?.free_spots.length}
              </Text>
              <Text className="text-2xl text-center text-white">
                Spaces free!
              </Text>
            </>
          ) : (
            <Text className="text-center text-3xl text-orange-500">Pick a lot slut</Text>
          )}
        </View>
      </View>
      <Timer seconds={secondsUntilUpdate} />
    </View>
  );
};

export default Home;
