import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { icons } from "@/constants";

const SearchInput = ({
  value,
  placeholder,
  handleChangeText,
  ...props
}: {
  value: string;
  placeholder?: string;
  handleChangeText: (e: string) => void;
  otherStyles: string;
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row space-x-4">
      <TextInput
        className="text-base mt-0.5 text-white flex-1 font-pregular"
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#7b7b8b"
        onChangeText={handleChangeText}
      />
    
      <TouchableOpacity>
        <Image 
          source={icons.search}
          className="w-5 h-5"
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
