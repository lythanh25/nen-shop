import { create } from "zustand";
import type { Product } from "../types/products";
import { persist } from "zustand/middleware";

type WishlistStore = {
  wishlistItems: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: number) => void;
};

export const useWishListStore = create<WishlistStore>()(
  persist(
    (set) => ({
      wishlistItems: [],

      addToWishlist: (product) => {
        set((state) => {
          const existingItem = state.wishlistItems.find(
            (item) => item.id === product.id,
          );

          if (existingItem) {
            return state;
          }

          return {
            wishlistItems: [...state.wishlistItems, product],
          };
        });
      },

      removeFromWishlist: (id) => {
        set((state) => {
          return {
            wishlistItems: state.wishlistItems.filter((item) => item.id !== id),
          };
        });
      },
    }),
    { name: "nen-shop-wishlist" },
  ),
);
