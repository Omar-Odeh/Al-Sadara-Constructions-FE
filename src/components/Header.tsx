import { ReactNode, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Logo from "@/icons/Logo";
import MenuIcon from "@/icons/MenuIcon";
import HomeIcon from "@/icons/HomeIcon";
import LoginIcon from "@/icons/LoginIcon";
import ClickAwayListener from "react-click-away-listener";

function Header() {
  const { t } = useTranslation();
  const menuRef = useRef<HTMLButtonElement | null>(null);

  const [open, setOpen] = useState(false);

  const activeClassName = `
    after:content-[''] after:absolute after:right-0 after:-bottom-5 
    after:w-full after:border-b-[3px] after:border-accent`;

  const activeClassNameMobile = `
    relative after:h-full after:content-[''] after:absolute after:top-0 
    after:border-l-[3px] after:border-accent after:transition-all after:duration-200`;

  const links: { label: string; to: string; icon: ReactNode }[] = [
    {
      label: t("header.home"),
      to: "/",
      icon: <HomeIcon className="w-5 h-fit fill-current" />,
    },
    {
      label: t("header.login"),
      to: "/login",
      icon: <LoginIcon className="w-5 h-fit stroke-current" />,
    },
  ];

  return (
    <header
      className="flex justify-between items-center px-6 py-4 bg-primary 
                text-white sticky top-0 z-20 shadow-[0_0_16px_0px_black]"
    >
      <div className="flex items-center gap-x-4">
        <Logo className="w-8 h-8 fill-current" />
        <h1 className="text-base md:text-xl font-bold">{t("header.title")}</h1>
      </div>
      <nav className="hidden md:flex items-center gap-x-4 -my-4">
        {links.map(({ label, to }, index) => (
          <NavLink
            key={index}
            className={({ isActive }) =>
              `block relative transition-colors hover:text-accent ${
                isActive ? activeClassName : ""
              }`
            }
            to={to}
          >
            {label}
          </NavLink>
        ))}
      </nav>
      <button
        ref={menuRef}
        className="flex md:hidden items-center justify-center -my-4 py-4"
        onClick={() => setOpen((prev) => !prev)}
      >
        <MenuIcon />
      </button>
      <ClickAwayListener
        onClickAway={(e) => {
          if (
            (e.target as HTMLElement) !== menuRef.current &&
            !menuRef.current?.contains(e.target as HTMLElement)
          ) {
            setOpen(false);
          }
        }}
      >
        <motion.div
          className="w-full absolute top-full left-0 bg-neutral divide-y 
                    divide-primary-50/50 shadow-[0_0_16px_0px_black]"
          variants={{
            active: {
              opacity: 1,
              visibility: "visible",
              height: "fit-content",
            },
            hidden: {
              opacity: 0,
              visibility: "hidden",
              height: 0,
            },
          }}
          animate={open ? "active" : "hidden"}
          initial={"hidden"}
          transition={{ duration: 0.2, delay: open ? 0 : 0.2 }}
        >
          {links.map(({ label, to, icon }, index) => (
            <NavLink
              key={index}
              to={to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2 p-4 transition-colors duration-200 font-medium ${
                  isActive ? activeClassNameMobile : ""
                } ${
                  open
                    ? "text-primary delay-200 after:right-0 after:delay-200"
                    : "text-transparent !border-transparent after:-right-1"
                }`
              }
            >
              {icon}
              {label}
            </NavLink>
          ))}
        </motion.div>
      </ClickAwayListener>
    </header>
  );
}

export default Header;
