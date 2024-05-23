import { Typography, Box } from "@mui/material";

const ContainerHomeStyle = {
  display: "flex",
  width: "100%",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const TypographyStyle = {
  marginBottom: '1%', 
};

function Home() {

  return (
    <Box sx={ContainerHomeStyle}>
        <Typography variant="h2"  sx={TypographyStyle}>About our project</Typography>
        <Typography variant="h6"  sx={TypographyStyle} >
          Our team is working on a car rental web project that aims to simplify the process of renting cars. 
        </Typography>
        <Typography variant="h2"  sx={TypographyStyle}>Our Team</Typography>
        <Typography variant="h6"  sx={TypographyStyle}>
         Mykyta made the form for adding a car. Andrii made the form for renting a car. To connect these two forms, we used the react-router-dom library.
        </Typography>
    </Box>
  );
}

export default Home;