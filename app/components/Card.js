import React from "react";
import {
  FlatList,
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function Card({ navigation, posts }) {
  return (
    <FlatList
      style={styles.postsBox}
      data={posts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() =>
            navigation.navigate("Post", {
              postId: item.id,
              postTitle: item.title.indexOf("&#39;")
                ? item.title.replace("&#39;", "'")
                : item.title,
              postImage:
                "images" in item
                  ? item.images[0].url
                  : "https://i.imgur.com/SQj2RJw.jpg",
              authorName: item.author.displayName,
              authorPic: `http://${item.author.image.url}`,
            })
          }
        >
          <View style={styles.post}>
            <Image
              style={styles.postImage}
              source={{
                uri:
                  "images" in item
                    ? item.images[0].url
                    : "https://i.imgur.com/SQj2RJw.jpg",
              }}
            />
            <View style={styles.box}>
              <Text style={styles.title}>
                {item.title.indexOf("&#39;")
                  ? item.title.replace("&#39;", "'")
                  : item.title}
              </Text>
              <View style={styles.authorBox}>
                <Image
                  style={styles.authorPic}
                  source={{ uri: `http://${item.author.image.url}` }}
                />
                <Text style={styles.authorName}>{item.author.displayName}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}

const cardReduis = 20;

const styles = StyleSheet.create({
  postsBox: {
    paddingTop: 20,
  },
  post: {
    marginBottom: 20,
    marginRight: 15,
    marginLeft: 15,
  },
  postImage: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: cardReduis,
    borderTopRightRadius: cardReduis,
  },
  title: {
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
    borderBottomLeftRadius: cardReduis,
    borderBottomRightRadius: cardReduis,
  },
  authorBox: {
    marginTop: 5,
    flex: 1,
    flexDirection: "row",
  },
  authorPic: {
    width: 20,
    height: 20,
  },
  authorName: {
    fontSize: 14,
    marginLeft: 10,
  },
});
