import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const CartSidebar = () => {
  const { 
    isCartOpen, 
    setCartOpen, 
    cart, 
    updateQuantity, 
    removeFromCart, 
    getCartTotal,
    clearCart 
  } = useStore();

  const total = getCartTotal();

  console.log('CartSidebar render - Cart items:', cart.length, 'Total:', total);

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error('El carrito está vacío');
      return;
    }
    toast.success('Redirigiendo al checkout...');
    console.log('Proceeding to checkout with items:', cart);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={() => setCartOpen(false)}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold flex items-center">
                <ShoppingBag className="h-5 w-5 mr-2" />
                Carrito de Compras
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCartOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingBag className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">Tu carrito está vacío</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.product.name}</h4>
                        <p className="text-gray-600 text-sm">${item.product.price.toFixed(2)}</p>
                        
                        <div className="flex items-center space-x-2 mt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <Badge variant="secondary">{item.quantity}</Badge>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              removeFromCart(item.product.id);
                              toast.success('Producto eliminado del carrito');
                            }}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-2xl font-bold">${total.toFixed(2)}</span>
                </div>
                
                <div className="space-y-2">
                  <Button onClick={handleCheckout} className="w-full">
                    Proceder al Checkout
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      clearCart();
                      toast.success('Carrito vaciado');
                    }}
                    className="w-full"
                  >
                    Vaciar Carrito
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;