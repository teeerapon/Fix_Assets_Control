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
import CircleIcon from '@mui/icons-material/Circle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ViewTimelineIcon from '@mui/icons-material/AlignVerticalBottom';
import SubjectIcon from '@mui/icons-material/ViewTimeline';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import Avatar from '@mui/material/Avatar';
import StoreIcon from '@mui/icons-material/Store';
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import Axios from "axios"
import '../../App.css'
import config from '../../config'

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: 'rgba(234,234,234,1)',
      fontSize: `14px`,
      color: 'rgba(0,0,0,1)'
    },
    children: (name.includes('PTEC')) === true ? `${name.split('C')[1]}` : `${name}`,
  };
}

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



export default function Account_BrnachAssets({ drawerWidth, AppBar, DrawerHeader, theme, open, handleDrawerOpen, handleDrawerClose }) {
  const classes = useStyles();
  const [auth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const data = JSON.parse(localStorage.getItem('data'));
  const checkUserWeb = localStorage.getItem('sucurity');
  const [openList, setOpenList] = React.useState(false);
  const [openList2, setOpenList2] = React.useState(false);
  const [openList3, setOpenList3] = React.useState(false);
  const [openList4, setOpenList4] = React.useState(false);
  const [openList5, setOpenList5] = React.useState(false);
  const navigate = useNavigate();
  const [permission_menuID, setPermission_menuID] = React.useState();
  const [permission_menu, setPermission_menu] = React.useState();

  React.useEffect(() => {
    // POST request using axios with set headers
    const body = { Permission_TypeID: 1, userID: data.userid }
    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };
    Axios.post(config.http + '/select_Permission_Menu_NAC', body, { headers })
      .then(response => {
        setPermission_menuID(response.data.data.map((res) => res.Permission_MenuID))
        setPermission_menu(response.data.data)
      });
  }, []);


  const handleClickList = (e, index) => {
    setOpenList(!openList);
    setOpenList2(false)
    setOpenList3(false)
    setOpenList4(false)
    setOpenList5(false);
  };

  const handleClickList2 = (e, index) => {
    setOpenList2(!openList2);
    setOpenList(false);
    setOpenList3(false)
    setOpenList4(false)
    setOpenList5(false);
  };

  const handleClickList3 = (e, index) => {
    setOpenList3(!openList3);
    setOpenList(false);
    setOpenList2(false);
    setOpenList4(false);
    setOpenList5(false);
  };

  const handleClickList4 = (e, index) => {
    setOpenList4(!openList4);
    setOpenList(false);
    setOpenList2(false);
    setOpenList3(false);
    setOpenList5(false);
  };

  const handleClickList5 = (e, index) => {
    setOpenList5(!openList5);
    setOpenList(false);
    setOpenList2(false);
    setOpenList3(false);
    setOpenList4(false);
  };

  function PeriodOpen() {
    navigate('/CreatePeriod')
  };

  function HomePage() {
    if (checkUserWeb === 'admin') {
      navigate('/DATA_CENTER')
    } else {
      navigate('/')
    }
  };

  function handle_Home() {
    navigate('/')
  }

  function PeriodEdit() {
    navigate('/EditPeriod')
  };

  function Transection_List() {
    navigate('/TransectionList')
  };

  function Account_BrnachAssets() {
    navigate('/Account_BrnachAssets')
  };

  function REPORT() {
    navigate('/Report')
  };

  function BSAssetsMain() {
    navigate('/BSAssetsMain')
  };

  function BpcStatus() {
    navigate('/BpcStatus')
  }

  function REPORT_ALL() {
    navigate('/Reported_Assets_Counted')
  };

  function History_of_Assets() {
    navigate('/History_of_Assets')
  };

  function FETCH_ASSETS() {
    navigate('/FETCH_ASSETS')
  };

  function NAC_NAC() {
    navigate('/NAC_CREATE_MAIN1')
  };

  function eBook_branch() {
    navigate('/EBookBranch')
  }

  function eBook_main() {
    navigate('/EBookMain')
  }

  function NAC_NEW() {
    navigate('/NAC_CREATE_STEP1')
  };

  function NAC_CHANGE() {
    navigate('/NAC_CHANGE_STEP1')
  }

  function NAC_DELETE() {
    navigate('/NAC_DELETE_STEP1')
  }

  function NAC_SEALS() {
    navigate('/NAC_SEALS_STEP1')
  }

  function DOC_NAC_ME() {
    localStorage.removeItem("pagination");
    navigate('/NAC_ROW')
  }

  function NAC_OPERATOR() {
    localStorage.removeItem("pagination_user");
    navigate('/NAC_OPERATOR')
  }

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
        localStorage.removeItem("pagination");
        localStorage.removeItem("pagination_user");
        localStorage.removeItem("filterModel");
        localStorage.removeItem("filterModel_user");
        localStorage.removeItem("filterNAC");
        localStorage.removeItem("filterNAC_user");
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
      mode: 'dark',
      primary: {
        main: '#1976d2',
      },
    },
  });

  if (permission_menu && data.branchid === 901) {
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
                <Box sx={{ flexGrow: 1, display: { md: 'flex' } }}>
                  <Button onClick={HomePage} sx={{ my: 2, color: 'white', display: 'block' }}>
                    <div size="small" aria-label="account of current user" aria-controls="menu-appbar">
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
                <div size="large" aria-label="account of current user" aria-controls="menu-appbar" className='hide-sm'>
                  <Typography variant="h6" component="React.Fragment" sx={{ flexGrow: 1, pr: 2 }} className={classes.root} >
                    {data.name}
                  </Typography>
                </div>
                {auth && (
                  <React.Fragment>
                    <Box sx={{ flexGrow: 0 }}>
                      <IconButton
                        size="small"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                      >

                        <Avatar sx={{ width: 18, height: 18 }}{...stringAvatar(data.UserCode)} />
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
                {/* <div size="large" aria-label="account of current user" aria-controls="menu-appbar">
                  <Typography variant="h6" component="React.Fragment" sx={{ flexGrow: 1 }} className={classes.root} >
                    {checkUserWeb === 'admin' ? 'ADMIN' : checkUserWeb === 'OPERATOR II' ? 'operatorII' : 'OPERATOR I'}
                  </Typography>
                </div> */}
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
                  <ListItemButton onClick={handle_Home}>
                    <ListItemIcon><DashboardIcon fontSize="small" /></ListItemIcon>
                    <ListItemText>
                      <Typography
                        component="span"
                        variant="caption"
                      >
                        HOMEPAGE
                      </Typography>
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton onClick={handleClickList2}>
                    <ListItemIcon><LibraryAddIcon fontSize="small" /></ListItemIcon>
                    <ListItemText>
                      <Typography
                        component="span"
                        variant="caption"
                      >
                        CREATE NAC
                      </Typography>
                    </ListItemText>
                    {openList2 ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                </ListItem>
                <Collapse in={openList2} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {(permission_menuID ? permission_menuID.includes(1) : null) === true ?
                      <React.Fragment>
                        <ListItemButton onClick={NAC_NEW}>
                          <ListItemText>
                            <Typography
                              sx={{ display: 'inline' }}
                              component="span"
                              variant="caption"
                            >
                              <CircleIcon sx={{ fontSize: 8, mr: 1 }} />&nbsp; เพิ่มบัญชีทรัพย์สิน
                            </Typography>
                          </ListItemText>
                        </ListItemButton>
                      </React.Fragment>
                      : null}
                    <ListItemButton onClick={NAC_NAC}>
                      <ListItemText>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="caption"
                        >
                          <CircleIcon sx={{ fontSize: 8, mr: 1 }} />&nbsp; โยกย้ายทรัพย์สิน
                        </Typography>
                      </ListItemText>
                    </ListItemButton>
                    <ListItemButton onClick={NAC_CHANGE}>
                      <ListItemText>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="caption"
                        >
                          <CircleIcon sx={{ fontSize: 8, mr: 1 }} />&nbsp; เปลี่ยนแปลงรายละเอียดทรัพย์สิน
                        </Typography>
                      </ListItemText>
                    </ListItemButton>
                    <ListItemButton onClick={NAC_SEALS}>
                      <ListItemText>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="caption"
                        >
                          <CircleIcon sx={{ fontSize: 8, mr: 1 }} />&nbsp; ขายทรัพย์สิน
                        </Typography>
                      </ListItemText>
                    </ListItemButton>
                    <ListItemButton onClick={NAC_DELETE}>
                      <ListItemText>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="caption"
                        >
                          <CircleIcon sx={{ fontSize: 8, mr: 1 }} />&nbsp; ตัดบัญชีทรัพย์สิน
                        </Typography>
                      </ListItemText>
                    </ListItemButton>
                  </List>
                </Collapse>
                <ListItem disablePadding>
                  <ListItemButton onClick={handleClickList}>
                    <ListItemIcon><SubjectIcon fontSize="small" /></ListItemIcon>
                    <ListItemText>
                      <Typography
                        component="span"
                        variant="caption"
                      >
                        NAC
                      </Typography>
                    </ListItemText>
                    {openList ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                </ListItem>
                <Collapse in={openList} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton onClick={DOC_NAC_ME}>
                      <ListItemText>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="caption"
                        >
                          <CircleIcon sx={{ fontSize: 8, mr: 1 }} />&nbsp; สถานะรายการ NAC
                        </Typography>
                      </ListItemText>
                    </ListItemButton>
                    {(permission_menuID ? permission_menuID.includes(2) : null) === true ?
                      <ListItemButton onClick={NAC_OPERATOR}>
                        <ListItemText>
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="caption"
                          >
                            <CircleIcon sx={{ fontSize: 8, mr: 1 }} />&nbsp; สถานะรายการ NAC ทั้งหมด
                          </Typography>
                        </ListItemText>
                      </ListItemButton>
                      : null}
                  </List>
                </Collapse>
                {(permission_menuID ? permission_menuID.includes(3 || 4) : null) === true ?
                  <ListItem disablePadding>
                    <ListItemButton onClick={handleClickList3}>
                      <ListItemIcon><AccessAlarmIcon fontSize="small" /></ListItemIcon>
                      <ListItemText>
                        <Typography
                          component="span"
                          variant="caption"
                        >
                          PERIOD
                        </Typography>
                      </ListItemText>
                      {openList3 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                  </ListItem>
                  : null}
                <Collapse in={openList3} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {(permission_menuID ? permission_menuID.includes(3) : null) === true ?
                      <ListItemButton onClick={PeriodOpen}>
                        <ListItemText>
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="caption"
                          >
                            <CircleIcon sx={{ fontSize: 8, mr: 1 }} />&nbsp; เพิ่มรอบตรวจนับ
                          </Typography>
                        </ListItemText>
                      </ListItemButton>
                      : null}
                    {(permission_menuID ? permission_menuID.includes(4) : null) === true ?
                      <ListItemButton onClick={PeriodEdit}>
                        <ListItemText>
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="caption"
                          >
                            <CircleIcon sx={{ fontSize: 8, mr: 1 }} />&nbsp; แก้ไขรอบตรวจนับ
                          </Typography>
                        </ListItemText>
                      </ListItemButton>
                      : null}
                  </List>
                </Collapse>
                <ListItem disablePadding>
                  <ListItemButton onClick={handleClickList4}>
                    <ListItemIcon><WorkHistoryIcon fontSize="small" /></ListItemIcon>
                    <ListItemText>
                      <Typography
                        component="span"
                        variant="caption"
                      >
                        REPORT
                      </Typography>
                    </ListItemText>
                    {openList4 ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                </ListItem>
                <Collapse in={openList4} timeout="auto" unmountOnExit>
                  {(permission_menuID ? permission_menuID.includes(5) : null) === true ?
                    <React.Fragment>
                      <List component="div" disablePadding>
                        <ListItemButton onClick={eBook_main}>
                          <ListItemText>
                            <Typography
                              sx={{ display: 'inline' }}
                              component="span"
                              variant="caption"
                            >
                              <CircleIcon sx={{ fontSize: 8, mr: 1 }} />&nbsp; E-Book NAC
                            </Typography>
                          </ListItemText>
                        </ListItemButton>
                      </List>
                      <List component="div" disablePadding>
                        <ListItemButton onClick={FETCH_ASSETS}>
                          <ListItemText>
                            <Typography
                              sx={{ display: 'inline' }}
                              component="span"
                              variant="caption"
                            >
                              <CircleIcon sx={{ fontSize: 8, mr: 1 }} />&nbsp; ทะเบียนทรัพย์สินทั้งหมด
                            </Typography>
                          </ListItemText>
                        </ListItemButton>
                      </List>
                    </React.Fragment>
                    : null}
                  {(permission_menuID ? permission_menuID.includes(7) : null) === true ?
                    <List component="div" disablePadding>
                      <ListItemButton onClick={REPORT_ALL}>
                        <ListItemText>
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="caption"
                          >
                            <CircleIcon sx={{ fontSize: 8, mr: 1 }} />&nbsp; ตรวจนับทรัพย์สินทั้งหมด
                          </Typography>
                        </ListItemText>
                      </ListItemButton>
                    </List>
                    : null}
                  <List component="div" disablePadding>
                    <ListItemButton onClick={REPORT}>
                      <ListItemText>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="caption"
                        >
                          <CircleIcon sx={{ fontSize: 8, mr: 1 }} />&nbsp; ตรวจนับทรัพย์สิน 1 สาขา
                        </Typography>
                      </ListItemText>
                    </ListItemButton>
                  </List>
                  {(permission_menuID ? permission_menuID.includes(8) : null) === true ?
                    <List component="div" disablePadding>
                      <ListItemButton onClick={History_of_Assets}>
                        <ListItemText>
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="caption"
                          >
                            <CircleIcon sx={{ fontSize: 8, mr: 1 }} />&nbsp; ประวัติทรัพย์สิน
                          </Typography>
                        </ListItemText>
                      </ListItemButton>
                    </List>
                    : null}
                </Collapse>
                {(permission_menuID ? permission_menuID.includes(13) : null) === true ?
                  <ListItem disablePadding>
                    <ListItemButton onClick={handleClickList5}>
                      <ListItemIcon><DomainAddIcon fontSize="small" /></ListItemIcon>
                      <ListItemText>
                        <Typography
                          component="span"
                          variant="caption"
                        >
                          BPC
                        </Typography>
                      </ListItemText>
                      {openList3 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                  </ListItem>
                  : null}
                <Collapse in={openList5} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton onClick={BSAssetsMain}>
                      <ListItemText>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="caption"
                        >
                          <CircleIcon sx={{ fontSize: 8, mr: 1 }} />&nbsp; E-Book BPC
                        </Typography>
                      </ListItemText>
                    </ListItemButton>
                    <ListItemButton onClick={BpcStatus}>
                      <ListItemText>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="caption"
                        >
                          <CircleIcon sx={{ fontSize: 8, mr: 1 }} />&nbsp; สถานะรายการทรัพย์สินผู้ร่วม
                        </Typography>
                      </ListItemText>
                    </ListItemButton>
                    <ListItemButton onClick={Transection_List}>
                      <ListItemText>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="caption"
                        >
                          <CircleIcon sx={{ fontSize: 8, mr: 1 }} />&nbsp; ประวัติการดำเนินการทรัพย์สินผู้ร่วม
                        </Typography>
                      </ListItemText>
                    </ListItemButton>
                  </List>
                </Collapse>
                {/* <ListItem disablePadding>
                  <ListItemButton onClick={REPORT}>
                    <ListItemIcon><ViewTimelineIcon fontSize="small" /></ListItemIcon>
                    <ListItemText>
                      <Typography
                        component="span"
                        variant="caption"
                      >
                        REPORT
                      </Typography>
                    </ListItemText>
                  </ListItemButton>
                </ListItem> */}
              </List>
              <Divider />
            </Drawer>
            <Outlet />
          </ThemeProvider>
        </Box >
      </>
    );
  } else {
    return (
      <>
        <Box sx={{ display: 'flex' }}>
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
                <Box sx={{ flexGrow: 1, display: { md: 'flex' } }} className='hide-sm'>
                  <Button disabled={checkUserWeb === 'admin' ? false : true} onClick={HomePage} sx={{ my: 2, color: 'white', display: 'block' }}>
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
                <div size="large" aria-label="account of current user" aria-controls="menu-appbar" className='hide-sm'>
                  <Typography variant="h6" component="React.Fragment" sx={{ flexGrow: 1, pr: 2 }} className={classes.root} >
                    {data.name}
                  </Typography>
                </div>
                {auth && (
                  <React.Fragment>
                    <Box sx={{ flexGrow: 0 }}>
                      <IconButton
                        size="small"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                      >

                        <Avatar sx={{ width: 18, height: 18 }}{...stringAvatar(data.UserCode)} />
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
                {/* <div size="large" aria-label="account of current user" aria-controls="menu-appbar">
                  <Typography variant="h6" component="React.Fragment" sx={{ flexGrow: 1 }} className={classes.root} >
                    USER
                  </Typography>
                </div> */}
              </Toolbar>
            </AppBar>
            <Drawer
              sx={{
                // width: drawerWidth,
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
                  {theme.direction === 'ltr' ? <CloseIcon /> : <CloseIcon />}
                </IconButton>
              </DrawerHeader>
              <Divider />
              <List>
                <ListItem disablePadding>
                  <ListItemButton onClick={handle_Home}>
                    <ListItemIcon><DashboardIcon fontSize="small" /></ListItemIcon>
                    <ListItemText>
                      <Typography
                        component="span"
                        variant="caption"
                      >
                        HOMEPAGE
                      </Typography>
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton onClick={handleClickList2}>
                    <ListItemIcon><LibraryAddIcon fontSize="small" /></ListItemIcon>
                    <ListItemText>
                      <Typography
                        component="span"
                        variant="caption"
                      >
                        CREATE NAC
                      </Typography>
                    </ListItemText>
                    {openList2 ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                </ListItem>
                <Collapse in={openList2} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton onClick={NAC_NAC}>
                      <ListItemText>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="caption"
                        >
                          <CircleIcon sx={{ fontSize: 8, mr: 1 }} />&nbsp; โยกย้ายทรัพย์สิน
                        </Typography>
                      </ListItemText>
                    </ListItemButton>
                    {/* <ListItemButton onClick={NAC_CHANGE}>
                      <ListItemText>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="caption"
                        >
                          <CircleIcon sx={{ fontSize: 8, mr: 1 }} />&nbsp; เปลี่ยนแปลงรายละเอียดทรัพย์สิน
                        </Typography>
                      </ListItemText>
                    </ListItemButton> */}
                    <ListItemButton onClick={NAC_SEALS}>
                      <ListItemText>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="caption"
                        >
                          <CircleIcon sx={{ fontSize: 8, mr: 1 }} />&nbsp; ขายทรัพย์สิน
                        </Typography>
                      </ListItemText>
                    </ListItemButton>
                    {/* <ListItemButton onClick={NAC_DELETE}>
                      <ListItemText>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="caption"
                        >
                          <CircleIcon sx={{ fontSize: 8, mr: 1 }} />&nbsp; ตัดบัญชีทรัพย์สินถาวร
                        </Typography>
                      </ListItemText>
                    </ListItemButton> */}
                  </List>
                </Collapse>
                <ListItem disablePadding>
                  <ListItemButton onClick={handleClickList}>
                    <ListItemIcon><SubjectIcon fontSize="small" /></ListItemIcon>
                    <ListItemText>
                      <Typography
                        component="span"
                        variant="caption"
                      >
                        NAC
                      </Typography>
                    </ListItemText>
                    {openList ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                </ListItem>
                <Collapse in={openList} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton onClick={DOC_NAC_ME}>
                      <ListItemText>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="caption"
                        >
                          <CircleIcon sx={{ fontSize: 8, mr: 1 }} />&nbsp; สถานะรายการ NAC
                        </Typography>
                      </ListItemText>
                    </ListItemButton>
                  </List>
                </Collapse>
                <ListItem disablePadding>
                  <ListItemButton onClick={handleClickList4}>
                    <ListItemIcon><WorkHistoryIcon fontSize="small" /></ListItemIcon>
                    <ListItemText>
                      <Typography
                        component="span"
                        variant="caption"
                      >
                        REPORT
                      </Typography>
                    </ListItemText>
                    {openList4 ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                </ListItem>
                <Collapse in={openList4} timeout="auto" unmountOnExit>
                  <ListItem disablePadding>
                    <ListItemButton onClick={eBook_branch}>
                      <ListItemText>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="caption"
                        >
                          <CircleIcon sx={{ fontSize: 8, mr: 1 }} />&nbsp; E-Book NAC
                        </Typography>
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton onClick={Account_BrnachAssets}>
                      <ListItemText>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="caption"
                        >
                          <CircleIcon sx={{ fontSize: 8, mr: 1 }} />&nbsp; ทะเบียนทรัพย์สินสาขา
                        </Typography>
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                  <List component="div" disablePadding>
                    <ListItemButton onClick={REPORT}>
                      <ListItemText>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="caption"
                        >
                          <CircleIcon sx={{ fontSize: 8, mr: 1 }} />&nbsp; REPORT
                        </Typography>
                      </ListItemText>
                    </ListItemButton>
                  </List>
                </Collapse>
                {(permission_menuID ? permission_menuID.includes(13) : null) === true ?
                  <ListItem disablePadding>
                    <ListItemButton onClick={handleClickList5}>
                      <ListItemIcon><DomainAddIcon fontSize="small" /></ListItemIcon>
                      <ListItemText>
                        <Typography
                          component="span"
                          variant="caption"
                        >
                          BPC
                        </Typography>
                      </ListItemText>
                      {openList3 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                  </ListItem>
                  : null}
                <Collapse in={openList5} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton onClick={BSAssetsMain}>
                      <ListItemText>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="caption"
                        >
                          <CircleIcon sx={{ fontSize: 8, mr: 1 }} />&nbsp; E-Book BPC
                        </Typography>
                      </ListItemText>
                    </ListItemButton>
                    <ListItemButton onClick={BpcStatus}>
                      <ListItemText>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="caption"
                        >
                          <CircleIcon sx={{ fontSize: 8, mr: 1 }} />&nbsp; สถานะรายการทรัพย์สินผู้ร่วม
                        </Typography>
                      </ListItemText>
                    </ListItemButton>
                    <ListItemButton onClick={Transection_List}>
                      <ListItemText>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="caption"
                        >
                          <CircleIcon sx={{ fontSize: 8, mr: 1 }} />&nbsp; ประวัติการดำเนินการทรัพย์สินผู้ร่วม
                        </Typography>
                      </ListItemText>
                    </ListItemButton>
                  </List>
                </Collapse>
              </List>
              <Divider />
            </Drawer>
            <Outlet />
          </ThemeProvider>
        </Box>
      </>
    );
  }
}