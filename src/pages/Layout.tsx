import { Link, Outlet } from 'react-router-dom';
import {AppBar, Toolbar, Typography, Button } from '@mui/material';

function Layout() {

    const NavBar = {
        width: '100%', 
        backgroundColor: '#c19f7b', 
        boxShadow: '0 0 7px rgba(0,0,0,0.15)',
    }

    const Buttons = {
        '&:hover': {
            backgroundColor: '#d3c5b6',
            color: '#5d3f1f',
        },
    }

    return (
        <>
            <AppBar position="static" sx={NavBar} >
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Delta
                    </Typography>
                    <Button sx={Buttons} color="inherit" component={Link} to="/">Main page</Button>
                    <Button sx={Buttons} color="inherit" component={Link} to="/rent-car-form">Rent Car</Button>
                    <Button sx={Buttons} color="inherit" component={Link} to="/adding-car-form">Add Car</Button>
                </Toolbar>
            </AppBar>
            <Outlet/>
        </>
    );
    }

export default Layout;