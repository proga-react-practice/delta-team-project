import React, { useState } from 'react';
import { useCarGroupContext } from '../../../../Context';
import { FormData } from '../../../../interfaces';
import { Select } from '@mui/material';

interface CarSelectorProps {
  onSelect: (selectedCar: FormData) => void;
}

const CarSelect: React.FC<CarSelectorProps> = ({ onSelect }) => {
  const { carGroup } = useCarGroupContext();
const [selectedCar, setSelectedCar] = useState<string>('');

const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedCar(selectedValue);

    const [brand, model, year] = selectedValue.split(' - ');
    const selectedCar = carGroup.cars.find(
        car => car.brand === brand && car.model === model && car.year === Number(year)
    );

    if (selectedCar) {
        onSelect(selectedCar);
    }
};

  return (
    <Select value={selectedCar} onChange={handleChange}>
      <option value="">Select a car</option>
      {carGroup.cars.map((car, index) => (
        <option key={index} value={`${car.brand} - ${car.model} - ${car.year}`}>
          {car.brand} - {car.model} - {car.year}
        </option>
      ))}
    </Select>
  );
};

export default CarSelect;
