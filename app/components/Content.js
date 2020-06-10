import React from "react";
import { Dimensions, View, StyleSheet } from "react-native";
import HTML from "react-native-render-html";

export default function Content({ html }) {
  return (
    <View style={styles.body}>
      <HTML html={html} imagesMaxWidth={Dimensions.get("window").width} />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    marginBottom: 20,
    overflow: "hidden",
  },
});
