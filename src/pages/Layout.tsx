import { Link, Outlet } from 'react-router-dom';
import {AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';

function Layout({ darkMode, toggleDarkMode }: { darkMode: boolean, toggleDarkMode: () => void }) {

    const NavBar = {
        width: '100%', 
        backgroundColor: "navbar.main", 
        boxShadow: '0 0 7px rgba(0,0,0,0.15)',
    }

    const Buttons = {
        '&:hover': {
            backgroundColor: "navbar.dark",
            color: "navbar.light",
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
                    <Button sx={Buttons} color="inherit" component={Link} to="/orders">Orders</Button>
                    <IconButton edge="end" color="inherit" onClick={toggleDarkMode}>
                        {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Outlet/>
        </>
    );
    }

export default Layout;