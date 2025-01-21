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

  const whyUs = t("landingPage.whyChooseUs.content", {
    returnObjects: true,
  }) as {
    tagline: string;
    description: string;
  }[];

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
            {t("landingPage.whyChooseUs.headline")}
          </h1>
          <div className="space-y-10 py-6">
            {whyUs.map(({ tagline, description }, index) => (
              <div key={index} className="flex items-center gap-4 rounded-lg">
                <div
                  className={`relative pl-4 ${
                    index % 2 ? "pr-8 md:pr-12" : "pr-16 md:pr-24"
                  }`}
                >
                  <div
                    className={`absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1 ${
                      index % 2 ? "w-8 md:w-12" : "w-16 md:w-24"
                    } h-2 md:h-3 bg-accent rounded-r-full`}
                  ></div>
                  <div
                    className="flex items-center justify-center self-start w-8 h-8 min-w-8 min-h-8 
                                md:w-12 md:h-12 md:min-h-12 md:min-w-12 text-base md:text-2xl 
                                text-white font-medium bg-accent rounded-full 
                                shadow-[0_0_0_4px_#ff9850,0_0_0_8px_#ff9850ab,_0_0_0_12px_#ff985055]"
                  >
                    {index + 1}
                  </div>
                </div>
                <div className="space-y-4 relative">
                  <p className="text-sm md:text-lg font-bold">{tagline}</p>
                  <p className="text-xs md:text-base font-medium">
                    {description}
                  </p>
                  <div className="absolute w-full top-full left-0 border-b border-primary-50/50"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default LandingPage;
