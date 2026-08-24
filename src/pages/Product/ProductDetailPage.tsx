import { useParams } from "react-router-dom";
import products from "../../data/products";
import { useWishListStore } from "../../store/wishlistStore";
import { useCartStore } from "../../store/cartStore";

export default function ProductDetailPage() {
  const addToWishlist = useWishListStore((state) => state.addToWishlist);
  const addToCart = useCartStore((state) => state.addToCart);
  const { id } = useParams();

  const product = products.find((product) => product.id === Number(id));

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <>
      <section>
        <img src={product.image} alt={product.name} />

        <h1>{product.name}</h1>
        <p>{product.category}</p>
        <p>${product.price}</p>
        <button onClick={() => addToWishlist(product)}>♡</button>
        <button onClick={() => addToCart(product)}>Add to cart</button>
      </section>
    </>
  );
}
