import { StyleSheet, Text, View } from "react-native";
import React from "react";
import * as SecureStore from "expo-secure-store";

const StoreToken = async (token: string) => {
  await SecureStore.setItemAsync("token", token);
};
const getToken = async () => {
  const token = await SecureStore.getItemAsync("token");
  return token;
};
const deleteToken = async () => {
  await SecureStore.deleteItemAsync("token");
};

export { StoreToken, getToken, deleteToken };

const styles = StyleSheet.create({});
