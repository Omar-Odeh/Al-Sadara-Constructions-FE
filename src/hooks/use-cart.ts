import { useRecoilState } from "recoil";
import { cartAtom } from "@/atoms/cart";
import { Product } from "@/models/product";

export function useCart() {
  const [cart, setCart] = useRecoilState(cartAtom);

  const addItem = (product: Product) => {
    if (cart.findIndex((item) => item.product.id === product.id) >= 0) return;
    setCart((prev) => [...prev, { product, count: 1 }]);
  };

  const removeItem = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateItemQuantity = (productId: number, amount: number) => {
    setCart((prev) => {
      const items = [...prev];
      const index = items.findIndex((item) => item.product.id === productId);
      if (index >= 0) {
        items[index] = {
          ...items[index],
          count: items[index].count + amount,
        };
      }
      return items;
    });
  };

  const isItemAdded = (productId: number) => {
    return !!cart.find((item) => productId === item.product.id);
  };

  const getTotalPrice = () => {
    return cart.reduce(
      (total, item) => total + item.count * item.product.price,
      0
    );
  };

  return {
    cart,
    addItem,
    removeItem,
    updateItemQuantity,
    isItemAdded,
    getTotalPrice,
  };
}
