import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { UserRole } from "@/models/user";
import { Product } from "@/models/product";
import { useWindowResize } from "@/hooks/use-window-resize";
import { useUpload } from "@/hooks/use-upload";
import ProductCard from "@/components/ProductCard";
import ImageInput from "@/components/ImageInput";
import { addProduct, getProduct, updateProduct } from "@/apis/products";
import { toast } from "@/hooks/use-toast";
import { useMainContext } from "@/contexts/MainContext";
import LoaderIcon from "@/icons/LoaderIcon";

function ProductConfigurationPage() {
  const { t } = useTranslation();
  const { id } = useParams();
  const { getLoading, setLoading } = useMainContext();

  const navigate = useNavigate();
  const upload = useUpload();

  const previewRef = useRef<HTMLDivElement | null>(null);
  const [showSeperator, setShowSeperator] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState("");

  const mode: "add" | "edit" = !id || id === "new" ? "add" : "edit";

  const [product, setProduct] = useState<Product>({
    id: -1,
    name: "",
    description: "",
    price: 0,
    imageUrl: "",
  });
  const [productImageFile, setProductImageFile] = useState<File | null>(null);
  const productLoading = getLoading("product");

  const validateProduct = () => {
    let isValid: boolean = true;
    let msg = "";
    for (const [key, value] of Object.entries(product)) {
      if (key === "id") continue;
      if (!value) {
        isValid = false;
        msg = msg || t(`productsPage.validation.${key}Required`);
      }
    }
    setErrorMsg(msg);
    return isValid;
  };

  const submit = async () => {
    if (!validateProduct()) return;

    let newProduct: Omit<Product, "id"> & { id?: number } = { ...product };
    delete newProduct.id;
    if (productImageFile) {
      const imgUrl = await upload(productImageFile);
      newProduct = { ...newProduct, imageUrl: imgUrl };
    }
    if (mode === "add") {
      try {
        const res = await addProduct(newProduct);
        if (res.status === 200) {
          toast({ title: t("productsPage.addedSuccessfully") });
          setTimeout(() => navigate("/products?page=1"), 500);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const res = await updateProduct({ ...newProduct, id: product.id });
        if (res.status === 200) {
          toast({ title: t("productsPage.updatedSuccessfully") });
          setTimeout(() => navigate("/products?page=1"), 300);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useWindowResize({
    callback: () => {
      const preview = previewRef.current;
      const parent = previewRef.current?.parentElement;
      if (!parent || !preview) return;
      if (window.innerWidth < 768) {
        setShowSeperator(true);
      } else if (window.innerWidth >= 968) {
        setShowSeperator(false);
      } else {
        const { top: parentTop } = parent.getBoundingClientRect();
        const { top: previewTop } = preview.getBoundingClientRect();
        setShowSeperator(previewTop - parentTop > 25);
      }
    },
  });

  useEffect(() => {
    setLoading("product", false);
    if (mode === "edit" && id) {
      setLoading("product", true);
      getProduct(+id)
        .then((res) => setProduct(res.data))
        .finally(() => setLoading("product", false));
    }
  }, [mode, id]);

  return productLoading ? (
    <div className="flex flex-1 items-center justify-center text-primary">
      <LoaderIcon className="w-16 h-16 animate-spin" />
    </div>
  ) : (
    <main className="w-full px-6 sm:px-8 md:px-16 xl:px-32 py-16 text-primary">
      <div className="mx-auto space-y-10 2xl:max-w-[1200px]">
        <h1 className="px-4 border-r-4 border-accent text-lg md:text-4xl font-bold">
          {t(`productsPage.${mode}Product`)}
        </h1>
        <div className="space-y-6 p-6 bg-neutral shadow-md shadow-primary/30 rounded-xl">
          <div className="flex justify-between flex-wrap gap-6">
            <div className="flex-[5] space-y-6 min-w-full md:min-w-96">
              <h2 className="px-4 border-r-4 border-accent font-medium text-base md:text-lg">
                {t("productsPage.productDetails")}
              </h2>
              <div className="space-y-2">
                <label className="block text-right space-y-2">
                  <span className="text-sm md:text-base font-medium">
                    {t("productsPage.productName")}
                    <span className="text-xs text-error">*</span>
                  </span>
                  <input
                    type="text"
                    value={product.name}
                    onChange={(e) =>
                      setProduct((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 bg-white border border-primary outline-none rounded-lg"
                  />
                </label>
              </div>
              <div className="space-y-2">
                <label className="block text-right space-y-2">
                  <span className="text-sm md:text-base font-medium">
                    {t("productsPage.productDescription")}
                    <span className="text-xs text-error">*</span>
                  </span>
                  <textarea
                    value={product.description}
                    onChange={(e) =>
                      setProduct((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 bg-white border border-primary outline-none rounded-lg"
                  />
                </label>
              </div>
              <div className="space-y-2">
                <label className="block text-right space-y-2">
                  <span className="text-sm md:text-base font-medium">
                    {t("productsPage.productPrice")}
                    <span className="text-xs text-error">*</span>
                  </span>
                  <input
                    type="number"
                    value={product.price}
                    onChange={(e) =>
                      setProduct((prev) => ({
                        ...prev,
                        price: +e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 bg-white border border-primary outline-none rounded-lg"
                  />
                </label>
              </div>
              <div className="space-y-2">
                <label className="block text-right space-y-2">
                  <span className="text-sm md:text-base font-medium">
                    {t("productsPage.productImage")}
                    <span className="text-xs text-error">*</span>
                  </span>
                </label>
                <ImageInput
                  handleFileChange={(file, blobUrl) => {
                    setProductImageFile(file);
                    setProduct((prev) => ({
                      ...prev,
                      imageUrl: blobUrl,
                    }));
                  }}
                />
              </div>
            </div>
            {showSeperator && <hr className="w-full " />}
            <div
              ref={previewRef}
              className="flex-1 space-y-6 min-w-full md:min-w-96"
            >
              <h2 className="px-4 border-r-4 border-accent font-medium text-base md:text-lg">
                {t("productsPage.preview")}
              </h2>
              <ProductCard
                userRole={UserRole.USER}
                product={product}
                isPreview={true}
              />
            </div>
          </div>
          <hr className="w-full " />
          <div className="space-y-4">
            {errorMsg && (
              <p className="text-sm font-medium text-error">{errorMsg}</p>
            )}
            <button
              className="px-10 py-2 text-lg transition-colors bg-accent 
                    hover:bg-accent-600 text-white font-medium rounded-lg"
              onClick={submit}
            >
              {t(`productsPage.${mode === "add" ? "submit" : "saveChanges"}`)}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductConfigurationPage;
