import { refresh_tokens } from "@/service/apiInterceptors";
import { SOCKET_URL } from "@/service/config";
import { tokenStorage } from "@/service/storage";
import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";

interface WSService {
  emit: (event: string, data?: unknown) => void;
  on: (event: string, cb: (data: any) => void) => void;
  off: (event: string, cb?: (data: any) => void) => void;
  disconnect: () => void;
  reconnect: () => Promise<void>;
}

const WSContext = createContext<WSService | null>(null);

export const WSProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const socketRef = useRef<Socket | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const token = tokenStorage.getString("accessToken");
    setAccessToken(token ?? null);
  }, []);

  const reconnect = async () => {
    try {
      await refresh_tokens();

      const newToken = tokenStorage.getString("accessToken");

      if (!newToken) return;

      socketRef.current?.disconnect();
      socketRef.current = null;

      setAccessToken(newToken);
    } catch (err) {
      console.error("Socket token refresh failed", err);
    }
  };

  useEffect(() => {
    if (!accessToken || socketRef.current) return;

    socketRef.current = io(SOCKET_URL, {
      transports: ["websocket"],
      autoConnect: true,
      auth: {
        token: accessToken,
      },
    });

    socketRef.current.on("connect", () => {
      console.log("Socket connected:", socketRef.current?.id);
    });

    socketRef.current.on("connect_error", async (error) => {
      console.log("Socket connect error:", error.message);

      if (error.message.toLowerCase().includes("auth")) {
        await reconnect();
      }
    });

    return () => {
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, [accessToken]);

  const emit = (event: string, data?: unknown) => {
    socketRef.current?.emit(event, data);
  };

  const on = (event: string, cb: (data: any) => void) => {
    socketRef.current?.off(event, cb);
    socketRef.current?.on(event, cb);
  };

  const off = (event: string, cb?: (data: any) => void) => {
    socketRef.current?.off(event, cb);
  };

  const disconnect = () => {
    socketRef.current?.disconnect();
    socketRef.current = null;
  };

  const socketService: WSService = {
    emit,
    on,
    off,
    disconnect,
    reconnect,
  };

  return (
    <WSContext.Provider value={socketService}>{children}</WSContext.Provider>
  );
};

export const useWS = (): WSService => {
  const context = useContext(WSContext);
  if (!context) {
    throw new Error("useWS must be used within WSProvider");
  }
  return context;
};
