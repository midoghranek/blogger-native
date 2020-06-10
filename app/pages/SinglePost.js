import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Content from "../components/Content";
import config from "../config/blogger.json";

export default SinglePost = ({ route }) => {
  const { postId, postTitle, postImage } = route.params;

  const [isLoading, setLoading] = useState(true);
  const [body, setBody] = useState([]);

  useEffect(() => {
    let params = {
      key: config.apiKey,
      view: "READER",
    };
    let options = Object.entries(params)
      .map(([key, val]) => `${key}=${val}`)
      .join("&");

    let url = `https://www.googleapis.com/blogger/v3/blogs/${config.blogId}/posts/${postId}?${options}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => setBody(data.content))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <ScrollView style={{ flex: 1 }}>
      <Image style={styles.postImage} source={{ uri: postImage }} />
      <View style={styles.box}>
        <Text style={styles.postTitle}>{postTitle}</Text>
      </View>
      <View style={{ flex: 1 }}>
        {isLoading ? (
          <ActivityIndicator style={styles.loading} size="large" />
        ) : (
          <Content html={body} />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  postImage: {
    width: "100%",
    height: 200,
  },
  postTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  box: {
    backgroundColor: "#f9f9f9",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
});
