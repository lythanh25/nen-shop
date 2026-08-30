import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "../types/products";

type WishlistStore = {
  wishlistItems: Product[];

  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: number) => void;

  isInWishlist: (id: number) => boolean;
  toggleWishlist: (product: Product) => void;
};

export const useWishListStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      wishlistItems: [],

      addToWishlist: (product) => {
        set((state) => {
          const existingItem = state.wishlistItems.some(
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
        set((state) => ({
          wishlistItems: state.wishlistItems.filter((item) => item.id !== id),
        }));
      },

      isInWishlist: (id) => {
        return get().wishlistItems.some((item) => item.id === id);
      },

      toggleWishlist: (product) => {
        const isInWishlist = get().wishlistItems.some(
          (item) => item.id === product.id,
        );

        if (isInWishlist) {
          get().removeFromWishlist(product.id);
        } else {
          get().addToWishlist(product);
        }
      },
    }),
    {
      name: "nen-shop-wishlist",
    },
  ),
);
