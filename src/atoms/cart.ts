import { atom } from "recoil";
import { Product } from "@/models/product";

const cartAtom = atom<{ product: Product; count: number }[]>({
  key: "cart",
  default: [],
});

export { cartAtom };
