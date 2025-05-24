import UserInfo from "@/types/UserInfo";
import instance from ".";
import { storeToken } from "./storage";

const login = async (userInfo: UserInfo) => {
	const { data } = await instance.post("/auth/login", userInfo);
	if (data.token) {
		storeToken(data.token);
	}
	return data;
};

const register = async (userInfo: UserInfo, name: string, image: string) => {
	const registerUser = {
		email: userInfo.email,
		password: userInfo.password,
		name: name,
		image: image,
	};

	const formData = new FormData();
	formData.append("email", userInfo.email);
	formData.append("password", userInfo.password);
	formData.append("name", name);
	formData.append("image", {
		name: "image.jpg",
		uri: image,
		type: "image/jpeg",
	} as any);
	const { data } = await instance.post("/auth/register", registerUser);

	if (data.token) {
		storeToken(data.token);
	}

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
