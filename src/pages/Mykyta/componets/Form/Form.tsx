import React from "react";
import { SelectChangeEvent } from "@mui/material";
import { FormData} from "../../../../interfaces";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  RadioGroup,
  FormLabel,
  Typography,
  Box,
} from "@mui/material";
import RadioFormControlLabel from "../RadioFormControlLabel/RadioFormControlLabel";
import FormHelperText from '@mui/material/FormHelperText';

interface FormProps {
  onSubmit: (data: FormData) => void;
}
import { InputAdornment } from "@mui/material";

const bodyTypes = ["Sedan", "SUV", "Hatchback", "Convertible", "Coupe"];

const purposes = ["Personal", "Commercial"];

const initialFormData = {
  brand: "",
  model: "",
  year: 2000,
  body_type: "",
  mileage_km: 0,
  gearbox: "",
  fuel: "",
  price_per_day: 0,
  horse_power: 0,
  engine_capacity: 0,
  purpose: "",
};

const radioOptionsFuel = [
  { value: 'Petrol', label: 'Petrol' },
  { value: 'Diesel', label: 'Diesel' },
  { value: 'Electric', label: 'Electric' },
];

const radioOptionsGearbox = [
  { value: 'Manual', label: 'Manual' },
  { value: 'Automatic', label: 'Automatic' },
];

