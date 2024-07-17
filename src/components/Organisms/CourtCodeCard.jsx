import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { COLORS } from "../../theme/colors";
import { formatNumber } from "../../utils";
import { CourtOwnerContext } from "../../context/CourtOwnerContext";

export default function CourtCodeCard({ courtCode, pricePerHour }) {
  const { totalSlot } = useContext(CourtOwnerContext);

  console.log(totalSlot);

  const handleGenerateTotalSlot = () => {
    const data = totalSlot?.filter((item) => item.courtCode == courtCode);

    return data[0]?.slotWithStatusResponses?.length;
  };

  const countBookedSlots = () => {
    let bookedCount = 0;

    const data = totalSlot?.filter((item) => item.courtCode == courtCode);

    // data[0]?.slotWithStatusResponses?.length;

    data?.forEach((response) => {
      response.slotWithStatusResponses.forEach((slot) => {
        if (slot.isBooked) {
          bookedCount++;
        }
      });
    });

    return bookedCount;
  };

  return (
    <View style={styles.container}>
      <View style={styles.upperSection}>
        <Image
          style={styles.upperSectionImage}
          source={require("../../assets/images/Court.png")}
        />
        <View style={styles.upperSectionInfor}>
          <View style={styles.inforItem}>
            <Text style={styles.normalText}>Số sân: </Text>
            <Text style={[styles.boldText]}>Sân {courtCode}</Text>
          </View>

          <View style={[styles.inforItem]}>
            <Text style={styles.normalText}>Giá: </Text>
            <Text style={[styles.boldText]}>{formatNumber(pricePerHour)}đ</Text>
          </View>

          <View style={styles.inforItem}>
            <Text style={styles.normalText}>Khung giờ đã đặt </Text>
            <Text style={[styles.boldText, { color: COLORS.orangeText }]}>
              {0}
              <Text style={{ color: COLORS.black }}>
                /{0}
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 6,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F1F1F1",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  divider: {
    width: "100%",
    backgroundColor: "#E8E8E8",
    height: 1,
  },

  upperSection: {
    flexDirection: "row",
    gap: 13,
    width: "100%",
  },

  upperSectionImage: {
    width: 74,
    height: undefined,
    aspectRatio: 74 / 77,
    borderRadius: 6,
  },

  upperSectionInfor: {
    flex: 1,
    gap: 10,
  },

  inforItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  normalText: {
    fontFamily: "quicksand-regular",
    fontSize: 14,
    lineHeight: 18,
  },

  inforItemStatus: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 13,
  },

  boldText: {
    fontFamily: "quicksand-semibold",
    fontSize: 14,
    lineHeight: 18,
  },
});
