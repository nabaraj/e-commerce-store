import { Color } from "./colors";

export type Product = {
  id: number;
  imageURL: string;
  name: string;
  type: string;
  price: number;
  currency: string;
  color: Color;
  gender: string;
  quantity: number;
  cartCount?: number;
};
export type Products = Product[];

export interface FilterOption {
  input: string;
  name: string;
  values?: string[];
  min?: number;
  max?: number;
}

export interface Filters {
  type: FilterOption;
  price: FilterOption;
  color: FilterOption;
  gender: FilterOption;
}

export type SelectedFilters = {
  type: string[];
  price: number;
  color: string[];
  gender: string[];
  search: string;
};

export type FilterObject = {
  type: string[];
  price: {
    min: number;
    max: number;
  };
  color: string[];
  gender: string[];
  quantity?: number;
};
