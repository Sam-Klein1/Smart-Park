import React, { useEffect, useState } from "react";
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

const Home = ({activeLot, setActiveLot}) => {

  const [data, setData] = useState(null);
  const [secondsUntilUpdate, setSecondsUntilUpdate] = useState(10);

  const fetchData = async () => {
    try {
      const response = await fetch(`https://0a93-104-228-110-109.ngrok-free.app`);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // fetchData();

    // Set up an interval to fetch data every 10 seconds
    const intervalId = setInterval(() => {
      // fetchData();
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
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <View className="flex-1">
      <Text>{activeLot ? `Active Lot: ${activeLot.name}` : "No Active Lot"}</Text>
      {/* Image */}
      <View className="h-2/3 justify-center">
        <Image
          className="w-full h-full"
          resizeMode="contain"
          source={{
            uri: "https://0a93-104-228-110-109.ngrok-free.app/image",
          }}
        />
      </View>

      {/* Data */}
      <View className="flex-1 relative bg-white flex-row justify-center items-center space-x-12 rounded-tr-xl rounded-tl-xl">
        
        {/* Total
        <View>
          <Text className="text-2xl text-center">{data?.total_spaces}</Text>
          <Text>Total</Text>
        </View> */}

        {/* Free spaces */}
        <View>
          <Text className="text-center text-8xl text-green-600">
            {data?.open_spaces.length}
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
