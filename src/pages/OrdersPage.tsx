import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { User, UserRole } from "@/models/user";
import { Order, OrderStatus } from "@/models/order";
import { getAllOrders, getUserOrders, updateOrderStatus } from "@/apis/orders";
import { useMainContext } from "@/contexts/MainContext";
import Pagination from "@/components/Pagination";
import OrderCard from "@/components/OrderCard";
import LoaderIcon from "@/icons/LoaderIcon";

function OrdersPage() {
  const { t } = useTranslation();
  const { user, setLoading, getLoading } = useMainContext();
  const role = (user as User).roles[0];
  const [params, setParams] = useSearchParams();
  const page = +(params.get("page") || "");

  const [totalPages, setTotalPages] = useState(1);
  const [orders, setOrders] = useState<Record<number, Order[]>>({});
  const ordersLoading = getLoading("orders");

  const fetchOrders = async (page: number) => {
    if (orders[page]) return;
    setLoading("orders", true);
    const callback = role === UserRole.ADMIN ? getAllOrders : getUserOrders;
    try {
      const res = await callback({
        params: { page, size: 10 },
      });
      if (res.status === 200) {
        setOrders((prev) => ({ ...prev, [page]: res.data.content }));
        setTotalPages(Math.max(res.data.totalPages, 1));
      }
    } catch (e) {
      console.log(e);
    } finally {
      setTimeout(() => setLoading("orders", false), 1000);
    }
  };

  const updateOrderStatus = (
    page: number,
    index: number,
    status: OrderStatus
  ) => {
    setOrders((prev) => {
      const pageRecord = prev[page];
      pageRecord[index].status = status;
      return { ...prev, [page]: pageRecord };
    });
  };

  useEffect(() => {
    setLoading("orders", false);
    if (!params.get("page")) {
      params.append("page", "1");
      setParams(params);
    } else {
      fetchOrders(page - 1);
    }
  }, [page]);

  return ordersLoading ? (
    <div className="flex flex-1 items-center justify-center text-primary">
      <LoaderIcon className="w-16 h-16 animate-spin" />
    </div>
  ) : (
    <main
      className="flex flex-1 flex-col items-center w-full 2xl:max-w-[1200px] 
                space-y-10 px-6 sm:px-8 md:px-16 xl:px-32 py-16 text-primary"
    >
      <h1 className="self-start px-4 border-r-4 border-accent text-lg md:text-4xl font-bold">
        {t("ordersPage.title")}
      </h1>
      {orders[page - 1]?.length ? (
        <>
          <div className="w-full space-y-6 !mb-10">
            {orders[page - 1]?.map((order, index) => (
              <OrderCard
                key={order.orderId}
                userRole={role}
                order={order}
                onStatusChange={(status) =>
                  updateOrderStatus(page - 1, index, status)
                }
              />
            ))}
          </div>
          <div className="!mt-auto">
            <Pagination baseUrl="/orders" totalPages={totalPages} />
          </div>
        </>
      ) : (
        <div className="flex flex-col flex-1 items-center justify-center gap-6">
          <img
            src="src/assets/orders-empty.svg"
            alt="Not Found"
            className="w-[min(100%,_150px)] md:w-[min(100%,_300px)] p-8 bg-neutral 
                      mix-blend-multiply shadow-primary-50/50 shadow-md rounded-full"
          />
          <h2 className="font-medium text-lg">
            {t("ordersPage.empty.tagline")}
          </h2>
          {role === UserRole.USER && (
            <p className="font-medium text-sm">
              {t("ordersPage.empty.description")}
            </p>
          )}
        </div>
      )}
    </main>
  );
}

export default OrdersPage;
