import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/api/auth";
import { Link, useRouter } from "expo-router";
import AuthContext from "@/context/AuthContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import colors from "@/data/styling/colors";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  const { mutate, data } = useMutation({
    mutationKey: ["Login"],
    mutationFn: () => login({ email, password }),
    onSuccess: () => {
      setIsAuthenticated(true);
      router.replace("/");
      alert("Logged in successfully!");
    },

    onError: () => {
      alert("Wrong email or password");
    },
  });

  console.log("This is the login Data:", data);
  const handleLogin = () => {
    console.log("This is the data sent", { email, password });
    mutate();
  };
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
            placeholder={!email.trim() ? "Email" : "Email"}
            keyboardType="email-address"
            returnKeyType="done"
            placeholderTextColor={colors.primary}
            onChangeText={(text) => setEmail(text)}
            
          />
          {/* <Text></Text> */}

          <TextInput
            style={{
              backgroundColor: colors.white,
              padding: 10,
              borderRadius: 5,
              marginTop: 20,
            }}
            placeholder="Password"
            returnKeyType="done"
            placeholderTextColor={colors.primary}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
          />

          <TouchableOpacity
            style={{
              backgroundColor: colors.white,
              padding: 10,
              borderRadius: 5,
              marginTop: 20,
              alignItems: "center",
            }}
            onPress={() => {
              if (!email.trim() && !password.trim()) {
                return alert("Please enter your email and password");
              }
              if (!email.trim()) {
                return alert("Please enter your email");
              }
              if (!password.trim()) {
                return alert("Please enter your password");
              }
              handleLogin();
            }}
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
            <Link href={"/Register"}>
              <Text style={{ color: colors.white, fontWeight: "bold" }}>
                Register
              </Text>
            </Link>
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Index;

const styles = StyleSheet.create({});
