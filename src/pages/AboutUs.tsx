import { Typography, Box, Link } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { FaInstagram, FaTelegramPlane } from "react-icons/fa";

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
};

const CardContainer = {
  width: '100%',
  display: 'flex',
  flexDirection: { lg: 'row', md: 'row', sm: 'row', xs: 'column' },
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: { xs: '5%', lg: '0%', md: '0%', sm: '0%' },
  gap: '5%',
};

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
};

const TypographyStyle = {
  marginBottom: '1%', 
};

const InstagramStyle = {
  textAlign: 'center',
  marginBottom: '1%', 
  minWidth: '166px',
  borderRadius: '5px',
  padding: '0 2% 0 2%',
  height: '90%',
  background: 'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
};

const TelegramStyle = {
  textAlign: 'center',
  marginBottom: '1%', 
  minWidth: '166px',
  borderRadius: '5px',
  padding: '0 2% 0 2%',
  height: '90%',
  background: 'linear-gradient(45deg, #34a8eb 0%, #2c97d9 25%, #2376c7 50%, #1a56b5 75%, #1136a3 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
};

const InstagramIconStyle = {
  color: '#de475b',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
};

const TelegramIconStyle = {
  color: '#2f7eca',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
};

function AboutUs() {

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={ContainerHomeStyle}>
      <Typography variant={isSmallScreen ? "h5" : "h3"} sx={{ ...TypographyStyle, fontWeight: isSmallScreen ? 'bold' : 'none' }}>Our Team</Typography>
      <Typography variant="h6" sx={TypographyStyle}>
        Mykyta made the form for adding a car. Andrii made the form for renting a car. To connect these two forms, we used the react-router-dom library.
      </Typography>
      <Box sx={CardContainer}>
        <Box sx={Card}>
          <Box component={'img'} alt='Andrii' src="../../Andrii.jpg" sx={CardPhoto} />
          <Typography variant={isSmallScreen ? "h5" : "h4"} sx={TypographyStyle}>Andrii Vovk</Typography>
          <Typography variant={isSmallScreen ? "h6" : "h6"} sx={InstagramStyle}>
            <Link href='https://www.instagram.com/wolfie_andrii/#' style={{ textDecoration: 'none' }}>
              <FaInstagram style={InstagramIconStyle} /> @wolfie_andrii
            </Link>
          </Typography>
          <Typography variant={isSmallScreen ? "h6" : "h6"} sx={TelegramStyle}>
            <Link href='https://t.me/andrii_wolfie' style={{ textDecoration: 'none' }}>
              <FaTelegramPlane style={TelegramIconStyle} /> @andrii_wolfie
            </Link>
          </Typography>
        </Box>
        <Box sx={Card}>
          <Box component={'img'} alt='Mykyta' src="../../Mykyta.jpg" sx={CardPhoto} />
          <Typography variant={isSmallScreen ? "h5" : "h4"} sx={TypographyStyle}>Mykyta Nykytiuk</Typography>
          <Typography variant={isSmallScreen ? "h6" : "h6"} sx={InstagramStyle}>
            <Link href='https://www.instagram.com/_niknyk_/#' style={{ textDecoration: 'none' }}>
              <FaInstagram style={InstagramIconStyle} /> @_niknyk_
            </Link>
          </Typography>
          <Typography variant={isSmallScreen ? "h6" : "h6"} sx={TelegramStyle}>
            <Link href='https://t.me/niknyk' style={{ textDecoration: 'none' }}>
              <FaTelegramPlane style={TelegramIconStyle} /> @niknyk
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default AboutUs;