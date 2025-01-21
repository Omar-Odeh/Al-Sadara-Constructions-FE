import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { User, UserRole } from "@/models/user";
import { Product } from "@/models/product";
import { getAllProducts } from "@/apis/products";
import { useMainContext } from "@/contexts/MainContext";
import Pagination from "@/components/Pagination";
import ProductCard from "@/components/ProductCard";
import Cart from "@/components/Cart";
import LoaderIcon from "@/icons/LoaderIcon";
import PlusCircleIcon from "@/icons/PlusCircleIcon";

function ProductsPage() {
  const { t } = useTranslation();
  const { user, getLoading, setLoading } = useMainContext();
  const role = (user as User).roles[0];

  const [params, setParams] = useSearchParams();
  const page = +(params.get("page") || "");

  const [totalPages, setTotalPages] = useState(1);
  const [products, setProducts] = useState<Record<number, Product[]>>({});
  const productsLoading = getLoading("products");

  const fetchProducts = async (page: number) => {
    if (products[page]) return;
    setLoading("products", true);
    try {
      const res = await getAllProducts({
        params: { page, size: 15 },
      });
      if (res.status === 200) {
        setProducts((prev) => ({ ...prev, [page]: res.data.content }));
        setTotalPages(Math.max(res.data.totalPages, 1));
      }
    } catch (e) {
      console.log(e);
    } finally {
      setTimeout(() => setLoading("products", false), 1000);
    }
  };

  useEffect(() => {
    setLoading("products", false);
    if (!params.get("page")) {
      params.append("page", "1");
      setParams(params);
    } else {
      fetchProducts(page - 1);
    }
  }, [page]);

  return productsLoading ? (
    <div className="flex flex-1 items-center justify-center text-primary">
      <LoaderIcon className="w-16 h-16 animate-spin" />
    </div>
  ) : (
    <main className="flex flex-1 flex-col items-center w-full px-6 sm:px-8 md:px-16 xl:px-32 py-16 text-primary">
      <div className="flex flex-1 flex-col w-full relative space-y-10 2xl:max-w-[1200px]">
        <div className="flex items-center justify-between">
          <h1 className="px-4 border-r-4 border-accent text-lg md:text-4xl font-bold">
            {t("productsPage.title")}
          </h1>
          {role === UserRole.ADMIN && (
            <Link
              to={"/products/new"}
              className="flex items-center gap-2 px-4 py-2 text-sm md:text-lg font-medium
                      transition-colors text-white bg-accent hover:bg-accent-600 rounded-lg"
            >
              <span className="hidden sm:block">
                {t("productsPage.addProduct")}
              </span>
              <PlusCircleIcon className="w-6 h-6" />
            </Link>
          )}
        </div>
        {products[page - 1]?.length ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products[page - 1].map((product, index) => (
                <ProductCard key={index} userRole={role} product={product} />
              ))}
            </div>
            <div className="!mt-auto">
              <Pagination baseUrl="/products" totalPages={totalPages} />
            </div>
            {role === UserRole.USER && (
              <div className="w-fit sticky right-full bottom-4">
                <Cart />
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col flex-1 items-center justify-center gap-6">
            <img
              src="src/assets/products-empty.svg"
              alt="Not Found"
              className="w-[min(100%,_150px)] md:w-[min(100%,_300px)] bg-neutral 
                      shadow-primary-50/50 shadow-md rounded-full"
            />
            <h2 className="font-medium text-lg">
              {t("productsPage.empty.tagline")}
            </h2>
            {role === UserRole.ADMIN && (
              <p className="font-medium text-sm">
                {t("productsPage.empty.description")}
              </p>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

export default ProductsPage;
