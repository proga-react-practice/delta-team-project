import { useState, useEffect } from 'react';
import RentCarForm from './Andrii/forms/RentCarForm';
import { FormResults } from './Andrii/cards/FormResult';
import { FormResultsMobile } from './Andrii/cards/FormResultMobile';
import { RentCar, OrderGroup } from '../interfaces';
import { useMediaQuery } from '@mui/material';
import { theme } from '../theme';
import Box from '@mui/material/Box';
import { useRentCarContext } from './Andrii/RentCarContext';
import { useFieldArray, useForm } from "react-hook-form";

const Rent: React.FC = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const { orderGroup, addOrder, updateOrder, removeOrder } = useRentCarContext();
  const { control, setValue } = useForm<OrderGroup>();
  const [editingCardIndex, setEditingCardIndex] = useState<number | null>(null);
  const { fields, append, update, remove } = useFieldArray({
    control,
    name: "orders",
  });

  useEffect(() => {
    setValue('orders', orderGroup.orders);
  }, [orderGroup.orders, setValue]);

  const handleEdit = (index: number) => {
    console.log('Edit clicked');
    console.log(index);
    setEditingCardIndex(index);
  };

  const handleSubmit = (data: RentCar) => {
    console.log('Submit clicked');
    console.log(data);
    append(data)
    addOrder(data);
  };

  const handleDelete = (index: number) => {
    remove(index);
    removeOrder(index);
  };

  const handleSave = (index: number, data: RentCar) => {
    console.log('clicked');
    update(index, data);
    updateOrder(index, data);
    setEditingCardIndex(null);
  };

  const RentStyle = {
    display: 'flex',
    width: '100%',
    flexDirection: {xs: 'column', md: 'row'},
    justifyContent: {xs: 'center', md: 'space-around'},
  }

  const RentCar = {
    width: { xs: '100%', md: '50%', lg: '35%' },
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'start',
  };

  const FormResult = {
    width: { xs: '100%', md: '67%', lg: '60%' },
    display: 'flex',
    flexDirection: { lg: 'row', xs: 'column' },
    justifyContent: 'space-around',
    alignItems: { lg: 'start', md: 'center', xs: 'center' },
  };

  return (
    <Box sx={RentStyle}>
      <Box sx={RentCar}>
        <RentCarForm onSubmit={handleSubmit} />
      </Box>
      <Box sx={FormResult}>
      {fields.map((form, index) => (
        isMobile ? 
          <FormResultsMobile
            key={index}
            form={form}
            onDelete={handleDelete}
            onSave={(data) => handleSave(index, data)}
            index={index}
            onEdit={handleEdit}
            isEditing={index === editingCardIndex}
          /> :
          <FormResults
            key={index}
            form={form}
            onSave={(form) => handleSave(index, form)}
            onDelete={handleDelete}
            onEdit={handleEdit}
            index={index} 
            isEditing={index === editingCardIndex}
          />
      ))}
      </Box>
    </Box>
  );
};

export default Rent;