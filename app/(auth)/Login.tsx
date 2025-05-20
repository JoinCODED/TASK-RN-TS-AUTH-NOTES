import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext } from "react";
import colors from "../../data/styling/colors";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/api/auth";
import { StoreToken } from "@/api/storage";
import { useRouter } from "expo-router";
import { AuthContext } from "@/Context/AuthContext";
const Index = () => {
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const router = useRouter();
  const { mutate, data } = useMutation({
    mutationKey: ["LoginCLick"],
    mutationFn: () => login({ password, email }),
    onSuccess: () => {
      alert("Clicked");
      setIsAuthenticated(true);
      router.replace("/");
    },
  });

  const handleLogin = () => {
    console.log({ password, email });
    mutate();
  };
  if (data.token) {
    StoreToken(data.token);
    return data;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: colors.primary,
          padding: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={{ width: "100%", padding: 20 }}>
          <Text style={{ color: colors.white, fontSize: 16 }}>
            Login to your account
          </Text>

          <TextInput
            style={{
              backgroundColor: colors.white,
              padding: 10,
              borderRadius: 5,
              marginTop: 20,
            }}
            placeholder="Email"
            onChangeText={(text) => setemail(text.toLowerCase)}
          />

          <TextInput
            style={{
              backgroundColor: colors.white,
              padding: 10,
              borderRadius: 5,
              marginTop: 20,
            }}
            placeholder="Password"
            onChangeText={(text) => setpassword(text)}
          />

          <TouchableOpacity
            style={{
              backgroundColor: colors.white,
              padding: 10,
              borderRadius: 5,
              marginTop: 20,
              alignItems: "center",
            }}
            onPress={handleLogin}
          >
            <Text
              style={{
                color: colors.primary,
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              Login
            </Text>
          </TouchableOpacity>

          <Text style={{ color: colors.white, fontSize: 16 }}>
            Don't have an account?{" "}
            <Text style={{ color: colors.white, fontWeight: "bold" }}>
              Register
            </Text>
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Index;

const styles = StyleSheet.create({});
