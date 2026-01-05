import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../../../data/styling/colors";
import { useQuery } from "@tanstack/react-query";
import { getNote } from "../../../api/notes";
import { useLocalSearchParams } from "expo-router";

const NoteDetails = () => {
  const { noteId: id } = useLocalSearchParams();
  const { data: note, isLoading } = useQuery({
    queryKey: ["note", id],
    queryFn: () => getNote(id as string),
  });

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.primary,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color={colors.white} />
      </View>
    );
  }
  if (!note) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.primary,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: colors.white }}>Note not found</Text>
      </View>
    );
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.primary,
        padding: 20,
      }}
    >
      <View
        style={{
          backgroundColor: colors.secondary,
          padding: 20,
          borderRadius: 15,
          minHeight: 200,
          elevation: 5,
          shadowColor: colors.black,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        }}
      >
        <Text
          style={{
            color: colors.white,
            fontSize: 28,
            fontWeight: "bold",
            marginBottom: 15,
          }}
        >
          {note.title}
        </Text>

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 10,
            marginBottom: 20,
          }}
        >
          {note.topic.map((topic: string) => (
            <Text key={topic} style={{ color: colors.white }}>
              {topic}
            </Text>
          ))}
        </View>

        <Text
          style={{
            color: colors.white,
            fontSize: 16,
            lineHeight: 24,
          }}
        >
          {note.body}
        </Text>
      </View>
    </View>
  );
};

export default NoteDetails;

const styles = StyleSheet.create({});
