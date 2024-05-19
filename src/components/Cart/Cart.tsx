'use client';

import Image from 'next/image';
import { FaTrashAlt } from 'react-icons/fa';
import { Product } from '@/types/product';
import { Alike_Angular } from 'next/font/google';

interface CartProps {
  cart: Product[];
  removeFromCart: (cartItemId: string) => void;
  alignment: 'center' | 'end';
}

const Cart: React.FC<CartProps> = ({
  cart = [],
  removeFromCart,
  alignment,
}) => {
  const totalAmount = cart.reduce(
    (total, product) => total + product.price,
    0
  );

  return (
    <div>
      <div className="custom-container flex justify-center items-center py-[60px] md:py-0">
        <div className="w-[618px] sm:w-full sm:px-0 sm:py-[60px] md:w-full md:px-5 md:py-[60px]">
          <div className="cart-container border rounded px-2 py-3">
            <p className="text-[12px] font-primary font-bold leading-[20px] tracking-[2px] w-full bg-[#212529] uppercase text-white py-[10px] rounded-[5px] text-center mb-3">
              Selected Products
            </p>
            <div className="flex flex-col gap-3">
              {cart.map((item) => (
                <div
                  key={item.cartItemId}
                  className="flex items-center border rounded bg-[#F7F8F8] h-[161px]"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={163}
                    height={159}
                    className="rounded w-[163px] h-full"
                  />

                  <div className="flex-grow pl-4 pr-8">
                    <h3 className="text-[16px] font-primary leading-[24px] font-normal mb-4 overflow-hidden line-clamp-1">
                      {item.title}
                    </h3>
                    <div className="text-yellow-500">
                      {Array(Math.round(item.rating.rate))
                        .fill(0)
                        .map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                    </div>
                    <p className="text-xs text-gray-500 pb-[9px]">
                      ({item.rating.count} Review)
                    </p>
                    <p className="text-[18px] font-bold leading-[27xp] font-primary text-red-500">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <button
                    className="text-red-500 hover:text-red-700 pr-2"
                    onClick={() =>
                      removeFromCart(item.cartItemId)
                    }
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <p
                className={`text-[12px] font-bold leading-[20px] tracking-[2px] py-6 uppercase md:text-center sm:text-center ${alignment === 'center'
                  ? 'text-end'
                  : 'text-center'
                  }`}
              >
                Total: ${totalAmount.toFixed(2)}
              </p>
              <div className="mt-2">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                  />
                  <span className="ml-[40px] text-[12px] font-normal font-primary leading-[20px] tracking-[2px] ">
                    I've read and agree to the{' '}
                    <a href="#" className=" underline">
                      terms and conditions
                    </a>
                    ,{' '}
                    <a href="#" className=" underline">
                      refund policy
                    </a>{' '}
                    &{' '}
                    <a href="#" className=" underline">
                      privacy policy
                    </a>
                  </span>
                </label>
              </div>
              <div
                className={`flex justify-end sm:justify-center md:justify-center ${alignment === 'center'
                  ? 'justify-end'
                  : 'justify-center'
                  }`}
              >
                <button className="mt-6 bg-[#212529] text-white p-[10px] rounded-[5px] hover:bg-gray-800 text-[12px] font-primary font-bold leading-[20px] tracking-[2px] uppercase">
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
