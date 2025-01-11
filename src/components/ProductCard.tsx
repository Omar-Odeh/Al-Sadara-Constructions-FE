import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { formatCurrency } from "@/utils/formatters";
import { Product } from "@/models/product";
import { useCart } from "@/hooks/use-cart";
import Tooltip from "@/components/Tooltip";
import PlusIcon from "@/icons/PlusIcon";
import TrashIcon from "@/icons/TrashIcon";
import EditIcon from "@/icons/EditIcon";

interface Props {
  userRole: "user" | "admin";
  product: Product;
  isPreview?: boolean;
}

function ProductCard({ userRole, product, isPreview = false }: Props) {
  const { t } = useTranslation();
  const { addItem, removeItem, isItemAdded } = useCart();

  return (
    <div
      className="flex flex-col p-4 gap-6 text-primary bg-neutral 
                rounded-lg shadow-primary/30 shadow-md"
    >
      <div
        className="flex items-center justify-center w-full aspect-[1.5] 
                  bg-white overflow-hidden rounded-lg"
      >
        {product.img_url ? (
          <img
            src={
              product.img_url.startsWith("blob:")
                ? product.img_url
                : `${window.location.origin}/${product.img_url}`
            }
            onError={(e) => {
              const img = e.target as HTMLImageElement;
              img.src = `${window.location.origin}/src/assets/image-placeholder.svg`;
              img.className = "w-20 h-20 sm:w-24 sm:h-24";
            }}
            alt="product-img"
            className="min-w-full min-h-full object-cover mix-blend-multiply"
          />
        ) : (
          <img
            src={`${window.location.origin}/src/assets/image-placeholder.svg`}
            alt="product-img"
            className="w-20 h-20 sm:w-24 sm:h-24"
          />
        )}
      </div>
      <div className="space-y-2">
        <p className="font-medium">{product.name}</p>
        <p className="line-clamp-3">{product.description}</p>
      </div>
      <div className="flex items-center justify-between gap-4 mt-auto">
        <p className="text-lg font-bold text-right">
          {formatCurrency(product.price)}
        </p>
        <Tooltip
          content={
            <p>
              {userRole === "user"
                ? isItemAdded(product.id)
                  ? t("productsPage.removeFromCart")
                  : t("productsPage.addToCart")
                : t("productsPage.editProduct")}
            </p>
          }
        >
          {userRole === "user" ? (
            <button
              onClick={() => {
                if (isPreview) return;
                isItemAdded(product.id)
                  ? removeItem(product.id)
                  : addItem(product);
              }}
              className={`flex self-start items-center justify-center min-w-8 
                          min-h-8 transition-colors rounded-full ${
                            isItemAdded(product.id)
                              ? "text-error bg-[#F9E9E7] hover:bg-error hover:text-white"
                              : "text-white bg-primary hover:bg-primary-600"
                          }`}
            >
              {isItemAdded(product.id) ? (
                <TrashIcon className="w-5 h-5" />
              ) : (
                <PlusIcon className="w-5 h-5" />
              )}
            </button>
          ) : (
            <Link
              to={`/products/${product.id}`}
              className="flex items-center justify-center transition-colors min-w-8 min-h-8
                        text-white bg-primary hover:bg-primary-600 rounded-full"
            >
              <EditIcon className="w-5 h-5" />
            </Link>
          )}
        </Tooltip>
      </div>
    </div>
  );
}

export default ProductCard;
