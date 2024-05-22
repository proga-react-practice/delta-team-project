import Card from "./Mykyta/Card/Card";
import { CarGroup} from "../interfaces";
import { Box, Typography } from "@mui/material";
import { useFieldArray, useForm } from "react-hook-form";
import { useCarGroupContext } from '../Context';
import { useEffect } from "react";
import { Link } from 'react-router-dom';


function CarList() {
  const { control, setValue } = useForm<CarGroup>();
  const { carGroup } = useCarGroupContext();
  const { fields} = useFieldArray({
    control,
    name: "cars",
  });


  useEffect(() => {
    setValue('cars', carGroup.cars);
  }, [carGroup.cars, setValue]);


  const ContainerStyle = {
    display: "flex",
    flexDirection: { md: "row", sm: "column", xs: "column" },
    justifyContent: { md: "center", sm: "center", xs: "center" },
    marginTop: "2%",
    width: "100%",
    backgroundColor: "background.default",
  };

  const CardLayout = {
    width: { md: "85%", sm: "100%", xs: "100%" },
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: { md: "flex-start", sm: "center", xs: "center" },
    alignItems: { sm: "center", xs: "center" },
    gap: "10%",
  };

  return (
    <Box sx={ContainerStyle}>
        {fields.length > 0 ? (
        <Box sx={CardLayout}>
          {fields.map((data, index) => (
            <Link to={`/car/${index}`} key={index}>
              <Card
                data={data}
                index={index}
              />
            </Link>
            
          ))}
        </Box>
        ) : (
          <Typography  variant="h4">No cars available.</Typography>
        )}
    </Box>
  );
}

export default CarList;