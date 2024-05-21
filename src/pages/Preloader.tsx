import React from 'react';
import { Box } from '@mui/material';
import { theme } from '../theme';

const Preloader: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 'auto',
        height: '60vh',
        marginTop: theme.spacing(15)
      }}
    >
      <video autoPlay loop muted style={{ width: '100%', height: '100%' }}>
        <source src="../../public/preloader.mp4" type="video/mp4" />
      </video>
    </Box>
  );
};

export default Preloader;
