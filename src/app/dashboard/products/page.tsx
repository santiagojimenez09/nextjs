import { ProductCard } from "@/products";
import { products } from "@/products/data/products";

export default function ProductsPage() {
  return (
    <div className="grip grid-cols-1 sm:grid-cols-3 gap-2">
      {/* ProductCard  */}
      {
        products.map((product)=>(
            <ProductCard key={ product.id} { ...product}/>
        ))
      }
      
    </div>
  );
}