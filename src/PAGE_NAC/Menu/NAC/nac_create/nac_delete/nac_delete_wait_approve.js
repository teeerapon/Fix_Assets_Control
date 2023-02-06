import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { useParams } from 'react-router';
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
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import DialogContentText from '@mui/material/DialogContentText';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import { CSVLink } from 'react-csv'
import '../../../../../App.css'

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

async function store_FA_control_select_dtl(credentials) {
  return fetch('http://vpnptec.dyndns.org:32001/api/store_FA_control_select_dtl', {
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
  return fetch('http://vpnptec.dyndns.org:32001/api/store_FA_control_select_headers', {
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
  return fetch('http://vpnptec.dyndns.org:32001/api/SelectDTL_Control', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

async function SelectAssetsControl(credentials) {
  return fetch('http://vpnptec.dyndns.org:32001/api/AssetsAll_Control', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

async function AutoDeapartMent(credentials) {
  return fetch('http://vpnptec.dyndns.org:32001/api/AutoDeapartMent', {
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
  return fetch('http://vpnptec.dyndns.org:32001/api/store_FA_control_update_DTLandHeaders', {
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
  return fetch('http://vpnptec.dyndns.org:32001/api/store_FA_control_update_DTL', {
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
  return fetch('http://vpnptec.dyndns.org:32001/api/store_FA_control_execDocID', {
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
  return fetch('http://vpnptec.dyndns.org:32001/api/store_FA_control_updateStatus', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

// async function store_FA_control_seals_update(credentials) {
//   return fetch('http://vpnptec.dyndns.org:32001/api/store_FA_control_seals_update', {
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
  return fetch('http://vpnptec.dyndns.org:32001/api/store_FA_control_updateDTL_seals', {
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
  return fetch('http://vpnptec.dyndns.org:32001/api/store_FA_control_comment', {
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
  return fetch('http://vpnptec.dyndns.org:32001/api/store_FA_control_CheckAssetCode_Process', {
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
  return fetch('http://vpnptec.dyndns.org:32001/api/stroe_FA_control_DTL_ConfirmSuccess', {
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
  return fetch('http://vpnptec.dyndns.org:32001/api/store_FA_control_upadate_table', {
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
  return fetch('http://vpnptec.dyndns.org:32001/api/store_FA_SendMail', {
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
  return fetch('http://vpnptec.dyndns.org:32001/api/store_FA_control_drop_NAC', {
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

export default function Nac_Seals_Approve() {

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

  React.useEffect(() => {
    // POST request using axios with set headers
    const body = { Permission_TypeID: 1, userID: data.userid }
    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };
    Axios.post('http://vpnptec.dyndns.org:32001/api/select_Permission_Menu_NAC', body, { headers })
      .then(response => {
        setPermission_menuID(response.data.data.map((res) => res.Permission_MenuID))
      });
  }, []);

  const navigate = useNavigate();
  const [serviceList, setServiceList] = React.useState([{ dtl_id: "", assetsCode: "", serialNo: "", name: "", date_asset: "", price: "", bookValue: "", priceSeals: "", profit: "", asset_id: "" }]);
  const data = JSON.parse(localStorage.getItem('data'));
  const dataDepID = data.depid
  const [users_pureDep, setUsers_pureDep] = React.useState([]);
  const { nac_id } = useParams()
  const nac_code = nac_id.split('=')[0]
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
  const [exportToExcel, setExportToExcel] = React.useState([]);

  const [ExamineApprove, setExamineApprove] = React.useState([]);
  const [ExecApprove, setExecApprove] = React.useState([]);
  const [CheckApprove, setCheckApprove] = React.useState([]);
  const [CheckExamineApprove, setCheckExamineApprove] = React.useState([]);
  //const [CheckExamineApproveDes, setCheckExamineApproveDes] = React.useState([]);
  //const [ExamineApproveDes, setExamineApproveDes] = React.useState([]);
  const [checked, setChecked] = React.useState([{ assets_code: "", statusCheck: "", asset_id: "" }]);
  const [description, setDescription] = React.useState();
  const checkUserWeb = localStorage.getItem('sucurity');
  const [valuesVisibility, setValuesVisibility] = React.useState({
    text: serviceList[0].price,
    showText: data.branchid === 901 ? true : false,
  });

  const [drop_NAC_byDes, setDrop_NAC_byDes] = React.useState(false);

  const result = serviceList.map(function (elt) {
    return (/^\d+\.\d+$/.test(elt.price) || /^\d+$/.test(elt.price)) ? parseFloat(elt.price) : elt.price;
  }).reduce(function (a, b) { // sum all resulting numbers
    return parseFloat(a ? a.toFixed(2) : 0) + parseFloat(b ? b.toFixed(2) : 0)
  })
  const book_V = serviceList.map(function (elt) {
    return (/^\d+\.\d+$/.test(elt.bookValue) || /^\d+$/.test(elt.bookValue)) ? parseFloat(elt.bookValue) : elt.bookValue;
  }).reduce(function (a, b) { // sum all resulting numbers
    return parseFloat(a ? a.toFixed(2) : 0) + parseFloat(b ? b.toFixed(2) : 0)
  })

  const price_seals = serviceList.map(function (elt) {
    return (/^\d+\.\d+$/.test(elt.priceSeals) || /^\d+$/.test(elt.priceSeals)) ? parseFloat(elt.priceSeals) : elt.priceSeals;
  }).reduce(function (a, b) { // sum all resulting numbers
    return parseFloat(a ? a.toFixed(2) : 0) + parseFloat(b ? b.toFixed(2) : 0)
  })

  const profit_seals = serviceList.map(function (elt) {
    return (/^\d+\.\d+$/.test(((elt.priceSeals * 100) / 107) - elt.bookValue) || /^\d+$/.test(((elt.priceSeals * 100) / 107) - elt.bookValue)) ? parseFloat((((elt.priceSeals * 100) / 107) - elt.bookValue)) : (((elt.priceSeals * 100) / 107) - elt.bookValue);
  }).reduce(function (a, b) { // sum all resulting numbers
    return parseFloat(a ? a.toFixed(2) : 0) + parseFloat(b ? b.toFixed(2) : 0)
  })

  const sum_vat = serviceList.map(function (elt) {
    return (/^\d+\.\d+$/.test((elt.priceSeals * 100) / 107) || /^\d+$/.test((elt.priceSeals * 100) / 107)) ? parseFloat(((elt.priceSeals * 100) / 107)) : ((elt.priceSeals * 100) / 107);
  }).reduce(function (a, b) { // sum all resulting numbers
    return parseFloat(a ? a.toFixed(2) : 0) + parseFloat(b ? b.toFixed(2) : 0)
  })


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
      swal("ทำรายการสำเร็จ", 'ทำการลบรายการ ' + response.data[0].nac_code + ' แล้ว', "success", {
        buttons: false,
        timer: 2000,
      }).then((value) => {
        window.location.href = "/NAC_OPERATOR";
      });
    } else {
      swal("ทำรายการไม่สำเร็จ", 'ไม่สามารถลบ ' + response.data[0].nac_code + ' ได้', "error")
    }
  }

  const fetchUserForAssetsControl = async () => {
    const { data } = await Axios.get(
      "http://vpnptec.dyndns.org:32001/api/getsUserForAssetsControl"
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
      swal("ทำรายการไม่สำเร็จ", 'ไม่พบรายการนี้แล้ว', "error", {
        buttons: false,
        timer: 2000,
      }).then((value) => {
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
    }

    // เรียก Detail มาแสดง
    const responseDTL = await store_FA_control_select_dtl({
      nac_code
    });
    const responseDTLs = responseDTL.data
    setServiceList(responseDTLs.map((res) => {
      return {
        dtl_id: res.nacdtl_id
        , assetsCode: res.nacdtl_assetsCode
        , serialNo: res.nacdtl_assetsSeria
        , name: res.nacdtl_assetsName
        , price: res.nacdtl_assetsPrice
        , asset_id: res.nacdtl_id
        , bookValue: !res.nacdtl_bookV ? '' : res.nacdtl_bookV
        , priceSeals: !res.nacdtl_PriceSeals ? '' : res.nacdtl_PriceSeals
        , profit: !res.nacdtl_profit ? '' : res.nacdtl_profit
        , date_asset: res.nacdtl_date_asset
      };
    }));

    setExportToExcel(responseDTLs.map((res) => {
      return {
        Code: res.nacdtl_assetsCode
        , serialNo: res.nacdtl_assetsSeria
        , name: res.nacdtl_assetsName
        , price: res.nacdtl_assetsPrice
        , bookValue: !res.nacdtl_bookV ? '' : res.nacdtl_bookV
        , priceSeals: 0
        , Price_Before_VAT: !res.nacdtl_PriceSeals ? '' : res.nacdtl_PriceSeals - (res.nacdtl_PriceSeals * (7 / 100))
        , profit: !res.nacdtl_profit ? '' : (res.nacdtl_PriceSeals - (res.nacdtl_PriceSeals * (7 / 100)) - res.nacdtl_bookV)
      };
    }));

    setChecked(responseDTLs.map((res) => {
      return {
        assets_code: res.nacdtl_assetsCode
        , statusCheck: (!res.success_id || res.success_id === 0) ? 0 : res.success_id
        , asset_id: res.nacdtl_id
      };
    }))

    //เรียก Approve มาแสดง
    const user_source = responseHeaders.data[0].source_userid;
    const responseExecDocID = await store_FA_control_execDocID({
      user_source,
      nac_code,
    });
    // ผู้ตรวจสอบ
    const ExamineApprove = []
    const ExamineApproveDes = []
    const ExecApprove = []
    const CheckApprove = []
    const CheckExamineApprove = []
    const CheckExamineApproveDes = []
    const price_approve = responseHeaders.data[0].sum_price;

    for (let i = 0; i < (responseExecDocID.data.length); i++) {
      if (responseExecDocID.data[i].limitamount >= price_approve && responseExecDocID.data[i].limitamount !== null && responseExecDocID.data[i].workflowlevel < 5) {
        ExecApprove[i] = {
          approverid: responseExecDocID.data[i].workflowlevel === 0 ? 'AM: ' + responseExecDocID.data[i].approverid :

            responseExecDocID.data[i].workflowlevel === 1 ? 'SM: ' + responseExecDocID.data[i].approverid :
              responseExecDocID.data[i].workflowlevel === 2 ? 'DM: ' + responseExecDocID.data[i].approverid :
                responseExecDocID.data[i].workflowlevel === 3 ? 'FM: ' + responseExecDocID.data[i].approverid : 'MD: ' + responseExecDocID.data[i].approverid, status: responseExecDocID.data[i].status
        }
        CheckApprove[i] = responseExecDocID.data[i].approverid
      }

      if (responseExecDocID.data[i].limitamount < price_approve && responseExecDocID.data[i].limitamount !== null && responseExecDocID.data[i].workflowlevel < 5) {
        ExamineApprove[i] = {
          approverid: responseExecDocID.data[i].workflowlevel === 0 ? 'AM: ' + responseExecDocID.data[i].approverid :

            responseExecDocID.data[i].workflowlevel === 1 ? 'SM: ' + responseExecDocID.data[i].approverid :
              responseExecDocID.data[i].workflowlevel === 2 ? 'DM: ' + responseExecDocID.data[i].approverid :
                responseExecDocID.data[i].workflowlevel === 3 ? 'FM: ' + responseExecDocID.data[i].approverid : 'MD: ' + responseExecDocID.data[i].approverid, status: responseExecDocID.data[i].status
        }
        CheckExamineApprove[i] = responseExecDocID.data[i].approverid
      } else if (responseExecDocID.data[i].workflowlevel > 4) {
        ExamineApproveDes[i] = {
          approverid: responseExecDocID.data[i].workflowlevel === 0 ? 'AM: ' + responseExecDocID.data[i].approverid :
            responseExecDocID.data[i].workflowlevel === 1 ? 'SM: ' + responseExecDocID.data[i].approverid :
              responseExecDocID.data[i].workflowlevel === 2 ? 'DM: ' + responseExecDocID.data[i].approverid :
                responseExecDocID.data[i].workflowlevel === 3 ? 'FM: ' + responseExecDocID.data[i].approverid : 'MD: ' + responseExecDocID.data[i].approverid, status: responseExecDocID.data[i].status
        }
        CheckExamineApproveDes[i] = responseExecDocID.data[i].approverid
      }
    }
    setCheckExamineApprove(CheckExamineApprove)
    setExamineApprove(ExamineApprove)
    //setExamineApproveDes(ExamineApproveDes)
    //setCheckExamineApproveDes(CheckExamineApproveDes)
    setExecApprove(ExecApprove)
    setCheckApprove(CheckApprove)
  }

  const Export_PDF_DATA_NAC = () => {
    window.location.href = 'http://ptecdba:10230/reports/fa/nac_sale.aspx?nac_code=' + headers.nac_code
  }


  React.useEffect(() => {
    fetchUserForAssetsControl();
    fetchSelectDTL_Headers();
    // 👇️ disable the rule for a single line

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    setServiceList([...serviceList, { dtl_id: 0, assetsCode: "", serialNo: "", name: "", date_asset: "", price: "", bookValue: "", priceSeals: "", profit: "", asset_id: "" }]);
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
      const alert_value = 'ทรัพย์สินนี้กำลังอยู่ในระหว่างการทำรายการ NAC'
      setAlert(true);
      setValueAlert(alert_value)
      const list = [...serviceList];
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
      const list = [...serviceList];
      list[index][name] = value;
      list[index]['assetsCode'] = assetsCodeSelect;
      if ((list[index]['assetsCode'] === null) || (list[index]['assetsCode'] === undefined)) {
        list[index]['name'] = ''
        list[index]['dtl'] = ''
        list[index]['count'] = ''
        list[index]['serialNo'] = ''
        list[index]['price'] = ''
        list[index]['bookValue'] = ''
        list[index]['priceSeals'] = ''
        list[index]['profit'] = ''
        list[index]['date_asset'] = ""
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
          list[index]['priceSeals'] = ''
          list[index]['profit'] = list[index]['priceSeals'] - list[index]['bookValue']
          list[index]['date_asset'] = response['data'][0].CreateDate
          setServiceList(list);
        }
      }
    }
  };

  function handleGoNAC() {
    if (localStorage.getItem('pagination')) {
      navigate('/NAC_OPERATOR')
    } else {
      navigate('/NAC_ROW')
    }
  }

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
      if (response.data[0].BranchID !== 901) {
        setSource_Department(response.data[0].DepCode)
        setSource_BU('Oil')
      } else {
        setSource_Department(response.data[0].DepCode)
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

  // Update Document
  const handleSave = async () => {
    if (!source || !source_department || !source_BU || !sourceDate) {
      const alert_value = !source ? 'กรุณากรอกข้อมูลผู้ส่ง' : !source_department ? 'กรุณากรอกข้อมูลแผนกของผู้ส่ง' : 'กรุณากรอกวันที่ของผู้ส่ง'
      setAlert(true);
      setValueAlert(alert_value)
    } else {
      if (!serviceList[0].assetsCode) {
        const alert_value = 'กรุณากรอกข้อมูลทรัพย์สินให้ครบถ้วน'
        setAlert(true);
        setValueAlert(alert_value)
      } else {
        const usercode = data.UserCode
        const nac_status = (selectNAC === 11) ? 11 : 1
        const sumPrice = result
        const nac_type = headers.nac_type
        const response = await store_FA_control_update_DTLandHeaders({
          usercode,
          nac_code,
          nac_status,
          sumPrice,
          nac_type,
          des_department,
          des_BU,
          des_delivery,
          des_deliveryDate,
          des_description,
          source_department,
          source_BU,
          source,
          sourceDate,
          source_description,
        });
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
              const nacdtl_bookV = !serviceList[i].bookValue ? undefined : serviceList[i].bookValue
              const nacdtl_PriceSeals = !serviceList[i].priceSeals ? undefined : serviceList[i].priceSeals
              const nacdtl_profit = !serviceList[i].priceSeals ? 0 - serviceList[i].bookValue : serviceList[i].priceSeals - serviceList[i].bookValue
              const asset_id = responseDTL.data[i].nacdtl_id
              const nac_status = (selectNAC === 11) ? 11 : 1
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
              swal("ทำรายการสำเร็จ", 'อัปเดตรายการแล้ว', "success", {
                buttons: false,
                timer: 2000,
              }).then((value) => {
                window.location.href = '/NAC_ROW/NAC_DELETE_WAIT_APPROVE/' + nac_code
              });
            } else {
              swal("ล้มเหลว", 'คำขออัปเดตรายการผิดพลาด', "error", {
                buttons: false,
                timer: 2000,
              })
            }
          }
        } else {
          swal("ทำรายการไม่สำเร็จ", 'กรุณาลองใหม่ภายหลัง', "error", {
            buttons: false,
            timer: 2000,
          })
        }
      }
    }
    //navigate("/NAC_CREATE_MAIN1/NAC_CREATE_MAIN1_STEP2")
  };

  const handleSubmit = async () => {
    if (!source || !source_department || !source_BU || !sourceDate) {
      const alert_value = 'กรุณากรอกข้อมูลผู้ยืนยันให้ครบถ้วน'
      setAlert(true);
      setValueAlert(alert_value)
    } else {
      if (!serviceList[0].assetsCode) {
        const alert_value = 'กรุณากรอกข้อมูลทรัพย์สินให้ครบถ้วน'
        setAlert(true);
        setValueAlert(alert_value)
      } else {
        if (result !== headers.sum_price || headers.source_userid !== source || headers.des_userid !== des_delivery) {
          const alert_value = 'ข้อมูลมีการเปลี่ยนแปลง กรุณากดบันทึกรายการก่อนยืนยัน'
          setAlert(true);
          setValueAlert(alert_value)
        } else {
          if (data.UserCode === headers.create_by || CheckExamineApprove.includes(data.UserCode) === true || CheckApprove.includes(data.UserCode) === true || (permission_menuID ? permission_menuID.includes(10) : null) === true || (permission_menuID ? permission_menuID.includes(9) : null) === true) {
            const usercode = data.UserCode
            const nac_status = (selectNAC === 11) ? 10 : 11
            const source_approve = sourceApprove
            const source_approve_date = sourceDateApproveDate
            const des_approve = des_deliveryApprove
            const des_approve_date = des_deliveryApproveDate
            const verify_by = bossApprove
            const verify_date = bossApproveDate
            const nac_type = headers.nac_type
            if (selectNAC === 11) {
              const checkBookValue_is_null = []
              for (let i = 0; i < serviceList.length; i++) {
                checkBookValue_is_null[i] = serviceList[i].bookValue
              }
              if (checkBookValue_is_null.includes('') !== true) {
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
                    const nacdtl_bookV = !serviceList[i].bookValue ? undefined : serviceList[i].bookValue
                    const nacdtl_PriceSeals = !serviceList[i].priceSeals ? undefined : serviceList[i].priceSeals
                    const nacdtl_profit = !serviceList[i].priceSeals ? 0 - serviceList[i].bookValue : serviceList[i].priceSeals - serviceList[i].bookValue
                    const asset_id = responseDTL.data[i].nacdtl_id
                    const nac_status = (selectNAC === 11) ? 10 : 11
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
                  }
                }
                const comment = 'กรอก Book Value ในรายการแล้ว'
                const responseComment = await store_FA_control_comment({
                  nac_code,
                  usercode,
                  comment
                })
                await store_FA_SendMail({
                  nac_code
                })
                if ('data' in responseComment) {
                  swal("ทำรายการสำเร็จ", 'คุณกรอก Book Value ในรายการแล้ว', "success", {
                    buttons: false,
                    timer: 2000,
                  }).then((value) => {
                    window.location.href = '/NAC_ROW/NAC_DELETE_WAIT_APPROVE/' + nac_code
                  });
                } else {
                  swal("ทำรายการไม่สำเร็จ", 'เกิดข้อพิดพลาด', "error", {
                    buttons: false,
                    timer: 2000,
                  }).then((value) => {
                    window.location.href = '/NAC_ROW/NAC_DELETE_WAIT_APPROVE/' + nac_code
                  });
                }
              } else {
                const alert_value = 'กรุณากรอก Book Value ของทรัพย์สินให้ครบถ้วน'
                setAlert(true);
                setValueAlert(alert_value)
              }
            } else {
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
                  const nacdtl_bookV = !serviceList[i].bookValue ? undefined : serviceList[i].bookValue
                  const nacdtl_PriceSeals = !serviceList[i].priceSeals ? undefined : serviceList[i].priceSeals
                  const nacdtl_profit = !serviceList[i].priceSeals ? 0 - serviceList[i].bookValue : serviceList[i].priceSeals - serviceList[i].bookValue
                  const asset_id = responseDTL.data[i].nacdtl_id
                  const nac_status = (selectNAC === 11) ? 10 : 11
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
                    swal("ทำรายการสำเร็จ", 'คุณยืนยันรายการแล้ว', "success", {
                      buttons: false,
                      timer: 2000,
                    }).then((value) => {
                      window.location.href = '/NAC_ROW/NAC_DELETE_WAIT_APPROVE/' + nac_code
                    });
                  } else {
                    swal("ทำรายการไม่สำเร็จ", 'เกิดข้อพิดพลาด', "error", {
                      buttons: false,
                      timer: 2000,
                    }).then((value) => {
                      window.location.href = '/NAC_ROW/NAC_DELETE_WAIT_APPROVE/' + nac_code
                    });
                  }
                }
              }
            }
          } else {
            swal("ทำรายการไม่สำเร็จ", 'เกิดข้อพิดพลาด', "error", {
              buttons: false,
              timer: 2000,
            }).then((value) => {
              window.location.href = '/NAC_ROW/NAC_DELETE_WAIT_APPROVE/' + nac_code
            });
          }
        }
      }
    }
  };

  // ExamineApprove
  const handleExamineApprove = async () => {
    if (verify === data.UserCode) {
      const alert_value = 'คุณได้ตรวจสอบรายการนี้ไปแล้ว'
      setAlert(true);
      setValueAlert(alert_value)
    }
    else if (CheckExamineApprove.filter(function (el) { return (el != null) }).includes(data.UserCode) !== false && ExamineApprove.filter(function (el) { return (el != null && el.status === 0) }).length > 1) {
      const usercode = data.UserCode
      const nac_status = 2
      const source_approve = sourceApprove
      const source_approve_date = sourceDateApproveDate
      const des_approve = des_deliveryApprove
      const des_approve_date = des_deliveryApproveDate
      const verify_by = data.UserCode
      const verify_date = datenow
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
        const comment = 'ตรวจสอบรายการแล้ว'
        const responseComment = await store_FA_control_comment({
          nac_code,
          usercode,
          comment
        })
        await store_FA_SendMail({
          nac_code
        })
        if ('data' in responseComment) {
          swal("ทำรายการสำเร็จ", 'คุณตรวจสอบรายการแล้ว', "success", {
            buttons: false,
            timer: 2000,
          }).then((value) => {
            window.location.href = '/NAC_ROW/NAC_CREATE_WAIT_APPROVE/' + nac_code
          });
        } else {
          swal("ทำรายการไม่สำเร็จ", 'เกิดข้อพิดพลาด', "error", {
            buttons: false,
            timer: 2000,
          }).then((value) => {
            window.location.href = '/NAC_ROW/NAC_CREATE_WAIT_APPROVE/' + nac_code
          });
        }
      } else {
        swal("ทำรายการไม่สำเร็จ", 'คุณไม่ได้รับอนุญาติให้ทำรายการนี้', "error", {
          buttons: false,
          timer: 2000,
        }).then((value) => {
          window.location.href = '/NAC_ROW/NAC_CREATE_WAIT_APPROVE/' + nac_code
        });
      }
    }
    else if ((CheckExamineApprove.filter(function (el) { return (el != null) }).includes(data.UserCode) !== false && ExamineApprove.filter(function (el) { return (el != null && el.status === 0) }).length === 1) || (permission_menuID ? permission_menuID.includes(10) : null) === true) {
      const usercode = data.UserCode
      const nac_status = 3
      const source_approve = sourceApprove
      const source_approve_date = sourceDateApproveDate
      const des_approve = des_deliveryApprove
      const des_approve_date = des_deliveryApproveDate
      const verify_by = data.UserCode
      const verify_date = datenow
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
        const comment = 'ตรวจสอบรายการแล้ว'
        const responseComment = await store_FA_control_comment({
          nac_code,
          usercode,
          comment
        })
        await store_FA_SendMail({
          nac_code
        })
        if ('data' in responseComment) {
          swal("ทำรายการสำเร็จ", 'คุณตรวจสอบรายการแล้ว', "success", {
            buttons: false,
            timer: 2000,
          }).then((value) => {
            window.location.href = '/NAC_ROW/NAC_CREATE_WAIT_APPROVE/' + nac_code
          });
        } else {
          swal("ทำรายการไม่สำเร็จ", 'เกิดข้อพิดพลาด', "error", {
            buttons: false,
            timer: 2000,
          }).then((value) => {
            window.location.href = '/NAC_ROW/NAC_CREATE_WAIT_APPROVE/' + nac_code
          });
        }
      } else {
        swal("ทำรายการไม่สำเร็จ", 'เกิดข้อพิดพลาด', "error", {
          buttons: false,
          timer: 2000,
        }).then((value) => {
          window.location.href = '/NAC_ROW/NAC_CREATE_WAIT_APPROVE/' + nac_code
        });
      }
    }
  };

  // ExecApprove
  const handleExecApprove = async () => {
    if (CheckApprove.filter(function (el) { return (el != null) }).includes(data.UserCode) !== false || (permission_menuID ? permission_menuID.includes(10) : null) === true) {
      const usercode = data.UserCode
      const nac_status = 5
      const source_approve = data.UserCode
      const source_approve_date = datenow
      const des_approve = des_deliveryApprove
      const des_approve_date = des_deliveryApproveDate
      const verify_by = headers.verify_by_userid
      const verify_date = headers.verify_date
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
        swal("ทำรายการสำเร็จ", 'คุณอนุมัติรายการแล้ว', "success", {
          buttons: false,
          timer: 2000,
        }).then((value) => {
          window.location.href = '/NAC_ROW/NAC_CREATE_WAIT_APPROVE/' + nac_code
        });
      } else {
        swal("ทำรายการไม่สำเร็จ", 'เกิดข้อพิดพลาด', "error", {
          buttons: false,
          timer: 2000,
        }).then((value) => {
          window.location.href = '/NAC_ROW/NAC_CREATE_WAIT_APPROVE/' + nac_code
        });
      }
    }
  };

  //
  const handleSubmitComplete = async () => {
    if (selectNAC === 4 || selectNAC === 5 || selectNAC === 12 || selectNAC === 13) {
      const usercode = data.UserCode
      const nac_status = selectNAC === 4 ? 5 : selectNAC === 12 ? 13 : 6
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
          swal("ทำรายการสำเร็จ", 'คุณได้ปิดรายการแล้ว', "success", {
            buttons: false,
            timer: 2000,
          }).then((value) => {
            window.location.href = '/NAC_ROW/NAC_DELETE_WAIT_APPROVE/' + nac_code
          });
        } else {
          swal("ทำรายการไม่สำเร็จ", 'เกิดข้อพิดพลาด', "error", {
            buttons: false,
            timer: 2000,
          }).then((value) => {
            window.location.href = '/NAC_ROW/NAC_DELETE_WAIT_APPROVE/' + nac_code
          });
        }
      }
    } else {
      swal("ทำรายการไม่สำเร็จ", 'สถานะการทำรายการผิด', "error", {
        buttons: false,
        timer: 2000,
      }).then((value) => {
        window.location.href = '/NAC_ROW/NAC_DELETE_WAIT_APPROVE/' + nac_code
      });
    }
  };

  // CancelApprove
  const CancelApprove = async () => {
    const usercode = data.UserCode
    const nac_status = 0
    const source_approve =
      (selectNAC === 2 && (CheckExamineApprove.includes(data.UserCode) !== false || (permission_menuID ? permission_menuID.includes(10) : null) === true)) ? verify : data.UserCode
    const source_approve_date =
      (selectNAC === 2 && (CheckExamineApprove.includes(data.UserCode) !== false || (permission_menuID ? permission_menuID.includes(10) : null) === true)) ? verifyApproveDate : datenow
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
        swal("ทำรายการสำเร็จ", 'คุณได้ยกเลิกรายการแล้ว', "success", {
          buttons: false,
          timer: 2000,
        }).then((value) => {
          window.location.href = '/NAC_ROW/NAC_DELETE_WAIT_APPROVE/' + nac_code
        });
      } else {
        swal("ทำรายการไม่สำเร็จ", 'เกิดข้อพิดพลาด', "error", {
          buttons: false,
          timer: 2000,
        }).then((value) => {
          window.location.href = '/NAC_ROW/NAC_DELETE_WAIT_APPROVE/' + nac_code
        });
      }
    } else {
      swal("ทำรายการไม่สำเร็จ", 'เกิดข้อพิดพลาด', "error", {
        buttons: false,
        timer: 2000,
      }).then((value) => {
        window.location.href = '/NAC_ROW/NAC_DELETE_WAIT_APPROVE/' + nac_code
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
    const source_approve = sourceApprove
    const source_approve_date = sourceDateApproveDate
    const des_approve = des_deliveryApprove
    const des_approve_date = des_deliveryApproveDate
    const verify_by = bossApprove
    const verify_date = bossApproveDate
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
      verify_date
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
        window.location.href = '/NAC_ROW/NAC_DELETE_WAIT_APPROVE/' + nac_code
      }
    }
  }

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlert(false);
  };


  if (headers.length === 0) {
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
              <Paper variant="outlined" sx={{ p: { xs: 1, md: 2 }, mt: 4 }}>
                <Table aria-label="customized table" style={{ width: '100%' }}>
                  {/* <Grid container>
                    ผู้มีสิทธิอนุมัติเอกสารฉบับนี้ขารับ : {
                      ExamineApproveDes.map((Approve) => (
                        <Typography style={{ 'color': Approve.status === 1 ? 'blue' : 'black' }}>
                          &nbsp;({Approve.approverid})
                        </Typography>
                      ))}
                  </Grid>
                  <hr /> */}
                  <Grid container>
                    ผู้มีสิทธิอนุมัติเอกสารฉบับนี้ขาส่ง : {
                      ExecApprove.map((Approve) => (
                        <Typography style={{ 'color': Approve.status === 1 ? 'blue' : 'black' }}>
                          &nbsp;({Approve.approverid})
                        </Typography>
                      ))}
                  </Grid>
                  <hr />
                  <Grid container>
                    ผู้มีสิทธิตรวจสอบเอกสารฉบับนี้ : {
                      ExamineApprove.map((Approve) => (
                        <Typography style={{ 'color': Approve.status === 1 ? 'blue' : 'red' }}>
                          &nbsp;({Approve.approverid})
                        </Typography>
                      ))}
                  </Grid>
                </Table>
              </Paper>
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
              <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 } }}>
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
                      * กรุณากรอกข้อมูลสำหรับตัดจากบัญชีทรัพย์สิน
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
                        Dowload PDF
                      </Button>
                      <CSVLink
                        data={exportToExcel}
                        className='btn btn-success btn-sm'
                        target="_blank"
                        filename={`${headers.nac_code}.csv`}
                      >
                        Dowload CSV
                      </CSVLink>
                    </Stack>
                  </Stack>
                  <TableContainer component={Paper}>
                    <Table aria-label="customized table">
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
                                  <Typography variant='h4' color='black'>
                                    ตัดจากบัญชีทรัพย์สิน
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
                                  freeSolo
                                  name='source'
                                  id='source'
                                  size="small"
                                  disabled={data.branchid === 901 && (selectNAC === 1 || selectNAC === 7) ? false : true}
                                  options={users_pureDep}
                                  getOptionLabel={(option) => option.UserCode}
                                  filterOptions={filterOptions2}
                                  value={!source ? '' : UserForAssetsControl[resultIndex[0].indexOf(source)]}
                                  onChange={handleAutoSource_DeapartMent}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      variant="standard"
                                      label='ผู้ยืนยัน'
                                      fullWidth
                                      autoComplete="family-name"
                                      onChange={handleChangeSource_delivery2}
                                      sx={{ pt: 1 }}
                                    />
                                  )}
                                />
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
                              </React.Fragment>
                            </StyledTableCell>
                            <StyledTableCell align="center" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa" }}>
                              <FormGroup>
                                <center>
                                  <Typography variant='h4' color='#AAAAAA'>
                                    none
                                  </Typography>
                                </center>
                              </FormGroup>
                            </StyledTableCell>
                          </StyledTableRow>
                        </TableBody>
                      </React.Fragment>
                    </Table>
                    <Table aria-label="customized table" style={{ width: 1100 }}>
                      <TableHead>
                        <TableRow style={{ width: '100%' }}>
                          <StyledTableCell align="center" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa", width: 180 }} >รหัสทรัพย์สิน</StyledTableCell>
                          <StyledTableCell align="center" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa", width: 150 }} >Serial No.</StyledTableCell>
                          <StyledTableCell align="center" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa", width: 180 }} >ชื่อ</StyledTableCell>
                          <StyledTableCell align="center" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa", width: 115 }} >วันที่ขึ้นทะเบียน</StyledTableCell>
                          <StyledTableCell align="center" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa", width: 100 }} >
                            ต้นทุน
                            {/* <Stack direction="row" alignItems="center" spacing={1}>
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
                            </Stack> */}
                          </StyledTableCell>
                          <StyledTableCell align="center" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa", width: 100 }} >BV</StyledTableCell>
                          <StyledTableCell align="center" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa", width: 100 }} >ราคาขาย</StyledTableCell>
                          <StyledTableCell align="center" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa", width: 100 }} >กำไร/ขาดทุน</StyledTableCell>
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
                        <React.Fragment>
                          <TableBody>
                            <StyledTableRow>
                              <StyledTableCell align="center" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa" }}>
                                {(selectNAC === 1 && data.UserCode === headers.create_by) ? (
                                  <React.Fragment>
                                    <Autocomplete
                                      freeSolo
                                      key={index}
                                      disabled={(selectNAC === 1 || selectNAC === 7) ? false : true}
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
                                      getOptionLabel={(option) => option.Code || ''}
                                      filterOptions={filterOptions}
                                      onChange={(e) => handleServiceChangeHeader(e, index)}
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
                                  key={index}
                                  fullWidth
                                  disabled
                                  name="serialNo"
                                  id="serialNo"
                                  variant="standard"
                                  inputProps={{ style: { '-webkit-text-fill-color': 'rgba(0,0,0,1)', fontSize: 14 } }}
                                  onChange={(e) => handleServiceChange(e, index)}
                                  value={singleService.serialNo}
                                />
                              </StyledTableCell>
                              <StyledTableCell align="center" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa" }}>
                                <TextField
                                  key={index}
                                  fullWidth
                                  disabled
                                  name="name"
                                  id="name"
                                  variant="standard"
                                  inputProps={{ style: { '-webkit-text-fill-color': 'rgba(0,0,0,1)', fontSize: 14 } }}
                                  onChange={(e) => handleServiceChange(e, index)}
                                  value={singleService.name}
                                />
                              </StyledTableCell>
                              <StyledTableCell align="center" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa" }}>
                                <TextField
                                  fullWidth
                                  key={index}
                                  disabled
                                  name="date_asset"
                                  id="date_asset"
                                  inputProps={{ style: { '-webkit-text-fill-color': 'rgba(0,0,0,1)', textAlign: 'center', fontSize: 14 } }}
                                  value={!singleService.date_asset ? singleService.date_asset : singleService.date_asset.split('T')[0]}
                                  variant="standard"
                                />
                              </StyledTableCell>
                              <StyledTableCell align="center" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa" }}>
                                <TextField
                                  key={index}
                                  fullWidth
                                  disabled
                                  name="price"
                                  id="price"
                                  onChange={(e) => handleServiceChange(e, index)}
                                  type={valuesVisibility.showText ? "text" : "password"}
                                  value={!singleService.price ? singleService.price : (singleService.price).toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 0 })}
                                  inputProps={{ style: { '-webkit-text-fill-color': 'rgba(0,0,0,1)', textAlign: 'center', fontSize: 14 } }}
                                  variant="standard"
                                />
                              </StyledTableCell>
                              <StyledTableCell align="center" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa" }}>
                                <TextField
                                  key={index}
                                  fullWidth
                                  disabled={(selectNAC === 11 && ((permission_menuID ? permission_menuID.includes(10) : null) === true || checkUserWeb === 'User_BV' || checkUserWeb === 'operatorI')) ? false : true}
                                  name="bookValue"
                                  id="bookValue"
                                  variant="standard"
                                  type={valuesVisibility.showText ? "text" : "password"}
                                  inputProps={{ style: { '-webkit-text-fill-color': 'rgba(0,0,0,1)', textAlign: 'center', fontSize: 14 } }}
                                  onChange={(e) => handleServiceChange(e, index)}
                                  value={!singleService.bookValue ? singleService.bookValue : (singleService.bookValue).toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 0 })}
                                />
                              </StyledTableCell>
                              <StyledTableCell align="center" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa" }}>
                                <TextField
                                  key={index}
                                  fullWidth
                                  disabled
                                  name="priceSeals"
                                  id="priceSeals"
                                  inputProps={{ style: { '-webkit-text-fill-color': 'rgba(0,0,0,1)', textAlign: 'center', fontSize: 14 } }}
                                  variant="standard"
                                  onChange={(e) => handleServiceChange(e, index)}
                                  value={!singleService.priceSeals ? 0 : (singleService.priceSeals).toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 0 })}
                                />
                              </StyledTableCell>
                              <StyledTableCell align="center" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa" }}>
                                <TextField
                                  key={index}
                                  fullWidth
                                  disabled
                                  name="profit"
                                  id="profit"
                                  variant="standard"
                                  type={valuesVisibility.showText ? "text" : "password"}
                                  inputProps={{ style: { '-webkit-text-fill-color': 'rgba(0,0,0,1)', textAlign: 'center', fontSize: 14 } }}
                                  onChange={(e) => handleServiceChange(e, index)}
                                  value={!singleService.bookValue ? '' : (0 - singleService.bookValue).toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 0 })}
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
                        </React.Fragment>
                      ))}
                      <StyledTableRow>
                        <StyledTableCell align="start" style={{ "borderWidth": "0.5px", 'border-right': 0 }}>
                          <Typography>
                            รวม
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell align="start" style={{ border: `none` }}>
                        </StyledTableCell>
                        <StyledTableCell align="start" style={{ border: `none` }}>
                        </StyledTableCell>
                        <StyledTableCell align="start" style={{ border: `none` }}>
                        </StyledTableCell>
                        <StyledTableCell align="center" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa" }}>
                          <TextField
                            required
                            fullWidth
                            disabled
                            type={valuesVisibility.showText ? "text" : "password"}
                            value={result === 0 ? '' : result.toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 0 })}
                            inputProps={{ style: { '-webkit-text-fill-color': 'rgba(0,0,0,1)', textAlign: 'center' } }}
                            variant="standard"
                          />
                        </StyledTableCell>
                        <StyledTableCell align="start" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa" }}>
                          <TextField
                            required
                            fullWidth
                            disabled
                            type={valuesVisibility.showText ? "text" : "password"}
                            value={book_V === 0 ? '' : book_V.toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 0 })}
                            inputProps={{ style: { '-webkit-text-fill-color': 'rgba(0,0,0,1)', textAlign: 'center' } }}
                            variant="standard"
                          />
                        </StyledTableCell>
                        <StyledTableCell align="start" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa" }}>
                          <TextField
                            required
                            fullWidth
                            disabled
                            //type={valuesVisibility.showText ? "text" : "password"}
                            value={result === 0 ? '' : 0}
                            inputProps={{ style: { '-webkit-text-fill-color': 'rgba(0,0,0,1)', textAlign: 'center' } }}
                            variant="standard"
                          />
                        </StyledTableCell>
                        <StyledTableCell align="start" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa" }}>
                          <TextField
                            required
                            fullWidth
                            disabled
                            type={valuesVisibility.showText ? "text" : "password"}
                            value={book_V === 0 ? '' : (0 - book_V).toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 0 })}
                            inputProps={{ style: { '-webkit-text-fill-color': 'rgba(0,0,0,1)', textAlign: 'center' } }}
                            variant="standard"
                          />
                        </StyledTableCell>
                        <StyledTableCell align="start" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa" }}>
                        </StyledTableCell>
                      </StyledTableRow>
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
                    <Table aria-label="customized table" style={{ width: 1100 }}>
                      <TableBody>
                        <Stack
                          direction="row"
                          justifyContent="center"
                          alignItems="center"
                          spacing={3}
                        >
                          {((selectNAC === 1 || selectNAC === 7) && data.UserCode === headers.create_by) || (selectNAC === 11 && ((permission_menuID ? permission_menuID.includes(10) : null) === true)) || (selectNAC === 11 && (permission_menuID ? permission_menuID.includes(9) : null) === true) ? (
                            <React.Fragment>
                              <Button
                                variant="contained"
                                onClick={handleSave}
                                sx={{ my: { xs: 3, md: 4 }, p: 2, width: 150 }}
                                startIcon={<SystemUpdateAltRoundedIcon />}
                                style={{ 'backgroundColor': 'orange' }}>
                                อัปเดต
                              </Button>
                              <Button
                                variant="contained"
                                sx={{ my: { xs: 3, md: 4 }, p: 2, width: 150 }}
                                endIcon={<DoubleArrowRoundedIcon />}
                                disabled={
                                  ((selectNAC === 1 || selectNAC === 7) && data.UserCode === headers.create_by) ||
                                    (selectNAC === 11 && ((permission_menuID ? permission_menuID.includes(10) : null) === true)) ||
                                    (selectNAC === 11 && (permission_menuID ? permission_menuID.includes(9) : null) === true) ? false :
                                    ExamineApprove.length === 0 ? false : true}
                                onClick={handleSubmit
                                }>
                                <React.Fragment>
                                  ยืนยันรายการ
                                </React.Fragment>
                              </Button>
                            </React.Fragment>
                          ) : ((selectNAC === 2 && (CheckExamineApprove.includes(data.UserCode) !== false || ((permission_menuID ? permission_menuID.includes(10) : null) === true))) || (selectNAC === 3 && (CheckApprove.includes(data.UserCode) !== false || ((permission_menuID ? permission_menuID.includes(10) : null) === true)))) ? (
                            <React.Fragment>
                              <Button
                                variant="contained"
                                onClick={handleClickOpenDialogReply}
                                sx={{ my: { xs: 3, md: 4 }, p: 2, width: 150 }}
                                style={{ 'backgroundColor': 'orange' }}
                                startIcon={<ReplyAllRoundedIcon />}
                                disabled={
                                  (selectNAC === 3 && (CheckApprove.includes(data.UserCode) !== false || ((permission_menuID ? permission_menuID.includes(10) : null) === true))) ? false :
                                    (selectNAC === 2 && (CheckExamineApprove.includes(data.UserCode) !== false || ((permission_menuID ? permission_menuID.includes(10) : null) === true))) ? false :
                                      true
                                }>
                                ตีกลับเอกสาร
                              </Button>
                              <Button
                                variant="contained"
                                color='error'
                                disabled={(selectNAC === 3 && (CheckApprove.includes(data.UserCode) !== false || ((permission_menuID ? permission_menuID.includes(10) : null) === true))) ? false
                                  : (selectNAC === 2 && (CheckExamineApprove.includes(data.UserCode) !== false || ((permission_menuID ? permission_menuID.includes(10) : null) === true))) ? false :
                                    true
                                }
                                onClick={CancelApprove}
                                startIcon={<ClearRoundedIcon />}
                                sx={{ my: { xs: 3, md: 4 }, p: 2, width: 150 }}>
                                ไม่อนุมัติ
                              </Button>
                              <Button
                                variant="contained"
                                sx={{ my: { xs: 3, md: 4 }, p: 2, width: 150 }}
                                color={selectNAC === 2 ? 'success' :
                                  selectNAC === 3 ? 'success' :
                                    'primary'}
                                onClick={selectNAC === 2 ? handleExamineApprove : handleExecApprove}
                                startIcon={selectNAC === 3 ? <CheckRoundedIcon /> : <VisibilityRoundedIcon />}
                                disabled={
                                  (selectNAC === 3 && (CheckApprove.includes(data.UserCode) !== false || ((permission_menuID ? permission_menuID.includes(10) : null) === true))) ? false :
                                    (selectNAC === 2 && (CheckExamineApprove.includes(data.UserCode) !== false || ((permission_menuID ? permission_menuID.includes(10) : null) === true))) ? false :
                                      true
                                }>
                                <React.Fragment>
                                  {selectNAC === 2 ? 'ตรวจสอบ' : 'อนุมัติ'}
                                </React.Fragment>
                              </Button>
                            </React.Fragment>
                          ) : ((selectNAC === 4) && (data.UserCode === headers.des_userid || ((permission_menuID ? permission_menuID.includes(10) : null) === true)) && (!headers.des_date)) ? (
                            <React.Fragment>
                              <Button
                                variant="contained"
                                style={{ 'backgroundColor': 'orange' }}
                                sx={{ my: { xs: 3, md: 4 }, p: 2, width: 150 }}
                                disabled={((selectNAC === 4) && (data.UserCode === headers.des_userid || ((permission_menuID ? permission_menuID.includes(10) : null) === true)) && (!headers.des_date)) ? false : true}
                              //</Grid>onClick={handleSubmitComplete}>
                              >ไม่รับเอกสาร
                              </Button>
                              <Button
                                variant="contained"
                                sx={{ my: { xs: 3, md: 4 }, p: 2, width: 150 }}
                                disabled={((selectNAC === 4) && (data.UserCode === headers.des_userid || ((permission_menuID ? permission_menuID.includes(10) : null) === true)) && (!headers.des_date)) ? false : true}
                                onClick={handleSubmitComplete}>
                                ตรวจรับเอกสาร
                              </Button>
                            </React.Fragment>
                          ) : (selectNAC === 5) && (((permission_menuID ? (permission_menuID.includes(10) || permission_menuID.includes(11) || permission_menuID.includes(12)) : null) === true && headers.des_date !== undefined)) ? (
                            <React.Fragment>
                              <Button
                                variant="contained"
                                color='error'
                                startIcon={<ClearRoundedIcon />}
                                sx={{ my: { xs: 3, md: 4 }, p: 2, width: 150 }}
                                onClick={handleOpen_drop_NAC_byDes}>
                                ยกเลิกรายการ
                              </Button>
                              <Button
                                variant="contained"
                                startIcon={<CloudDownloadRoundedIcon />}
                                sx={{ my: { xs: 3, md: 4 }, p: 2, width: 150 }}
                                disabled={(selectNAC === 5) && (((permission_menuID ? (permission_menuID.includes(10) || permission_menuID.includes(11) || permission_menuID.includes(12)) : null) === true && headers.des_date !== undefined)) ? false : true}
                                onClick={handleSubmitComplete}>
                                ปิดรายการ
                              </Button>
                            </React.Fragment>
                          ) : (selectNAC === 12 || selectNAC === 13) && ((headers.create_by === data.UserCode) || ((permission_menuID ? (permission_menuID.includes(10) || permission_menuID.includes(11) || permission_menuID.includes(12)) : null) === true)) ? (
                            <React.Fragment>
                              <Button
                                variant="contained"
                                sx={{ my: { xs: 3, md: 4 }, p: 2, width: 200 }}
                                disabled={(selectNAC === 12 || selectNAC === 13) && ((headers.create_by === data.UserCode) || ((permission_menuID ? (permission_menuID.includes(10) || permission_menuID.includes(11) || permission_menuID.includes(12)) : null) === true)) ? false : true}
                                onClick={handleSubmitComplete}>
                                ส่งรายงานไปยังผู้เกี่ยวข้อง
                              </Button>
                            </React.Fragment>
                          ) : null}
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
  }
}
