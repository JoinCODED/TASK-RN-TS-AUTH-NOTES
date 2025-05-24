import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { Redirect, Stack } from "expo-router";
import AuthContext from "@/context/AuthContext";

const ProtectedLayout = () => {
	// const isAuthenticated = false;
	const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext); //Fetching global value to update the Authentication parameter
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
