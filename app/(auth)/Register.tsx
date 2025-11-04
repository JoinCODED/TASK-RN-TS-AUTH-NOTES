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
import { register as registerApi } from "../../api/auth";
import { setToken } from "../../api/storage";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  const registerMutation = useMutation({
    mutationFn: registerApi,
    onSuccess: async (data) => {
      await setToken(data.token);
      setIsAuthenticated(true);
    },
    onError: (error) => {
      console.error("Registration failed:", error);
    },
  });

  const handleRegister = () => {
    if (email && password) {
      registerMutation.mutate({ email, password });
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
            Register
          </Text>
          <Text style={{ color: colors.white, fontSize: 16 }}>
            Create your account
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
            editable={!registerMutation.isPending}
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
            editable={!registerMutation.isPending}
          />

          <TouchableOpacity
            style={{ marginTop: 20 }}
            disabled={registerMutation.isPending}
          >
            <Text style={{ color: colors.white, fontSize: 16 }}>
              Upload Profile Image
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: colors.white,
              padding: 10,
              borderRadius: 5,
              marginTop: 20,
              alignItems: "center",
            }}
            onPress={handleRegister}
            disabled={registerMutation.isPending}
          >
            {registerMutation.isPending ? (
              <ActivityIndicator color={colors.primary} />
            ) : (
              <Text
                style={{
                  color: colors.primary,
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                Register
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={{ marginTop: 20, alignItems: "center" }}
            onPress={() => router.push("/(auth)/Login")}
          >
            <Text style={{ color: colors.white, fontSize: 16 }}>
              Already have an account?{" "}
              <Text style={{ color: colors.white, fontWeight: "bold" }}>
                Login
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Register;

const styles = StyleSheet.create({});
