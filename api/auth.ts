import UserInfo from "@/types/UserInfo";
import instance from ".";
import * as SecureStore from "expo-secure-store";
import { saveToken } from "./storage";

const login = async (userInfo: UserInfo) => {
  const { data } = await instance.post("/auth/login", userInfo);

  if (data.token) {
    await saveToken("token", data.token);
  }
  return data;
};

const register = async (userInfo: UserInfo, name: string, image: string) => {
  // created a new object to handle the new info passed, not needed
  // const registerNewUser = {
  //   email: userInfo.email,
  //   password: userInfo.password,
  //   name: name,
  //   image: image,
  // };
  const formData = new FormData();
  formData.append("email", userInfo.email);
  formData.append("password", userInfo.password);
  formData.append("image", {
    name: "image.jpg",
    uri: image,
    type: "image/jpeg",
  } as any); // to handle the type issue
  const { data } = await instance.post("/auth/register", formData);
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
