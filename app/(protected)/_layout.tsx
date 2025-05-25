import { StyleSheet, Text, useColorScheme, View } from "react-native";
import React, { useContext } from "react";
import { Redirect, Stack } from "expo-router";
import AuthContext from "@/context/AuthContext";

const ProtectedLayout = () => {
  // const isAuth = false;
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  // check user Auth globally with AuthContext, don't need the setAuth here
  if (!isAuthenticated) {
    return <Redirect href={"/Login"} />;
  }
  return (
    <Stack>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
};

export default ProtectedLayout;

const styles = StyleSheet.create({});
