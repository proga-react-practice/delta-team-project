
import Form from "./Mykyta/Form/Form";
import { CarGroup, FormData } from "../interfaces";
import { Box } from "@mui/material";
import { useFieldArray, useForm } from "react-hook-form";
import { useCarGroupContext } from '../Context';
import { useEffect } from "react";

function Car() {
  const { control, setValue } = useForm<CarGroup>();
  const { carGroup , addCar } = useCarGroupContext();
  const { append,} = useFieldArray({
    control,
    name: "cars",
  });


  useEffect(() => {
    setValue('cars', carGroup.cars);
  }, [carGroup.cars, setValue]);


  function handleAddNewCar(formData: FormData) {
    append(formData);
    addCar(formData);
  }

  const ContainerStyle = {
    display: "flex",
    flexDirection: { md: "row", sm: "column", xs: "column" },
    justifyContent: { md: "space-evenly", sm: "center", xs: "center" },
    marginTop: "2%",
    width: "100%",
    backgroundColor: "background.default",
  };

  const FormLayout = {
    display: "flex",
    width: { md: "35%", sm: "100%", xs: "100%" },
    marginBottom: "30px",
    justifyContent: { md: "flex-start", sm: "center", xs: "center" },
    alignItems: { sm: "flex-start", xs: "center" },
  };

  return (
      <Box sx={ContainerStyle}>
        <Box sx={FormLayout}>
          <Form onSubmit={handleAddNewCar} />
        </Box>
      </Box>
  );
}

export default Car;


