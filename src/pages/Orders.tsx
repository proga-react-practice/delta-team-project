import React, { useState, useEffect } from 'react';
import { useMediaQuery, TableContainer, Table, TableBody, TableHead } from '@mui/material';
import Box from '@mui/material/Box';
import { useForm, useFieldArray } from "react-hook-form";
import { theme } from '../theme';
import { FormResults } from './Andrii/cards/FormResult';
import { FormResultsMobile } from './Andrii/cards/FormResultMobile';
import { RentCar, OrderGroup } from '../interfaces';
import { useRentCarContext } from './Andrii/RentCarContext';
import { FormResultsTableHead } from './Andrii/styledComponents/FormResultsTableHead';
import { createTransform } from './Andrii/animations/animation';

const Orders: React.FC = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const { orderGroup, updateOrder, removeOrder } = useRentCarContext();
  const { control, setValue } = useForm<OrderGroup>();
  const Transform = createTransform();
  const [editingCardIndex, setEditingCardIndex] = useState<number | null>(null);
  const { fields, update, remove } = useFieldArray({
    control,
    name: "orders",
  });

  useEffect(() => {
    setValue('orders', orderGroup.orders);
  }, [orderGroup.orders, setValue]);

  const handleEdit = (index: number | null) => {
    setEditingCardIndex(index);
  };

  const handleDelete = (index: number) => {
    remove(index);
    removeOrder(index);
  };

  const handleSave = (index: number, data: RentCar) => {
    update(index, data);
    updateOrder(index, data);
    setEditingCardIndex(null);
  };

  const RentStyle = {
    display: 'flex',
    width: '100%',
    flexDirection: { xs: 'column', md: 'row' },
    justifyContent: { xs: 'center', md: 'space-around' },
  };

  const FormResultStyle = {
    width: { xs: '100%', md: '67%', lg: '90%' },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: { lg: 'start', md: 'center', xs: 'center' },
  };

  const FormResult = {
    ...Transform,
    display: 'flex',
    width: '100%',
    minWidth: '820px',
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginBottom: '20px',
    marginTop: '50px',
    backgroundColor: "secondary.main",
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0,0,0,0.15)',
  };

  return (
    <Box sx={RentStyle}>
      <Box sx={FormResultStyle}>
        {isMobile &&
          fields.map((form, index) => (
            <FormResultsMobile
              key={index}
              form={form}
              onDelete={handleDelete}
              onSave={(data) => handleSave(index, data)}
              index={index}
              onEdit={handleEdit}
              isEditing={index === editingCardIndex}
            />)) 
        }
        {!isMobile && 
          <TableContainer sx={FormResult}>
            <Table aria-label="customize table">
              <TableHead>
                <FormResultsTableHead />
              </TableHead>
              <TableBody>
                {fields.map((form, index) => (
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
              </TableBody>
            </Table>
          </TableContainer>
        }
      </Box>
    </Box>
  );
};

export default Orders;