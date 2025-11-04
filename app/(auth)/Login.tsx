import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useState } from "react";
import colors from "../../data/styling/colors";
import AuthContext from "../../contexts/AuthContext";
import { useRouter } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../api/auth";
import { setToken } from "../../api/storage";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login({ email, password }),
    onSuccess: async (data) => {
      console.log("login success", data);
      await setToken(data.token);
      setIsAuthenticated(true);
      router.push("/(protected)/(tabs)");
    },
    onError: (error) => {
      console.log("login error", error);
      console.error("Login failed:", error);
    },
  });

  const handleLogin = () => {
    if (email && password) {
      loginMutation.mutate({ email, password });
    }
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
          <Text
            style={{
              color: colors.white,
              fontSize: 24,
              fontWeight: "bold",
              marginBottom: 10,
            }}
          >
            Login
          </Text>
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
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!loginMutation.isPending}
          />

          <TextInput
            style={{
              backgroundColor: colors.white,
              padding: 10,
              borderRadius: 5,
              marginTop: 20,
            }}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            editable={!loginMutation.isPending}
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
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? (
              <ActivityIndicator color={colors.primary} />
            ) : (
              <Text
                style={{
                  color: colors.primary,
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                Login
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={{ marginTop: 20, alignItems: "center" }}
            onPress={() => router.push("/(auth)/Register")}
          >
            <Text style={{ color: colors.white, fontSize: 16 }}>
              Don't have an account?{" "}
              <Text style={{ color: colors.white, fontWeight: "bold" }}>
                Register
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Index;

const styles = StyleSheet.create({});
