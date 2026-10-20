import { refresh_tokens } from "@/service/apiInterceptors";
import { tokenStorage } from "@/service/storage";
import { commonStyles } from "@/styles/commonStyles";
import { splashStyles } from "@/styles/splashStyles";
import { resetAndNavigate } from "@/utils/Helpers";
import { useFonts } from "expo-font";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { Alert, Image, View } from "react-native";

interface DecodedToken {
  exp: number;
}

const Page = () => {
  const [loaded] = useFonts({
    Bold: require("../assets/fonts/Poppins-Bold.ttf"),
    Regular: require("../assets/fonts/Poppins-Regular.ttf"),
    Medium: require("../assets/fonts/Poppins-Medium.ttf"),
    Light: require("../assets/fonts/Poppins-Light.ttf"),
    SemiBold: require("../assets/fonts/Poppins-SemiBold.ttf"),
  });

  const checkAuth = async () => {
    try {
      const accessToken = tokenStorage.getString("accessToken");
      const refreshToken = tokenStorage.getString("refreshToken");

      if (!accessToken || !refreshToken) {
        resetAndNavigate("/auth");
        return;
      }

      const currentTime = Date.now() / 1000;

      const refreshDecoded = jwtDecode<DecodedToken>(refreshToken);
      if (refreshDecoded.exp < currentTime) {
        Alert.alert("Session Expired", "Please login again");
        tokenStorage.clearAll();
        resetAndNavigate("/auth");
        return;
      }

      const accessDecoded = jwtDecode<DecodedToken>(accessToken);
      if (accessDecoded.exp < currentTime) {
        const refreshed = await refresh_tokens();
        if (!refreshed) {
          resetAndNavigate("/auth");
          return;
        }
      }
      resetAndNavigate("/home");
    } catch {
      tokenStorage.clearAll();
      resetAndNavigate("/auth");
    }
  };

  useEffect(() => {
    if (loaded) checkAuth();
  }, [loaded]);

  return (
    <View style={commonStyles.container}>
      <Image
        style={splashStyles.img}
        source={require("@/assets/images/logo_t.png")}
      />
    </View>
  );
};

export default Page;
