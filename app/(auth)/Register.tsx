import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import colors from "../../data/styling/colors";
import { register } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";

const Register = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { mutate, data } = useMutation({
		mutationKey: ["Register"],
		mutationFn: () => register({ email, password }),
		onSuccess: () => {
			alert("Registered");
		},
		onError: () => {
			alert("Failed");
		},
	});
	console.log("Registration Data", data);
	const handleRegistration = () => {
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
					<Text
						style={{
							color: colors.white,
							fontSize: 24,
							fontWeight: "bold",
							marginBottom: 10,
						}}>
						Register
					</Text>
					<Text style={{ color: colors.white, fontSize: 16 }}>Create your account</Text>

					<TextInput
						style={{
							backgroundColor: colors.white,
							padding: 10,
							borderRadius: 5,
							marginTop: 20,
						}}
						placeholder="Email"
						onChangeText={(email) => setPassword(email)}
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

					<TouchableOpacity style={{ marginTop: 20 }}>
						<Text style={{ color: colors.white, fontSize: 16 }}>Upload Profile Image</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={{
							backgroundColor: colors.white,
							padding: 10,
							borderRadius: 5,
							marginTop: 20,
							alignItems: "center",
						}}>
						<Text
							style={{
								color: colors.primary,
								fontWeight: "bold",
								fontSize: 16,
							}}
							onPress={handleRegistration}>
							Register
						</Text>
					</TouchableOpacity>

					<TouchableOpacity style={{ marginTop: 20, alignItems: "center" }}>
						<Text style={{ color: colors.white, fontSize: 16 }}>
							Already have an account? <Text style={{ color: colors.white, fontWeight: "bold" }}>Login</Text>
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</KeyboardAvoidingView>
	);
};

export default Register;

const styles = StyleSheet.create({});
