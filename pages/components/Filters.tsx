import { ChangeEvent } from "react";
import { Color, ColorClasses } from "../types/colors";
import { FilterOption, SelectedFilters } from "../types/products";
import { debounce, formatINR } from "../utils";

export const getFilterInput = (
  filterData: FilterOption,
  updateFilter: (
    input: string,
    value: string,
    event?: ChangeEvent<HTMLInputElement>
  ) => void,
  type: string,
  selectedFilters: SelectedFilters
) => {
  const values = filterData.values || [];
  const updateFilterDebounce = debounce(updateFilter, 100);
  switch (filterData.input) {
    case "colorbox":
      return (
        <div className='colorbox grid grid-cols-12 gap-1'>
          {values?.map((color) => (
            <label
              key={color}
              className={`flex items-center cursor-pointer relative border border-gray-300 rounded-xl ${
                ColorClasses[color.toLowerCase() as Color]
              }`}
            >
              <input
                type='checkbox'
                className='peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md'
                id={color}
                checked={selectedFilters.color.includes(color)}
                onChange={(e) => updateFilter(color, "color", e)}
              />
              <span className='absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-3.5 w-3.5 stroke-gray-500'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  stroke='currentColor'
                  stroke-width='1'
                >
                  <path
                    fill-rule='evenodd'
                    d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                    clip-rule='evenodd'
                  ></path>
                </svg>
              </span>
            </label>
          ))}
        </div>
      );
    case "slide":
      return (
        <div className='px-2'>
          <div className='flex text-xs font-bold'>
            <span>{formatINR(filterData.min || 0)}</span>
            <span className='px-1'>-</span>
            <span>{formatINR(selectedFilters.price)}</span>
          </div>
          <input
            id='price'
            type='range'
            min={filterData.min}
            max={filterData.max}
            step='1'
            value={selectedFilters.price}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateFilterDebounce(e.target.value, "price")
            }
            className='h-2 w-full bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700'
          />
        </div>
      );
    case "radio":
      return (
        <div>
          {values.map((gender) => {
            return (
              <div key={gender}>
                <input
                  type='radio'
                  className='mr-2'
                  value={gender}
                  name='gender'
                  id={gender}
                  onChange={() => updateFilter(gender, "gender")}
                />
                <label htmlFor={gender} key={gender}>
                  {gender}
                </label>
              </div>
            );
          })}
        </div>
      );
    default:
      return (
        <div className='w-full'>
          {values?.map((value) => (
            <div key={value}>
              <input
                type='checkbox'
                className='mr-2'
                id={value}
                name={value}
                value={value}
                onChange={(e) => updateFilter(e.target.value, type, e)}
              />
              <label htmlFor={value}>{value}</label>
            </div>
          ))}
        </div>
      );
  }
};
