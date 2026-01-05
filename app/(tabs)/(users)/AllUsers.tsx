import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import { Text } from "react-native";
import colors from "../../../data/styling/colors";
import UserProfileCard from "../../../components/UserProfileCard";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../../api/auth";
const Users = () => {
  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });
  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.primary,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color={colors.white} />
      </View>
    );
  }
  if (users?.length === 0) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.primary }}>
        <Text style={{ color: colors.white }}>No users found</Text>
      </View>
    );
  }
  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.primary }}>
      {users?.map((user: any) => (
        <UserProfileCard
          key={user._id}
          imageUrl={user.avatar}
          email={user.email!}
          username={user.name!}
        />
      ))}
    </ScrollView>
  );
};

export default Users;

const styles = StyleSheet.create({});
