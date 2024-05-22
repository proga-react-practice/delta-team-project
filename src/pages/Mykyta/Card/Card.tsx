import React, { useEffect, useState } from "react";
import { FormData } from "../../../interfaces";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Box,
} from "@mui/material";
import { useForm} from "react-hook-form";


type CardProps = {
  data: FormData;
  index: number;
};

const TableContainerStyle = {
  border: "none",
  maxWidth: { md: "400px", sm: "300px", xs: "300px" },
  minWidth: { md: "250px", sm: "100px", xs: "100px" },
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

const TableRowDataStyle = {
  textAlign: "center"
}

const Card: React.FC<CardProps> = ({
  data,
}) => {
  const {
  } = useForm<FormData>({
    defaultValues: data,
    mode: "onChange",
  });

  const [imageURL, setImageURL] = useState<string | null>(null);

  useEffect(() => {
    if (data.auto_photo instanceof File) {
      const url = URL.createObjectURL(data.auto_photo);
      setImageURL(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setImageURL(null);
    }
  }, [data.auto_photo]);

  return (
    <Box>
      <TableContainer sx={TableContainerStyle}>
        <Table aria-label="a dense table" size="small">
          <TableBody>
            <TableRow>
              <TableCell sx={TableRowDataStyle}>
                {imageURL ? (
                  <img src={imageURL} alt="Car" style={{ width: "300px", height: '180px', borderRadius: '5px' }} />
                ) : (
                  "No Image"
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={TableRowDataStyle}>
                  {data.brand + " " + data.model + " " + data.price_per_day + "$"}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Card;
