import { ScrollView, StyleSheet } from "react-native";
import React from "react";
import colors from "../../../../data/styling/colors";
import UserProfileCard from "../../../../components/UserProfileCard";
import { useQuery } from "@tanstack/react-query";
import { me } from "@/api/auth";
// import { getAllUsers, me } from "@/api/auth";

const Users = () => {
	const { data } = useQuery({
		queryKey: ["myprofile"],
		queryFn: me,
	});
	// const { data1 } = useQuery({
	// 	queryKey: ["users"],
	// 	queryFn: getAllUsers,
	// });

	return (
		<ScrollView style={{ flex: 1, backgroundColor: colors.primary }}>
			<UserProfileCard imageUrl={`https://task-react-auth-backend.eapi.joincoded.com/${data?.image}`} email={data?.email} username={data?.name} />

			{/* {data1?.map((users: any) => (
				<UserProfileCard
					key={users._id}
					imageUrl={`https://task-react-auth-backend.eapi.joincoded.com/${data?.image}`}
					email={data?.email}
					username={data?.name}
				/>
			))} */}
		</ScrollView>
	);
};

export default Users;

const styles = StyleSheet.create({});
