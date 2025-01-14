import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
interface HeaderProps {
  // Add your props here
  cartItems: Record<string, number>;
  cartWarning?: boolean;
  children?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  cartItems,
  cartWarning,
  children
}) => {
  const pathname = usePathname();
  const [count, setCount] = useState(0);
  const [showNav, setShowNav] = useState(false);

  const updateHeaderCount = (cartitems: Record<string, number>) => {
    const totalCartItems = Object.values(cartitems).reduce(
      (total: number, cartCount) => total + cartCount,
      0
    );
    setCount(totalCartItems);
  };
  useEffect(() => {
    const storageCartItems = window.localStorage.getItem("cartItems");
    if (storageCartItems) {
      const cartitems: Record<string, number> = JSON.parse(storageCartItems);
      updateHeaderCount(cartitems);
    }
  }, [cartItems]);
  return (
    <header className='bg-white shadow-md fixed left-0 right-0 top-0 z-10'>
      <div className='container mx-auto p-4 flex justify-between items-center relative md:static'>
        <Link href='/' className='flex items-center'>
          <span className='text-xl font-bold ml-2'>Your Store</span>
        </Link>
        <button
          data-collapse-toggle='navbar-default'
          type='button'
          className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100  dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
          aria-controls='navbar-default'
          aria-expanded='false'
          onClick={() => setShowNav(!showNav)}
        >
          <span className='sr-only'>Open main menu</span>
          <svg
            className='w-5 h-5'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 17 14'
          >
            <path
              stroke='currentColor'
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              d='M1 1h15M1 7h15M1 13h15'
            />
          </svg>
        </button>
        <div
          className={`${
            showNav ? "flex" : "hidden"
          } md:flex flex-col md:flex-row md:items-center absolute md:static top-16 left-0 right-0 bg-gray-100 md:bg-transparent`}
        >
          <Link
            href='/'
            className='p-4 md:py-0 block md:inline-block border border-b-gray-500 md:border-0'
          >
            <span className=''>Products</span>
          </Link>
          {pathname !== "/cart" && (
            <Link
              href='/cart'
              className='relative block md:inline-block p-4 md:py-0  border border-b-gray-500 md:border-0'
            >
              <span className='inline-block relative'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  stroke-width='2'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
                  />
                </svg>
                <span className='absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold'>
                  {count}
                </span>
              </span>
            </Link>
          )}
          {children}
        </div>
      </div>
      {cartWarning && (
        <div className='text-center absolute top-full bg-orange-300 w-full py-3'>
          Sorry, the quantity exceeds available stock. Please adjust your order.
          Thank you!
        </div>
      )}
    </header>
  );
};
