import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import { StyleSheet, Text, View } from "react-native";
import { LoadingProvider } from "./src/context/LoadingContext";
import { CourtOwnerProvider } from "./src/context/CourtOwnerContext";
import FontLoader from "./src/components/FontLoader";
import { SafeAreaView } from "react-native-safe-area-context";
import Navigation from "./src/navigation/Navigation";
import { AuthProvider } from "./src/context/AuthContext";
import { COLORS } from "./src/theme/colors";

export default function App() {
  return (
    <NativeBaseProvider>
      <LoadingProvider>
        <AuthProvider>
          <CourtOwnerProvider>
            <FontLoader>
              <SafeAreaView style={styles.safeContainer}>
                <Navigation />
                <StatusBar />
              </SafeAreaView>
            </FontLoader>
          </CourtOwnerProvider>
        </AuthProvider>
      </LoadingProvider>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: COLORS.black,
  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingHorizontal: 15,
  },
});
