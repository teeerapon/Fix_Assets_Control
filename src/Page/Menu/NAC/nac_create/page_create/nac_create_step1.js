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
import AnimatedPage from '../../../../../AnimatedPage';
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
  return fetch('http://192.168.220.1:32001/api/SelectDTL_Control', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

async function SelectAssetsControl(credentials) {
  return fetch('http://192.168.220.1:32001/api/AssetsAll_Control', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

async function AutoDeapartMent(credentials) {
  return fetch('http://192.168.220.1:32001/api/AutoDeapartMent', {
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
  return fetch('http://192.168.220.1:32001/api/store_FA_control_create_doc', {
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
  return fetch('http://192.168.220.1:32001/api/store_FA_control_creat_Detail', {
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

  const [serviceList, setServiceList] = React.useState([{ assetsCode: "", serialNo: "", name: "", dtl: "", count: "", price: "" }]);
  const [serviceList_Main, setServiceList_Main] = React.useState([{ assetsCode: "", serialNo: "", name: "", dtl: "", count: "", price: "" }])
  const result = serviceList.reduce((total, serviceList) => total = total + serviceList.price * serviceList.count, 0);
  const navigate = useNavigate();
  const data = JSON.parse(localStorage.getItem('data'));
  const [AllAssetsControl, setAllAssetsControl] = React.useState([]);
  const [UserForAssetsControl, setUserForAssetsControl] = React.useState([]);
  const [valuesVisibility, setValuesVisibility] = React.useState({
    text: serviceList[0].price,
    showText: false,
  });
  const nac_type = 1;


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
  const [des_deliveryDate, setDes_deliveryDate] = React.useState();
  const [des_deliveryApprove, setDes_deliveryApprove] = React.useState();
  const [des_deliveryApproveDate, setDes_deliveryApproveDate] = React.useState();
  const [des_Description, setDes_Description] = React.useState();

  // ส่วนของผู้ส่ง
  const [source_Department, setSource_Department] = React.useState('AFD');
  const [source_BU, setSource_BU] = React.useState('Center');
  const [source, setSource] = React.useState('SSP');
  const [sourceDate, setSourceDate] = React.useState(datenow);
  const [sourceApprove, setSource_Approve] = React.useState('SSP');
  const [sourceDateApproveDate, setSource_DateApproveDate] = React.useState(datenow);
  const [source_Description, setSource_Description] = React.useState();

  const fetchUserForAssetsControl = async () => {
    const { data } = await Axios.get(
      "http://192.168.220.1:32001/api/getsUserForAssetsControl"
    );
    const UserForAssetsControl = data;
    setUserForAssetsControl(UserForAssetsControl.data);
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
    setServiceList([...serviceList, { assetsCode: "", serialNo: "", name: "", dtl: "", count: "", price: "" }]);
    setServiceList_Main([...serviceList_Main, { assetsCode: "", serialNo: "", name: "", dtl: "", count: "", price: "" }]);
  };

  const handleServiceRemove = (index) => {
    const list = [...serviceList];
    list.splice(index, 1);
    setServiceList(list);

    const list_main = [...serviceList_Main];
    list_main.splice(index, 1);
    setServiceList_Main(list_main);
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
        setServiceList(list);
      }
    }

    const list_main = [...serviceList_Main];
    list_main[index][name] = value;
    list_main[index]['assetsCode'] = assetsCodeSelect;
    if (list[index]['assetsCode'] === null || list[index]['assetsCode'] === undefined) {
      list_main[index]['assetsCode'] = ''
      list_main[index]['name'] = ''
      list_main[index]['dtl'] = ''
      list_main[index]['count'] = ''
      list_main[index]['serialNo'] = ''
      list_main[index]['price'] = ''
      setServiceList_Main(list_main);
    } else {
      const Code = list[index]['assetsCode'];
      const response = await SelectDTL_Control({
        Code
      });
      if (response['data'].length !== 0) {
        list_main[index]['name'] = response['data'][0].Name
        list_main[index]['dtl'] = response['data'][0].Details
        list_main[index]['count'] = 1
        list_main[index]['serialNo'] = response['data'][0].SerialNo
        list_main[index]['price'] = response['data'][0].Price
        setServiceList_Main(list_main);
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
    console.log(newValue)
  };

  const handleChangeSource_deliveryApprove = (event) => {
    event.preventDefault();
    setSource_Approve(event.target.value);
  };

  const handleChangeSource_deliveryApproveDate = (newValue) => {
    setSource_DateApproveDate(newValue);
    console.log(newValue)
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
        setSource_Department('CO')
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
        setSource_BU('Center')
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

  const handleChangeDes_deliveryDate = (newValue) => {
    setDes_deliveryDate(newValue);
    console.log(newValue)
  };

  const handleChangeDes_deliveryApprove = (event) => {
    event.preventDefault();
    setDes_deliveryApprove(event.target.value);
  };

  const handleChangeDes_deliveryApproveDate = (newValue) => {
    setDes_deliveryApproveDate(newValue);
    console.log(newValue)
  };

  const handleChangeDes_Description = (event) => {
    event.preventDefault();
    setDes_Description(event.target.value);
  };

  const handleAutoDes_DeapartMent = async (e, index) => {
    const UserCode = e.target.innerText
    const response = await AutoDeapartMent({
      UserCode
    });
    setDes_delivery(UserCode)
    if (!UserCode) {
      setDes_Department('')
      setDes_BU('')
    } else {
      if (response.data[0].DepID === null) {
        setDes_Department('CO')
        setDes_BU('Oil')
      } else if (response.data[0].DepID === 1) {
        setDes_Department('ITO')
        setDes_BU('Center')
      }
      else if (response.data[0].DepID === 2) {
        setDes_Department('AFD')
        setDes_BU('Center')
      }
      else if (response.data[0].DepID === 3) {
        setDes_Department('ROD')
        setDes_BU('Center')
      }
      else if (response.data[0].DepID === 4) {
        setDes_Department('SSD')
        setDes_BU('Center')
      }
      else if (response.data[0].DepID === 5) {
        setDes_Department('HRD')
        setDes_BU('Center')
      }
      else if (response.data[0].DepID === 6) {
        setDes_Department('GAD')
        setDes_BU('Center')
      }
      else if (response.data[0].DepID === 7) {
        setDes_Department('SLD')
        setDes_BU('Center')
      }
      else if (response.data[0].DepID === 8) {
        setDes_Department('MMD')
        setDes_BU('Center')
      }
      else if (response.data[0].DepID === 9) {
        setDes_Department('PMD')
        setDes_BU('Center')
      }
      else if (response.data[0].DepID === 10) {
        setDes_Department('SCD')
        setDes_BU('Center')
      }
      else if (response.data[0].DepID === 11) {
        setDes_Department('BDO')
        setDes_BU('Center')
      }
      else if (response.data[0].DepID === 12) {
        setDes_Department('MDO')
        setDes_BU('Center')
      }
      else if (response.data[0].DepID === 14) {
        setDes_Department('CSO')
        setDes_BU('Center')
      }
      else if (response.data[0].DepID === 15) {
        setDes_Department('MMD2')
        setDes_BU('Center')
      }
    }
  };

  const handleNext = async () => {
    if (!source && !source_Department && !source_BU && !sourceDate || !des_delivery) {
      swal("แจ้งเตือน", 'กรุณากรอกข้อมูลผู้ส่งมอบให้ครบถ้วน', "warning");
    } else {
      if (!serviceList[0].assetsCode) {
        swal("แจ้งเตือน", 'กรุณากรอกข้อมูลทรัพย์สินให้ครบถ้วน', "warning");
      } else {
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
            });
            if ('data' in responseDTL) {
              swal("ทำรายการสำเร็จ", 'สร้างรายการเปลี่ยนแปลงทรัพย์สิน ' + responseDTL.data[0].nac_code + ' แล้ว', "success", {
                buttons: false,
                timer: 2000,
              }).then((value) => {
                navigate('/NAC_ROW')
              });
            } else {
              swal("ล้มเหลว", 'สร้างเอกสารผิดพลาด', "error");
            }
          }
        } else {
          swal("ทำรายการไม่สำเร็จ", 'กรุณาลองใหม่ภายหลัง', "error");
        }
      }
    }
    //navigate("/NAC_CREATE_MAIN1/NAC_CREATE_MAIN1_STEP2")
  };

  if (data.UserCode === 'PTEC83') {
    return (
      swal("ทำรายการไม่สำเร็จ", 'คุณไม่ได้รับอนุญาตให้ทำรายการนี้', "error", {
        buttons: false,
        timer: 2000,
      }).then((value) => {
        window.location.href = "/HomePage";
      })
    );
  } else {
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
                    * กรุณากรอกข้อมูลสำหรับเพิ่มบัญชีทรัพย์สินถาวร
                  </Typography>
                  <TableContainer component={Paper}>
                    <Table aria-label="customized table" style={{ width: '100%' }}>
                      <TableHead>
                        <TableRow>
                          <StyledTableCell align="center" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa", width: '40%' }}>ประเภทการเปลี่ยนแปลง</StyledTableCell>
                          <StyledTableCell align="center" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa", width: '30%' }}>หน่วยงานที่ส่งมอบ</StyledTableCell>
                          <StyledTableCell align="center" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa", width: '30%' }}>หน่วยงานที่รับมอบ</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <React.Fragment>
                        <TableBody>
                          <StyledTableRow>
                            <StyledTableCell align="center" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa" }}>
                              <FormGroup>
                                <center>
                                  <Typography variant='h4' color='primary'>
                                    เพิ่มบัญชีทรัพย์สินถาวร
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
                                <TextField
                                  required
                                  fullWidth
                                  name='source'
                                  id='source'
                                  label='ผู้ส่งมอบ'
                                  sx={{ pt: 1 }}
                                  value={source}
                                  variant="standard"
                                />
                                <LocalizationProvider dateAdapter={DateAdapter}>
                                  <DatePicker
                                    inputFormat="yyyy-MM-dd"
                                    onChange={handleChangeSource_deliveryDate}
                                    name='source_Date'
                                    value={sourceDate}
                                    InputProps={{
                                      startAdornment: (
                                        <InputAdornment position="start">
                                          <Typography color="black">
                                            วันที่ส่งมอบ :
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
                                  disabled
                                  onChange={handleChangeSource_deliveryApprove}
                                  value={sourceApprove}
                                  name='source_Approve'
                                  sx={{ pt: 1 }}
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <Typography color="black">
                                          ผู้ตรวจสอบ :
                                        </Typography>
                                      </InputAdornment>
                                    ),
                                  }}
                                  variant="standard"
                                />
                                <LocalizationProvider dateAdapter={DateAdapter}>
                                  <DatePicker
                                    inputFormat="yyyy-MM-dd"
                                    onChange={handleChangeSource_deliveryApproveDate}
                                    value={sourceDateApproveDate}
                                    disabled
                                    name='source_ApproveDate'
                                    InputProps={{
                                      startAdornment: (
                                        <InputAdornment position="start">
                                          <Typography color="black">
                                            วันที่ตรวจสอบ :
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
                                    align="center"
                                    name='des_Department'
                                    variant="standard"
                                    value={des_Department}
                                    inputProps={{ style: { textAlign: 'center' } }}
                                    onChange={handleChangeDes_Department}
                                  />
                                  <TextField
                                    required
                                    align='center'
                                    name='des_BU'
                                    fullWidth
                                    variant="standard"
                                    value={des_BU}
                                    inputProps={{ style: { textAlign: 'center' } }}
                                    onChange={handleDes_ChangeBU}
                                  />
                                </Stack>
                                <Autocomplete
                                  freeSolo
                                  name='des_delivery'
                                  id='delivery'
                                  options={UserForAssetsControl}
                                  getOptionLabel={(option) => option.UserCode}
                                  filterOptions={filterOptions2}
                                  value={des_delivery}
                                  onChange={handleAutoDes_DeapartMent}
                                  renderInput={(params) =>
                                    <TextField
                                      fullWidth
                                      autoComplete="family-name"
                                      onChange={handleChangeDes_delivery2}
                                      value={des_delivery}
                                      sx={{ pt: 1 }}
                                      variant="standard"
                                      label='ผู้รับมอบ'
                                      {...params}
                                    />}
                                />
                                <LocalizationProvider dateAdapter={DateAdapter}>
                                  <DatePicker
                                    inputFormat="yyyy-MM-dd"
                                    value={des_deliveryDate}
                                    disabled
                                    name='des_deliveryDate'
                                    InputProps={{
                                      startAdornment: (
                                        <InputAdornment position="start">
                                          <Typography color="black">
                                            วันที่รับมอบ :
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
                                  disabled
                                  name='des_deliveryApprove'
                                  value={des_deliveryApprove}
                                  onChange={handleChangeDes_deliveryApprove}
                                  sx={{ pt: 1 }}
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <Typography color="black">
                                          ผู้ตรวจสอบ :
                                        </Typography>
                                      </InputAdornment>
                                    ),
                                  }}
                                  variant="standard"
                                />
                                <LocalizationProvider dateAdapter={DateAdapter}>
                                  <DatePicker
                                    inputFormat="yyyy-MM-dd"
                                    value={des_deliveryApproveDate}
                                    disabled
                                    name='des_deliveryApproveDate'
                                    InputProps={{
                                      startAdornment: (
                                        <InputAdornment position="start">
                                          <Typography color="black">
                                            วันที่ตรวจสอบ :
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
                                  disabled
                                  value='ไม่อนุญาต'
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
                          <StyledTableCell align="center" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa", width: '20%' }} >รหัสทรัพย์สิน</StyledTableCell>
                          <StyledTableCell align="center" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa", width: '15%' }} >Serial No.</StyledTableCell>
                          <StyledTableCell align="center" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa", width: '20%' }} >ชื่อ</StyledTableCell>
                          <StyledTableCell align="center" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa", width: '20%' }} >รายละเอียด</StyledTableCell>
                          <StyledTableCell align="center" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa" }} >จำนวน</StyledTableCell>
                          <StyledTableCell align="center" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa", width: '10%' }} >
                            <Stack direction="row" alignItems="center" spacing={1}>
                              <Typography>
                                ราคา
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
                              <StyledTableCell align="left" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa" }}>
                                <Autocomplete
                                  freeSolo
                                  sx={{ pt: 1 }}
                                  key={index}
                                  name='assetsCode'
                                  id='assetsCode'
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
                                  sx={{ pt: 1 }}
                                  key={index}
                                  name="serialNo"
                                  id="serialNo"
                                  inputProps={{ style: { textAlign: 'center' } }}
                                  onChange={(e) => handleServiceChange(e, index)}
                                  value={serviceList[index].serialNo}
                                  variant="standard"
                                />
                              </StyledTableCell>
                              <StyledTableCell align="center" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa" }}>
                                <TextField
                                  sx={{ pt: 1 }}
                                  fullWidth
                                  key={index}
                                  name="name"
                                  id="name"
                                  onChange={(e) => handleServiceChange(e, index)}
                                  value={serviceList[index].name}
                                  variant="standard"
                                />
                              </StyledTableCell>
                              <StyledTableCell align="center" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa" }}>
                                <TextField
                                  sx={{ pt: 1 }}
                                  fullWidth
                                  key={index}
                                  name="dtl"
                                  id="dtl"
                                  onChange={(e) => handleServiceChange(e, index)}
                                  value={serviceList[index].dtl}
                                  variant="standard"
                                />
                              </StyledTableCell>
                              <StyledTableCell align="center" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa" }}>
                                <TextField
                                  fullWidth
                                  key={index}
                                  sx={{ pt: 1 }}
                                  name="count"
                                  id="count"
                                  type='number'
                                  onChange={(e) => handleServiceChange(e, index)}
                                  value={serviceList[index].count}
                                  inputProps={{ style: { textAlign: 'center' } }}
                                  InputProps={{ inputProps: { min: 1 } }}
                                  variant="standard"
                                />
                              </StyledTableCell>
                              <StyledTableCell align="center" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa" }}>
                                <TextField
                                  sx={{ pt: 1 }}
                                  fullWidth
                                  key={index}
                                  name="price"
                                  id="price"
                                  type={valuesVisibility.showText ? "text" : "password"}
                                  onChange={(e) => handleServiceChange(e, index)}
                                  value={!serviceList[index].price ? (serviceList[index].price).toLocaleString() : (serviceList[index].price).toLocaleString()}
                                  inputProps={{ style: { textAlign: 'center' } }}
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
                          <StyledTableCell align="start" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa", width: '75%' }}>
                            <Typography>
                              มูลค่ารวมทั้งหมด
                            </Typography>
                          </StyledTableCell>
                          <StyledTableCell align="center" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa", width: '25%' }}>
                            <TextField
                              required
                              fullWidth
                              type={valuesVisibility.showText ? "text" : "password"}
                              value={result.toLocaleString() === 0 ? '' : result.toLocaleString()}
                              inputProps={{ style: { textAlign: 'center', color: 'red' } }}
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
                              value={data.UserCode}
                              sx={{ pt: 1 }}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <Typography color="black">
                                      ผู้จัดทำ :
                                    </Typography>
                                  </InputAdornment>
                                ),
                              }}
                              variant="standard"
                            />
                          </StyledTableCell>
                          <StyledTableCell align="left" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa", width: '25%' }}>
                            <LocalizationProvider dateAdapter={DateAdapter}>
                              <DatePicker
                                inputFormat="yyyy-MM-dd"
                                disabled
                                value={datenow}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <Typography color="black">
                                        วันที่บันทึก :
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
                          </StyledTableCell>
                          <StyledTableCell align="left" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa", width: '25%' }}>
                            <TextField
                              required
                              fullWidth
                              disabled
                              sx={{ pt: 1 }}
                              value='ไม่อนุญาต'
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <Typography color="black">
                                      ผู้อนุมัติ :
                                    </Typography>
                                  </InputAdornment>
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
                              name='verify_approve'
                              value='ไม่อนุญาต'
                              sx={{ pt: 1 }}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <Typography color="black">
                                      วันที่อนุมัติ :
                                    </Typography>
                                  </InputAdornment>
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
}