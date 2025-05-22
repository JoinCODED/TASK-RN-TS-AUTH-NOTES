import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useContext, useState } from "react";
import colors from "../../data/styling/colors";
import { Link, useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { useMutation } from "@tanstack/react-query";
import { register } from "@/api/auth";
import AuthContext from "@/context/AuthContext";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setname] = useState("");
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  const router = useRouter();

  const { mutate } = useMutation({
    mutationKey: ["Register"],
    mutationFn: () => register({ email, password }, name, image || ""),
    onSuccess: () => {
      setIsAuthenticated(true);
      router.replace("/");
      alert("Registered successfully!");
    },
    onError: () => {
      alert("Registration failed. Please try again.");
    },
  });

  const handleRegister = () => {
    // console.log("data sent", { email, password, name });
    if (!name.trim() && !email.trim() && !password.trim()) {
      return alert("Please enter name, email and password");
    }
    if (!name.trim()) {
      return alert("Please enter your name");
    }
    if (!email.trim()) {
      return alert("Please enter your email");
    }
    if (!password.trim()) {
      return alert("Please enter your password");
    }
    mutate();
  };

  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
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
            placeholder="Name"
            returnKeyType="done"
            placeholderTextColor={colors.primary}
            onChangeText={(text) => setname(text)}
          />

          <TextInput
            style={{
              backgroundColor: colors.white,
              padding: 10,
              borderRadius: 5,
              marginTop: 20,
            }}
            placeholder="Email"
            keyboardType="email-address"
            returnKeyType="done"
            placeholderTextColor={colors.primary}
            onChangeText={(text) => setEmail(text)}
          />

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
          />

          <TouchableOpacity style={{ marginTop: 20 }} onPress={pickImage}>
            <Text style={{ color: colors.white, fontSize: 16 }}>
              Upload Profile Image
            </Text>
          </TouchableOpacity>
          {image && <Image source={{ uri: image }} style={styles.image} />}

          <TouchableOpacity
            style={{
              backgroundColor: colors.white,
              padding: 10,
              borderRadius: 5,
              marginTop: 20,
              alignItems: "center",
            }}
            onPress={() => {
              handleRegister();
            }}
          >
            <Text
              style={{
                color: colors.primary,
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              Register
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ marginTop: 20, alignItems: "center" }}>
            <Text style={{ color: colors.white, fontSize: 16 }}>
              Already have an account?{" "}
              <Link href={"/Login"}>
                <Text style={{ color: colors.white, fontWeight: "bold" }}>
                  Login
                </Text>
              </Link>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Register;

const styles = StyleSheet.create({
  image: {
    margin: 10,
    width: 150,
    height: 150,
    borderRadius: 100,
  },
});
