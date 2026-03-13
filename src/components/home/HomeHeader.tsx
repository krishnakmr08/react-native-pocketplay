import { useWS } from "@/context/WSContext";
import { logoutFromApp } from "@/service/authService";
import { commonStyles } from "@/styles/commonStyles";
import { Colors } from "@/utils/Constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

const HomeHeader = () => {
  const { disconnect } = useWS();
  return (
    <View>
      <SafeAreaView />
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => logoutFromApp(disconnect)}>
          <Image
            source={require("@/assets/images/logo_t.png")}
            style={styles.logo}
          />
        </TouchableOpacity>
        <View style={commonStyles.rowGap}>
          <Ionicons name="search-outline" size={24} color={Colors.text} />
          <Ionicons
            name="notifications-outline"
            size={24}
            color={Colors.text}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    width: "100%",
    justifyContent: "space-between",
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
});

export default HomeHeader;
