import React, { useEffect, useRef, useState } from "react";
import { Text, View, Image } from "react-native";

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

  const [imageURI, setImageURI] = useState(""); // initialize it to an empty string


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

  return (
    <View className="flex-1">
      {/* Image */}
        <Image
          className="w-full h-[45%]"
          source={{
            uri: imageURI,
          }}
          resizeMode="contain"
          alt="No Lot selected"
        />

      {/* Data */}
      <View className="flex-1 bg-white flex-row justify-center items-center space-x-12 rounded-tr-xl rounded-tl-xl">
        {/* Total
        <View>
          <Text className="text-2xl text-center">{data?.total_spaces}</Text>
          <Text>Total</Text>
        </View> */}

        {/* Free spaces */}
        <View>
          <Text className="text-center text-8xl text-green-600">
            {data?.free_spots.length}
          </Text>
          <Text className="text-2xl text-center">Spaces free!</Text>
        </View>

        {/* Taken spaces
        <View>
          <Text className="text-2xl text-center text-red-600">
            {data?.occupied_spaces.length}
          </Text>
          <Text>Taken</Text>
        </View> */}

        {/* Timer */}
        <Timer seconds={secondsUntilUpdate} />

        {/*  */}
      </View>
    </View>
  );
};

export default Home;
