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
  FormControl,
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
  width: "85%",
  margin: "4%",
  borderRadius: "10px",
  border: '1px solid black'
};

const PriceStyle = {
  color: "error.dark",
  fontSize: {lg: "24px", sm: '24px', xs: '15px',},
  fontWeight: "bold",
};

const ButtonStyle = {
  backgroundColor: 'black',
  color: 'white',
  marginTop: "20px",
  '&:hover': {
    color: 'black',
    backgroundColor: 'darkgrey',
  },
};

const InfoPhotoContainer = {
  display: "flex",
  flexDirection: "row",
  width: "100%",
};

const InfoTableColumn = {
  display: "flex",
  flexDirection: "row",
  width: {xs: '95%'}
}

const TableCellFontStyle = {
  fontWeight: "bold",
};

const ImageContainerStyle = {
  width: {lg: "60%", md: "90%"},
};

const CardTextField = {
  width: "100%",
  marginTop: "10px",
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

const CardSelect = {
  width: "100%",
  marginTop: "10px",
  borderColor: "primary.main",
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

  const ButtonsStyle = {
    width: {lg: "100%", sm:'70%'},
    display: "flex",
    justifyContent: "start",
    flexDirection: {lg: 'row', sm: 'column', xs: 'column'},
    fontSize: {xs: '20px'}
  }

  const EditContainerStyle = {
    border: "none",
    width: "100%",
    color: "primary.main",
    marginBottom: 4,
  }

  const ButtonContainerStyle = {
    width: {lg: "11%", md: '7%', xs: '5%'}, 
    display:"flex", 
    justifyContent:"start", 
    alignItems:"start", 
    height:"100%"
  }

  const HeaderCard = {
    display: "flex",
    flexDirection: {lg: "row", sm: 'column', xs: "column"},
    maxWidth: {lg: "89%", md: '93%', sm: '90%', xs: '80%'},
    minWidth: {lg: "89%", md: '93%', sm: '90%', xs: '80%'},
  }

  const InfoContainerStyle = {
    display: "flex",
    flexDirection: "column",
    width: {lg: "25%", md: '80%', xs: '80%'},
    marginLeft: "5%",
    justifyContent: "center",
    gap: {lg: '3%', md: "5%", sm: "5%", xs: "5%"},
  };

  const Size = {
    fontSize: {lg: '25px', sm:'24px', xs: '15px',},
    fontWeight: {lg: 'none', xs: 'bold',},
    color: 'text.primary'
  }

  const HeaderModel = {
    display: 'flex', 
    flexDirection: {lg: 'column', md: 'row'}, 
    gap: '5%'
  }

  const DialogStyle = {
    backgroundColor: 'secondary.main',
  }

  const TableCellStyle = {
    border: 0,
    width: "100%",
  }

  const InnerCell = {
    display: 'flex', 
    alignItems: 'center'
  }

  const IconSizeStyle = {
    minWidth: '20px', 
    minHeight: '20px'
  }

  const InnerText = {
    marginLeft: {lg: '3%', md: '3%', sm: '3%', xs: '15%'},
  }

  const DeleteButtonStyle = {
    color: 'text.primary',
    '&:hover': {
      color: 'error.dark',
      backgroundColor: '#93B1A6',
    },
  }

  const EditButtonStyle = {
    color: 'text.primary',
    '&:hover': {
      color: 'info.light',
      backgroundColor: '#93B1A6',
    },
  }

  const IconSize = 25;

  const carId = data.id;

  return (
    <Box sx={TableContainerStyle} >
      {isRenting && (
        <Dialog open={openDialog}>
          <Box sx={DialogStyle}>
          <DialogTitle>Rent Car</DialogTitle>
          <DialogContent >
            <RentCarForm onSubmit={handleRentSubmit} onClose={handleCloseDialog} index={carId}/>
          </DialogContent>
          </Box>
        </Dialog>
      )} 
      { isEditing ? (
      <>
        <Dialog component={'form'} open={openDialog} onClose={handleCloseDialog} onSubmit={handleSubmit(onSubmit)}>
          <Box sx={DialogStyle}>
            <DialogTitle>Edit Car</DialogTitle>
            <DialogContent>
              <Box sx={EditContainerStyle}>
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
                  <FormControl sx={CardTextField}>
                  <Controller
                    name="body_type"
                    control={control}
                    defaultValue={data.body_type}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select {...field} sx={CardSelect}>
                        {bodyTypes.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>  
                    )}
                  />
                  </FormControl>
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
                  <FormControl sx={CardTextField}>
                  <Controller
                    name="gearbox"
                    control={control}
                    defaultValue={data.gearbox}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select {...field} sx={CardSelect}>
                        {gearboxTypes.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>  
                    )}
                  />
                  </FormControl>
                  <FormControl sx={CardTextField}>
                  <Controller
                    name="fuel"
                    control={control}
                    defaultValue={data.fuel}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select {...field} sx={CardSelect}>
                        {fuelTypes.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>  
                    )}
                  />
                  </FormControl>
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
                  <FormControl sx={CardTextField}>
                  <Controller
                  name="purpose"
                  control={control}
                  defaultValue={data.purpose}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select {...field} sx={CardSelect}>
                      {purposes.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>  
                  )}
                />
                </FormControl>
              </Box>
            </DialogContent>
            <DialogActions sx={DialogButtons}>
                  <StyledButtonDelete sx={{ width: '40%' }} onClick={handleCloseDialog}>Close</StyledButtonDelete>
                  <StyledButtonSave sx={{ width: '40%' }} type='submit'>Save</StyledButtonSave>
            </DialogActions>
          </Box>
        </Dialog>
      </> 
    ):( 
      <>
      <Box sx={InfoPhotoContainer}>
        <Box sx={HeaderCard}>
          <Box sx={ImageContainerStyle}>
            {carImage && <Box component={"img"} src={carImage} alt={`${data.brand} ${data.model}`} sx={ImageStyle} />}
          </Box>
          <Box sx={InfoContainerStyle}>
            <Box sx={HeaderModel}>
              <Typography sx={Size} variant="h3">{data.brand} {data.model}</Typography>
              <Typography sx={Size} variant="h4">{data.year}</Typography>
              <Typography variant="h5" sx={PriceStyle}>${data.price_per_day}/Day</Typography>
            </Box>
            <Button variant="contained" onClick={() => handleRent(index)} sx={ButtonStyle}>Book</Button>
          </Box>
        </Box>
        <Box component={"form"} onSubmit={handleSubmit(onSubmit)} sx={ButtonContainerStyle}>
          <Box sx={ButtonsStyle}>
            <Button sx={EditButtonStyle} type="submit"><FaRegEdit size={IconSize}/></Button>
            <Link to="/car-list"><Button sx={DeleteButtonStyle} onClick={() => onDelete(index)}><FaRegTrashAlt size={IconSize}/></Button></Link>
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
                  <TableCell sx={TableCellStyle}> 
                    <Box sx={InnerCell}>
                      <BsFillFuelPumpFill size={IconSize} style={IconSizeStyle}/> 
                      <Box sx={InnerText}>
                        <Typography sx={TableCellFontStyle}> Fuel Type: </Typography> {data.fuel}
                      </Box>
                    </Box>
                  </TableCell> 
                </Box>
                <Box sx={InfoTableCellStyle}>  
                  <TableCell sx={TableCellStyle}>
                    <Box sx={InnerCell}>
                      <TbManualGearbox size={IconSize} style={IconSizeStyle}/> 
                      <Box sx={InnerText}>  
                          <Typography sx={TableCellFontStyle}> Gear: </Typography> {data.gearbox}
                      </Box>
                    </Box>
                  </TableCell>
                </Box>
              </Box>
              </TableRow>
              <TableRow>
              <Box sx={InfoTableColumn}>
                <Box sx={InfoTableCellStyle}>  
                  <TableCell sx={TableCellStyle}> 
                    <Box sx={InnerCell}>   
                      <FaCarSide size={IconSize} style={IconSizeStyle}/> 
                      <Box sx={InnerText}>
                        <Typography sx={TableCellFontStyle}> Body type: </Typography> {data.body_type}
                      </Box>
                    </Box>
                  </TableCell> 
                </Box>
                <Box sx={InfoTableCellStyle}>  
                  <TableCell sx={TableCellStyle}> 
                    <Box sx={InnerCell}>
                      <IoMdSpeedometer size={IconSize} style={IconSizeStyle}/> 
                      <Box sx={InnerText}>
                        <Typography sx={TableCellFontStyle}> Mileage: </Typography> {data.mileage_km}k km
                      </Box>
                    </Box>
                  </TableCell> 
                </Box>
              </Box>
              </TableRow>
              <TableRow>
              <Box sx={InfoTableColumn}>
                <Box sx={InfoTableCellStyle}>  
                  <TableCell sx={TableCellStyle}> 
                    <Box sx={InnerCell}>
                      <GiHorseHead size={IconSize} style={IconSizeStyle}/> 
                      <Box sx={InnerText}>
                        <Typography sx={TableCellFontStyle}> Horse powers: </Typography> {data.horse_power}
                      </Box>
                    </Box>
                  </TableCell> 
                </Box>
                <Box sx={InfoTableCellStyle}>  
                  <TableCell sx={TableCellStyle}> 
                    <Box sx={InnerCell}>
                      <TbEngine size={IconSize} style={IconSizeStyle}/> 
                      <Box sx={InnerText}>
                        <Typography sx={TableCellFontStyle}> Engine capacity: </Typography> {data.engine_capacity} cm3
                      </Box>
                    </Box>
                  </TableCell> 
                </Box>
              </Box>
              </TableRow>
              <TableRow>
              <Box sx={InfoTableColumn}>
                <Box sx={InfoTableCellStyle}>  
                  <TableCell sx={TableCellStyle}> 
                    <Box sx={InnerCell}>
                      <BiTask size={IconSize} style={IconSizeStyle}/> 
                      <Box sx={InnerText}>
                        <Typography sx={TableCellFontStyle}> Purpose: </Typography> {data.purpose}
                      </Box>
                    </Box>
                  </TableCell> 
                </Box>
                <Box sx={InfoTableCellStyle}>  
                  <TableCell sx={TableCellStyle}> 
                    <Box sx={InnerCell}>
                      <MdFactory size={IconSize} style={IconSizeStyle}/> 
                      <Box sx={InnerText}>
                        <Typography sx={TableCellFontStyle}> Manufacter: </Typography> Europe
                      </Box>
                    </Box>
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
