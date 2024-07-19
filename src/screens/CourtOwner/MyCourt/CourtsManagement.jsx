import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import OwnedCourtCard from "../../../components/Organisms/OwnedCourtCard";
import { CourtOwnerContext } from "../../../context/CourtOwnerContext";

export default function CourtsManagement({ navigation }) {
  const { courtCodeList } = useContext(CourtOwnerContext);

  console.log(courtCodeList);

  // const courtList = [
  //   {
  //     id: 1,
  //     isActive: true,
  //     revenue: 12000000,
  //     bookedSlot: 12,
  //     totalSlot: 20,
  //   },
  //   {
  //     id: 2,
  //     isActive: false,
  //     revenue: 4000000,
  //     bookedSlot: 12,
  //     totalSlot: 20,
  //   },
  //   {
  //     id: 3,
  //     isActive: true,
  //     revenue: 17112003,
  //     bookedSlot: 12,
  //     totalSlot: 25,
  //   },
  // ];

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 20 }}
        data={courtCodeList}
        renderItem={({ item }) => {
          return (
            <OwnedCourtCard
              isActive={item?.isActive ?? true}
              courtId={item?.id}
              revenue={item?.revenue}
              bookedSlot={item?.bookedSlot}
              courtCode={item?.courtCode}
              navigation={navigation}
              action={"ABCD"}
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
  },
});