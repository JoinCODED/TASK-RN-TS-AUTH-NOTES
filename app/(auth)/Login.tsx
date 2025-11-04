/// step 4
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
import colors from "../../data/styling/colors";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/api/auth";
import { useRouter } from "expo-router";
import AuthContext from "@/context/Authcontext";

const Index = () => {
  const [email, setEmail] = useState ("");
  const [password, setPassword] = useState ("");
  // step 4 start here, similar to step 3 code line
  const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);

  /// useRouter is similar to link 
  const router = useRouter();

 const {mutate, data} = useMutation({
    mutationKey:["Login"],
    mutationFn: () => login({ email, password }),
    onSuccess: () => { alert("loging sucsesfull");
      //// step 4.2
      setIsAuthenticated(true);

      /// how "/" means home page ? - why did we change add to replace ?
      router.replace("/")
    },

  })
  
  console.log("data", data);
  const handleLogin = () => {
    console.log ("Data sent to BE", {email, password});
    mutate();
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
            onChangeText={(text)=> setEmail(text)}
          />

          <TextInput
            style={{
              backgroundColor: colors.white,
              padding: 10,
              borderRadius: 5,
              marginTop: 20,
            }}
            placeholder="Password"
            onChangeText={(text)=> setPassword(text)}
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
