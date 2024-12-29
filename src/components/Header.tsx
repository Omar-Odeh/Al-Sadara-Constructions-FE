import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Logo from "../icons/Logo";

function Header() {
  const { t } = useTranslation();

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-neutral text-white sticky top-0 z-20">
      <div className="flex items-center gap-x-4">
        <Logo className="w-8 h-8 fill-current" />
        <h1 className="text-xl font-bold">{t("header.title")}</h1>
      </div>
      <nav className="flex items-center gap-x-4 -my-4">
        <NavLink
          className={({ isActive }) =>
            `block relative transition-colors hover:text-secondary ${
              isActive
                ? `after:content-[''] after:absolute after:right-0 after:-bottom-5 
                    after:w-full after:border-b-2 after:border-white`
                : ""
            }`
          }
          to="/"
        >
          {t("header.home")}
        </NavLink>
        {/* <NavLink
          className={({ isActive }) =>
            `block relative transition-colors hover:text-secondary ${
              isActive
                ? `after:content-[''] after:absolute after:right-0 after:-bottom-5 
                    after:w-full after:border-b-2 after:border-white`
                : ""
            }`
          }
          to="/marketplace"
        >
          {t("header.marketplace")}
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `block relative transition-colors hover:text-secondary ${
              isActive
                ? `after:content-[''] after:absolute after:right-0 after:-bottom-5 
                    after:w-full after:border-b-2 after:border-white`
                : ""
            }`
          }
          to="/offers"
        >
          {t("header.offers")}
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `block relative transition-colors hover:text-secondary ${
              isActive
                ? `after:content-[''] after:absolute after:right-0 after:-bottom-5 
                    after:w-full after:border-b-2 after:border-white`
                : ""
            }`
          }
          to="/profile"
        >
          {t("header.profile")}
        </NavLink> */}
        <NavLink
          className={({ isActive }) =>
            `block relative transition-colors hover:text-secondary ${
              isActive
                ? `after:content-[''] after:absolute after:right-0 after:-bottom-5 
                    after:w-full after:border-b-2 after:border-white`
                : ""
            }`
          }
          to="/login"
        >
          {t("header.login")}
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
