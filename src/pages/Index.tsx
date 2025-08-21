import Header from '../components/Header';
import HeroBanner from '../components/HeroBanner';
import FeaturedProducts from '../components/FeaturedProducts';
import CategoryFilter from '../components/CategoryFilter';
import ProductGrid from '../components/ProductGrid';
import CartSidebar from '../components/CartSidebar';
import { Toaster } from 'react-hot-toast';

const Index = () => {
  console.log('Index page rendering');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroBanner />
      <FeaturedProducts />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8" id="products">
          <aside className="lg:col-span-1">
            <CategoryFilter />
          </aside>
          <section className="lg:col-span-3">
            <ProductGrid />
          </section>
        </div>
      </main>

      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">🏠 HomeMart</h3>
              <p className="text-gray-400">
                Tu tienda de confianza para productos del hogar de calidad premium.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Categorías</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Muebles</li>
                <li>Iluminación</li>
                <li>Decoración</li>
                <li>Dormitorio</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Ayuda</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Contacto</li>
                <li>Envíos</li>
                <li>Devoluciones</li>
                <li>FAQ</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Síguenos</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Facebook</li>
                <li>Instagram</li>
                <li>Twitter</li>
                <li>YouTube</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 HomeMart. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      <CartSidebar />
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
    </div>
  );
};

export default Index;