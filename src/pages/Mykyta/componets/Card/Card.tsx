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
} from "@mui/material";

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
    setIsEditing(false);
    data = formData;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
                  sx={CardTextField}
                  value={formData.year}
                  onChange={handleChange}
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
                <TextField
                  name="body_type"
                  sx={CardTextField}
                  value={formData.body_type}
                  onChange={handleChange}
                />
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
                  sx={CardTextField}
                  value={formData.mileage_km}
                  onChange={handleChange}
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
                <TextField
                  name="gearbox"
                  sx={CardTextField}
                  value={formData.gearbox}
                  onChange={handleChange}
                />
              ) : (
                formData.gearbox
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Fuel:</TableCell>
            <TableCell>
              {isEditing ? (
                <TextField
                  name="fuel"
                  sx={CardTextField}
                  value={formData.fuel}
                  onChange={handleChange}
                />
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
                  sx={CardTextField}
                  value={formData.price_per_day}
                  onChange={handleChange}
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
                  sx={CardTextField}
                  value={formData.horse_power}
                  onChange={handleChange}
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
                  value={formData.engine_capacity}
                  onChange={handleChange}
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
                <TextField
                  name="purpose"
                  sx={CardTextField}
                  value={formData.purpose}
                  onChange={handleChange}
                />
              ) : (
                formData.purpose
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      {isEditing ? (
        <Button variant="contained" onClick={handleSave} sx={SaveEditButtonStyle}>
          Save
        </Button>
      ) : (
        <Button variant="contained" onClick={handleEdit}  sx={SaveEditButtonStyle}>
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
