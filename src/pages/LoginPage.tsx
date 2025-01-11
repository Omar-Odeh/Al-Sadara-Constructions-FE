import { useState } from "react";
import { useTranslation } from "react-i18next";
import Logo from "@/icons/Logo";

function LoginPage() {
  const { t } = useTranslation();

  const [mode, setMode] = useState<"login" | "signup">("login");

  return (
    <main className="relative flex items-center justify-center px-6 my-6 text-primary">
      <form
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
            className="w-full px-3 py-2 bg-white border border-primary outline-none rounded-lg"
          />
        </label>
        <label className="block text-right space-y-2">
          <p className="font-medium">{t("login.password")}</p>
          <input
            type="password"
            className="w-full px-3 py-2 bg-white border border-primary outline-none rounded-lg"
          />
        </label>
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
          onClick={() => setMode("signup")}
        >
          {t("login.signup")}
        </button>
      </form>
      <form
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
            className="w-full px-3 py-2 bg-white border border-primary outline-none rounded-lg"
          />
        </label>
        <label className="block flex-1 text-right space-y-2">
          <p className="font-medium">{t("login.email")}</p>
          <input
            type="email"
            className="w-full px-3 py-2 bg-white border border-primary outline-none rounded-lg"
          />
        </label>
        <label className="block text-right space-y-2">
          <p className="font-medium">{t("login.password")}</p>
          <input
            type="password"
            className="w-full px-3 py-2 bg-white border border-primary outline-none rounded-lg"
          />
        </label>
        <label className="block text-right space-y-2">
          <p className="font-medium">{t("login.address")}</p>
          <textarea className="w-full min-h-16 px-3 py-2 bg-white border border-primary outline-none rounded-lg" />
        </label>
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
          onClick={() => setMode("login")}
        >
          {t("login.login")}
        </button>
      </form>
    </main>
  );
}

export default LoginPage;
