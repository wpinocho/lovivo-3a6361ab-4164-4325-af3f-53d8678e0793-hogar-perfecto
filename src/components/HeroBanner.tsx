import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';

const HeroBanner = () => {
  const { setSelectedCategory } = useStore();

  const handleShopNow = () => {
    console.log('Shop now clicked');
    setSelectedCategory('all');
    // Scroll to products section
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Transforma tu
              <span className="block text-yellow-300">Hogar</span>
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Descubre nuestra increíble colección de muebles y decoración para el hogar. 
              Calidad premium a precios increíbles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={handleShopNow}
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
              >
                Comprar Ahora
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600"
              >
                Ver Catálogo
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop"
              alt="Beautiful home interior"
              className="rounded-lg shadow-2xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-white text-gray-900 p-4 rounded-lg shadow-lg">
              <p className="font-semibold">Envío Gratis</p>
              <p className="text-sm text-gray-600">En compras +$100</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;