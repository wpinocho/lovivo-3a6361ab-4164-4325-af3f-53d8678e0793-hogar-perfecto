import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, CartItem, User } from '../types';

interface StoreState {
  // Cart state
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemsCount: () => number;

  // User state
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: () => boolean;

  // UI state
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Cart state
      cart: [],
      addToCart: (product) => {
        console.log('Adding to cart:', product.name);
        const cart = get().cart;
        const existingItem = cart.find(item => item.product.id === product.id);
        
        if (existingItem) {
          set({
            cart: cart.map(item =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          });
        } else {
          set({ cart: [...cart, { product, quantity: 1 }] });
        }
      },
      removeFromCart: (productId) => {
        console.log('Removing from cart:', productId);
        set({ cart: get().cart.filter(item => item.product.id !== productId) });
      },
      updateQuantity: (productId, quantity) => {
        console.log('Updating quantity:', productId, quantity);
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }
        set({
          cart: get().cart.map(item =>
            item.product.id === productId
              ? { ...item, quantity }
              : item
          )
        });
      },
      clearCart: () => {
        console.log('Clearing cart');
        set({ cart: [] });
      },
      getCartTotal: () => {
        return get().cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
      },
      getCartItemsCount: () => {
        return get().cart.reduce((count, item) => count + item.quantity, 0);
      },

      // User state
      user: null,
      setUser: (user) => {
        console.log('Setting user:', user);
        set({ user });
      },
      isAuthenticated: () => get().user !== null,

      // UI state
      isCartOpen: false,
      setCartOpen: (open) => set({ isCartOpen: open }),
      searchQuery: '',
      setSearchQuery: (query) => {
        console.log('Setting search query:', query);
        set({ searchQuery: query });
      },
      selectedCategory: 'all',
      setSelectedCategory: (category) => {
        console.log('Setting category:', category);
        set({ selectedCategory: category });
      },
    }),
    {
      name: 'home-store',
      partialize: (state) => ({ cart: state.cart, user: state.user }),
    }
  )
);