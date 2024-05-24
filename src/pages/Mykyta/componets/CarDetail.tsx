import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { FormData, RentCar, bodyTypes, fuelTypes, gearboxTypes, purposes } from "../../../interfaces";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { FaCarSide } from "react-icons/fa6";
import { GiHorseHead } from "react-icons/gi";
import { BiTask } from "react-icons/bi";
import { TbManualGearbox } from "react-icons/tb";
import { IoMdSpeedometer } from "react-icons/io";
import { TbEngine } from "react-icons/tb";
import { MdFactory } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { StyledButtonDelete } from "../../Andrii/styledComponents/StyledButtonDelete";
import { StyledButtonSave } from "../../Andrii/styledComponents/StyledButtonSave";
import { Link } from 'react-router-dom';
import RentCarForm from '../../Andrii/forms/RentCarForm';

type CardProps = {
  data: FormData;
  onDelete: (index: number) => void;
  index: number;
  onSave: (data: FormData) => void;
  isEditing: boolean;
  isRenting: boolean;
  onEdit: (index: number | null) => void;
  onRent: (form: RentCar | null) => void;
  onRentClick: (index: number | null) => void;
};

const TableContainerStyle = {
  border: "none",
  width: "90%",
  borderRadius: "10px",
  backgroundColor: "secondary.main",
  color: "primary.main",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
  marginBottom: 4,
  animation: "fadeIn 1.5s forwards",
  "@keyframes fadeIn": {
    "0%": {
      opacity: 0,
    },
    "100%": {
      opacity: 1,
    },
  },
};

const DialogButtons = {
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
}

const ImageStyle = {
  width: "80%",
  margin: "4%",
  borderRadius: "5px",
};

const PriceStyle = {
  color: "red",
  fontSize: "24px",
  fontWeight: "bold",
};

const ButtonStyle = {
  marginTop: "20px",
};

const InfoPhotoContainer = {
  display: "flex",
  flexDirection: "row",
  // alignItems: "center",
  width: "100%",
};

const InfoContainerStyle = {
  display: "flex",
  flexDirection: "column",
  width: "25%",
  marginLeft: "5%",
  justifyContent: "center",
};

const InfoTableColumn = {
  display: "flex",
  flexDirection: "row",
}

const TableCellFontStyle = {
  fontWeight: "bold",
};


const ImageContainerStyle = {
  width: "60%",
};

const CardTextField = {
  width: "100%",
  marginTop: "10px",
};

