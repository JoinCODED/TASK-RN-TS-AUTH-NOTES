import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import React, { useContext, useState } from "react";
import colors from "../../data/styling/colors";
import { useMutation } from "@tanstack/react-query";
import { register } from "@/api/auth";
import AuthContext from "@/context/AuthContext";
import { useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";
const Register = () => {
  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  const pickImage = async () => {
    // this will launch my phone gallery to pick an image
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  // using useMutate and handleRegister to trigger the mutate with the button onPress
  // just need to pass the right info
  const { mutate } = useMutation({
    mutationKey: ["register"],
    mutationFn: () => register({ email, password }, name, image || ""),
    onSuccess: () => {
      setIsAuthenticated(true);
      router.replace("/");
    },
  });
  const handleRegister = () => {
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
          {/* couldnt find the <TextInput> for Name??, I added one hopefully I'm not confused */}
          <TextInput
            style={{
              backgroundColor: colors.white,
              padding: 10,
              borderRadius: 5,
              marginTop: 20,
            }}
            placeholder="Name"
            onChangeText={(text) => {
              setName(text.toLowerCase);
            }}
          />
          <TextInput
            style={{
              backgroundColor: colors.white,
              padding: 10,
              borderRadius: 5,
              marginTop: 20,
            }}
            placeholder="Email"
            onChangeText={(text) => {
              setEmail(text.toLowerCase);
            }}
          />

          <TextInput
            style={{
              backgroundColor: colors.white,
              padding: 10,
              borderRadius: 5,
              marginTop: 20,
            }}
            placeholder="Password"
            onChangeText={(text) => {
              setPassword(text.toLowerCase);
            }}
          />
          {/* this is to viw the image picked */}
          {image && (
            <Image
              source={{ uri: image }}
              style={{
                height: 100,
                width: 100,
                borderRadius: 50,
                marginTop: 10,
              }}
            />
          )}

          <TouchableOpacity style={{ marginTop: 20 }} onPress={pickImage}>
            <Text style={{ color: colors.white, fontSize: 16 }}>
              Upload Profile Image
            </Text>
          </TouchableOpacity>
          {/*-----------------register button------------------- */}
          <TouchableOpacity
            style={{
              backgroundColor: colors.white,
              padding: 10,
              borderRadius: 5,
              marginTop: 20,
              alignItems: "center",
            }}
            onPress={handleRegister}
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
