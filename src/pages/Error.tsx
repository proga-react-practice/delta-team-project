import React from 'react';
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { StyledButtonEdit } from './Andrii/styledComponents/StyledButtonEdit';
import { Link } from 'react-router-dom';

const Error: React.FC = () => {
    return (
        <Container sx={{width:"100%" , display:"flex" , flexDirection:"column", alignItems: "center"}}>
            <Typography variant="h1" component="h2" gutterBottom>
                Error 404
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom>
                {'This path is incorrect. Please, go back to the main page.'}
            </Typography>
            <Link to="/">
                <StyledButtonEdit>Go to main page</StyledButtonEdit>
            </Link>
        </Container>
    );
}

export default Error;