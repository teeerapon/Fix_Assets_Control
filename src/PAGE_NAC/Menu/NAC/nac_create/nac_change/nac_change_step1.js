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
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import logoPure from '../../../../../image/Picture1.png'
import SummarizeIcon from '@mui/icons-material/Summarize';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import '../../../../../App.css'
import config from '../../../../../config'

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
  stringify: (option) => option.Code,
});

const filterOptions2 = createFilterOptions({
  stringify: (option) => option.UserCode,
});

async function SelectDTL_Control(credentials) {
  return fetch(config.http + '/SelectDTL_Control', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

async function SelectAssetsControl(credentials) {
  return fetch(config.http + '/AssetsAll_Control', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

async function AutoDeapartMent(credentials) {
  return fetch(config.http + '/AutoDeapartMent', {
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
  return fetch(config.http + '/store_FA_control_create_doc', {
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
  return fetch(config.http + '/store_FA_control_creat_Detail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

async function store_FA_control_CheckAssetCode_Process(credentials) {
  return fetch(config.http + '/store_FA_control_CheckAssetCode_Process', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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

  const data = JSON.parse(localStorage.getItem('data'));
  const [nameSource, setNmaeSource] = React.useState();

  const [serviceList, setServiceList] = React.useState([{ assetsCode: "", serialNo: "", name: "", date_asset: "", dtl: "", count: "", price: "" }]);
  const [serviceList_Main, setServiceList_Main] = React.useState([{ assetsCode: "", serialNo: "", name: "", date_asset: "", dtl: "", price: "" }])
  const result = serviceList.map(function (elt) {
    return (/^\d+\.\d+$/.test(elt.price) || /^\d+$/.test(elt.price)) ? parseFloat(elt.price) : 0;
  }).reduce(function (a, b) { // sum all resulting numbers
    return a + b
  })
  const navigate = useNavigate();
  const checkUserWeb = localStorage.getItem('sucurity');
  const dataDepID = data.depid
  const [users_pureDep, setUsers_pureDep] = React.useState([]);
  const [AllAssetsControl, setAllAssetsControl] = React.useState([]);
  const [UserForAssetsControl, setUserForAssetsControl] = React.useState([]);
  const [alert, setAlert] = React.useState(false);
  const [valueAlert, setValueAlert] = React.useState(false);
  const [valuesVisibility, setValuesVisibility] = React.useState({
    text: serviceList[0].price,
    showText: data.branchid === 901 ? true : false,
  });
  const nac_type = 3;


  // const handleClickShowPassword = () => {
  //   setValuesVisibility({ ...valuesVisibility, showText: !valuesVisibility.showText });
  // };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPassword = () => {
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
  // const [des_deliveryApprove, setDes_deliveryApprove] = React.useState('SSP');
  // const [des_deliveryApproveDate, setDes_deliveryApproveDate] = React.useState(datenow);
  const [des_Description, setDes_Description] = React.useState();

  // ส่วนของผู้ส่ง
  const [source_Department, setSource_Department] = React.useState(data.branchid === 901 ? null : data.DepCode);
  const [source_BU, setSource_BU] = React.useState(data.branchid === 901 ? null : 'Oil');
  const [source, setSource] = React.useState(data.branchid === 901 ? null : data.UserCode);
  const [sourceDate, setSourceDate] = React.useState();
  // const [sourceApprove, setSource_Approve] = React.useState();
  // const [sourceDateApproveDate, setSource_DateApproveDate] = React.useState();
  const [source_Description, setSource_Description] = React.useState();

  const fetchUserForAssetsControl = async () => {
    const { data } = await Axios.get(
      config.http + "/getsUserForAssetsControl"
    );
    const UserForAssetsControl = data;
    const users_pure = []
    for (let i = 0; i < UserForAssetsControl.data.length; i++) {
      if (UserForAssetsControl.data[i].DepID === dataDepID) {
        users_pure[i] = UserForAssetsControl.data[i]
      }
    }
    setUsers_pureDep(users_pure)
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
    // 👇️ disable the rule for a single line

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleServiceAdd = () => {
    setServiceList([...serviceList, { assetsCode: "", serialNo: "", name: "", date_asset: "", dtl: "", count: "", price: "" }]);
    setServiceList_Main([...serviceList_Main, { assetsCode: "", serialNo: "", name: "", date_asset: "", dtl: "", price: "" }]);
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
    const nacdtl_assetsCode = e.target.innerText
    const responseCheckAssetCode_Process = await store_FA_control_CheckAssetCode_Process({
      nacdtl_assetsCode
    });
    if (responseCheckAssetCode_Process.data[0].checkProcess === 'false') {
      const alert_value = 'ทรัพย์สินนี้กำลังอยู่ในระหว่างการทำรายการ'
      setAlert(true);
      setValueAlert(alert_value)
      const list = [...serviceList];
      list[index]['assetsCode'] = ''
      list[index]['name'] = ''
      list[index]['dtl'] = ''
      list[index]['count'] = ''
      list[index]['serialNo'] = ''
      list[index]['price'] = ''
      list[index]['date_asset'] = ''
      setServiceList(list);

      const list_main = [...serviceList_Main];
      list_main[index]['assetsCode'] = ''
      list_main[index]['name'] = ''
      list_main[index]['dtl'] = ''
      list_main[index]['serialNo'] = ''
      list_main[index]['price'] = ''
      list_main[index]['date_asset'] = ''
      setServiceList_Main(list_main);
    } else {
      const list = [...serviceList];
      const list_main = [...serviceList_Main];
      list[index][name] = value;
      list[index]['assetsCode'] = assetsCodeSelect;
      if (list[index]['assetsCode'] === null || list[index]['assetsCode'] === undefined) {
        list[index]['assetsCode'] = ''
        list[index]['name'] = ''
        list[index]['dtl'] = ''
        list[index]['count'] = ''
        list[index]['serialNo'] = ''
        list[index]['price'] = ''
        list[index]['date_asset'] = ''
        setServiceList(list);

        list_main[index]['assetsCode'] = ''
        list_main[index]['name'] = ''
        list_main[index]['dtl'] = ''
        list_main[index]['serialNo'] = ''
        list_main[index]['price'] = ''
        list_main[index]['date_asset'] = ''
        setServiceList_Main(list_main)
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
          list[index]['date_asset'] = response['data'][0].CreateDate
          setServiceList(list);

          list_main[index]['name'] = response['data'][0].Name
          list_main[index]['dtl'] = response['data'][0].Details
          list_main[index]['serialNo'] = response['data'][0].SerialNo
          list_main[index]['price'] = response['data'][0].Price
          list_main[index]['date_asset'] = response['data'][0].CreateDate
          setServiceList_Main(list_main)
        }
      }
    }
  };

  function handleGoNAC() {
    navigate('/NAC_ROW')
  }

  //Source

  const handleChangeSource_Department = (event) => {
    event.preventDefault();
    if (data.branchid !== 901) {
      setSource_Department(data.DepCode);
    } else {
      setSource_Department(event.target.value);
    }
  };

  const handleChangeSource_BU = (event) => {
    event.preventDefault();
    if (data.branchid !== 901) {
      setSource_BU('Oil');
    } else {
      setSource_BU(event.target.value);
    }
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
      setNmaeSource('')
    } else {
      if (response.data[0].BranchID !== 901) {
        setSource_Department(response.data[0].DepCode)
        setSource_BU('Oil')
      } else {
        setSource_Department(response.data[0].DepCode)
        setSource_BU('Center')
      }
    }
  };

  const handleChangeSource_Name = (event) => {
    event.preventDefault();
    setNmaeSource(event.target.value);
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
      if (response.data[0].BranchID !== 901) {
        setDes_Department(response.data[0].DepCode)
        setDes_BU('Oil')
      } else {
        setDes_Department(response.data[0].DepCode)
        setDes_BU('Center')
      }
    }
  };

  const handleNext = async () => {
    if (!source || !source_Department || !source_BU || !sourceDate || !nameSource) {
      const alert_value = !source ? 'กรุณากรอกข้อมูลผู้ส่ง' : !source_Department ? 'กรุณากรอกข้อมูลแผนกของผู้ส่ง' :
        !nameSource ? 'กรุณาลงชื่อผู้ส่งมอบ' : 'กรุณากรอกวันที่ของผู้ส่ง'
      setAlert(true);
      setValueAlert(alert_value)
    } else {
      if (!serviceList[0].assetsCode) {
        const alert_value = 'กรุณากรอกข้อมูลทรัพย์สินให้ครบถ้วน'
        setAlert(true);
        setValueAlert(alert_value)
      } else {
        const usercode = data.UserCode
        const worktype = nac_type
        const sumPrice = result
        const nameDes = null
        const response = await Store_FA_control_create_doc({
          usercode,
          worktype,
          des_Department,
          des_BU,
          des_delivery,
          nameDes,
          des_deliveryDate,
          source_Department,
          source_BU,
          source,
          nameSource,
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
              localStorage.setItem('NacCode', JSON.stringify({ nac_code: responseDTL.data[0].nac_code, nac_status: 1 }));
              navigate('/NAC_ROW/NAC_CHANGE_WAIT_APPROVE?' + responseDTL.data[0].nac_code)
            } else {
              swal("ล้มเหลว", 'สร้างเอกสารผิดพลาด', "error")
            }
          }
        } else {
          swal("แจ้งเตือน", 'กรุณาลองใหม่ภายหลัง', "error")
        }
      }
    }
    //navigate("/NAC_CREATE_MAIN1/NAC_CREATE_MAIN1_STEP2")
  };

  let resultIndex = []
  for (let i = 0; i < UserForAssetsControl.length; i++) {
    resultIndex[i] = UserForAssetsControl[i].UserCode;
  }
  resultIndex = [resultIndex]

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlert(false);
  };

  if (checkUserWeb === 'null') {
    window.location.href = '/NAC_MAIN';
  } else {
    return (
      <React.Fragment>
        <Stack spacing={2} sx={{ width: '100%' }}>
          <Snackbar open={alert} autoHideDuration={4500} onClose={handleCloseAlert}>
            <Alert onClose={handleCloseAlert} severity="warning" sx={{ width: '100%' }}>
              {valueAlert}
            </Alert>
          </Snackbar>
        </Stack>
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
              <Box sx={{ width: 1 }}>
                <Box display="grid" gridTemplateColumns="repeat(12, 1fr)">
                  <Box gridColumn="span 10">
                    <AnimatedPage>
                      <Typography variant="h5" color="inherit" sx={{ pt: 1 }}>
                        การเปลี่ยนแปลงทรัพย์สินถาวร
                      </Typography>
                    </AnimatedPage>
                  </Box>
                  <Box gridColumn="span 0">
                    <AnimatedPage>
                      <IconButton sx={{ color: 'rgb(0,0,0)' }} component="label" size="large" onClick={handleGoNAC}>
                        <SummarizeIcon />
                      </IconButton>
                    </AnimatedPage>
                  </Box>
                </Box>
              </Box>
            </Toolbar>
          </AppBar>
          <AnimatedPage>
            <Container component="main" maxWidth="lg" sx={{ mb: 12 }}>
              <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                <Grid container sx={{ pb: 1 }}>
                  <Grid xs={2}>
                    <Box sx={{ flexGrow: 1, justifyContent: 'start' }}>
                      <img style={{ maxWidth: '100%' }} src={logoPure} loading="lazy" />
                    </Box>
                  </Grid>
                  <Grid xs={8}>
                    <Typography component="h1" variant="h4" align="center" className='font-sm font-md'>
                      <b>PURE THAI ENERGY CO.,LTD.</b>
                    </Typography>
                    <Typography sx={{ mb: 1 }} component="h1" variant="h6" align="center" className='pt-2 font-vsm font-vmd'>
                      เปลี่ยนแปลงรายการทรัพย์สินถาวร (Notice of Asset Change - NAC)
                    </Typography>
                  </Grid>
                  <Grid xs={2}>
                    <TableContainer component={Paper}>
                      <Table aria-label="customized table" style={{ width: '100%' }}>
                        <TableBody>
                          <StyledTableCell align="center" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa" }} >
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
                    * กรุณากรอกข้อมูลสำหรับเปลี่ยนแปลงรายละเอียดทรัพย์สิน
                  </Typography>
                  <TableContainer component={Paper}>
                    <Table aria-label="customized table" style={{ width: 1100 }}>
                      <TableHead>
                        <TableRow>
                          <StyledTableCell align="center" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa", width: '40%' }}>ประเภทการเปลี่ยนแปลง</StyledTableCell>
                          <StyledTableCell align="center" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa", width: '30%' }}>หน่วยงานที่ส่งมอบ</StyledTableCell>
                          <StyledTableCell align="center" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa", width: '30%' }}>หน่วยงานที่รับมอบ</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <React.Fragment>
                        <TableBody>
                          <StyledTableRow>
                            <StyledTableCell align="center" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa" }}>
                              <FormGroup>
                                <center>
                                  <Typography variant='h4' color='primary'>
                                    เปลี่ยนแปลงรายละเอียดทรัพย์สิน
                                  </Typography>
                                </center>
                              </FormGroup>
                            </StyledTableCell>
                            <StyledTableCell align="center" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa" }}>
                              <React.Fragment>
                                <Grid container>
                                  <Grid xs={6}>
                                    <Typography align='center' color="inherit" >
                                      Department
                                    </Typography>
                                  </Grid>
                                  <Grid xs={6}>
                                    <Typography align='center' color="inherit" >
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
                                    disabled
                                    inputProps={{ style: { '-webkit-text-fill-color': 'rgba(0,0,0,1)', textAlign: 'center' } }}
                                    variant="standard"
                                  />
                                  <TextField
                                    required
                                    fullWidth
                                    disabled
                                    onChange={handleChangeSource_BU}
                                    name='source_Department'
                                    value={source_BU}
                                    inputProps={{ style: { '-webkit-text-fill-color': 'rgba(0,0,0,1)', textAlign: 'center' } }}
                                    variant="standard"
                                  />
                                </Stack>
                                {data.branchid === 901 ? (
                                  <React.Fragment>
                                    <Autocomplete
                                      freeSolo
                                      name='source'
                                      id='source'
                                      options={users_pureDep}
                                      getOptionLabel={(option) => option.UserCode}
                                      filterOptions={filterOptions2}
                                      onChange={handleAutoSource_DeapartMent}
                                      value={UserForAssetsControl[resultIndex[0].indexOf(source)]}
                                      renderInput={(params) => (
                                        <React.Fragment>
                                          <TextField
                                            {...params}
                                            variant="standard"
                                            label='ผู้ส่งมอบ'
                                            fullWidth
                                            error={valueAlert === 'กรุณากรอกข้อมูลผู้ส่ง' ? true : false}
                                            autoComplete="family-name"
                                            sx={{ pt: 1 }}
                                          />
                                        </React.Fragment>
                                      )}
                                    />
                                    <TextField
                                      variant="standard"
                                      fullWidth
                                      autoComplete="family-name"
                                      inputProps={{ style: { '-webkit-text-fill-color': 'rgba(0,0,0,1)' } }}
                                      onChange={handleChangeSource_Name}
                                      value={nameSource}
                                      error={valueAlert === 'กรุณาลงชื่อผู้ส่งมอบ' ? true : false}
                                      InputProps={{
                                        startAdornment: (
                                          <InputAdornment position="start">
                                            <Typography color="black">
                                              ลงชื่อผู้ส่งมอบ :
                                            </Typography>
                                          </InputAdornment>
                                        ),
                                      }}
                                      sx={{ pt: 1 }}
                                    />
                                  </React.Fragment>
                                ) : (
                                  <React.Fragment>
                                    <TextField
                                      required
                                      fullWidth
                                      name='source'
                                      id='source'
                                      label='ผู้ส่งมอบ'
                                      value={source}
                                      sx={{ pt: 1 }}
                                      variant="standard"
                                    />
                                    <TextField
                                      variant="standard"
                                      fullWidth
                                      autoComplete="family-name"
                                      inputProps={{ style: { '-webkit-text-fill-color': 'rgba(0,0,0,1)' } }}
                                      onChange={handleChangeSource_Name}
                                      value={nameSource}
                                      InputProps={{
                                        startAdornment: (
                                          <InputAdornment position="start">
                                            <Typography color="black">
                                              ลงชื่อผู้ส่งมอบ :
                                            </Typography>
                                          </InputAdornment>
                                        ),
                                      }}
                                      sx={{ pt: 1 }}
                                    />
                                  </React.Fragment>
                                )}
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
                                            วันที่ยืนยัน :
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
                            <StyledTableCell align="center" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa" }}>
                              <React.Fragment>
                                <FormGroup>
                                  <center>
                                    <Typography variant='h4' color='#AAAAAA'>
                                      none
                                    </Typography>
                                  </center>
                                </FormGroup>
                              </React.Fragment>
                            </StyledTableCell>
                          </StyledTableRow>
                        </TableBody>
                      </React.Fragment>
                    </Table>
                    <Table aria-label="customized table" style={{ width: 1100 }}>
                      <TableHead>
                        <TableRow style={{ width: '100%' }}>
                          <StyledTableCell align="center" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa", width: '20%' }} >รหัสทรัพย์สิน</StyledTableCell>
                          <StyledTableCell align="center" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa", width: '20%' }} >Serial No.</StyledTableCell>
                          <StyledTableCell align="center" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa", width: '20%' }} >ชื่อ</StyledTableCell>
                          <StyledTableCell align="center" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa", width: '15%' }} >วันที่ขึ้นทะเบียน</StyledTableCell>
                          <StyledTableCell align="center" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa", width: '15%' }} >สถานะทรัพย์สิน</StyledTableCell>
                          {/* <StyledTableCell align="center" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa" }} >จำนวน</StyledTableCell> */}
                          <StyledTableCell align="center" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa", width: '10%' }} >
                            <Stack direction="row" alignItems="center" spacing={1}>
                              <Typography>
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
                          <StyledTableCell align="center" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa" }} >
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
                              <StyledTableCell align="center" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa" }}>
                                <Autocomplete
                                  freeSolo
                                  sx={{
                                    "& .MuiAutocomplete-input, & .MuiInputLabel-root": {
                                      fontSize: 14
                                    }
                                  }}
                                  key={index}
                                  name='assetsCode'
                                  id='assetsCode'
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
                                      value={singleService.assetsCode}
                                    />
                                  )}
                                />
                              </StyledTableCell>
                              <StyledTableCell align="center" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa" }}>
                                <TextField
                                  fullWidth
                                  key={index}
                                  inputProps={{ style: { '-webkit-text-fill-color': 'rgba(0,0,0,0.5)', textAlign: 'center', fontSize: 14 } }}
                                  disabled
                                  value={serviceList_Main[index].serialNo}
                                  variant="standard"
                                />
                                <TextField
                                  fullWidth
                                  key={index}
                                  name="serialNo"
                                  id="serialNo"
                                  inputProps={{ style: { '-webkit-text-fill-color': 'rgba(0,0,0,1)', textAlign: 'center', fontSize: 14 } }}
                                  onChange={(e) => handleServiceChange(e, index)}
                                  value={singleService.serialNo}
                                  variant="standard"
                                />
                              </StyledTableCell>
                              <StyledTableCell align="center" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa" }}>
                                <TextField
                                  fullWidth
                                  key={index}
                                  inputProps={{ style: { '-webkit-text-fill-color': 'rgba(0,0,0,0.5)', fontSize: 14 } }}
                                  disabled
                                  value={serviceList_Main[index].name}
                                  variant="standard"
                                />
                                <TextField
                                  fullWidth
                                  key={index}
                                  name="name"
                                  id="name"
                                  inputProps={{ style: { '-webkit-text-fill-color': 'rgba(0,0,0,1)', fontSize: 14 } }}
                                  onChange={(e) => handleServiceChange(e, index)}
                                  value={singleService.name}
                                  variant="standard"
                                />
                              </StyledTableCell>
                              <StyledTableCell align="center" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa" }}>
                                <TextField
                                  fullWidth
                                  key={index}
                                  inputProps={{ style: { '-webkit-text-fill-color': 'rgba(0,0,0,0.5)', textAlign: 'center', fontSize: 14 } }}
                                  disabled
                                  value={!serviceList_Main[index].date_asset ? serviceList_Main[index].date_asset : serviceList_Main[index].date_asset.split('T')[0]}
                                  variant="standard"
                                />
                                <TextField
                                  fullWidth
                                  key={index}
                                  name="date_asset"
                                  id="date_asset"
                                  inputProps={{ style: { '-webkit-text-fill-color': 'rgba(0,0,0,1)', textAlign: 'center', fontSize: 14 } }}
                                  value={!singleService.date_asset ? singleService.date_asset : singleService.date_asset.split('T')[0]}
                                  variant="standard"
                                />
                              </StyledTableCell>
                              <StyledTableCell align="start" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa" }}>
                                <FormControl
                                  variant="standard"
                                  fullWidth
                                  size="small"
                                >
                                  <TextField
                                    key={index}
                                    fullWidth
                                    inputProps={{ style: { '-webkit-text-fill-color': 'rgba(0,0,0,0.5)', fontSize: 14 } }}
                                    disabled
                                    value={serviceList_Main[index].dtl}
                                    variant="standard"
                                  />
                                  <Select
                                    key={index}
                                    name="dtl"
                                    id="dtl"
                                    inputProps={{ style: { '-webkit-text-fill-color': 'rgba(0,0,0,1)', fontSize: 14 } }}
                                    value={serviceList[index].dtl}
                                    onChange={(e) => handleServiceChange(e, index)}
                                  >
                                    {/* <MenuItem value={'สภาพดี'}>สภาพดี</MenuItem>
                                  <MenuItem value={'ชำรุดรอซ่อม'}>ชำรุดรอซ่อม</MenuItem>
                                  <MenuItem value={'รอตัดชำรุด'}>รอตัดชำรุด</MenuItem> */}
                                    <MenuItem value={'ชำรุด'}>ชำรุด</MenuItem>
                                  </Select>
                                </FormControl>
                              </StyledTableCell>
                              {/* <StyledTableCell align="center" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa" }}>
                                <TextField
                                  fullWidth
                                  key={index}
                                  name="count"
                                  id="count"
                                  type='number'
                                  inputProps={{ style: { '-webkit-text-fill-color': 'rgba(0,0,0,1)', textAlign: 'center', fontSize: 14, min: 1 } }}
                                  //onChange={(e) => handleServiceChange(e, index)}
                                  value={singleService.count}
                                  variant="standard"
                                />
                              </StyledTableCell> */}
                              <StyledTableCell align="center" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa" }}>
                                <TextField
                                  fullWidth
                                  key={index}
                                  inputProps={{ style: { '-webkit-text-fill-color': 'rgba(0,0,0,0.5)', textAlign: 'center', fontSize: 14 } }}
                                  disabled
                                  value={!serviceList_Main[index].price ? serviceList_Main[index].price : (serviceList_Main[index].price).toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 0 })}
                                  variant="standard"
                                />
                                <TextField
                                  fullWidth
                                  key={index}
                                  name="price"
                                  id="price"
                                  inputProps={{ style: { '-webkit-text-fill-color': 'rgba(0,0,0,1)', textAlign: 'center', fontSize: 14 } }}
                                  type={valuesVisibility.showText ? "text" : "password"}
                                  // onChange={(e) => handleServiceChange(e, index)}
                                  value={!singleService.price ? singleService.price : (singleService.price).toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 0 })}
                                  variant="standard"
                                />
                              </StyledTableCell>
                              <StyledTableCell align="center" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa" }}>
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
                    <Table aria-label="customized table" style={{ width: 1100 }}>
                      <TableBody>
                        <StyledTableRow>
                          <StyledTableCell align="start" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa", width: '55%' }}>
                            <Typography>
                              รวม
                            </Typography>
                          </StyledTableCell>
                          <StyledTableCell align="center" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa", width: '45%' }}>
                            <TextField
                              required
                              fullWidth
                              disabled
                              type={valuesVisibility.showText ? "text" : "password"}
                              value={result === 0 ? '' : result.toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 0 })}
                              inputProps={{ style: { '-webkit-text-fill-color': 'rgba(0,0,0,1)', textAlign: 'center' } }}
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
                    <Table aria-label="customized table" style={{ width: 1100 }}>
                      <TableHead>
                        <StyledTableRow>
                          <StyledTableCell align="left" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa", width: '25%' }} >
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
                          <StyledTableCell align="left" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa", width: '25%' }}>
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
                          <StyledTableCell align="left" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa", width: '25%' }}>
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
                          <StyledTableCell align="left" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa", width: '25%' }} >
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
                                          บัญชี :
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
                    <Table aria-label="customized table" style={{ width: 1100 }}>
                      <TableBody>
                        <Stack
                          direction="row"
                          justifyContent="center"
                          alignItems="center"
                          spacing={3}
                        >
                          <Button
                            variant="contained"
                            onClick={handleNext}
                            endIcon={<BorderColorRoundedIcon />}
                            sx={{ my: { xs: 3, md: 4 }, p: { xs: 2, md: 2 } }}
                          >
                            สร้างเอกสาร
                          </Button>
                        </Stack>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </React.Fragment>
              </Paper>
            </Container>
          </AnimatedPage>
        </ThemeProvider>
        <Outlet />
      </React.Fragment >
    );
  }
}