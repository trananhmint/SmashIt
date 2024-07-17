import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import courtImages from "../../../assets/images/courtImages.jpg";
import { COLORS } from "../../../theme/colors";
import { SIZE } from "../../../theme/fonts";
import { METRICS } from "../../../theme/metrics";
import Comment from "../../../components/Organisms/Comment";
import StarRating from "react-native-star-rating-widget";
import ChipList from "../../../components/Molecules/ChipList";
import StepDot from "../../../components/Molecules/StepDot";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import CourtService from "../../../services/court.service";
import VectorIcon from "../../../components/Atoms/VectorIcon";
import { AuthContext } from "../../../context/AuthContext";
import { formatNumber } from "../../../utils";
import ServiceCourtService from "../../../services/court-service.service";
import Loading from "../../../components/Molecules/Loading";

const CourtDetail = () => {
  const route = useRoute();
  const courtId = Number(route.params.badmintonCourtId);
  const [court, setCourt] = useState({});

  const [isLoading, setIsLoading] = useState(true);

  const [courtService, setCourtService] = useState({});
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { token } = useContext(AuthContext);

  const fetchServiceList = async () => {
    const res = await ServiceCourtService.getCourtServiceByCourtId(
      courtId,
      token
    );

    if (res) {
      setCourtService(res.services);
      setIsLoadingService(false);
    }
  };

  useEffect(() => {
    const fetchCourt = async () => {
      const res = await CourtService.getCourtById(token, courtId);
      if (res) {
        setCourt(res);
      } else {
        navigation.navigate("Search");
      }

      setIsLoading(false);
    };
    if (isFocused) {
      fetchCourt();
    }
  }, [isFocused, token, courtId, navigation]);

  const commentList = [
    {
      id: 1,
      name: "NNN",
      comment:
        "  App tuyệt nhất chưa từng thấy, nó giúp tôi đặt sân nhanh chóng và dễ dàng",
      starRating: 2,
      date: "20111031",
    },
    {
      id: 2,
      name: "NNN",
      comment:
        "  App tuyệt nhất chưa từng thấy, nó giúp tôi đặt sân nhanh chóng và dễ dàng",
      starRating: 3,
      date: "20111031",
    },
  ];

  const conditionList = [
    "Đặt sân theo giờ cố định và thông báo trước để tránh xung đột về thời gian.",
    "Tuân theo giờ đã đặt và không sử dụng sân lâu hơn thời gian đã định",
    "Mặc trang phục thích hợp và giày thể thao không làm hỏng bề mặt sân.",
    "Giữ sân sạch sẽ và không làm hỏng hạng mục cầu lông hoặc cơ sở vật chất.",
  ];

  const courtImageList = [1, 1, 1, 1];
  const feedback = [1, 1, 1, 1, 1];
  const [favorite, setFavorite] = useState(true);
  const heart = favorite === true ? "heart" : "hearto";
  const [step, setStep] = useState(1);
  const navigator = useNavigation();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={{ flex: 1, marginBottom: 20 }}>
      <ScrollView style={styles.container}>
        <View style={styles.courtImagesContainer}>
          <View style={{ position: "relative" }}>
            <ScrollView
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={(e) => {
                const x = e.nativeEvent.contentOffset.x;
                setStep(x.toFixed(0));

                // console.log(step);
              }}
              horizontal
              style={styles.courtImages}
            >
              {courtImageList.map((court, index) => {
                return (
                  <View key={index} style={styles.courtImage}>
                    <Image style={styles.image} source={courtImages} />
                  </View>
                );
              })}
            </ScrollView>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigator.goBack();
            }}
            style={styles.goBack}
          >
            <VectorIcon.AntDesign
              name="leftcircle"
              size={30}
              color={COLORS.white}
            />
          </TouchableOpacity>
          <View style={styles.dots}>
            <StepDot currentStep={step} quantity={4} />
          </View>
        </View>
        <View style={styles.courtDetail}>
          <View>
            <VectorIcon.AntDesign />
            <Text style={styles.title}>Sân cầu lông {court.courtName}</Text>
          </View>
          <Text style={styles.mediumText}>{court.address}</Text>
          <View style={styles.courtMoreDetail}>
            <View style={styles.rating}>
              <StarRating
                rating={4}
                onChange={() => {}}
                starSize={15}
                starStyle={{
                  marginHorizontal: 1,
                  marginTop: 1.5,
                }}
              />
              <Text style={[styles.mediumText, { fontSize: SIZE.size_12 }]}>
                5.0
              </Text>
            </View>
            <Text style={[styles.mediumText, { fontSize: SIZE.size_12 }]}>
              (100 lượt đặt)
            </Text>
            <View style={styles.hr} />
            <Text style={[styles.mediumText, { fontSize: SIZE.size_12 }]}>
              Cách bạn 5.6km
            </Text>
            <TouchableOpacity
              onPress={() => {
                setFavorite(!favorite);
              }}
            >
              <VectorIcon.AntDesign name={heart} size={20} color={"red"} />
            </TouchableOpacity>
          </View>
          <Text
            style={{
              fontFamily: "quicksand-medium",
              color: "#E74B3D",
              fontSize: SIZE.size_12,
            }}
          >
            <Text style={{ fontFamily: "quicksand-bold" }}>Đóng cửa. </Text>
            Bạn có thể đặt trước cho lượt chơi sau 05:00
          </Text>
        </View>
        <View style={styles.courtOwner}>
          <Text style={styles.title}>Thông tin chủ sân</Text>
          <View style={styles.courtOwnerInfo}>
            <View style={styles.avatar}>
              <Image
                style={styles.avatarImage}
                source={{ uri: "https://avatar.iran.liara.run/public/boy" }}
              />
            </View>
            <View style={{ gap: 5 }}>
              <Text style={{ fontFamily: "quicksand-semibold" }}>
                {court.owner}
              </Text>
              <Text style={styles.content}>{court.phoneNumber}</Text>
            </View>
          </View>
        </View>
        <View style={styles.infrastructure}>
          <Text style={styles.title}>Cơ sở vật chất</Text>
          <View style={styles.chip}>
            <ChipList
              dataList={court.serviceCourts ? court.serviceCourts : []}
              borderColor={"#D9D9D9"}
              textFamily={"quicksand-regular"}
            />
          </View>
        </View>
        <View style={styles.rule}>
          <Text style={[styles.title, { marginBottom: 10 }]}>
            Quy định sử dụng sân
          </Text>
          <View style={{ flex: 1, gap: 5, paddingHorizontal: 5 }}>
            {conditionList.map((data, index) => {
              return (
                <View key={index} style={{ flexDirection: "row", gap: 8 }}>
                  <Text>{"\u2022"}</Text>
                  <Text style={styles.conditionText}>{data}</Text>
                </View>
              );
            })}
          </View>
        </View>
        <View style={styles.feedback}>
          <Text style={[styles.title]}>Nhận xét ({commentList.length})</Text>
          {commentList.map((comment, index) => {
            return (
              <View key={index} style={{ gap: 15, flex: 1 }}>
                <Comment
                  comment={comment.comment}
                  date={comment.date}
                  name={comment.name}
                  starRating={comment.starRating}
                />
                {/* <View style={styles.hr} /> */}
              </View>
            );
          })}
        </View>
      </ScrollView>
      <View style={styles.bottomTab}>
        <View style={styles.bookingInfo}>
          <Text style={styles.price}>
            {/* <Text style={styles.oldPrice}>110.000đ</Text>{" "} */}
            <Text style={styles.newPrice}>
              {formatNumber(court.pricePerHour)}đ
            </Text>
            /giờ
          </Text>
          {/* <Text style={styles.voucher}>Đã áp dụng voucher</Text> */}
        </View>
        <View style={styles.bookingButton}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("BookingCourt", {
                badmintonCourtId: court.id,
              });
            }}
            style={styles.button}
          >
            <VectorIcon.Feather
              name="calendar"
              color={COLORS.white}
              size={20}
            />
            <Text style={styles.button_Text}>Đặt sân</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: METRICS.screenWidth,
    height: METRICS.screenHeight,
    display: "flex",
    flexDirection: "column",
    flex: 1,
    position: "relative",
    marginBottom: 40,
  },
  courtImagesContainer: {
    width: "100%",
    aspectRatio: 1.6,
  },
  courtImages: {
    display: "flex",
    flexDirection: "row",
  },
  courtImage: {
    display: "flex",
    aspectRatio: 1.6,
    height: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  goBack: {
    position: "absolute",
    top: 15,
    left: 15,
    elevation: 10,
  },
  dots: {
    position: "absolute",
    width: "100%",
    display: "flex",
    bottom: 10,
    alignItems: "center",
  },
  courtDetail: {
    width: "100%",
    aspectRatio: 2.5,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    backgroundColor: COLORS.white,
    paddingHorizontal: 12,
    paddingBottom: 14,
    marginBottom: 5,
  },
  courtMoreDetail: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  rating: {
    display: "flex",
    flexDirection: "row",
    gap: 4,
    justifyContent: "center",
  },
  hr: {
    borderWidth: 1,
    borderColor: COLORS.darkGreyBorder,
    // height: "100%",
    // marginHorizontal
  },
  title: {
    fontFamily: "quicksand-bold",
    fontSize: SIZE.size_16,
  },
  content: {
    fontFamily: "quicksand-regular",
    fontSize: SIZE.size_12,
  },
  conditionText: {
    fontSize: SIZE.size_14,
    fontFamily: "quicksand-regular",
    flex: 1,
  },
  courtOwner: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 5,
    width: "100%",
    aspectRatio: 4,
  },
  courtOwnerInfo: {
    height: "80%",
    display: "flex",
    flexDirection: "row",
    gap: 10,
    paddingVertical: 10,
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  avatar: {
    height: "100%",
    aspectRatio: 1,
  },
  avatarImage: {
    height: "100%",
    width: "100%",
  },
  infrastructure: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 5,
    gap: 10,
  },
  rule: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 5,
  },
  feedback: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 15,
    flex: 1,
  },
  comment: {
    marginBottom: 10,
  },

  mediumText: {
    fontFamily: "quicksand-medium",
    fontSize: SIZE.size_14,
  },
  bottomTab: {
    position: "absolute",
    height: 85,
    backgroundColor: COLORS.white,
    width: "100%",
    bottom: -20,
    display: "flex",
    flexDirection: "row",
    elevation: 10,
    paddingHorizontal: 12,
  },
  bookingInfo: {
    width: "60%",
    display: "flex",
    justifyContent: "center",
    gap: 10,
  },
  price: {
    fontFamily: "quicksand-semibold",
    color: COLORS.greyText,
  },
  oldPrice: {
    textDecorationLine: "line-through",
  },
  newPrice: {
    fontFamily: "quicksand-bold",
    color: COLORS.darkGreenText,
    fontSize: SIZE.size_18,
  },
  voucher: {
    fontFamily: "quicksand-semibold",
    color: COLORS.greyText,
  },
  bookingButton: {
    width: "40%",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: COLORS.orangeText,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  button_Text: {
    fontFamily: "quicksand-bold",
    fontSize: SIZE.size_18,
    color: COLORS.white,
  },
});

export default CourtDetail;
