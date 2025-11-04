import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import colors from "../data/styling/colors";
import { ActivityIndicator, StatusBar } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthContext from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import { getToken } from "@/api/storage";

const queryClient = new QueryClient();

export default function RootLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const checkAuth = async () => {
      const token = await getToken();
      if (token) {
        setIsAuthenticated(true);
      }
      setReady(true);
    };
    checkAuth();
  }, [ready]);

  if (!ready) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary }}>
          <ActivityIndicator size="large" color={colors.white} />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary }}>
        <QueryClientProvider client={queryClient}>
          <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="(auth)" />
            </Stack>
          </AuthContext.Provider>
        </QueryClientProvider>
        <StatusBar barStyle={"light-content"} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
