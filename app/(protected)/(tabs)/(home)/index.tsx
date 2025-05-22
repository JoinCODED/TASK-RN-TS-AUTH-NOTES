import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useRef } from "react";
import colors from "../../../../data/styling/colors";
import Note from "../../../../components/Note";
import { deleteToken } from "@/api/storage";
import AuthContext from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { getAllNotes } from "@/api/notes";
import Entypo from "@expo/vector-icons/Entypo";
import { useScrollToTop } from "@react-navigation/native";
import { FAB } from "react-native-paper";
import { router } from "expo-router";

const Home = () => {
  const ref = useRef<ScrollView>(null);

  useScrollToTop(ref);

  const { setIsAuthenticated } = useContext(AuthContext);

  const { data, isFetching } = useQuery({
    queryKey: ["getNotes"],
    queryFn: () => getAllNotes(),
    // refetchOnWindowFocus: true,
    // refetchOnReconnect: true,
    // refetchOnMount: true,
  });

  if (isFetching) {
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

  // console.log(data);
  const handleLogout = () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          style: "destructive",
          onPress: async () => {
            await deleteToken();
            setIsAuthenticated(false);
          },
        },
      ],
      { cancelable: true }
    );
  };
  const note = {
    _id: "1",
    title: "Note 1",
    topic: ["Topic 1", "Topic 2"],
    body: "Note Body",
    user: {
      _id: "1",
      name: "User 1",
      email: "user1@example.com",
      createdAt: "2021-01-01",
      updatedAt: "2021-01-01",
    },
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.primary,
      }}
    >
      <ScrollView
        ref={ref}
        style={{
          flex: 1,
        }}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            marginRight: 32,
            marginTop: 10,
          }}
          onPress={() => {
            handleLogout();
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 20,
              width: "100%",
              textAlign: "right",
              marginRight: 5,
              fontWeight: "bold",
            }}
          >
            Logout
          </Text>
          <Entypo name="log-out" size={24} color="white" />
        </TouchableOpacity>
        {data?.map((note: any) => (
          <Note key={note._id} note={note} />
        ))}
        {/* <Note key={"1"} note={note} /> */}
      </ScrollView>
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => router.push("/CreateNote")}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  fab: {
    backgroundColor: colors.quaternary,
    position: "absolute",
    margin: 16,
    right: 5,
    bottom: 0,
  },
});
