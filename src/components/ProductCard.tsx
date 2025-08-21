import { Star, ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../store/useStore';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useStore();

  const handleAddToCart = () => {
    console.log('Adding product to cart:', product.name);
    addToCart(product);
    toast.success(`${product.name} agregado al carrito`);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          {product.featured && (
            <Badge className="absolute top-2 left-2 bg-red-500">
              Destacado
            </Badge>
          )}
          {product.originalPrice && (
            <Badge className="absolute top-2 right-2 bg-green-500">
              Oferta
            </Badge>
          )}
        </div>

        <CardContent className="flex-1 p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {renderStars(product.rating)}
            </div>
            <span className="ml-2 text-sm text-gray-500">
              ({product.reviews} reseñas)
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-gray-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <Button
            onClick={handleAddToCart}
            className="w-full"
            disabled={!product.inStock}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {product.inStock ? 'Agregar al Carrito' : 'Sin Stock'}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProductCard;