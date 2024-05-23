import React, { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import RentCarForm from './Andrii/forms/RentCarForm';
import { RentCar, OrderGroup } from '../interfaces';
import { useRentCarContext } from './Andrii/RentCarContext';
import { Box } from '@mui/material';

const Rent: React.FC = () => {
  const { orderGroup, addOrder } = useRentCarContext();
  const { control, setValue } = useForm<OrderGroup>();
  const { append } = useFieldArray({
    control,
    name: 'orders',
  });

  useEffect(() => {
    setValue('orders', orderGroup.orders);
  }, [orderGroup.orders, setValue]);

  const handleSubmit = (data: RentCar) => {
    append(data);
    addOrder(data);
  };

  const RentStyle = {
    display: 'flex',
    width: '100%',
    flexDirection: { xs: 'column', md: 'row' },
    justifyContent: { xs: 'center', md: 'space-around' },
  };

  const RentCar = {
    width: { xs: '100%', md: '50%', lg: '35%' },
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'start',
  };

  return (
    <Box sx={RentStyle}>
      <Box sx={RentCar}>
        <RentCarForm onSubmit={handleSubmit} />
      </Box>
    </Box>
  );
};

export default Rent;
