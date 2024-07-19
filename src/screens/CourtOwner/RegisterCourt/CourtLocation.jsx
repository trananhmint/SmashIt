import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SIZE } from "../../../theme/fonts";
import InputField from "../../../components/Molecules/InputField";
import { COLORS } from "../../../theme/colors";

// TODO: Change to Input with Icon

export default function CourtLocation({ courtAddress, setCourtAddress }) {
  return (
    <View style={styles.container}>
      <Text style={styles.descriptionText}>
        Để đảm bảo sự và thuận tiện cho việc truy cập và đặt sân cho người chơi,
        hãy cung cấp thêm chi tiết về vị trí sân của bạn.
      </Text>

      <View>
        <InputField
          inputType={"icon"}
          iconFamily={"Feather"}
          iconName={"map"}
          iconSize={20}
          iconBackgroundColor={COLORS.orangeText}
          iconColor={COLORS.white}
          primaryText={"Địa điểm kinh doanh"}
          placeholderText={"Địa điểm sân"}
          inputData={courtAddress}
          setInputData={setCourtAddress}
        />
      </View>

      {/* <View style={styles.locationSection}>
        <View style={styles.locationItem}>
          <Text style={styles.primaryText}>41 Bình Trưng Tây</Text>
          <Text style={styles.secondayText}>
            41 Đường 41, Phường Bình Trưng Tây, Quận 2, Thành phố Hồ Chí Minh
          </Text>
        </View>
        <View>
          <Text style={styles.primaryText}>41 Bình Trưng Tây</Text>
          <Text style={styles.secondayText}>
            41 Đường 41, Phường Bình Trưng Tây, Quận 2, Thành phố Hồ Chí Minh
          </Text>
        </View>
        <View>
          <Text style={styles.primaryText}>41 Bình Trưng Tây</Text>
          <Text style={styles.secondayText}>
            41 Đường 41, Phường Bình Trưng Tây, Quận 2, Thành phố Hồ Chí Minh
          </Text>
        </View>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  descriptionText: {
    fontSize: SIZE.size_14,
    fontFamily: "quicksand-medium",
    marginBottom: 30,
  },

  locationSection: {
    marginTop: 15,
    paddingRight: 50,
    paddingLeft: 8,
    gap: 20,
  },

  locationItem: {
    paddingBottom: 20,
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
  },

  primaryText: {
    fontSize: SIZE.size_14,
    fontFamily: "quicksand-semibold",
    marginBottom: 5,
  },

  secondayText: {
    fontSize: SIZE.size_12,
    fontFamily: "quicksand-regular",
    lineHeight: 22,
  },
});
