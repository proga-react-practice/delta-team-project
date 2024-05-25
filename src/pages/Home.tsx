import { Typography, Box } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const ContainerHomeStyle = {
  display: "flex",
  width: "100%",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: '0 5% 0 5%'
};


const TypographyStyle = {
  marginBottom: '1%', 
};

function Home() {

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={ContainerHomeStyle}>
        <Typography variant={isSmallScreen ? "h5" : "h3"}  sx={{...TypographyStyle, fontWeight: isSmallScreen ? 'bold' : 'none'}}>About our project</Typography>
        <Typography variant="h6"  sx={TypographyStyle} >
          Our team is working on a car rental web project that aims to simplify the process of renting cars. 
        </Typography>
        <Typography variant={isSmallScreen ? "h5" : "h3"}  sx={{...TypographyStyle, fontWeight: isSmallScreen ? 'bold' : 'none'}}>Our Team</Typography>
        <Typography variant="h6"  sx={TypographyStyle}>
         Mykyta made the form for adding a car. Andrii made the form for renting a car. To connect these two forms, we used the react-router-dom library.
        </Typography>
    </Box>
  );
}

export default Home;