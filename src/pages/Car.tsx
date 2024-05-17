import Form from "./Mykyta/componets/Form/Form";
import Card from "./Mykyta/componets/Card/Card";
import { CarGroup, FormData } from "../interfaces";
import { Box } from "@mui/material";
import { useFieldArray, useForm } from "react-hook-form";
import { useState } from "react";

function Car() {
  const { control } = useForm<CarGroup>();
  const { fields, append, update, remove } = useFieldArray({
    control,
    name: "cars",
  });

  const [editingCardIndex, setEditingCardIndex] = useState<number | null>(null);

  const handleEditClick = (index: number) => {
    // console.log("EDITING INDEX", index);
    setEditingCardIndex(index);
  };

  function handleAddNewCar(formData: FormData) {
    append(formData);
  }

  const handleDelete = (index: number) => {
    remove(index);
  };

  const handleSave = (index: number, data: FormData) => {
    update(index, data);
    setEditingCardIndex(null);
  };

  const ContainerStyle = {
    display: "flex",
    flexDirection: { md: "row", sm: "column", xs: "column" },
    justifyContent: { md: "space-evenly", sm: "center", xs: "center" },
    marginTop: "2%",
    width: "100%",
    backgroundColor: "background.default",
  };

  const FormLayout = {
    display: "flex",
    width: { md: "35%", sm: "100%", xs: "100%" },
    marginBottom: "30px",
    justifyContent: { md: "flex-start", sm: "center", xs: "center" },
    alignItems: { sm: "flex-start", xs: "center" },
  };

  const CardLayout = {
    width: { md: "30%", sm: "100%", xs: "100%" },
    display: "flex",
    flexDirection: "column",
    justifyContent: { md: "flex-start", sm: "center", xs: "center" },
    alignItems: { sm: "center", xs: "center" },
  };

  return (
      <Box sx={ContainerStyle}>
        <Box sx={FormLayout}>
          <Form onSubmit={handleAddNewCar} />
        </Box>
        <Box sx={CardLayout}>
          {fields.map((data, index) => (
            <Card
              key={index}
              data={data}
              onDelete={handleDelete}
              onSave={(data) => handleSave(index, data)}
              index={index}
              onEdit={handleEditClick}
              isEditing={index === editingCardIndex}
            />
          ))}
        </Box>
      </Box>
  );
}

export default Car;
