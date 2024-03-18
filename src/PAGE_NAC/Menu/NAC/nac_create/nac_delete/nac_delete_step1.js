/* eslint-disable no-loop-func */
/* eslint-disable react-hooks/exhaustive-deps */
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
    padding: '1svw !important',
    border: '1px solid',
  },
  [`&.${tableCellClasses.body}`]: {
    backgroundColor: theme.palette.action.white,
    color: theme.palette.common.black,
    padding: '5px',
    overflow: 'hidden',
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
  const [desName, setDesName] = React.useState('');
  const [desLastName, setDesLastName] = React.useState('');

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
    desName: `${desName} ${desLastName}`,
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
    return (a ? a : 0) + (b ? b : 0)
  })
  const book_V = serviceList.map(function (elt) {
    return (/^\d+\.\d+$/.test(elt.bookValue) || /^\d+$/.test(elt.bookValue)) ?
      parseFloat(elt.bookValue) : parseFloat(elt.bookValue);
  }).reduce(function (a, b) { // sum all resulting numbers
    return (a ? a : 0) + (b ? b : 0)
  })

  const price_seals = serviceList.map(function (elt) {
    return (/^\d+\.\d+$/.test(elt.priceSeals) || /^\d+$/.test(elt.priceSeals)) ?
      parseFloat(elt.priceSeals) : parseFloat(elt.priceSeals);
  }).reduce(function (a, b) { // sum all resulting numbers
    return (a ? a : 0) + (b ? b : 0)
  })

  const profit_seals = serviceList.map(function (elt) {
    return (/^\d+\.\d+$/.test(((elt.priceSeals * 100) / 107) - (elt.bookValue ? elt.bookValue : 0)) || /^\d+$/.test(((elt.priceSeals * 100) / 107) - (elt.bookValue ? elt.bookValue : 0))) ?
      parseFloat(((elt.priceSeals * 100) / 107) - (elt.bookValue ? elt.bookValue : 0)) : parseFloat(((elt.priceSeals * 100) / 107) - (elt.bookValue ? elt.bookValue : 0));
  }).reduce(function (a, b) { // sum all resulting numbers
    return (a ? a : 0) + (b ? b : 0)
  })

  const sum_vat = serviceList.map(function (elt) {
    return (/^\d+\.\d+$/.test((elt.priceSeals * 100) / 107) || /^\d+$/.test((elt.priceSeals * 100) / 107)) ?
      parseFloat((elt.priceSeals * 100) / 107) : parseFloat((elt.priceSeals * 100) / 107);
  }).reduce(function (a, b) { // sum all resulting numbers
    return (a ? a : 0) + (b ? b : 0)
  })

  const listAPI = async () => {
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
  }


  React.useEffect(() => {
    if (dataAssets.length < 10) {
      listAPI()
    }
  }, [])

  const handleService_Source = (e, newValue, reason) => {
    if (reason === 'clear' || !newValue) {
      const listHeader = [...sendHeader]
      listHeader[0]['source'] = null
      listHeader[0]['nameSource'] = null
      listHeader[0]['source_Department'] = null
      listHeader[0]['source_BU'] = null
      setSendHeader(listHeader)
      setSourceName(null)
      setSourceLastName(null)
    } else {
      const listHeader = [...sendHeader]
      listHeader[0]['source'] = newValue
      listHeader[0]['nameSource'] = `${users.filter((res) => res.UserCode === newValue)[0].fristName} ${users.filter((res) => res.UserCode === newValue)[0].lastName}`
      listHeader[0]['source_Department'] = users.filter((res) => res.UserCode === newValue)[0].DepCode
      listHeader[0]['source_BU'] = users.filter((res) => res.UserCode === newValue)[0].BranchID === 901 ? `Center` : `Oil`
      setSendHeader(listHeader)
      setSourceName(users.filter((res) => res.UserCode === newValue)[0].fristName)
      setSourceLastName(users.filter((res) => res.UserCode === newValue)[0].lastName)

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

  const handleServiceChangeHeader = async (e, newValue, reason, index) => {
    const nacdtl_assetsCode = { nacdtl_assetsCode: newValue }
    const Code = { Code: newValue }

    if (serviceList.filter((res) => res.assetsCode === newValue)[0] !== undefined) {
      swal("แจ้งเตือน", 'มีทรัพย์สินนี้ในรายการแล้ว', "error")
        .then(() => {
          const list = [...serviceList];
          list[index]['assetsCode'] = ''
          setServiceList(list);
        })
    } else if (newValue && (reason !== 'clear')) {
      await Axios.post(config.http + '/store_FA_control_CheckAssetCode_Process', nacdtl_assetsCode, config.headers)
        .then(async (res) => {
          if (res.data.data[0].checkProcess === 'false') {
            swal("แจ้งเตือน", 'ทรัพย์สินนี้กำลังอยู่ในระหว่างการทำรายการ NAC', "error")
          } else {
            const list = [...serviceList];
            list[index]['assetsCode'] = dataAssets.filter((res) => res.Code === newValue)[0].Code
            list[index]['name'] = dataAssets.filter((res) => res.Code === newValue)[0].Name
            list[index]['dtl'] = dataAssets.filter((res) => res.Code === newValue)[0].Details
            list[index]['count'] = 1
            list[index]['serialNo'] = dataAssets.filter((res) => res.Code === newValue)[0].SerialNo
            list[index]['price'] = dataAssets.filter((res) => res.Code === newValue)[0].Price
            list[index]['priceSeals'] = 0
            list[index]['profit'] = 0
            list[index]['date_asset'] = dayjs(dataAssets.filter((res) => res.Code === newValue)[0].CreateDate).format('YYYY-MM-DD')
            list[index]['BranchID'] = dataAssets.filter((res) => res.Code === newValue)[0].BranchID
            list[index]['OwnerCode'] = dataAssets.filter((res) => res.Code === newValue)[0].OwnerCode
            setServiceList(list);
          }
        })
    } else {
      const list = [...serviceList];
      list[index]['name'] = ''
      list[index]['dtl'] = ''
      list[index]['count'] = ''
      list[index]['serialNo'] = ''
      list[index]['price'] = ''
      list[index]['bookValue'] = ''
      list[index]['priceSeals'] =
        list[index]['profit'] = ''
      list[index]['date_asset'] = ''
      list[index]['BranchID'] = ''
      list[index]['OwnerCode'] = ''
      setServiceList(list);
    }
  };

  const handleSubmit = async () => {
    if (!sendHeader[0].source || !sourceName || !sourceLastName) {
      swal("แจ้งเตือน", !sendHeader[0].source ? 'กรุณาระบุ (ผู้ส่งมอบ)' : !sourceName ? 'กรุณาระบุ (ชื่อผู้ส่งมอบ)' : 'กรุณาระบุ (นามสกุล)', "error")
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
                        if (resIII.data.data[0].count_row === serviceList.length) {
                          localStorage.setItem('NacCode', JSON.stringify({ nac_code: resIII.data.data[0].nac_code, nac_status: 1 }));
                          navigate('/NAC_ROW/NAC_DELETE_WAIT_APPROVE?' + resIII.data.data[0].nac_code)
                        }
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
          nac_type={sendHeader[0].worktype}
          sendHeader={sendHeader}
        />
        <AnimatedPage>
          <Container component="main" maxWidth="lg">
            <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 }, overflow: 'hidden' }}>
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
              <TableContainer>
                <Table size="small" sx={{ minWidth: 1000 }}>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="center" style={{ width: '30%' }}>
                        <Typography className='scaled-480px-TableHeader'>
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
                        <Typography className='scaled-480px-Header' sx={{ fontWeight: 'bold !important', fontSize: '1.5rem !important' }}>
                          ตัดบัญชีทรัพยืสิน
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Stack
                          direction="row"
                          justifyContent="space-evenly"
                          alignItems="flex-start"
                          spacing={2}
                          sx={{ mb: '0.8em !important', pt: 2 }}
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
                        <Box sx={{ mb: '0.8em !important' }}>
                          <Autocomplete
                            autoHighlight
                            freeSolo
                            name='source'
                            size="small"
                            classes={{
                              input: 'scaled-480px-TableContent',
                              option: 'scaled-480px-TableContent',

                            }}
                            value={sendHeader[0].source}
                            options={users.filter((res) => res.DepID === data.depid).map((option) => option.UserCode)}
                            onChange={(e, newValue, reason) => handleService_Source(e, newValue, reason)}
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
                                value={sourceLastName ?? ''}
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
                              onChange={handleSendDate ?? ''}
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
                <Table size="small" sx={{ minWidth: 1000 }}>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="center" sx={{ width: "15%", }}>
                        <Typography className='scaled-480px-TableHeader'>
                          รหัสทรัพย์สิน
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell align="center" sx={{ width: "10%", }}>
                        <Typography className='scaled-480px-TableHeader'>
                          Serial No.
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell align="center" sx={{ width: "15%", }}>
                        <Typography className='scaled-480px-TableHeader'>
                          ชื่อทรัพย์สิน
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell align="center" sx={{ width: "10%", }}>
                        <Typography className='scaled-480px-TableHeader'>
                          วันที่ขึ้นทะเบียน
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Typography className='scaled-480px-TableHeader'>
                          ต้นทุน
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Typography className='scaled-480px-TableHeader'>
                          Book value
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Typography className='scaled-480px-TableHeader'>
                          ขาย
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Typography className='scaled-480px-TableHeader'>
                          Ex. Vat
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Typography className='scaled-480px-TableHeader'>
                          กำไร/ขาดทุน
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <IconButton
                          color='primary'
                          onClick={handleServiceAdd}
                        >
                          <AddBoxIcon className='scaled-icon-table' />
                        </IconButton>
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  {serviceList.map((res, index) => (
                    <TableBody>
                      <StyledTableRow>
                        <StyledTableCell align="center" style={{ width: '18%' }}>
                          <Autocomplete
                            autoHighlight
                            freeSolo
                            name='assetsCode'
                            sx={{
                              "& .MuiInputBase-input.Mui-disabled": {
                                WebkitTextFillColor: "#000000",
                              },
                            }}
                            classes={{
                              input: 'scaled-480px-TableContent',
                              option: 'scaled-480px-TableContent',

                            }}
                            key={index}
                            value={res.assetsCode}
                            options={dataAssets.map((option) => option.Code)}
                            onChange={(e, newValue, reason) => handleServiceChangeHeader(e, newValue, reason, index)}
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
                                input: 'scaled-480px-TableContent text-left',
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
                                input: 'scaled-480px-TableContent text-left',
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
                            }}
                            inputProps={{ min: 0, style: { textAlign: 'right' } }}
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
                            }}
                            inputProps={{ min: 0, style: { textAlign: 'right' } }}
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
                            disabled
                            InputProps={{
                              disableUnderline: true,
                              inputComponent: NumericFormatCustom,
                            }}
                            inputProps={{ min: 0, style: { textAlign: 'right' } }}
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
                            }}
                            inputProps={{ min: 0, style: { textAlign: 'right' } }}
                            value={(((res.priceSeals ? res.priceSeals : 0) * 100) / 107)}
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
                            }}
                            inputProps={{ min: 0, style: { textAlign: 'right' } }}
                            value={(((res.priceSeals ? res.priceSeals : 0) * 100) / 107) - (res.bookValue ? res.bookValue : 0)}
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
                              <DeleteIcon fontSize="inherit" className='scaled-icon-table' />
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
                            py: '0.45em'
                          }}
                          disabled
                          type={data.branchid === 901 ? "text" : "password"}
                          InputProps={{
                            disableUnderline: true,
                            inputComponent: NumericFormatCustom,
                          }}
                          inputProps={{ min: 0, style: { textAlign: 'right' } }}
                          value={result ? result : ''}
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
                            py: '0.45em'
                          }}
                          disabled
                          type={data.branchid === 901 ? "text" : "password"}
                          InputProps={{
                            disableUnderline: true,
                            inputComponent: NumericFormatCustom,
                          }}
                          inputProps={{ min: 0, style: { textAlign: 'right' } }}
                          value={book_V ? book_V : ''}
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
                            py: '0.45em'
                          }}
                          disabled
                          InputProps={{
                            disableUnderline: true,
                            inputComponent: NumericFormatCustom,
                          }}
                          inputProps={{ min: 0, style: { textAlign: 'right' } }}
                          value={price_seals ? price_seals : ''}
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
                            py: '0.45em'
                          }}
                          disabled
                          InputProps={{
                            disableUnderline: true,
                            inputComponent: NumericFormatCustom,
                          }}
                          inputProps={{ min: 0, style: { textAlign: 'right' } }}
                          value={sum_vat ? sum_vat : ''}
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
                          }}
                          inputProps={{ min: 0, style: { textAlign: 'right' } }}
                          value={profit_seals ? profit_seals : ''}
                          variant="standard"
                        />
                      </StyledTableCell>
                    </StyledTableRow>
                  </TableBody>
                </Table>
                <Table size="small" sx={{ minWidth: 1000 }}>
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
                <Table size="small" sx={{ minWidth: 1000 }}>
                  <TableBody>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        onClick={handleSubmit}
                        className='scaled-480px-TableHeader'
                        endIcon={<BorderColorRoundedIcon className='scaled-480px-TableHeader' />}
                        sx={{ m: 1 }}
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