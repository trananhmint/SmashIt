import React, { useState } from "react";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import ImageComponent from "../Atoms/Image";
import { COLORS } from "../../theme/colors";

const { height, width } = Dimensions.get("window");

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [data, setData] = useState([
    "https://marketplace.canva.com/EAFoiE2zJcc/1/0/1600w/canva-yellow-playful-color-mom-and-baby-shop-business-banner-ZlevGgv_Xd8.jpg",
    "https://www.shutterstock.com/image-vector/3d-vector-cute-baby-product-600nw-2340974895.jpg",
    "https://static.vecteezy.com/system/resources/thumbnails/041/930/836/small/baby-items-horizontal-web-banner-kid-toys-booties-diapers-ball-pacifier-bodysuit-pyramid-and-other-newborn-elements-illustration-for-header-website-cover-templates-in-modern-design-vector.jpg",
    "https://img.freepik.com/premium-vector/baby-goods-sale-banner-with-place-text-kids-store-vector-poster-with-hand-drawn-illustrations_255592-854.jpg",
    "https://www.shutterstock.com/image-vector/baby-goods-horizontal-sale-banner-260nw-1171773772.jpg",
  ]);

  return (
    <View style={styles.layout}>
      <View style={styles.outline}>
        <FlatList
          data={data}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 20 }}
          onScroll={(e) => {
            const x = e.nativeEvent.contentOffset.x;
            setCurrentIndex((x / width).toFixed(0));
          }}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  width: width,
                  // flex: 1,
                  height: currentIndex == index ? height / 4 + 15 : height / 4,
                  justifyContent: "center",
                  alignItems: "flex-start",
                }}
              >
                <ImageComponent key={index} image={item} />
              </View>
            );
          }}
        />
      </View>

      <View style={styles.dots}>
        {data.map((item, index) => {
          return (
            <View
              key={index}
              style={{
                width: currentIndex == index ? 10 : 8,
                height: currentIndex == index ? 10 : 8,
                borderRadius: currentIndex == index ? 5 : 4,
                backgroundColor:
                  currentIndex == index ? COLORS.orangeText : COLORS.greyText,
                marginLeft: 5,
              }}
            ></View>
          );
        })}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  layout: {
    backgroundColor: "#fff",
    width: "100%",
    // height: undefined,
    aspectRatio: 1.6,
    alignItems: "center",
    justifyContent: "center",
  },
  outline: {
    // backgroundColor: "pink",
    width: "100%",
    // paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  roll: {
    // flex: 1,
    // width: '100%',
    // height: '100%'
  },
  dots: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
});
export default Carousel;
