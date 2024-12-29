import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-neutral text-white p-4 text-center">
      <p>{t("footer.copyright")} &copy; 2024</p>
    </footer>
  );
}

export default Footer;
