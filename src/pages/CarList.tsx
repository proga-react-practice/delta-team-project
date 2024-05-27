import Card from "./Mykyta/Card/Card";
import { CarGroup } from "../interfaces";
import { Box, Typography, TextField, InputAdornment } from "@mui/material";
import { useFieldArray, useForm } from "react-hook-form";
import { useCarGroupContext } from '../Context';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
import { useTheme } from '@mui/material/styles';

function CarList() {
  const { control, setValue } = useForm<CarGroup>();
  const { carGroup } = useCarGroupContext();
  const { fields } = useFieldArray({
    control,
    name: "cars",
  });
  const [searchQuery, setSearchQuery] = useState('');
  const theme = useTheme();

  useEffect(() => {
    setValue('cars', carGroup.cars);
  }, [carGroup.cars, setValue]);


  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredFields = fields.filter((field) =>
    field.brand.toLowerCase().includes(searchQuery) ||
    field.model.toLowerCase().includes(searchQuery)
  );

  const ContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "2%",
    width: "100%",
    backgroundColor: "background.default",
  };

  const CardLayout = {
    width: { md: "90%", sm: "100%", xs: "100%" },
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: { md: "flex-start", sm: "center", xs: "center" },
    alignItems: { sm: "center", xs: "center" },
    gap: "10%",
  };

  const SearchInput = {
    marginBottom: "4%",
    width: "80%",
    '& .MuiOutlinedInput-root': { 
      borderRadius: '15px',
    }
  };

  return (
    <Box sx={ContainerStyle}>
      <TextField
        placeholder="Search by brand or model"
        variant="outlined"
        value={searchQuery}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <CiSearch color={theme.palette.primary.main} size="1.5em" style={{ lineHeight: '0.75' }}/>
            </InputAdornment>
          ),
        }}
        onChange={handleSearchChange}
        sx={SearchInput}
      />
      {filteredFields.length > 0 ? (
        <Box sx={CardLayout}>
          {filteredFields.map((data, index) => (
            <Link to={`/car/${index}`} key={index}>
              <Card data={data} index={index} />
            </Link>
          ))}
        </Box>
      ) : (
        <Typography variant="h4">No cars available.</Typography>
      )}
    </Box>
  );
}

export default CarList;
