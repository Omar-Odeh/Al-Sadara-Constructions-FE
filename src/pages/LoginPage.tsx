import { useTranslation } from "react-i18next";

function LoginPage() {
  const { t } = useTranslation();

  return (
    <main className="p-6 flex justify-center">
      <form className="bg-white p-6 shadow-lg rounded">
        <h2 className="text-2xl font-bold mb-4">{t("login.title")}</h2>
        <label className="block mb-2">
          {t("login.email")}
          <input type="email" className="border p-2 w-full" />
        </label>
        <label className="block mb-4">
          {t("login.password")}
          <input type="password" className="border p-2 w-full" />
        </label>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {t("login.submit")}
        </button>
      </form>
    </main>
  );
}

export default LoginPage;