function Form({ onSubmit }: FormProps) {
  const [formData, setFormData] = React.useState<FormData>(initialFormData);

  const [errors, setErrors] = React.useState<Partial<FormData>>({});

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  }

  function handleSelectChange(event: SelectChangeEvent<string>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  }

  function validateForm() {
    const newErrors: Partial<FormData> = {};
    let isValid = true;

    const mileage = parseInt(formData.mileage_km as string, 10);

    if (!mileage || mileage < 1 || mileage > 1000 || formData.mileage_km.toString().startsWith('0')) {
      newErrors.mileage_km = !mileage ? "Mileage is required" : 
                             formData.mileage_km.toString().startsWith('0') ? "Mileage should not start with '0'" : 
                             "Mileage should be between 1 and 1000";
      isValid = false;
    }

    if (!formData.engine_capacity || parseInt(formData.engine_capacity.toString(), 10) < 1 || parseInt(formData.engine_capacity.toString(), 10) > 1000 || formData.engine_capacity.toString().startsWith('0')) {
      newErrors.engine_capacity = !formData.engine_capacity ? "Engine capacity is required" : 
                                  formData.engine_capacity.toString().startsWith('0') ? "Engine capacity should not start with '0'" : 
                                  "Engine capacity should be between 1 and 1000";
      isValid = false;
    }

    if (!formData.price_per_day || +formData.price_per_day < 1 || formData.price_per_day.toString().startsWith('0')) {
      newErrors.price_per_day = !formData.price_per_day ? "Price per day is required" : 
                                +formData.price_per_day < 1 ? "Price per day should be greater than 1" : 
                                "Price per day should not start with '0'";
      isValid = false;
    }

    if (!formData.horse_power || +formData.horse_power < 1 || formData.horse_power.toString().startsWith('0')) {
      newErrors.horse_power = !formData.horse_power ? "Horse power is required" : 
                              +formData.horse_power < 1 ? "Horse power should be greater than 1" : 
                              "Horse power should not start with '0'";
      isValid = false;
    }

    if (!formData.brand) {
      newErrors.brand = "Brand is required";
      isValid = false;
    }

    if (!formData.model) {
      newErrors.model = "Model is required";
      isValid = false;
    }

    const year = parseInt(formData.year as string, 10); 

    if (!year || year < 2000 || year > 2024) {
      newErrors.year = !year ? "Year is required" : 
                       "Year should be between 2000 and 2024";
      isValid = false;
    }

    if (!formData.body_type) {
      newErrors.body_type = "Body type is required";
      isValid = false;
    }

    if (!formData.gearbox) {
      newErrors.gearbox = "Gearbox is required";
      isValid = false;
    }

    if (!formData.fuel) {
      newErrors.fuel = "Fuel is required";
      isValid = false;
    }

  if (!formData.purpose) {
      newErrors.purpose = "Purpose is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  }
const handleReset = () => {
  setFormData(initialFormData);
};

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      setFormData(initialFormData);
    }
  }

  const BoxFormStyle = {
    backgroundColor: "secondary.main",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    maxWidth: { md: "500px", sm: "500px", xs: "500px"},
    minWidth: { md: "300px", sm: "400px", xs: "370px"},
    padding: "20px",
    border: "none",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
    color: "primary.main",
    opacity: 0, 
    animation: 'fadeIn 1.5s forwards', 
    '@keyframes fadeIn': {
      '0%': {
        opacity: 0,
      },
      '100%': {
        opacity: 1,
      },
    },
  };

  const TextFieldStyle = {
    width: "90%",
    padding: "8px",
    marginBottom: "10px",
  };


  const ButtonStyle = {
    width: "10%",
    padding: "10px",
    marginTop: "10px",
    border: "none",
    borderRadius: "5px",
    marginRight: "10%",
  };
  const BoxButton = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
  };

  const RadioGroupStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={BoxFormStyle}>
      <Typography
        variant="h5"
        sx={{ textAlign: "center", color: "primary.main", marginBottom: {xs: "10px" } }}
      >
        Car adding form
      </Typography>
      <TextField
        label="Brand"
        name="brand"
        value={formData.brand}
        onChange={handleInputChange}
        sx={TextFieldStyle}
        error={!!errors.brand}
        helperText={errors.brand}
      />
      <TextField
        label="Model"
        name="model"
        value={formData.model}
        onChange={handleInputChange}
        sx={TextFieldStyle}
        error={!!errors.model}
        helperText={errors.model}
      />
      <TextField
        label="Year"
        name="year"
        type="number"
        value={formData.year}
        onChange={handleInputChange}
        sx={TextFieldStyle}
        error={!!errors.year}
        helperText={errors.year}
      />
      <FormControl
        error={Boolean(errors.body_type)}
        sx={[
          TextFieldStyle,
          errors.body_type
            ? { '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'red' } } }
            : {}
        ]}
      >
        <InputLabel>Body Type</InputLabel>
        <Select
          name="body_type"
          value={formData.body_type}
          onChange={handleSelectChange}
          sx={{ width: "100%" }}
        >
          <MenuItem value="">
            <em>Select...</em>
          </MenuItem>
          {bodyTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
        {errors.body_type && <FormHelperText>{errors.body_type}</FormHelperText>}
      </FormControl>
      <TextField
        label="Mileage"
        name="mileage_km"
        type="number"
        value={formData.mileage_km}
        onChange={handleInputChange}
        InputProps={{ endAdornment: <InputAdornment position="end">1,000 km</InputAdornment> }}
        sx={TextFieldStyle}
        error={!!errors.mileage_km}
        helperText={errors.mileage_km}
/>
      <FormControl component="fieldset"  sx={TextFieldStyle}>
        <FormLabel component="legend">Gearbox</FormLabel>
        <RadioGroup
          name="gearbox"
          value={formData.gearbox}
          onChange={handleInputChange}
          sx={[
            RadioGroupStyle,
            errors.gearbox
              ? { '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'red' } } }
              : {}
          ]}>
          {radioOptionsGearbox.map((option) => (
            <RadioFormControlLabel
              key={option.value}
              value={option.value}
              label={option.label}
            />
          ))}
        </RadioGroup>
        {errors.gearbox && <FormHelperText sx={{ color: 'red' }}>{errors.gearbox}</FormHelperText>}
      </FormControl>
      <FormControl component="fieldset"  sx={TextFieldStyle}>
        <FormLabel component="legend">Fuel</FormLabel>
        <RadioGroup
          name="fuel"
          value={formData.fuel}
          onChange={handleInputChange}
          sx={[
            RadioGroupStyle,
            errors.fuel
              ? { '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'red' } } }
              : {}
          ]}>
          {radioOptionsFuel.map((option) => (
            <RadioFormControlLabel
              key={option.value}
              value={option.value}
              label={option.label}
            />
          ))}
        </RadioGroup>
        {errors.fuel && <FormHelperText sx={{ color: 'red' }}>{errors.fuel}</FormHelperText>}
      </FormControl>
      <TextField
        label="Price Per Day"
        name="price_per_day"
        type="number"
        value={formData.price_per_day}
        onChange={handleInputChange}
        InputProps={{endAdornment: <InputAdornment position="end">$</InputAdornment> }}
        sx={TextFieldStyle}
        error={!!errors.price_per_day}
        helperText={errors.price_per_day}
      />
      <TextField
        label="Horse Power"
        name="horse_power"
        type="number"
        value={formData.horse_power}
        onChange={handleInputChange}
        InputProps={{endAdornment: <InputAdornment position="end">kW</InputAdornment> }}
        sx={TextFieldStyle}
        error={!!errors.horse_power}
  helperText={errors.horse_power}
      />
      <TextField
        label="Engine Capacity"
        name="engine_capacity"
        type="number"
        value={formData.engine_capacity}
        onChange={handleInputChange}
        InputProps={{endAdornment: <InputAdornment position="end">cm3</InputAdornment> }}
        sx={TextFieldStyle}
        error={!!errors.engine_capacity}
        helperText={errors.engine_capacity}
      />
      <FormControl
        error={Boolean(errors.purpose)}
        sx={[TextFieldStyle, errors.purpose ? { '& .MuiOutlinedInput-root': { '& fieldset': { } } } : {}]}
      >
        <InputLabel>Purpose</InputLabel>
        <Select
          name="purpose"
          value={formData.purpose}
          onChange={handleSelectChange}
          sx={{ width: "100%" }}
          error={!!errors.purpose}
        >
          <MenuItem value="">
            <em>Select...</em>
          </MenuItem>
          {purposes.map((purpose) => (
            <MenuItem key={purpose} value={purpose}>
              {purpose}
            </MenuItem>
          ))}
        </Select>
        {errors.purpose && <FormHelperText>{errors.purpose}</FormHelperText>}
      </FormControl>
      <Box sx={BoxButton}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            "&:hover": {
              backgroundColor: "primary.dark",
            },
            ButtonStyle,
          }}
        >
          Submit
        </Button>
        <Button
          type="button"
          variant="contained"
          color="primary"
          onClick={handleReset}
          sx={{
            "&:hover": {
              backgroundColor: "primary.dark",
            },
            ButtonStyle,
          }}
        >
          Reset
        </Button>
      </Box>
    </Box>
  );
}

export default Form;
