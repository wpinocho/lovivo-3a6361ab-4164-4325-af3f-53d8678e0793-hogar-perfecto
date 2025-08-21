import { Search, ShoppingCart, User, Menu } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const Header = () => {
  const { 
    searchQuery, 
    setSearchQuery, 
    cart, 
    setCartOpen, 
    user, 
    getCartItemsCount 
  } = useStore();

  const cartItemsCount = getCartItemsCount();

  console.log('Header render - Cart items count:', cartItemsCount);

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              🏠 HomeMart
            </h1>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* User */}
            <Button variant="ghost" size="sm" className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span className="hidden sm:inline">
                {user ? user.name : 'Iniciar Sesión'}
              </span>
            </Button>

            {/* Cart */}
            <Button
              variant="ghost"
              size="sm"
              className="relative flex items-center space-x-2"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs"
                >
                  {cartItemsCount}
                </Badge>
              )}
              <span className="hidden sm:inline">Carrito</span>
            </Button>

            {/* Mobile Menu */}
            <Button variant="ghost" size="sm" className="sm:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;