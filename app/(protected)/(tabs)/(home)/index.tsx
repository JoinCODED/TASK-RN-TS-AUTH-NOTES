import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import colors from "../../../../data/styling/colors";
import Note from "../../../../components/Note";
import { deleteToken } from "@/api/storage";
import AuthContext from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { getAllNotes } from "@/api/notes";

const Home = () => {
	const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

	const { data } = useQuery({
		queryKey: ["notes"],
		queryFn: getAllNotes,
	});
	const note = {
		_id: "1",
		title: "Note 1",
		topic: ["Topic 1", "Topic 2"],
		body: "Note Body",
		user: {
			_id: "1",
			name: "User 1",
			email: "user1@example.com",
			createdAt: "2021-01-01",
			updatedAt: "2021-01-01",
		},
	};
	return (
		<View
			style={{
				flex: 1,
				backgroundColor: colors.primary,
			}}>
			<ScrollView
				style={{
					flex: 1,
				}}
				contentContainerStyle={{
					flexGrow: 1,
				}}
				showsVerticalScrollIndicator={false}>
				{data?.map((note: any) => (
					<Note key={note._id} note={note} />
				))}
			</ScrollView>
			<Button
				title="Logout"
				onPress={async () => {
					await deleteToken();
					setIsAuthenticated(false);
				}}></Button>
		</View>
	);
};

export default Home;

const styles = StyleSheet.create({});
