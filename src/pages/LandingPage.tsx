import { useTranslation } from "react-i18next";
import Carousel from "../components/Carousel";
import Logo from "../icons/Logo";
import WoodIcon from "../icons/WoodIcon";
import SteelIcon from "../icons/SteelIcon";
import AggregatesIcon from "../icons/AggregatesIcon";
import CementIcon from "../icons/CementIcon";
import ProductCard from "../components/ProductCard";
import ArrowIcon from "../icons/ArrowIcon";

function LandingPage() {
  const { t } = useTranslation();

  return (
    <main>
      <section>
        <Carousel
          containerClassName={"h-[calc(100vh_-_64px)]"}
          images={[
            "src/assets/carousel-1.jpg",
            "src/assets/carousel-2.jpg",
            "src/assets/carousel-3.jpg",
          ]}
        >
          <Logo className="mx-auto w-36 h-36 fill-current" />
          <h2 className="text-4xl font-bold">{t("landingPage.welcome")}</h2>
          <p className="text-lg font-medium">{t("landingPage.description")}</p>
        </Carousel>
      </section>
      <section className="px-40 py-32 text-neutral">
        <div className="space-y-6">
          <h1 className="px-4 border-r-4 border-secondary text-4xl font-bold">
            {t("landingPage.aboutUs.headline")}
          </h1>
          <p className="text-xl">{t("landingPage.aboutUs.content")}</p>
        </div>
      </section>
      <section className="px-40 py-32 bg-neutral text-white">
        <div className="max-w-max space-y-16 mx-auto">
          <div className="space-y-6">
            <h1 className="px-4 border-r-4 border-secondary text-4xl font-bold">
              {t("landingPage.products.headline")}
            </h1>
            <p className="text-xl">{t("landingPage.products.content")}</p>
          </div>
          <div className="w-fit grid grid-cols-1 gap-8 mx-auto md:grid-cols-[repeat(2,_minmax(0,_600px))]">
            <ProductCard
              headline={t("landingPage.products.categories.cement.headline")}
              description={t(
                "landingPage.products.categories.cement.description"
              )}
              imgPath={"src/assets/cement.jpg"}
              icon={<CementIcon width={100} height={100} />}
            />
            <ProductCard
              headline={t(
                "landingPage.products.categories.aggregates.headline"
              )}
              description={t(
                "landingPage.products.categories.aggregates.description"
              )}
              imgPath={"src/assets/aggregates.jpg"}
              icon={<AggregatesIcon width={100} height={100} />}
            />
            <ProductCard
              headline={t("landingPage.products.categories.steel.headline")}
              description={t(
                "landingPage.products.categories.steel.description"
              )}
              imgPath={"src/assets/steel.jpg"}
              icon={<SteelIcon width={100} height={100} />}
            />
            <ProductCard
              headline={t("landingPage.products.categories.wood.headline")}
              description={t(
                "landingPage.products.categories.wood.description"
              )}
              imgPath={"src/assets/wood.jpg"}
              icon={<WoodIcon width={100} height={100} />}
            />
          </div>
          <button
            className="flex items-center gap-x-4 mx-auto !mt-32 px-6 py-4 text-lg font-medium
                    transition-colors border rounded-lg border-secondary bg-secondary/80
                    hover:bg-secondary"
          >
            <span>{t("landingPage.products.ctaButton")}</span>
            <ArrowIcon width={24} height={24} className="fill-current" />
          </button>
        </div>
      </section>
      <section className="px-40 py-32 text-neutral">
        <div className="space-y-6">
          <h1 className="px-4 border-r-4 border-secondary text-4xl font-bold">
            {t("landingPage.aboutUs.headline")}
          </h1>
          <p className="text-xl">{t("landingPage.aboutUs.content")}</p>
        </div>
      </section>
    </main>
  );
}

export default LandingPage;
