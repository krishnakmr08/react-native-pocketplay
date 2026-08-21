import { refresh_tokens } from "@/service/apiInterceptors";
import { SOCKET_URL } from "@/service/config";
import { tokenStorage } from "@/service/storage";
import React, {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";

interface WSService {
  emit: (event: string, data?: unknown) => void;
  on: (event: string, callback: (data: unknown) => void) => void;
  off: (event: string, callback?: (data: unknown) => void) => void;
  disconnect: () => void;
  refreshAndReconnectSocket: () => Promise<void>;
}

interface WSProviderProps {
  children: ReactNode;
}

const WSContext = createContext<WSService | null>(null);

export const WSProvider: FC<WSProviderProps> = ({ children }) => {
  const socketRef = useRef<Socket | null>(null);
  const isRefreshingRef = useRef(false);

  const [accessToken, setAccessToken] = useState<string | null>(null);

  // Get access token when provider mounts
  useEffect(() => {
    const token = tokenStorage.getString("accessToken");

    setAccessToken(token ?? null);
  }, []);

  // Refresh token and reconnect socket
  const refreshAndReconnectSocket = useCallback(async (): Promise<void> => {
    if (isRefreshingRef.current) {
      return;
    }

    isRefreshingRef.current = true;

    try {
      await refresh_tokens();

      const newToken = tokenStorage.getString("accessToken");

      if (!newToken) {
        return;
      }

      // Disconnect old socket
      socketRef.current?.disconnect();
      socketRef.current = null;

      // Updating token triggers socket recreation
      setAccessToken(newToken);
    } catch (error: unknown) {
      console.error("Socket token refresh failed:", error);
    } finally {
      isRefreshingRef.current = false;
    }
  }, []);

  // Create socket
  useEffect(() => {
    if (!accessToken || socketRef.current) {
      return;
    }

    const socket: Socket = io(SOCKET_URL, {
      transports: ["websocket"],
      autoConnect: true,
      auth: {
        token: accessToken,
      },
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("connect_error", async (error) => {
      console.log("Socket connect error:", error.message);

      if (error.message.toLowerCase().includes("auth")) {
        await refreshAndReconnectSocket();
      }
    });

    return () => {
      socket.disconnect();

      if (socketRef.current === socket) {
        socketRef.current = null;
      }
    };
  }, [accessToken, refreshAndReconnectSocket]);

  // Emit event
  const emit = (event: string, data?: unknown): void => {
    socketRef.current?.emit(event, data);
  };

  // Listen to event
  const on = (event: string, callback: (data: unknown) => void): void => {
    socketRef.current?.off(event, callback);
    socketRef.current?.on(event, callback);
  };

  // Remove event listener
  const off = (event: string, callback?: (data: unknown) => void): void => {
    socketRef.current?.off(event, callback);
  };

  // Disconnect socket
  const disconnect = (): void => {
    socketRef.current?.disconnect();
    socketRef.current = null;
  };

  const socketService: WSService = {
    emit,
    on,
    off,
    disconnect,
    refreshAndReconnectSocket,
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
