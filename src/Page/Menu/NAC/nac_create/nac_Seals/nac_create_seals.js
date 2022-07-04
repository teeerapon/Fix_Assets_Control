import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TableContainer from '@mui/material/TableContainer';
import AnimatedPage from '../../../../../AnimatedPage.jsx';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import AddBoxIcon from '@mui/icons-material/AddBox';
import TableBody from '@mui/material/TableBody';
import FormGroup from '@mui/material/FormGroup';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import { Outlet, useNavigate } from "react-router";
import Box from '@mui/material/Box';
import Axios from "axios"
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import swal from 'sweetalert';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'ptec@pure © '}
      <Link color="inherit">
        Create NAC
      </Link>{' '}
      {new Date().getFullYear()}
    </Typography>
  );
}
const theme = createTheme();

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.action.selected,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.white,
  },
  // hide last border
}));

const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: (option) => option.Code,
});

const filterOptions2 = createFilterOptions({
  matchFrom: 'start',
  stringify: (option) => option.UserCode,
});

async function SelectDTL_Control(credentials) {
  return fetch('http://49.0.64.71:32001/api/SelectDTL_Control', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

async function SelectAssetsControl(credentials) {
  return fetch('http://49.0.64.71:32001/api/AssetsAll_Control', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

async function AutoDeapartMent(credentials) {
  return fetch('http://49.0.64.71:32001/api/AutoDeapartMent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

async function Store_FA_control_create_doc(credentials) {
  return fetch('http://49.0.64.71:32001/api/store_FA_control_create_doc', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

async function store_FA_control_creat_Detail(credentials) {
  return fetch('http://49.0.64.71:32001/api/store_FA_control_creat_Detail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

// async function store_FA_control_CheckAssetCode_Process(credentials) {
//   return fetch('http://49.0.64.71:32001/api/store_FA_control_CheckAssetCode_Process', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json; charset=utf-8',
//       'Accept': 'application/json'
//     },
//     body: JSON.stringify(credentials)
//   })
//     .then(data => data.json())
// }

async function store_FA_control_updateDTL_seals(credentials) {
  return fetch('http://49.0.64.71:32001/api/store_FA_control_updateDTL_seals', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

export default function Nac_Main() {

  // ใช้สำหรับสร้างเวลาปัจจุบัน
  const d = new Date();
  const year = (d.getFullYear()).toString();
  const month = ((d.getMonth()) + 101).toString().slice(-2);
  const date = ((d.getDate()) + 100).toString().slice(-2);
  const hours = ((d.getHours()) + 100).toString().slice(-2);
  const mins = ((d.getMinutes()) + 100).toString().slice(-2);
  const seconds = ((d.getSeconds()) + 100).toString().slice(-2);
  const datenow = `${year}-${month}-${date}T${hours}:${mins}:${seconds}.000Z`;
  const [serviceList, setServiceList] = React.useState([{ dtl_id: "", assetsCode: "", serialNo: "", name: "", date_asset: "", price: "", bookValue: "", priceSeals: "", profit: "", asset_id: "" }]);
  const result = serviceList.reduce((total, serviceList) => total = total + serviceList.price, 0);
  const navigate = useNavigate();
  const data = JSON.parse(localStorage.getItem('data'));
  const dataDepID = data.depid
  const [users_pureDep, setUsers_pureDep] = React.useState([]);
  const [AllAssetsControl, setAllAssetsControl] = React.useState([]);
  const [valuesVisibility, setValuesVisibility] = React.useState({
    text: serviceList[0].price,
    showText: false,
  });
  const nac_type = 5;


  // const handleClickShowPassword = () => {
  //   setValuesVisibility({ ...valuesVisibility, showText: !valuesVisibility.showText });
  // };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPassword = () => {
    console.log(data.branchid)
    if (data.branchid !== 901) {
      setValuesVisibility(false);
    } else {
      setValuesVisibility({ ...valuesVisibility, showText: !valuesVisibility.showText });
    }
  };

  // ส่วนของผู้รับ
  const [des_Department, setDes_Department] = React.useState();
  const [des_BU, setDes_BU] = React.useState();
  const [des_delivery, setDes_delivery] = React.useState();
  const [des_deliveryDate] = React.useState();
  // const [des_deliveryApprove, setDes_deliveryApprove] = React.useState();
  // const [des_deliveryApproveDate, setDes_deliveryApproveDate] = React.useState();
  const [des_Description, setDes_Description] = React.useState();

  // ส่วนของผู้ส่ง
  const [source_Department, setSource_Department] = React.useState();
  const [source_BU, setSource_BU] = React.useState();
  const [source, setSource] = React.useState();
  const [sourceDate, setSourceDate] = React.useState();
  // const [sourceApprove, setSource_Approve] = React.useState();
  // const [sourceDateApproveDate, setSource_DateApproveDate] = React.useState();
  const [source_Description, setSource_Description] = React.useState();

  const fetchUserForAssetsControl = async () => {
    const { data } = await Axios.get(
      "http://49.0.64.71:32001/api/getsUserForAssetsControl"
    );
    const UserForAssetsControl = data;
    const users_pure = []
    for (let i = 0; i < UserForAssetsControl.data.length; i++) {
      if (UserForAssetsControl.data[i].DepID === dataDepID) {
        users_pure[i] = UserForAssetsControl.data[i]
      }
    }
    setUsers_pureDep(users_pure)
  };

  const fetchAssetsControl = async () => {
    const BranchID = data.branchid;
    const response = await SelectAssetsControl({
      BranchID
    });
    setAllAssetsControl(response.data);
  };

  React.useEffect(() => {
    fetchAssetsControl();
    fetchUserForAssetsControl();
  }, []);

  const handleServiceAdd = () => {
    setServiceList([...serviceList, { dtl_id: "", assetsCode: "", serialNo: "", name: "", date_asset: "", price: "", bookValue: "", priceSeals: "", profit: "", asset_id: "" }]);
  };

  const handleServiceRemove = (index) => {
    const list = [...serviceList];
    list.splice(index, 1);
    setServiceList(list);
  };

  const handleServiceChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...serviceList];
    list[index][name] = value;
    setServiceList(list);
  };

  const handleServiceChangeHeader = async (e, index) => {
    const { name, value } = e.target;
    const assetsCodeSelect = e.target.innerText
    const list = [...serviceList];
    list[index][name] = value;
    list[index]['assetsCode'] = assetsCodeSelect;
    if (list[index]['assetsCode'] === null || list[index]['assetsCode'] === undefined) {
      list[index]['assetsCode'] = ''
      list[index]['name'] = ''
      list[index]['dtl'] = ''
      list[index]['count'] = ''
      list[index]['serialNo'] = ''
      list[index]['price'] = ''
      list[index]['bookValue'] = ''
      list[index]['priceSeals'] = ''
      list[index]['profit'] = ''
      list[index]['date_asset'] = ''
      setServiceList(list);
    } else {
      const Code = list[index]['assetsCode'];
      const response = await SelectDTL_Control({
        Code
      });
      if (response['data'].length !== 0) {
        list[index]['name'] = response['data'][0].Name
        list[index]['dtl'] = response['data'][0].Details
        list[index]['count'] = 1
        list[index]['serialNo'] = response['data'][0].SerialNo
        list[index]['price'] = response['data'][0].Price
        list[index]['bookValue'] = ''
        list[index]['priceSeals'] = '0'
        list[index]['profit'] = list[index]['priceSeals'] - list[index]['bookValue']
        list[index]['date_asset'] = response['data'][0].CreateDate
        setServiceList(list);
      }
    }
  };

  //Source

  const handleChangeSource_Department = (event) => {
    event.preventDefault();
    setSource_Department(event.target.value);
  };

  const handleChangeSource_BU = (event) => {
    event.preventDefault();
    setSource_BU(event.target.value);
  };

  const handleChangeSource_delivery2 = (event) => {
    event.preventDefault();
    setSource(event.target.value);
  };

  const handleChangeSource_deliveryDate = (newValue) => {
    setSourceDate(newValue);
  };

  const handleChangeSource_Description = (event) => {
    event.preventDefault();
    setSource_Description(event.target.value);
  };

  const handleAutoSource_DeapartMent = async (e, index) => {
    const UserCode = e.target.innerText
    const response = await AutoDeapartMent({
      UserCode
    });
    setSource(UserCode)
    if (!UserCode) {
      setSource_Department('')
      setSource_BU('')
    } else {
      if (response.data[0].DepID === null) {
        setSource_Department('ROD')
        setSource_BU('Oil')
      } else if (response.data[0].DepID === 1) {
        setSource_Department('ITO')
        setSource_BU('Center')
      }
      else if (response.data[0].DepID === 2) {
        setSource_Department('AFD')
        setSource_BU('Center')
      }
      else if (response.data[0].DepID === 3) {
        setSource_Department('ROD')
        if(response.data[0].branchid !=901){
          setSource_BU('Oil')
        }else{
          setSource_BU('Center')
        }
      }
      else if (response.data[0].DepID === 4) {
        setSource_Department('SSD')
        setSource_BU('Center')
      }
      else if (response.data[0].DepID === 5) {
        setSource_Department('HRD')
        setSource_BU('Center')
      }
      else if (response.data[0].DepID === 6) {
        setSource_Department('GAD')
        setSource_BU('Center')
      }
      else if (response.data[0].DepID === 7) {
        setSource_Department('SLD')
        setSource_BU('Center')
      }
      else if (response.data[0].DepID === 8) {
        setSource_Department('MMD')
        setSource_BU('Center')
      }
      else if (response.data[0].DepID === 9) {
        setSource_Department('PMD')
        setSource_BU('Center')
      }
      else if (response.data[0].DepID === 10) {
        setSource_Department('SCD')
        setSource_BU('Center')
      }
      else if (response.data[0].DepID === 11) {
        setSource_Department('BDO')
        setSource_BU('Center')
      }
      else if (response.data[0].DepID === 12) {
        setSource_Department('MDO')
        setSource_BU('Center')
      }
      else if (response.data[0].DepID === 14) {
        setSource_Department('CSO')
        setSource_BU('Center')
      }
      else if (response.data[0].DepID === 15) {
        setSource_Department('MMD2')
        setSource_BU('Center')
      }
    }
  };

  //Des
  const handleChangeDes_Department = (event) => {
    event.preventDefault();
    setDes_Department(event.target.value);
  };

  const handleDes_ChangeBU = (event) => {
    event.preventDefault();
    setDes_BU(event.target.value);
  };

  const handleChangeDes_delivery2 = (event) => {
    event.preventDefault();
    setDes_delivery(event.target.value);
  };

  const handleChangeDes_Description = (event) => {
    event.preventDefault();
    setDes_Description(event.target.value);
  };

  const handleNext = async () => {
    if (!source || !source_Department || !source_BU || !sourceDate) {
      swal("แจ้งเตือน", 'กรุณากรอกข้อมูลผู้ยื่นคำร้องให้ครบถ้วน', "warning", {
          buttons: false,
          timer: 2000,
        })
    } else {
      let checkValue_BV = []
      for (let i = 0; i < serviceList.length; i++) {
        checkValue_BV[i] = serviceList[i].priceSeals
      }
      if (!serviceList[0].assetsCode || checkValue_BV.includes('') === true) {
        swal("แจ้งเตือน", 'กรุณากรอกข้อมูลทรัพย์สินให้ครบถ้วน', "warning", {
          buttons: false,
          timer: 2000,
        })
      } else {
        const checkBookValue_is_null = []
        for (let i = 0; i < serviceList.length; i++) {
          checkBookValue_is_null[i] = serviceList[i].priceSeals
        }
        if (checkBookValue_is_null.includes('') !== true) {
          const usercode = data.UserCode
          const worktype = nac_type
          const sumPrice = result
          const response = await Store_FA_control_create_doc({
            usercode,
            worktype,
            des_Department,
            des_BU,
            des_delivery,
            des_deliveryDate,
            source_Department,
            source_BU,
            source,
            sourceDate,
            des_Description,
            source_Description,
            sumPrice,
          });
          if ('data' in response) {
            for (let i = 0; i < serviceList.length; i++) {
              const nac_code = response.data[0].nac_code // ได้จาก Response ของ Store_FA_control_create_doc
              const nacdtl_row = i
              const nacdtl_assetsCode = serviceList[i].assetsCode
              const nacdtl_assetsName = serviceList[i].name
              const nacdtl_assetsSeria = serviceList[i].serialNo
              const nacdtl_assetsDtl = serviceList[i].dtl
              const nacdtl_assetsCount = serviceList[i].count
              const nacdtl_assetsPrice = serviceList[i].price
              const nacdtl_date_asset = serviceList[i].date_asset
              const responseDTL = await store_FA_control_creat_Detail({
                usercode,
                nac_code,
                nacdtl_row,
                nacdtl_assetsCode,
                nacdtl_assetsName,
                nacdtl_assetsSeria,
                nacdtl_assetsDtl,
                nacdtl_assetsCount,
                nacdtl_assetsPrice,
                nacdtl_date_asset,
              });
              if ('data' in responseDTL) {
                const nacdtl_bookV = !serviceList[i].bookValue ? undefined : serviceList[i].bookValue
                const nacdtl_PriceSeals = !serviceList[i].priceSeals ? undefined : serviceList[i].priceSeals
                const nacdtl_profit = !serviceList[i].profit ? undefined : serviceList[i].profit
                const asset_id = responseDTL.data[i].nacdtl_id
                const nac_status = 1
                await store_FA_control_updateDTL_seals({
                  usercode,
                  nac_code,
                  nac_status,
                  nac_type,
                  nacdtl_bookV,
                  nacdtl_PriceSeals,
                  nacdtl_profit,
                  asset_id,
                  nacdtl_assetsCode
                });
              } else {
                swal("ล้มเหลว", 'สร้างเอกสารผิดพลาด', "error", {
          buttons: false,
          timer: 2000,
        })
              }
            }
            swal("ทำรายการสำเร็จ", 'สร้างรายการเปลี่ยนแปลงทรัพย์สิน ' + response.data[0].nac_code + ' แล้ว', "success", {
              buttons: false,
              timer: 2000,
            }).then((value) => {
              navigate('/NAC_ROW')
            });
          } else {
            swal("ทำรายการไม่สำเร็จ", 'กรุณาลองใหม่ภายหลัง', "error", {
          buttons: false,
          timer: 2000,
        })
          }
        } else {
          swal("แจ้งเตือน", 'กรุณากรอกราคาขายของทรัพย์สินให้ครบถ้วน', "warning")
        }
      }
    }
    //navigate("/NAC_CREATE_MAIN1/NAC_CREATE_MAIN1_STEP2")
  };


  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
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
                การเปลี่ยนแปลงทรัพย์สินถาวร
              </Typography>
            </AnimatedPage>
          </Toolbar>
        </AppBar>
        <AnimatedPage>
          <Container component="main" maxWidth="lg" sx={{ mb: 12 }}>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
              <Grid container sx={{ pb: 1 }}>
                <Grid xs={2}>
                </Grid>
                <Grid xs={8}>
                  <Typography component="h1" variant="h4" align="center">
                    <b>PURE THAI ENERGY CO.,LTD.</b>
                  </Typography>
                  <Typography sx={{ mb: 1 }} component="h1" variant="h6" align="center" className='pt-2'>
                    เปลี่ยนแปลงรายการทรัพย์สินถาวร (Notice of Asset Change - NAC)
                  </Typography>
                </Grid>
                <Grid xs={2}>
                  <TableContainer component={Paper}>
                    <Table aria-label="customized table" style={{ width: '100%' }}>
                      <TableBody>
                        <StyledTableCell align="center" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa" }} >
                          <TextField
                            required
                            fullWidth
                            disabled
                            name='nac_id'
                            sx={{ pt: 1 }}
                            variant="standard"
                          />
                        </StyledTableCell>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
              <React.Fragment>
                <Typography sx={{ pb: 1, pt: 1 }} color='error'>
                  * กรุณากรอกข้อมูลสำหรับขายทรัพย์สิน
                </Typography>
                <TableContainer component={Paper}>
                  <Table aria-label="customized table" style={{ width: '100%' }}>
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align="center" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa", width: '40%' }}>ประเภทการเปลี่ยนแปลง</StyledTableCell>
                        <StyledTableCell align="center" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa", width: '30%' }}>หน่วยงานที่ยื่นคำร้อง</StyledTableCell>
                        <StyledTableCell align="center" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa", width: '30%' }}>หน่วยงานที่รับคำร้อง</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <React.Fragment>
                      <TableBody>
                        <StyledTableRow>
                          <StyledTableCell align="center" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa" }}>
                            <FormGroup>
                              <center>
                                <Typography variant='h4'>
                                  ขายทรัพย์สิน
                                </Typography>
                              </center>
                            </FormGroup>
                          </StyledTableCell>
                          <StyledTableCell align="center" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa" }}>
                            <React.Fragment>
                              <Grid container>
                                <Grid xs={6}>
                                  <Typography align='center' color="inherit" noWrap>
                                    Department
                                  </Typography>
                                </Grid>
                                <Grid xs={6}>
                                  <Typography align='center' color="inherit" noWrap>
                                    BU
                                  </Typography>
                                </Grid>
                              </Grid>
                              <Stack
                                direction="row"
                                divider={<Divider orientation="vertical" flexItem />}
                                spacing={1}
                                sx={{ pt: 1, pb: 1 }}
                              >
                                <TextField
                                  required
                                  fullWidth
                                  name='source_Department'
                                  onChange={handleChangeSource_Department}
                                  value={source_Department}
                                  inputProps={{ style: { textAlign: 'center' } }}
                                  variant="standard"
                                />
                                <TextField
                                  required
                                  fullWidth
                                  onChange={handleChangeSource_BU}
                                  name='source_Department'
                                  value={source_BU}
                                  inputProps={{ style: { textAlign: 'center' } }}
                                  variant="standard"
                                />
                              </Stack>
                              <Autocomplete
                                freeSolo
                                name='source'
                                id='source'
                                options={users_pureDep}
                                getOptionLabel={(option) => option.UserCode}
                                filterOptions={filterOptions2}
                                onChange={handleAutoSource_DeapartMent}
                                value={source}
                                renderInput={(params) =>
                                  <TextField
                                    fullWidth
                                    autoComplete="family-name"
                                    onChange={handleChangeSource_delivery2}
                                    value={source}
                                    sx={{ pt: 1 }}
                                    variant="standard"
                                    label='ผู้ยื่นคำร้อง'
                                    {...params}
                                  />}
                              />
                              <LocalizationProvider dateAdapter={DateAdapter}>
                                <DatePicker
                                  inputFormat="yyyy-MM-dd"
                                  onChange={handleChangeSource_deliveryDate}
                                  name='source_Date'
                                  value={!sourceDate ? setSourceDate(datenow) : sourceDate}
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <Typography color="black">
                                          วันที่ยื่นคำร้อง :
                                        </Typography>
                                      </InputAdornment>
                                    ),
                                  }}
                                  renderInput={(params) =>
                                    <TextField
                                      required
                                      fullWidth
                                      autoComplete="family-name"
                                      sx={{ pt: 1 }}
                                      variant="standard"
                                      {...params} />}
                                />
                              </LocalizationProvider>
                              <TextField
                                required
                                fullWidth
                                onChange={handleChangeSource_Description}
                                value={source_Description}
                                name='source_Description'
                                sx={{ pt: 1 }}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <Typography color="black">
                                        หมายเหตุ :
                                      </Typography>
                                    </InputAdornment>
                                  ),
                                }}
                                variant="standard"
                              />
                            </React.Fragment>
                          </StyledTableCell>
                          <StyledTableCell align="center" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa" }}>
                            <React.Fragment>
                              <Grid container>
                                <Grid xs={6}>
                                  <Typography align='center' color="inherit" noWrap>
                                    Department
                                  </Typography>
                                </Grid>
                                <Grid xs={6}>
                                  <Typography align='center' color="inherit" noWrap>
                                    BU
                                  </Typography>
                                </Grid>
                              </Grid>
                              <Stack
                                direction="row"
                                spacing={1}
                                divider={<Divider orientation="vertical" flexItem />}
                                sx={{ pt: 1, pb: 1 }}
                              >
                                <TextField
                                  required
                                  fullWidth
                                  disabled
                                  align="center"
                                  name='des_Department'
                                  variant="standard"
                                  value="none"
                                  inputProps={{ style: { textAlign: 'center' } }}
                                  onChange={handleChangeDes_Department}
                                />
                                <TextField
                                  required
                                  disabled
                                  value="none"
                                  align='center'
                                  name='des_BU'
                                  fullWidth
                                  variant="standard"
                                  inputProps={{ style: { textAlign: 'center' } }}
                                  onChange={handleDes_ChangeBU}
                                />
                              </Stack>
                              <TextField
                                fullWidth
                                disabled
                                autoComplete="family-name"
                                onChange={handleChangeDes_delivery2}
                                value={!des_delivery ? 'none' : des_delivery}
                                sx={{ pt: 1 }}
                                variant="standard"
                                label='ผู้รับคำร้อง'
                              />
                              <TextField
                                required
                                fullWidth
                                disabled
                                name='des_deliveryApprove'
                                value='none'
                                sx={{ pt: 1 }}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <Typography color="black">
                                        วันที่รับคำร้อง :
                                      </Typography>
                                    </InputAdornment>
                                  ),
                                }}
                                variant="standard"
                              />
                              <TextField
                                required
                                fullWidth
                                disabled
                                value='none'
                                name='des_Description'
                                onChange={handleChangeDes_Description}
                                sx={{ pt: 1 }}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <Typography color="black">
                                        หมายเหตุ :
                                      </Typography>
                                    </InputAdornment>
                                  ),
                                }}
                                variant="standard"
                              />
                            </React.Fragment>
                          </StyledTableCell>
                        </StyledTableRow>
                      </TableBody>
                    </React.Fragment>
                  </Table>
                  <Table aria-label="customized table">
                    <TableHead>
                    <TableRow style={{ width: '100%' }}>
                        <StyledTableCell align="center" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa", width: '18%' }} >รหัสทรัพย์สิน</StyledTableCell>
                        <StyledTableCell align="center" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa", width: '12.5%' }} >Serial No.</StyledTableCell>
                        <StyledTableCell align="center" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa", width: '15%' }} >ชื่อ</StyledTableCell>
                        <StyledTableCell align="center" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa", width: '12.5%' }} >วันที่ขึ้นทะเบียน</StyledTableCell>
                        <StyledTableCell align="center" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa", width: '10%' }} >
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <Typography sx={{ pl: 0.5 }}>
                              ต้นทุน
                            </Typography>
                            <IconButton
                              sx={{ backgroundColor: (theme) => theme.palette.grey[200] }}
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {valuesVisibility.showText ? <Visibility fontSize="small" /> : <VisibilityOff fontSize="small" />}
                            </IconButton>
                          </Stack>
                        </StyledTableCell>
                        <StyledTableCell align="center" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa", width: '10%' }} >BV</StyledTableCell>
                        <StyledTableCell align="center" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa", width: '10%' }} >ราคาขาย</StyledTableCell>
                        <StyledTableCell align="center" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa", width: '10%' }} >กำไร/ขาดทุน</StyledTableCell>
                        <StyledTableCell align="center" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa" }} >
                          <IconButton
                            size="large"
                            color='primary'
                            onClick={handleServiceAdd}
                          >
                            <AddBoxIcon />
                          </IconButton>
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                    {serviceList.map((singleService, index) => (
                      <React.Fragment>
                        <TableBody>
                          <StyledTableRow>
                            <StyledTableCell align="center" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa" }}>
                              <Autocomplete
                                freeSolo
                                key={index}
                                name='assetsCode'
                                id='assetsCode'
                                sx={{
                                  "& .MuiAutocomplete-input, & .MuiInputLabel-root": {
                                    fontSize: 14
                                  }
                                }}
                                ListboxProps={{
                                  sx: { fontSize: 12 }
                                }}
                                options={AllAssetsControl}
                                getOptionLabel={(option) => option.Code}
                                filterOptions={filterOptions}
                                onChange={(e) => handleServiceChangeHeader(e, index)}
                                value={singleService.service}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    variant="standard"
                                    key={index}
                                    name='assetsCode'
                                    id='assetsCode'
                                    //onChange={(e) => handleServiceChange(e, index)}
                                    value={singleService.service}
                                  />
                                )}
                              />
                            </StyledTableCell>
                            <StyledTableCell align="center" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa" }}>
                              <TextField
                                fullWidth
                                key={index}
                                name="serialNo"
                                id="serialNo"
                                inputProps={{ style: { fontSize: 14 } }}
                                //onChange={(e) => handleServiceChange(e, index)}
                                value={serviceList[index].serialNo}
                                // value={serviceList[index].serialNo}
                                variant="standard"
                              />
                            </StyledTableCell>
                            <StyledTableCell align="center" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa" }}>
                              <TextField
                                fullWidth
                                key={index}
                                name="name"
                                id="name"
                                //onChange={(e) => handleServiceChange(e, index)}
                                inputProps={{ style: { fontSize: 14 } }}
                                value={serviceList[index].name}
                                variant="standard"
                              />
                            </StyledTableCell>
                            <StyledTableCell align="center" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa" }}>
                              <TextField
                                fullWidth
                                key={index}
                                name="date_asset"
                                id="date_asset"
                                inputProps={{ style: { textAlign: 'center', fontSize: 14 } }}
                                value={!serviceList[index].date_asset ? '' : serviceList[index].date_asset.split('T')[0]}
                                variant="standard"
                              />
                            </StyledTableCell>
                            <StyledTableCell align="center" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa" }}>
                              <TextField
                                fullWidth
                                key={index}
                                name="price"
                                id="price"
                                type={valuesVisibility.showText ? "text" : "password"}
                                // onChange={(e) => handleServiceChange(e, index)}
                                value={!serviceList[index].price ? '' : (serviceList[index].price).toLocaleString()}
                                inputProps={{ style: { textAlign: 'center', fontSize: 14 } }}
                                variant="standard"
                              />
                            </StyledTableCell>
                            <StyledTableCell align="center" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa" }}>
                              <TextField
                                fullWidth
                                disabled
                                key={index}
                                value='none'
                                name="bookValue"
                                id="bookValue"
                                type={valuesVisibility.showText ? "text" : "password"}
                                inputProps={{ style: { textAlign: 'center', fontSize: 14 } }}
                                variant="standard"
                              />
                            </StyledTableCell>
                            <StyledTableCell align="center" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa" }}>
                              <TextField
                                fullWidth
                                key={index}
                                value={singleService.service}
                                onChange={(e) => handleServiceChange(e, index)}
                                name="priceSeals"
                                id="priceSeals"
                                inputProps={{ style: { textAlign: 'center', fontSize: 14 } }}
                                variant="standard"
                              />
                            </StyledTableCell>
                            <StyledTableCell align="center" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa" }}>
                              <TextField
                                fullWidth
                                disabled
                                key={index}
                                value='none'
                                type={valuesVisibility.showText ? "text" : "password"}
                                name="profit"
                                id="profit"
                                inputProps={{ style: { textAlign: 'center', fontSize: 14 } }}
                                variant="standard"
                              />
                            </StyledTableCell>
                            <StyledTableCell align="center" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa" }}>
                              {serviceList.length !== 0 && (
                                <IconButton
                                  size="large"
                                  aria-label="delete"
                                  color="error"
                                  onClick={serviceList.length === 1 ? false : () => handleServiceRemove(index)}
                                >
                                  <DeleteIcon fontSize="inherit" />
                                </IconButton>
                              )}
                            </StyledTableCell>
                          </StyledTableRow>
                        </TableBody>
                      </React.Fragment>
                    ))}
                  </Table>
                  <Table aria-label="customized table" style={{ width: '100%' }}>
                    <TableBody>
                      <StyledTableRow>
                        <StyledTableCell align="start" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa", width: '55%' }}>
                          <Typography>
                            มูลค่ารวมทั้งหมด
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell align="center" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa", width: '45%' }}>
                          <TextField
                            required
                            fullWidth
                            type={valuesVisibility.showText ? "text" : "password"}
                            value={result.toLocaleString() === 0 ? '' : result.toLocaleString()}
                            inputProps={{ style: { textAlign: 'center' } }}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="start">
                                  <Typography color="black">
                                    บาท
                                  </Typography>
                                </InputAdornment>
                              ),
                            }}
                            variant="standard"
                          />
                        </StyledTableCell>
                      </StyledTableRow>
                    </TableBody>
                  </Table>
                  <Table aria-label="customized table" style={{ width: '100%' }}>
                    <TableHead>
                      <StyledTableRow>
                        <StyledTableCell align="left" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa", width: '25%' }} >
                          <TextField
                            required
                            fullWidth
                            disabled
                            sx={{ pt: 1 }}
                            InputProps={{
                              startAdornment: (
                                <React.Fragment>
                                  <Stack direction="row"
                                    justifyContent="space-evenly"
                                    alignItems="center"
                                    spacing={0}>
                                    <InputAdornment position="start">
                                      <Typography color="black" >
                                        ผู้จัดทำ :
                                      </Typography>
                                    </InputAdornment>
                                    <InputAdornment position="start">
                                      <Typography color="black" >
                                        [{data.UserCode}]
                                      </Typography>
                                    </InputAdornment>
                                    <InputAdornment position="start">
                                      <Typography color="black" >
                                        {datenow.split('T')[0]}
                                      </Typography>
                                    </InputAdornment>
                                  </Stack>
                                </React.Fragment>
                              ),
                            }}
                            variant="standard"
                          />
                        </StyledTableCell>
                        <StyledTableCell align="left" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa", width: '25%' }}>
                          <TextField
                            required
                            fullWidth
                            disabled
                            name='sourceApprove'
                            sx={{ pt: 1 }}
                            InputProps={{
                              startAdornment: (
                                <React.Fragment>
                                  <Stack direction="row"
                                    justifyContent="space-evenly"
                                    alignItems="center"
                                    spacing={0}>
                                    <InputAdornment position="start">
                                      <Typography color="black">
                                        ผู้ตรวจสอบ :
                                      </Typography>
                                    </InputAdornment>
                                    <InputAdornment position="start">
                                      <Typography style={{ 'color': 'black' }}>
                                        none
                                      </Typography>
                                    </InputAdornment>
                                    <InputAdornment position="start">
                                      <Typography color="black">

                                      </Typography>
                                    </InputAdornment>
                                  </Stack>
                                </React.Fragment>
                              ),
                            }}
                            variant="standard"
                          />
                        </StyledTableCell>
                        <StyledTableCell align="left" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa", width: '25%' }}>
                          <TextField
                            required
                            fullWidth
                            disabled
                            sx={{ pt: 1 }}
                            InputProps={{
                              startAdornment: (
                                <React.Fragment>
                                  <Stack direction="row"
                                    justifyContent="space-evenly"
                                    alignItems="center"
                                    spacing={0}>
                                    <InputAdornment position="start">
                                      <Typography color="black">
                                        ผู้อนุมัติ :
                                      </Typography>
                                    </InputAdornment>
                                    <InputAdornment position="start">
                                      <Typography color="black">
                                        none
                                      </Typography>
                                    </InputAdornment>
                                    <InputAdornment position="start">
                                      <Typography color="black">

                                      </Typography>
                                    </InputAdornment>
                                  </Stack>
                                </React.Fragment>
                              ),
                            }}
                            variant="standard"
                          />
                        </StyledTableCell>
                        <StyledTableCell align="left" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa", width: '25%' }} >
                          <TextField
                            required
                            fullWidth
                            disabled
                            sx={{ pt: 1 }}
                            InputProps={{
                              startAdornment: (
                                <React.Fragment>
                                  <Stack direction="row"
                                    justifyContent="space-evenly"
                                    alignItems="center"
                                    spacing={0}>
                                    <InputAdornment position="start">
                                      <Typography color="black" >
                                        บัญชี/การเงิน :
                                      </Typography>
                                    </InputAdornment>
                                    <InputAdornment position="start">
                                      <Typography color="black" >
                                        none
                                      </Typography>
                                    </InputAdornment>
                                  </Stack>
                                </React.Fragment>
                              ),
                            }}
                            variant="standard"
                          />
                        </StyledTableCell>
                      </StyledTableRow>
                    </TableHead>
                  </Table>
                </TableContainer>
              </React.Fragment>
              <React.Fragment>
                <center>
                  <Box>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      endIcon={<BorderColorRoundedIcon/>}
                      sx={{ my: { xs: 3, md: 4 }, p: { xs: 2, md: 2 } }}
                    >
                      สร้างเอกสาร
                    </Button>
                  </Box>
                </center>
              </React.Fragment>
            </Paper>
            <Copyright />
          </Container>
        </AnimatedPage>
      </ThemeProvider>
      <Outlet />
    </React.Fragment >
  );
}