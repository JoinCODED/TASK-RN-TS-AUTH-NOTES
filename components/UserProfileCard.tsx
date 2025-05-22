import { Text, View, Image } from "react-native";
import React from "react";
import colors from "../data/styling/colors";

export interface UserProfileCardProps {
  imageUrl: string;
  email: string;
  username: string;
}

const UserProfileCard = ({
  imageUrl,
  email,
  username,
}: UserProfileCardProps) => {
  return (
    <View
      style={{
        padding: 20,
        margin: 10,
        backgroundColor: colors.secondary,
        borderRadius: 15,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        alignItems: "center",
      }}
    >
      <Image
        source={{
          uri: imageUrl
            ? imageUrl
            : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        }}
        style={{
          width: 90,
          height: 90,
          borderRadius: 40,
          marginBottom: 15,
        }}
      />
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 8,
          color: colors.primary,
        }}
      >
        {username ? username : "Dawood"}
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: colors.primary,
          fontWeight: "600",
          opacity: 0.8,
        }}
      >
        {email ? email : "dawood@gmail.com"}
      </Text>
    </View>
  );
};

export default UserProfileCard;
