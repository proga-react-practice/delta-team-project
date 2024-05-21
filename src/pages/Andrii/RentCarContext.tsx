import React, { createContext, useContext, useState, ReactNode } from 'react';
import { OrderGroup, RentCar } from '../../interfaces';
import { v4 as uuidv4 } from 'uuid';

interface RentCarContextType {
    orderGroup: OrderGroup;
    addOrder: (data: RentCar) => void;
    updateOrder: (index: number, data: RentCar) => void;
    removeOrder: (index: number) => void;
    resetOrderGroup: () => void;
}

const OrderGroupContext = createContext<RentCarContextType  | undefined>(undefined);

export const useRentCarContext = () => {
  const context = useContext(OrderGroupContext);
  if (!context) {
    throw new Error('useRentCarContext must be used within a RentCarProvider');
  }
  return context;
};

export const RentCarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [orderGroup, setOrderGroup] = useState<OrderGroup>({ orders: [] });
  
    const addOrder = (data: RentCar) => {
        setOrderGroup((prevGroup) => ({
          ...prevGroup,
          cars: [...prevGroup.orders, { ...data, id: uuidv4() }], 
        }));
      };
      
      const updateOrder = (index: number, data: RentCar) => {
        setOrderGroup((prevGroup) => {
          const newCars = [...prevGroup.orders];
          newCars[index] = data;
          return { ...prevGroup, cars: newCars };
        });
      };
    const removeOrder = (index: number) => {
        setOrderGroup((prevGroup) => ({
        ...prevGroup,
        cars: prevGroup.orders.filter((_, i) => i !== index),
      }));
    };
  
    const resetOrderGroup = () => {
        setOrderGroup({ orders: [] });
    };
  
    return (
      <OrderGroupContext.Provider value={{ orderGroup, addOrder, updateOrder, removeOrder, resetOrderGroup }}>
        {children}
      </OrderGroupContext.Provider>
    );
  };
  