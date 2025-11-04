/// This file is for 3 things:
// 1- save (when user login or register) 
// 2- get (when user will do a command that require token confirmation) 
// 3- delete (when user logout)


import * as SecureStore from 'expo-secure-store';

const storeToken = async (token:string) => {
    await SecureStore.setItemAsync("token", token);
}

const getToken = async () => {
    const token = await SecureStore.getItemAsync("token");
    return token;
}

const deleteToken = async () => {
    await SecureStore.deleteItemAsync("token");
}

export {storeToken, getToken, deleteToken}