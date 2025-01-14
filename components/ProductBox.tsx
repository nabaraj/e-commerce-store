import Image from "next/image";
import React, { ChangeEvent } from "react";
import { Product, SelectedFilters } from "../types/products";
import { formatINR } from "../utils";
import { ColorClasses, Color } from "../types/colors";
interface ProductBoxProps {
  // Add your props here
  product: Product;
  updateFilter: (
    input: string | number,
    filterType: keyof SelectedFilters,
    event?: ChangeEvent<HTMLInputElement>
  ) => void;
  addToCart: (id: string | number) => void;
}

export const ProductBox: React.FC<ProductBoxProps> = ({
  product,
  updateFilter,
  addToCart
}) => {
  // Add your component logic here
  const { imageURL, name, price, currency, color, type, id, quantity } =
    product;
  return (
    <div className='bg-white hover:-translate-y-1 group hover:shadow-lg transition-all relative border border-gray-200 rounded-2xl pb-5 col-span-1'>
      {/* Image */}
      <div className='p-2'>
        <div className='mb-4 cursor-pointer p-2 overflow-hidden'>
          <Image
            width={326}
            height={346}
            src={imageURL}
            alt={name}
            className='aspect-[33/35] w-full object-contain scale-105 group-hover:scale-110 transition duration-700 ease-in'
          />
        </div>
      </div>

      {/* Product Details */}
      <div className='px-4'>
        <div className='flex gap-2'>
          <h5 className='text-base font-bold text-gray-800'>{name}</h5>
          <h6 className='text-base text-gray-800 font-bold ml-auto'>
            {formatINR(price, currency)}
          </h6>
        </div>
        <div className='text-gray-500 text-[13px] mt-2 flex gap-x-1 justify-between'>
          <div>
            <span className='font-bold'>{type}</span>
            <span>{quantity}</span>
          </div>
          <div className='col-span-2 flex justify-between items-center'>
            <span
              onClick={() => updateFilter(color, "color")}
              className={`${
                ColorClasses[color.toLowerCase() as Color]
              } w-4 h-4 rounded-md text-opacity-0 cursor-pointer border border-gray-200`}
            ></span>
          </div>
        </div>

        {/* Wishlist and Cart */}
        <div className='flex items-center gap-2 mt-4'>
          <button
            onClick={() => addToCart(id)}
            type='button'
            className='text-sm px-2 h-9 font-semibold w-full bg-blue-600 hover:bg-blue-700 text-white tracking-wide ml-auto outline-none border-none rounded-xl'
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};
