import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { Redirect, Stack } from "expo-router";
import { AuthContext } from "@/Context/AuthContext";

const ProtectLogin = () => {
  const { isAuthenticated } = useContext(AuthContext);
  if (!isAuthenticated) {
    return <Redirect href={"/Login"} />;
  }
  return (
    <Stack>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
};

export default ProtectLogin;

const styles = StyleSheet.create({});
