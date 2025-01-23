import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { formatCurrency } from "@/utils/formatters";
import { UserRole } from "@/models/user";
import { Order, OrderStatus, ProductResponseDTO } from "@/models/order";
import { Dropdown } from "@/components/Dropdown";
import { MailIcon, MapPin, PhoneIcon, UserIcon } from "lucide-react";
import { updateOrderStatus } from "@/apis/orders";

interface Props {
  userRole: UserRole;
  order: Order;
  onStatusChange: (status: OrderStatus) => void;
}

function OrderCard({ userRole, order, onStatusChange }: Props) {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(userRole === UserRole.USER);

  const updateStatus = async (newStatus: OrderStatus) => {
    try {
      const res = await updateOrderStatus(order.orderId, newStatus);
      if (res.status === 200) {
        onStatusChange(res.data.status);
      }
    } catch (error) {}
  };

  return (
    <div
      className="w-full flex flex-col p-4 text-primary bg-neutral 
                rounded-lg shadow-primary/30 shadow-md"
    >
      <div className="flex items-center justify-between mb-4">
        <p className="font-medium">
          {t("ordersPage.status")}: {t(`ordersPage.status${order.status}`)}
        </p>
        {userRole === UserRole.ADMIN && (
          <Dropdown
            options={[
              {
                id: OrderStatus.PENDING,
                label: t(`ordersPage.status${OrderStatus.PENDING}`),
              },
              {
                id: OrderStatus.SHIPPED,
                label: t(`ordersPage.status${OrderStatus.SHIPPED}`),
              },
              {
                id: OrderStatus.ARRIVED,
                label: t(`ordersPage.status${OrderStatus.ARRIVED}`),
              },
            ]}
            selectedOptionId={order.status}
            handleChange={(status) => updateStatus(status as OrderStatus)}
          />
        )}
      </div>
      {userRole === UserRole.ADMIN && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex items-center gap-4 py-2">
              <div className="flex items-center justify-center min-w-10 h-10 bg-neutral-400 border border-primary/50 rounded-md shadow-md shadow-primary/30">
                <UserIcon className="text-primary" />
              </div>
              <p className="text-base md:text-lg font-medium">
                {order.user.userName || order.user.username}
              </p>
            </div>
            <div className="flex items-center gap-4 py-2">
              <div className="flex items-center justify-center min-w-10 h-10 bg-neutral-400 border border-primary/50 rounded-md shadow-md shadow-primary/30">
                <MailIcon className="text-primary" />
              </div>
              <p className="text-base md:text-lg font-medium">
                {order.user.email}
              </p>
            </div>
            <div className="flex items-center gap-4 py-2">
              <div className="flex items-center justify-center min-w-10 h-10 bg-neutral-400 border border-primary/50 rounded-md shadow-md shadow-primary/30">
                <MapPin className="text-primary" />
              </div>
              <p className="text-base md:text-lg font-medium">
                {order.user.address}
              </p>
            </div>
            <div className="flex items-center gap-4 py-2">
              <div className="flex items-center justify-center min-w-10 h-10 bg-neutral-400 border border-primary/50 rounded-md shadow-md shadow-primary/30">
                <PhoneIcon className="text-primary" />
              </div>
              <p className="text-base md:text-lg font-medium">
                {order.user.phone}
              </p>
            </div>
          </div>
          <hr className="mb-6 border-primary/50" />
        </>
      )}
      <motion.div
        initial={
          userRole === UserRole.ADMIN && {
            height: 0,
            marginBottom: 0,
            opacity: 0,
            visibility: "hidden",
          }
        }
        animate={{
          height: expanded ? "fit-content" : 0,
          marginBottom: expanded && userRole === UserRole.ADMIN ? 24 : 0,
          opacity: expanded ? 1 : 0,
          visibility: expanded ? "visible" : "hidden",
        }}
        className="order-details border border-primary/50 rounded-md overflow-x-auto"
      >
        <div className="min-w-fit overflow-clip">
          <div
            className="grid grid-cols-[40px_repeat(4,_minmax(125px,_1fr))] gap-4 p-4 
                    bg-neutral-400/60 border-b border-primary/50 md:grid-cols-[48px_repeat(4,_minmax(125px,_1fr))]"
          >
            <div></div>
            <p className="font-bold">{t("ordersPage.productName")}</p>
            <p className="font-bold">{t("ordersPage.price")}</p>
            <p className="font-bold">{t("ordersPage.quantity")}</p>
            <p className="font-bold">{t("ordersPage.amount")}</p>
          </div>
          {order.products.map((product) => (
            <OrderItem
              key={product.productId}
              userRole={userRole}
              item={product}
            />
          ))}
          <div
            className="grid grid-cols-[40px_repeat(4,_minmax(125px,_1fr))] gap-4 p-4 
                    odd:bg-neutral-400/60 md:grid-cols-[48px_repeat(4,_minmax(125px,_1fr))]"
          >
            <div className="col-span-3"></div>
            <p className="font-bold">{t("ordersPage.total")}</p>
            <p className="font-bold">
              {formatCurrency(
                order.products.reduce(
                  (acc, product) => acc + product.price * product.quantity,
                  0
                )
              )}
            </p>
          </div>
        </div>
      </motion.div>
      {userRole === UserRole.ADMIN && (
        <button
          className="font-medium text-accent hover:text-accent-600 transition-colors"
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded ? t("ordersPage.hideDetails") : t("ordersPage.showDetails")}
        </button>
      )}
    </div>
  );
}

function OrderItem({
  userRole,
  item,
}: {
  userRole: UserRole;
  item: ProductResponseDTO;
}) {
  return (
    <div
      className="grid grid-cols-[auto_repeat(4,_minmax(125px,_1fr))] items-center group
                odd:bg-neutral-400/60 gap-4 p-4 border-b border-primary/30"
    >
      <div className="w-10 h-10 md:w-12 md:h-12 overflow-hidden rounded-lg">
        <img
          src={item.imageUrl}
          alt="order-item"
          className="min-w-full min-h-full object-cover group-hover:scale-110 transition-transform duration-200"
        />
      </div>
      {userRole === UserRole.ADMIN ? (
        <Link
          to={`/products/${item.productId}`}
          className="pr-2 font-medium truncate"
        >
          {item.name}
        </Link>
      ) : (
        <p className="pr-2 font-medium truncate">{item.name}</p>
      )}
      <p className="font-medium">{formatCurrency(item.price)}</p>
      <p className="font-medium">{item.quantity}</p>
      <p className="font-medium">
        {formatCurrency(item.price * item.quantity)}
      </p>
    </div>
  );
}

export default OrderCard;
