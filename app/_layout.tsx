/// step 2 to setup AuthContext is by adding useState and AuthContext.provider wrap
/// Values of the AuthContext are the useState parameters
import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import colors from "../data/styling/colors";
import { StatusBar } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import AuthContext from "@/context/Authcontext";
import { getToken } from "@/api/storage";

export default function RootLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const queryClient = new QueryClient();


  ///step 5 to maintain my login while token is valid
  const checkToken = async () => {
  const token = await getToken();
  if (token){
    setIsAuthenticated(true);}
  };
  // useEffect( ()=>{
  //   checkToken();},[]); 
  //   if (!ready) {return "ready"}

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary }}>
        <QueryClientProvider client={queryClient}>
          <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated}}>
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
