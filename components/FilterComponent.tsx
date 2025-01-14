import React, { ChangeEvent, JSX } from "react";
import { getFilterInput } from "./Filters";
import { FilterOption, Filters, SelectedFilters } from "../types/products";
export interface FilterComponentProps {
  filters: Filters;
  selectedFilters: SelectedFilters;
  className?: string;
  updateFilter: (
    input: string | number,
    filterType: keyof SelectedFilters, // Ensure this is keyof SelectedFilters
    event?: ChangeEvent<HTMLInputElement> | undefined
  ) => void;
  getFilterInput: (
    filterData: FilterOption,
    updateFilter: (
      input: string,
      value: string,
      event?: ChangeEvent<HTMLInputElement>
    ) => void,
    type: string,
    selectedFilters: SelectedFilters
  ) => JSX.Element;
}

export const FilterComponent: React.FC<FilterComponentProps> = ({
  filters,
  selectedFilters,
  updateFilter,
  className = ""
}) => {
  // Add your component logic here
  return (
    <div className={`${className}`}>
      {filters &&
        Object.keys(filters).map((type) => {
          const filter = filters[type as keyof Filters];
          return (
            <div key={type} className='pb-3 mb-3 border-b border-gray-300'>
              <h3 className='text-xl font-bold mb-1'>{filter.name}</h3>

              {getFilterInput(
                filter,
                (input, value, event) =>
                  updateFilter(input, value as keyof SelectedFilters, event), // Cast value
                type,
                selectedFilters
              )}
            </div>
          );
        })}
    </div>
  );
};
