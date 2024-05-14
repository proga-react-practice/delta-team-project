import React from 'react';
import { ThemeProvider} from '@mui/material'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { useTheme } from '@mui/material/styles';


const Error: React.FC = () => {
    const theme = useTheme();
    return (
        <ThemeProvider theme={theme}>
            <Container sx={{width:"100%" , display:"flex" , flexDirection:"column", alignItems: "center"}}>
                <Typography variant="h1" component="h2" gutterBottom>
                    Error 404
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom>
                    {'This path is incorrect. Please, go back to the main page.'}
                </Typography>
            </Container>
        </ThemeProvider>
    );
}

export default Error;