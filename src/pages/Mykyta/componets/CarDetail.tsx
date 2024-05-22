import React from "react";
import { FormData } from "../../../interfaces";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Button,
  TextField,
  MenuItem,
  Select,
  Box,
} from "@mui/material";
import { purposes } from "../../../interfaces";
import { bodyTypes } from "../../../interfaces";
import { gearboxTypes } from "../../../interfaces";
import { fuelTypes } from "../../../interfaces";
import { useForm, Controller } from "react-hook-form";
import { InputAdornment } from "@mui/material";

type CardProps = {
  data: FormData;
  onDelete: (index: number) => void;
  index: number;
  onSave: (data: FormData) => void;
  isEditing: boolean;
  onEdit: (index: number) => void;
};

const TableContainerStyle = {
  border: "none",
  maxWidth: { md: "300px", sm: "300px", xs: "300px" },
  minWidth: { md: "200px", sm: "100px", xs: "100px" },
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

const CardTextField = {
  width: "100%",
};

const SaveEditButtonStyle = {
  marginTop: 2,
  marginBottom: 2,
  marginLeft: 2,
  marginRight: 2,
  "&:hover": {
    backgroundColor: "dark",
  },
};

const DeleteButtonStyle = {
  marginTop: 2,
  marginBottom: 2,
  marginLeft: 2,
  marginRight: 2,
  color: "secondary.main",
  backgroundColor: "error.main",
  "&:hover": {
    backgroundColor: "error.dark",
  },
};

const CarDetail: React.FC<CardProps> = ({
  data,
  onDelete,
  index,
  onSave,
  onEdit,
  isEditing,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: data,
    mode: "onChange",
  });

  const onSubmit = (data: FormData) => {
    isEditing ? onSave(data) : onEdit(index);
  };

  return (
    <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
      <TableContainer sx={TableContainerStyle}>
        <Table aria-label="a dense table" size="small">
          <TableBody>
            <TableRow>
              <TableCell>Brand:</TableCell>
              <TableCell>
                {isEditing ? (
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
                ) : (
                  data.brand
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Model:</TableCell>
              <TableCell>
                {isEditing ? (
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
                ) : (
                  data.model
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Year:</TableCell>
              <TableCell>
                {isEditing ? (
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
                ) : (
                  data.year
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Body Type:</TableCell>
              <TableCell>
                {isEditing ? (
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

                ) : (
                  data.body_type
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Mileage:</TableCell>
              <TableCell>
                {isEditing ? (
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
                ) : (
                  data.mileage_km
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Gearbox:</TableCell>
              <TableCell>
              {isEditing ? (
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

                ) : (
                  data.gearbox
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Fuel:</TableCell>
              <TableCell>
              {isEditing ? (
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
                ) : (
                  data.fuel
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Price per day:</TableCell>
              <TableCell>
                {isEditing ? (
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
                ) : (
                  data.price_per_day
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Horse Power:</TableCell>
              <TableCell>
                {isEditing ? (
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
                ) : (
                  data.horse_power
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Engine Capacity:</TableCell>
              <TableCell>
                {isEditing ? (
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
                ) : (
                  data.engine_capacity
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Purpose:</TableCell>
              <TableCell>
              {isEditing ? (
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

                ) : (
                  data.purpose
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Button
          variant="contained"
          color="success"
          sx={SaveEditButtonStyle}
          type="submit"
        >
          {isEditing ? "Save" : "Edit"}
        </Button>
        <Button
          variant="contained"
          onClick={() => onDelete(index)}
          sx={DeleteButtonStyle}
        >
          Delete
        </Button>
      </TableContainer>
    </Box>
  );
};

export default CarDetail;
