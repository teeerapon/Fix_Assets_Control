import * as React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
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
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import '../../../App.css'
import OutlinedInput from '@mui/material/OutlinedInput';
import config from '../../../config'
import Grid from '@mui/material/Grid';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

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
  return fetch(config.http + '/testGetBranch', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

async function Reported2(credentials) {
  return fetch(config.http + '/getAssetbyUserBranch', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

async function Reported3(credentials) {
  return fetch(config.http + '/wrongBranch', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

async function getPeriods(credentials) {
  return fetch(config.http + '/period_round', {
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

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Report() {

  const navigate = useNavigate();
  const classes = useStyles();
  const permission = JSON.parse(localStorage.getItem('permission'));
  const data = JSON.parse(localStorage.getItem('data'));
  const [permissionData, setPermission] = React.useState([]);
  const [permissionDataHO, setPermissionHO] = React.useState([]);
  const [periodData2, setPeriodData2] = React.useState([]);
  const [periodData, setPeriodData] = React.useState([]);
  const [showResult, setShowResult] = React.useState(false);
  const [alert, setAlert] = React.useState(false);
  const [valueAlert, setValueAlert] = React.useState(false);
  const [topicBranch, setTopicBranch] = React.useState();

  const handleChangeTopicBranch = (event) => {
    if ((data.branchid === 901 && event.target.value === 1) || (data.branchid === 901 && event.target.value === 0)) {
      setTopicBranch(event.target.value);
      setShowResult(false)
      setPermission([])
    } else if (data.branchid !== 901 && event.target.value === 0) {
      setTopicBranch(event.target.value);
      setShowResult(false)
      setPermissionHO([])
    } else {
      swal("แจ้งเตือน", "ถูกจำกัดสิทธิ์", "error", {
        buttons: false,
        timer: 2000,
      }).then(() => {
        setTopicBranch(null);
        setShowResult(false)
        setPermissionHO(null)
      })
    }
  };

  const handleChangeValue = async (event, newValue) => {
    setPermission(event.target.value);
    const BranchID = event.target.value

    if (event.target.value !== undefined) {
      const response_data = await getPeriods({
        BranchID
      })
      if (response_data.length !== 0) {
        setPeriodData2(response_data);
        setShowResult(true)
      } else {
        setAlert(true)
        setValueAlert('ไม่พบข้อมูลรอบบันทึกสำหรับแสดงรายงานได้ กรุณาลองใหม่ภายหลัง')
        setShowResult(false)
      }
    }
  };

  const handleChangeValueHO = async (event, newValue) => {
    setPermissionHO(event.target.value);
    if (event.target.value !== undefined) {
      if (event.target.value === 1) {
        const depCode = data.DepCode
        const response_data = await getPeriods({
          depCode
        })
        if (response_data.length !== 0) {
          setPeriodData2(response_data);
          setShowResult(true)
        } else {
          setAlert(true)
          setValueAlert('ไม่พบข้อมูลรอบบันทึกสำหรับแสดงรายงานได้ กรุณาลองใหม่ภายหลัง')
          setShowResult(false)
        }
      } else {
        const personID = data.UserCode
        const response_data = await getPeriods({
          personID
        })
        console.log(personID);
        if (response_data.length !== 0) {
          setPeriodData2(response_data);
          setShowResult(true)
        } else {
          setAlert(true)
          setValueAlert('ไม่พบข้อมูลรอบบันทึกสำหรับแสดงรายงานได้ กรุณาลองใหม่ภายหลัง')
          setShowResult(false)
        }
      }
    }
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlert(false);
  };

  const handleChangeValue2 = (event) => {
    setPeriodData(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const RoundID = periodData;
    const BranchID = permissionData.length === 0 ? 901 : permissionData;
    const UserBranch = data.branchid;
    
    if (periodData !== "" && permissionData !== "" && permissionData !== undefined && periodData !== undefined) {
      const response = await Reported({
        RoundID,
        BranchID,
        UserBranch
      });
      const response2 = await Reported2({
        RoundID,
        BranchID,
        UserBranch
      })
      const response3 = await Reported3({
        UserBranch,
        BranchID,
        RoundID
      })
      if ('data' in response || 'data' in response2 || 'data' in response3) {
        swal("แจ้งเตือน", "ค้นหาข้อมูลเสร็จสิ้น", "success", {
          buttons: false,
          timer: 2000,
        })
          .then((value) => {
            if (topicBranch === 0) {
              localStorage.setItem('Allaseets', JSON.stringify((response2).concat(response3, response.data)));
              navigate("/AssetPage")
            } else {
              const array1 = response2.filter((res) => res.DepCode === data.DepCode)
              const array2 = response3.filter((res) => res.DepCode === data.DepCode)
              const array3 = (response.data).filter((res) => res.DepCode === data.DepCode)
              localStorage.setItem('Allaseets', JSON.stringify((array1).concat(array2, array3)));
              navigate("/AssetPage")
            }
          });
      } else {
        swal("แจ้งเตือน", "ไม่พบรายการบันทึกทรัพย์สิน", "error");
      }
    } else {
      swal("แจ้งเตือน", "กรุณากรอกข้อมูลในครบถ้วน", "warning");
    }
  }

  if (permission === 'ไม่พบสิทธิ์') {
    swal("แจ้งเตือน", 'กรุณาติดต่อ Admin เพื่อขอสิทธิ์', "warning", {
      buttons: false,
      timer: 2000,
    }).then((value) => {
      window.location.href = "/NAC_MAIN";
    });
  } else {
    return (
      <div>
        <Stack spacing={2} sx={{ width: '100%' }}>
          <Snackbar open={alert} autoHideDuration={4500} onClose={handleCloseAlert}>
            <Alert onClose={handleCloseAlert} severity="warning" sx={{ width: '100%' }}>
              {valueAlert}
            </Alert>
          </Snackbar>
        </Stack>
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
              <Typography variant="h5" color="inherit" >
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
                  <Typography component="h1" variant="h4" align="center" className='font-sm-bold'>
                    <b>PURE THAI ENERGY CO.,LTD.</b>
                  </Typography>
                  <Typography variant="h6" gutterBottom className='pt-5'>
                    กรุณาเลือกคำตอบ
                  </Typography>
                  <Box sx={{ minWidth: 120 }}>
                    <Grid container spacing={3} className='pt-2'>
                      <Grid item xs={12} sm={12}>
                        <div>
                          <FormControl fullWidth>
                            <InputLabel id="demo-multiple-checkbox-label">เลือกงาน</InputLabel>
                            <Select
                              value={topicBranch}
                              onChange={handleChangeTopicBranch}
                              fullWidth
                              input={<OutlinedInput label="เลือกงาน" />}
                            >
                              <MenuItem value={0}>CO</MenuItem>
                              <MenuItem value={1}>HO</MenuItem>
                            </Select>
                          </FormControl>
                        </div>
                      </Grid>
                      {topicBranch === 0 ? (
                        <Grid item xs={12} sm={12}>
                          <FormControl fullWidth>
                            <InputLabel id="demo-multiple-checkbox-label">เลือกสาขา</InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={permissionData}
                              label="Branch ID"
                              onChange={handleChangeValue}
                              input={<OutlinedInput label="เลือกสาขา" />}
                            >
                              {
                                permission.filter((res) => res.BranchID !== 901).map((item) =>
                                  <MenuItem value={item.BranchID}>{
                                    item.BranchID === 1000001 ? `สาขาที่ : CJ001` :
                                      item.BranchID === 1000002 ? `สาขาที่ : CJ002` :
                                        item.BranchID === 1000004 ? `สาขาที่ : CJ003` :
                                          item.BranchID === 1000003 ? `สาขาที่ : PURE PARK` :
                                            `สาขาที่ : ${item.BranchID}`
                                  }</MenuItem>
                                )
                              }
                            </Select>
                          </FormControl>
                        </Grid>
                      ) : null}
                      {topicBranch === 1 ? (
                        <Grid item xs={12} sm={12}>
                          <FormControl fullWidth>
                            <InputLabel id="demo-multiple-checkbox-label">เลือกคำตอบ</InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={permissionDataHO}
                              label="เลือกคำตอบ"
                              onChange={handleChangeValueHO}
                              input={<OutlinedInput label="เลือกคำตอบ" />}
                            >
                              <MenuItem value={1}>DEPARTMENT ({data.DepCode})</MenuItem>
                              <MenuItem value={2}>({data.UserCode})</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                      ) : null}
                    </Grid>
                  </Box>
                </center>
                {showResult ?
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
                                วันที่ {item.BeginDate.split('T')[0]} - {item.EndDate.split('T')[0]} : {item.Description}
                              </MenuItem>
                            )
                          }
                        </Select>
                      </FormControl>
                    </Box>
                  </center>
                  : null}
                <center>
                  <div className='pt-5'>
                    <React.Fragment>
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                          type="submit"
                          disabled={showResult ? false : true}
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
            <Outlet />
          </Container>
        </AnimatedPage>
      </div>
    );
  }
}
