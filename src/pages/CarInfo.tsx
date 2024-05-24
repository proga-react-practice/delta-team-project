import CarDetail from "./Mykyta/componets/CarDetail";
import { useForm, useFieldArray } from 'react-hook-form';
import { Box, Typography} from "@mui/material";
import { useParams } from "react-router-dom";
import { useCarGroupContext } from '../Context';
import { FormData, RentCar, OrderGroup } from "../interfaces";
import { useState, useEffect } from "react";
import { useRentCarContext } from './Andrii/RentCarContext';

function CarInfo() {
  const { index } = useParams<{ index: string }>();
  const carIndex = index ? parseInt(index, 10) : -1;
  const { carGroup, updateCar, removeCar } = useCarGroupContext();
  const car = carGroup.cars[carIndex];
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [isRenting, setIsRenting] = useState<number | null>(null);
  const { orderGroup, addOrder } = useRentCarContext();
  const { control, setValue } = useForm<OrderGroup>();
  const { append } = useFieldArray({
    control,
    name: 'orders',
  });

  useEffect(() => {
    setValue('orders', orderGroup.orders);
  }, [orderGroup.orders, setValue]);

  const handleRent = (form: RentCar | null) => {
    if (form) {
      append(form);
      addOrder(form);
    }
    setIsRenting(null);
  };

  const handleRentClick = (index: number | null) => {
    setIsRenting(index);
  };

  const handleEditClick = (index: number | null) => {
    setIsEditing(index);
  };

  const handleDelete = () => {
    removeCar(carIndex);
  };

  const handleSave = (data: FormData) => {
    updateCar(carIndex, data);
    setIsEditing(null);
  };

  if (carIndex < 0 || !car) {
    return (
      <Typography 
        variant="h4" 
        sx={{
          textAlign: 'center', 
          marginTop: { lg: '5%', md: '10%', sm: '15%', xs: '20%' },
        }}
      >
        Car not found
      </Typography>
    );
  }

  const ContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "2%",
    width: "100%",
    backgroundColor: "background.default",
  };

  return (
    <Box sx={ContainerStyle}>
      <CarDetail
        data={car}
        onDelete={handleDelete}
        onSave={handleSave}
        index={carIndex}
        onEdit={handleEditClick}
        isEditing={carIndex === isEditing}
        isRenting={carIndex === isRenting}
        onRent={handleRent}
        onRentClick={handleRentClick}
      />
    </Box>
  );
}

export default CarInfo;