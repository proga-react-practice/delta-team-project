import CarDetail from "./Mykyta/componets/CarDetail";
import { Box, Typography} from "@mui/material";
import { useParams } from "react-router-dom";
import { useCarGroupContext } from '../Context';
import { FormData } from "../interfaces";
import { useState } from "react";

function CarInfo() {
  const { index } = useParams<{ index: string }>();
  const carIndex = index ? parseInt(index, 10) : -1;
  const { carGroup, updateCar, removeCar } = useCarGroupContext();
  const car = carGroup.cars[carIndex];
  const [isEditing, setIsEditing] = useState<number | null>(null);

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
      />
    </Box>
  );
}

export default CarInfo;
