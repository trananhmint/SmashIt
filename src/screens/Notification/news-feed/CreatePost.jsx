import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useContext } from "react";
// import { TextField } from "native-base";
import icons from "../../../constants/icons";
import CustomButton from "../../../components/Atoms/CustomButton";
import { SIZE } from "../../../theme/fonts";
import images from "../../../constants/images";
import { AuthContext } from "../../../context/AuthContext";
import { COLORS } from "../../../theme/colors";

const CreatePost = ({ navigation }) => {
  const { user } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View style={styles.stack}>
        <View style={styles.title}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}
          >
            <Image source={icons.goback} style={styles.goback} />
          </TouchableOpacity>
          <Text style={styles.titleText}>Bài viết mới</Text>
        </View>
        <CustomButton
          title={"Đăng bài"}
          backgroundColor={COLORS.orangeText}
          px={28}
          py={10}
          color={"white"}
          fontFamily={"quicksand-bold"}
          handlePress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.postContainer}>
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Image source={images.avatar} style={styles.avatar} />
            <Text style={styles.userName}>{user?.fullName}</Text>
          </View>
          <Text>0/100</Text>
        </View>
        <TextInput
          placeholder="Hãy viết cảm nghĩ của bạn"
          style={styles.input}
          multiline={true}
        />
        <View style={styles.iconContainer}>
          <Image source={icons.uploadImg} style={styles.actionIcon} />
          <Image source={icons.uploadVideo} style={styles.actionIcon} />
        </View>
      </View>
    </View>
  );
};

export default CreatePost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  stack: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  titleText: {
    fontSize: SIZE.size_20,
    fontFamily: "quicksand-bold",
  },
  goback: {
    width: 28,
    height: 28,
  },
  postContainer: {
    marginTop: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  avatar: {
    width: 35,
    height: 35,
  },
  userName: {
    fontSize: SIZE.size_14,
    fontFamily: "quicksand-bold",
  },
  input: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  iconContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginTop: 15,
    gap: 20,
  },
  actionIcon: {
    width: 23,
    height: 23,
  },
});