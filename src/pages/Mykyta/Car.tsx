import React from "react";
import Form from "./componets/Form/Form";
import Card from "./componets/Card/Card";
import { FormData } from "../../interfaces";
import { Box } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme";
import { CssBaseline } from "@mui/material";

function Car() {
  const [submittedData, setSubmittedData] = React.useState<FormData[]>([]);
  function handleSubmit(formData: FormData) {
    setSubmittedData([...submittedData, formData]);
  }

  function handleDelete(index: number) {
    const newData = [...submittedData];
    newData.splice(index, 1);
    setSubmittedData(newData);
  }

  const ContainerStyle = {
    display: "flex",
    flexDirection: { md: "row", sm: "column", xs: "column" },
    justifyContent: { md: "space-evenly", sm: "center", xs: "center"},
    marginTop: "2%",
    width: "100%",
    backgroundColor: "background.default",
  };

  const FormLayout = {
    display: "flex",
    width: {md: "35%",sm : "100%", xs : "100%"},
    marginBottom: "30px",
    justifyContent: {md: "flex-start",sm : "center", xs : "center"},
    alignItems:{sm : "flex-start", xs : "center"},
  };

  const CardLayout = {
    width: {md: "30%",sm : "100%", xs : "100%"},
    display: "flex",
    flexDirection: "column",
    justifyContent: {md: "flex-start",sm : "center", xs : "center"},
    alignItems:{sm : "center", xs : "center"},
  }; 


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={ContainerStyle}>
        <Box sx={FormLayout}>
          <Form onSubmit={handleSubmit} />
        </Box>
        <Box sx={CardLayout}>
          {submittedData.map((data, index) => (
            <Card
              key={index}
              data={data}
              onDelete={() => handleDelete(index)}
            />
          ))}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Car;
