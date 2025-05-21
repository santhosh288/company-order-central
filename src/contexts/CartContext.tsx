
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { CartItem, Material, Address, DeliveryMethod } from '../types';
import { useToast } from '@/hooks/use-toast';

interface CartState {
  items: CartItem[];
  selectedAddress: Address | null;
  deliveryMethod: DeliveryMethod | null;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { material: Material; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { materialId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_ADDRESS'; payload: Address }
  | { type: 'SET_DELIVERY_METHOD'; payload: DeliveryMethod }
  | { type: 'LOAD_CART'; payload: CartState };

interface CartContextType extends CartState {
  addToCart: (material: Material, quantity: number) => void;
  removeFromCart: (materialId: string) => void;
  updateQuantity: (materialId: string, quantity: number) => void;
  clearCart: () => void;
  setAddress: (address: Address) => void;
  setDeliveryMethod: (method: DeliveryMethod) => void;
  total: number;
}

const initialCartState: CartState = {
  items: [],
  selectedAddress: null,
  deliveryMethod: null,
};

const CartContext = createContext<CartContextType>({
  ...initialCartState,
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  setAddress: () => {},
  setDeliveryMethod: () => {},
  total: 0,
});

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { material, quantity } = action.payload;
      const existingItem = state.items.find(item => item.materialId === material.id);

      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.materialId === material.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      } else {
        return {
          ...state,
          items: [...state.items, { materialId: material.id, material, quantity }],
        };
      }
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.materialId !== action.payload),
      };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.materialId === action.payload.materialId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        selectedAddress: null,
        deliveryMethod: null,
      };
    case 'SET_ADDRESS':
      return {
        ...state,
        selectedAddress: action.payload,
      };
    case 'SET_DELIVERY_METHOD':
      return {
        ...state,
        deliveryMethod: action.payload,
      };
    case 'LOAD_CART':
      return action.payload;
    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);
  const { toast } = useToast();

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      dispatch({ type: 'LOAD_CART', payload: JSON.parse(savedCart) });
    }
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);

  const addToCart = (material: Material, quantity: number) => {
    if (material.quantity < quantity) {
      toast({
        title: "Insufficient stock",
        description: `Only ${material.quantity} units available`,
        variant: "destructive"
      });
      return;
    }
    
    dispatch({ type: 'ADD_ITEM', payload: { material, quantity } });
    toast({
      title: "Item added to cart",
      description: `Added ${quantity} ${material.name} to your cart`,
    });
  };

  const removeFromCart = (materialId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: materialId });
    toast({
      title: "Item removed",
      description: "Item has been removed from your cart",
    });
  };

  const updateQuantity = (materialId: string, quantity: number) => {
    const item = state.items.find(item => item.materialId === materialId);
    
    if (item && item.material.quantity < quantity) {
      toast({
        title: "Insufficient stock",
        description: `Only ${item.material.quantity} units available`,
        variant: "destructive"
      });
      return;
    }
    
    dispatch({ type: 'UPDATE_QUANTITY', payload: { materialId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const setAddress = (address: Address) => {
    dispatch({ type: 'SET_ADDRESS', payload: address });
  };

  const setDeliveryMethod = (method: DeliveryMethod) => {
    dispatch({ type: 'SET_DELIVERY_METHOD', payload: method });
  };

  // Calculate total price
  const total = state.items.reduce(
    (sum, item) => sum + item.material.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        setAddress,
        setDeliveryMethod,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
