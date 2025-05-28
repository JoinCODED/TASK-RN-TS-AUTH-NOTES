import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native";
import React, { useRef } from "react";
import colors from "../../../../data/styling/colors";
import UserProfileCard, {
  UserProfileCardProps,
} from "../../../../components/UserProfileCard";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers, me } from "@/api/auth";
import { useScrollToTop } from "@react-navigation/native";
const Users = () => {
  const ref = useRef<ScrollView>(null);

  useScrollToTop(ref);

  // const { data } = useQuery({
  //   queryKey: ["getMe"],
  //   queryFn: () => me(),
  // });

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["getAllUsers"],
    queryFn: () => getAllUsers(),
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
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  // if (isSuccess) alert("Data done");

  console.log("THIS IS ALL USERS *****", data);
  return (
    <ScrollView ref={ref} style={{ flex: 1, backgroundColor: colors.primary }}>
      {/* <UserProfileCard
        imageUrl={`https://task-react-auth-backend.eapi.joincoded.com/${data?.image}`}
        email={data?.email}
        username={data?.name}
      /> */}

      {data?.map((user: any) => (
        <UserProfileCard
          key={user._id}
          imageUrl={user?.image}
          email={user?.email}
          username={user?.name}
        />
      ))}
    </ScrollView>
  );
};

export default Users;

const styles = StyleSheet.create({});
