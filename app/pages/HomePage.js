import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Posts from "../containers/Posts";

export default function Homepage({ navigation }) {
  return (
    <View style={styles.container}>
      <Posts navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    marginTop: 30,
    marginBottom: 20,
    fontSize: 25,
    fontWeight: "bold",
    color: "#FFF",
  },
});
