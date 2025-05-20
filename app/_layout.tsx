import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import colors from "../data/styling/colors";
import { ActivityIndicator, StatusBar, View } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import AuthContext from "@/context/AuthContext";
import { deleteToken, getToken } from "@/api/storage";
export default function RootLayout() {
	const queryClient = new QueryClient();
	const [isAuthenticated, setIsAuthenticated] = useState(false); //defined : Similar to use state but to globalize it to all the pages
	const [ready, setReady] = useState(false);

	const checkToken = async () => {
		const token = await getToken();
		if (token) {
			setIsAuthenticated(true);
		}
		setReady(true);
	};

	useEffect(() => {
		checkToken();
		// deleteToken();
	}, []);

	if (!ready) {
		return (
			<View>
				<ActivityIndicator size={"large"} color={"white"} />
			</View>
		);
	}
	return (
		<SafeAreaProvider>
			<SafeAreaView style={{ flex: 1, backgroundColor: colors.primary }}>
				<QueryClientProvider client={queryClient}>
					<AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
						{/*This is to get the Provider for the AuthContext with provider parameter to be globally applied*/}
						<Stack screenOptions={{ headerShown: false }}>
							<Stack.Screen name="(auth)" />
							<Stack.Screen name="(tabs)" />
						</Stack>
					</AuthContext.Provider>
				</QueryClientProvider>
				<StatusBar barStyle={"light-content"} />
			</SafeAreaView>
		</SafeAreaProvider>
	);
}
