import { StyleSheet } from "react-native";
import React, { useContext } from "react";
import { Redirect, Stack } from "expo-router";
import AuthContext from "@/contexts/AuthContext";

const ProtectedLayout = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  if (!isAuthenticated) {
    return <Redirect href={"/Login"} />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
};

export default ProtectedLayout;

const styles = StyleSheet.create({});
