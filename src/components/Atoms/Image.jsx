import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";


const ImageComponent = (props) => {

  return (
    <TouchableOpacity
      onPress={() => {
        // navigation.navigate("Products");
      }}
      style={styles.outline}
    >
      <Image
        style={styles.image}
        source={{ uri: `${props.image}` }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  outline: {
    width: "90%",
    height: '90%',
    backgroundColor: "#F0822B",
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1, borderStyle: 'solid', 
    borderRadius: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: 10,
  },
});

export default ImageComponent;