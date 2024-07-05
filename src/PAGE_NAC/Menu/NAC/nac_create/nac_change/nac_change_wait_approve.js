/* eslint-disable react-hooks/exhaustive-deps */
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
import Box from '@mui/material/Box';
import Axios from "axios"
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import swal from 'sweetalert';
import { Outlet, useNavigate } from "react-router";
import CommentNAC from '../Comment'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';
import SystemUpdateAltRoundedIcon from '@mui/icons-material/SystemUpdateAltRounded';
import DoubleArrowRoundedIcon from '@mui/icons-material/DoubleArrowRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import ReplyAllRoundedIcon from '@mui/icons-material/ReplyAllRounded';
import CloudDownloadRoundedIcon from '@mui/icons-material/CloudDownloadRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import logoPure from '../../../../../image/Picture1.png'
import SummarizeIcon from '@mui/icons-material/Summarize';
import Card from '@mui/material/Card';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import DialogContentText from '@mui/material/DialogContentText';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import { CSVLink } from 'react-csv'
import '../../../../../App.css'
import config from '../../../../../config.js'
import AppbarNAC from '../Appbar.js'

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

async function store_FA_control_select_dtl(credentials) {
  return fetch(config.http + '/store_FA_control_select_dtl', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

async function store_FA_control_select_dtl_Draff(credentials) {
  return fetch(config.http + '/store_FA_control_select_dtl_draff', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

async function store_FA_control_select_headers(credentials) {
  return fetch(config.http + '/store_FA_control_select_headers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

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

const filterOptions = createFilterOptions({
  stringify: (option) => option.Code,
});

const filterOptions2 = createFilterOptions({
  stringify: (option) => option.UserCode,
});

async function store_FA_control_update_DTLandHeaders(credentials) {
  return fetch(config.http + '/store_FA_control_update_DTLandHeaders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

async function store_FA_control_update_DTL(credentials) {
  return fetch(config.http + '/store_FA_control_update_DTL', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

async function store_FA_control_execDocID(credentials) {
  return fetch(config.http + '/store_FA_control_execDocID', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

async function store_FA_control_updateStatus(credentials) {
  return fetch(config.http + '/store_FA_control_updateStatus', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

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

async function stroe_FA_control_DTL_ConfirmSuccess(credentials) {
  return fetch(config.http + '/stroe_FA_control_DTL_ConfirmSuccess', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

async function store_FA_control_upadate_table(credentials) {
  return fetch(config.http + '/store_FA_control_upadate_table', {
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

async function store_FA_control_drop_NAC(credentials) {
  return fetch(config.http + '/store_FA_control_drop_NAC', {
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

export default function Nac_Main_wait() {

  // ใช้สำหรับสร้างเวลาปัจจุบัน
  const d = new Date();
  const year = (d.getFullYear()).toString();
  const month = ((d.getMonth()) + 101).toString().slice(-2);
  const date = ((d.getDate()) + 100).toString().slice(-2);
  const hours = ((d.getHours()) + 100).toString().slice(-2);
  const mins = ((d.getMinutes()) + 100).toString().slice(-2);
  const seconds = ((d.getSeconds()) + 100).toString().slice(-2);
  const datenow = `${year}-${month}-${date}T${hours}:${mins}:${seconds}.000Z`;
  const [permission_menuID, setPermission_menuID] = React.useState();

  const data = JSON.parse(localStorage.getItem('data'));

  React.useEffect(async () => {
    // POST request using axios with set headers
    const body = { Permission_TypeID: 1, userID: data.userid }
    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };
    await Axios.post(config.http + '/select_Permission_Menu_NAC', body, { headers })
      .then(response => {
        setPermission_menuID(response.data.data.map((res) => res.Permission_MenuID))
      });
  }, []);

  const [serviceList, setServiceList] = React.useState([{ dtl_id: "", assetsCode: "", serialNo: "", name: "", date_asset: "", dtl: "", count: "", price: "", asset_id: "" }]);
  const [serviceList_Main, setServiceList_Main] = React.useState([{ AssetID: "", assetsCode: "", serialNo: "", name: "", date_asset: "", dtl: "", price: "" }])
  const sum_price = serviceList.map(function (elt) {
    return (/^\d+\.\d+$/.test(elt.price) || /^\d+$/.test(elt.price)) ? parseFloat(elt.price) : 0;
  }).reduce(function (a, b) { // sum all resulting numbers
    return ((a ? a : 0) + (b ? b : 0))
  })

  const [exportToExcel, setExportToExcel] = React.useState([]);

  const dataDepID = data.depid
  const [users_pureDep, setUsers_pureDep] = React.useState([]);
  const queryString = window.location.search;
  const nac_code = queryString.split('?')[1]
  const [nac_status, setNac_status] = React.useState();
  const [selectNAC, setSelectNAC] = React.useState();
  const [headers, setHeaders] = React.useState([]);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openDialogReply, setOpenDialogReply] = React.useState(false);
  const [commentReply, setCommentReply] = React.useState();
  const [UserForAssetsControl, setUserForAssetsControl] = React.useState([]);
  const [AllAssetsControl, setAllAssetsControl] = React.useState([]);
  const [alert, setAlert] = React.useState(false);
  const [valueAlert, setValueAlert] = React.useState(false);

  const [ExamineApprove, setExamineApprove] = React.useState([]);
  const [ExecApprove, setExecApprove] = React.useState([]);
  const [CheckApprove, setCheckApprove] = React.useState([]);
  const [CheckExamineApprove, setCheckExamineApprove] = React.useState([]);
  //const [CheckExamineApproveDes, setCheckExamineApproveDes] = React.useState([]);
  const [checked, setChecked] = React.useState([{ assets_code: "", statusCheck: "", asset_id: "" }]);
  //const [ExamineApproveDes, setExamineApproveDes] = React.useState([]);
  const [description, setDescription] = React.useState();
  const checkUserWeb = localStorage.getItem('sucurity');
  const navigate = useNavigate();
  const [valuesVisibility, setValuesVisibility] = React.useState({
    text: serviceList[0].price,
    showText: data.branchid === 901 ? true : false,
  });
  const [drop_NAC_byDes, setDrop_NAC_byDes] = React.useState(false);

  // สำหรับหาค่า Index ของ UserCode of Auto Complete
  let resultIndex = []
  for (let i = 0; i < UserForAssetsControl.length; i++) {
    resultIndex[i] = UserForAssetsControl[i].UserCode;
  }
  resultIndex = [resultIndex]

  // สำหรับหาค่า Index ของ AssetsCode of Auto Complete
  let resultIndexAssets = []
  for (let i = 0; i < AllAssetsControl.length; i++) {
    resultIndexAssets[i] = AllAssetsControl[i].Code;
  }
  resultIndexAssets = [resultIndexAssets]

  // ส่วนของผู้รับ
  const [des_department, setDes_Department] = React.useState();
  const [des_BU, setDes_BU] = React.useState();
  const [des_delivery, setDes_delivery] = React.useState();
  const [des_deliveryDate, setDes_deliveryDate] = React.useState();
  const [des_deliveryApprove, setDes_deliveryApprove] = React.useState('');
  const [des_deliveryApproveDate, setDes_deliveryApproveDate] = React.useState();
  const [des_description, setDes_Description] = React.useState();

  // ส่วนของผู้ส่ง
  const [source_department, setSource_Department] = React.useState();
  const [source_BU, setSource_BU] = React.useState();
  const [source, setSource] = React.useState();
  const [sourceDate, setSourceDate] = React.useState();
  const [sourceApprove, setSource_Approve] = React.useState('');
  const [sourceDateApproveDate, setSource_DateApproveDate] = React.useState();
  const [source_description, setSource_Description] = React.useState();

  // ส่วนของผู้อนุมัตื
  const [bossApprove, setBossApprove] = React.useState('');
  const [bossApproveDate, setBossApproveDate] = React.useState();
  const [verify, setVerifyApprove] = React.useState('');
  const [verifyApproveDate, setVerifyApproveDate] = React.useState();
  const [approveData, setApproveData] = React.useState();
  const [sendHeader, setSendHeader] = React.useState([{
    usercode: data.UserCode,
    worktype: 4,
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
    sourceFristName: null,
    sourceLastName: null,
    sourceDate: null,
    source_description: null,
    // ผู้รับ
    des_Department: null,
    des_BU: null,
    des_delivery: null,
    desFristName: null,
    desLastNameName: null,
    des_deliveryDate: null,
    des_Description: null,

    sumPrice: null,
    real_price: null,
    realPrice_Date: null,

  }]);


  const handleOpen_drop_NAC_byDes = () => {
    setDrop_NAC_byDes(true);
  };

  const handleClose_drop_NAC_byDes = () => {
    setDrop_NAC_byDes(false);
  };

  //ยกเลิกรายการ
  const drop_NAC = async () => {
    const usercode = data.UserCode
    const response = await store_FA_control_drop_NAC({
      usercode,
      nac_code,
    });
    if ('data' in response) {
      swal("แจ้งเตือน", 'ทำการลบรายการ ' + response.data[0].nac_code + ' แล้ว', "success", { buttons: false, timer: 2000 }).then((value) => {
        window.location.href = "/NAC_OPERATOR";
      });
    } else {
      swal("แจ้งเตือน", 'ไม่สามารถลบ ' + response.data[0].nac_code + ' ได้', "error")
    }
  }


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

  const fetchSelectDTL_Headers = async () => {

    // AutoComplete ของ AssetsCode
    const BranchID = data.branchid;
    const response = await SelectAssetsControl({
      BranchID
    });
    setAllAssetsControl(response.data);

    // เรียก Headers มาแสดง
    const responseHeaders = await store_FA_control_select_headers({
      nac_code
    });
    if (responseHeaders.message === "ไม่พบข้อมูล") {
      swal("แจ้งเตือน", 'ไม่พบรายการนี้แล้ว', "error").then((value) => {
        window.location.href = '/'
      });
    }
    else {
      setSelectNAC(parseInt(responseHeaders.data[0].nac_status))
      setNac_status(parseInt(responseHeaders.data[0].nac_status))
      setHeaders(responseHeaders.data[0])
      setSource_Department(responseHeaders.data[0].source_dep_owner)
      setSource_BU(responseHeaders.data[0].source_bu_owner)
      setSource(responseHeaders.data[0].source_userid)
      setSourceDate(responseHeaders.data[0].source_date)
      setSource_Description(responseHeaders.data[0].source_remark)
      setSource_Approve(responseHeaders.data[0].source_approve_userid)
      setSource_DateApproveDate(responseHeaders.data[0].source_approve_date)

      setDes_Department(responseHeaders.data[0].des_dep_owner)
      setDes_BU(responseHeaders.data[0].des_bu_owner)
      setDes_delivery(responseHeaders.data[0].des_userid)
      setDes_deliveryDate(responseHeaders.data[0].des_date)
      setDes_Description(responseHeaders.data[0].des_remark)
      setDes_deliveryApprove(responseHeaders.data[0].des_approve_userid)
      setDes_deliveryApproveDate(responseHeaders.data[0].des_approve_date)

      setBossApprove(responseHeaders.data[0].source_approve_userid)
      setBossApproveDate(responseHeaders.data[0].source_approve_date)
      setVerifyApprove(responseHeaders.data[0].verify_by_userid)
      setVerifyApproveDate(responseHeaders.data[0].verify_date)

      // เรียก Detail มาแสดง
      const responseDTL_draff = await store_FA_control_select_dtl_Draff({
        nac_code
      })

      const responseDTLs_draff = responseDTL_draff.data
      let listPoST_draff = []
      for (let i = 0; i < responseDTLs_draff.length; i++) {
        listPoST_draff[i] = {
          dtl_id: responseDTLs_draff[i].AssetID,
          assetsCode: responseDTLs_draff[i].Code,
          serialNo: responseDTLs_draff[i].SerialNo,
          name: responseDTLs_draff[i].Name,
          dtl: responseDTLs_draff[i].Details,
          price: responseDTLs_draff[i].Price,
          date_asset: responseDTLs_draff[i].CreateDate,
        }
      }
      setServiceList_Main(listPoST_draff.map((res) => {
        return {
          dtl_id: res.asset_id,
          assetsCode: res.assetsCode,
          serialNo: res.serialNo,
          name: res.name,
          dtl: res.dtl,
          count: res.count,
          price: res.price,
          date_asset: res.date_asset,
          asset_id: res.asset_id,
        };
      }));

      const responseDTL = await store_FA_control_select_dtl({
        nac_code
      });

      const responseDTLs = responseDTL.data
      const DataCodeDTL = []
      const responesCode = []
      for (let i = 0; i < responseDTLs.length; i++) {
        const Code = responseDTLs[i].nacdtl_assetsCode
        DataCodeDTL[i] = await SelectDTL_Control({
          Code
        })
        if ('data' in DataCodeDTL[i]) {
          responesCode[i] = DataCodeDTL[i].data[0]
        }
      }
      let listPoST = []
      for (let i = 0; i < responesCode.length; i++) {
        listPoST[i] = {
          dtl_id: responseDTLs[i].nacdtl_id,
          assetsCode: responseDTLs[i].nacdtl_assetsCode,
          serialNo: responseDTLs[i].nacdtl_assetsSeria,
          name: responseDTLs[i].nacdtl_assetsName,
          dtl: responseDTLs[i].nacdtl_assetsDtl,
          count: responseDTLs[i].nacdtl_assetsCount,
          price: responseDTLs[i].nacdtl_assetsPrice,
          date_asset: responseDTLs[i].nacdtl_date_asset,
          asset_id: responseDTLs[i].nacdtl_id,
        }
      }

      setChecked(responseDTLs.map((res) => {
        return {
          assets_code: res.nacdtl_assetsCode
          , statusCheck: (!res.success_id || res.success_id === 0) ? 0 : res.success_id
          , asset_id: res.nacdtl_id
        };
      }))

      setServiceList(listPoST.map((res) => {
        return {
          dtl_id: res.dtl_id,
          assetsCode: res.assetsCode,
          serialNo: res.serialNo,
          name: res.name,
          dtl: res.dtl,
          count: res.count,
          price: res.price,
          date_asset: res.date_asset,
          asset_id: res.asset_id,
        };
      }));

      setExportToExcel(listPoST.map((res) => {
        return {
          Code: res.assetsCode,
          serialNo: res.serialNo,
          name: res.name.replace(`"`, `''`),
          dtl: res.dtl,
          price: res.price,
        };
      }));

      //เรียก Approve มาแสดง
      const user_source = responseHeaders.data[0].source_userid;
      const responseExecDocID = await store_FA_control_execDocID({
        user_source,
        nac_code,
      });
      // ผู้ตรวจสอบ
      const ExamineApprove = []
      //const ExamineApproveDes = []
      const ExecApprove = []
      const CheckApprove = []
      const CheckExamineApprove = []

      for (let i = 0; i < (responseExecDocID.data.length); i++) {
        if (responseExecDocID.data[i].limitamount !== null && responseExecDocID.data[i].workflowlevel > 2) {
          ExecApprove[i] = {
            approverid: responseExecDocID.data[i].workflowlevel === 1 ? 'AM: ' + responseExecDocID.data[i].approverid :

              responseExecDocID.data[i].workflowlevel === 2 ? 'SM: ' + responseExecDocID.data[i].approverid :
                responseExecDocID.data[i].workflowlevel === 3 ? 'DM: ' + responseExecDocID.data[i].approverid :
                  responseExecDocID.data[i].workflowlevel === 4 ? 'FM: ' + responseExecDocID.data[i].approverid : 'MD: ' + responseExecDocID.data[i].approverid, status: responseExecDocID.data[i].status
          }
          CheckApprove[i] = responseExecDocID.data[i].approverid
        }

        if (responseExecDocID.data[i].limitamount !== null && responseExecDocID.data[i].workflowlevel < 3) {
          ExamineApprove[i] = {
            approverid: responseExecDocID.data[i].workflowlevel === 1 ? 'AM: ' + responseExecDocID.data[i].approverid :

              responseExecDocID.data[i].workflowlevel === 2 ? 'SM: ' + responseExecDocID.data[i].approverid :
                responseExecDocID.data[i].workflowlevel === 3 ? 'DM: ' + responseExecDocID.data[i].approverid :
                  responseExecDocID.data[i].workflowlevel === 4 ? 'FM: ' + responseExecDocID.data[i].approverid : 'MD: ' + responseExecDocID.data[i].approverid, status: responseExecDocID.data[i].status
          }
          CheckExamineApprove[i] = responseExecDocID.data[i].approverid
        }
      }
      setCheckExamineApprove(CheckExamineApprove)
      setExamineApprove(ExamineApprove)
      //setExamineApproveDes(ExamineApproveDes)
      setExecApprove(ExecApprove)
      setCheckApprove(CheckApprove)
      setApproveData(responseExecDocID.data);

      const listHeader = [...sendHeader]
      listHeader[0]['source'] = responseHeaders.data[0].source_userid
      listHeader[0]['source_department'] = responseHeaders.data[0].source_dep_owner
      listHeader[0]['source_BU'] = responseHeaders.data[0].source_bu_owner
      listHeader[0]['sumPrice'] = responseHeaders.data[0].sum_price
      listHeader[0]['sourceFristName'] = responseHeaders.data[0].source_name ? responseHeaders.data[0].source_name.split(' ')[0] : null
      listHeader[0]['sourceLastName'] = responseHeaders.data[0].source_name ? responseHeaders.data[0].source_name.split(' ')[1] : null
      listHeader[0]['sourceDate'] = responseHeaders.data[0].source_date
      listHeader[0]['source_description'] = responseHeaders.data[0].source_remark
      listHeader[0]['create_by'] = responseHeaders.data[0].create_by
      listHeader[0]['verify_by_userid'] = responseHeaders.data[0].verify_by_userid
      listHeader[0]['verify_date'] = responseHeaders.data[0].verify_date
      listHeader[0]['source_approve'] = responseHeaders.data[0].source_approve_userid
      listHeader[0]['source_approve_date'] = responseHeaders.data[0].source_approve_date
      listHeader[0]['account_aprrove_id'] = responseHeaders.data[0].account_aprrove_id
      listHeader[0]['finance_aprrove_id'] = responseHeaders.data[0].finance_aprrove_id
      listHeader[0]['nac_code'] = responseHeaders.data[0].nac_code
      listHeader[0]['nac_status'] = responseHeaders.data[0].nac_status
      listHeader[0]['nac_type'] = responseHeaders.data[0].nac_type
      listHeader[0]['source_date'] = responseHeaders.data[0].source_date
      listHeader[0]['real_price'] = responseHeaders.data[0].real_price
      listHeader[0]['realPrice_Date'] = responseHeaders.data[0].realPrice_Date
      listHeader[0]['status_name'] = responseHeaders.data[0].status_name
      setSendHeader(listHeader)

    }
  }

  const Export_PDF_DATA_NAC = () => {
    window.location.href = 'http://ptecdba:10250/OPS/reports/nac.aspx?nac_code=' + headers.nac_code
  }


  React.useEffect(() => {
    if (AllAssetsControl.length < 10) {
      fetchUserForAssetsControl();
      fetchSelectDTL_Headers();
    }
  }, []);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleClickOpenDialogReply = () => {
    setOpenDialogReply(true);
  };

  const handleCloseDialogReply = () => {
    setOpenDialogReply(false);
  };

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

  const handleServiceAdd = () => {
    setServiceList([...serviceList, { dtl_id: 0, assetsCode: "", serialNo: "", name: "", date_asset: "", dtl: "", count: "", price: "", asset_id: "" }]);
    setServiceList_Main([...serviceList_Main, { AssetID: "", assetsCode: "", serialNo: "", name: "", date_asset: "", dtl: "", price: "" }]);
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
    list[index]['dtl_id'] = -1;
    setServiceList(list);
  };

  const handleServiceChangeHeader = async (e, newValue, reason, index) => {
    newValue = newValue.Code;
    const { name, value } = e.target;
    const assetsCodeSelect = newValue
    const nacdtl_assetsCode = newValue
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
        list[index]['assetsCode'] = AllAssetsControl.filter((res) => res.Code === assetsCodeSelect)[0].Code
        list[index]['name'] = AllAssetsControl.filter((res) => res.Code === assetsCodeSelect)[0].Name
        list[index]['dtl'] = AllAssetsControl.filter((res) => res.Code === assetsCodeSelect)[0].Details
        list[index]['count'] = 1
        list[index]['serialNo'] = AllAssetsControl.filter((res) => res.Code === assetsCodeSelect)[0].SerialNo
        list[index]['price'] = AllAssetsControl.filter((res) => res.Code === assetsCodeSelect)[0].Price
        list[index]['priceSeals'] = 0
        list[index]['profit'] = 0
        list[index]['date_asset'] = AllAssetsControl.filter((res) => res.Code === assetsCodeSelect)[0].CreateDate
        setServiceList(list);

        list_main[index]['name'] = AllAssetsControl.filter((res) => res.Code === assetsCodeSelect)[0].Name
        list_main[index]['dtl'] = AllAssetsControl.filter((res) => res.Code === assetsCodeSelect)[0].Details
        list_main[index]['serialNo'] = AllAssetsControl.filter((res) => res.Code === assetsCodeSelect)[0].SerialNo
        list_main[index]['price'] = AllAssetsControl.filter((res) => res.Code === assetsCodeSelect)[0].Price
        list_main[index]['date_asset'] = AllAssetsControl.filter((res) => res.Code === assetsCodeSelect)[0].CreateDate
        setServiceList_Main(list_main)
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

  const handleChangeSource_deliveryDate = (newValue) => {
    setSourceDate(newValue);
  };

  const handleChangeSource_Description = (event) => {
    event.preventDefault();
    setSource_Description(event.target.value);
  };

  const handleAutoSource_DeapartMent = async (e, newValue, reason) => {
    if (reason === 'clear' || !newValue) {
      setSource_Department('')
      setSource_BU('')
      setSource(null)
    } else {
      setSource(newValue)
      setSource_Department(UserForAssetsControl.filter((res) => res.UserCode === newValue)[0].DepCode)
      setSource_BU(UserForAssetsControl.filter((res) => res.UserCode === newValue)[0].BranchID === 901 ? `Center` : `Oil`)
    }
  };

  // Update Document||
  const handleSave = async () => {
    if (!serviceList[0].assetsCode) {
      const alert_value = 'กรุณากรอกข้อมูลทรัพย์สินให้ครบถ้วน'
      setAlert(true);
      setValueAlert(alert_value)
    } else {
      const usercode = data.UserCode
      const nac_status = 1
      const sumPrice = sum_price
      const nac_type = headers.nac_type
      const nameDes = null
      const response = await store_FA_control_update_DTLandHeaders(sendHeader[0]);
      if ('data' in response) {
        for (let i = 0; i < serviceList.length; i++) {
          const dtl_id = serviceList[i].dtl_id
          const nacdtl_row = i
          const nacdtl_assetsCode = serviceList[i].assetsCode
          const nacdtl_assetsName = serviceList[i].name
          const nacdtl_assetsSeria = serviceList[i].serialNo
          const nacdtl_assetsDtl = serviceList[i].dtl
          const nacdtl_assetsCount = serviceList[i].count
          const nacdtl_assetsPrice = serviceList[i].price
          const asset_id = serviceList[i].asset_id
          const responseDTL = await store_FA_control_update_DTL({
            dtl_id,
            usercode,
            nac_code, // ได้จาก Response ของ Store_FA_control_create_doc
            nacdtl_row,
            nacdtl_assetsCode,
            nacdtl_assetsName,
            nacdtl_assetsSeria,
            nacdtl_assetsDtl,
            nacdtl_assetsCount,
            nacdtl_assetsPrice,
            asset_id
          });
          if ('data' in responseDTL) {
            swal("แจ้งเตือน", 'อัปเดตรายการแล้ว', "success", { buttons: false, timer: 2000 }).then((value) => {
              window.location.href = '/NAC_ROW/NAC_CHANGE_WAIT_APPROVE?' + nac_code
            });
          } else {
            swal("ล้มเหลว", 'คำขออัปเดตรายการผิดพลาด', "error")
          }
        }
      } else {
        swal("แจ้งเตือน", 'กรุณาลองใหม่ภายหลัง', "error")
      }
    }
    //navigate("/NAC_CREATE_MAIN1/NAC_CREATE_MAIN1_STEP2")
  };

  const handleSubmit = async () => {
    if (!source || !source_department || !source_BU || !sourceDate || !sendHeader[0].sourceFristName || !sendHeader[0].sourceLastName) {
      const alert_value = !source ? 'กรุณากรอกข้อมูลผู้ส่ง' : !source_department ? 'กรุณากรอกข้อมูลแผนกของผู้ส่ง' :
        (!sendHeader[0].sourceFristName || !sendHeader[0].sourceLastName) ? 'กรุณาลงชื่อผู้ส่งมอบ' : 'กรุณากรอกวันที่ของผู้ส่ง'
      setAlert(true);
      setValueAlert(alert_value)
    } else {
      if (!serviceList[0].assetsCode) {
        const alert_value = 'กรุณากรอกข้อมูลทรัพย์สินให้ครบถ้วน'
        setAlert(true);
        setValueAlert(alert_value)
      } else {
        if (sum_price !== headers.sum_price || headers.source_userid !== source || headers.des_userid !== des_delivery) {
          const alert_value = 'ข้อมูลมีการเปลี่ยนแปลง กรุณากดบันทึกรายการก่อนยืนยัน'
          setAlert(true);
          setValueAlert(alert_value)
        } else {
          if (data.UserCode === headers.create_by) {
            const usercode = data.UserCode
            const nac_status = 2
            const source_approve = sourceApprove
            const source_approve_date = sourceDateApproveDate
            const des_approve = des_deliveryApprove
            const des_approve_date = des_deliveryApproveDate
            const verify_by = bossApprove
            const verify_date = bossApproveDate
            const nac_type = headers.nac_type
            await store_FA_control_updateStatus({
              usercode,
              nac_code,
              nac_status,
              nac_type,
              source,
              sourceDate,
              des_delivery,
              des_deliveryDate,
              source_approve,
              source_approve_date,
              des_approve,
              des_approve_date,
              verify_by,
              verify_date,
            });
            const comment = 'ยืนยันรายการแล้ว'
            const responseComment = await store_FA_control_comment({
              nac_code,
              usercode,
              comment
            })
            await store_FA_SendMail({
              nac_code
            })
            if ('data' in responseComment) {
              swal("แจ้งเตือน", 'คุณได้ยืนยันรายการแล้ว', "success", { buttons: false, timer: 2000 }).then((value) => {
                window.location.href = '/NAC_ROW/NAC_CHANGE_WAIT_APPROVE?' + nac_code
              });
            } else {
              swal("แจ้งเตือน", 'เกิดข้อพิดพลาด', "error").then((value) => {
                window.location.href = '/NAC_ROW/NAC_CHANGE_WAIT_APPROVE?' + nac_code
              });
            }
          } else {
            swal("แจ้งเตือน", 'เกิดข้อพิดพลาด', "error").then((value) => {
              window.location.href = '/NAC_ROW/NAC_CHANGE_WAIT_APPROVE?' + nac_code
            });
          }
        }
      }
    }
  };

  // ExamineApprove
  const handleExamineApprove = async () => {
    if (CheckExamineApprove.filter((res) => res === data.UserCode)[0] || (permission_menuID ? permission_menuID.includes(10) : null) === true) {
      const usercode = data.UserCode
      const nac_status = 3
      const source_approve = data.UserCode
      const source_approve_date = datenow
      const des_approve = des_deliveryApprove
      const des_approve_date = des_deliveryApproveDate
      const verify_by = headers.verify_by_userid
      const verify_date = headers.verify_date
      const nac_type = headers.nac_type
      await store_FA_control_updateStatus({
        usercode,
        nac_code,
        nac_status,
        nac_type,
        source,
        sourceDate,
        des_delivery,
        des_deliveryDate,
        source_approve,
        source_approve_date,
        des_approve,
        des_approve_date,
        verify_by,
        verify_date,
      });
      const comment = 'อนุมัติรายการแล้ว'
      const responseComment = await store_FA_control_comment({
        nac_code,
        usercode,
        comment
      })
      await store_FA_SendMail({
        nac_code
      })
      if ('data' in responseComment) {
        swal("แจ้งเตือน", 'คุณอนุมัติรายการแล้ว', "success", { buttons: false, timer: 2000 }).then((value) => {
          window.location.href = '/NAC_ROW/NAC_CHANGE_WAIT_APPROVE?' + nac_code
        });
      } else {
        swal("แจ้งเตือน", 'เกิดข้อพิดพลาด', "error")
      }
    } else {
      swal("แจ้งเตือน", 'ถูกจำกัดสิทธิ์', "error")
    }
  };

  // ExecApprove
  const handleExecApprove = async () => {
    if (CheckApprove.filter((res) => res === data.UserCode)[0] || (permission_menuID ? permission_menuID.includes(10) : null) === true) {
      const usercode = data.UserCode
      const nac_status = 5
      const source_approve = data.UserCode
      const source_approve_date = datenow
      const des_approve = des_deliveryApprove
      const des_approve_date = des_deliveryApproveDate
      const verify_by = headers.verify_by_userid
      const verify_date = headers.verify_date
      const nac_type = headers.nac_type
      await store_FA_control_updateStatus({
        usercode,
        nac_code,
        nac_status,
        nac_type,
        source,
        sourceDate,
        des_delivery,
        des_deliveryDate,
        source_approve,
        source_approve_date,
        des_approve,
        des_approve_date,
        verify_by,
        verify_date,
      });
      const comment = 'อนุมัติรายการแล้ว'
      const responseComment = await store_FA_control_comment({
        nac_code,
        usercode,
        comment
      })
      await store_FA_SendMail({
        nac_code
      })
      if ('data' in responseComment) {
        swal("แจ้งเตือน", 'คุณอนุมัติรายการแล้ว', "success", { buttons: false, timer: 2000 }).then((value) => {
          window.location.href = '/NAC_ROW/NAC_CHANGE_WAIT_APPROVE?' + nac_code
        });
      } else {
        swal("แจ้งเตือน", 'เกิดข้อพิดพลาด', "error")
      }
    } else {
      swal("แจ้งเตือน", 'ถูกจำกัดสิทธิ์', "error")
    }
  };

  //
  const handleSubmitComplete = async () => {
    if (selectNAC === 4 || selectNAC === 5) {
      const usercode = data.UserCode
      const nac_status = selectNAC === 4 ? 5 : 6
      const source_approve = headers.source_approve_userid
      const source_approve_date = headers.source_approve_date
      const des_delivery = headers.des_userid
      const des_deliveryDate = selectNAC === 4 ? datenow : headers.des_date
      const verify_by = headers.verify_by_userid
      const verify_date = headers.verify_date
      const nac_type = headers.nac_type
      const des_approve = null
      const des_approve_date = null
      const responseForUpdate = await store_FA_control_updateStatus({
        usercode,
        nac_code,
        nac_status,
        nac_type,
        source,
        sourceDate,
        des_delivery,
        des_deliveryDate,
        source_approve,
        source_approve_date,
        des_approve,
        des_approve_date,
        verify_by,
        verify_date,
      });
      if ('data' in responseForUpdate) {
        const comment = selectNAC === 4 ? 'ตรวจรับเอกสารแล้ว' : 'ปิดรายการแล้ว'
        const responseComment = await store_FA_control_comment({
          nac_code,
          usercode,
          comment
        })
        await store_FA_SendMail({
          nac_code
        })
        if ('data' in responseComment) {
          if (nac_status === 5) {
            for (let i = 0; i < checked.length; i++) {
              const usercode = data.UserCode
              const nacdtl_assetsCode = checked[i].assets_code
              const asset_id = checked[i].asset_id
              const statusCheck = checked[i].statusCheck
              await stroe_FA_control_DTL_ConfirmSuccess({
                nac_code,
                usercode,
                nacdtl_assetsCode,
                asset_id,
                statusCheck,
              })
            }
          }
          else if (nac_status === 6) {
            for (let i = 0; i < serviceList.length; i++) {
              const usercode = data.UserCode
              const nacdtl_assetsCode = serviceList[i].assetsCode
              const asset_id = serviceList[i].asset_id
              await store_FA_control_upadate_table({
                nac_code,
                usercode,
                nacdtl_assetsCode,
                asset_id,
                nac_type,
                nac_status,
              })
            }
          }
          swal("แจ้งเตือน", 'คุณได้ปิดรายการแล้ว', "success", { buttons: false, timer: 2000 }).then((value) => {
            window.location.href = '/NAC_ROW/NAC_CHANGE_WAIT_APPROVE?' + nac_code
          });
        } else {
          swal("แจ้งเตือน", 'เกิดข้อพิดพลาด', "error").then((value) => {
            window.location.href = '/NAC_ROW/NAC_CHANGE_WAIT_APPROVE?' + nac_code
          });
        }
      }
      if (nac_status === 5) {
        for (let i = 0; i < checked.length; i++) {
          const usercode = data.UserCode
          const nacdtl_assetsCode = checked[i].assets_code
          const asset_id = checked[i].asset_id
          const statusCheck = checked[i].statusCheck
          await stroe_FA_control_DTL_ConfirmSuccess({
            nac_code,
            usercode,
            nacdtl_assetsCode,
            asset_id,
            statusCheck,
          })
        }
      }
    } else {
      swal("แจ้งเตือน", 'สถานะการทำรายการผิด', "error").then((value) => {
        window.location.href = '/NAC_ROW/NAC_CHANGE_WAIT_APPROVE?' + nac_code
      });
    }
  };

  // CancelApprove
  const CancelApprove = async () => {
    const usercode = data.UserCode
    const nac_status = 0
    const source_approve =
      (selectNAC === 2 && (CheckExamineApprove.includes(data.UserCode) !== false || (permission_menuID ? permission_menuID.includes(10) : null) === true)) ? sourceApprove : data.UserCode
    const source_approve_date =
      (selectNAC === 2 && (CheckExamineApprove.includes(data.UserCode) !== false || (permission_menuID ? permission_menuID.includes(10) : null) === true)) ? sourceDateApproveDate : datenow
    const des_approve = des_deliveryApprove
    const des_approve_date = des_deliveryApproveDate
    const verify_by = (selectNAC === 3 && (CheckApprove.includes(data.UserCode) !== false || (permission_menuID ? permission_menuID.includes(10) : null) === true)) ? data.UserCode : bossApprove
    const verify_date = (selectNAC === 3 && (CheckApprove.includes(data.UserCode) !== false || (permission_menuID ? permission_menuID.includes(10) : null) === true)) ? datenow : bossApproveDate
    const nac_type = headers.nac_type
    const responseForUpdate = await store_FA_control_updateStatus({
      usercode,
      nac_code,
      nac_status,
      nac_type,
      source,
      sourceDate,
      des_delivery,
      des_deliveryDate,
      source_approve,
      source_approve_date,
      des_approve,
      des_approve_date,
      verify_by,
      verify_date,
    });
    if ('data' in responseForUpdate) {
      const comment = 'ยกเลิกรายการแล้ว'
      const responseComment = await store_FA_control_comment({
        nac_code,
        usercode,
        comment
      })
      if ('data' in responseComment) {
        swal("แจ้งเตือน", 'คุณได้ยกเลิกรายการแล้ว', "success", { buttons: false, timer: 2000 }).then((value) => {
          window.location.href = '/NAC_ROW/NAC_CHANGE_WAIT_APPROVE?' + nac_code
        });
      } else {
        swal("แจ้งเตือน", 'เกิดข้อพิดพลาด', "error").then((value) => {
          window.location.href = '/NAC_ROW/NAC_CHANGE_WAIT_APPROVE?' + nac_code
        });
      }
    } else {
      swal("แจ้งเตือน", 'เกิดข้อพิดพลาด', "error").then((value) => {
        window.location.href = '/NAC_ROW/NAC_CHANGE_WAIT_APPROVE?' + nac_code
      });
    }
  };

  const handleChangeCommentReply = (event) => {
    event.preventDefault();
    setCommentReply(event.target.value)
  }

  const handleReply = async () => {
    const usercode = data.UserCode
    const nac_status = 7
    const source_approve = null
    const source_approve_date = null
    const des_approve = null
    const des_approve_date = null
    const verify_by = null
    const verify_date = null
    const nac_type = headers.nac_type
    const responseForUpdate = await store_FA_control_updateStatus({
      usercode,
      nac_code,
      nac_status,
      nac_type,
      source,
      sourceDate,
      des_delivery,
      des_deliveryDate,
      source_approve,
      source_approve_date,
      des_approve,
      des_approve_date,
      verify_by,
      verify_date,
    });
    if ('data' in responseForUpdate) {
      const comment = 'ตีกลับรายการเนื่องจาก "' + commentReply + '"'
      const responseComment = await store_FA_control_comment({
        nac_code,
        usercode,
        comment
      })
      if ('data' in responseComment) {
        await store_FA_SendMail({
          nac_code
        })
        setOpenDialogReply(false);
        window.location.href = '/NAC_ROW/NAC_CHANGE_WAIT_APPROVE?' + nac_code
      }
    }
  }

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlert(false);
  };

  if (serviceList[0].assetsCode === '') {
    return (
      <Box
        sx={{
          marginTop: 30,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <CircularProgress disableShrink color="inherit" />
          </Grid>
          <Grid item>
            <Typography sx={{ fontSize: '2rem !important', fontWeight: 'bold' }} color="inherit" >
              Loading...
            </Typography>
          </Grid>
        </Grid>
      </Box>
    );
  } else if (headers.nac_type === '3' || headers.nac_type === 3) {
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
          <AppbarNAC
            nac_code={nac_code}
            nac_type={headers.nac_type}
            sendHeader={sendHeader}
            approveData={approveData}
          />
          <AnimatedPage>
            <Container component="main" maxWidth="lg">
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
                    'backgroundColor': headers.nac_status === 1 ?
                      '#1E90FF' : headers.nac_status === 2 ?
                        '#6495ED' : headers.nac_status === 3 ?
                          '#FF69B4' : headers.nac_status === 4 ?
                            '#00CED1' : headers.nac_status === 5 ?
                              '#6A5ACD' : headers.nac_status === 6 ?
                                '#008000' : headers.nac_status === 7 ?
                                  '#FFA500' : headers.nac_status === 8 ?
                                    '#F0E68C' : headers.nac_status === 11 ?
                                      '#F4A460' : headers.nac_status === 12 ?
                                        '#DDA0DD' : headers.nac_status === 13 ?
                                          '#6A5ACD' : headers.nac_status === 14 ?
                                            '#708090' : headers.nac_status === 15 ?
                                              '#6A5ACD' : '#DC143C'
                  }}
                  sx={{ p: 1, pt: 2, pl: 10, pr: 3, mb: 0, mt: 4, color: 'RGB(255,255,255)' }}
                >
                  {headers.status_name}
                </Card>
              </Box>
              <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 }, overflow: 'hidden' }}>
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
                          <StyledTableCell align="center" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa" }}>
                            <Typography align='center' color="inherit" >
                              {nac_code}
                            </Typography>
                          </StyledTableCell>
                        </TableBody>
                        <TableBody>
                          <StyledTableCell align="center" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa" }}>
                            <Typography align='center' color="inherit" >
                              {!headers.create_date ? '' : (headers.create_date).split('T')[0]}
                            </Typography>
                          </StyledTableCell>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Grid>
                <React.Fragment>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    spacing={2}
                    sx={{ pt: 2 }}
                  >
                    <Typography sx={{ pb: 1, pt: 1 }} color='error'>
                      * กรุณากรอกข้อมูลสำหรับเปลี่ยนแปลงรายละเอียดทรัพย์สิน
                    </Typography>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="flex-start"
                      spacing={2}
                    >
                      <Button
                        onClick={Export_PDF_DATA_NAC}
                        variant='contained'
                        color='warning'
                        size='small'
                      >
                        Dowload Report
                      </Button>
                      {/* <CSVLink
                        data={exportToExcel}
                        className='btn btn-success btn-sm'
                        target="_blank"
                        filename={`${headers.nac_code}.csv`}
                      >
                        Dowload CSV
                      </CSVLink> */}
                    </Stack>
                  </Stack>
                  <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell align="center" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa", width: '30%' }}>ประเภทการเปลี่ยนแปลง</StyledTableCell>
                          <StyledTableCell align="center" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa", width: '35%' }}>หน่วยงานที่ส่งมอบ</StyledTableCell>
                          <StyledTableCell align="center" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa", width: '35%' }}>หน่วยงานที่รับมอบ</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <StyledTableRow>
                          <StyledTableCell align="center" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa" }}>
                            <FormGroup>
                              <center>
                                <Typography variant='h4' color='primary' sx={{ fontWeight: 'bold !important', fontSize: '1.5rem !important' }}>
                                  เปลี่ยนแปลงรายละเอียดทรัพย์สิน
                                </Typography>
                              </center>
                            </FormGroup>
                          </StyledTableCell>
                          <StyledTableCell align="center" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa" }}>
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
                                disabled
                                name='source_department'
                                onChange={handleChangeSource_Department}
                                value={source_department}
                                inputProps={{ style: { '-webkit-text-fill-color': 'rgba(0,0,0,1)', textAlign: 'center' } }}
                                variant="standard"
                              />
                              <TextField
                                required
                                fullWidth
                                disabled
                                onChange={handleChangeSource_BU}
                                name='source_BU'
                                value={source_BU}
                                inputProps={{ style: { '-webkit-text-fill-color': 'rgba(0,0,0,1)', textAlign: 'center' } }}
                                variant="standard"
                              />
                            </Stack>
                            <Autocomplete
                              autoHighlight
                              freeSolo
                              name='source'
                              id='source'
                              size="small"
                              disabled={data.branchid === 901 && (selectNAC === 1 || selectNAC === 7) ? false : true}
                              options={users_pureDep}
                              getOptionLabel={(option) => option.UserCode}
                              filterOptions={filterOptions2}
                              value={!source ? '' : UserForAssetsControl[resultIndex[0].indexOf(source)]}
                              onChange={(e, newValue, reason) => handleAutoSource_DeapartMent(e, newValue, reason)}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  variant="standard"
                                  label='ผู้ส่งมอบ'
                                  error={valueAlert === 'กรุณากรอกข้อมูลผู้ส่ง' ? true : false}
                                  fullWidth
                                  autoComplete="family-name"
                                  sx={{ pt: 1 }}
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
                                  autoComplete="family-name"
                                  error={valueAlert === 'กรุณาลงชื่อผู้ส่งมอบ' ? true : false}
                                  //disabled={(selectNAC === 1 || selectNAC === 7) ? false : true}
                                  inputProps={{ style: { '-webkit-text-fill-color': 'rgba(0,0,0,1)' } }}
                                  onChange={(e) => {
                                    const listHeader = [...sendHeader]
                                    listHeader[0].sourceFristName = `${e.target.value}`
                                    setSendHeader(listHeader)
                                  }}
                                  value={sendHeader[0].sourceFristName}
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <Typography color="black">
                                          ชื่อจริง :
                                        </Typography>
                                      </InputAdornment>
                                    ),
                                  }}
                                  sx={{ pt: 1 }}
                                />
                              </Stack>
                              <Stack>
                                <TextField
                                  variant="standard"
                                  fullWidth
                                  autoComplete="family-name"
                                  error={valueAlert === 'กรุณาลงชื่อผู้ส่งมอบ' ? true : false}
                                  //disabled={(selectNAC === 1 || selectNAC === 7) ? false : true}
                                  inputProps={{ style: { '-webkit-text-fill-color': 'rgba(0,0,0,1)' } }}
                                  onChange={(e) => {
                                    const listHeader = [...sendHeader]
                                    listHeader[0].sourceLastName = `${e.target.value}`
                                    setSendHeader(listHeader)
                                  }}
                                  value={sendHeader[0].sourceLastName}
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <Typography color="black">
                                          นามสกุล :
                                        </Typography>
                                      </InputAdornment>
                                    ),
                                  }}
                                  sx={{ pt: 1 }}
                                />
                              </Stack>
                            </Stack>
                            <LocalizationProvider dateAdapter={DateAdapter}>
                              <DatePicker
                                inputFormat="yyyy-MM-dd"
                                disabled={(selectNAC === 1 || selectNAC === 7) ? false : true}
                                onChange={handleChangeSource_deliveryDate}
                                name='sourceDate'
                                value={sourceDate}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <Typography color="black">
                                        วันที่ยืนยันรายการ :
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
                              value={source_description}
                              name='source_description'
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
                          </StyledTableCell>
                          <StyledTableCell align="center" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa" }}>
                            <FormGroup>
                              <center>
                                <Typography variant='h4' color='#AAAAAA'>
                                  NONE
                                </Typography>
                              </center>
                            </FormGroup>
                          </StyledTableCell>
                        </StyledTableRow>
                      </TableBody>
                    </Table>
                    <Table aria-label="customized table" >
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
                              disabled={(selectNAC === 1) ? false : true}
                              onClick={handleServiceAdd}
                            >
                              <AddBoxIcon />
                            </IconButton>
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>
                      {serviceList.map((singleService, index) => (
                        <TableBody>
                          <StyledTableRow>
                            <StyledTableCell align="center" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa" }}>
                              {(selectNAC === 1 && data.UserCode === headers.create_by) ? (
                                <React.Fragment>
                                  <Autocomplete
                                    autoHighlight
                                    freeSolo
                                    key={index}
                                    disabled={(selectNAC === 1 || selectNAC === 7) ? false : true}
                                    name='assetsCode'
                                    id='assetsCode'
                                    sx={{
                                      pt: 1, "& .MuiAutocomplete-input, & .MuiInputLabel-root": {
                                        fontSize: 14
                                      }
                                    }}
                                    ListboxProps={{
                                      sx: { fontSize: 12 }
                                    }}
                                    options={AllAssetsControl}
                                    getOptionLabel={(option) => option.Code || ''}
                                    filterOptions={filterOptions}
                                    onChange={(e, newValue, reason) => handleServiceChangeHeader(e, newValue, reason, index)}
                                    value={!singleService.assetsCode ? singleService.assetsCode : AllAssetsControl[resultIndexAssets[0].indexOf(singleService.assetsCode)]}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        variant="standard"
                                        name='assetsCode'
                                        id='assetsCode'
                                        key={index}
                                        value={singleService.assetsCode}
                                      //onChange={(e) => handleServiceChange(e, index)}
                                      />
                                    )}
                                  />
                                </React.Fragment>
                              ) : (
                                <React.Fragment>
                                  <TextField
                                    key={index}
                                    fullWidth
                                    disabled={(selectNAC === 1 || selectNAC === 7) ? false : true}
                                    variant="standard"
                                    name='assetsCode'
                                    id='assetsCode'
                                    inputProps={{ style: { '-webkit-text-fill-color': 'rgba(0,0,0,1)', fontSize: 14 } }}
                                    onChange={(e) => handleServiceChange(e, index)}
                                    value={singleService.assetsCode}
                                  />
                                </React.Fragment>
                              )}
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
                                key={index}
                                fullWidth
                                disabled={(selectNAC === 1 || selectNAC === 7) ? false : true}
                                name="serialNo"
                                id="serialNo"
                                inputProps={{ style: { '-webkit-text-fill-color': 'rgba(0,0,0,1)', textAlign: 'center', fontSize: 14 } }}
                                variant="standard"
                                onChange={(e) => handleServiceChange(e, index)}
                                value={singleService.serialNo}
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
                                key={index}
                                fullWidth
                                disabled={(selectNAC === 1 || selectNAC === 7) ? false : true}
                                name="name"
                                id="name"
                                inputProps={{ style: { '-webkit-text-fill-color': 'rgba(0,0,0,1)', fontSize: 14 } }}
                                variant="standard"
                                onChange={(e) => handleServiceChange(e, index)}
                                value={singleService.name}
                              />
                            </StyledTableCell>
                            <StyledTableCell align="center" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa" }}>
                              <TextField
                                fullWidth
                                key={index}
                                inputProps={{ style: { '-webkit-text-fill-color': 'rgba(0,0,0,0.5)', textAlign: 'center', fontSize: 14 } }}
                                disabled
                                value={!serviceList_Main[index].date_asset ? '' : serviceList_Main[index].date_asset.split('T')[0]}
                                variant="standard"
                              />
                              <TextField
                                fullWidth
                                key={index}
                                disabled={(selectNAC === 1 || selectNAC === 7) ? false : true}
                                name="date_asset"
                                id="date_asset"
                                inputProps={{ style: { '-webkit-text-fill-color': 'rgba(0,0,0,1)', textAlign: 'center', fontSize: 14 } }}
                                value={!serviceList[index].date_asset ? '' : serviceList[index].date_asset.split('T')[0]}
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
                                  value={singleService.dtl}
                                  onChange={(e) => handleServiceChange(e, index)}
                                  disabled={(selectNAC === 1 || selectNAC === 7) ? false : true}
                                >
                                  {/* <MenuItem value={'สภาพดี'}>สภาพดี</MenuItem>
                                    <MenuItem value={'ชำรุดรอซ่อม'}>ชำรุดรอซ่อม</MenuItem>
                                    <MenuItem value={'รอตัดชำรุด'}>รอตัดชำรุด</MenuItem> */}
                                  <MenuItem value={'ชำรุด'}>ชำรุด</MenuItem>
                                </Select>
                              </FormControl>
                            </StyledTableCell>
                            <StyledTableCell align="center" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa" }}>
                              <TextField
                                fullWidth
                                key={index}
                                inputProps={{ style: { '-webkit-text-fill-color': 'rgba(0,0,0,0.5)', textAlign: 'right', fontSize: 14 } }}
                                disabled
                                value={!serviceList_Main[index].price ? serviceList_Main[index].price : (serviceList_Main[index].price).toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 0 })}
                                variant="standard"
                              />
                              <TextField
                                disabled={(selectNAC === 1 || selectNAC === 7) ? false : true}
                                key={index}
                                fullWidth
                                name="price"
                                id="price"
                                inputProps={{ style: { '-webkit-text-fill-color': 'rgba(0,0,0,1)', textAlign: 'right', fontSize: 14 } }}
                                onChange={(e) => handleServiceChange(e, index)}
                                type={valuesVisibility.showText ? "text" : "password"}
                                value={!singleService.price ? singleService.price : (singleService.price).toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 0 })}
                                variant="standard"
                              />
                            </StyledTableCell>
                            <StyledTableCell align="center" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa" }}>
                              {serviceList.length !== 0 && (
                                <IconButton
                                  size="large"
                                  disabled={(selectNAC === 1 || selectNAC === 7) ? false : true}
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
                      ))}
                    </Table>
                    <Table aria-label="customized table" >
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
                              inputProps={{ style: { '-webkit-text-fill-color': 'rgba(0,0,0,1)', textAlign: 'center' } }}
                              value={sum_price === 0 ? '' : sum_price.toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 0 })}
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
                    <Table aria-label="customized table" >
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
                                          {!headers.create_by ? '' : '[' + headers.create_by + ']'}
                                        </Typography>
                                      </InputAdornment>
                                      <InputAdornment position="start">
                                        <Typography color="black" >
                                          {!headers.create_date ? '' : (headers.create_date).split('T')[0]}
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
                              disabled={(selectNAC === 2 && CheckExamineApprove.includes(data.UserCode) !== false) ? false : true}
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
                                        <Typography color="black">
                                          {!verify ? '' : '[' + verify + ']'}
                                        </Typography>
                                      </InputAdornment>
                                      <InputAdornment position="start">
                                        <Typography color="black">
                                          {!verifyApproveDate ? '' : (verifyApproveDate).split('T')[0]}
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
                              disabled={(selectNAC === 3 && CheckApprove.includes(data.UserCode) !== false) ? false : true}
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
                                          {!bossApprove ? '' : '[' + bossApprove + ']'}
                                        </Typography>
                                      </InputAdornment>
                                      <InputAdornment position="start">
                                        <Typography color="black">
                                          {!bossApproveDate ? '' : (bossApproveDate).split('T')[0]}
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
                                          {!headers.account_aprrove_id ? '' : '[' + headers.account_aprrove_id + ']'}
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
                    <Table aria-label="customized table" >
                      <TableBody>
                        <Stack
                          direction="row"
                          justifyContent="center"
                          alignItems="center"
                          spacing={3}
                        >
                          {((selectNAC === 1 || selectNAC === 7) && (data.UserCode === headers.create_by || ((permission_menuID ? permission_menuID.includes(10) : null) === true))) ? (
                            <React.Fragment>
                              <Button
                                variant="contained"
                                onClick={handleSave}
                                className='scaled-480px-TableHeader'
                                sx={{ m: 1 }}
                                style={{ 'backgroundColor': 'orange' }}
                                disabled={(data.UserCode === headers.create_by || ((permission_menuID ? permission_menuID.includes(10) : null) === true)) ? false : true}>
                                Update
                              </Button>
                              <Button
                                variant="contained"
                                className='scaled-480px-TableHeader'
                                sx={{ m: 1 }}
                                disabled={
                                  (data.UserCode === headers.create_by || ((permission_menuID ? permission_menuID.includes(10) : null) === true)) ? false :
                                    ExamineApprove.length === 0 ? false : true}
                                onClick={handleSubmit}>
                                <React.Fragment>
                                  Submit
                                </React.Fragment>
                              </Button>
                            </React.Fragment>
                          ) : ((selectNAC === 2 && (CheckExamineApprove.includes(data.UserCode) !== false || ((permission_menuID ? permission_menuID.includes(10) : null) === true))) || (selectNAC === 3 && (CheckApprove.includes(data.UserCode) !== false || ((permission_menuID ? permission_menuID.includes(10) : null) === true)))) ? (
                            <React.Fragment>
                              <Button
                                variant="contained"
                                onClick={handleClickOpenDialogReply}
                                style={{ 'backgroundColor': 'orange' }}
                                className='scaled-480px-TableHeader'
                                sx={{ m: 1 }}
                                disabled={
                                  (selectNAC === 3 && (CheckApprove.includes(data.UserCode) !== false || ((permission_menuID ? permission_menuID.includes(10) : null) === true))) ? false :
                                    (selectNAC === 2 && (CheckExamineApprove.includes(data.UserCode) !== false || ((permission_menuID ? permission_menuID.includes(10) : null) === true))) ? false :
                                      true
                                }>
                                Redo
                              </Button>
                              <Button
                                variant="contained"
                                color='error'
                                disabled={(selectNAC === 3 && (CheckApprove.includes(data.UserCode) !== false || ((permission_menuID ? permission_menuID.includes(10) : null) === true))) ? false
                                  : (selectNAC === 2 && (CheckExamineApprove.includes(data.UserCode) !== false || ((permission_menuID ? permission_menuID.includes(10) : null) === true))) ? false :
                                    true
                                }
                                onClick={CancelApprove}
                                className='scaled-480px-TableHeader'
                                sx={{ m: 1 }}
                              >
                                Reject
                              </Button>
                              <Button
                                variant="contained"
                                className='scaled-480px-TableHeader'
                                sx={{ m: 1 }}
                                color={selectNAC === 2 ? 'success' :
                                  selectNAC === 3 ? 'success' :
                                    'primary'}
                                onClick={selectNAC === 2 ? handleExamineApprove : handleExecApprove}
                                startIcon={selectNAC === 3 ? <CheckRoundedIcon /> : <VisibilityRoundedIcon />}
                              >
                                <React.Fragment>
                                  Accept
                                </React.Fragment>
                              </Button>
                            </React.Fragment>
                          ) : ((selectNAC === 4) && (data.UserCode === headers.des_userid || ((permission_menuID ? permission_menuID.includes(10) : null) === true)) && (!headers.des_date)) ? (
                            <React.Fragment>
                              <Button
                                variant="contained"
                                style={{ 'backgroundColor': 'orange' }}
                                className='scaled-480px-TableHeader'
                                sx={{ m: 1 }}
                                disabled={((selectNAC === 4) && (data.UserCode === headers.des_userid || ((permission_menuID ? permission_menuID.includes(10) : null) === true)) && (!headers.des_date)) ? false : true}
                              //</Grid>onClick={handleSubmitComplete}>
                              >Reject
                              </Button>
                              <Button
                                variant="contained"
                                className='scaled-480px-TableHeader'
                                sx={{ m: 1 }}
                                disabled={((selectNAC === 4) && (data.UserCode === headers.des_userid || ((permission_menuID ? permission_menuID.includes(10) : null) === true)) && (!headers.des_date)) ? false : true}
                                onClick={handleSubmitComplete}>
                                Accept
                              </Button>
                            </React.Fragment>
                          ) : (selectNAC === 5) && (((permission_menuID ? (permission_menuID.includes(10) || permission_menuID.includes(11) || permission_menuID.includes(12)) : null) === true && headers.des_date !== undefined)) ? (
                            <React.Fragment>
                              <Button
                                variant="contained"
                                color='error'
                                className='scaled-480px-TableHeader'
                                sx={{ m: 1 }}
                                onClick={handleOpen_drop_NAC_byDes}>
                                Reject
                              </Button>
                              <Button
                                variant="contained"
                                className='scaled-480px-TableHeader'
                                sx={{ m: 1 }}
                                disabled={(selectNAC === 5) && (((permission_menuID ? (permission_menuID.includes(10) || permission_menuID.includes(11) || permission_menuID.includes(12)) : null) === true && headers.des_date !== undefined)) ? false : true}
                                onClick={handleSubmitComplete}>
                                Accept
                              </Button>
                            </React.Fragment>
                          ) : (
                            <React.Fragment>
                              <Button
                                variant="contained"
                                onClick={handleSave}
                                style={{ 'backgroundColor': 'orange' }}
                                className='scaled-480px-TableHeader'
                                sx={{ m: 1 }}
                                disabled={(data.UserCode === headers.create_by || ((permission_menuID ? permission_menuID.includes(9) : null) === true)) ? false : true}>
                                Update
                              </Button>
                            </React.Fragment>
                          )}
                        </Stack>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </React.Fragment>
              </Paper>
              <CommentNAC
                handleClickOpenDialog={handleClickOpenDialog}
                openDialog={openDialog}
                handleCloseDialog={handleCloseDialog}
                data={data}
                nac_code={nac_code}
                headers={headers}
                description={description}
                setDescription={setDescription}
                setOpenDialog={setOpenDialog}
              />

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
            </Container>
            <Dialog
              open={drop_NAC_byDes}
              onClose={handleClose_drop_NAC_byDes}
            >
              <DialogTitle id="alert-dialog-title">
                {"แจ้งเตือน"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  คุณต้องการที่จะยกเลิกรายการ {headers.nac_code} ใช่หรือไม่
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
          <Outlet />
        </ThemeProvider>
      </React.Fragment >
    );
  } else {
    return (
      <div className="container">
        <center>
          <h1 className="pt-5">404 Not Found</h1>
        </center>
      </div>
    )
  }
}
