import { create } from "zustand";
import type { Product } from "../types/products";
import type { CartItem } from "../types/carts";
import { persist } from "zustand/middleware";

type CartStore = {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cartItems: [],

      addToCart: (product) => {
        set((state) => {
          const existingItem = state.cartItems.find(
            (item) => item.id === product.id,
          );

          if (existingItem) {
            return {
              cartItems: state.cartItems.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              ),
            };
          }

          return {
            cartItems: [
              ...state.cartItems,
              {
                ...product,
                quantity: 1,
              },
            ],
          };
        });
      },

      increaseQuantity: (id) => {
        set((state) => {
          return {
            cartItems: state.cartItems.map((item) => {
              return item.id === id
                ? { ...item, quantity: item.quantity + 1 }
                : item;
            }),
          };
        });
      },

      decreaseQuantity: (id) => {
        set((state) => {
          return {
            cartItems: state.cartItems
              .map((item) => {
                if (item.id === id) {
                  return {
                    ...item,
                    quantity: item.quantity - 1,
                  };
                }

                return item;
              })
              .filter((item) => item.quantity > 0),
          };
        });
      },

      removeFromCart: (id) => {
        set((state) => {
          return {
            cartItems: state.cartItems.filter((item) => {
              return item.id !== id;
            }),
          };
        });
      },
    }),
    {
      name: "nen-shop-cart",
    },
  ),
);
