import { createMMKV } from "react-native-mmkv";

export const tokenStorage = createMMKV({
  id: "token-storage",
  encryptionKey: "my-token-secret",
});

export const storage = createMMKV({
  id: "app-storage",
  encryptionKey: "my-app-secret",
});

export const mmkvStorage = {
  setItem: (name: string, value: string) => {
    storage.set(name, value);
  },
  getItem: (name: string) => {
    const value = storage.getString(name);
    return value ?? null;
  },
  removeItem: (name: string) => {
    storage.remove(name);
  },
};
