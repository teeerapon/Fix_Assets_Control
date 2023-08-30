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
import CircularProgress from '@mui/material/CircularProgress';
import Tooltip from '@mui/material/Tooltip';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import ClearIcon from '@mui/icons-material/Clear';
import PropTypes from 'prop-types';
import { NumericFormat } from 'react-number-format';
import Card from '@mui/material/Card';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import CommentNAC from '../Comment'
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
    padding: '0px 10px 0px 10px',
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

async function store_FA_control_comment(credentials) {
  return fetch(config.http + '/store_FA_control_comment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

async function store_FA_SendMail(credentials) {
  return fetch(config.http + '/store_FA_SendMail', {
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
  dayjs.extend(utc);
  dayjs.extend(timezone);
  var dateNow = (dayjs().utc().local().format()).split('+')[0]

  //dialog
  const [openDialogReply, setOpenDialogReply] = React.useState(false);
  const [commentReply, setCommentReply] = React.useState();
  const [drop_NAC_byDes, setDrop_NAC_byDes] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [description, setDescription] = React.useState();

  // routes
  const data = JSON.parse(localStorage.getItem('data'));
  const permission_MenuID = JSON.parse(localStorage.getItem('permission_MenuID'));
  const navigate = useNavigate();
  const queryString = window.location.search;
  const nac_code = queryString.split('?')[1]

  //const
  const [users, setUsers] = React.useState([]);
  const [dataAssets, setDataAssets] = React.useState([]);
  const [sourceName, setSourceName] = React.useState();
  const [sourceLastName, setSourceLastName] = React.useState();
  const [desName, setDesName] = React.useState();
  const [desLastName, setDesLastName] = React.useState();
  const [TooltipImage_1, setTooltipImage_1] = React.useState();
  const [approveData, setApproveData] = React.useState();
  const [counter, setCounter] = React.useState(0);

  const [sendHeader, setSendHeader] = React.useState([{
    usercode: data.UserCode,
    worktype: 5,
    create_by: null,
    nac_code: null,
    nac_status: null,
    nac_type: null,
    source_date: null,
    status_name: null,
    //ผู้อนุมัติ
    verify_by_userid: null,
    verify_date: null,
    source_approve: null,
    source_approve_date: null,
    account_aprrove_id: null,
    finance_aprrove_id: null,
    // ผู้รับ
    source_department: null,
    source_BU: null,
    source: null,
    nameSource: `${sourceName} ${sourceLastName}`,
    sourceDate: dateNow,
    source_description: null,
    // ผู้รับ
    des_Department: null,
    des_BU: null,
    des_delivery: null,
    nameDes: `${desName} ${desLastName}`,
    des_deliveryDate: null,
    des_Description: null,

    sumPrice: null,
    real_price: null,
    realPrice_Date: dateNow,

  }]);

  const [serviceList, setServiceList] = React.useState([{
    dtl_id: null,
    assetsCode: null,
    serialNo: null,
    name: null,
    date_asset: null,
    price: null,
    bookValue: null,
    priceSeals: null,
    excluding_vat: null,
    profit: null,
    asset_id: null,
    image_1: null,
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

    // กำหนด Headers
    await Axios.post(config.http + '/store_FA_control_select_headers', { nac_code: nac_code }, { headers })
      .then((res) => {

        const listHeader = [...sendHeader]
        listHeader[0]['source'] = res.data.data[0].source_userid
        listHeader[0]['source_department'] = res.data.data[0].source_dep_owner
        listHeader[0]['source_BU'] = res.data.data[0].source_bu_owner
        listHeader[0]['sumPrice'] = res.data.data[0].sum_price
        listHeader[0]['nameSource'] = res.data.data[0].source_name
        listHeader[0]['sourceDate'] = res.data.data[0].source_date
        listHeader[0]['source_description'] = res.data.data[0].source_remark
        listHeader[0]['create_by'] = res.data.data[0].create_by
        listHeader[0]['verify_by_userid'] = res.data.data[0].verify_by_userid
        listHeader[0]['verify_date'] = res.data.data[0].verify_date
        listHeader[0]['source_approve'] = res.data.data[0].source_approve_userid
        listHeader[0]['source_approve_date'] = res.data.data[0].source_approve_date
        listHeader[0]['account_aprrove_id'] = res.data.data[0].account_aprrove_id
        listHeader[0]['finance_aprrove_id'] = res.data.data[0].finance_aprrove_id
        listHeader[0]['nac_code'] = res.data.data[0].nac_code
        listHeader[0]['nac_status'] = res.data.data[0].nac_status
        listHeader[0]['nac_type'] = res.data.data[0].nac_type
        listHeader[0]['source_date'] = res.data.data[0].source_date
        listHeader[0]['real_price'] = res.data.data[0].real_price
        listHeader[0]['realPrice_Date'] = res.data.data[0].realPrice_Date
        listHeader[0]['status_name'] = res.data.data[0].status_name
        setSendHeader(listHeader)
        setSourceName(res.data.data[0].source_name ? res.data.data[0].source_name.split(' ')[0] : null)
        setSourceLastName(res.data.data[0].source_name ? res.data.data[0].source_name.split(' ')[1] : null)
        setDesName(res.data.data[0].des_name ? res.data.data[0].des_name.split(' ')[0] : null)
        setDesLastName(res.data.data[0].des_name ? res.data.data[0].des_name.split(' ')[1] : null)
      })

    // กำหนด DTL
    await Axios.post(config.http + '/store_FA_control_select_dtl', { nac_code: nac_code }, { headers })
      .then((res) => {

        setServiceList(res.data.data.map((resData) => {
          return {
            dtl_id: resData.nacdtl_id
            , assetsCode: resData.nacdtl_assetsCode
            , serialNo: resData.nacdtl_assetsSeria
            , name: resData.nacdtl_assetsName
            , price: resData.nacdtl_assetsPrice
            , asset_id: resData.nacdtl_id
            , bookValue: resData.nacdtl_bookV === null ? null : resData.nacdtl_bookV
            , priceSeals: resData.nacdtl_PriceSeals ?? 0
            , excluding_vat: resData.nacdtl_PriceSeals ? (resData.nacdtl_PriceSeals * 100) / 107 : 0
            , profit: (resData.nacdtl_PriceSeals ? (resData.nacdtl_PriceSeals * 100) / 107 : 0) - resData.nacdtl_bookV
            , date_asset: resData.nacdtl_date_asset
            , image_1: resData.nacdtl_image_1 ?? null
            , image_2: resData.nacdtl_image_2 ?? null
          };
        }))
      })

    // ผู้้อนุมัติ + ผู้ตรวจสอบ
    await Axios.post(config.http + '/store_FA_control_execDocID', { user_source: sendHeader[0].source, nac_code: nac_code, }, { headers })
      .then((res) => {
        setApproveData(res.data.data);
      })
  }, [])

  const handleService_Source = (e) => {

    if (!e.target.innerText) {
      const listHeader = [...sendHeader]
      listHeader[0]['source'] = null
      listHeader[0]['source_department'] = null
      listHeader[0]['source_BU'] = null
      setSendHeader(listHeader)
    } else {
      const listHeader = [...sendHeader]
      listHeader[0]['source'] = e.target.innerText
      listHeader[0]['source_department'] = users.filter((res) => res.UserCode === e.target.innerText)[0].DepCode
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
    listHeader[0]['source_description'] = e.target.value
    setSendHeader(listHeader)
  }

  const handleService_RealPrice = (e) => {
    const listHeader = [...sendHeader]
    listHeader[0]['real_price'] = e.target.value
    setSendHeader(listHeader)
  }

  const handleService_RealPriceDate = (newValue) => {
    const listHeader = [...sendHeader]
    listHeader[0]['realPrice_Date'] = newValue.toLocaleString("sv-SE")
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
      priceSeals: null,
      profit: null,
      asset_id: null,
      image_1: null,
      image_2: null
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
    list[index]['dtl_id'] = -1;
    list[index]['excluding_vat'] = list[index]['priceSeals'] ? (list[index]['priceSeals'] * 100) / 107 : null
    list[index]['profit'] = ((list[index]['priceSeals'] ? (list[index]['priceSeals'] * 100) / 107 : null) ?? null) - list[index]['bookValue']
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

  const Export_PDF_DATA_NAC = () => {
    window.location.href = 'http://ptecdba:10250/OPS/reports/nac_sale.aspx?nac_code=' + sendHeader[0].nac_code
  }

  const handleUploadFile_1 = async (e, index) => {
    e.preventDefault();

    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };

    if (['jpg', 'png', 'gif', 'xbm', 'tif', 'pjp', 'svgz', 'jpeg', 'jfif', 'bmp', 'webp', 'svg'].indexOf((e.target.files[0].name).split('.').pop()) > -1) {

      const formData_1 = new FormData();
      formData_1.append("file", e.target.files[0]);
      formData_1.append("fileName", e.target.files[0].name);

      await Axios.post(config.http + "/check_files_NewNAC", formData_1, { headers })
        .then(async (res) => {
          const list = [...serviceList];
          list[index]['image_1'] = 'http://vpnptec.dyndns.org:33080/NEW_NAC/' + res.data.attach[0].ATT + '.' + e.target.files[0].name.split('.').pop();
          setTooltipImage_1(e.target.files[0].name)
          setServiceList(list)
          const req = {
            usercode: data.UserCode,
            dtl_id: list[index].dtl_id,
            nacdtl_row: index,
            nacdtl_assetsCode: list[index].assetsCode,
            nacdtl_assetsName: list[index].name,
            nacdtl_assetsSeria: list[index].serialNo,
            nacdtl_assetsDtl: list[index].dtl,
            nacdtl_assetsCount: list[index].count,
            nacdtl_assetsPrice: list[index].price,
            asset_id: list[index].asset_id,
            image_1: list[index].image_1,
            image_2: null,
          }
          await Axios.post(config.http + "/store_FA_control_update_DTL", req, config.headers)
        });

    } else {
      alert('ไฟล์ประเภทนี้ไม่ได้รับอนุญาติให้ใช้งานในระบบ \nใช้ได้เฉพาะ .csv, .xls, .txt, .ppt, .doc, .pdf, .jpg, .png, .gif')
    }
  }

  const handleCancelUploadFile_1 = async (e, index) => {
    e.preventDefault();

    const list = [...serviceList];
    list[index]['image_1'] = "";
    setServiceList(list)
    setTooltipImage_1(null)

    const req = {
      usercode: data.UserCode,
      dtl_id: list[index].dtl_id,
      nacdtl_row: index,
      nacdtl_assetsCode: list[index].assetsCode,
      nacdtl_assetsName: list[index].name,
      nacdtl_assetsSeria: list[index].serialNo,
      nacdtl_assetsDtl: list[index].dtl,
      nacdtl_assetsCount: list[index].count,
      nacdtl_assetsPrice: list[index].price,
      asset_id: list[index].asset_id,
      image_1: list[index]['image_1'],
      image_2: null,
    }
    await Axios.post(config.http + "/store_FA_control_update_DTL", req, config.headers)
  }

  const handleUpdateNAC = async () => {
    await Axios.post(config.http + '/store_FA_control_updateStatus', sendHeader[0], config.headers)
      .then(async () => {
        await Axios.post(config.http + "/store_FA_control_update_DTLandHeaders", sendHeader[0], config.headers)
          .then(async (res) => {
            if (res.data.data) {
              for (let i = 0; i < serviceList.length; i++) {
                const reqII = {
                  dtl_id: !serviceList[i].dtl_id ? 0 : serviceList[i].dtl_id,
                  usercode: data.UserCode,
                  nac_code: nac_code, // ได้จาก Response ของ Store_FA_control_create_doc
                  nacdtl_row: i,
                  nacdtl_assetsCode: serviceList[i].assetsCode,
                  nacdtl_assetsName: serviceList[i].name,
                  nacdtl_assetsSeria: serviceList[i].serialNo,
                  nacdtl_assetsPrice: serviceList[i].price,
                  asset_id: !serviceList[i].asset_id ? 0 : serviceList[i].asset_id,
                  image_1: serviceList[i].image_1,
                  image_2: null,
                }
                await Axios.post(config.http + '/store_FA_control_update_DTL', reqII, config.headers)
                  .then(async (resII) => {
                    if (resII.data.data) {
                      const detail_reqII = {
                        usercode: data.UserCode,
                        nac_code: res.data.data[0].nac_code,
                        nac_type: sendHeader[0].worktype,
                        nacdtl_bookV: serviceList[i].bookValue,
                        nacdtl_PriceSeals: serviceList[i].priceSeals,
                        nacdtl_profit: serviceList[i].profit,
                        asset_id: resII.data.data[0].nacdtl_id,
                        nac_status: 1,
                        nacdtl_assetsCode: serviceList[i].assetsCode
                      }
                      await Axios.post(config.http + '/store_FA_control_updateDTL_seals', detail_reqII, config.headers)
                        .then((resIII) => {
                          if (i + 1 === serviceList.length) {
                            swal("แจ้งเตือน", 'อัปเดตรายการแล้ว', "success", { buttons: false, timer: 2000 }).then((value) => {
                              const pathLink = resIII.data.data[0].nac_code ? resIII.data.data[0].nac_code : nac_code
                              window.location.href = '/NAC_ROW/NAC_SEALS_APPROVE?' + pathLink
                            });
                          }
                        })
                    }
                  })
              }
            }
          })
      })
  }

  const handleSubmit_To_BookValue = async () => {
    if (!sendHeader[0].source || !sourceName || !sourceLastName) {
      swal("แจ้งเตือน", 'กรุณาระบุ (ผู้ส่งมอบ/ชื่อ-นามสกุล ผู้ส่งมอบ)', "error")
    } else if ((serviceList.filter((res) => !res.assetsCode)[0]) !== undefined) {
      swal("แจ้งเตือน", 'กรุณาระบุข้อมูลทรัพย์สินให้ครบ', "error")
    } else if ((serviceList.filter((res) => res.priceSeals === null)[0]) !== undefined) {
      swal("แจ้งเตือน", 'กรุณาระบุราคาขาย', "error")
    }
    // else if ((serviceList.filter((res) => !res.image_1)[0]) !== undefined) {
    //   swal("แจ้งเตือน", 'กรุณาใส่รูปภาพทรัพย์สิน', "error")
    // }
    else {
      // รอใส่เงือนไข
      const reqUpdateStatus = {
        usercode: data.UserCode,
        nac_code: nac_code,
        nac_status: 11,
        nac_type: sendHeader[0].nac_type,
        source: sendHeader[0].source,
        sourceDate: sendHeader[0].sourceDate,
        des_delivery: sendHeader[0].des_delivery,
        des_deliveryDate: sendHeader[0].des_deliveryDate,
        des_approve: sendHeader[0].des_approve,
        des_approve_date: sendHeader[0].des_approve_date,
        real_price: sendHeader[0].real_price,
        realPrice_Date: sendHeader[0].realPrice_Date,
        verify_by: sendHeader[0].verify_by,
        verify_date: sendHeader[0].verify_date,
        source_approve: sendHeader[0].source_approve,
        source_approve_date: sendHeader[0].source_approve_date,
      }
      await Axios.post(config.http + '/store_FA_control_updateStatus', reqUpdateStatus, config.headers)
        .then(async (res) => {
          if (res.data.data) {
            for (let i = 0; i < serviceList.length; i++) {
              const reqII = {
                dtl_id: !serviceList[i].dtl_id ? 0 : serviceList[i].dtl_id,
                usercode: data.UserCode,
                nac_code: nac_code, // ได้จาก Response ของ Store_FA_control_create_doc
                nacdtl_row: i,
                nacdtl_assetsCode: serviceList[i].assetsCode,
                nacdtl_assetsName: serviceList[i].name,
                nacdtl_assetsSeria: serviceList[i].serialNo,
                nacdtl_assetsPrice: serviceList[i].price,
                asset_id: !serviceList[i].asset_id ? 0 : serviceList[i].asset_id,
                image_1: serviceList[i].image_1,
                image_2: null,
              }
              await Axios.post(config.http + '/store_FA_control_update_DTL', reqII, config.headers)
                .then(async (resII) => {
                  if (resII.data.data) {
                    const detail_reqII = {
                      usercode: data.UserCode,
                      nac_code: res.data.data[0].nac_code,
                      nac_type: sendHeader[0].worktype,
                      nacdtl_bookV: serviceList[i].bookValue,
                      nacdtl_PriceSeals: serviceList[i].priceSeals,
                      nacdtl_profit: serviceList[i].profit,
                      asset_id: resII.data.data[0].nacdtl_id,
                      nac_status: 1,
                      nacdtl_assetsCode: serviceList[i].assetsCode
                    }
                    await Axios.post(config.http + '/store_FA_control_updateDTL_seals', detail_reqII, config.headers)
                      .then(async (resIII) => {
                        if (i + 1 === serviceList.length) {
                          await store_FA_SendMail({
                            nac_code
                          })
                          await store_FA_control_comment({
                            nac_code,
                            usercode: data.UserCode,
                            comment: 'ยืนยันรายการแล้ว',
                          })
                          swal("แจ้งเตือน", 'อัปเดตรายการแล้ว', "success", { buttons: false, timer: 2000 }).then((value) => {
                            const pathLink = resIII.data.data[0].nac_code ? resIII.data.data[0].nac_code : nac_code
                            window.location.href = '/NAC_ROW/NAC_SEALS_APPROVE?' + pathLink
                          });
                        }
                      })
                  }
                })
            }
          }
        })
    }
  };

  const handleSubmit_To_Verify = async () => {
    if (!sendHeader[0].source || !sourceName || !sourceLastName) {
      swal("แจ้งเตือน", 'กรุณาระบุ (ผู้ส่งมอบ/ชื่อ-นามสกุล ผู้ส่งมอบ)', "error")
    } else if ((serviceList.filter((res) => !res.assetsCode)[0]) !== undefined) {
      swal("แจ้งเตือน", 'กรุณาระบุข้อมูลทรัพย์สินให้ครบ', "error")
    } else if ((serviceList.filter((res) => res.priceSeals === null)[0]) !== undefined) {
      swal("แจ้งเตือน", 'กรุณาระบุราคาขาย', "error")
    }
    else if ((serviceList.filter((res) => !res.bookValue)[0]) !== undefined) {
      swal("แจ้งเตือน", 'กรุณาระบุ Book Value', "error")
    } else if (approveData.filter((res) => res.workflowlevel !== 0 && data.UserCode === res.approverid)[0] || permission_MenuID.indexOf(9) > -1) {
      // รอใส่เงือนไข
      const reqUpdateStatus = {
        usercode: data.UserCode,
        nac_code: nac_code,
        nac_status: approveData.filter((res) => res.limitamount < sendHeader[0].sumPrice)[0] ? 2 : 3,
        nac_type: sendHeader[0].nac_type,
        source: sendHeader[0].source,
        sourceDate: sendHeader[0].sourceDate,
        des_delivery: sendHeader[0].des_delivery,
        des_deliveryDate: sendHeader[0].des_deliveryDate,
        des_approve: sendHeader[0].des_approve,
        des_approve_date: sendHeader[0].des_approve_date,
        real_price: sendHeader[0].real_price,
        realPrice_Date: sendHeader[0].realPrice_Date,
        verify_by: sendHeader[0].verify_by,
        verify_date: sendHeader[0].verify_date,
        source_approve: sendHeader[0].source_approve,
        source_approve_date: sendHeader[0].source_approve_date,
      }
      await Axios.post(config.http + '/store_FA_control_updateStatus', reqUpdateStatus, config.headers)
        .then(async (res) => {
          if (res.data.data) {
            for (let i = 0; i < serviceList.length; i++) {
              const reqII = {
                dtl_id: !serviceList[i].dtl_id ? 0 : serviceList[i].dtl_id,
                usercode: data.UserCode,
                nac_code: nac_code, // ได้จาก Response ของ Store_FA_control_create_doc
                nacdtl_row: i,
                nacdtl_assetsCode: serviceList[i].assetsCode,
                nacdtl_assetsName: serviceList[i].name,
                nacdtl_assetsSeria: serviceList[i].serialNo,
                nacdtl_assetsPrice: serviceList[i].price,
                asset_id: !serviceList[i].asset_id ? 0 : serviceList[i].asset_id,
                image_1: serviceList[i].image_1,
                image_2: null,
              }
              await Axios.post(config.http + '/store_FA_control_update_DTL', reqII, config.headers)
                .then(async (resII) => {
                  if (resII.data.data) {
                    const detail_reqII = {
                      usercode: data.UserCode,
                      nac_code: res.data.data[0].nac_code,
                      nac_type: sendHeader[0].worktype,
                      nacdtl_bookV: serviceList[i].bookValue,
                      nacdtl_PriceSeals: serviceList[i].priceSeals,
                      nacdtl_profit: serviceList[i].profit,
                      asset_id: resII.data.data[0].nacdtl_id,
                      nac_status: 1,
                      nacdtl_assetsCode: serviceList[i].assetsCode
                    }
                    await Axios.post(config.http + '/store_FA_control_updateDTL_seals', detail_reqII, config.headers)
                      .then(async (resIII) => {
                        if (i + 1 === serviceList.length) {
                          await store_FA_SendMail({
                            nac_code
                          })
                          await store_FA_control_comment({
                            nac_code,
                            usercode: data.UserCode,
                            comment: 'กรอก Book Value เรียบร้อยแล้ว',
                          })
                          swal("แจ้งเตือน", 'อัปเดตรายการแล้ว', "success", { buttons: false, timer: 2000 }).then((value) => {
                            const pathLink = resIII.data.data[0].nac_code ? resIII.data.data[0].nac_code : nac_code
                            window.location.href = '/NAC_ROW/NAC_SEALS_APPROVE?' + pathLink
                          });
                        }
                      })
                  }
                })
            }
          }
        })
    } else {
      swal("แจ้งเตือน", `ถูกจำกัดสิทธิ์`, "error")
    }
  }

  const handleSubmit_To_Approve = async () => {
    if (!sendHeader[0].source || !sourceName || !sourceLastName) {
      swal("แจ้งเตือน", 'กรุณาระบุ (ผู้ส่งมอบ/ชื่อ-นามสกุล ผู้ส่งมอบ)', "error")
    } else if ((serviceList.filter((res) => !res.assetsCode)[0]) !== undefined) {
      swal("แจ้งเตือน", 'กรุณาระบุข้อมูลทรัพย์สินให้ครบ', "error")
    } else if ((serviceList.filter((res) => res.priceSeals === null)[0]) !== undefined) {
      swal("แจ้งเตือน", 'กรุณาระบุราคาขาย', "error")
    }
    else if (approveData.filter((res) => res.approverid === data.UserCode && res.status === 1)[0]) {
      swal("แจ้งเตือน", `${data.UserCode} ทำรายการไปแล้ว`, "error")
    } else if (approveData.filter((res) => res.approverid === data.UserCode && res.status === 0)[0] || permission_MenuID.indexOf(10) > -1) {
      // รอใส่เงือนไข
      const reqUpdateStatus = {
        usercode: data.UserCode,
        nac_code: nac_code,
        nac_status: 3,
        nac_type: sendHeader[0].nac_type,
        source: sendHeader[0].source,
        sourceDate: sendHeader[0].sourceDate,
        des_delivery: sendHeader[0].des_delivery,
        des_deliveryDate: sendHeader[0].des_deliveryDate,
        des_approve: sendHeader[0].des_approve,
        des_approve_date: sendHeader[0].des_approve_date,
        real_price: sendHeader[0].real_price,
        realPrice_Date: sendHeader[0].realPrice_Date,
        verify_by: data.UserCode,
        verify_date: dateNow,
        source_approve: sendHeader[0].source_approve,
        source_approve_date: sendHeader[0].source_approve_date,
      }
      await Axios.post(config.http + '/store_FA_control_updateStatus', reqUpdateStatus, config.headers)
        .then(async (res) => {
          if (res.data.data) {
            for (let i = 0; i < serviceList.length; i++) {
              const reqII = {
                dtl_id: !serviceList[i].dtl_id ? 0 : serviceList[i].dtl_id,
                usercode: data.UserCode,
                nac_code: nac_code, // ได้จาก Response ของ Store_FA_control_create_doc
                nacdtl_row: i,
                nacdtl_assetsCode: serviceList[i].assetsCode,
                nacdtl_assetsName: serviceList[i].name,
                nacdtl_assetsSeria: serviceList[i].serialNo,
                nacdtl_assetsPrice: serviceList[i].price,
                asset_id: !serviceList[i].asset_id ? 0 : serviceList[i].asset_id,
                image_1: serviceList[i].image_1,
                image_2: null,
              }
              await Axios.post(config.http + '/store_FA_control_update_DTL', reqII, config.headers)
                .then(async (resII) => {
                  if (resII.data.data) {
                    const detail_reqII = {
                      usercode: data.UserCode,
                      nac_code: res.data.data[0].nac_code,
                      nac_type: sendHeader[0].worktype,
                      nacdtl_bookV: serviceList[i].bookValue,
                      nacdtl_PriceSeals: serviceList[i].priceSeals,
                      nacdtl_profit: serviceList[i].profit,
                      asset_id: resII.data.data[0].nacdtl_id,
                      nac_status: 1,
                      nacdtl_assetsCode: serviceList[i].assetsCode
                    }
                    await Axios.post(config.http + '/store_FA_control_updateDTL_seals', detail_reqII, config.headers)
                      .then(async (resIII) => {
                        if (i + 1 === serviceList.length) {
                          await store_FA_SendMail({
                            nac_code
                          })
                          await store_FA_control_comment({
                            nac_code,
                            usercode: data.UserCode,
                            comment: 'ตรวจสอบรายการ',
                          })
                          swal("แจ้งเตือน", 'อัปเดตรายการแล้ว', "success", { buttons: false, timer: 2000 }).then((value) => {
                            const pathLink = resIII.data.data[0].nac_code ? resIII.data.data[0].nac_code : nac_code
                            window.location.href = '/NAC_ROW/NAC_SEALS_APPROVE?' + pathLink
                          });
                        }
                      })
                  }
                })
            }
          }
        })
    } else {
      swal("แจ้งเตือน", `ถูกจำกัดสิทธิ์`, "error")
    }
  }

  const handleSubmit_Form = async () => {
    if (sendHeader[0].nac_status === 12 && !sendHeader[0].real_price) {
      swal("แจ้งเตือน", `กรุณาระบุ (ราคาขายจริง/วันที่ได้รับเงิน)`, "error")
    } else if ((sendHeader[0].nac_status === 3 && approveData.filter((res) => res.approverid === data.UserCode && res.limitamount >= sendHeader[0].sumPrice)[0])
      || (sendHeader[0].nac_status === 3 && permission_MenuID.indexOf(10) > -1)) {
      const reqUpdateStatus = {
        usercode: data.UserCode,
        nac_code: nac_code,
        nac_status:
          (sendHeader[0].nac_status === 3 && !sendHeader[0].real_price) ? 12 :
            (sendHeader[0].nac_status === 3 && sendHeader[0].real_price) ? 15 :
              (sendHeader[0].nac_status === 12 && sendHeader[0].real_price >= price_seals) ? 15 :
                (sendHeader[0].nac_status === 12 && sendHeader[0].real_price < price_seals) ? 99 :
                  sendHeader[0].nac_status === 15 ? 13 :
                    sendHeader[0].nac_status === 13 ? 6 : null,
        nac_type: sendHeader[0].nac_type,
        source: sendHeader[0].source,
        sourceDate: sendHeader[0].sourceDate,
        des_delivery: sendHeader[0].des_delivery,
        des_deliveryDate: sendHeader[0].des_deliveryDate,
        des_approve: sendHeader[0].des_approve,
        des_approve_date: sendHeader[0].des_approve_date,
        real_price: sendHeader[0].real_price,
        realPrice_Date: sendHeader[0].nac_status === 12 ? dateNow : sendHeader[0].realPrice_Date,
        verify_by: sendHeader[0].verify_by_userid,
        verify_date: sendHeader[0].verify_date,
        source_approve: sendHeader[0].nac_status === 3 ? data.UserCode : sendHeader[0].source_approve,
        source_approve_date: sendHeader[0].nac_status === 3 ? dateNow : sendHeader[0].source_approve_date,
      }
      await Axios.post(config.http + '/store_FA_control_updateStatus', reqUpdateStatus, config.headers)
        .then(async (res) => {
          if (res.data) {
            await store_FA_SendMail({
              nac_code
            })
            await store_FA_control_comment({
              nac_code,
              usercode: (sendHeader[0].nac_status === 12 && sendHeader[0].real_price < price_seals && price_seals === '0') ? 'SYSTEM' : data.UserCode,
              comment: (sendHeader[0].nac_status === 3 && !sendHeader[0].real_price) ? 'อนุมัติรายการ' :
                (sendHeader[0].nac_status === 3 && sendHeader[0].real_price) ? 'อนุมัติรายการ' :
                  (sendHeader[0].nac_status === 12 && sendHeader[0].real_price >= price_seals) ? `กรอกราคาที่ขายได้เรียบร้อย ${sendHeader[0].real_price} บาท` :
                    (sendHeader[0].nac_status === 12 && sendHeader[0].real_price < price_seals && price_seals !== '0') ? 'กรอกราคาที่ขายได้เรียบร้อย' :
                      (sendHeader[0].nac_status === 12 && sendHeader[0].real_price < price_seals && price_seals === '0') ? 'เนื่องจากราคาขายคือ 0 จึงทำให้ประเภทการเปลี่ยนแปลงเปลี่ยนเป็น ตัดบัญชีทรัพย์สิน' :
                        sendHeader[0].nac_status === 15 ? 'บัญชีตรวจสอบรายการ' :
                          sendHeader[0].nac_status === 13 ? 'ปิดรายการ' : null,
            })
            if (res.data.data[0].nac_status === 6) {
              for (var i = 0; i < serviceList.length; i++) {
                await Axios.post(config.http + '/store_FA_control_upadate_table', {
                  nac_code,
                  usercode: data.UserCode,
                  nacdtl_assetsCode: serviceList[i].assetsCode,
                  asset_id: serviceList[i].asset_id,
                  nac_type: sendHeader[0].nac_type,
                  nac_status: res.data.data[0].nac_status,
                }, config.headers).then((res) => {
                  if (i + 1 === serviceList.length) {
                    swal("แจ้งเตือน", 'อัปเดตรายการแล้ว', "success", { buttons: false, timer: 2000 }).then((value) => {
                      const pathLink = res.data.data[0].nac_code ? res.data.data[0].nac_code : nac_code
                      window.location.href = '/NAC_ROW/NAC_SEALS_APPROVE?' + pathLink
                    });
                  }
                })
              }
            } else {
              if (sendHeader[0].nac_status === 12 && sendHeader[0].real_price === '0') {
                swal("แจ้งเตือน", 'เนื่องจากราคาขายคือ 0 จึงทำให้ประเภทการเปลี่ยนแปลงเปลี่ยนเป็น ตัดบัญชีทรัพย์สิน', "warning").then((value) => {
                  swal("แจ้งเตือน", 'อัปเดตรายการแล้ว', "success", { buttons: false, timer: 2000 }).then((value) => {
                    const pathLink = res.data.data[0].nac_code ? res.data.data[0].nac_code : nac_code
                    window.location.href = '/NAC_ROW/NAC_DELETE_WAIT_APPROVE?' + pathLink
                  });
                });
              } else {
                swal("แจ้งเตือน", 'อัปเดตรายการแล้ว', "success", { buttons: false, timer: 2000 }).then((value) => {
                  const pathLink = res.data.data[0].nac_code ? res.data.data[0].nac_code : nac_code
                  window.location.href = '/NAC_ROW/NAC_SEALS_APPROVE?' + pathLink
                });
              }
            }
          }
        })
    } else {
      swal("แจ้งเตือน", `ถูกจำกัดสิทธิ์`, "error")
    }
  }

  const handleReply = async () => {
    const reqUpdateStatus = {
      usercode: data.UserCode,
      nac_code: nac_code,
      nac_status: 1,
      nac_type: sendHeader[0].nac_type,
      source: sendHeader[0].source,
      sourceDate: sendHeader[0].sourceDate,
      des_delivery: sendHeader[0].des_delivery,
      des_deliveryDate: sendHeader[0].des_deliveryDate,
      des_approve: sendHeader[0].des_approve,
      des_approve_date: sendHeader[0].des_approve_date,
      real_price: sendHeader[0].real_price,
      realPrice_Date: sendHeader[0].realPrice_Date,
      verify_by: sendHeader[0].verify_by,
      verify_date: sendHeader[0].verify_date,
      source_approve: sendHeader[0].source_approve,
      source_approve_date: sendHeader[0].source_approve_date,
    }
    await Axios.post(config.http + '/store_FA_control_updateStatus', reqUpdateStatus, config.headers)
      .then(async (res) => {
        if (res.data) {
          await store_FA_SendMail({
            nac_code
          })
          await store_FA_control_comment({
            nac_code,
            usercode: data.UserCode,
            comment: `ตีกลับรายการ "${commentReply}"`,
          })
          swal("แจ้งเตือน", 'อัปเดตรายการแล้ว', "success", { buttons: false, timer: 2000 }).then((value) => {
            const pathLink = res.data.data[0].nac_code ? res.data.data[0].nac_code : nac_code
            window.location.href = '/NAC_ROW/NAC_SEALS_APPROVE?' + pathLink
          });
        }
      })
  }

  const handleChangeCommentReply = (event) => {
    event.preventDefault();
    setCommentReply(event.target.value)
  }

  const handleCloseDialogReply = () => {
    setOpenDialogReply(false);
  };

  const handleOpenDialogReply = () => {
    setOpenDialogReply(true);
  };

  const handleClose_drop_NAC_byDes = () => {
    setDrop_NAC_byDes(false);
  };

  const handleOpen_drop_NAC_byDes = () => {
    setDrop_NAC_byDes(true);
  };

  const drop_NAC = async () => {
    await Axios.post(config.http + '/store_FA_control_drop_NAC', {
      usercode: data.UserCode,
      nac_code,
    }, config.headers)
      .then((res) => {
        if ('data' in res) {
          swal("แจ้งเตือน", 'ทำการลบรายการ ' + nac_code + ' แล้ว', "success", { buttons: false, timer: 2000 })
            .then((value) => {
              window.location.href = "/NAC_OPERATOR";
            });
        } else {
          swal("แจ้งเตือน", 'ไม่สามารถลบ ' + nac_code + ' ได้', "error")
        }
      })
  }

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  React.useEffect(() => {
    window.setTimeout(() => {
      setCounter(10);
    }, 2000)
  }, []);

  if ((!sendHeader[0].nac_code && nac_code && counter < 10) || (nac_code && counter < 10)) {
    return (
      <React.Fragment>
        <Box
          sx={{
            marginTop: 30,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Stack direction="row" spacing={3}>
            <CircularProgress disableShrink color="inherit" />
            <Typography variant="h4" color="inherit" >
              Loading...
            </Typography>
          </Stack>
        </Box>
      </React.Fragment>
    );
  } else if (sendHeader[0].nac_type === '5' || sendHeader[0].nac_type === 5) {
    return (
      <React.Fragment>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppbarNAC
            nac_code={nac_code}
            nac_type={sendHeader[0].nac_type}
            sendHeader={sendHeader}
            approveData={approveData}
          />
          <AnimatedPage>
            <Container component="main" maxWidth="lg" sx={{ mb: 12, minWidth: window.innerWidth * 0.8 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'end',
                  alignItems: 'baseline'
                }}
              >
                <Card
                  style={{
                    borderTopLeftRadius: '100%',
                    borderBottomLeftRadius: '0%',
                    'maxWidth': 'fit-content',
                    'backgroundColor': sendHeader[0].nac_status === 1 ?
                      '#1E90FF' : sendHeader[0].nac_status === 2 ?
                        '#6495ED' : sendHeader[0].nac_status === 3 ?
                          '#FF69B4' : sendHeader[0].nac_status === 4 ?
                            '#00CED1' : sendHeader[0].nac_status === 5 ?
                              '#6A5ACD' : sendHeader[0].nac_status === 6 ?
                                '#008000' : sendHeader[0].nac_status === 7 ?
                                  '#FFA500' : sendHeader[0].nac_status === 8 ?
                                    '#F0E68C' : sendHeader[0].nac_status === 11 ?
                                      '#F4A460' : sendHeader[0].nac_status === 12 ?
                                        '#DDA0DD' : sendHeader[0].nac_status === 13 ?
                                          '#6A5ACD' : sendHeader[0].nac_status === 14 ?
                                            '#708090' : sendHeader[0].nac_status === 15 ?
                                              '#6A5ACD' : '#DC143C'
                  }}
                  sx={{ pt: 2, pl: 10, pr: 3, mb: 0, color: 'RGB(255,255,255)' }}
                  className='scaled-480px-Header'
                >
                  <Typography align="center" className='scaled-480px-TableContent' sx={{ ml: 5, mt: 1 }}>
                    {sendHeader[0].status_name}
                  </Typography>
                </Card>
              </Box>
              <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 }, overflow: 'hidden' }}>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={1}
                >
                  <Grid item xs={2}>
                    <Box>
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
                    <Typography sx={{ p: 2, border: '1px dashed grey' }} className='scaled-480px-Header text-center'>
                      <b>{sendHeader[0].nac_code}</b>
                    </Typography>
                  </Grid>
                </Grid>
                <Box sx={{ pt: 3 }}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    spacing={2}

                  >
                    <Typography className='scaled-480px-Header-Content' color='error'>
                      * กรุณากรอกข้อมูลสำหรับขายทรัพย์สิน
                    </Typography>
                    <Button
                      onClick={Export_PDF_DATA_NAC}
                      variant='contained'
                      color='warning'
                      size='small'
                    >
                      <Typography className='scaled-480px-Header-Content text-center'>
                        Dowload Report
                      </Typography>
                    </Button>
                  </Stack>
                </Box>
                <TableContainer>
                  <Table>
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
                            ขายทรัพย์สิน
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
                                value={!sendHeader[0].source_department ? '' : sendHeader[0].source_department}
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
                              freeSolo
                              name='source'
                              size="small"
                              value={sendHeader[0].source}
                              disabled={(permission_MenuID.indexOf(16) > -1 || sendHeader[0].nac_status === 1) ? false : true}
                              sx={{
                                "& .MuiInputBase-input.Mui-disabled": {
                                  WebkitTextFillColor: "#000000",
                                },
                              }}
                              classes={{
                                input: 'scaled-480px-TableContent',
                                option: 'scaled-480px-TableContent',

                              }}
                              disableClearable={true}
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
                                  disabled={(permission_MenuID.indexOf(16) > -1 || sendHeader[0].nac_status === 1) ? false : true}
                                  sx={{
                                    "& .MuiInputBase-input.Mui-disabled": {
                                      WebkitTextFillColor: "#000000",
                                    },
                                    pt: 1
                                  }}
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
                                  disabled={(permission_MenuID.indexOf(16) > -1 || sendHeader[0].nac_status === 1) ? false : true}
                                  sx={{
                                    "& .MuiInputBase-input.Mui-disabled": {
                                      WebkitTextFillColor: "#000000",
                                    },
                                    pt: 1
                                  }}
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
                                disabled={(permission_MenuID.indexOf(16) > -1 || sendHeader[0].nac_status === 1) ? false : true}
                                sx={{
                                  "& .MuiInputBase-input.Mui-disabled": {
                                    WebkitTextFillColor: "#000000",
                                  },
                                  pt: 1
                                }}
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
                              name='source_description'
                              value={sendHeader[0].source_description}
                              disabled={(permission_MenuID.indexOf(16) > -1 || sendHeader[0].nac_status === 1) ? false : true}
                              sx={{
                                "& .MuiInputBase-input.Mui-disabled": {
                                  WebkitTextFillColor: "#000000",
                                },
                                pt: 1
                              }}
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
                          <Typography className='scaled-480px-TableHeader'>
                            รูปภาพ
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
                          <StyledTableCell align="center">
                            <Autocomplete
                              freeSolo
                              name="assetsCode"
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
                              disabled={(permission_MenuID.indexOf(16) > -1 || sendHeader[0].nac_status === 1) ? false : true}
                              value={res.assetsCode}
                              options={dataAssets.map((option) => option.Code)}
                              onChange={(e) => handleServiceChangeHeader(e, index)}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  variant="standard"
                                  InputProps={{
                                    ...params.InputProps,
                                    disableUnderline: (permission_MenuID.indexOf(16) > -1 || sendHeader[0].nac_status === 1) ? false : true,
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
                              disabled={(permission_MenuID.indexOf(9) > -1 && sendHeader[0].nac_status === 11) || permission_MenuID.indexOf(16) > -1 ? false : true}
                              type={data.branchid === 901 ? "text" : "password"}
                              onChange={(e) => handleServiceChange(e, index)}
                              InputProps={{
                                disableUnderline: (permission_MenuID.indexOf(9) > -1 && sendHeader[0].nac_status === 11) || permission_MenuID.indexOf(16) > -1 ? false : true,
                                inputComponent: NumericFormatCustom,
                                classes: {
                                  input: 'scaled-480px-TableContent text-center',
                                },
                              }}
                              value={res.bookValue === null ? '' : res.bookValue}
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
                              disabled={sendHeader[0].nac_status === 1 || permission_MenuID.indexOf(16) > -1 ? false : true}
                              onChange={(e) => handleServiceChange(e, index)}
                              InputProps={{
                                disableUnderline: sendHeader[0].nac_status === 1 || permission_MenuID.indexOf(16) > -1 ? false : true,
                                inputComponent: NumericFormatCustom,
                                classes: {
                                  input: 'scaled-480px-TableContent text-center',
                                },
                              }}
                              value={res.priceSeals === null ? '' : res.priceSeals}
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
                              value={res.excluding_vat === null ? '' : res.excluding_vat}
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
                              value={res.profit === null ? '' : res.profit}
                              variant="standard"
                            />
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {res.image_1 === '' || !res.image_1 ?
                              <React.Fragment>
                                <Tooltip title="Image 1">
                                  <IconButton disabled={res.assetsCode ? false : true} color='error' aria-label="upload picture" component="label">
                                    <input hidden type="file" name='file' accept='image/*' onChange={(e) => handleUploadFile_1(e, index)} />
                                    <FilePresentIcon className='scaled-icon-table' />
                                  </IconButton>
                                </Tooltip>
                              </React.Fragment> :
                              <React.Fragment>
                                <Stack direction="row" spacing={0}>
                                  <Tooltip title={TooltipImage_1 ? TooltipImage_1 : res.image_1}>
                                    <IconButton onClick={() => window.open(res.image_1, "_blank")} aria-label="upload picture" component="label">
                                      <FilePresentIcon className='scaled-icon-table' />
                                    </IconButton>
                                  </Tooltip>
                                  <Tooltip title='delete image 1'>
                                    <IconButton component="label">
                                      <ClearIcon onClick={(e) => handleCancelUploadFile_1(e, index)} className='scaled-icon-table' />
                                    </IconButton>
                                  </Tooltip>
                                </Stack>
                              </React.Fragment>
                            }
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {serviceList.length !== 0 && (
                              <IconButton
                                disabled={(permission_MenuID.indexOf(16) > -1 || sendHeader[0].nac_status === 1) ? false : true}
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
                        <StyledTableCell align="start" colSpan={4}>
                          <Typography className='scaled-480px-TableContent' >
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
                                input: 'scaled-480px-TableContent text-center',
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
                                input: 'scaled-480px-TableContent text-center',
                              },
                            }}
                            value={book_V === null ? '' : book_V}
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
                                input: 'scaled-480px-TableContent text-center',
                              },
                            }}
                            value={price_seals === null ? '' : price_seals}
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
                              classes: {
                                input: 'scaled-480px-TableContent text-center',
                              },
                            }}
                            value={sum_vat === null ? '' : sum_vat}
                            variant="standard"
                          />
                        </StyledTableCell>
                        <StyledTableCell align="center" colSpan={1}>
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
                                input: 'scaled-480px-TableContent text-center',
                              },
                            }}
                            value={profit_seals === null ? '' : profit_seals}
                            variant="standard"
                          />
                        </StyledTableCell>
                      </StyledTableRow>
                    </TableBody>
                    {sendHeader[0].realPrice_Date || sendHeader[0].nac_status === 12 ? (
                      <TableBody>
                        <StyledTableRow>
                          <StyledTableCell align="start" colSpan={4}>
                            <Typography className='scaled-480px-TableContent' color='error' >
                              *ระบุราคาขายจริงและวันที่ได้รับเงิน
                            </Typography>
                          </StyledTableCell>
                          <StyledTableCell align="start" colSpan={4}>
                            <TextField
                              sx={{
                                "& .MuiInputBase-input.Mui-disabled": {
                                  WebkitTextFillColor: "#000000",
                                },
                                py: '0.45em'
                              }}
                              disabled={permission_MenuID.indexOf(16) > -1 || sendHeader[0].nac_status === 12 ? false : true}
                              value={sendHeader[0].real_price}
                              InputProps={{
                                disableUnderline: permission_MenuID.indexOf(16) > -1 || sendHeader[0].nac_status === 12 ? false : true,
                                inputComponent: NumericFormatCustom,
                                classes: {
                                  input: 'scaled-480px-TableContent text-center',
                                },
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <Typography color="black" className='scaled-480px-TableContent'>
                                      จำนวนเงิน :
                                    </Typography>
                                  </InputAdornment>
                                ),
                                endAdornment: (
                                  <InputAdornment position="start">
                                    <Typography color="black" className='scaled-480px-TableContent'>
                                      บาท
                                    </Typography>
                                  </InputAdornment>
                                ),
                              }}
                              onChange={handleService_RealPrice}
                              variant="standard"
                            />
                          </StyledTableCell>
                          <StyledTableCell align="start" colSpan={3}>
                            <LocalizationProvider dateAdapter={DateAdapter}>
                              <DatePicker
                                // inputFormat="yyyy-MM-dd"
                                name='RealPriceDate'
                                value={sendHeader[0].realPrice_Date}
                                sx={{
                                  "& .MuiInputBase-input.Mui-disabled": {
                                    WebkitTextFillColor: "#000000",
                                  },
                                  py: '0.45em'
                                }}
                                onChange={handleService_RealPriceDate}
                                InputProps={{
                                  disableUnderline: sendHeader[0].nac_status === 12 ? false : true,
                                  classes: {
                                    input: 'scaled-480px-TableContent',
                                  },
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <Typography color="black" className='scaled-480px-TableContent'>
                                        วันที่จ่ายเงิน :
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
                          </StyledTableCell>
                        </StyledTableRow>
                      </TableBody>
                    ) : null}
                  </Table>
                  <Table>
                    <TableHead>
                      <StyledTableRow>
                        <StyledTableCell align="center">
                          <Typography className='scaled-480px-TableHeader' >
                            ผู้ทำรายการ : [{sendHeader[0].create_by}] {sendHeader[0].source_date.split('T')[0]}
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <Typography className='scaled-480px-TableHeader' >
                            ผู้ตรวจสอบ : {sendHeader[0].verify_by_userid ? `[${sendHeader[0].verify_by_userid}]` : '-'} {sendHeader[0].verify_date ? sendHeader[0].verify_date.split('T')[0] : ''}
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <Typography className='scaled-480px-TableHeader' >
                            ผู้อนุมัติ : {sendHeader[0].source_approve ? `[${sendHeader[0].source_approve}]` : '-'} {sendHeader[0].source_approve_date ? sendHeader[0].source_approve_date.split('T')[0] : ''}
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <Typography className='scaled-480px-TableHeader' >
                            บัญชีตรวจสอบ : {sendHeader[0].account_aprrove_id ? `[${sendHeader[0].account_aprrove_id}]` : '-'}
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <Typography className='scaled-480px-TableHeader' >
                            การเงินตรวจสอบ : {sendHeader[0].finance_aprrove_id ? `[${sendHeader[0].finance_aprrove_id}]` : '-'}
                          </Typography>
                        </StyledTableCell>
                      </StyledTableRow>
                    </TableHead>
                  </Table>
                  <Table>
                    <TableBody>
                      <TableCell align="center">
                        <Stack
                          justifyContent="center"
                          spacing={{ xs: 1, sm: 2 }}
                          direction="row"
                          useFlexGap
                          flexWrap="wrap"
                        >
                          {(sendHeader[0].nac_status === 1 ||
                            permission_MenuID.indexOf(16) >= 0
                          ) ? (
                            <Stack>
                              <Button
                                variant="contained"
                                onClick={handleUpdateNAC}
                                color="warning"
                                className='scaled-480px-TableHeader'
                                sx={{ m: 1 }}
                              >
                                Update
                              </Button>
                            </Stack>
                          ) : null}
                          {(sendHeader[0].nac_status === 2 && approveData.filter((res) => res.approverid === data.UserCode)[0]) ||
                            (sendHeader[0].nac_status === 3 && approveData.filter((res) => res.approverid === data.UserCode)[0]) ||
                            (sendHeader[0].nac_status === 5 && permission_MenuID.indexOf(11) >= 0) ||
                            (sendHeader[0].nac_status === 15 && permission_MenuID.indexOf(11) >= 0) ||
                            (sendHeader[0].nac_status === 11 && permission_MenuID.indexOf(11) >= 0) ||
                            ((sendHeader[0].nac_status === 2 || sendHeader[0].nac_status === 3 || sendHeader[0].nac_status === 15 || sendHeader[0].nac_status === 11 || sendHeader[0].nac_status === 5)
                              && permission_MenuID.indexOf(10) >= 0) ? (
                            <Stack>
                              <Button
                                variant="contained"
                                color="secondary"
                                onClick={handleOpenDialogReply}
                                className='scaled-480px-TableHeader'
                                sx={{ m: 1 }}
                              >
                                Reply
                              </Button>
                            </Stack>
                          )
                            : null}
                          {sendHeader[0].nac_status === 1 ? (
                            <Stack>
                              <Button
                                variant="contained"
                                onClick={handleSubmit_To_BookValue}
                                className='scaled-480px-TableHeader'
                                sx={{ m: 1 }}
                              >
                                Submit
                              </Button>
                            </Stack>
                          ) : (sendHeader[0].nac_status === 11 && permission_MenuID.indexOf(11) >= 0) ||
                            (sendHeader[0].nac_status === 11 && permission_MenuID.indexOf(10) >= 0) ? (
                            <Stack>
                              <Button
                                variant="contained"
                                onClick={handleSubmit_To_Verify}
                                className='scaled-480px-TableHeader'
                                sx={{ m: 1 }}
                              >
                                Submit
                              </Button>
                            </Stack>
                          ) : (sendHeader[0].nac_status === 2 && approveData.filter((res) => res.approverid === data.UserCode)[0]) ||
                            (sendHeader[0].nac_status === 2 && permission_MenuID.indexOf(10) >= 0) ? (
                            <Stack>
                              <Button
                                variant="contained"
                                onClick={handleSubmit_To_Approve}
                                color="success"
                                className='scaled-480px-TableHeader'
                                sx={{ m: 1 }}
                              >
                                Accept
                              </Button>
                            </Stack>
                          ) :
                            (sendHeader[0].nac_status === 3 && approveData.filter((res) => res.approverid === data.UserCode)[0]) ||
                              (sendHeader[0].nac_status === 12 && sendHeader[0].source === data.UserCode) ||
                              (sendHeader[0].nac_status === 13 && permission_MenuID.indexOf(12) >= 0) ||
                              (sendHeader[0].nac_status === 15 && permission_MenuID.indexOf(11) >= 0) ||
                              ((sendHeader[0].nac_status === 3 || sendHeader[0].nac_status === 12 || sendHeader[0].nac_status === 13 || sendHeader[0].nac_status === 15) &&
                                permission_MenuID.indexOf(10) >= 0) ?
                              (
                                <Stack>
                                  <Button
                                    variant="contained"
                                    color={sendHeader[0].nac_status === 3 ? "success" : "primary"}
                                    onClick={handleSubmit_Form}
                                    className='scaled-480px-TableHeader'
                                    sx={{ m: 1 }}
                                  >
                                    {sendHeader[0].nac_status === 12 ? `Submit` : `Accept`}
                                  </Button>
                                </Stack>
                              )
                              : null}
                          {(sendHeader[0].nac_status === 3 && approveData.filter((res) => res.approverid === data.UserCode)[0]) ||
                            (sendHeader[0].nac_status === 2 && approveData.filter((res) => res.approverid === data.UserCode)[0]) ||
                            ((sendHeader[0].nac_status === 3 || sendHeader[0].nac_status === 2) && permission_MenuID.indexOf(10) >= 0) ? (
                            <Stack>
                              <Button
                                variant="contained"
                                color="error"
                                onClick={handleOpen_drop_NAC_byDes}
                                className='scaled-480px-TableHeader'
                                sx={{ m: 1 }}
                              >
                                Cancel
                              </Button>
                            </Stack>
                          )
                            : null}
                        </Stack>
                      </TableCell>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
              <CommentNAC
                handleClickOpenDialog={handleClickOpenDialog}
                openDialog={openDialog}
                handleCloseDialog={handleCloseDialog}
                data={data}
                nac_code={nac_code}
                headers={sendHeader}
                description={description}
                setDescription={setDescription}
                setOpenDialog={setOpenDialog}
              />
            </Container>
            <Dialog open={openDialogReply} onClose={handleCloseDialogReply} >
              <DialogTitle>กรุณาระบุข้อความ/เหตุผล ที่ตีกลับเอกสาร</DialogTitle>
              <DialogContent sx={{ width: 500 }}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="link_document"
                  label="ข้อความ"
                  type="text"
                  onChange={handleChangeCommentReply}
                  fullWidth
                  variant="standard"
                  sx={{ pb: 2 }}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleReply} variant='contained'>บันทึก</Button>
                <Button onClick={handleCloseDialogReply} variant='contained' color='error'>ยกเลิก</Button>
              </DialogActions>
            </Dialog>
            <Dialog
              open={drop_NAC_byDes}
              onClose={handleClose_drop_NAC_byDes}
            >
              <DialogTitle id="alert-dialog-title">
                {"แจ้งเตือน"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  คุณต้องการที่จะยกเลิกรายการ {nac_code} ใช่หรือไม่
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={drop_NAC} variant='contained'>ใช่</Button>
                <Button onClick={handleClose_drop_NAC_byDes} variant='contained' color='error' autoFocus>
                  ไม่ใช่
                </Button>
              </DialogActions>
            </Dialog>
          </AnimatedPage>
        </ThemeProvider>
        <Outlet />
      </React.Fragment >
    );
  } else {
    swal("แจ้งเตือน", '404 NOT FOUND THIS PAGE', "warning")
      .then(() => {
        window.location.href = `/NAC_MAIN`;
      })
  }
}