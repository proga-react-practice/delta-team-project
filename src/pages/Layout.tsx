import { Link, Outlet } from 'react-router-dom';
import {AppBar, Toolbar, Typography, Button } from '@mui/material';

function Layout() {
return (
    <>
        <AppBar position="static" sx={{ width: '100%' }} >
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    My App
                </Typography>
                <Button color="inherit" component={Link} to="/">Main page</Button>
                <Button color="inherit" component={Link} to="/rent-car-form">Rent Car</Button>
                <Button color="inherit" component={Link} to="/adding-car-form">Add Car</Button>
            </Toolbar>
        </AppBar>
        <Outlet/>
    </>
);
}

export default Layout;