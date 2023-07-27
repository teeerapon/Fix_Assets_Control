import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { useLocation } from "react-router";
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
import FormatShapesIcon from '@mui/icons-material/FormatShapes';
import SubjectIcon from '@mui/icons-material/ViewTimeline';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import FontDownloadIcon from '@mui/icons-material/FontDownload';
import Axios from "axios"
import '../../App.css'
import config from '../../config'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';
import { orange } from '@mui/material/colors';

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
  const location = useLocation();
  const classes = useStyles();
  const [auth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const data = JSON.parse(localStorage.getItem('data'));
  const [openListNAC, setOpenListNAC] = React.useState(true);
  const [openList, setOpenList] = React.useState(false);
  const [openList2, setOpenList2] = React.useState(false);
  const [openList3, setOpenList3] = React.useState(false);
  const [openList4, setOpenList4] = React.useState(false);
  const [openList5, setOpenList5] = React.useState(false);
  const navigate = useNavigate();
  const [permission_menuID, setPermission_menuID] = React.useState();
  const [permission_menu, setPermission_menu] = React.useState();

  const create_nac = [
    {
      icon: <CircleIcon sx={{ fontSize: 8, mr: 1, display: location.pathname === '/NAC_CREATE_STEP1' ? null : 'none' }} />,
      label:
        <Stack direction="row" justifyContent="space-between" spacing={2}>
          <Stack>เพิ่มบัญชีทรัพย์สิน</Stack>
          <Stack><FontDownloadIcon sx={{ fontSize: 14, color: orange[500] }} /></Stack>
        </Stack>
      ,
      url: '/NAC_CREATE_STEP1',
      permission: (permission_menuID ? permission_menuID.includes(1) : null) === true ? 1 : 0,
      permission_branch: data.branchid === 901 ? 1 : 0
    },
    {
      icon: <CircleIcon sx={{ fontSize: 8, mr: 1, display: location.pathname === '/NAC_CHANGE_STEP1' ? null : 'none' }} />,
      label:
        <Stack direction="row" justifyContent="space-between" spacing={2}>
          <Stack>เปลี่ยนแปลงรายละเอียด</Stack>
          <Stack><FontDownloadIcon sx={{ fontSize: 14, color: orange[500] }} /></Stack>
        </Stack>
      ,
      url: '/NAC_CHANGE_STEP1',
      permission: (permission_menuID ? permission_menuID.includes(1) : null) === true ? 1 : 0,
      permission_branch: data.branchid === 901 ? 1 : 0
    },
    {
      icon: <CircleIcon sx={{ fontSize: 8, mr: 1, display: location.pathname === '/NAC_CREATE_MAIN1' ? null : 'none' }} />,
      label: 'โยกย้ายทรัพย์สิน',
      url: '/NAC_CREATE_MAIN1'
    },
    {
      icon: <CircleIcon sx={{ fontSize: 8, mr: 1, display: location.pathname === '/NAC_SEALS_STEP1' ? null : 'none' }} />,
      label: 'ขายทรัพย์สิน',
      url: '/NAC_SEALS_STEP1'
    },
    {
      icon: <CircleIcon sx={{ fontSize: 8, mr: 1, display: location.pathname === '/NAC_DELETE_STEP1' ? null : 'none' }} />,
      label: 'ตัดบัญชีทรัพย์สิน',
      url: '/NAC_DELETE_STEP1',
      permission: data.branchid === 901 ? 1 : 0,
      permission_branch: data.branchid === 901 ? 1 : 0
    },
  ]

  const nac = [
    {
      icon: <CircleIcon sx={{ fontSize: 8, mr: 1, display: location.pathname === '/NAC_OPERATOR' ? null : 'none' }} />,
      label:
        <Stack direction="row" justifyContent="space-between" spacing={2}>
          <Stack>สถานะรายการ NAC</Stack>
          <Stack><FontDownloadIcon sx={{ fontSize: 14, color: orange[500] }} /></Stack>
        </Stack>
      ,
      url: '/NAC_OPERATOR',
      permission: (permission_menuID ? permission_menuID.includes(2) : null) === true ? 1 : 0,
      permission_branch: data.branchid === 901 ? 1 : 0
    },
    {
      icon: <CircleIcon sx={{ fontSize: 8, mr: 1, display: location.pathname === '/NAC_ROW' ? null : 'none' }} />,
      label: 'สถานะรายการ NAC',
      url: '/NAC_ROW'
    },
  ]

  const period = [
    {
      icon: <CircleIcon sx={{ fontSize: 8, mr: 1, display: location.pathname === '/CreatePeriod' ? null : 'none' }} />,
      label:
        <Stack direction="row" justifyContent="space-between" spacing={2}>
          <Stack>เพิ่มรอบตรวจนับ</Stack>
          <Stack><FontDownloadIcon sx={{ fontSize: 14, color: orange[500] }} /></Stack>
        </Stack>
      ,
      url: '/CreatePeriod',
      permission: (permission_menuID ? permission_menuID.includes(3) : null) === true ? 1 : 0,
      permission_branch: data.branchid === 901 ? 1 : 0
    },
    {
      icon: <CircleIcon sx={{ fontSize: 8, mr: 1, display: location.pathname === '/EditPeriod' ? null : 'none' }} />,
      label:
        <Stack direction="row" justifyContent="space-between" spacing={2}>
          <Stack>แก้ไขรอบตรวจนับ</Stack>
          <Stack><FontDownloadIcon sx={{ fontSize: 14, color: orange[500] }} /></Stack>
        </Stack>
      ,
      url: '/EditPeriod',
      permission: (permission_menuID ? permission_menuID.includes(4) : null) === true ? 1 : 0,
      permission_branch: data.branchid === 901 ? 1 : 0
    },
  ]

  const report = [
    {
      icon: <CircleIcon sx={{ fontSize: 8, mr: 1, display: location.pathname === '/Reported_Assets_Counted' ? null : 'none' }} />,
      label:
        <Stack direction="row" justifyContent="space-between" spacing={2}>
          <Stack>รายงานตรวจนับทรัพย์สิน</Stack>
          <Stack><FontDownloadIcon sx={{ fontSize: 14, color: orange[500] }} /></Stack>
        </Stack>
      ,
      url: '/Reported_Assets_Counted',
      permission: (permission_menuID ? permission_menuID.includes(7) : null) === true ? 1 : 0,
      permission_branch: data.branchid === 901 ? 1 : 0
    },
    {
      icon: <CircleIcon sx={{ fontSize: 8, mr: 1, display: location.pathname === '/History_of_Assets' ? null : 'none' }} />,
      label:
        <Stack direction="row" justifyContent="space-between" spacing={2}>
          <Stack>ประวัติทรัพย์สิน NAC</Stack>
          <Stack><FontDownloadIcon sx={{ fontSize: 14, color: orange[500] }} /></Stack>
        </Stack>
      ,
      url: '/History_of_Assets',
      permission: (permission_menuID ? permission_menuID.includes(8) : null) === true ? 1 : 0,
      permission_branch: data.branchid === 901 ? 1 : 0
    },
    {
      icon: <CircleIcon sx={{ fontSize: 8, mr: 1, display: (location.pathname === '/EBookMain' || location.pathname === '/EBookBranch') ? null : 'none' }} />,
      label: 'E-Book NAC',
      url: data.branchid === 901 ? '/EBookMain' : '/EBookBranch',
    },
    {
      icon: <CircleIcon sx={{ fontSize: 8, mr: 1, display: (location.pathname === '/FETCH_ASSETS' || location.pathname === '/Account_BrnachAssets') ? null : 'none' }} />,
      label: 'ทะเบียนทรัพย์สิน',
      url: data.branchid === 901 ? '/FETCH_ASSETS' : '/Account_BrnachAssets',
    },
    {
      icon: <CircleIcon sx={{ fontSize: 8, mr: 1, display: location.pathname === '/Report' ? null : 'none' }} />,
      label: 'รายงานตรวจนับทรัพย์สิน',
      url: '/Report'
    },
  ]

  const bpc = [
    {
      icon: <CircleIcon sx={{ fontSize: 8, mr: 1, display: location.pathname === '/BSAssetsMain' ? null : 'none' }} />,
      label: 'E-Book BPC',
      url: '/BSAssetsMain'
    },
    {
      icon: <CircleIcon sx={{ fontSize: 8, mr: 1, display: location.pathname === '/BpcStatus' ? null : 'none' }} />,
      label: 'สถานะรายการทรัพย์สินผู้ร่วม',
      url: '/BpcStatus'
    },
    {
      icon: <CircleIcon sx={{ fontSize: 8, mr: 1, display: location.pathname === '/TransectionList' ? null : 'none' }} />,
      label: 'ประวัติทรัพย์สินผู้ร่วม',
      url: '/TransectionList'
    },
  ]

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

  function HomePage() {
    navigate('/')
  };

  function Change_ASSETS() {
    setOpenListNAC(!openListNAC);
    if (!openListNAC === false) {
      setOpenList(false);
      setOpenList2(false);
      setOpenList3(false);
      setOpenList4(false);
      setOpenList5(false);
    }
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
                    <ThemeProvider
                      theme={createTheme({
                        components: {
                          MuiListItemButton: {
                            defaultProps: {
                              disableTouchRipple: true,
                            },
                          },
                        },
                        palette: {
                          mode: 'dark',
                          background: { paper: '#1c2536' },
                        },
                      })}
                    >
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
                        <MenuItem disabled={data.DepCode === '101ITO' ? false : true} onClick={() => navigate(`/Permission_NAC`)}>
                          <ListItemIcon>
                            <ManageAccountsIcon fontSize="small" />
                          </ListItemIcon>
                          <ListItemText>Permission</ListItemText>
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>
                          <ListItemIcon>
                            <LogoutIcon fontSize="small" />
                          </ListItemIcon>
                          <ListItemText>Log Out</ListItemText>
                        </MenuItem>
                      </Menu>
                    </ThemeProvider>
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
            PaperProps={{
              sx: {
                backgroundColor: "#1c2536",
                color: "#fff",
              }
            }}
            variant="persistent"
            anchor="left"
            open={open}
          >
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? <CloseIcon fontSize="small" style={{ color: "rgba(255, 255, 255, 0.7)", }} /> : <CloseIcon />}
              </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
              <ListItem component="div" disablePadding>
                <ListItemButton
                // style={{ backgroundColor: openListNAC === true ? "rgba(255,255,255,0.05)" : null, }}
                >
                  <ListItemText
                    alignItems="flex-start"
                    onClick={Change_ASSETS}
                    primary="ASSETS"
                    primaryTypographyProps={{
                      fontSize: 14,
                      fontWeight: 'medium',
                      lineHeight: '20px',
                      // color: (openList || openList2 || openList3 || openList4 || openList5 || openListNAC) === true ? "#6366f1" : "#ffff",
                      mb: '2px',
                    }}
                    sx={{ my: 0 }}
                  />
                </ListItemButton>
              </ListItem>
              {openListNAC &&
                <ListItem component="div" disablePadding>
                  <ListItemButton onClick={handleClickList2}>
                    <ListItemIcon>
                      <LibraryAddIcon fontSize="small" style={{ color: openList2 ? "#6366f1" : "rgba(255, 255, 255, 0.7)", }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="NAC CREATE"
                      primaryTypographyProps={{
                        fontSize: 13,
                        fontWeight: 'medium',
                        lineHeight: '25px',
                        color: openList2 ? "#ffff" : "rgba(255, 255, 255, 0.7)",
                      }}
                      sx={{ my: 0 }}
                    >
                    </ListItemText>
                    {openList2 ? <ExpandLess style={{ color: "#ffff", }} /> : <ExpandMore style={{ color: "rgba(255, 255, 255, 0.7)", }} />}
                  </ListItemButton>
                </ListItem>
              }
              <Collapse in={openList2} timeout="auto" unmountOnExit>
                {open &&
                  create_nac.map((item) => {
                    if (item.permission_branch === 0 || item.permission === 0) {
                      return null;
                    } else {
                      return (
                        <ListItemButton
                          key={item.label}
                          onClick={() => navigate(item.url)}
                          sx={{ py: 0, minHeight: 36, color: 'rgba(255,255,255,.8)' }}
                        >
                          <ListItemIcon
                            sx={{ color: 'inherit' }}
                            style={{ color: location.pathname === item.url ? "#6366f1" : "rgba(255, 255, 255, 0.7)" }}
                          >
                            {item.icon}
                          </ListItemIcon>
                          <ListItemText
                            primary={item.label}
                            style={{ color: location.pathname === item.url ? "#fff" : "rgba(255, 255, 255, 0.7)" }}
                            primaryTypographyProps={{ fontSize: 12, fontWeight: 'small' }}
                          />
                        </ListItemButton>
                      )
                    }
                  })}
              </Collapse>
              {openListNAC &&
                <ListItem component="div" disablePadding>
                  <ListItemButton onClick={handleClickList}>
                    <ListItemIcon>
                      <SubjectIcon fontSize="small" style={{ color: openList ? "#6366f1" : "rgba(255, 255, 255, 0.7)", }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="NAC STATUS"
                      primaryTypographyProps={{
                        fontSize: 13,
                        fontWeight: 'medium',
                        lineHeight: '25px',
                        color: openList ? "#ffff" : "rgba(255, 255, 255, 0.7)",
                      }}
                      sx={{ my: 0 }}
                    />
                    {openList ? <ExpandLess style={{ color: "#ffff", }} /> : <ExpandMore style={{ color: "rgba(255, 255, 255, 0.7)", }} />}
                  </ListItemButton>
                </ListItem>
              }
              <Collapse in={openList} timeout="auto" unmountOnExit>
                {open &&
                  nac.map((item) => {
                    if (item.permission_branch === 0 || item.permission === 0) {
                      return null;
                    } else {
                      return (
                        <ListItemButton
                          key={item.label}
                          onClick={() => navigate(item.url)}
                          sx={{ py: 0, minHeight: 36, color: 'rgba(255,255,255,.8)' }}
                        >
                          <ListItemIcon
                            sx={{ color: 'inherit' }}
                            style={{ color: location.pathname === item.url ? "#6366f1" : "rgba(255, 255, 255, 0.7)" }}
                          >
                            {item.icon}
                          </ListItemIcon>
                          <ListItemText
                            primary={item.label}
                            style={{ color: location.pathname === item.url ? "#fff" : "rgba(255, 255, 255, 0.7)" }}
                            primaryTypographyProps={{ fontSize: 12, fontWeight: 'small' }}
                          />
                        </ListItemButton>
                      )
                    }
                  })}
              </Collapse>
              {(permission_menuID ? permission_menuID.includes(3 || 4) : null) === true && openListNAC === true ?
                <ListItem disablePadding>
                  <ListItemButton onClick={handleClickList3}>
                    <ListItemIcon><AccessAlarmIcon fontSize="small" style={{ color: openList3 ? "#6366f1" : "rgba(255, 255, 255, 0.7)", }} /></ListItemIcon>
                    <ListItemText
                      primary="NAC PERIOD"
                      primaryTypographyProps={{
                        fontSize: 13,
                        fontWeight: 'medium',
                        lineHeight: '25px',
                        color: openList3 ? "#ffff" : "rgba(255, 255, 255, 0.7)",
                      }}
                      sx={{ my: 0 }}
                    />
                    {openList3 ? <ExpandLess style={{ color: "#ffff", }} /> : <ExpandMore style={{ color: "rgba(255, 255, 255, 0.7)", }} />}
                  </ListItemButton>
                </ListItem>
                : null}
              <Collapse in={openList3} timeout="auto" unmountOnExit>
                {open &&
                  period.map((item) => {
                    if (item.permission_branch === 0 || item.permission === 0) {
                      return null;
                    } else {
                      return (
                        <ListItemButton
                          key={item.label}
                          onClick={() => navigate(item.url)}
                          sx={{ py: 0, minHeight: 36, color: 'rgba(255,255,255,.8)' }}
                        >
                          <ListItemIcon
                            sx={{ color: 'inherit' }}
                            style={{ color: location.pathname === item.url ? "#6366f1" : "rgba(255, 255, 255, 0.7)" }}
                          >
                            {item.icon}
                          </ListItemIcon>
                          <ListItemText
                            primary={item.label}
                            style={{ color: location.pathname === item.url ? "#fff" : "rgba(255, 255, 255, 0.7)" }}
                            primaryTypographyProps={{ fontSize: 12, fontWeight: 'small' }}
                          />
                        </ListItemButton>
                      )
                    }
                  })}
              </Collapse>
              {openListNAC &&
                <ListItem component="div" disablePadding>
                  <ListItemButton onClick={handleClickList4}>
                    <ListItemIcon>
                      <FormatShapesIcon fontSize="small" style={{ color: openList4 ? "#6366f1" : "rgba(255, 255, 255, 0.7)", }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="ASSETS REPORT"
                      primaryTypographyProps={{
                        fontSize: 13,
                        fontWeight: 'medium',
                        lineHeight: '25px',
                        color: openList4 ? "#ffff" : "rgba(255, 255, 255, 0.7)",
                      }}
                      sx={{ my: 0 }}
                    />
                    {openList4 ? <ExpandLess style={{ color: "#ffff", }} /> : <ExpandMore style={{ color: "rgba(255, 255, 255, 0.7)", }} />}
                  </ListItemButton>
                </ListItem>
              }
              <Collapse in={openList4} timeout="auto" unmountOnExit>
                {open &&
                  report.map((item) => {
                    if (item.permission_branch === 0 || item.permission === 0) {
                      return null;
                    } else {
                      return (
                        <ListItemButton
                          key={item.label}
                          onClick={() => navigate(item.url)}
                          sx={{ py: 0, minHeight: 36, color: 'rgba(255,255,255,.8)' }}
                        >
                          <ListItemIcon
                            sx={{ color: 'inherit' }}
                            style={{ color: location.pathname === item.url ? "#6366f1" : "rgba(255, 255, 255, 0.7)" }}
                          >
                            {item.icon}
                          </ListItemIcon>
                          <ListItemText
                            primary={item.label}
                            style={{ color: location.pathname === item.url ? "#fff" : "rgba(255, 255, 255, 0.7)" }}
                            primaryTypographyProps={{ fontSize: 12, fontWeight: 'small' }}
                          />
                        </ListItemButton>
                      )
                    }
                  })}
              </Collapse>
              {openListNAC === true && ((permission_menuID ? permission_menuID.includes(13) : null) || data.branchid !== 901) === true ?
                <ListItem component="div" disablePadding>
                  <ListItemButton onClick={handleClickList5}>
                    <ListItemIcon>
                      <ConnectWithoutContactIcon fontSize="small" style={{ color: openList5 ? "#6366f1" : "rgba(255, 255, 255, 0.7)", }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="BPC"
                      primaryTypographyProps={{
                        fontSize: 13,
                        fontWeight: 'medium',
                        lineHeight: '25px',
                        color: openList5 ? "#ffff" : "rgba(255, 255, 255, 0.7)",
                      }}
                      sx={{ my: 0 }}
                    />
                    {openList5 ? <ExpandLess style={{ color: "#ffff", }} /> : <ExpandMore style={{ color: "rgba(255, 255, 255, 0.7)", }} />}
                  </ListItemButton>
                </ListItem>
                : null}
              <Collapse in={openList5} timeout="auto" unmountOnExit>
                {open &&
                  bpc.map((item) => {
                    if (item.permission_branch === 0 || item.permission === 0) {
                      return null;
                    } else {
                      return (
                        <ListItemButton
                          key={item.label}
                          onClick={() => navigate(item.url)}
                          sx={{ py: 0, minHeight: 36, color: 'rgba(255,255,255,.8)' }}
                        >
                          <ListItemIcon
                            sx={{ color: 'inherit' }}
                            style={{ color: location.pathname === item.url ? "#6366f1" : "rgba(255, 255, 255, 0.7)" }}
                          >
                            {item.icon}
                          </ListItemIcon>
                          <ListItemText
                            primary={item.label}
                            style={{ color: location.pathname === item.url ? "#fff" : "rgba(255, 255, 255, 0.7)" }}
                            primaryTypographyProps={{ fontSize: 12, fontWeight: 'small' }}
                          />
                        </ListItemButton>
                      )
                    }
                  })}
              </Collapse>
            </List>
            <Divider />
          </Drawer>
          <Outlet />
        </ThemeProvider>
      </Box >
    </>
  );
}