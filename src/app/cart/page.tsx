'use client'
import AddressInputs from '@/components/common/form/AddressInputs'
import CartProduct from '@/components/features/cart/CartProduct'
import OrderSummary from '@/components/features/cart/OrderSummary'
import { useProfile } from '@/components/hooks/useProfile'
import { ChevronLeftIcon } from '@/icons/ChevronLeftIcon'
import { CartContext, calCartProductPrice } from '@/util/ContextProvider'
import { getDistance } from "@/util/Distance"
import { Button, Link } from '@nextui-org/react'
import { FormEvent, useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const CartPage = () => {
  const { cartProducts, removeCartProduct } = useContext(CartContext);
  const [address, setAddress] = useState<any>({});
  const { data: profileData } = useProfile();
  const [payNow, setPayNow] = useState(false);
  const [distance, setDistance] = useState<number | null>(null);
  const [deliveryFee, setDeliveryFee] = useState<number | null>(null);
  const [serviceCharge, setServiceCharge] = useState<number | null>(null);

  useEffect(() => {
    if (profileData) {
      const { phone, streetAddress, city, state, country, postalCode } = profileData;
      setAddress({ phone, streetAddress, city, state, country, postalCode });
    }
  }, [profileData]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.location.href.includes('canceled=1')) {
        toast.error('Payment failed 🙁')
      }
    }
  }, []);

  let subtotal = 0;
  cartProducts.forEach(cartProduct => {
    subtotal += calCartProductPrice(cartProduct) as number;
  });

  // ✅ update address + recalc delivery distance/fee
 async function handleAddressChange(propName: string, value: string): Promise<void> {
  const updated = { ...address, [propName]: value };
  setAddress(updated);

  const origin = "1560 Dundas St. London Ontario";
  const destination = `${updated.streetAddress || ""} ${updated.city || ""}`.trim();

  if (origin && destination) {
    try {
      const result = await getDistance(String(origin), String(destination));

      if (result) {
        setDistance(result.distanceValue);
        setDeliveryFee(result.price);           // ✅ Delivery fee
        setServiceCharge(result.serviceCharge); // ✅ Service charge
        console.log(
          "Distance:",
          result.distanceText,
          result.distanceValue,
          "Price:",
          result.price,
          "Service Charge:",
          result.serviceCharge
        );
      } else {
        setDistance(null);
        setDeliveryFee(null);
        setServiceCharge(null);
      }
    } catch (error) {
      console.error("Error getting distance:", error);
      setDistance(null);
      setDeliveryFee(null);
      setServiceCharge(null);
    }
  }
}


 async function proceedToCheckOut(event: FormEvent<HTMLFormElement>): Promise<void> {
  event.preventDefault();

  if (deliveryFee === null) {
    toast.error("Sorry, we don’t deliver to this address (beyond 20 km).");
    return;
  }

  const orderPromise = new Promise(async (resolve, reject) => {
    const response = await fetch(`/api/checkout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        address,
        cartProducts,
        deliveryFee,
        serviceCharge, // ✅ send serviceCharge as well
      }),
    }).then(async response => {
      if (response.ok) {
        const data = await response.json();
        window.location.href = data.url; // ✅ proper redirect
        resolve(true);
      } else {
        reject();
      }
    });
  });

  await toast.promise(orderPromise, {
    loading: "Preparing your order...",
    success: "Redirecting to payment...",
    error: "Something went wrong, please try again later.",
  });
}


  if (cartProducts.length === 0) {
    return (
      <section className='max-w-2xl mx-auto my-8 px-4 sm:my-16'>
        <div className='my-4 flex flex-col gap-4 items-center text-center'>
          <p className='text-2xl sm:text-3xl font-semibold items-center'>Your Shopping Cart is Empty</p>
          <Link href={'/menu'} className='text-primary font-semibold'>
            <span>Continue shopping</span>
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className='pt-6 pb-12 sm:pt-10 sm:pb-20 max-w-6xl mx-auto px-4'>
      <Link href={'/menu'} className='text-primary font-semibold inline-flex items-center'>
        <ChevronLeftIcon className={'w-4 mr-2'} />
        <span>Continue shopping</span>
      </Link>
      {cartProducts.length > 0 &&
        <div className='mt-8 space-y-8 lg:space-y-0 lg:grid lg:grid-cols-5 lg:gap-12'>
          <div className='lg:col-span-3'>
            <h2 className='border-b-1 font-semibold py-3 text-primary'>Cart</h2>
            <div className='space-y-4 mt-4'>
              {cartProducts && cartProducts.map((product, index) => (
                <CartProduct
                  key={index}
                  product={product}
                  onRemove={() => removeCartProduct(index)}
                  productPrice={calCartProductPrice(product)}
                />
              ))}
            </div>
            <div className='mt-8'>
              <OrderSummary 
                subtotal={subtotal}
                deviveryFee={deliveryFee ?? 0}
                serviceCharge={serviceCharge ?? 0}
                discount={0}
                taxes={13}
                paid={false}
              />

            </div>
          </div>
          <div className='lg:col-span-2'>
            <h2 className='font-semibold py-3 text-primary'>
              Check Out
            </h2>
            <div className='rounded-xl p-4 sm:p-6 bg-gray-800'>
              <form className='flex flex-col gap-3 mt-3' onSubmit={proceedToCheckOut}>
                <div>
                  <AddressInputs
                    addressProps={address}
                    setAddressProps={(propName: string, value: string) => handleAddressChange(propName, value)}
                    disabled={false}
                  />
                </div>
                <Button
                  type="submit"
                  color="primary"
                  fullWidth
                  onClick={() => setPayNow(true)}
                  isDisabled={deliveryFee === null}
                >
                  {deliveryFee === null
                    ? "Out of delivery range"
                    : `Pay ${(subtotal + (deliveryFee ?? 0) + (serviceCharge ?? 0) + subtotal * 0.13).toFixed(2)}$`}
                </Button>

              </form>
            </div>
          </div>
        </div>
      }
    </section>
  )
}

export default CartPage
