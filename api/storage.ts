import * as SecureStore from "expo-secure-store";

const saveToken = async (key: string, token: string) => {
  await SecureStore.setItemAsync("token", token);
};

const getToken = async (key: string) => {
  const token = await SecureStore.getItemAsync(key);
  return token;
};

const deleteToken = async (key: string) => {
  await SecureStore.deleteItemAsync(key);
};

export { saveToken, getToken, deleteToken };
