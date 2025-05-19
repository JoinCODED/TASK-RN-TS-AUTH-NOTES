import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Redirect, Stack } from "expo-router";

const ProtectedLayout = () => {
	const isAuthenticated = false;
	if (isAuthenticated) {
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
