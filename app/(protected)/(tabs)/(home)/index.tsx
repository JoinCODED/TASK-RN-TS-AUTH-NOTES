import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useRef, useState } from "react";
import colors from "../../../../data/styling/colors";
import Note from "../../../../components/Note";
import { deleteToken } from "@/api/storage";
import AuthContext from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { getAllNotes } from "@/api/notes";
import Entypo from "@expo/vector-icons/Entypo";
import { useScrollToTop } from "@react-navigation/native";
import { FAB, Searchbar } from "react-native-paper";
import { router } from "expo-router";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
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

  //search by the title or body or username
  const filterdNotes = data?.filter(
    (note: any) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.body.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.user?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.primary,
      }}
    >
      <Searchbar
        placeholder="Search notes..."
        placeholderTextColor={colors.black}
        iconColor={colors.black}
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={{ margin: 10 }}
      />
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
        <View
          style={{
            width: "100%",
            alignItems: "flex-end",
          }}
        >
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              marginRight: 14,
              width: 100,
            }}
            onPress={() => {
              handleLogout();
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 20,
                textAlign: "center",
                marginRight: 5,
                fontWeight: "bold",
              }}
            >
              Logout
            </Text>
            <Entypo name="log-out" size={24} color="white" />
          </TouchableOpacity>
        </View>
        {filterdNotes.map((note: any) => (
          <Note key={note._id} note={note} />
        ))}
        {/* <Note key={"1"} note={note} /> */}
      </ScrollView>
      <FAB
        icon="note-plus-outline"
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
