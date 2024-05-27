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

const CardPhoto = {
    width: '90%',
    margin: '3% 0% 3%',
    borderRadius: '5%',
}

const CardContainer = {
    width: '100%',
    display: 'flex',
    flexDirection: {lg: 'row', md: 'row', sm: 'row', xs: 'column'},
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: {xs: '5%', lg: '0%', md: '0%', sm: '0%'},
    gap: '5%',
}

const Card = {
    display: "flex",
    borderRadius: '15px',
    justifyContent: "center",
    alignItems: "center",
    flexDirection: 'column',
    backgroundColor: 'secondary.main',
    width: '20%',
    minWidth: '260px',
    height: '100%',
}

const TypographyStyle = {
  marginBottom: '1%', 
};

function AboutUs() {

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
        <Box sx={CardContainer}>
            <Box sx={Card}>
                <Box component={'img'} alt='Andrii' src="/src/icon/Andrii.jpg" sx={CardPhoto} />
                <Typography variant={isSmallScreen ? "h5" : "h4"} sx={TypographyStyle}>Andrii Vovk</Typography>
            </Box>
            <Box sx={Card}>
                <Box component={'img'} alt='Mykyta' src="/src/icon/Mykyta.jpg" sx={CardPhoto} />
                <Typography variant={isSmallScreen ? "h5" : "h4"} sx={TypographyStyle}>Mykyta Nykytiuk</Typography>
            </Box>
        </Box>
    </Box>
  );
}

export default AboutUs;