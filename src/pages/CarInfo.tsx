import CarDetail from "./Mykyta/componets/CarDetail";
import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useCarGroupContext } from '../Context';
import { FormData } from "../interfaces";
import { useState } from "react";

function CarInfo() {
  const { index } = useParams<{ index: string }>();
  const carIndex = index ? parseInt(index, 10) : -1; // Use -1 as a fallback index
  const { carGroup, updateCar, removeCar } = useCarGroupContext();
  const car = carGroup.cars[carIndex];
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDelete = () => {
    removeCar(carIndex);
  };

  const handleSave = (data: FormData) => {
    updateCar(carIndex, data);
    setIsEditing(false);
  };

  if (carIndex < 0 || !car) {
    return (
      <Typography 
        variant="h4" 
        sx={{
          textAlign: 'center', 
          marginTop: {lg: '5%', md: '10%', sm: '15%', xs: '20%'},
        }}
      >
        Car not found
      </Typography>
    );
  }

  const ContainerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "2%",
    width: "100%",
    backgroundColor: "background.default",
  };

  const CardLayout = {
    width: { md: "80%", sm: "100%", xs: "100%" },
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: "20%",
  };

  return (
    <Box sx={ContainerStyle}>
      <Box sx={CardLayout}>
        <CarDetail
          data={car}
          onDelete={handleDelete}
          onSave={handleSave}
          index={carIndex}
          onEdit={handleEditClick}
          isEditing={isEditing}
        />
      </Box>
    </Box>
  );
}

export default CarInfo;
