import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import colors from "../../data/styling/colors";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/api/auth";

const Index = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { mutate, data } = useMutation({
		mutationKey: ["Login"],
		mutationFn: () => login({ email, password }),
		onSuccess: () => {
			alert("Login Success");
		},
		onError: () => {
			alert("Failed");
		},
	});
	console.log("Login Data", data);
	const handleLogin = () => {
		console.log({ email, password });
		mutate();
	};
	return (
		<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
			<View
				style={{
					flex: 1,
					backgroundColor: colors.primary,
					padding: 20,
					justifyContent: "center",
					alignItems: "center",
				}}>
				<View style={{ width: "100%", padding: 20 }}>
					<Text style={{ color: colors.white, fontSize: 16 }}>Login to your account</Text>

					<TextInput
						style={{
							backgroundColor: colors.white,
							padding: 10,
							borderRadius: 5,
							marginTop: 20,
						}}
						placeholder="Email"
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
						onChangeText={(password) => setPassword(password)}
					/>

					<TouchableOpacity
						style={{
							backgroundColor: colors.white,
							padding: 10,
							borderRadius: 5,
							marginTop: 20,
							alignItems: "center",
						}}
						onPress={() => {}}>
						<Text
							style={{
								color: colors.primary,
								fontWeight: "bold",
								fontSize: 16,
							}}
							onPress={handleLogin}>
							Login
						</Text>
					</TouchableOpacity>

					<Text style={{ color: colors.white, fontSize: 16 }}>
						Don't have an account? <Text style={{ color: colors.white, fontWeight: "bold" }}>Register</Text>
					</Text>
				</View>
			</View>
		</KeyboardAvoidingView>
	);
};

export default Index;

const styles = StyleSheet.create({});
