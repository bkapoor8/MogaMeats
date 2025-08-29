interface OrderSummaryProps {
  orderId?: string;
  subtotal: number;
  deviveryFee: number; // keeping your original prop name
  discount: number;
  taxes: number; // percentage, e.g. 13 = 13%
  paid: boolean;
  // new optional prop: if true, tax is applied to (subtotal + deliveryFee - discount)
  // if false (default) tax is applied to subtotal - discount
  taxesApplyToDelivery?: boolean;
}

const OrderSummary = ({
  orderId,
  subtotal,
  deviveryFee,
  discount,
  taxes,
  paid,
  taxesApplyToDelivery = false,
}: OrderSummaryProps) => {

  const round2 = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100;

  // choose which parts are taxable
  const taxableBase = subtotal + (taxesApplyToDelivery ? deviveryFee : 0) - discount;
  const taxAmount = round2((Math.max(taxableBase, 0) * taxes) / 100);
  const total = round2(taxableBase + taxAmount);


  return (
    <>
      <div className="grid grid-cols-8 pt-2">
        <div className="pl-4 col-span-7 flex justify-between font-semibold">
          <span>Subtotal</span>
          <span>{subtotal.toFixed(2)}$</span>
        </div>
      </div>

      <div className="grid grid-cols-8 pt-1">
        <div className="pl-4 col-span-7 flex justify-between text-gray-400">
          <span>Delivery fee</span>
          <span>{deviveryFee}$</span>
        </div>
      </div>

      <div className="grid grid-cols-8 pt-1 pb-2 border-b border-dashed">
        <div className="pl-4 col-span-7 flex justify-between text-gray-400">
          <span>Discount</span>
          <span>-{discount.toFixed(2)}$</span>
        </div>
      </div>

      <div className="grid grid-cols-8 pt-1 pb-2 border-b border-dashed">
        <div className="pl-4 col-span-7 flex justify-between text-gray-400">
          <span>Taxes ({taxes}%)</span>
          <span>{taxAmount.toFixed(2)}$</span>
        </div>
      </div>

      {/* <div className="grid grid-cols-8 pt-2">
        <div className="pl-4 col-span-7 flex justify-between font-semibold">
          <span>Total</span>
          <span>{total.toFixed(2)}$</span>
        </div>
      </div> */}

      {orderId && (
        <div className="grid grid-cols-8 pt-1">
          <div className="pl-4 col-span-7 flex justify-between font-semibold">
            <span>Amount Paid</span>
            <span>{paid ? total.toFixed(2) : "0.00"}$</span>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderSummary;
