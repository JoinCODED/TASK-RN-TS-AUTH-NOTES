import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import colors from "../../../../data/styling/colors";
import Note from "../../../../components/Note";
import AuthContext from "../../../../contexts/AuthContext";
import { MaterialIcons } from "@expo/vector-icons";
import { deleteToken } from "@/api/storage";

const Home = () => {
  const { setIsAuthenticated } = useContext(AuthContext);

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
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 20,
          paddingTop: 40,
        }}
      >
        <Text style={{ color: colors.white, fontSize: 20, fontWeight: "bold" }}>
          Welcome
        </Text>
        <TouchableOpacity
          onPress={async () => {
            setIsAuthenticated(false);
            await deleteToken();
          }}
          style={{
            backgroundColor: colors.white,
            padding: 10,
            borderRadius: 5,
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
          }}
        >
          <MaterialIcons name="logout" size={20} color={colors.primary} />
          <Text style={{ color: colors.primary, fontWeight: "bold" }}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        style={{
          flex: 1,
        }}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Note key={"1"} note={note} />
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
