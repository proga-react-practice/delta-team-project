import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';

function Layout({ darkMode, toggleDarkMode }: { darkMode: boolean, toggleDarkMode: () => void }) {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const NavBar = {
        width: '100%', 
        backgroundColor: "navbar.main", 
        boxShadow: '0 0 7px rgba(0,0,0,0.15)',
    };

    const Buttons = {
        color: 'primary.light',
        '&:hover': {
            backgroundColor: "navbar.dark",
            color: "navbar.light",
        },
    };

    const drawerItems = (
        <List sx={{backgroundColor:"secondary.main", height:"100%"}}>
            <ListItem component={Link} to="/" onClick={handleDrawerToggle}>
                <ListItemText primary="Main page" />
            </ListItem>
            <ListItem component={Link} to="/about-us" onClick={handleDrawerToggle}>
                <ListItemText primary="About Us" />
            </ListItem>
            <ListItem component={Link} to="/adding-car-form" onClick={handleDrawerToggle}>
                <ListItemText primary="Add Car" />
            </ListItem>
            <ListItem component={Link} to="/orders" onClick={handleDrawerToggle}>
                <ListItemText primary="Orders" />
            </ListItem>
            <ListItem component={Link} to="/car-list" onClick={handleDrawerToggle}>
                <ListItemText primary="Car List" />
            </ListItem>
        </List>
    );

    return (
        <>
            <AppBar position="static" sx={NavBar}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'primary.light' }}>
                        Delta
                    </Typography>
                    <Box sx={{ display: {lg: 'flex', md: 'flex', sm: 'flex', xs: 'none'}, justifyContent: 'end', flexGrow: 1 }}>
                        <Button sx={Buttons} color="inherit" component={Link} to="/">Main page</Button>
                        <Button sx={Buttons} color="inherit" component={Link} to="/about-us">About Us</Button>
                        <Button sx={Buttons} color="inherit" component={Link} to="/adding-car-form">Add Car</Button>
                        <Button sx={Buttons} color="inherit" component={Link} to="/orders">Orders</Button>
                        <Button sx={Buttons} color="inherit" component={Link} to="/car-list">Car List</Button>
                    </Box>
                    <IconButton
                        color="inherit"
                        edge="end"
                        sx={{ display: { xs: 'block', sm: 'none' } }}
                        onClick={handleDrawerToggle}
                    >
                        <MenuIcon />
                    </IconButton>
                    <IconButton
                        color="inherit"
                        edge="end"
                        onClick={toggleDarkMode}
                        sx={{ ml: { xs: 1, sm: 0 } }}
                    >
                        {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={handleDrawerToggle}
                sx={{ display: { xs: 'block', sm: 'none' }, color: 'secondary.main', }}
            >
                {drawerItems}
            </Drawer>
            <Outlet />
        </>
    );
}

export default Layout;
