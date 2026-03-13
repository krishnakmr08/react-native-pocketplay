import { createMMKV } from "react-native-mmkv";

export const tokenStorage = createMMKV({
  id: "token-storage",
  encryptionKey: "some-secret-key",
});

export const storage = createMMKV({
  id: "my-app-storage",
  encryptionKey: "some-secret-key",
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
