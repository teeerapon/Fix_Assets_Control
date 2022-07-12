import * as React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Axios from "axios"
import swal from 'sweetalert';
import Button from '@material-ui/core/Button';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import { Outlet, useNavigate } from "react-router";
import AnimatedPage from '../../../AnimatedPage.jsx'

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

async function Reported(credentials) {
  return fetch('http://similan.1:32001/api/testGetBranch', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

async function Reported2(credentials) {
  return fetch('http://similan.1:32001/api/getAssetbyUserBranch', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

async function Reported3(credentials) {
  return fetch('http://similan.1:32001/api/wrongBranch', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'ptec@pure © '}
      <Link color="inherit">
        Create Period
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Report() {

  const navigate = useNavigate();
  const classes = useStyles();
  const permission = JSON.parse(localStorage.getItem('permission'));
  const [permissionData, setPermission] = React.useState([]);
  const [periodData2, setPeriodData2] = React.useState([]);
  const [periodData, setPeriodData] = React.useState([]);

  const fetchPeriodData = async () => {
    const { data } = await Axios.get(
      "http://similan.1:32001/api/period_round"
    );
    const periodID = data;
    setPeriodData2(periodID);
  };

  const handleSubmit = async e => {
    const RoundID = periodData;
    const BranchID = permissionData;
    const UserBranch = permissionData;
    e.preventDefault();
    if (periodData !== "" && permissionData !== "" && permissionData !== undefined && periodData !== undefined) {
      const response = await Reported({
        RoundID,
        BranchID
      });
      const response2 = await Reported2({
        RoundID,
        BranchID,
        UserBranch
      });
      const response3 = await Reported3({
        RoundID,
        BranchID,
        UserBranch
      });
      if ('data' in response || 'data' in response2 || 'data' in response3) {
        swal("ทำรายการสำเร็จ", "ค้นหาข้อมูลเสร็จสิ้น", "success", {
          buttons: false,
          timer: 2000,
        })
          .then((value) => {
            localStorage.setItem('Allaseets', JSON.stringify(response['data']));
            localStorage.setItem('aseetsCounted', JSON.stringify(response2));
            localStorage.setItem('assetsWrong', JSON.stringify(response3));
            navigate("/AssetPage")
          });
      } else {
        swal("ทำรายการไม่สำเร็จ", "ไม่พบรายการบันทึกทรัพย์สิน", "error");
      }
    } else {
      swal("ทำรายการไม่สำเร็จ", "กรุณากรอกข้อมูลในครบถ้วน", "warning");
    }
  }

  React.useEffect(() => {
    fetchPeriodData();
  }, []);

  const handleChangeValue2 = (event) => {
    setPeriodData(event.target.value);
  };

  const handleChangeValue = (event) => {
    setPermission(event.target.value);
  };

  return (
    <div>
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <AnimatedPage>
            <Typography variant="h5" color="inherit" noWrap>
              รายงานการตรวจนับ
            </Typography>
          </AnimatedPage>
        </Toolbar>
      </AppBar>
      <AnimatedPage>
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }} >
          <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <center className="pt-2">
                <Typography component="h1" variant="h4" align="center">
                  <b>PURE THAI ENERGY CO.,LTD.</b>
                </Typography>
                <Typography variant="h6" gutterBottom className='pt-5'>
                  กรุณาเลือกสาขา
                </Typography>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Branch ID</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={permissionData}
                      label="Branch ID"
                      onChange={handleChangeValue}
                    >
                      {
                        permission.map((item) =>
                          <MenuItem value={item.BranchID}>สาขาที่ : {!item.BranchID ? 'ไม่พบข้อมูลของสาขาที่สามารถเข้าถึงได้' : item.BranchID}</MenuItem>
                        )
                      }
                    </Select>
                  </FormControl>
                </Box>
              </center>
              <center className="pt-5">
                <Typography variant="h6" gutterBottom>
                  กรุณาเลือกรอบบันทึก
                </Typography>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Period ID</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={periodData}
                      label="Period ID"
                      onChange={handleChangeValue2}
                    >
                      {
                        periodData2.map((item) =>
                          <MenuItem value={item.PeriodID}>
                            รายงานการตรวจนับรอบที่ {item.PeriodID} : {item.Description}
                          </MenuItem>
                        )
                      }
                    </Select>
                  </FormControl>
                </Box>
                <div className='pt-5'>
                  <React.Fragment>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                      >
                        แสดงรายงาน
                      </Button>
                    </Box>
                  </React.Fragment>
                </div>
              </center>
            </form>
          </Paper>
          <Copyright />
          <Outlet />
        </Container>
      </AnimatedPage>
    </div>
  );
}
