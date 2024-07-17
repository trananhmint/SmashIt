import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { SIZE, WEIGHT } from "../../theme/fonts";
import { COLORS } from "../../theme/colors";
import { useFonts } from "expo-font";
import AntDesign from "react-native-vector-icons/AntDesign";
import { formatNumber } from "../../utils";
import { CourtOwnerContext } from "../../context/CourtOwnerContext";

// TODO: Wait For API than continue

export default function OwnedCourtCard({
  navigation,
  courtCode,
  isActive,
  courtId,
  revenue,
  bookedSlot,
  action,
}) {
  const { totalSlot } = useContext(CourtOwnerContext);

  const handleGenerateTotalSlot = () => {
    const data = totalSlot?.filter((item) => item.courtCode === courtCode);

    return data[0]?.slotWithStatusResponses?.length;
  };

  const countBookedSlots = () => {
    let bookedCount = 0;

    const data = totalSlot?.filter((item) => item.courtCode === courtCode);

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
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.5}
      onPress={() =>
        navigation.navigate("CourtCodeManagement", {
          courtCode: courtCode,
          courtCodeId: courtId,
        })
      }
    >
      <View style={styles.upperSection}>
        <Image
          style={styles.upperSectionImage}
          source={require("../../assets/images/Court.png")}
        />
        <View style={styles.upperSectionInfor}>
          <View style={styles.inforItemStatus}>
            <Text style={[styles.boldText, { fontSize: 14 }]}>
              Sân {courtCode}
            </Text>
            <View
              style={
                isActive ? styles.itemStatusActive : styles.itemStatusInActive
              }
            >
              <Text
                style={[
                  styles.boldText,
                  isActive
                    ? { color: COLORS.chipGreenText }
                    : { color: COLORS.greyText },
                ]}
              >
                {isActive ? "Hoạt động" : "Đã đóng"}
              </Text>
            </View>
          </View>

          <View style={[styles.inforItem, { marginBottom: 10 }]}>
            <Text style={styles.normalText}>Doanh thu</Text>
            <Text style={[styles.normalText, { color: COLORS.darkGreenText }]}>
              {/* {formatNumber(revenue)}d */}
              {formatNumber(100000)}d
            </Text>
          </View>

          <View style={styles.inforItem}>
            <Text style={styles.normalText}>Khung giờ đã đặt </Text>
            <Text style={[styles.normalText, { color: COLORS.darkGreenText }]}>
              {countBookedSlots()}/{handleGenerateTotalSlot()}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.divider}></View>

      <View style={styles.bottomSection}>
        <View style={styles.notification}>
          <View style={styles.notificationLeft}>
            <View style={styles.circle}></View>
            <Text style={[styles.normalText, { fontSize: 12 }]}>
              Bạn có 1 lượt đặt sân mới
            </Text>
          </View>
          <View>
            <AntDesign name="right" size={12} />
          </View>
        </View>
        <View>
          {action &&
            (isActive ? (
              <TouchableOpacity style={styles.buttonActive}>
                <Text style={styles.buttonTextActive}>Đóng sân</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.buttonInactive}>
                <Text style={styles.buttonTextInactive}>Mở Sân</Text>
              </TouchableOpacity>
            ))}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexShrink: 0,
    borderRadius: 6,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#E8E8E8",
    padding: 20,
  },

  divider: {
    width: "100%",
    backgroundColor: "#E8E8E8",
    height: 1,
  },

  upperSection: {
    flexDirection: "row",
    gap: 9,
    width: "100%",
    marginBottom: 15,
  },

  upperSectionImage: {
    width: 96,
    height: 87,
    borderRadius: 6,
  },

  upperSectionInfor: {
    flex: 1,
    marginTop: -3,
  },

  inforItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  normalText: {
    fontFamily: "quicksand-medium",
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
    fontSize: 12,
    lineHeight: 18,
  },

  itemStatusActive: {
    backgroundColor: COLORS.chipGreenBackGround,
    paddingVertical: 5,
    paddingHorizontal: 18,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  itemStatusInActive: {
    backgroundColor: COLORS.greyBackground,
    paddingVertical: 5,
    paddingHorizontal: 18,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  bottomSection: {
    marginTop: 17,
  },

  notification: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 22,
  },

  notificationLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  circle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.orangeText,
    marginTop: 4.5,
  },

  buttonActive: {
    width: "100%",
    backgroundColor: COLORS.greyBackground,
    height: 41,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
  },

  buttonTextActive: {
    fontFamily: "quicksand-bold",
    fontSize: 14,
    lineHeight: 18,
    color: COLORS.greyText,
  },

  buttonInactive: {
    width: "100%",
    backgroundColor: COLORS.chipGreenBackGround,
    height: 41,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
  },

  buttonTextInactive: {
    fontFamily: "quicksand-bold",
    fontSize: 14,
    lineHeight: 18,
    color: COLORS.chipGreenText,
  },
});
