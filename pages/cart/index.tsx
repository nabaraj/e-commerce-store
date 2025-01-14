import { useState, useEffect } from "react";
import { Product } from "../../types/products";
import { Header } from "../../components/Header";
import Image from "next/image";
import { formatINR } from "../../utils";
// import { StepperInput } from "../components/StepperInput";

export default function Cart() {
  const [cartItems, setCartItems] = useState<Record<string, number>>({});
  const [products, setProducts] = useState<Product[]>([]);
  const [cartDetails, setCartDetails] = useState<Product[]>([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartWarning, setCartWarning] = useState(false);

  useEffect(() => {
    // Load cart items from local storage
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }

    // Fetch product data
    const fetchProducts = async () => {
      const result = await fetch("/api/products");
      const response = await result.json();
      setProducts(response.products);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Map cart items to product details
    const updatedCartDetails = Object.keys(cartItems)
      .map((id) => {
        const product = products.find(
          (product) => product.id.toString() === id
        );
        if (product) {
          return { ...product, quantity: cartItems[id] };
        }
        return null;
      })
      .filter(Boolean) as Product[];

    setCartDetails(updatedCartDetails);

    // Calculate cart total
    const total = updatedCartDetails.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );
    setCartTotal(total);
  }, [cartItems, products]);

  const updateCartItem = (id: string, quantity: string) => {
    console.log(id, quantity); // Ensure this logs for debugging
    const parsedQuantity = parseInt(quantity, 10);
    const parseId = parseInt(id);

    if (isNaN(parsedQuantity) || parsedQuantity < 1) {
      setCartItems((prevItems) => {
        const updatedItems = { ...prevItems };
        delete updatedItems[id];
        localStorage.setItem("cartItems", JSON.stringify(updatedItems));
        return updatedItems;
      });
      return;
    }

    const productSelected = products.find((product) => product.id === parseId);
    if (!productSelected) {
      console.error(`Product with id ${id} not found`);
      return;
    }

    if (parsedQuantity > productSelected.quantity) {
      setCartWarning(true);
      setTimeout(() => {
        setCartWarning(false);
      }, 5000);
    } else {
      setCartItems((prevItems) => {
        const updatedItems = {
          ...prevItems,
          [id]: parsedQuantity
        };
        localStorage.setItem("cartItems", JSON.stringify(updatedItems));
        return updatedItems;
      });
    }
  };

  return (
    <div className='pt-16'>
      <Header cartItems={cartItems} cartWarning={cartWarning} />
      <div className='container mx-auto px-4'>
        {cartDetails.length > 0 ? (
          <div>
            {cartDetails.map((product) => (
              <div
                key={product.id}
                className='flex items-center border-b py-4 gap-4 text-sm mb-4'
              >
                <div className='text-center'>
                  <Image
                    width={100}
                    height={100}
                    alt={product.name}
                    src={product.imageURL}
                  />
                  <h2 className='font-semibold pt-4'>{product.name}</h2>
                </div>

                <div className='flex flex-col md:flex-row text-right justify-between flex-auto'>
                  <p>
                    <strong>Price:</strong> {product.price}
                  </p>
                  <div className='flex items-center'>
                    <strong>Quantity:</strong>
                    {/* <StepperInput
                      max={product.quantity}
                      min={1}
                      value={cartItems[product.id]}
                      productId={product.id} // Pass the product ID
                      updateValue={(id, quantity) =>
                        updateCartItem(id as string, quantity)
                      } // Pass updateCartItem
                    /> */}

                    <input
                      type='number'
                      value={cartItems[product.id] ?? 1}
                      onChange={(e) =>
                        updateCartItem(product.id.toString(), e.target.value)
                      }
                      onInput={(e) =>
                        updateCartItem(
                          product.id.toString(),
                          e.currentTarget.value
                        )
                      }
                      className='border rounded w-16 p-2 text-center ml-2'
                    />
                  </div>
                  <p>
                    <strong>Total:</strong>{" "}
                    {formatINR(product.price * (cartItems[product.id] ?? 1))}
                  </p>
                </div>
              </div>
            ))}
            <div className='text-right text-sm'>
              <strong>Total:</strong> {formatINR(cartTotal)}
            </div>
          </div>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    </div>
  );
}
