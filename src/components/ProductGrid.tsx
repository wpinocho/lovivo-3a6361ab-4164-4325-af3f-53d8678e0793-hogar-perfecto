import { useMemo } from 'react';
import { useStore } from '../store/useStore';
import { products } from '../data/products';
import ProductCard from './ProductCard';
import { motion } from 'framer-motion';

const ProductGrid = () => {
  const { searchQuery, selectedCategory } = useStore();

  console.log('ProductGrid render - Search:', searchQuery, 'Category:', selectedCategory);

  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    }

    console.log('Filtered products count:', filtered.length);
    return filtered;
  }, [searchQuery, selectedCategory]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          {selectedCategory === 'all' ? 'Todos los Productos' : 
           selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
        </h2>
        <p className="text-gray-600">
          {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
        </p>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No se encontraron productos</p>
          <p className="text-gray-400">Intenta con otros términos de búsqueda</p>
        </div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default ProductGrid;