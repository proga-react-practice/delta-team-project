import React from "react";
import { FormData } from "../../../../interfaces";
import { SelectChangeEvent } from "@mui/material";
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
} from "@mui/material";
import { purposes }  from "../../../../interfaces";
import { bodyTypes } from "../../../../interfaces";
import { gearboxTypes } from "../../../../interfaces";
import { fuelTypes } from "../../../../interfaces";

type CardProps = {
  data: FormData;
  onDelete: () => void;
};

const TableContainerStyle = {
  border: "none",
  maxWidth: { md: "300px", sm: "300px", xs: "300px"},
  minWidth: { md: "200px", sm: "100px", xs: "100px"},
  borderRadius: "10px",
  backgroundColor: "secondary.main",
  color: "primary.main",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
  marginBottom: 4,
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

const Card: React.FC<CardProps> = ({ data, onDelete }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [formData, setFormData] = React.useState(data);


  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!validateForm()) {
      return;
    }
    setIsEditing(false);
    data = formData;
  };

  const validateForm = () => {
    if (formData.brand === "" || formData.model === "" || formData.year < 1900 || formData.year > new Date().getFullYear() || formData.mileage_km < 0 || formData.mileage_km > 1000 || formData.price_per_day < 1 || formData.horse_power < 1 || formData.horse_power > 1000 || formData.engine_capacity < 0.1 || formData.engine_capacity > 10){
      return false;
    }
    return true;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <TableContainer sx={TableContainerStyle}>
      <Table aria-label="a dense table" size="small">
        <TableBody>
          <TableRow>
            <TableCell>Brand:</TableCell>
            <TableCell>
              {isEditing ? (
                <TextField
                  name="brand"
                  sx={CardTextField}
                  value={formData.brand}
                  onChange={handleChange}
                  error={formData.brand === ""}
                  helperText={formData.brand === "" ? "This field is required" : ""}
                />
              ) : (
                formData.brand
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Model:</TableCell>
            <TableCell>
              {isEditing ? (
                <TextField
                  name="model"
                  sx={CardTextField}
                  value={formData.model}
                  onChange={handleChange}
                  error={formData.model === ""}
                  helperText={formData.model === "" ? "This field is required" : ""}
                />
              ) : (
                formData.model
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Year:</TableCell>
            <TableCell>
              {isEditing ? (
                <TextField
                  name="year"
                  type="number"
                  sx={CardTextField}
                  value={formData.year}
                  onChange={handleChange}
                  error={formData.year < 1900 || formData.year > new Date().getFullYear()}
                  helperText={formData.year < 1900 || formData.year > new Date().getFullYear() ? "Year must be among 1900 and 2024" : ""}
                />
              ) : (
                formData.year
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Body Type:</TableCell>
            <TableCell>
            {isEditing ? (
              <Select
                name="body_type"
                sx={CardTextField}
                value={formData.body_type}
                onChange={handleSelectChange}
              >
                {bodyTypes.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            ) : (
              formData.body_type
            )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Mileage:</TableCell>
            <TableCell>
              {isEditing ? (
                <TextField
                  name="mileage_km"
                  type="number"
                  sx={CardTextField}
                  value={formData.mileage_km}
                  onChange={handleChange}
                  error={formData.mileage_km < 0 || formData.mileage_km > 1000}
                  helperText={formData.mileage_km < 0 || formData.mileage_km > 1000 ? "Mileage must be among 0 and 1000" : ""}
                />
              ) : (
                formData.mileage_km
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Gearbox:</TableCell>
            <TableCell>
            {isEditing ? (
              <Select
                name="gearbox"
                sx={CardTextField}
                value={formData.gearbox}
                onChange={handleSelectChange}
              >
                {gearboxTypes.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            ) : (
              formData.gearbox
            )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Fuel:</TableCell>
            <TableCell>
              {isEditing ? (
                <Select
                  name="fuel"
                  sx={CardTextField}
                  value={formData.fuel}
                  onChange={handleSelectChange}
                >
                  {fuelTypes.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              ) : (
                formData.fuel
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Price per day:</TableCell>
            <TableCell>
              {isEditing ? (
                <TextField
                  name="price_per_day"
                  type="number"
                  sx={CardTextField}
                  value={formData.price_per_day}
                  onChange={handleChange}
                  error={formData.price_per_day < 1}
                  helperText={formData.price_per_day < 1 ? "Price must be 1 or bigger" : ""}
                />
              ) : (
                formData.price_per_day
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Horse Power:</TableCell>
            <TableCell>
              {isEditing ? (
                <TextField
                  name="horse_power"
                  type="number"
                  sx={CardTextField}
                  value={formData.horse_power}
                  onChange={handleChange}
                  error={formData.horse_power < 1 || formData.horse_power > 1000}
                  helperText={formData.horse_power < 1 || formData.horse_power > 1000 ? "Horse power must be among 1 and 1000" : ""}
                />
              ) : (
                formData.horse_power
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Engine Capacity:</TableCell>
            <TableCell>
              {isEditing ? (
                <TextField
                  name="engine_capacity"
                  sx={CardTextField}
                  type="number"
                  value={formData.engine_capacity}
                  onChange={handleChange}
                  error={formData.engine_capacity < 0.1 || formData.engine_capacity > 10}
                  helperText={formData.engine_capacity < 0.1 || formData.engine_capacity > 10 ? "Engine capacity must be among 1 and 10" : ""}
                />
              ) : (
                formData.engine_capacity
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Purpose:</TableCell>
            <TableCell>
            {isEditing ? (
              <Select
                name="purpose"
                sx={CardTextField}
                value={formData.purpose}
                onChange={handleSelectChange}
              >
                {purposes.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            ) : (
              formData.purpose
            )}
          </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      {isEditing ? (
        <Button variant="contained" color="success" onClick={handleSave} sx={SaveEditButtonStyle}>
          Save
        </Button>
      ) : (
        <Button variant="contained" color="success" onClick={handleEdit}  sx={SaveEditButtonStyle}>
          Edit
        </Button>
      )}
      <Button variant="contained" onClick={onDelete} sx={DeleteButtonStyle}>
        Delete
      </Button>
    </TableContainer>
  );
};

export default Card;
