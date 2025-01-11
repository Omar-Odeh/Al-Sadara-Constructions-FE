import { useTranslation } from "react-i18next";
import Carousel from "@/components/Carousel";
import Logo from "@/icons/Logo";
import WoodIcon from "@/icons/WoodIcon";
import SteelIcon from "@/icons/SteelIcon";
import AggregatesIcon from "@/icons/AggregatesIcon";
import CementIcon from "@/icons/CementIcon";
import CategoryCard from "@/components/CategoryCard";

function LandingPage() {
  const { t } = useTranslation();

  const categoriesIcons = {
    cement: <CementIcon className="w-full h-fit" />,
    aggregates: <AggregatesIcon className="w-full h-fit" />,
    steel: <SteelIcon className="w-full h-fit" />,
    wood: <WoodIcon className="w-full h-fit" />,
  };

  const categories = Object.entries(categoriesIcons).map(
    ([category, icon]) => ({
      headline: t(`landingPage.products.categories.${category}.headline`),
      description: t(`landingPage.products.categories.${category}.description`),
      imgPath: `${window.location.origin}/src/assets/${category}.jpg`,
      icon,
    })
  );

  return (
    <main>
      <Carousel
        containerClassName={"h-[calc(100vh_-_64px)] max-w-full"}
        images={[
          `${window.location.origin}/src/assets/carousel-1.jpg`,
          `${window.location.origin}/src/assets/carousel-2.jpg`,
          `${window.location.origin}/src/assets/carousel-3.jpg`,
        ]}
      >
        <Logo className="mx-auto w-28 h-28 md:w-36 md:h-36 fill-current" />
        <h2 className="text-lg md:text-4xl font-bold">
          {t("landingPage.welcome")}
        </h2>
        <p className="text-sm md:text-lg font-medium">
          {t("landingPage.description")}
        </p>
      </Carousel>
      <section className="px-6 sm:px-8 md:px-16 xl:px-32 py-8 md:py-16 xl:py-32 text-primary">
        <div className="space-y-6 mx-auto 2xl:max-w-[1200px]">
          <h1 className="px-4 border-r-4 border-accent text-lg md:text-4xl font-bold">
            {t("landingPage.aboutUs.headline")}
          </h1>
          <p className="text-base md:text-xl">
            {t("landingPage.aboutUs.content")}
          </p>
        </div>
      </section>
      <section className="px-6 sm:px-8 md:px-16 xl:px-32 py-8 md:py-16 xl:py-32 bg-primary text-white">
        <div className="space-y-8 md:space-y-16 mx-auto 2xl:max-w-[1200px]">
          <div className="space-y-6">
            <h1 className="px-4 border-r-4 border-accent text-lg md:text-4xl font-bold">
              {t("landingPage.products.headline")}
            </h1>
            <p className="text-base md:text-xl">
              {t("landingPage.products.content")}
            </p>
          </div>
          <div className="w-fit grid grid-cols-1 gap-8 mx-auto md:grid-cols-[repeat(2,_minmax(0,_600px))]">
            {categories.map((category, index) => (
              <CategoryCard key={index} {...category} />
            ))}
          </div>
        </div>
      </section>
      <section className="px-6 sm:px-8 md:px-16 xl:px-32 py-8 md:py-16 xl:py-32 text-primary">
        <div className="space-y-6 mx-auto 2xl:max-w-[1200px]">
          <h1 className="px-4 border-r-4 border-accent text-lg md:text-4xl font-bold">
            {t("landingPage.aboutUs.headline")}
          </h1>
          <p className="text-base md:text-xl">
            {t("landingPage.aboutUs.content")}
          </p>
        </div>
      </section>
    </main>
  );
}

export default LandingPage;
