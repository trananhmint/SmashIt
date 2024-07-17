import React from "react";
import Chip from "../Atoms/Chip";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";

const ChipList = ({
  dataList,
  backgroundColor,
  borderColor,
  textColor,
  textFamily,
  action,
  chipType,
  isHorizontal,
  chosenData,
  setChosenData,
  listStyle,
  borderRadius,
  chipStyle,
  switchColor
}) => {
  console.log("dudoug", dataList);

  if (switchColor) {
    return (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        horizontal={isHorizontal}
        contentContainerStyle={[
          isHorizontal ? styles.horizontal : styles.vertical,
          listStyle,
        ]}
      >
        {dataList.map((item, index) => (
          <View key={index}>
            <Chip
              borderColor={borderColor}
              text={item.timeFrame}
              backgroundColor={backgroundColor}
              textFamily={textFamily}
              textColor={textColor}
              borderRadius={borderRadius}
              action={action}
              chipType={chipType}
              chosenData={chosenData}
              setChosenData={setChosenData}
              chipStyle={chipStyle}
            />
          </View>
        ))}
      </ScrollView>
    );
  } else {
    return (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        horizontal={isHorizontal}
        contentContainerStyle={[
          isHorizontal ? styles.horizontal : styles.vertical,
          listStyle,
        ]}
      >
        {dataList.map((item, index) => (
          <View key={index}>
            <Chip
              borderColor={borderColor}
              text={item}
              backgroundColor={backgroundColor}
              textFamily={textFamily}
              textColor={textColor}
              borderRadius={borderRadius}
              action={action}
              chipType={chipType}
              chosenData={chosenData}
              setChosenData={setChosenData}
              chipStyle={chipStyle}
            />
          </View>
        ))}
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  chipList: {
    display: "flex",
    flexDirection: "row",
  },

  vertical: {
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: 4,
    rowGap: 10,
  },
  horizontal: {
    gap: 10,
  },
});

export default ChipList;