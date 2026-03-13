import { useAuthStore } from "@/store/authStore";
import { usePlayStore } from "@/store/playStore";
import { resetAndNavigate } from "@/utils/Helpers";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import axios from "axios";
import { BASE_URL } from "./config";
import { tokenStorage } from "./storage";

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
  iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
  offlineAccess: false,
});

export const signInWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    await GoogleSignin.signOut();

    const res = await GoogleSignin.signIn();
    return res.data?.idToken ?? null;
  } catch (error) {
    console.log("GOOGLE SIGN-IN ERROR:", error);
    return null;
  }
};

export const login = async (
  idToken: string | null,
  updateAccessToken: () => void,
) => {
  try {
    if (!idToken) return false;

    const response = await axios.post(`${BASE_URL}/auth/login`, {
      id_token: idToken,
    });

    const { tokens, user } = response.data;

    tokenStorage.set("accessToken", tokens.access_token);
    tokenStorage.set("refreshToken", tokens.refresh_token);

    useAuthStore.getState().setUser(user);

    updateAccessToken();

    return true;
  } catch (error) {
    console.log("Login error:", error);
    return false;
  }
};

export const logoutFromApp = async (disconnect: () => void) => {
  try {
    disconnect();

    useAuthStore.getState().logout();
    usePlayStore.getState().clearData();

    tokenStorage.clearAll();

    resetAndNavigate("/auth");

    console.log("LOGGED OUT AND WEBSOCKET DISCONNECTED");
  } catch (error) {
    console.log("Logout error:", error);
  }
};
