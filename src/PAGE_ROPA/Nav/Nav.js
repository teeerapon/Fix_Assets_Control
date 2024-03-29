import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Outlet, useNavigate } from "react-router";
import swal from 'sweetalert';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import TypeSpecimenIcon from '@mui/icons-material/TypeSpecimen';
import '../../App.css'
import config from '../../config'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));

async function ChackUserWeb(credentials) {
  return fetch(config.http + '/ChackUserWeb', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}



export default function MenuAppBar({ drawerWidth, AppBar, DrawerHeader, theme, open, handleDrawerOpen, handleDrawerClose }) {
  const classes = useStyles();
  const [auth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const data = JSON.parse(localStorage.getItem('data'));
  const [checkUserWeb, setCheckUserWeb] = React.useState();
  const navigate = useNavigate();

  const fetchCheckUser = async () => {
    const usercode = data.UserCode;
    const response = await ChackUserWeb({
      usercode
    });
    if ('data' in response) {
      setCheckUserWeb(response.data[0].approverid)
    }
  }

  React.useEffect(() => {
    fetchCheckUser();
  });

  function HomePage() {
    if (checkUserWeb === 'admin') {
      navigate('/DATA_CENTER')
    } else {
      navigate('/')
    }
  };

  const handleLogout = () => {
    swal("ออกจากระบบสำเร็จ", "คุณได้ออกจากระบบแล้ว", "success", {
      buttons: false,
      timer: 1500,
    })
      .then((value) => {
        localStorage.removeItem("token");
        localStorage.removeItem("data");
        localStorage.removeItem("permission");
        localStorage.removeItem("Allaseets");
        localStorage.removeItem("aseetsCounted");
        localStorage.removeItem("assetsWrong");
        localStorage.removeItem("DataCreatePeriod");
        localStorage.removeItem("NacCode");
        navigate('/')
      });
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const darkTheme = createTheme({
    palette: {
      type: 'dark', // Set the theme to dark mode
      primary: {
        main: '#1c2536' // Set the primary color to blue
      }
    }
  })

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <ThemeProvider theme={darkTheme}>
          <AppBar position="static" open={open} >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ mr: 2, ...(open && { display: 'none' }) }}
              >
                <MenuIcon />
              </IconButton>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} style={{ height: 80 }}>
                <Button onClick={HomePage} sx={{ my: 2, color: 'white', display: 'block' }}>
                  <div size="large" aria-label="account of current user" aria-controls="menu-appbar">
                    <Typography
                      style={{ color: '#ea0c80' }}
                      variant="h5"
                      component="React.Fragment"
                      
                      sx={{
                        flexGrow: 1,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.5rem',
                        color: 'inherit',
                        textDecoration: 'none',
                      }}
                      className={classes.root}
                    >
                      <b>DATA</b>
                    </Typography>
                    <Typography
                      style={{ color: '#07519e' }}
                      variant="h5"
                      component="React.Fragment"
                      
                      sx={{
                        flexGrow: 1,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.5rem',
                        color: 'inherit',
                        textDecoration: 'none',
                      }}
                      className={classes.root}
                    >
                      CENTER
                    </Typography>
                  </div>
                </Button>
              </Box>
              <div size="large" aria-label="account of current user" aria-controls="menu-appbar">
                <Typography variant="h6" component="React.Fragment" sx={{ flexGrow: 1 }} className={classes.root} >
                  {data.name}
                </Typography>
              </div>
              {auth && (
                <React.Fragment>
                  <Box sx={{ flexGrow: 0 }}>
                    <IconButton
                      size="large"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleMenu}
                      color="inherit"
                    >

                      <AccountCircle />
                    </IconButton>
                    <Menu
                      sx={{ mt: '45px' }}
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={handleClose}>Profile</MenuItem>
                      <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                    </Menu>
                  </Box>
                </React.Fragment>
              )}
            </Toolbar>
          </AppBar>
          <Drawer
            sx={{
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
              },
            }}
            variant="persistent"
            anchor="left"
            open={open}
          >
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? <CloseIcon fontSize="small" /> : <CloseIcon />}
              </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
              <ListItem disablePadding>
                <ListItemButton onClick={() => navigate('/PERSON_ROPA')}>
                  <ListItemIcon><AdminPanelSettingsIcon fontSize="small" /></ListItemIcon>
                  <ListItemText>
                    <Typography
                      component="span"
                      variant="caption"
                    >
                      ประเภทข้อมูลส่วนบุคคล
                    </Typography>
                  </ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon><TypeSpecimenIcon fontSize="small" /></ListItemIcon>
                  <ListItemText>
                    <Typography
                      component="span"
                      variant="caption"
                    >
                      ประเภทของข้อมูล
                    </Typography>
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            </List>
            <Divider />
          </Drawer>
          <Outlet />
        </ThemeProvider>
      </Box >
    </>
  );

}