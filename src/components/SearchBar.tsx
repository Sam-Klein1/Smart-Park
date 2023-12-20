import { Text, View, TextInput } from "react-native";

export default function SearchBar() {
  return (
    <View className="p-8 bg-gray-200">
      <Text className="mb-2 text-2xl">Find a lot</Text>
      <TextInput className="p-4 bg-white rounded" placeholder="okay boomer" />
    </View>
  );
}
