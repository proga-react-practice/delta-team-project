import React from 'react';
import { useForm, Controller } from 'react-hook-form';
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
} from '@mui/material';
import { FormData, initialFormData, radioOptionsGearbox, radioOptionsFuel, purposes, bodyTypes } from '../../../interfaces';
import RadioFormControlLabel from '../componets/RadioFormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import { InputAdornment } from '@mui/material';
import FileUpload from '../componets/FileUpload';

interface FormProps {
  onSubmit: (data: FormData) => void;
}
const BoxFormStyle = {
  backgroundColor: 'secondary.main',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  maxWidth: { lg: '40%', md: '50%', sm: "60%", xs: '90%' },
  minWidth: { lg: '30%', md: '40%', sm: "50%", xs: '85%' },
  padding: '20px',
  border: 'none',
  borderRadius: '10px',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)',
  opacity: 0,
  animation: 'fadeIn 1.5s forwards',
  '@keyframes fadeIn': {
    '0%': { opacity: 0 },
    '100%': { opacity: 1 },
  },
};

const TextFieldStyle = {
  width: '90%',
  padding: '8px',
  marginBottom: '10px',
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'quaternary.main',
    },
    '&:hover fieldset': {
      borderColor: 'secondary.dark',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'secondary.dark', 
    },
  },
  '& .MuiFormLabel-root': {
    color: 'quaternary.dark',
  },
  '& .MuiFormLabel-root.Mui-focused': {
    color: 'secondary.dark',
  },
};

const ButtonStyle = {
  width: '10%',
  padding: '10px',
  marginTop: '10px',
  border: 'none',
  borderRadius: '5px',
  marginRight: '10%',
};

const BoxButton = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  width: '100%',
};


const RadioGroupStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'quaternary.main',
    },
    '&:hover fieldset': {
      borderColor: 'secondary.dark',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'secondary.dark', 
    },
  },
  '& .MuiRadio-root': {
    '&$checked': {
      color: 'black',
    },
  },
  '&.Mui-checked': {
    color: 'black',
  },
  '& .MuiFormLabel-root': {
    color: 'quaternary.dark',
  },
  '& .MuiFormLabel-root.Mui-focused': {
    color: 'secondary.dark',
  },
};

