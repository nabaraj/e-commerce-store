import { ChangeEvent, useEffect, useState } from "react";
import { Filters, Product, SelectedFilters } from "../types/products";
import { getFilterInput } from "../components/Filters";
import { ProductBox } from "../components/ProductBox";
import { Search } from "../components/Search";
import { Header } from "../components/Header";
import { GridSwitch } from "../components/GridSwitch";
import { FilterComponent } from "../components/FilterComponent";
import { ProductSkeleton } from "../components/ProductSkeleton";

const defaultFilters = {
  type: [],
  price: 0,
  color: [],
  gender: [],
  search: ""
};

export default function Home() {
  const [products, setProducts] = useState([] as Product[]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({} as Filters);
  const [cartItems, setCartItems] = useState({} as Record<string, number>);
  const [cartWarning, setCartWarning] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState(
    defaultFilters as SelectedFilters
  );
  const [gridCount, setGridCount] = useState(3);
  const [filteredResult, setFilterdResult] = useState([] as Product[]);

  const getProducts = async () => {
    setIsLoading(true);
    const result = await fetch("./api/products");
    const response = await result.json();
    setIsLoading(false);
    setProducts(response.products);
    setSelectedFilters((filters) => ({
      ...filters,
      price: response.filters.price.max
    }));
    setFilters(response.filters);
  };

  useEffect(() => {
    getProducts();
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  const updateFilter = (
    input: string | number,
    filterType: keyof SelectedFilters, // Ensure this is keyof SelectedFilters
    event?: ChangeEvent<HTMLInputElement> | undefined
  ) => {
    setSelectedFilters((prevFilters) => {
      // Create a copy of the previous filters
      const updatedFilters = { ...prevFilters };
      console.log(input, event);

      switch (filterType) {
        case "search":
          updatedFilters.search = typeof input === "string" ? input : "";
          break;

        case "price":
          updatedFilters.price = Number(input);
          break;

        default:
          if (Array.isArray(prevFilters[filterType])) {
            const filterArray = prevFilters[filterType] as string[];
            updatedFilters[filterType] = event?.target.checked
              ? [...filterArray, input as string]
              : !event && filterType === "color"
              ? [...filterArray, input as string]
              : filterArray.filter((item) => item !== input);
          }
          break;
      }

      return updatedFilters;
    });
  };
  const updateCart = (id: string | number) => {
    console.log(id);
    const productforcart = products.filter(
      (product) => product.id.toString() === id.toString()
    );
    const productInCart = cartItems[id];
    if (!productInCart) {
      const updatedCartItem = { ...cartItems, [id.toString()]: 1 };
      setCartItems(updatedCartItem);
      window.localStorage.setItem("cartItems", JSON.stringify(updatedCartItem));
    } else {
      if (productInCart + 1 > productforcart[0].quantity) {
        setCartWarning(true);
        setTimeout(() => setCartWarning(false), 10000);
      } else {
        const updatedCartItem = { ...cartItems };
        updatedCartItem[id] = updatedCartItem[id] + 1;
        // window.localStorage.setItem("cartItems", cartItems.toString());
        setCartItems(updatedCartItem);
        window.localStorage.setItem(
          "cartItems",
          JSON.stringify(updatedCartItem)
        );
      }
    }
  };
  useEffect(() => {
    const filterProducts = (products: Product[]) => {
      let productFiltered = products;
      console.log({ selectedFilters });

      productFiltered = selectedFilters.search
        ? products.filter(
            (product) =>
              product.name
                .toLowerCase()
                .includes(selectedFilters.search.toLowerCase()) ||
              product.color
                .toLowerCase()
                .includes(selectedFilters.search.toLowerCase()) ||
              product.type
                .toLowerCase()
                .includes(selectedFilters.search.toLowerCase())
          )
        : products;

      if (selectedFilters.color.length > 0) {
        productFiltered = productFiltered.filter((product) => {
          return selectedFilters.color.includes(product.color);
        });
      }

      if (selectedFilters.gender.length > 0) {
        productFiltered = productFiltered.filter((product) => {
          return selectedFilters.gender.includes(product.gender);
        });
      }

      if (selectedFilters.type.length > 0) {
        productFiltered = productFiltered.filter((product) => {
          console.log({ product });
          return selectedFilters.type.includes(product.type);
        });
      }

      productFiltered = productFiltered.filter((product) => {
        return (
          product.price >= (filters?.price?.min ?? 0) &&
          product.price <= selectedFilters.price
        );
      });

      // return productFiltered;
      setFilterdResult(productFiltered);
    };
    filterProducts(products);
  }, [products, selectedFilters, filters]);

  return (
    <div className='h-full pt-16'>
      <Header cartItems={cartItems} cartWarning={cartWarning}>
        <FilterComponent
          filters={filters}
          selectedFilters={selectedFilters}
          getFilterInput={getFilterInput}
          updateFilter={updateFilter}
          className='md:hidden px-4'
        />
      </Header>

      <div className='container mx-auto px-4'>
        <div className='grid md:grid-cols-4 gap-3 grid-flow-dense'>
          {/* Aside */}
          <aside className='col-span-1 hidden md:block'>
            <div className='fixed top-15 rounded-md border border-gray-300 p-4 bg-white '>
              <FilterComponent
                filters={filters}
                selectedFilters={selectedFilters}
                getFilterInput={getFilterInput}
                updateFilter={updateFilter}
              />
            </div>
          </aside>

          {/* Main Content */}
          <main
            className={`font-[sans-serif] col-span-3 bg-white rounded-md border border-gray-300 p-4`}
          >
            {/* Search Bar */}
            <Search updateFilter={updateFilter} />
            <div className='hidden col-span-3 md:flex justify-end mb-4'>
              <GridSwitch
                gridCount={1}
                selectedGrid={gridCount}
                clickHandler={(num) => setGridCount(num)}
              />
              <GridSwitch
                gridCount={2}
                selectedGrid={gridCount}
                clickHandler={(num) => setGridCount(num)}
              />
              <GridSwitch
                gridCount={3}
                selectedGrid={gridCount}
                clickHandler={(num) => setGridCount(num)}
              />
            </div>
            <div
              className={`productGridContainer grid grid-cols-1 md:grid-cols-${gridCount} gap-4`}
            >
              {/*loading*/}
              {isLoading && <ProductSkeleton />}
              {/* Products */}
              {!isLoading &&
                filteredResult.map((product) => (
                  <ProductBox
                    key={product.id}
                    product={product}
                    updateFilter={updateFilter}
                    addToCart={updateCart}
                  />
                ))}
            </div>
          </main>
        </div>
      </div>
      <div className=' bg-gray-100 fixed -z-10 top-0 bottom-0 left-0 right-0'></div>
    </div>
  );
}
