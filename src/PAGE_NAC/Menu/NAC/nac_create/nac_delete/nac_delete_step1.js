import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
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
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
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
import Autocomplete from '@mui/material/Autocomplete';
import swal from 'sweetalert';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import logoPure from '../../../../../image/Picture1.png'
import SummarizeIcon from '@mui/icons-material/Summarize';
import '../../../../../App.css'
import config from '../../../../../config'
import dayjs from 'dayjs';
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import PropTypes from 'prop-types';
import { NumericFormat } from 'react-number-format';
import AppbarNAC from '../Appbar.js'


const theme = createTheme();

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.action.selected,
    color: theme.palette.common.black,
    padding: 0,
    border: '1px solid',
  },
  [`&.${tableCellClasses.body}`]: {
    backgroundColor: theme.palette.action.white,
    color: theme.palette.common.black,
    padding: 0,
    border: '1px solid',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.white,
    color: theme.palette.common.black,
    padding: 0,
    border: '1px solid',
  },
}));

const NumericFormatCustom = React.forwardRef(function NumericFormatCustom(
  props,
  ref,
) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      valueIsNumericString
      decimalScale={3}
    />
  );
});

NumericFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default function Nac_Main() {

  // ใช้สำหรับสร้างเวลาปัจจุบัน
  dayjs.extend(utc);
  dayjs.extend(timezone);
  var dateNow = (dayjs().utc().local().format()).split('+')[0]

  // routes
  const data = JSON.parse(localStorage.getItem('data'));
  const navigate = useNavigate();

  //const
  const [users, setUsers] = React.useState([]);
  const [dataAssets, setDataAssets] = React.useState([]);
  const [sourceName, setSourceName] = React.useState();
  const [sourceLastName, setSourceLastName] = React.useState();
  const [desName, setDesName] = React.useState();
  const [desLastName, setDesLastName] = React.useState();

  const [sendHeader, setSendHeader] = React.useState([{
    usercode: data.UserCode,
    worktype: 4,
    // ผู้รับ
    source_Department: null,
    source_BU: null,
    source: null,
    nameSource: `${sourceName} ${sourceLastName}`,
    sourceDate: dateNow,
    source_Description: null,
    // ผู้รับ
    des_Department: null,
    des_BU: null,
    des_delivery: null,
    nameDes: `${desName} ${desLastName}`,
    des_deliveryDate: null,
    des_Description: null,
    sumPrice: null,
  }]);

  const [serviceList, setServiceList] = React.useState([{
    dtl_id: null,
    assetsCode: null,
    serialNo: null,
    name: null,
    date_asset: null,
    price: null,
    bookValue: null,
    priceSeals: 0,
    profit: null,
    asset_id: null,
  }]);

  const result = serviceList.map(function (elt) {
    return (/^\d+\.\d+$/.test(elt.price) || /^\d+$/.test(elt.price)) ?
      parseFloat(elt.price) : parseFloat(elt.price);
  }).reduce(function (a, b) { // sum all resulting numbers
    return a + b
  })
  const book_V = serviceList.map(function (elt) {
    return (/^\d+\.\d+$/.test(elt.bookValue) || /^\d+$/.test(elt.bookValue)) ?
      parseFloat(elt.bookValue) : parseFloat(elt.bookValue);
  }).reduce(function (a, b) { // sum all resulting numbers
    return a + b
  })

  const price_seals = serviceList.map(function (elt) {
    return (/^\d+\.\d+$/.test(elt.priceSeals) || /^\d+$/.test(elt.priceSeals)) ?
      parseFloat(elt.priceSeals) : parseFloat(elt.priceSeals);
  }).reduce(function (a, b) { // sum all resulting numbers
    return a + b
  })

  const profit_seals = serviceList.map(function (elt) {
    return (/^\d+\.\d+$/.test(((elt.priceSeals * 100) / 107) - elt.bookValue) || /^\d+$/.test(((elt.priceSeals * 100) / 107) - elt.bookValue)) ?
      parseFloat(((elt.priceSeals * 100) / 107) - elt.bookValue) : parseFloat(((elt.priceSeals * 100) / 107) - elt.bookValue);
  }).reduce(function (a, b) { // sum all resulting numbers
    return a + b
  })

  const sum_vat = serviceList.map(function (elt) {
    return (/^\d+\.\d+$/.test((elt.priceSeals * 100) / 107) || /^\d+$/.test((elt.priceSeals * 100) / 107)) ?
      parseFloat((elt.priceSeals * 100) / 107) : parseFloat((elt.priceSeals * 100) / 107);
  }).reduce(function (a, b) { // sum all resulting numbers
    return a + b
  })


  React.useEffect(async () => {

    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };

    // แสดง users ทั้งหมด
    await Axios.get(config.http + '/getsUserForAssetsControl', { headers })
      .then((res) => {
        setUsers(res.data.data)
      })

    // รหัสทรัพย์สินทั้งหมด
    await Axios.post(config.http + '/AssetsAll_Control', { BranchID: data.branchid }, { headers })
      .then((res) => {
        if (data.branchid === 901 && data.DepCode !== '101ITO') {
          setDataAssets(res.data.data.filter((datain) => datain.Position === data.DepCode))
        }
        setDataAssets(res.data.data)
      })

  }, [])

  const handleService_Source = (e) => {

    if (!e.target.innerText) {
      const listHeader = [...sendHeader]
      listHeader[0]['source'] = null
      listHeader[0]['source_Department'] = null
      listHeader[0]['source_BU'] = null
      setSendHeader(listHeader)
    } else {
      const listHeader = [...sendHeader]
      listHeader[0]['source'] = e.target.innerText
      listHeader[0]['source_Department'] = users.filter((res) => res.UserCode === e.target.innerText)[0].DepCode
      listHeader[0]['source_BU'] = users.filter((res) => res.UserCode === e.target.innerText)[0].BranchID === 901 ? `Center` : `Oil`
      setSendHeader(listHeader)
    }

  }

  const handleSendDate = (newValue) => {
    const listHeader = [...sendHeader]
    listHeader[0]['sourceDate'] = newValue.toLocaleString("sv-SE")
    setSendHeader(listHeader)
  };

  const handleService_SourceDescription = (e) => {
    const listHeader = [...sendHeader]
    listHeader[0]['source_Description'] = e.target.value
    setSendHeader(listHeader)
  }

  const handleServiceAdd = () => {
    setServiceList([...serviceList, {
      dtl_id: null,
      assetsCode: null,
      serialNo: null,
      name: null,
      date_asset: null,
      price: null,
      bookValue: null,
      priceSeals: 0,
      profit: null,
      asset_id: null,
    }]);
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
    const nacdtl_assetsCode = { nacdtl_assetsCode: e.target.innerText }
    const Code = { Code: e.target.innerText }

    if (serviceList.filter((res) => res.assetsCode === e.target.innerText)[0] !== undefined) {
      swal("แจ้งเตือน", 'มีทรัพย์สินนี้ในรายการแล้ว', "error")
        .then(() => {
          const list = [...serviceList];
          list[index]['assetsCode'] = ''
          setServiceList(list);
        })
    } else if (e.target.innerText && serviceList.filter((res) => res.assetsCode === e.target.innerText)[0] === undefined) {
      await Axios.post(config.http + '/store_FA_control_CheckAssetCode_Process', nacdtl_assetsCode, config.headers)
        .then(async (res) => {
          if (res.data.data[0].checkProcess === 'false') {
            swal("แจ้งเตือน", 'ทรัพย์สินนี้กำลังอยู่ในระหว่างการทำรายการ NAC', "error")
          } else {
            await Axios.post(config.http + '/SelectDTL_Control', Code, config.headers)
              .then((response) => {
                if (response.data.data.length > 0) {
                  const list = [...serviceList];
                  list[index]['assetsCode'] = response.data.data[0].Code
                  list[index]['name'] = response.data.data[0].Name
                  list[index]['dtl'] = response.data.data[0].Details
                  list[index]['count'] = 1
                  list[index]['serialNo'] = response.data.data[0].SerialNo
                  list[index]['price'] = response.data.data[0].Price
                  list[index]['date_asset'] = response.data.data[0].CreateDate
                  setServiceList(list);
                }
              })
          }
        })
    } else {
      const list = [...serviceList];
      list[index]['assetsCode'] = null
      list[index]['name'] = null
      list[index]['dtl'] = null
      list[index]['count'] = null
      list[index]['serialNo'] = null
      list[index]['price'] = null
      list[index]['bookValue'] = null
      list[index]['priceSeals'] = null
      list[index]['profit'] = null
      list[index]['date_asset'] = null
      setServiceList(list);
    }
  };

  const handleSubmit = async () => {
    if (!sendHeader[0].source || !sourceName || !sourceLastName) {
      swal("แจ้งเตือน", 'กรุณาระบุ (ผู้ส่งมอบ/ชื่อ-นามสกุล ผู้ส่งมอบ)', "error")
    } else if ((serviceList.filter((res) => !res.assetsCode)[0]) !== undefined) {
      swal("แจ้งเตือน", 'กรุณาระบุข้อมูลทรัพย์สินให้ครบ', "error")
    } else {
      const sendReq = sendHeader[0]
      await Axios.post(config.http + '/store_FA_control_create_doc', sendReq, config.headers)
        .then(async (res) => {
          if (res.data.data) {
            for (var i = 0; i < serviceList.length; i++) {

              const detail_req = {
                nac_code: res.data.data[0].nac_code, // ได้จาก Response ของ Store_FA_control_create_doc
                nacdtl_row: i,
                nacdtl_assetsCode: serviceList[i].assetsCode,
                nacdtl_assetsName: serviceList[i].name,
                nacdtl_assetsSeria: serviceList[i].serialNo,
                nacdtl_assetsDtl: serviceList[i].dtl,
                nacdtl_assetsCount: serviceList[i].count,
                nacdtl_assetsPrice: serviceList[i].price,
                nacdtl_date_asset: serviceList[i].date_asset,
              }
              await Axios.post(config.http + '/store_FA_control_creat_Detail', detail_req, config.headers)
                .then(async (resII) => {
                  if (resII.data.data) {
                    const detail_reqII = {
                      usercode: data.UserCode,
                      nac_code: res.data.data[0].nac_code,
                      nac_type: sendHeader[0].worktype,
                      nacdtl_bookV: serviceList[i].bookValue,
                      nacdtl_PriceSeals: serviceList[i].priceSeals,
                      nacdtl_profit: serviceList[i].profit,
                      asset_id: resII.data.data[i].nacdtl_id,
                      nac_status: 1,
                      nacdtl_assetsCode: serviceList[i].assetsCode
                    }
                    await Axios.post(config.http + '/store_FA_control_updateDTL_seals', detail_reqII, config.headers)
                      .then((resIII) => {
                        localStorage.setItem('NacCode', JSON.stringify({ nac_code: resIII.data.data[0].nac_code, nac_status: 1 }));
                        navigate('/NAC_ROW/NAC_DELETE_WAIT_APPROVE?' + resIII.data.data[0].nac_code)
                      })
                  }
                })
            }
          }
        })
    }
  };

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppbarNAC
          nac_type={sendHeader[0].nac_type}
          sendHeader={sendHeader}
        />
        <AnimatedPage>
          <Container component="main" maxWidth="lg" sx={{ mb: 12, minWidth: window.innerWidth * 0.8 }}>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item xs={2}>
                  <Box className='logo-399-sm logo-sm logo-md'>
                    <img style={{ maxWidth: '100%' }} src={logoPure} loading="lazy" />
                  </Box>
                </Grid>
                <Grid item xs={8}>
                  <Stack
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Typography className='scaled-480px-Header'>
                      <b>PURE THAI ENERGY CO.,LTD.</b>
                    </Typography>
                    <Typography className='scaled-480px-Header-Content text-center'>
                      เปลี่ยนแปลงรายการทรัพย์สินถาวร (Notice of Asset Change - NAC)
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={2}>
                  <Box sx={{ p: 2, border: '1px dashed grey' }} className='logo-399-sm logo-sm logo-md' />
                </Grid>
              </Grid>
              <Box sx={{ pt: 3 }} className='logo-399-sm logo-sm logo-md'>
                <Typography className='scaled-480px-Header-Content' color='error'>
                  * กรุณากรอกข้อมูลสำหรับตัดบัญชีทรัพยืสิน
                </Typography>
              </Box>
              <TableContainer component={Paper}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="center" style={{ width: '30%' }}>
                        <Typography className='scaled-480px-TableHeader' >
                          ประเภทการเปลี่ยนแปลง
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Typography className='scaled-480px-TableHeader' >
                          หน่วยงานที่ส่งมอบ
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell align="center" style={{ width: '35%' }}>
                        <Typography className='scaled-480px-TableHeader' >
                          หน่วยงานที่รับมอบ
                        </Typography>
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <StyledTableRow>
                      <StyledTableCell align="center">
                        <Typography className='scaled-480px-Header'>
                          ตัดบัญชีทรัพยืสิน
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Stack
                          direction="row"
                          justifyContent="space-evenly"
                          alignItems="flex-start"
                          spacing={2}
                          sx={{ p: '0.45em !important', mb: '0.8em !important' }}
                        >
                          <Stack>
                            <Typography className='scaled-480px-TableContent' color="inherit" >
                              Department
                            </Typography>
                            <TextField
                              required
                              fullWidth
                              name='source'
                              sx={{
                                "& .MuiInputBase-input.Mui-disabled": {
                                  WebkitTextFillColor: "#000000",
                                },
                              }}
                              disabled
                              value={!sendHeader[0].source_Department ? '' : sendHeader[0].source_Department}
                              InputProps={{
                                classes: {
                                  input: 'scaled-480px-TableContent text-center ',
                                },
                              }}
                              variant="standard"
                            />
                          </Stack>
                          <Stack>
                            <Typography className='scaled-480px-TableContent' color="inherit" >
                              BU
                            </Typography>
                            <TextField
                              required
                              fullWidth
                              disabled
                              sx={{
                                "& .MuiInputBase-input.Mui-disabled": {
                                  WebkitTextFillColor: "#000000",
                                },
                              }}
                              value={!sendHeader[0].source_BU ? '' : sendHeader[0].source_BU}
                              name='source'
                              InputProps={{
                                classes: {
                                  input: 'scaled-480px-TableContent text-center ',
                                },
                              }}
                              variant="standard"
                            />
                          </Stack>
                        </Stack>
                        <Box sx={{ p: '0.45em !important', mb: '0.8em !important' }}>
                          <Autocomplete
                            freeSolo
                            name='source'
                            size="small"
                            classes={{
                              input: 'scaled-480px-TableContent',
                              option: 'scaled-480px-TableContent',

                            }}
                            disableClearable={true}
                            value={sendHeader[0].source}
                            options={users.filter((res) => res.DepID === data.depid).map((option) => option.UserCode)}
                            onChange={handleService_Source}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                variant="standard"
                                InputProps={{
                                  ...params.InputProps,
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <Typography color="black" className='scaled-480px-TableContent'>
                                        ผู้ส่งมอบ :
                                      </Typography>
                                    </InputAdornment>
                                  ),
                                }}
                              />
                            )}
                          />
                          <Stack
                            direction="row"
                            justifyContent="space-evenly"
                            alignItems="flex-start"
                            spacing={1}
                          >
                            <Stack>
                              <TextField
                                variant="standard"
                                fullWidth
                                value={sourceName}
                                onChange={(e) => {
                                  const listHeader = [...sendHeader]
                                  listHeader[0].nameSource = `${e.target.value} ${sourceLastName}`
                                  setSendHeader(listHeader)
                                  setSourceName(e.target.value)
                                }}
                                InputProps={{
                                  classes: {
                                    input: 'scaled-480px-TableContent',
                                  },
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <Typography color="black" className='scaled-480px-TableContent'>
                                        ชื่อจริง :
                                      </Typography>
                                    </InputAdornment>
                                  ),
                                }}
                              />
                            </Stack>
                            <Stack>
                              <TextField
                                variant="standard"
                                fullWidth
                                value={sourceLastName}
                                onChange={(e) => {
                                  const listHeader = [...sendHeader]
                                  listHeader[0].nameSource = `${sourceName} ${e.target.value}`
                                  setSendHeader(listHeader)
                                  setSourceLastName(e.target.value)
                                }}
                                InputProps={{
                                  classes: {
                                    input: 'scaled-480px-TableContent',
                                  },
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <Typography color="black" className='scaled-480px-TableContent'>
                                        นามสกุล :
                                      </Typography>
                                    </InputAdornment>
                                  ),
                                }}
                              />
                            </Stack>
                          </Stack>
                          <LocalizationProvider dateAdapter={DateAdapter}>
                            <DatePicker
                              // inputFormat="yyyy-MM-dd"
                              name='source_Date'
                              value={sendHeader[0].sourceDate}
                              onChange={handleSendDate}
                              InputProps={{
                                classes: {
                                  input: 'scaled-480px-TableContent',
                                },
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <Typography color="black" className='scaled-480px-TableContent'>
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
                                  variant="standard"
                                  {...params} />}
                            />
                          </LocalizationProvider>
                          <TextField
                            required
                            fullWidth
                            name='source_Description'
                            value={sendHeader[0].source_Description}
                            onChange={handleService_SourceDescription}
                            InputProps={{
                              classes: {
                                input: 'scaled-480px-TableContent',
                              },
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Typography color="black" className='scaled-480px-TableContent'>
                                    หมายเหตุ :
                                  </Typography>
                                </InputAdornment>
                              ),
                            }}
                            variant="standard"
                          />
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Typography className='scaled-480px-Header'>
                          NONE
                        </Typography>
                      </StyledTableCell>
                    </StyledTableRow>
                  </TableBody>
                </Table>
                <Table>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="center">
                        <Typography className='scaled-480px-TableHeader'>
                          รหัสทรัพย์สิน
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Typography className='scaled-480px-TableHeader'>
                          Serial No.
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Typography className='scaled-480px-TableHeader'>
                          ชื่อทรัพย์สิน
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell align="center" style={{ width: '12%' }}>
                        <Typography className='scaled-480px-TableHeader'>
                          วันที่ขึ้นทะเบียน
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell align="center" style={{ width: '8%' }}>
                        <Typography className='scaled-480px-TableHeader'>
                          ต้นทุน
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell align="center" style={{ width: '8%' }}>
                        <Typography className='scaled-480px-TableHeader'>
                          Book value
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell align="center" style={{ width: '8%' }}>
                        <Typography className='scaled-480px-TableHeader'>
                          ขาย
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell align="center" style={{ width: '8%' }}>
                        <Typography className='scaled-480px-TableHeader'>
                          Ex. Vat
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell align="center" style={{ width: '8%' }}>
                        <Typography className='scaled-480px-TableHeader'>
                          กำไร/ขาดทุน
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell align="center" style={{ width: '5%' }}>
                        <IconButton
                          size="large"
                          color='primary'
                          onClick={handleServiceAdd}
                        >
                          <AddBoxIcon className='scaled-480px-TableHeader' />
                        </IconButton>
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  {serviceList.map((res, index) => (
                    <TableBody>
                      <StyledTableRow>
                        <StyledTableCell align="center" style={{ width: '18%' }}>
                          <Autocomplete
                            freeSolo
                            name='assetsCode'
                            sx={{
                              "& .MuiInputBase-input.Mui-disabled": {
                                WebkitTextFillColor: "#000000",
                              },
                            }}
                            classes={{
                              input: 'scaled-480px-TableContent text-center',
                              option: 'scaled-480px-TableContent',

                            }}
                            disableClearable={true}
                            key={index}
                            value={res.assetsCode}
                            options={dataAssets.map((option) => option.Code)}
                            onChange={(e) => handleServiceChangeHeader(e, index)}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                variant="standard"
                                InputProps={{
                                  ...params.InputProps,
                                }}
                              />
                            )}
                          />
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <TextField
                            fullWidth
                            sx={{
                              "& .MuiInputBase-input.Mui-disabled": {
                                WebkitTextFillColor: "#000000",
                              },
                            }}
                            key={index}
                            name="serialNo"
                            disabled
                            multiline
                            InputProps={{
                              disableUnderline: true,
                              classes: {
                                input: 'scaled-480px-TableContent text-center',
                              },
                            }}
                            value={res.serialNo ?? ''}
                            variant="standard"
                          />
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <TextField
                            fullWidth
                            key={index}
                            name="name"
                            multiline
                            disabled
                            sx={{
                              "& .MuiInputBase-input.Mui-disabled": {
                                WebkitTextFillColor: "#000000",
                              },
                            }}
                            InputProps={{
                              disableUnderline: true,
                              classes: {
                                input: 'scaled-480px-TableContent text-center',
                              },
                            }}
                            value={res.name ?? ''}
                            variant="standard"
                          />
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <TextField
                            fullWidth
                            sx={{
                              "& .MuiInputBase-input.Mui-disabled": {
                                WebkitTextFillColor: "#000000",
                              },
                            }}
                            key={index}
                            name="date_asset"
                            disabled
                            InputProps={{
                              disableUnderline: true,
                              classes: {
                                input: 'scaled-480px-TableContent text-center',
                              },
                            }}
                            value={!res.date_asset ? '' : res.date_asset.split('T')[0]}
                            variant="standard"
                          />
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <TextField
                            fullWidth
                            sx={{
                              "& .MuiInputBase-input.Mui-disabled": {
                                WebkitTextFillColor: "#000000",
                              },
                            }}
                            key={index}
                            name="price"
                            disabled
                            type={data.branchid === 901 ? "text" : "password"}
                            InputProps={{
                              disableUnderline: true,
                              inputComponent: NumericFormatCustom,
                              classes: {
                                input: 'scaled-480px-TableContent text-center',
                              },
                            }}
                            value={res.price ?? ''}
                            variant="standard"
                          />
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <TextField
                            fullWidth
                            sx={{
                              "& .MuiInputBase-input.Mui-disabled": {
                                WebkitTextFillColor: "#000000",
                              },
                            }}
                            key={index}
                            name="bookValue"
                            disabled
                            type={data.branchid === 901 ? "text" : "password"}
                            InputProps={{
                              disableUnderline: true,
                              inputComponent: NumericFormatCustom,
                              classes: {
                                input: 'scaled-480px-TableContent text-center',
                              },
                            }}
                            value={res.bookValue ?? ''}
                            variant="standard"
                          />
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <TextField
                            fullWidth
                            sx={{
                              "& .MuiInputBase-input.Mui-disabled": {
                                WebkitTextFillColor: "#000000",
                              },
                            }}
                            key={index}
                            name="priceSeals"
                            onChange={(e) => handleServiceChange(e, index)}
                            InputProps={{
                              inputComponent: NumericFormatCustom,
                              classes: {
                                input: 'scaled-480px-TableContent text-center',
                              },
                            }}
                            value={res.priceSeals ?? ''}
                            variant="standard"
                          />
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <TextField
                            fullWidth
                            sx={{
                              "& .MuiInputBase-input.Mui-disabled": {
                                WebkitTextFillColor: "#000000",
                              },
                            }}
                            key={index}
                            name="excluding_vat"
                            disabled
                            InputProps={{
                              disableUnderline: true,
                              inputComponent: NumericFormatCustom,
                              classes: {
                                input: 'scaled-480px-TableContent text-center',
                              },
                            }}
                            value={(res.priceSeals === 0 || !res.priceSeals) ? '' : ((res.priceSeals * 100) / 107)}
                            variant="standard"
                          />
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <TextField
                            fullWidth
                            sx={{
                              "& .MuiInputBase-input.Mui-disabled": {
                                WebkitTextFillColor: "#000000",
                              },
                            }}
                            key={index}
                            name="profit"
                            disabled
                            type={data.branchid === 901 ? "text" : "password"}
                            InputProps={{
                              disableUnderline: true,
                              inputComponent: NumericFormatCustom,
                              classes: {
                                input: 'scaled-480px-TableContent text-center',
                              },
                            }}
                            value={(res.priceSeals === 0 || !res.priceSeals) ? '' : (((res.priceSeals * 100) / 107) - res.bookValue)}
                            variant="standard"
                          />
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {serviceList.length !== 0 && (
                            <IconButton
                              size="large"
                              aria-label="delete"
                              color="error"
                              onClick={serviceList.length === 1 ? false : () => handleServiceRemove(index)}
                            >
                              <DeleteIcon fontSize="inherit" className='scaled-480px-TableHeader' />
                            </IconButton>
                          )}
                        </StyledTableCell>
                      </StyledTableRow>
                    </TableBody>
                  ))}
                  <TableBody>
                    <StyledTableRow>
                      <StyledTableCell align="start" colSpan={4} >
                        <Typography className='scaled-480px-TableHeader'>
                          รวมทั้งหมด
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell align="center" >
                        <TextField
                          fullWidth
                          sx={{
                            "& .MuiInputBase-input.Mui-disabled": {
                              WebkitTextFillColor: "#000000",
                            },
                          }}
                          disabled
                          type={data.branchid === 901 ? "text" : "password"}
                          InputProps={{
                            disableUnderline: true,
                            inputComponent: NumericFormatCustom,
                            classes: {
                              input: 'scaled-480px-TableHeader text-center',
                            },
                          }}
                          value={!result ? '' : result}
                          variant="standard"
                        />
                      </StyledTableCell>
                      <StyledTableCell align="center" >
                        <TextField
                          fullWidth
                          sx={{
                            "& .MuiInputBase-input.Mui-disabled": {
                              WebkitTextFillColor: "#000000",
                            },
                          }}
                          disabled
                          type={data.branchid === 901 ? "text" : "password"}
                          InputProps={{
                            disableUnderline: true,
                            inputComponent: NumericFormatCustom,
                            classes: {
                              input: 'scaled-480px-TableHeader text-center',
                            },
                          }}
                          value={!book_V ? '' : book_V}
                          variant="standard"
                        />
                      </StyledTableCell>
                      <StyledTableCell align="center" >
                        <TextField
                          fullWidth
                          sx={{
                            "& .MuiInputBase-input.Mui-disabled": {
                              WebkitTextFillColor: "#000000",
                            },
                          }}
                          disabled
                          InputProps={{
                            disableUnderline: true,
                            inputComponent: NumericFormatCustom,
                            classes: {
                              input: 'scaled-480px-TableHeader text-center',
                            },
                          }}
                          value={!price_seals ? '' : price_seals}
                          variant="standard"
                        />
                      </StyledTableCell>
                      <StyledTableCell align="center" >
                        <TextField
                          fullWidth
                          sx={{
                            "& .MuiInputBase-input.Mui-disabled": {
                              WebkitTextFillColor: "#000000",
                            },
                          }}
                          disabled
                          InputProps={{
                            disableUnderline: true,
                            inputComponent: NumericFormatCustom,
                            classes: {
                              input: 'scaled-480px-TableHeader text-center',
                            },
                          }}
                          value={!sum_vat ? '' : sum_vat}
                          variant="standard"
                        />
                      </StyledTableCell>
                      <StyledTableCell align="center" >
                        <TextField
                          fullWidth
                          sx={{
                            "& .MuiInputBase-input.Mui-disabled": {
                              WebkitTextFillColor: "#000000",
                            },
                          }}
                          disabled
                          type={data.branchid === 901 ? "text" : "password"}
                          InputProps={{
                            disableUnderline: true,
                            inputComponent: NumericFormatCustom,
                            classes: {
                              input: 'scaled-480px-TableHeader text-center',
                            },
                          }}
                          value={!profit_seals ? '' : profit_seals}
                          variant="standard"
                        />
                      </StyledTableCell>
                    </StyledTableRow>
                  </TableBody>
                </Table>
                <Table>
                  <TableHead>
                    <StyledTableRow>
                      <StyledTableCell align="center">
                        <Typography className='scaled-480px-TableHeader' >
                          ผู้ทำรายการ : [{data.UserCode}] {dateNow.split('T')[0]}
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Typography className='scaled-480px-TableHeader' >
                          ผู้ตรวจสอบ : -
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Typography className='scaled-480px-TableHeader' >
                          ผู้อนุมัติ : -
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Typography className='scaled-480px-TableHeader' >
                          บัญชีตรวจสอบ : -
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Typography className='scaled-480px-TableHeader' >
                          การเงินตรวจสอบ : -
                        </Typography>
                      </StyledTableCell>
                    </StyledTableRow>
                  </TableHead>
                </Table>
                <Table>
                  <TableBody>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        onClick={handleSubmit}
                        className='scaled-480px-TableHeader'
                        endIcon={<BorderColorRoundedIcon className='scaled-480px-TableHeader' />}
                        sx={{ p: '0.45em !important', m: 1 }}
                      >
                        Submit
                      </Button>
                    </TableCell>
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Container>
        </AnimatedPage>
      </ThemeProvider>
      <Outlet />
    </React.Fragment >
  );
}