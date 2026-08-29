import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "../types/products";
import type { CartItem } from "../types/carts";

type CartStore = {
  cartItems: CartItem[];

  addToCart: (product: Product, quantity?: number) => void;

  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cartItems: [],

      addToCart: (product, quantity = 1) => {
        set((state) => {
          const existingItem = state.cartItems.find(
            (item) => item.id === product.id,
          );

          if (existingItem) {
            return {
              cartItems: state.cartItems.map((item) =>
                item.id === product.id
                  ? {
                      ...item,
                      quantity: item.quantity + quantity,
                    }
                  : item,
              ),
            };
          }

          return {
            cartItems: [
              ...state.cartItems,
              {
                ...product,
                quantity,
              },
            ],
          };
        });
      },

      increaseQuantity: (id) => {
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item,
          ),
        }));
      },

      decreaseQuantity: (id) => {
        set((state) => ({
          cartItems: state.cartItems
            .map((item) =>
              item.id === id
                ? {
                    ...item,
                    quantity: item.quantity - 1,
                  }
                : item,
            )
            .filter((item) => item.quantity > 0),
        }));
      },

      removeFromCart: (id) => {
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== id),
        }));
      },
    }),
    {
      name: "nen-shop-cart",
    },
  ),
);
