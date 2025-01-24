import { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { AxiosError } from "axios";
import { User } from "@/models/user";
import { LoginDetails, SignupDetails, login, signup } from "@/apis/auth";
import { useUserData } from "@/hooks/use-user-data";
import Logo from "@/icons/Logo";

function LoginPage() {
  const { t } = useTranslation();
  const { saveUser } = useUserData();

  const [loginDetails, setLoginDetails] = useState<LoginDetails>({
    email: "",
    password: "",
  });
  const [signupDetails, setSignupDetails] = useState<SignupDetails>({
    email: "",
    password: "",
    username: "",
    phone: "",
    address: "",
  });
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [errorMsg, setErrorMsg] = useState({ login: "", signup: "" });

  const getPattern = (key: string) => {
    const patterns: Record<string, RegExp> = {
      email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      phone:
        /^\+?[0-9]\d{1,14}(\s|\-)?\(?\d{1,4}\)?(\s|\-)?\d{1,4}(\s|\-)?\d{1,4}$/,
    };
    return ["email", "phone"].includes(key) ? patterns[key] : null;
  };

  const validate = () => {
    const details = mode === "login" ? loginDetails : signupDetails;
    let msg = "",
      isValid = true;
    for (const [key, value] of Object.entries(details)) {
      const pattern = getPattern(key);
      if (!value) {
        isValid = false;
        msg = msg || t(`login.validation.${key}Required`);
      } else if (pattern && !pattern.test(value)) {
        isValid = false;
        msg = msg || t(`login.validation.${key}Invalid`);
      }
    }
    setErrorMsg((prev) => ({
      ...prev,
      [mode]: msg,
    }));
    return isValid;
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const res = await login(loginDetails);
      if (res.status === 200) {
        const user = res.data as User;
        saveUser(user, loginDetails.password || "");
        return;
      }
    } catch (error) {
      const err = error as AxiosError;
      const status = err?.status;
      if (err?.response && status === 403) {
        const user = err.response.data as User;
        saveUser(user, loginDetails.password || "");
        return;
      } else if (typeof status === "number" && [401, 404].includes(status)) {
        setErrorMsg((prev) => ({
          ...prev,
          login: t("login.invalidCredentials"),
        }));
        return;
      }
    }
    setErrorMsg((prev) => ({
      ...prev,
      login: t("login.loginFailed"),
    }));
  };

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const res = await signup(signupDetails);
      if (res.status === 201) {
        const user = res.data as User;
        saveUser(user, signupDetails.password || "");
        return;
      }
    } catch (error) {
      const err = error as AxiosError;
      if (err?.status === 409) {
        setErrorMsg((prev) => ({
          ...prev,
          signup: t("login.emailAlreadyUsed"),
        }));
        return;
      }
    }
    setErrorMsg((prev) => ({
      ...prev,
      signup: t("login.signupFailed"),
    }));
  };

  return (
    <main className="relative flex items-center justify-center px-6 my-6 text-primary">
      <form
        onSubmit={handleLogin}
        className={`absolute left-6 top-0 sm:top-1/2 sm:-translate-y-1/2 
                    w-[min(calc(100%_-_48px),_400px)] px-8 py-6 space-y-6 text-center bg-neutral 
                    shadow-md shadow-primary/30 rounded-xl transition-all duration-300 ${
                      mode === "login"
                        ? "opacity-100 visible"
                        : "opacity-0 invisible"
                    }`}
      >
        <Logo className="mx-auto w-24 h-24 fill-current" />
        <h2 className="text-3xl font-bold !mb-10">{t("login.login")}</h2>
        <label className="block text-right space-y-2">
          <p className="font-medium">{t("login.email")}</p>
          <input
            type="email"
            value={loginDetails.email || ""}
            onChange={(e) =>
              setLoginDetails((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
            className="w-full px-3 py-2 bg-white border border-primary outline-none rounded-lg"
          />
        </label>
        <label className="block text-right space-y-2">
          <p className="font-medium">{t("login.password")}</p>
          <input
            type="password"
            value={loginDetails.password || ""}
            onChange={(e) =>
              setLoginDetails((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
            className="w-full px-3 py-2 bg-white border border-primary outline-none rounded-lg"
          />
        </label>
        {errorMsg.login && (
          <p className="text-sm font-medium text-error">{errorMsg.login}</p>
        )}
        <button
          type="submit"
          className="w-full !mt-10 px-10 py-2 transition-colors bg-accent 
                    hover:bg-accent-600 text-white font-medium rounded-lg"
        >
          {t("login.login")}
        </button>
        <button
          type="button"
          className="w-full px-10 py-2 transition-colors text-primary border 
                    border-primary hover:bg-primary-50/20 font-medium rounded-lg"
          onClick={() => {
            setMode("signup");
            setLoginDetails({
              email: "",
              password: "",
            });
            setErrorMsg((prev) => ({
              ...prev,
              login: "",
            }));
          }}
        >
          {t("login.signup")}
        </button>
      </form>
      <form
        onSubmit={handleSignup}
        className={`w-[min(100%,_400px)] p-6 space-y-6 text-center bg-neutral z-10
                    shadow-md shadow-primary/30 rounded-lg transition-all duration-300 ${
                      mode === "signup"
                        ? "opacity-100 visible"
                        : "opacity-0 invisible"
                    }`}
      >
        <Logo className="mx-auto w-24 h-24 fill-current" />
        <h2 className="text-3xl font-bold !mb-10">{t("login.signup")}</h2>
        <label className="block flex-1 text-right space-y-2">
          <p className="font-medium">{t("login.username")}</p>
          <input
            type="text"
            value={signupDetails.username || ""}
            onChange={(e) =>
              setSignupDetails((prev) => ({
                ...prev,
                username: e.target.value,
              }))
            }
            className="w-full px-3 py-2 bg-white border border-primary outline-none rounded-lg"
          />
        </label>
        <label className="block flex-1 text-right space-y-2">
          <p className="font-medium">{t("login.phone")}</p>
          <input
            type="text"
            value={signupDetails.phone || ""}
            onChange={(e) =>
              setSignupDetails((prev) => ({
                ...prev,
                phone: e.target.value,
              }))
            }
            className="w-full px-3 py-2 bg-white border border-primary outline-none rounded-lg"
          />
        </label>
        <label className="block flex-1 text-right space-y-2">
          <p className="font-medium">{t("login.email")}</p>
          <input
            type="email"
            value={signupDetails.email || ""}
            onChange={(e) =>
              setSignupDetails((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
            className="w-full px-3 py-2 bg-white border border-primary outline-none rounded-lg"
          />
        </label>
        <label className="block text-right space-y-2">
          <p className="font-medium">{t("login.password")}</p>
          <input
            type="password"
            value={signupDetails.password || ""}
            onChange={(e) =>
              setSignupDetails((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
            className="w-full px-3 py-2 bg-white border border-primary outline-none rounded-lg"
          />
        </label>
        <label className="block text-right space-y-2">
          <p className="font-medium">{t("login.address")}</p>
          <textarea
            value={signupDetails.address || ""}
            onChange={(e) =>
              setSignupDetails((prev) => ({
                ...prev,
                address: e.target.value,
              }))
            }
            className="w-full min-h-16 px-3 py-2 bg-white border border-primary outline-none rounded-lg"
          />
        </label>
        {errorMsg.signup && (
          <p className="text-sm font-medium text-error">{errorMsg.signup}</p>
        )}
        <button
          type="submit"
          className="w-full !mt-10 px-10 py-2 transition-colors bg-accent 
                    hover:bg-accent-600 text-white font-medium rounded-lg"
        >
          {t("login.signup")}
        </button>
        <button
          type="button"
          className="w-full px-10 py-2 transition-colors text-primary border 
                    border-primary hover:bg-primary-50/20 font-medium rounded-lg"
          onClick={() => {
            setMode("login");
            setSignupDetails({
              email: "",
              password: "",
              username: "",
              phone: "",
              address: "",
            });
            setErrorMsg((prev) => ({
              ...prev,
              signup: "",
            }));
          }}
        >
          {t("login.login")}
        </button>
      </form>
    </main>
  );
}

export default LoginPage;
