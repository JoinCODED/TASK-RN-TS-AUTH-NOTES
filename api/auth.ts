import UserInfo from "@/types/UserInfo";
import instance from ".";
import { store } from "expo-router/build/global-state/router-store";
import { storeToken } from "./storage";



const login = async (userInfo: UserInfo) => {
    const { data } = await instance.post("/auth/login", userInfo);
    /// added the login token below
    if (data.token) {storeToken(data.token);}
    return data;
};

const register = async (userInfo: UserInfo) => {
    const { data } = await instance.post("/auth/register", userInfo);
    return data;
};

const me = async () => {
    const { data } = await instance.get("/auth/me");
    return data;
};

const getAllUsers = async () => {
    const { data } = await instance.get("/auth/users");
    return data;
};


export { login, register, me, getAllUsers };