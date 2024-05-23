import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CarGroup, FormData } from './interfaces';
import { v4 as uuidv4 } from 'uuid';

interface CarGroupContextType {
  carGroup: CarGroup;
  addCar: (data: FormData) => void;
  updateCar: (index: number, data: FormData) => void;
  removeCar: (index: number) => void;
  resetCarGroup: () => void;
}

const CarGroupContext = createContext<CarGroupContextType | undefined>(undefined);

export const useCarGroupContext = () => {
  const context = useContext(CarGroupContext);
  if (!context) {
    throw new Error('useCarGroupContext must be used within a CarGroupProvider');
  }
  return context;
};
export const CarGroupProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [carGroup, setCarGroup] = useState<CarGroup>({ cars: [] });
  
    const addCar = (data: FormData) => {
        setCarGroup((prevGroup) => ({
          ...prevGroup,
          cars: [...prevGroup.cars, { ...data, id: uuidv4() }], 
        }));
      };
      
      const updateCar = (index: number, data: FormData) => {
        setCarGroup((prevGroup) => {
          const newCars = [...prevGroup.cars];
          newCars[index] = data;
          return { ...prevGroup, cars: newCars };
        });
      };
    const removeCar = (index: number) => {
      setCarGroup((prevGroup) => ({
        ...prevGroup,
        cars: prevGroup.cars.filter((_, i) => i !== index),
      }));
    };
  
    const resetCarGroup = () => {
      setCarGroup({ cars: [] });
    };
  
    return (
      <CarGroupContext.Provider value={{ carGroup, addCar, updateCar, removeCar, resetCarGroup }}>
        {children}
      </CarGroupContext.Provider>
    );
  };
  