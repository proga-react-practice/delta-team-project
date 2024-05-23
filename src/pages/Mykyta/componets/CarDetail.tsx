import React from "react";
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { FormData } from "../../../interfaces";
import { BsFillFuelPumpFill} from "react-icons/bs";
import { FaCarSide } from "react-icons/fa6";
import { GiHorseHead } from "react-icons/gi";
import { BiTask } from "react-icons/bi";
import { TbManualGearbox } from "react-icons/tb";
import { IoMdSpeedometer } from "react-icons/io";
import { TbEngine } from "react-icons/tb";
import { MdFactory } from "react-icons/md";

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
  alignItems: "center",
  width: "100%",
};

const InfoContainerStyle = {
  width: "50%",
  marginLeft: "5%",
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

const CarDetail: React.FC<CardProps> = ({
  data,
  onDelete,
  index,
  onSave,
  onEdit,
  isEditing,
}) => {
  const { handleSubmit, control, formState: { errors } } = useForm<FormData>({
    defaultValues: data,
    mode: "onChange",
  });

  const onSubmit = (data: FormData) => {
    isEditing ? onSave(data) : onEdit(index);
  };
  
  const carImage = data.auto_photo ? URL.createObjectURL(data.auto_photo) : '';

  const InfoTableCellStyle = {
    marginLeft: "5%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "50%",
  }

  const IconSize = 25;

  return (
    <Box sx={TableContainerStyle}>
      <Box sx={InfoPhotoContainer}>
        <Box sx={ImageContainerStyle}>
          {carImage && <img src={carImage} alt={`${data.brand} ${data.model}`} style={ImageStyle} />}
        </Box>
        <Box sx={InfoContainerStyle}>
          <Typography variant="h3">{data.brand} {data.model}</Typography>
          <Typography variant="h5">{data.year}</Typography>
          <Typography variant="h5" sx={PriceStyle}>${data.price_per_day}/Day</Typography>
          <Button variant="contained" color="primary" sx={ButtonStyle}>Book Your Ride</Button>
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
    </Box>
  );
};

export default CarDetail;
