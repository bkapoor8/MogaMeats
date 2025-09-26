"use client";
import AddressInputs from "@/components/common/form/AddressInputs";
import CartProduct from "@/components/features/cart/CartProduct";
import OrderSummary from "@/components/features/cart/OrderSummary";
import { TickIcon } from "@/icons/TickIcon";
import { ICartProduct } from "@/types/CartProduct";
import Order from "@/types/Order";
import { CartContext, calCartProductPrice } from "@/util/ContextProvider";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { useParams, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const OrderPage = () => {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const { clearCart } = useContext(CartContext);
  const [showMessage, setShowMessage] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && id) {
      const clearCartParam = searchParams.get("clear-cart");
      
      if (clearCartParam) {
        if (clearCartParam === "1") {
          setShowMessage(true);
          setIsSuccess(true);
          clearCart();
        } else {
          setShowMessage(true);
          setIsSuccess(false);
        }
      }

      // Fetch order data
      fetch(`/api/orders?_id=${id}${clearCartParam ? `&clear-cart=${clearCartParam}` : ''}`)
        .then((res) => res.json())
        .then((data) => {
          setOrder(data);
        })
        .catch((error) => {
          console.error("Error fetching order:", error);
        });
    }
  }, [id, searchParams]);

  let subtotal = 0;
  if (order?.cartProducts) {
    order?.cartProducts.forEach((cartProduct) => {
      subtotal += calCartProductPrice(cartProduct) as number;
    });
  }

  const getStatusMessage = () => {
    if (isSuccess) {
      return (
        <div className="text-2xl font-semibold text-green-600 justify-center italic mb-6 flex gap-2 items-center">
          <TickIcon className={"w-16"} />
          Order Paid Successfully!
        </div>
      );
    } else if (showMessage && !isSuccess) {
      return (
        <div className="text-2xl font-semibold text-red-600 justify-center italic mb-6 flex gap-2 items-center">
          <TickIcon className={"w-16"} />
          Payment Failed - Order Cancelled
        </div>
      );
    }
    return null;
  };

  return (
    <section className="pt-10 pb-20 max-w-6xl mx-auto">
      {getStatusMessage()}
      
      <Breadcrumbs size="lg">
        <BreadcrumbItem href="/orders">Orders</BreadcrumbItem>
        <BreadcrumbItem>ID {id}</BreadcrumbItem>
      </Breadcrumbs>
      
      <div>
        {order && (
          <div className="grid grid-cols-5 mt-8 gap-12">
            <div className="col-span-3">
              <h2 className="border-b-1 font-semibold py-3 text-primary">
                Order Details{" "}
              </h2>
              {order.cartProducts.map(
                (product: ICartProduct, index: number) => (
                  <CartProduct
                    key={index}
                    product={product}
                    productPrice={calCartProductPrice(product)}
                  />
                )
              )}
              <OrderSummary
                orderId={order._id}
                subtotal={subtotal}
                deviveryFee={5}
                serviceCharge={0}  
                taxes={13}
                discount={0}
                paid={order.paid}
              />
            </div>
            <div className="col-span-2">
              <h2 className="font-semibold py-3 text-primary">
                Delivery Information
              </h2>
              <div className="rounded-xl p-4 shadow-xl bg-gray-800">
                <div>
                  <AddressInputs
                    addressProps={order}
                    disabled={true}
                    setAddressProps={function (
                      propName: string,
                      value: string
                    ): void {}}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default OrderPage;