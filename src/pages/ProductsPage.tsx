import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Pagination from "@/components/Pagination";
import ProductCard from "@/components/ProductCard";
import Cart from "@/components/Cart";
import PlusCircleIcon from "@/icons/PlusCircleIcon";

function ProductsPage() {
  const { t } = useTranslation();
  const [role, setRole] = useState<"user" | "admin">("admin");

  return (
    <main className="w-full px-6 sm:px-8 md:px-16 xl:px-32 py-16 text-primary">
      <div className="relative mx-auto space-y-10 2xl:max-w-[1200px]">
        <div className="flex items-center justify-between">
          <h1 className="px-4 border-r-4 border-accent text-lg md:text-4xl font-bold">
            {t("productsPage.title")}
          </h1>
          {role === "admin" && (
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 9 }).map((val, index) => (
            <ProductCard
              key={index}
              userRole={role}
              product={{
                id: 1 + index,
                name: "test",
                description:
                  "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
                price: 25,
                img_url: "images/b6c6158e-d289-46ef-82d6-3a5ad97dc0a7.png",
              }}
            />
          ))}
        </div>
        <Pagination baseUrl="/products" totalPages={10} />
        {role === "user" && (
          <div className="w-fit sticky right-full bottom-4">
            <Cart />
          </div>
        )}
      </div>
    </main>
  );
}

export default ProductsPage;
