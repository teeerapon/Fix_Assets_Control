import * as React from 'react';
import AppBar from '@mui/material/AppBar';
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
import SvgIcon from '@mui/material/SvgIcon';
import { Outlet, useNavigate } from "react-router";
import swal from 'sweetalert';
import Grid from '@mui/material/Grid';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

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

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

async function ChackUserWeb(credentials) {
  return fetch('http://49.0.64.71:32001/api/ChackUserWeb', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}


export default function MenuAppBar() {
  const classes = useStyles();
  const [auth] = React.useState(true);
  const [auth2] = React.useState(true);
  const [auth3] = React.useState(true);
  const [auth4] = React.useState(true);
  const [auth5] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const [anchorEl3, setAnchorEl3] = React.useState(null);
  const [anchorEl4, setAnchorEl4] = React.useState(null);
  const [anchorEl5, setAnchorEl5] = React.useState(null);
  const data = JSON.parse(localStorage.getItem('data'));
  const [checkUserWeb,setCheckUserWeb] = React.useState();
  const navigate = useNavigate();


  const fetchCheckUser = async () => {
    const usercode = data.UserCode;
    const response = await ChackUserWeb({
      usercode
    });
    if('data' in response){
      setCheckUserWeb(response.data[0].approverid)
    }
  }

  React.useEffect(() => {
    fetchCheckUser();
  });

  function PeriodOpen() {
    navigate('/CreatePeriod')
    setAnchorEl3(null);
  };

  function HomePage() {

    navigate('/HomePage')
    setAnchorEl3(null);
  };

  function PeriodEdit() {
    navigate('/EditPeriod')
    setAnchorEl3(null);
  };

  function REPORT() {
    navigate('/Report')
    setAnchorEl3(null);
  };

  function NAC_NAC() {
    navigate('/NAC_CREATE_MAIN1')
    setAnchorEl3(null);
    setAnchorEl5(null);
  };

  function NAC_NEW() {
    navigate('/NAC_CREATE_STEP1')
    setAnchorEl3(null);
    setAnchorEl5(null);
  };

  function NAC_CHANGE() {
    navigate('/NAC_CHANGE_STEP1')
    setAnchorEl3(null);
    setAnchorEl5(null);
  }

  function NAC_DELETE() {
    navigate('/NAC_DELETE_STEP1')
    setAnchorEl3(null);
    setAnchorEl5(null);
  }

  function NAC_SEALS() {
    navigate('/NAC_SEALS_STEP1')
    setAnchorEl3(null);
    setAnchorEl5(null);
  }

  function DOC_NAC_ME() {
    navigate('/NAC_ROW')
    setAnchorEl3(null);
    setAnchorEl5(null);
  }

  function NAC_OPERATOR() {
    navigate('/NAC_OPERATOR')
    setAnchorEl3(null);
    setAnchorEl5(null);
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
        navigate('/')
      });
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenu2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleMenu3 = (event) => {
    setAnchorEl3(event.currentTarget);
  };

  // const handleMenu4 = (event) => {
  //   setAnchorEl4(event.currentTarget);
  // };

  const handleClose4 = () => {
    setAnchorEl4(null);
  };

  const handleMenu5 = (event) => {
    setAnchorEl5(event.currentTarget);
  };

  const handleClose5 = () => {
    setAnchorEl3(null);
    setAnchorEl5(null);
  };

  const handleClose3 = () => {
    setAnchorEl3(null);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
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

  if(checkUserWeb === 'admin' || checkUserWeb === 'operatorII' || checkUserWeb === 'operatorI'){
    return (
      <>
        <ThemeProvider theme={darkTheme}>
          <AppBar position="static">
            <Toolbar>
              <Typography
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 1, display: { xs: 'none', md: 'flex' } }}
              >
                <HomeIcon />
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                <Button onClick={HomePage} sx={{ my: 2, color: 'white', display: 'block' }}>HOME</Button>
                {auth3 && (
                  <React.Fragment>
                    <Button onClick={handleMenu3} sx={{ my: 2, color: 'white', display: 'block' }}>NAC</Button>
                    <Menu
                      sx={{ mt: '45px' }}
                      id="menu-appbar"
                      anchorEl={anchorEl3}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                      open={Boolean(anchorEl3)}
                      onClose={handleClose3}
                    >
                      {auth5 && (
                        <React.Fragment>
                          <MenuItem onClick={handleMenu5}>
                            <Grid container spacing={1}>
                              <Grid item xs={10}>
                                จัดการทรัพย์สินถาวร
                              </Grid>
                              <Grid item xs={2}>
                                <ArrowRightIcon />
                              </Grid>
                            </Grid>
                          </MenuItem>
                          <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl5}
                            anchorOrigin={{
                              vertical: 'top',
                              horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                              vertical: 'top',
                              horizontal: 'left',
                            }}
                            open={Boolean(anchorEl5)}
                            onClose={handleClose5}
                          >
                            <MenuItem onClick={NAC_NEW}>เพิ่มบัญชีทรัพย์สินถาวร</MenuItem>
                            <MenuItem onClick={NAC_NAC}>โยกย้ายทรัพย์สิน</MenuItem>
                            <MenuItem onClick={NAC_CHANGE}>เปลี่ยนแปลงรายละเอียดทรัพย์สิน</MenuItem>
                            <MenuItem onClick={NAC_DELETE}>ตัดจากบัญชีทรัพย์สินถาวร</MenuItem>
                            <MenuItem onClick={NAC_SEALS}>ขายทรัพย์สิน</MenuItem>
                          </Menu>
                        </React.Fragment>
                      )}
                      <MenuItem onClick={DOC_NAC_ME}>สถานะรายการ NAC</MenuItem>
                      <MenuItem onClick={NAC_OPERATOR}>สถานะรายการ NAC ทั้งหมด</MenuItem>
                    </Menu>
                  </React.Fragment>
                )}
                {auth2 && (
                  <React.Fragment>
                    <Button onClick={handleMenu2} sx={{ my: 2, color: 'white', display: 'block' }}>PERIOD</Button>
                    <Menu
                      sx={{ mt: '45px' }}
                      id="menu-appbar"
                      anchorEl={anchorEl2}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                      open={Boolean(anchorEl2)}
                      onClose={handleClose2}
                    >
                      <MenuItem onClick={PeriodOpen}>เพิ่มรอบตรวจนับ</MenuItem>
                      <MenuItem onClick={PeriodEdit}>แก้ไขรอบตรวจนับ</MenuItem>
                    </Menu>
                  </React.Fragment>
                )}
                {auth4 && (
                  <React.Fragment>
                    <Button onClick={REPORT} sx={{ my: 2, color: 'white', display: 'block' }}>REPORT</Button>
                    <Menu
                      sx={{ mt: '45px' }}
                      id="menu-appbar"
                      anchorEl={anchorEl4}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                      open={Boolean(anchorEl4)}
                      onClose={handleClose4}
                    >
                      <MenuItem onClick={REPORT}>กำหนดสาขา</MenuItem>
                      <MenuItem onClick={handleClose4}>แสดงทั้งหมด</MenuItem> {/* REPORTAll */}
                    </Menu>
                  </React.Fragment>
                )}
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
              <div size="large" aria-label="account of current user" aria-controls="menu-appbar">
                <Typography variant="h6" component="React.Fragment" sx={{ flexGrow: 1 }} className={classes.root} >
                  {checkUserWeb === 'admin' ? 'ADMIN' : checkUserWeb === 'OPERATOR II' ? 'operatorII' : 'OPERATOR I'}
                </Typography>
              </div>
            </Toolbar>
          </AppBar>
          <Outlet />
        </ThemeProvider>
      </>
    );
  }else{
    return (
      <>
        <ThemeProvider theme={darkTheme}>
          <AppBar position="static">
            <Toolbar>
              <Typography
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 1, display: { xs: 'none', md: 'flex' } }}
              >
                <HomeIcon />
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                <Button onClick={HomePage} sx={{ my: 2, color: 'white', display: 'block' }}>HOME</Button>
                {auth3 && (
                  <React.Fragment>
                    <Button onClick={handleMenu3} sx={{ my: 2, color: 'white', display: 'block' }}>NAC</Button>
                    <Menu
                      sx={{ mt: '45px' }}
                      id="menu-appbar"
                      anchorEl={anchorEl3}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                      open={Boolean(anchorEl3)}
                      onClose={handleClose3}
                    >
                      {auth5 && (
                        <React.Fragment>
                          <MenuItem onClick={handleMenu5}>
                            <Grid container spacing={1}>
                              <Grid item xs={10}>
                                จัดการทรัพย์สินถาวร
                              </Grid>
                              <Grid item xs={2}>
                                <ArrowRightIcon />
                              </Grid>
                            </Grid>
                          </MenuItem>
                          <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl5}
                            anchorOrigin={{
                              vertical: 'top',
                              horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                              vertical: 'top',
                              horizontal: 'left',
                            }}
                            open={Boolean(anchorEl5)}
                            onClose={handleClose5}
                          >
                            <MenuItem onClick={NAC_NAC}>โยกย้ายทรัพย์สิน</MenuItem>
                            <MenuItem onClick={NAC_CHANGE}>เปลี่ยนแปลงรายละเอียดทรัพย์สิน</MenuItem>
                            <MenuItem onClick={NAC_DELETE}>ตัดจากบัญชีทรัพย์สินถาวร</MenuItem>
                            <MenuItem onClick={NAC_SEALS}>ขายทรัพย์สิน</MenuItem>
                          </Menu>
                        </React.Fragment>
                      )}
                      <MenuItem onClick={DOC_NAC_ME}>สถานะรายการ NAC</MenuItem>
                    </Menu>
                  </React.Fragment>
                )}
                {auth4 && (
                  <React.Fragment>
                    <Button onClick={REPORT} sx={{ my: 2, color: 'white', display: 'block' }}>REPORT</Button>
                    <Menu
                      sx={{ mt: '45px' }}
                      id="menu-appbar"
                      anchorEl={anchorEl4}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                      open={Boolean(anchorEl4)}
                      onClose={handleClose4}
                    >
                      <MenuItem onClick={REPORT}>กำหนดสาขา</MenuItem>
                      <MenuItem onClick={handleClose4}>แสดงทั้งหมด</MenuItem> {/* REPORTAll */}
                    </Menu>
                  </React.Fragment>
                )}
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
               <div size="large" aria-label="account of current user" aria-controls="menu-appbar">
                <Typography variant="h6" component="React.Fragment" sx={{ flexGrow: 1 }} className={classes.root} >
                  USER
                </Typography>
              </div>
            </Toolbar>
          </AppBar>
          <Outlet />
        </ThemeProvider>
      </>
    );
  }
}