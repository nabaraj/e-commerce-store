import React, { ChangeEvent, useState } from "react";
import { SelectedFilters } from "../types/products";
interface SearchProps {
  // Add your props here
  updateFilter: (
    input: string | number,
    filterType: keyof SelectedFilters,
    event?: ChangeEvent<HTMLInputElement>
  ) => void;
}

export const Search: React.FC<SearchProps> = ({ updateFilter }) => {
  // Add your component logic here
  const [search, setSearch] = useState("");
  return (
    <div className='mb-4 col-span-3 px-3 pt-4 relative flex items-center max-w-sm mx-auto'>
      <label htmlFor='simple-search' className='sr-only'>
        Search
      </label>
      <div className='relative w-full'>
        <input
          type='text'
          id='simple-search'
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          placeholder='Search products...'
          required
          value={search}
          onChange={(e) =>
            // setSelectedFilters((selected) => ({
            //   ...selected,
            //   search: e.target.value
            // }))
            setSearch(e.target.value)
          }
        />
      </div>
      <button
        onClick={() => updateFilter(search, "search")}
        type='submit'
        className='p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
      >
        <svg
          className='w-4 h-4'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 20 20'
        >
          <path
            stroke='currentColor'
            stroke-linecap='round'
            stroke-linejoin='round'
            stroke-width='2'
            d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
          />
        </svg>
        <span className='sr-only'>Search</span>
      </button>
    </div>
  );
};
