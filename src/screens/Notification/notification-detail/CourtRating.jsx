import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import icons from "../../../constants/icons";
import { SIZE } from "../../../theme/fonts";
import images from "../../../constants/images";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState } from "react";
import CustomButton from "../../../components/Atoms/CustomButton";

const suggestedReviews = [
  "Chất lượng sân tốt",
  "Nhân viên nhiệt tình chu đáo",
  "Vệ sinh sạch sẽ",
  "Dịch vụ tại sân đầy đủ tiện nghi",
  "Không gian thoáng mát",
  "Địa điểm thích hợp",
];

const starPos = [1, 2, 3, 4, 5];

const CourtRating = () => {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const [reviews, setReviews] = useState([]);
  const [star, setStar] = useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.hLeft}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Image source={icons.goback} style={styles.goback} />
          </TouchableOpacity>
          <Text style={styles.title}>Đánh giá</Text>
        </View>
        <CustomButton
          title={"Lưu"}
          backgroundColor={"#FF8A00"}
          color={"white"}
          py={8}
          px={18}
        />
      </View>
      <KeyboardAwareScrollView contentContainerStyle={{}}>
        <Text style={styles.ask}>
          Trải nghiệm chơi của bạn ở địa điểm này như thế nào?
        </Text>
        <View style={{ paddingHorizontal: 12 }}>
          <View style={[styles.locationContainer, { width: width - 24 }]}>
            <Image source={images.map} style={[styles.map]} />
            <View style={styles.courtInfo}>
              <View style={styles.ciHeader}>
                <Text style={styles.courtName}>Sân cầu lông Sơn Tạ</Text>
              </View>
              <Text style={styles.courtAddress}>
                313/7 Phan Huy Ích, Phường 12, Gò Vấp, Thành phố Hồ Chí Minh
              </Text>
              <View style={styles.lFooter}>
                <Text style={styles.timeStamp}>Đã đặt vào T3, 01 Th4 2024</Text>
                <View style={styles.bookInfo}>
                  <View style={styles.bulletContainer}>
                    <View style={styles.bullet}></View>
                    <Text style={styles.timeSlot}>2 khung giờ</Text>
                  </View>
                  <View style={styles.bulletContainer}>
                    <View style={styles.bullet}></View>
                    <Text style={styles.courtAmount}>2 sân</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>Điểm đánh giá</Text>
            <View style={styles.rating}>
              {starPos.map((pos) => (
                <TouchableOpacity key={pos} onPress={() => console.log(pos)}>
                  <MaterialCommunityIcons
                    name="star"
                    size={50}
                    color={"#E1EAEA"}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.suggestContainer}>
              {suggestedReviews.map((review) => (
                <TouchableOpacity
                  style={styles.suggestItem}
                  activeOpacity={0.7}
                >
                  <Text style={styles.suggestedReviewText}>{review}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={styles.commentContainer}>
            <Text style={styles.commentText}>Lời nhận xét</Text>
            <TextInput style={styles.commentInput} multiline={true} />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default CourtRating;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: SIZE.size_20,
    fontFamily: "quicksand-bold",
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  hLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  goback: {
    width: 28,
    height: 28,
  },
  ask: {
    fontSize: SIZE.size_16,
    fontFamily: "quicksand-semibold",
    paddingHorizontal: 20,
    textAlign: "center",
    marginBottom: 20,
  },
  locationContainer: {
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 10,
  },
  map: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: "100%",
  },
  courtInfo: {
    paddingHorizontal: 15,
    marginTop: 10,
    marginBottom: 15,
  },
  courtName: {
    // marginBottom: 8,
    fontSize: SIZE.size_14,
    fontFamily: "quicksand-semibold",
  },
  courtAddress: {
    fontSize: SIZE.size_12,
    fontFamily: "quicksand-medium",
  },
  ciHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  bookInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  timeSlot: {
    fontSize: SIZE.size_12,
    fontFamily: "quicksand-semibold",
    color: "#2A9083",
  },
  courtAmount: {
    fontSize: SIZE.size_12,
    fontFamily: "quicksand-semibold",
    color: "#2A9083",
  },
  lFooter: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  timeStamp: {
    fontSize: SIZE.size_12,
    fontFamily: "quicksand-semibold",
    color: "#8C8C8C",
  },
  bullet: {
    width: 6,
    height: 6,
    backgroundColor: "#2A9083",
    borderRadius: 10,
  },
  bulletContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  ratingContainer: {
    marginTop: 20,
    paddingHorizontal: 12,
  },
  ratingText: {
    fontSize: SIZE.size_16,
    fontFamily: "quicksand-semibold",
    marginBottom: 10,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  commentContainer: {
    marginTop: 20,
    paddingHorizontal: 12,
    marginBottom: 30,
  },
  commentText: {
    fontSize: SIZE.size_16,
    fontFamily: "quicksand-semibold",
    marginBottom: 10,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 10,
    padding: 10,
    height: 100,
    textAlignVertical: "top",
  },
  suggestContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 10,
    justifyContent: "center",
  },
  suggestItem: {
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 10,
    padding: 10,
  },
  suggestedReviewText: {
    fontSize: SIZE.size_12,
    fontFamily: "quicksand-medium",
  },
});