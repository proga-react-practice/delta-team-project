import React from "react";
import { FormData } from "../../../../interfaces";
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
import { purposes } from "../../../../interfaces";
import { bodyTypes } from "../../../../interfaces";
import { gearboxTypes } from "../../../../interfaces";
import { fuelTypes } from "../../../../interfaces";
import { useForm } from "react-hook-form";

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

const Card: React.FC<CardProps> = ({
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
                    {...register(`brand`, { required: true })}
                    name="brand"
                    sx={CardTextField}
                    error={data.brand === ""}
                    helperText={
                      data.brand === "" ? "This field is required" : ""
                    }
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
                    {...register(`model`, { required: true })}
                    name="model"
                    sx={CardTextField}
                    error={data.model === ""}
                    helperText={
                      data.model === "" ? "This field is required" : ""
                    }
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
                    {...register(`year`, { required: true })}
                    name="year"
                    type="number"
                    sx={CardTextField}
                    error={
                      data.year < 1900 || data.year > new Date().getFullYear()
                    }
                    helperText={
                      data.year < 1900 || data.year > new Date().getFullYear()
                        ? "Year must be among 1900 and 2024"
                        : ""
                    }
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
                  <Select
                    {...register(`body_type`, { required: true })}
                    name="body_type"
                    sx={CardTextField}
                  >
                    {bodyTypes.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
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
                    {...register(`mileage_km`, {
                      required: true,
                    })}
                    name="mileage_km"
                    type="number"
                    sx={CardTextField}
                    error={data.mileage_km < 0 || data.mileage_km > 1000}
                    helperText={
                      data.mileage_km < 0 || data.mileage_km > 1000
                        ? "Mileage must be among 0 and 1000"
                        : ""
                    }
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
                  <Select
                    {...register(`gearbox`, { required: true })}
                    name="gearbox"
                    sx={CardTextField}
                    value={data.gearbox}
                    //onChange={handleSelectChange}
                  >
                    {gearboxTypes.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                ) : (
                  data.gearbox
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Fuel:</TableCell>
              <TableCell>
                {isEditing ? (
                  <Select
                    {...register(`fuel`, { required: true })}
                    name="fuel"
                    sx={CardTextField}
                    value={data.fuel}
                    //onChange={handleSelectChange}
                  >
                    {fuelTypes.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
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
                    {...register(`price_per_day`, {
                      required: true,
                    })}
                    name="price_per_day"
                    type="number"
                    sx={CardTextField}
                    error={data.price_per_day < 1}
                    helperText={
                      data.price_per_day < 1 ? "Price must be 1 or bigger" : ""
                    }
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
                    {...register(`horse_power`, {
                      required: true,
                    })}
                    name="horse_power"
                    type="number"
                    sx={CardTextField}
                    error={data.horse_power < 1 || data.horse_power > 1000}
                    helperText={
                      data.horse_power < 1 || data.horse_power > 1000
                        ? "Horse power must be among 1 and 1000"
                        : ""
                    }
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
                    {...register(`engine_capacity`, {
                      required: true,
                    })}
                    name="engine_capacity"
                    sx={CardTextField}
                    type="number"
                    error={
                      data.engine_capacity < 0.1 || data.engine_capacity > 10
                    }
                    helperText={
                      data.engine_capacity < 0.1 || data.engine_capacity > 10
                        ? "Engine capacity must be among 1 and 10"
                        : ""
                    }
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
                  <Select
                    {...register(`purpose`, { required: true })}
                    name="purpose"
                    sx={CardTextField}
                    value={data.purpose}
                    //onChange={handleSelectChange}
                  >
                    {purposes.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
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

export default Card;
