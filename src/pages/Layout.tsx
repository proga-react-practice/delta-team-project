import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { HOME, ABOUT, CARFORM, ORDERS, CARLIST } from '../constants'
import { useTheme } from '@mui/material/styles';
import Logo from '../icon/Logo';

function Layout({ darkMode, toggleDarkMode }: { darkMode: boolean, toggleDarkMode: () => void }) {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const theme = useTheme();

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
    
    const BurgerButtons = {
        display: 'flex',
        color: 'primary.light',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '5px',
        padding: '1%',
        width: '100%',
        '&:hover': {
            backgroundColor: "navbar.dark",
            color: "navbar.light",
        },
    };
    const drawerItems = (
        <List sx={{backgroundColor:"navbar.main", height:"100%",}}>
            <ListItem sx={{}} component={Link} to={HOME} onClick={handleDrawerToggle}>
                <ListItemText sx={BurgerButtons} primary="Main page" />
            </ListItem>
            <ListItem component={Link} to={ABOUT} onClick={handleDrawerToggle}>
                <ListItemText sx={BurgerButtons} primary="About Us" />
            </ListItem>
            <ListItem component={Link} to={CARFORM} onClick={handleDrawerToggle}>
                <ListItemText sx={BurgerButtons} primary="Add Car" />
            </ListItem>
            <ListItem component={Link} to={ORDERS} onClick={handleDrawerToggle}>
                <ListItemText sx={BurgerButtons} primary="Orders" />
            </ListItem>
            <ListItem component={Link} to={CARLIST} onClick={handleDrawerToggle}>
                <ListItemText sx={BurgerButtons} primary="Car List" />
            </ListItem>
        </List>
    );

    return (
        <>
            <AppBar position="static" sx={NavBar}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'primary.light' }}>
                        Delta <Logo color={theme.palette.primary.light} width={20} height={20} />
                    </Typography>
                    <Box sx={{ display: {lg: 'flex', md: 'flex', sm: 'flex', xs: 'none'}, justifyContent: 'end', flexGrow: 1 }}>
                        <Button sx={Buttons} color="inherit" component={Link} to={HOME}>Main page</Button>
                        <Button sx={Buttons} color="inherit" component={Link} to={ABOUT}>About Us</Button>
                        <Button sx={Buttons} color="inherit" component={Link} to={CARFORM}>Add Car</Button>
                        <Button sx={Buttons} color="inherit" component={Link} to={ORDERS}>Orders</Button>
                        <Button sx={Buttons} color="inherit" component={Link} to={CARLIST}>Car List</Button>
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
            <Box sx={{width: '25%'}}>
                <Drawer
                    anchor="left"
                    open={drawerOpen}
                    onClose={handleDrawerToggle}
                    sx={{ 
                        display: { xs: 'block', sm: 'none' }, 
                        color: 'navbar.main',
                        '& .MuiDrawer-paper': {
                            minWidth: '35%',
                        },
                    }}
                >
                    {drawerItems}
                </Drawer>
            </Box>
            <Outlet />
        </>
    );
}

export default Layout;