/// step 3 for Authcontext is to "useContext" - step 4 in the login file
import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { Redirect, Stack } from "expo-router";
import AuthContext from "@/context/Authcontext";

const _Protectedlayout = () => {
  //// step 3 starts below
 const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);
  // const isAuthenticated = true; // hardcoding 
  if (!isAuthenticated) {
    return <Redirect href={"/Login"} />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
};

export default _Protectedlayout;

const styles = StyleSheet.create({});
