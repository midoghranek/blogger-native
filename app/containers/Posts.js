import React, { useEffect, useState, useMemo, Fragment } from "react";
import {
  ActivityIndicator,
  View,
  FlatList,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import config from "../config/blogger.json";
import Card from "../components/Card";

export default Posts = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);

  const [currentTag, setCurrentTag] = useState("Recent");
  const [tagActive, setTagActive] = useState(false);
  const [labels, setLabels] = useState([]);

  const [posts, setPosts] = useState([]);
  const [tagPosts, setTagPosts] = useState([]);

  const [postsLoading, setPostsLoading] = useState(true);

  useEffect(() => {
    let params = {
      key: config.apiKey,
      fetchBodies: false,
      fetchImages: true,
      maxResults: 5,
      view: "READER",
    };
    let options = Object.entries(params)
      .map(([key, val]) => `${key}=${val}`)
      .join("&");

    let url = `https://www.googleapis.com/blogger/v3/blogs/${config.blogId}/posts?${options}`;
    let urlTag = `https://www.googleapis.com/blogger/v3/blogs/${config.blogId}/posts?${options}&labels=${currentTag}`;

    if (!tagActive) {
      fetch(url)
        .then((response) => response.json())
        .then((data) => setPosts(data.items))
        .catch((error) => console.error(error))
        .finally(() => {
          setLoading(false);
          setPostsLoading(false);
        });
    } else {
      fetch(urlTag)
        .then((response) => response.json())
        .then((data) => setTagPosts(data.items))
        .catch((error) => console.error(error))
        .finally(() => setPostsLoading(false));
    }
  }, [posts, currentTag]);

  useMemo(() => {
    let labelsSet = [].concat.apply(
      [],
      posts.map((tag) => tag.labels)
    );
    let tags = [...new Set(labelsSet)];
    tags.unshift("Recent");
    setLabels(tags);
  }, [isLoading]);

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <ActivityIndicator style={styles.loading} size="large" />
      ) : (
        <View>
          <View style={styles.labels}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={labels}
              renderItem={({ item }) => (
                <TouchableWithoutFeedback
                  underlayColor="#FFF"
                  onPress={() => {
                    if (item === "Recent") {
                      setTagActive(false);
                      setCurrentTag("Recent");
                    } else if (currentTag !== item) {
                      setPostsLoading(true);
                      setCurrentTag(item);
                      setTagActive(true);
                    }
                  }}
                >
                  <Text
                    style={[
                      styles.label,
                      item === currentTag
                        ? {
                            color: "#38c",
                            borderBottomColor: "#38c",
                            borderBottomWidth: 1,
                          }
                        : "",
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableWithoutFeedback>
              )}
              keyExtractor={(item) => item}
            />
          </View>
          {postsLoading ? (
            <ActivityIndicator style={styles.loading} size="large" />
          ) : (
            <React.Fragment>
              <Card
                navigation={navigation}
                posts={tagActive ? tagPosts : posts}
              />
            </React.Fragment>
          )}
        </View>
      )}
    </View>
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
  labels: {
    backgroundColor: "#EEE",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  label: {
    color: "#999",
    fontSize: 14,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15,
    paddingBottom: 15,
  },
});
