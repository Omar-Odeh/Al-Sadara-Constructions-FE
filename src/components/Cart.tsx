import { useTranslation } from "react-i18next";
import { formatCurrency } from "@/utils/formatters";
import { Product } from "@/models/product";
import { useCart } from "@/hooks/use-cart";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import CartIcon from "@/icons/CartIcon";
import CloseIcon from "@/icons/CloseIcon";
import CartEmptyIcon from "@/icons/CartEmptyIcon";
import PlusIcon from "@/icons/PlusIcon";
import MinusIcon from "@/icons/MinusIcon";
import TrashIcon from "@/icons/TrashIcon";

function Cart() {
  const { t } = useTranslation();
  const { cart, getTotalPrice } = useCart();

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <button
          className="flex items-center justify-center w-16 h-16 relative bottom-0
                     text-white bg-accent hover:bg-accent-600 rounded-full"
        >
          <CartIcon className="w-8 h-8" />
          {cart.length > 0 && (
            <div className="absolute inset-2.5 w-fit h-fit px-1 bg-inherit text-xs border-2 rounded-full">
              {cart.length}
            </div>
          )}
        </button>
      </DrawerTrigger>
      <DrawerContent
        className="w-full md:w-2/5 md:min-w-[500px] left-[unset] top-0 bottom-0 
                    mt-0 p-4 md:p-6 gap-6 text-primary rounded-t-none cart-container"
      >
        <DrawerHeader className="hidden">
          <DrawerTitle></DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
        <DrawerClose asChild>
          <button className="absolute left-4 md:left-6 w-6 h-6">
            <CloseIcon />
          </button>
        </DrawerClose>
        <h2 className="px-4 border-r-4 border-accent text-base md:text-lg font-bold">
          {t("productsPage.cart")}
        </h2>
        <hr className="-mx-4 md:-mx-6" />
        {cart.length === 0 ? (
          <div className="w-full space-y-6">
            <>
              <CartEmptyIcon className="w-32 h-32 mt-12 mx-auto" />
              <p className="font-medium text-lg text-center">
                {t("productsPage.cartEmpty")}
              </p>
            </>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-4 overflow-y-auto">
              {cart.map((item, index) => (
                <CartProductItem key={index} {...item} />
              ))}
            </div>
            <hr className="-mx-4 md:-mx-6" />
            <div className="flex items-center justify-between font-bold">
              <p>{t("productsPage.total")}</p>
              <p>{formatCurrency(getTotalPrice())}</p>
            </div>
            <button
              className="w-full px-10 py-2 transition-colors bg-accent 
                        hover:bg-accent-600 text-white font-medium rounded-lg"
            >
              {t("productsPage.confirmOrder")}
            </button>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}

function CartProductItem({
  product,
  count,
}: {
  product: Product;
  count: number;
}) {
  const { t } = useTranslation();
  const { removeItem, updateItemQuantity } = useCart();

  return (
    <div className="flex items-center w-[calc(100%_-_8px)] gap-4 p-4 border shadow-primary/30 shadow-md rounded-xl">
      <div className="w-20 h-20 md:w-24 md:h-24 overflow-hidden rounded-lg">
        <img
          src={product.img_url}
          alt="cart-item"
          className="min-w-full min-h-full object-cover"
        />
      </div>
      <div className="w-[calc(100%_-_96px)] md:w-[calc(100%_-_112px)] space-y-4">
        <div className="flex items-center justify-between gap-2">
          <p className="flex-shrink font-medium truncate">{product.name}</p>
          <button
            onClick={() => removeItem(product.id)}
            className="flex items-center gap-1 px-2 py-1 text-sm font-medium transition-colors
                        text-error bg-[#F9E9E7] hover:bg-error hover:text-white rounded-md"
          >
            <span className="hidden sm:block whitespace-nowrap">
              {t("productsPage.removeFromCart")}
            </span>
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-lg font-medium">{formatCurrency(product.price)}</p>
          <div className="flex items-center gap-2">
            <button
              disabled={count === 1}
              onClick={() => updateItemQuantity(product.id, -1)}
              className="flex items-center justify-center min-w-6 min-h-6 transition-colors
                          text-primary bg-primary-50/20 hover:bg-primary-50/75
                          disabled:bg-primary-50/20 disabled:text-white rounded-full"
            >
              <MinusIcon className="w-5 h-5" />
            </button>
            <span className="min-w-6 text-center">{count}</span>
            <button
              onClick={() => updateItemQuantity(product.id, 1)}
              className="flex items-center justify-center min-w-6 min-h-6 transition-colors
                          text-primary bg-primary-50/20 hover:bg-primary-50/75 rounded-full"
            >
              <PlusIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
