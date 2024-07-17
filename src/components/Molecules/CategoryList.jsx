import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    FlatList,
  } from "react-native";
  import React from "react";
  import { SIZE } from "../../theme/fonts";
  import icons from "../../constants/icons";
  import images from "../../constants/images";
  import { LinearGradient } from "expo-linear-gradient";
  
  const categories = [
    {
      id: 1,
      name: "Cầu lông",
      icon: icons.shuttercock,
    },
    {
      id: 2,
      name: "Vợt",
      icon: icons.racket,
    },
    {
      id: 3,
      name: "Giày ",
      icon: icons.shoes,
    },
    {
      id: 4,
      name: "Túi vợt",
      icon: icons.backpack,
    },
    {
      id: 5,
      name: "Vợt",
      icon: icons.racket,
    },
    {
      id: 6,
      name: "Giày ",
      icon: icons.shoes,
    },
    {
      id: 7,
      name: "Túi vợt",
      icon: icons.backpack,
    },
  ];
  
  const CategoryList = () => {
    return (
      <View>
        <Text style={styles.title}>Danh mục dành cho bạn</Text>
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryContainer}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.category,
                {
                  marginRight: categories.length > 4 ? 35 : 45,
                },
              ]}
              activeOpacity={1}
            >
              <LinearGradient
                colors={["#2A9083", "#FF8A00"]}
                style={styles.gradientBorder}
              >
                <View style={styles.innerContainer}>
                  <Image
                    source={item.icon}
                    style={styles.image}
                    resizeMode="contain"
                  />
                </View>
              </LinearGradient>
              <Text style={styles.cateName}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };
  
  export default CategoryList;
  
  const styles = StyleSheet.create({
    title: {
      fontSize: SIZE.size_20,
      fontFamily: "quicksand-bold",
      marginBottom: 16,
      marginLeft: 15,
    },
    categoryContainer: {
      marginLeft: 15,
    },
    image: {
      width: 28,
      height: 28,
    },
    gradientBorder: {
      borderRadius: 8,
      padding: 2,
    },
    innerContainer: {
      borderRadius: 6,
      backgroundColor: "white",
      padding: 14,
    },
    category: {
      alignItems: "center",
      borderRadius: 6,
      backgroundColor: "white",
      marginRight: 45,
    },
    cateName: {
      fontSize: SIZE.size_14,
      fontFamily: "quicksand-regular",
      marginTop: 5,
    },
  });