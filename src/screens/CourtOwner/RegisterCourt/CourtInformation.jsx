import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SIZE } from "../../../theme/fonts";
import InputField from "../../../components/Molecules/InputField";
import { COLORS } from "../../../theme/colors";

export default function CourtInformation({
  courtPriceHoliday,
  setCourtPriceHoliday,
  courtPriceWeekend,
  setCourtPriceWeekend,
  courtPrice,
  setCourtPrice,
  courtQuantity,
  setCourtQuantity,
  courtName,
  setCourtName,
  courtImage,
  setCourtImage,
  courtCloseTime,
  setCourtCloseTime,
  courtOpenTime,
  setCourtOpenTime,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.descriptionText}>
        Để đảm bảo sự và thuận tiện cho việc truy cập và đặt sân cho người chơi,
        hãy cung cấp thêm chi tiết về vị trí sân của bạn.
      </Text>

      <View style={{ gap: 20 }}>
        <InputField
          inputType={"image"}
          primaryText={"Ảnh đại diện sân"}
          inputData={courtImage}
          setInputData={setCourtImage}
        />
        <InputField
          inputType={"normal"}
          primaryText={"Tên sân"}
          placeholderText={"Tên sân"}
          inputData={courtName}
          setInputData={setCourtName}
        />
        <InputField
          inputType={"number"}
          primaryText={"Số lượng sân"}
          inputData={courtQuantity}
          setInputData={setCourtQuantity}
        />
        <View>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <View style={{ flex: 1 }}>
              <InputField
                inputType={"datetime"}
                primaryText={"Giờ mở lượt chơi"}
                iconFamily={"AntDesign"}
                placeholderText={"Giờ"}
                inputData={courtOpenTime}
                setInputData={setCourtOpenTime}
              />
            </View>
            <View style={{ flex: 1 }}>
              <InputField
                inputType={"datetime"}
                primaryText={"Giờ đóng lượt chơi"}
                placeholderText={"Giờ"}
                inputData={courtCloseTime}
                setInputData={setCourtCloseTime}
              />
            </View>
          </View>

          <Text
            style={{
              fontSize: SIZE.size_12,
              fontFamily: "quicksand-semibold",
              color: "#737373",
              marginTop: 20,
            }}
          >
            Lưu ý: Nếu chủ sân có nhu cầu điều chỉnh giá sân vào các dịp lễ hoặc
            cuối tuần (thứ 7 và chủ nhật)
          </Text>
        </View>

        <InputField
          inputType={"icon"}
          iconBackgroundColor={COLORS.white}
          iconText={"đ"}
          primaryText={"Giá thuê sân theo ngày thường"}
          placeholderText={"Giá sân"}
          inputData={courtPrice}
          setInputData={setCourtPrice}
          valueType={"number"}
        />
        <InputField
          inputType={"icon"}
          iconBackgroundColor={COLORS.white}
          iconText={"đ"}
          primaryText={"Giá thuê sân theo cuối tuần"}
          placeholderText={"Giá sân"}
          secondaryText={"nếu có"}
          noteText={
            "Lưu ý: Nếu chủ sân có nhu cầu điều chỉnh giá sân vào các dịp lễ hoặc cuối tuần (thứ 7 và chủ nhật)"
          }
          inputData={courtPriceWeekend}
          setInputData={setCourtPriceWeekend}
          valueType={"number"}
        />
        <InputField
          inputType={"icon"}
          iconBackgroundColor={COLORS.white}
          iconText={"đ"}
          primaryText={"Giá thuê sân theo ngày lễ"}
          placeholderText={"Giá sân"}
          secondaryText={"nếu có"}
          noteText={
            "Lưu ý: Nếu chủ sân có nhu cầu điều chỉnh giá sân vào các dịp lễ"
          }
          inputData={courtPriceHoliday}
          setInputData={setCourtPriceHoliday}
          valueType={"number"}
        />
      </View>

      <Text style={styles.additionText}>
        Sau khi tạo thông tin sân, những thay đổi trên chủ sân có thể cập nhật
        lại trong mục quản lý sân
      </Text>
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

  additionText: {
    fontFamily: "quicksand-semibold",
    fontSize: SIZE.size_12,
    color: "#737373",
    marginTop: 45,
  },
});
