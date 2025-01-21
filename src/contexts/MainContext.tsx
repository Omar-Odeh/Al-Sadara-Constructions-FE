import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { User } from "@/models/user";

interface MainContextProps {
  user?: User;
  setUser: Dispatch<SetStateAction<User | undefined>>;
  setLoading: (key: string, value: boolean) => void;
  getLoading: (key: string) => boolean;
}

const MainContext = createContext<MainContextProps | undefined>(undefined);

export const MainContextProvider: React.FC<{
  children: React.ReactNode;
  userData?: User;
}> = ({ children, userData }) => {
  const [user, setUser] = useState(userData);
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  const updateLoading = (key: string, value: boolean) => {
    setLoading((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const getLoading = (key: string) => {
    return !Object.keys(loading).includes(key) || loading[key];
  };

  return (
    <MainContext.Provider
      value={{
        user,
        setUser,
        setLoading: updateLoading,
        getLoading,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export const useMainContext = () => {
  const context = useContext(MainContext);
  if (!context) {
    throw new Error("useMainContext must be used within a MainContextProvider");
  }
  return context;
};