const CarDetail: React.FC<CardProps> = ({
  data,
  onDelete,
  index,
  onSave,
  onEdit,
  isEditing,
  isRenting,
  onRent,
  onRentClick,
}) => {
  const { handleSubmit, control, register, formState: { errors } } = useForm<FormData>({
    defaultValues: data,
    mode: "onChange",
  });

  const [openDialog, setOpenDialog] = useState(false);

  const handleEdit = (index: number) =>{
    onEdit(index);
    setOpenDialog(true);
  }

  const handleRent = (index: number) => {
    onRentClick(index);
    setOpenDialog(true);
  };

  const handleRentSubmit = (form: RentCar | null) => {
    onRent(form);
    setOpenDialog(false);
  };

  const handleSave = (data: FormData) =>{
    onSave(data);
    setOpenDialog(false);
  }

  const onSubmit = (data: FormData) => {
    isEditing ? handleSave(data) : handleEdit(index);
  };

  const handleCloseDialog = () => {
    if (isEditing) {
      onEdit(null);
    } else {
      onRentClick(null);
    }
    setOpenDialog(false);
  };

  const carImage = data.auto_photo ? URL.createObjectURL(data.auto_photo) : '';

  const InfoTableCellStyle = {
    marginLeft: "5%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "50%",
  }

  const ButtonContainer = {
    width: "100%",
    display: "flex",
    justifyContent: "start",
  }

  const EditContainerStyle = {
    border: "none",
    width: "100%",
    color: "primary.main",
    marginBottom: 4,
  }

  const IconSize = 25;

  return (
    
    <Box sx={TableContainerStyle} >
      {isRenting && (
        <Dialog open={openDialog}>
          <DialogTitle>Rent Car</DialogTitle>
          <DialogContent>
            <RentCarForm onSubmit={handleRentSubmit} onClose={handleCloseDialog} />
          </DialogContent>
        </Dialog>
      )} 
      { isEditing ? (
      <>
        <Dialog component={'form'} open={openDialog} onClose={handleCloseDialog} onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Edit Car</DialogTitle>
           <DialogContent>
            <Box sx={EditContainerStyle} >
                <TextField
                  {...register("brand", {
                    required: "Brand is required",
                    validate: {
                      isFirstLetterUppercase: (value) =>
                        /^[A-Z]/.test(value) || "The first letter must be uppercase",
                    },
                  })}
                    name="brand"
                    sx={CardTextField}
                    error={Boolean(errors.brand)}
                    helperText={errors.brand?.message}
                  />
                <TextField
                  {...register("model", {
                    required: "Model is required",
                    validate: {
                      isFirstLetterUppercase: (value) =>
                        /^[A-Z]/.test(value) || "The first letter must be uppercase",
                    },
                  })}
                    name="model"
                    sx={CardTextField}
                    error={Boolean(errors.model)}
                    helperText={errors.model?.message}
                  />
                  <TextField
                  {...register("year", {
                    required: "Year is required",
                    min: { value: 1900, message: "Year must be 1900 or later" },
                    max: {
                      value: new Date().getFullYear(),
                      message: "Year must be this year or earlier",
                    },
                  })}
                    name="year"
                    type="number"
                    sx={CardTextField}
                    error={Boolean(errors.year)}
                    helperText={errors.year?.message}
                  />
                   <Controller
                    name="body_type"
                    control={control}
                    defaultValue={data.body_type}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select {...field} sx={CardTextField}>
                        {bodyTypes.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>  
                    )}
                  />
                   <TextField
                  {...register("mileage_km", {
                    required: "Mileage is required",
                    min: { value: 0, message: "Mileage must be 0 or bigger" },
                    max: { value: 1000, message: "Mileage must be 1000 or fewer" },
                  })}
                    name="mileage_km"
                    type="number"
                    sx={CardTextField}
                    error={Boolean(errors.mileage_km)}
                    helperText={errors.mileage_km?.message}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">1,000 km</InputAdornment>
                      ),
                    }}
                  />
                   <Controller
                    name="gearbox"
                    control={control}
                    defaultValue={data.gearbox}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select {...field} sx={CardTextField}>
                        {gearboxTypes.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>  
                    )}
                  />
                  <Controller
                    name="fuel"
                    control={control}
                    defaultValue={data.fuel}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select {...field} sx={CardTextField}>
                        {fuelTypes.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>  
                    )}
                  />
                   <TextField
                  {...register("price_per_day", {
                    required: "Price is required",
                    min: { value: 1, message: "Price must be 1 or bigger" },
                  })}
                    name="price_per_day"
                    type="number"
                    sx={CardTextField}
                    error={Boolean(errors.price_per_day)}
                    helperText={errors.price_per_day?.message}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">$</InputAdornment>,
                    }}
                  />
                  <TextField
                  {...register("horse_power", {
                    required: "Horse power is required",
                    min: { value: 1, message: "Horse power must be 1 or bigger" },
                    max: { value: 1000, message: "Horse power must be 1000 or fewer" },
                  })}
                    name="horse_power"
                    type="number"
                    sx={CardTextField}
                    error={Boolean(errors.horse_power)}
                    helperText={errors.horse_power?.message}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">kW</InputAdornment>,
                    }}
                  />
                   <TextField
                  {...register("engine_capacity", {
                    required: "Engine capacity is required",
                    min: { value: 0.1, message: "Engine capacity must be 0.1 or bigger" },
                    max: { value: 10, message: "Engine capacity must be 10 or fewer" },
                  })}
                    name="engine_capacity"
                    sx={CardTextField}
                    type="number"
                    error={Boolean(errors.engine_capacity)}
                    helperText={errors.engine_capacity?.message}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">cm3</InputAdornment>,
                    }}
                  />
                  <Controller
                  name="purpose"
                  control={control}
                  defaultValue={data.purpose}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select {...field} sx={CardTextField}>
                      {purposes.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>  
                  )}
                />
              </Box>
           </DialogContent>
           <DialogActions sx={DialogButtons}>
                  <StyledButtonDelete sx={{ width: '40%' }} onClick={handleCloseDialog}>Close</StyledButtonDelete>
                  <StyledButtonSave sx={{ width: '40%' }} type='submit'>Save</StyledButtonSave>
            </DialogActions>
        </Dialog>
      </> 
    ):( 
      <>
      <Box sx={InfoPhotoContainer}>
        <Box sx={ImageContainerStyle}>
          {carImage && <img src={carImage} alt={`${data.brand} ${data.model}`} style={ImageStyle} />}
        </Box>
          <Box sx={InfoContainerStyle}>
            <Typography variant="h3">{data.brand} {data.model}</Typography>
            <Typography variant="h5">{data.year}</Typography>
            <Typography variant="h5" sx={PriceStyle}>${data.price_per_day}/Day</Typography>
            <Button variant="contained" color="primary" onClick={() => handleRent(index)} sx={ButtonStyle}>Book Your Ride</Button>
          </Box>
          <Box component={"form"} onSubmit={handleSubmit(onSubmit)} sx={{width:"10%", display:"flex", justifyContent:"start", alignItems:"start", height:"100%"}}>
            <Box sx={ButtonContainer}>
              <Button type="submit"><FaRegEdit size={IconSize}/></Button>
              <Link to="/car-list"><Button onClick={() => onDelete(index)}><FaRegTrashAlt size={IconSize}/></Button></Link>
            </Box> 
        </Box>
      </Box>
      <Box>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
              <Box sx={InfoTableColumn}>
                <Box sx={InfoTableCellStyle}>  
                  <BsFillFuelPumpFill size={IconSize}/> 
                  <TableCell> 
                      <Typography sx={TableCellFontStyle}> Fuel Type: </Typography> {data.fuel}
                  </TableCell> 
                </Box>
                <Box sx={InfoTableCellStyle}>  
                  <TbManualGearbox size={IconSize}/> 
                  <TableCell> 
                      <Typography sx={TableCellFontStyle}> Gear: </Typography> {data.gearbox}
                  </TableCell> 
                </Box>
              </Box>
              </TableRow>
              <TableRow>
              <Box sx={InfoTableColumn}>
                <Box sx={InfoTableCellStyle}>  
                  <FaCarSide size={IconSize}/> 
                  <TableCell> 
                      <Typography sx={TableCellFontStyle}> Body type: </Typography> {data.body_type}
                  </TableCell> 
                </Box>
                <Box sx={InfoTableCellStyle}>  
                  <IoMdSpeedometer size={IconSize}/> 
                  <TableCell> 
                      <Typography sx={TableCellFontStyle}> Mileage: </Typography> {data.mileage_km} km
                  </TableCell> 
                </Box>
              </Box>
              </TableRow>
              <TableRow>
              <Box sx={InfoTableColumn}>
                <Box sx={InfoTableCellStyle}>  
                  < GiHorseHead size={IconSize}/> 
                  <TableCell> 
                      <Typography sx={TableCellFontStyle}> Horse powers: </Typography> {data.horse_power}
                  </TableCell> 
                </Box>
                <Box sx={InfoTableCellStyle}>  
                  <TbEngine size={IconSize}/> 
                  <TableCell> 
                      <Typography sx={TableCellFontStyle}> Engine capacity: </Typography> {data.engine_capacity} cm3
                  </TableCell> 
                </Box>
              </Box>
              </TableRow>
              <TableRow>
              <Box sx={InfoTableColumn}>
                <Box sx={InfoTableCellStyle}>  
                  <BiTask size={IconSize}/> 
                  <TableCell> 
                      <Typography sx={TableCellFontStyle}> Purpose: </Typography> {data.purpose}
                  </TableCell> 
                </Box>
                <Box sx={InfoTableCellStyle}>  
                  <MdFactory size={IconSize}/> 
                  <TableCell> 
                      <Typography sx={TableCellFontStyle}> Manufacter: </Typography> Europe
                  </TableCell> 
                </Box>
              </Box>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      </>
      )} 
    </Box>
  );
};

export default CarDetail;
