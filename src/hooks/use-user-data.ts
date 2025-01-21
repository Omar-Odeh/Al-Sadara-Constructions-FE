import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { getFromLocalStorage, setInLocalStorage } from "@/utils/local-storage";
import { User } from "@/models/user";
import { login } from "@/apis/auth";
import { useMainContext } from "@/contexts/MainContext";

export function useUserData() {
  const navigate = useNavigate();
  const { user, setUser } = useMainContext();

  const saveUser = (user: User, password: string) => {
    setUser(user);
    setInLocalStorage("user", user);
    setInLocalStorage("pass", password);
    navigate(user.confirmed ? "/products?page=1" : "/verify-email");
  };

  const checkUser = async () => {
    if (user) return;
    const email = getFromLocalStorage("user")?.email;
    const password = getFromLocalStorage("pass");
    if (email && password) {
      try {
        const res = await login({ email, password });
        if (res.status === 200) {
          const user = res.data as User;
          setUser(user);
          navigate("/products?page=1");
        }
      } catch (error) {
        const err = error as AxiosError;
        if (err?.response && err?.status === 403) {
          const user = err.response.data as User;
          setUser(user);
          navigate("/verify-email");
        } else {
          navigate("/");
        }
      }
    } else {
      navigate("/");
    }
  };

  return { saveUser, checkUser };
}
