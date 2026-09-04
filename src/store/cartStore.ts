import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "../types/products";
import type { CartItem } from "../types/carts";

type CartStore = {
  cartItems: CartItem[];

  addToCart: (product: Product, quantity?: number, size?: string) => void;

  increaseQuantity: (id: number, size: string) => void;
  decreaseQuantity: (id: number, size: string) => void;
  removeFromCart: (id: number, size: string) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cartItems: [],

      addToCart: (product, quantity = 1, size = "M") => {
        set((state) => {
          const existingItem = state.cartItems.find(
            (item) => item.id === product.id && item.size === size,
          );

          if (existingItem) {
            return {
              cartItems: state.cartItems.map((item) =>
                item.id === product.id && item.size === size
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
                size,
              },
            ],
          };
        });
      },

      increaseQuantity: (id, size) => {
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === id && item.size === size
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item,
          ),
        }));
      },

      decreaseQuantity: (id, size) => {
        set((state) => ({
          cartItems: state.cartItems
            .map((item) =>
              item.id === id && item.size === size
                ? {
                    ...item,
                    quantity: item.quantity - 1,
                  }
                : item,
            )
            .filter((item) => item.quantity > 0),
        }));
      },

      removeFromCart: (id, size) => {
        set((state) => ({
          cartItems: state.cartItems.filter(
            (item) => !(item.id === id && item.size === size),
          ),
        }));
      },

      clearCart: () => {
        set({ cartItems: [] });
      },
    }),
    {
      name: "nen-shop-cart",
    },
  ),
);