const Form: React.FC<FormProps> = ({ onSubmit }) => {

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: initialFormData,
    mode: 'onChange',
  });

  const handleReset = () => {
    reset(initialFormData);
  };

  const handleOnSubmit = (data: FormData) => {
    onSubmit(data);
    handleReset();
  };

  return (
    <Box component="form" onSubmit={handleSubmit(handleOnSubmit)} sx={BoxFormStyle}>
      <Typography variant="h5" sx={{ textAlign: 'center', marginBottom: { xs: '10px' } }}>
        Car adding form
      </Typography>
      <TextField
        label="Brand"
        {...register('brand', {
          required: 'Brand is required',
          validate: {
            isFirstLetterUppercase: (value) => /^[A-Z]/.test(value) || 'The first letter must be uppercase',
          },
        })}
        sx={TextFieldStyle}
        error={Boolean(errors.brand)}
        helperText={errors.brand?.message}
      />
      <TextField
        label="Model"
        {...register('model', {
          required: 'Model is required',
          validate: {
            isFirstLetterUppercase: (value) => /^[A-Z]/.test(value) || 'The first letter must be uppercase',
          },
        })}
        sx={TextFieldStyle}
        error={Boolean(errors.model)}
        helperText={errors.model?.message}
      />
      <TextField
        label="Year"
        type="number"
        {...register('year', {
          required: 'Year is required',
          min: { value: 1900, message: 'Year must be 1900 or later' },
          max: { value: new Date().getFullYear(), message: 'Year must be this year or earlier' },
        })}
        sx={TextFieldStyle}
        error={Boolean(errors.year)}
        helperText={errors.year?.message}
      />
      <FormControl error={Boolean(errors.body_type)} sx={TextFieldStyle}>
        <InputLabel>Body Type</InputLabel>
        <Controller
          name="body_type"
          control={control}
          rules={{ required: 'Body type is required' }}
          render={({ field }) => (
            <Select {...field}>
              {bodyTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        {errors.body_type && <FormHelperText error>{errors.body_type.message}</FormHelperText>}
      </FormControl>
      <TextField
        label="Mileage"
        type="number"
        {...register('mileage_km', {
          required: 'Mileage is required',
          min: { value: 0, message: 'Mileage must be 0 or bigger' },
          max: { value: 1000, message: 'Mileage must be 1000 or fewer' },
        })}
        InputProps={{ endAdornment: <InputAdornment position="end">1,000 km</InputAdornment> }}
        sx={TextFieldStyle}
        error={Boolean(errors.mileage_km)}
        helperText={errors.mileage_km?.message}
      />
      <FormControl component="fieldset" sx={TextFieldStyle}>
        <FormLabel component="legend">Gearbox</FormLabel>
        <Controller
          name="gearbox"
          control={control}
          rules={{ required: 'Gearbox is required' }}
          render={({ field }) => (
            <RadioGroup {...field} sx={RadioGroupStyle}>
              {radioOptionsGearbox.map((option) => (
                <RadioFormControlLabel key={option.value} value={option.value} label={option.label} />
              ))}
            </RadioGroup>
          )}
        />
        {errors.gearbox && <FormHelperText error>{errors.gearbox.message}</FormHelperText>}
      </FormControl>
      <FormControl component="fieldset" sx={TextFieldStyle}>
        <FormLabel component="legend">Fuel</FormLabel>
        <Controller
          name="fuel"
          control={control}
          rules={{ required: 'Fuel is required' }}
          render={({ field }) => (
            <RadioGroup {...field} sx={RadioGroupStyle}>
              {radioOptionsFuel.map((option) => (
                <RadioFormControlLabel key={option.value} value={option.value} label={option.label} />
              ))}
            </RadioGroup>
          )}
        />
        {errors.fuel && <FormHelperText error>{errors.fuel.message}</FormHelperText>}
      </FormControl>
      <TextField
        label="Price Per Day"
        type="number"
        {...register('price_per_day', {
          required: 'Price is required',
          min: { value: 1, message: 'Price must be 1 or bigger' },
        })}
        InputProps={{ endAdornment: <InputAdornment position="end">$</InputAdornment> }}
        sx={TextFieldStyle}
        error={Boolean(errors.price_per_day)}
        helperText={errors.price_per_day?.message}
      />
      <TextField
        label="Horse Power"
        type="number"
        {...register('horse_power', {
          required: 'Horse power is required',
          min: { value: 1, message: 'Horse power must be 1 or bigger' },
          max: { value: 1000, message: 'Horse power must be 1000 or fewer' },
        })}
        InputProps={{ endAdornment: <InputAdornment position="end">kW</InputAdornment> }}
        sx={TextFieldStyle}
        error={Boolean(errors.horse_power)}
        helperText={errors.horse_power?.message}
      />
      <TextField
        label="Engine Capacity"
        type="number"
        {...register('engine_capacity', {
          required: 'Engine capacity is required',
          min: { value: 0.1, message: 'Engine capacity must be 0.1 or bigger' },
          max: { value: 10, message: 'Engine capacity must be 10 or fewer' },
        })}
        InputProps={{ endAdornment: <InputAdornment position="end">cm3</InputAdornment> }}
        sx={TextFieldStyle}
        error={Boolean(errors.engine_capacity)}
        helperText={errors.engine_capacity?.message}
      />
      <FormControl error={Boolean(errors.purpose)} sx={TextFieldStyle}>
        <InputLabel>Purpose</InputLabel>
        <Controller
          name="purpose"
          control={control}
          rules={{ required: 'Purpose is required' }}
          render={({ field }) => (
            <Select {...field}>
              {purposes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        {errors.purpose && <FormHelperText error>{errors.purpose.message}</FormHelperText>}
      </FormControl>
      <Box sx={{width: '85%'}}>
        <FormLabel component="legend">Photo</FormLabel>
        <FileUpload 
          control={control} 
          rules={{ required: 'Photo is required' }} 
          name="auto_photo" 
          label="Upload Photo" 
          error={Boolean(errors.auto_photo)}
          helperText={errors.auto_photo?.message}
          reset={handleReset}
        />
      </Box>
      <Box sx={BoxButton}>
        <Button type="submit" variant="contained" sx={{ backgroundColor: 'success.main', '&:hover': { color: 'text.primary', backgroundColor: 'success.dark' }, ButtonStyle }}>
          Submit
        </Button>
        <Button type="button" variant="contained" onClick={handleReset} sx={{ backgroundColor: 'error.light', '&:hover': { color: 'text.primary', backgroundColor: 'error.dark' }, ButtonStyle }}>
          Reset
        </Button>
      </Box>
    </Box>
  );
};

export default Form;
