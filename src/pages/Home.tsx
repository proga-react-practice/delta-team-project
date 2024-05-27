import { Link } from 'react-router-dom';
import { Typography, Box, Button, useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import carImage from '../icon/cars.png';

const ContainerHomeStyle = {
  display: "flex",
  width: "100%",
  flexDirection: {xs: 'column', lg: "row"},
  justifyContent: "center",
  alignItems: "center",
  textAlign: 'center',
  marginTop: '5%'
};

const TypographyStyle = {
  marginBottom: '1%', 
};

const RentButtonStyle = {
  margin: '10px',
  padding: '10px 20px',
  fontSize: '16px',
  fontWeight: 'bold',
  border: '0',
  color: 'text.primary',
  backgroundColor: 'info.dark',
  '&:hover': {
    backgroundColor: 'text.primary',
    color: 'info.dark',
  }
};

const AddButtonStyle = {
  margin: '10px',
  padding: '10px 20px',
  fontSize: '16px',
  fontWeight: 'bold',
  border: '0',
  color: 'text.primary',
  backgroundColor: 'success.dark',
  '&:hover': {
    backgroundColor: 'text.primary',
    color: 'success.dark',
  }
};

const carImageStyle = {
  width: {lg: '560px', md: '480px', sm: '370px', xs: '280px'},
  height: 'auto',
  marginTop: '20px',
};

const HomeStyle = {
  width: {lg: '50%', xs: '90%'},
}

const ImageStyle = {
  width: {lg: '45%', xs: '90%'},
}

function Home() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={ContainerHomeStyle}>
      <Box sx={HomeStyle}>
        <Typography variant={isSmallScreen ? "h5" : "h3"}  sx={{...TypographyStyle, fontWeight: 'bold'}}>
          Welcome To Delta Team Project
        </Typography>
        <Typography variant={isSmallScreen ? "h4" : "h2"}  sx={{...TypographyStyle, fontWeight: 'bold'}}>
          Rent The Best Quality Cars With Us
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: '2%' }}>
          Pellentesque a massa at lorem tincidunt efficitur fringilla eget mauris. Maecenas finibus dignissim varius. Fusce vitae ipsum dignissim, molestie arcu sit amet, dictum urna aenean eu elementum diam, vitae vulputate dui.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to='/car-list'>
            <Button variant="contained" sx={RentButtonStyle}>
              Book Your Ride
            </Button>
          </Link>
          <Link to='/adding-car-form'>
            <Button variant="contained" sx={AddButtonStyle}>
              Add Your Car
            </Button>
          </Link>
        </Box>
      </Box>
      <Box sx={ImageStyle}>
        <Box component="img" src={carImage} alt="Car" sx={carImageStyle} />
      </Box>
    </Box>
  );
}

export default Home;