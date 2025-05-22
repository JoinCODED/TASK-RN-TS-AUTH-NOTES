import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../../../../data/styling/colors";
import { useQuery } from "@tanstack/react-query";
import { getNote } from "@/api/notes";
import { useLocalSearchParams } from "expo-router";

const NoteDetails = () => {
  const { noteId } = useLocalSearchParams<{ noteId: string }>();

  const { data, isLoading } = useQuery({
    queryKey: ["getNote"],
    queryFn: () => getNote(noteId),
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
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  console.log("This is note DATA", data);

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
            color: colors.primary,
            fontSize: 28,
            fontWeight: "bold",
            marginBottom: 15,
          }}
        >
          {data?.title}
        </Text>

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 10,
            marginBottom: 20,
          }}
        >
          <Text style={{ color: colors.primary }}>{data?.topic[0]}</Text>
          <Text style={{ color: colors.primary }}>{data?.topic[1]}</Text>
          <Text style={{ color: colors.primary }}>{data?.topic[2]}</Text>
          <Text style={{ color: colors.primary }}>{data?.topic[3]}</Text>
        </View>

        <Text
          style={{
            color: colors.primary,
            fontSize: 16,
            lineHeight: 24,
          }}
        >
          {data?.body}
        </Text>
      </View>
    </View>
  );
};

export default NoteDetails;

const styles = StyleSheet.create({});
