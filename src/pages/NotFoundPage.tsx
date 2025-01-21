import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMainContext } from "@/contexts/MainContext";
import FlipIcon from "@/icons/FlipIcon";

function NotFoundPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user } = useMainContext();

  return (
    <div
      className="self-start md:self-center w-[min(100%,_554px)] h-fit m-6 p-6 space-y-6 md:my-6 
              text-center text-primary bg-neutral shadow-md shadow-primary/30 rounded-xl"
    >
      <img
        src="src/assets/not-found.svg"
        alt="Not Found"
        className="w-[min(100%,_150px)] md:w-[min(100%,_200px)] mx-auto"
      />
      <h2 className="text-2xl font-bold">{t("notFoundPage.title")}</h2>
      <p>{t("notFoundPage.instruction")}</p>
      <button
        onClick={() =>
          navigate(user?.confirmed ? "/products" : user ? "/verify-email" : "/")
        }
        className="flex items-center gap-2 min-w-40 mx-auto px-4 py-2 transition-colors 
                  bg-accent hover:bg-accent-600 text-white font-medium rounded-lg"
      >
        <span className="whitespace-nowrap">{t("notFoundPage.goBack")}</span>
        <FlipIcon className="w-5 h-5" />
      </button>
    </div>
  );
}

export default NotFoundPage;
