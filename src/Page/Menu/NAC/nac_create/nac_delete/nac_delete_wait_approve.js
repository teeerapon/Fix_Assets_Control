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
  return fetch('http://similan.1:32001/api/store_FA_control_select_dtl', {
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
  return fetch('http://similan.1:32001/api/store_FA_control_select_headers', {
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
  return fetch('http://similan.1:32001/api/SelectDTL_Control', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

async function SelectAssetsControl(credentials) {
  return fetch('http://similan.1:32001/api/AssetsAll_Control', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

async function AutoDeapartMent(credentials) {
  return fetch('http://similan.1:32001/api/AutoDeapartMent', {
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
  return fetch('http://similan.1:32001/api/store_FA_control_update_DTLandHeaders', {
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
  return fetch('http://similan.1:32001/api/store_FA_control_update_DTL', {
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
  return fetch('http://similan.1:32001/api/store_FA_control_execDocID', {
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
  return fetch('http://similan.1:32001/api/store_FA_control_updateStatus', {
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
//   return fetch('http://similan.1:32001/api/store_FA_control_seals_update', {
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
  return fetch('http://similan.1:32001/api/store_FA_control_updateDTL_seals', {
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
  return fetch('http://similan.1:32001/api/store_FA_control_comment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

async function ChackUserWeb(credentials) {
  return fetch('http://similan.1:32001/api/ChackUserWeb', {
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
  return fetch('http://similan.1:32001/api/store_FA_control_CheckAssetCode_Process', {
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
  return fetch('http://similan.1:32001/api/stroe_FA_control_DTL_ConfirmSuccess', {
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
  return fetch('http://similan.1:32001/api/store_FA_control_upadate_table', {
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
  return fetch('http://similan.1:32001/api/store_FA_SendMail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

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

  const navigate = useNavigate();
  const [serviceList, setServiceList] = React.useState([{ dtl_id: "", assetsCode: "", serialNo: "", name: "", date_asset: "", price: "", bookValue: "", priceSeals: "", profit: "", asset_id: "" }]);
  const data = JSON.parse(localStorage.getItem('data'));
  const dataDepID = data.depid
  const [users_pureDep, setUsers_pureDep] = React.useState([]);
  const { nac_id } = useParams()
  const nac_code = nac_id.split('=')[0]
  const nac_status = parseInt(nac_id.split('=')[1])
  const [selectNAC] = React.useState(nac_status);
  const [headers, setHeaders] = React.useState([]);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openDialogReply, setOpenDialogReply] = React.useState(false);
  const [commentReply, setCommentReply] = React.useState();
  const [UserForAssetsControl, setUserForAssetsControl] = React.useState([]);
  const [AllAssetsControl, setAllAssetsControl] = React.useState([]);

  const [ExamineApprove, setExamineApprove] = React.useState([]);
  const [ExecApprove, setExecApprove] = React.useState([]);
  const [CheckApprove, setCheckApprove] = React.useState([]);
  const [CheckExamineApprove, setCheckExamineApprove] = React.useState([]);
  //const [CheckExamineApproveDes, setCheckExamineApproveDes] = React.useState([]);
  //const [ExamineApproveDes, setExamineApproveDes] = React.useState([]);
  const [checked, setChecked] = React.useState([{ assets_code: "", statusCheck: "", asset_id: "" }]);
  const [userBookValue] = React.useState(['SSP', 'JRK', 'TCM', 'TPD', 'TPS']);
  const [description, setDescription] = React.useState();
  const [checkUserWeb, setCheckUserWeb] = React.useState();
  const [valuesVisibility, setValuesVisibility] = React.useState({
    text: serviceList[0].price,
    showText: false,
  });

  const result = serviceList.map(function (elt) {
    return /^\d+$/.test(elt.price) ? parseInt(elt.price) : 0;
  }).reduce(function (a, b) { // sum all resulting numbers
    return a + b
  })
  const book_V = serviceList.map(function (elt) {
    return /^\d+$/.test(elt.bookValue) ? parseInt(elt.bookValue) : 0;
  }).reduce(function (a, b) { // sum all resulting numbers
    return a + b
  })
  const price_seals = serviceList.map(function (elt) {
    return /^\d+$/.test(elt.priceSeals) ? parseInt(elt.priceSeals) : 0;
  }).reduce(function (a, b) { // sum all resulting numbers
    return a + b
  })
  const profit_seals = serviceList.map(function (elt) {
    return /^\d+$/.test(elt.priceSeals - elt.bookValue) ? parseInt(elt.priceSeals - elt.bookValue) : 0;
  }).reduce(function (a, b) { // sum all resulting numbers
    return a + b
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


  const fetchUserForAssetsControl = async () => {
    const { data } = await Axios.get(
      "http://similan.1:32001/api/getsUserForAssetsControl"
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

    setBossApprove(responseHeaders.data[0].verify_by_userid)
    setBossApproveDate(responseHeaders.data[0].verify_date)

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
          approverid: responseExecDocID.data[i].workflowlevel === 1 ? 'SM' :
            responseExecDocID.data[i].workflowlevel === 2 ? 'DM' :
              responseExecDocID.data[i].workflowlevel === 3 ? 'FM' : 'MD', status: responseExecDocID.data[i].status
        }
        CheckApprove[i] = responseExecDocID.data[i].approverid
      }

      if (responseExecDocID.data[i].limitamount < price_approve && responseExecDocID.data[i].limitamount !== null && responseExecDocID.data[i].workflowlevel < 5) {
        ExamineApprove[i] = {
          approverid: responseExecDocID.data[i].workflowlevel === 1 ? 'SM' :
            responseExecDocID.data[i].workflowlevel === 2 ? 'DM' :
              responseExecDocID.data[i].workflowlevel === 3 ? 'FM' : 'MD', status: responseExecDocID.data[i].status
        }
        CheckExamineApprove[i] = responseExecDocID.data[i].approverid
      } else if (responseExecDocID.data[i].workflowlevel > 4) {
        ExamineApproveDes[i] = {
          approverid: responseExecDocID.data[i].workflowlevel === 1 ? 'SM' :
            responseExecDocID.data[i].workflowlevel === 2 ? 'DM' :
              responseExecDocID.data[i].workflowlevel === 3 ? 'FM' : 'MD', status: responseExecDocID.data[i].status
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

    // Operator Check
    const usercode = data.UserCode;
    const responseOperator = await ChackUserWeb({
      usercode
    });
    if ('data' in responseOperator) {
      setCheckUserWeb(responseOperator.data[0].approverid)
    }
  }


  React.useEffect(() => {
    fetchUserForAssetsControl();
    fetchSelectDTL_Headers();
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
      swal("แจ้งเตือน", 'ทรัพย์สินนี้กำลังอยู่ในระหว่างการทำรายการ NAC', "warning", {
        buttons: false,
        timer: 2000,
      })
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
        if (response.data[0].branchid !== 901) {
          setSource_BU('Oil')
        } else {
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

  // Update Document
  const handleSave = async () => {
    if (!source || !source_department || !source_BU || !sourceDate) {
      swal("แจ้งเตือน", 'กรุณากรอกข้อมูลผู้ยื่นคำร้องให้ครบถ้วน', "warning", {
        buttons: false,
        timer: 2000,
      })
    } else {
      if (!serviceList[0].assetsCode) {
        swal("แจ้งเตือน", 'กรุณากรอกข้อมูลทรัพย์สินให้ครบถ้วน', "warning", {
          buttons: false,
          timer: 2000,
        })
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
              swal("ทำรายการสำเร็จ", 'สร้างรายการเปลี่ยนแปลงทรัพย์สิน ' + responseDTL.data[0].nac_code + ' แล้ว', "success", {
                buttons: false,
                timer: 2000,
              }).then((value) => {
                if (checkUserWeb === 'admin') {
                  navigate('/NAC_OPERATOR')
                } else {
                  navigate('/NAC_ROW')
                }
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
      swal("แจ้งเตือน", 'กรุณากรอกข้อมูลผู้ยื่นคำร้องให้ครบถ้วน', "warning", {
        buttons: false,
        timer: 2000,
      })
    } else {
      if (!serviceList[0].assetsCode) {
        swal("แจ้งเตือน", 'กรุณากรอกข้อมูลทรัพย์สินให้ครบถ้วน', "warning", {
          buttons: false,
          timer: 2000,
        })
      } else {
        if (result !== headers.sum_price || headers.source_userid !== source || headers.des_userid !== des_delivery) {
          swal("แจ้งเตือน", 'ข้อมูลมีการเปลี่ยนแปลง กรุณากดบันทึกรายการก่อนยื่นคำร้อง', "warning", {
            buttons: false,
            timer: 2000,
          })
        } else {
          if (data.UserCode === headers.create_by || CheckExamineApprove.includes(data.UserCode) === true || CheckApprove.includes(data.UserCode) === true || checkUserWeb === 'admin') {
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
                const comment = 'กรอก Book Value ในรายการ ' + responseForUpdate.data[0].nac_code + ' แล้ว'
                const responseComment = await store_FA_control_comment({
                  nac_code,
                  usercode,
                  comment
                })
                await store_FA_SendMail({
                  nac_code
                })
                if ('data' in responseComment) {
                  swal("ทำรายการสำเร็จ", 'คุณ ' + responseForUpdate.data[0].usercode + ' กรอก Book Value ในรายการ ' + responseForUpdate.data[0].nac_code + ' แล้ว', "success", {
                    buttons: false,
                    timer: 2000,
                  }).then((value) => {
                    if (checkUserWeb === 'admin') {
                      navigate('/NAC_OPERATOR')
                    } else {
                      navigate('/NAC_ROW')
                    }
                  });
                } else {
                  swal("ทำรายการไม่สำเร็จ", 'เกิดข้อพิดพลาด', "error", {
                    buttons: false,
                    timer: 2000,
                  }).then((value) => {
                    navigate('/NAC_ROW/NAC_SEALS_APPROVE/' + nac_code + '=' + (selectNAC === 11) ? 10 : 11)
                  });
                }
              } else {
                swal("แจ้งเตือน", 'กรุณากรอก Book Value ของทรัพย์สินให้ครบถ้วน', "warning")
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
                  const comment = 'ยื่นคำร้อง ' + responseForUpdate.data[0].nac_code + ' แล้ว'
                  const responseComment = await store_FA_control_comment({
                    nac_code,
                    usercode,
                    comment
                  })
                  await store_FA_SendMail({
                    nac_code
                  })
                  if ('data' in responseComment) {
                    swal("ทำรายการสำเร็จ", 'คุณ ' + responseForUpdate.data[0].usercode + ' ยื่นคำร้อง ' + responseForUpdate.data[0].nac_code + ' แล้ว', "success", {
                      buttons: false,
                      timer: 2000,
                    }).then((value) => {
                      if (checkUserWeb === 'admin') {
                        navigate('/NAC_OPERATOR')
                      } else {
                        navigate('/NAC_ROW')
                      }
                    });
                  } else {
                    swal("ทำรายการไม่สำเร็จ", 'เกิดข้อพิดพลาด', "error", {
                      buttons: false,
                      timer: 2000,
                    }).then((value) => {
                      navigate('/NAC_ROW/NAC_SEALS_APPROVE/' + nac_code + '=' + (selectNAC === 11) ? 10 : 11)
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
              navigate('/NAC_ROW/NAC_SEALS_APPROVE/' + nac_code + '=' + (selectNAC === 11) ? 10 : 11)
            });
          }
        }
      }
    }
  };

  // ExamineApprove
  const handleExamineApprove = async () => {
    if ((CheckExamineApprove.length > 1 && ExamineApprove[ExamineApprove.length - 2] !== undefined)) {
      if (headers.source_approve_userid === data.UserCode) {
        swal("แจ้งเตือน", 'คุณได้ตรวจสอบรายการนี้ไปแล้ว', "warning")
      } else {
        const usercode = data.UserCode
        const nac_status = (CheckExamineApprove.includes(data.UserCode) !== false && ExamineApprove[ExamineApprove.length - 2].status === 0) ? 2 : checkUserWeb === 'admin' ? 3 : 3
        const source_approve = data.UserCode
        const source_approve_date = datenow
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
          verify_date,
        });
        if ('data' in responseForUpdate) {
          const comment = 'ตรวจสอบรายการ ' + responseForUpdate.data[0].nac_code + ' แล้ว'
          const responseComment = await store_FA_control_comment({
            nac_code,
            usercode,
            comment
          })
          await store_FA_SendMail({
            nac_code
          })
          if ('data' in responseComment) {
            swal("ทำรายการสำเร็จ", 'คุณ ' + responseForUpdate.data[0].usercode + ' ตรวจสอบรายการ ' + responseForUpdate.data[0].nac_code + ' แล้ว', "success", {
              buttons: false,
              timer: 2000,
            }).then((value) => {
              if (checkUserWeb === 'admin') {
                navigate('/NAC_OPERATOR')
              } else {
                navigate('/NAC_ROW')
              }
            });
          } else {
            swal("ทำรายการไม่สำเร็จ", 'เกิดข้อพิดพลาด', "error", {
              buttons: false,
              timer: 2000,
            }).then((value) => {
              if (checkUserWeb === 'admin') {
                navigate('/NAC_OPERATOR')
              } else {
                navigate('/NAC_ROW')
              }
            });
          }
        } else {
          swal("ทำรายการไม่สำเร็จ", 'คุณไม่ได้รับอนุญาติให้ทำรายการนี้', "error", {
            buttons: false,
            timer: 2000,
          }).then((value) => {
            if (checkUserWeb === 'admin') {
              navigate('/NAC_OPERATOR')
            } else {
              navigate('/NAC_ROW')
            }
          });
        }
      }
    } else {
      const usercode = data.UserCode
      const nac_status = 3
      const source_approve = data.UserCode
      const source_approve_date = datenow
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
        verify_date,
      });
      if ('data' in responseForUpdate) {
        const comment = 'ตรวจสอบรายการ ' + responseForUpdate.data[0].nac_code + ' แล้ว'
        const responseComment = await store_FA_control_comment({
          nac_code,
          usercode,
          comment
        })
        await store_FA_SendMail({
          nac_code
        })
        if ('data' in responseComment) {
          swal("ทำรายการสำเร็จ", 'คุณ ' + responseForUpdate.data[0].usercode + ' ตรวจสอบรายการ ' + responseForUpdate.data[0].nac_code + ' แล้ว', "success", {
            buttons: false,
            timer: 2000,
          }).then((value) => {
            if (checkUserWeb === 'admin') {
              navigate('/NAC_OPERATOR')
            } else {
              navigate('/NAC_ROW')
            }
          });
        } else {
          swal("ทำรายการไม่สำเร็จ", 'เกิดข้อพิดพลาด', "error", {
            buttons: false,
            timer: 2000,
          }).then((value) => {
            if (checkUserWeb === 'admin') {
              navigate('/NAC_OPERATOR')
            } else {
              navigate('/NAC_ROW')
            }
          });
        }
      } else {
        swal("ทำรายการไม่สำเร็จ", 'เกิดข้อพิดพลาด', "error", {
          buttons: false,
          timer: 2000,
        }).then((value) => {
          if (checkUserWeb === 'admin') {
            navigate('/NAC_OPERATOR')
          } else {
            navigate('/NAC_ROW')
          }
        });
      }
    }
  };

  // ExecApprove
  const handleExecApprove = async () => {
    if (CheckApprove.includes(data.UserCode) !== false || checkUserWeb === 'admin') {
      const usercode = data.UserCode
      const nac_status = 5
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
      const comment = 'อนุมัติรายการ ' + responseForUpdate.data[0].nac_code + ' แล้ว'
      const responseComment = await store_FA_control_comment({
        nac_code,
        usercode,
        comment
      })
      await store_FA_SendMail({
        nac_code
      })
      if ('data' in responseComment) {
        swal("ทำรายการสำเร็จ", 'คุณ ' + responseForUpdate.data[0].usercode + ' อนุมัติรายการ ' + responseForUpdate.data[0].nac_code + ' แล้ว', "success", {
          buttons: false,
          timer: 2000,
        }).then((value) => {
          if (checkUserWeb === 'admin') {
            navigate('/NAC_OPERATOR')
          } else {
            navigate('/NAC_ROW')
          }
        });
      } else {
        swal("ทำรายการไม่สำเร็จ", 'เกิดข้อพิดพลาด', "error", {
          buttons: false,
          timer: 2000,
        }).then((value) => {
          if (checkUserWeb === 'admin') {
            navigate('/NAC_OPERATOR')
          } else {
            navigate('/NAC_ROW')
          }
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
      const des_delivery = selectNAC === 4 ? data.UserCode : headers.des_userid
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
        const comment = selectNAC === 4 ? 'ตรวจรับเอกสาร ' + responseForUpdate.data[0].nac_code + ' แล้ว' : 'ปิดรายการ ' + responseForUpdate.data[0].nac_code + ' แล้ว'
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
          swal("ทำรายการสำเร็จ", 'คุณ ' + responseForUpdate.data[0].usercode + ' ได้ตรวจรับเอกสาร ' + responseForUpdate.data[0].nac_code + ' แล้ว', "success", {
            buttons: false,
            timer: 2000,
          }).then((value) => {
            if (checkUserWeb === 'admin') {
              navigate('/NAC_OPERATOR')
            } else {
              navigate('/NAC_ROW')
            }
          });
        } else {
          swal("ทำรายการไม่สำเร็จ", 'เกิดข้อพิดพลาด', "error", {
            buttons: false,
            timer: 2000,
          }).then((value) => {
            if (checkUserWeb === 'admin') {
              navigate('/NAC_OPERATOR')
            } else {
              navigate('/NAC_ROW')
            }
          });
        }
      }
    } else {
      swal("ทำรายการไม่สำเร็จ", 'สถานะการทำรายการผิด', "error", {
        buttons: false,
        timer: 2000,
      }).then((value) => {
        if (checkUserWeb === 'admin') {
          navigate('/NAC_OPERATOR')
        } else {
          navigate('/NAC_ROW')
        }
      });
    }
  };

  // CancelApprove
  const CancelApprove = async () => {
    const usercode = data.UserCode
    const nac_status = 0
    const source_approve =
      (selectNAC === 2 && (CheckExamineApprove.includes(data.UserCode) !== false || checkUserWeb === 'admin')) ? sourceApprove : data.UserCode
    const source_approve_date =
      (selectNAC === 2 && (CheckExamineApprove.includes(data.UserCode) !== false || checkUserWeb === 'admin')) ? sourceDateApproveDate : datenow
    const des_approve = des_deliveryApprove
    const des_approve_date = des_deliveryApproveDate
    const verify_by = (selectNAC === 3 && (CheckApprove.includes(data.UserCode) !== false || checkUserWeb === 'admin')) ? data.UserCode : bossApprove
    const verify_date = (selectNAC === 3 && (CheckApprove.includes(data.UserCode) !== false || checkUserWeb === 'admin')) ? datenow : bossApproveDate
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
      const comment = 'ยกเลิกรายการ ' + responseForUpdate.data[0].nac_code + ' แล้ว'
      const responseComment = await store_FA_control_comment({
        nac_code,
        usercode,
        comment
      })
      if ('data' in responseComment) {
        swal("ทำรายการสำเร็จ", 'คุณ ' + responseForUpdate.data[0].usercode + ' ได้ยกเลิกรายการ ' + responseForUpdate.data[0].nac_code + ' แล้ว', "success", {
          buttons: false,
          timer: 2000,
        }).then((value) => {
          if (checkUserWeb === 'admin') {
            navigate('/NAC_OPERATOR')
          } else {
            navigate('/NAC_ROW')
          }
        });
      } else {
        swal("ทำรายการไม่สำเร็จ", 'เกิดข้อพิดพลาด', "error", {
          buttons: false,
          timer: 2000,
        }).then((value) => {
          if (checkUserWeb === 'admin') {
            navigate('/NAC_OPERATOR')
          } else {
            navigate('/NAC_ROW')
          }
        });
      }
    } else {
      swal("ทำรายการไม่สำเร็จ", 'เกิดข้อพิดพลาด', "error", {
        buttons: false,
        timer: 2000,
      }).then((value) => {
        if (checkUserWeb === 'admin') {
          navigate('/NAC_OPERATOR')
        } else {
          navigate('/NAC_ROW')
        }
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
        setOpenDialogReply(false);
        if (checkUserWeb === 'admin') {
          window.location.href = '/NAC_OPERATOR'
        } else {
          window.location.href = "/NAC_ROW";
        }
      }
    }
  }


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
            <Typography variant="h4" color="inherit" noWrap>
              Loading...
            </Typography>
          </Stack>
        </Box>
      </React.Fragment>
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
              <Paper variant="outlined" sx={{ p: { xs: 1, md: 2 }, mt: 4 }}>
                <Table aria-label="customized table">
                  {/* <Grid container>
                    ผู้มีสิทธิอนุมัติเอกสารฉบับนี้ขารับ : {
                      ExamineApproveDes.map((Approve) => (
                        <Typography style={{ 'color': Approve.status === 1 ? 'blue' : 'black' }}>
                          &nbsp;[{Approve.approverid}]
                        </Typography>
                      ))}
                  </Grid>
                  <hr /> */}
                  <Grid container>
                    ผู้มีสิทธิอนุมัติเอกสารฉบับนี้ขาส่ง : {
                      ExecApprove.map((Approve) => (
                        <Typography style={{ 'color': Approve.status === 1 ? 'blue' : 'black' }}>
                          &nbsp;[{Approve.approverid}]
                        </Typography>
                      ))}
                  </Grid>
                  <hr />
                  <Grid container>
                    ผู้มีสิทธิตรวจสอบเอกสารฉบับนี้ : {
                      ExamineApprove.map((Approve) => (
                        <Typography style={{ 'color': Approve.status === 1 ? 'blue' : 'red' }}>
                          &nbsp;[{Approve.approverid}]
                        </Typography>
                      ))}
                  </Grid>
                </Table>
              </Paper>
              <Paper variant="outlined" sx={{ my: { xs: 3, md: 4 }, p: { xs: 2, md: 3 } }}>
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
                          <StyledTableCell align="center" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa" }}>
                            <Typography align='center' color="inherit" noWrap>
                              {nac_code}
                            </Typography>
                          </StyledTableCell>
                        </TableBody>
                        <TableBody>
                          <StyledTableCell align="center" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa" }}>
                            <Typography align='center' color="inherit" noWrap>
                              {!headers.create_date ? '' : (headers.create_date).split('T')[0]}
                            </Typography>
                          </StyledTableCell>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Grid>
                <React.Fragment>
                  <Typography sx={{ pb: 1, pt: 1 }} color='error'>
                    * กรุณากรอกข้อมูลสำหรับตัดบัญชีทรัพย์สินถาวร
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
                              {selectNAC === 0 ? (
                                <FormGroup>
                                  <center>
                                    <Typography variant='h4' color='black'>
                                      ตัดบัญชีทรัพย์สินถาวร
                                    </Typography>
                                    <Typography variant='h6' color='error'>
                                      (ไม่ผ่านการอนุมัติ)
                                    </Typography>
                                  </center>
                                </FormGroup>
                              ) : selectNAC === 6 ? (
                                <FormGroup>
                                  <center>
                                    <Typography variant='h4' color='black'>
                                      ตัดบัญชีทรัพย์สินถาวร
                                    </Typography>
                                    <Typography variant='h6' style={{ 'color': 'green' }}>
                                      (ดำเนินการเสร็จสิ้น)
                                    </Typography>
                                  </center>
                                </FormGroup>
                              ) : (
                                <FormGroup>
                                  <center>
                                    <Typography variant='h4' color='black'>
                                      ตัดบัญชีทรัพย์สินถาวร
                                    </Typography>
                                  </center>
                                </FormGroup>
                              )}
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
                                    disabled={(selectNAC === 1 || selectNAC === 7) ? false : true}
                                    name='source_department'
                                    onChange={handleChangeSource_Department}
                                    value={source_department}
                                    inputProps={{ style: { textAlign: 'center' } }}
                                    variant="standard"
                                  />
                                  <TextField
                                    required
                                    fullWidth
                                    disabled={(selectNAC === 1 || selectNAC === 7) ? false : true}
                                    onChange={handleChangeSource_BU}
                                    name='source_BU'
                                    value={source_BU}
                                    inputProps={{ style: { textAlign: 'center' } }}
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
                                      label='ผู้ยื่นคำร้อง'
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
                              <StyledTableCell align="center" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa" }}>
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
                                      value={!singleService.assetsCode ? '' : AllAssetsControl[resultIndexAssets[0].indexOf(singleService.assetsCode)]}
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          variant="standard"
                                          name='assetsCode'
                                          id='assetsCode'
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
                                      inputProps={{ style: { fontSize: 14 } }}
                                      onChange={(e) => handleServiceChange(e, index)}
                                      value={!singleService.assetsCode ? '' : singleService.assetsCode}
                                    />
                                  </React.Fragment>
                                )}
                              </StyledTableCell>
                              <StyledTableCell align="center" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa" }}>
                                <TextField
                                  key={index}
                                  fullWidth
                                  disabled={(selectNAC === 1 || selectNAC === 7) ? false : true}
                                  name="serialNo"
                                  id="serialNo"
                                  variant="standard"
                                  inputProps={{ style: { fontSize: 14 } }}
                                  onChange={(e) => handleServiceChange(e, index)}
                                  value={!singleService.serialNo ? '' : singleService.serialNo}
                                />
                              </StyledTableCell>
                              <StyledTableCell align="center" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa" }}>
                                <TextField
                                  key={index}
                                  fullWidth
                                  disabled={(selectNAC === 1 || selectNAC === 7) ? false : true}
                                  name="name"
                                  id="name"
                                  variant="standard"
                                  inputProps={{ style: { fontSize: 14 } }}
                                  onChange={(e) => handleServiceChange(e, index)}
                                  value={singleService.name}
                                />
                              </StyledTableCell>
                              <StyledTableCell align="center" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa" }}>
                                <TextField
                                  fullWidth
                                  key={index}
                                  disabled
                                  name="date_asset"
                                  id="date_asset"
                                  inputProps={{ style: { textAlign: 'center', fontSize: 14 } }}
                                  value={!serviceList[index].date_asset ? '' : serviceList[index].date_asset.split('T')[0]}
                                  variant="standard"
                                />
                              </StyledTableCell>
                              <StyledTableCell align="center" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa" }}>
                                <TextField
                                  key={index}
                                  fullWidth
                                  disabled={(selectNAC === 1 || selectNAC === 7) ? false : true}
                                  name="price"
                                  id="price"
                                  onChange={(e) => handleServiceChange(e, index)}
                                  type={valuesVisibility.showText ? "text" : "password"}
                                  value={!serviceList[index].price ? '' : (serviceList[index].price).toLocaleString()}
                                  inputProps={{ style: { textAlign: 'center', fontSize: 14 } }}
                                  variant="standard"
                                />
                              </StyledTableCell>
                              <StyledTableCell align="center" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa" }}>
                                <TextField
                                  key={index}
                                  fullWidth
                                  disabled={(selectNAC === 11 && (checkUserWeb === 'admin' || checkUserWeb === 'User_BV' || checkUserWeb === 'operatorI')) ? false : true}
                                  name="bookValue"
                                  id="bookValue"
                                  variant="standard"
                                  type={valuesVisibility.showText ? "text" : "password"}
                                  inputProps={{ style: { textAlign: 'center', fontSize: 14 } }}
                                  onChange={(e) => handleServiceChange(e, index)}
                                  value={!serviceList[index].bookValue ? '' : serviceList[index].bookValue.toLocaleString()}
                                />
                              </StyledTableCell>
                              <StyledTableCell align="center" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa" }}>
                                <TextField
                                  key={index}
                                  fullWidth
                                  disabled
                                  name="priceSeals"
                                  id="priceSeals"
                                  inputProps={{ style: { textAlign: 'center', fontSize: 14 } }}
                                  variant="standard"
                                  onChange={(e) => handleServiceChange(e, index)}
                                  value={!serviceList[index].priceSeals ? '' : serviceList[index].priceSeals.toLocaleString()}
                                />
                              </StyledTableCell>
                              <StyledTableCell align="center" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa" }}>
                                <TextField
                                  key={index}
                                  fullWidth
                                  disabled
                                  name="profit"
                                  id="profit"
                                  variant="standard"
                                  type={valuesVisibility.showText ? "text" : "password"}
                                  inputProps={{ style: { textAlign: 'center', fontSize: 14 } }}
                                  onChange={(e) => handleServiceChange(e, index)}
                                  value={!serviceList[index].profit ? '' : serviceList[index].priceSeals.toLocaleString()}
                                />
                              </StyledTableCell>
                              <StyledTableCell align="center" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa" }}>
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
                        <StyledTableCell align="start" style={{ "borderWidth": "1px", 'border-right': 0 }}>
                          <Typography>
                            รวมทั้งหมด
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell align="start" style={{ border: `none` }}>
                        </StyledTableCell>
                        <StyledTableCell align="start" style={{ border: `none` }}>
                        </StyledTableCell>
                        <StyledTableCell align="start" style={{ border: `none` }}>
                        </StyledTableCell>
                        <StyledTableCell align="center" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa" }}>
                          <TextField
                            required
                            fullWidth
                            type={valuesVisibility.showText ? "text" : "password"}
                            value={result === 0 ? '' : result.toLocaleString()}
                            inputProps={{ style: { textAlign: 'center' } }}
                            variant="standard"
                          />
                        </StyledTableCell>
                        <StyledTableCell align="start" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa" }}>
                          <TextField
                            required
                            fullWidth
                            type={valuesVisibility.showText ? "text" : "password"}
                            value={book_V === 0 ? '' : book_V.toLocaleString()}
                            inputProps={{ style: { textAlign: 'center' } }}
                            variant="standard"
                          />
                        </StyledTableCell>
                        <StyledTableCell align="start" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa" }}>
                          <TextField
                            required
                            fullWidth
                            type={valuesVisibility.showText ? "text" : "password"}
                            value={price_seals === 0 ? '' : price_seals.toLocaleString()}
                            inputProps={{ style: { textAlign: 'center' } }}
                            variant="standard"
                          />
                        </StyledTableCell>
                        <StyledTableCell align="start" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa" }}>
                          <TextField
                            required
                            fullWidth
                            type={valuesVisibility.showText ? "text" : "password"}
                            value={profit_seals === 0 ? '' : profit_seals.toLocaleString()}
                            inputProps={{ style: { textAlign: 'center' } }}
                            variant="standard"
                          />
                        </StyledTableCell>
                        <StyledTableCell align="start" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa" }}>
                        </StyledTableCell>
                      </StyledTableRow>
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
                          <StyledTableCell align="left" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa", width: '25%' }}>
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
                                        {
                                          ExamineApprove.map((Approve, index) => (
                                            <Typography style={{ 'color': 'black' }}>
                                              {Approve.status === 1 ? '[' + [CheckExamineApprove[index]] + ']' : ''}
                                            </Typography>
                                          ))}
                                      </InputAdornment>
                                      <InputAdornment position="start">
                                        <Typography color="black">
                                          {!sourceDateApproveDate ? '' : (sourceDateApproveDate).split('T')[0]}
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
                  </TableContainer>
                </React.Fragment>
                {((selectNAC === 1 || selectNAC === 7) && data.UserCode === headers.create_by) || (selectNAC === 11 && (checkUserWeb === 'admin')) || (selectNAC === 11 && userBookValue.includes(data.UserCode)) ? (
                  <React.Fragment>
                    <center>
                      <Box sx={{ flexGrow: 1 }}>
                        <Grid container>
                          <Grid item xs>
                          </Grid>
                          <Grid item xs={2}>
                            <Button
                              variant="contained"
                              onClick={handleSave}
                              sx={{ my: { xs: 3, md: 4 }, p: 2, width: 150 }}
                              startIcon={<SystemUpdateAltRoundedIcon />}
                              style={{ 'backgroundColor': 'orange' }}>
                              อัปเดต
                            </Button>
                          </Grid>
                          <Grid item xs={2}>
                            <Button
                              variant="contained"
                              sx={{ my: { xs: 3, md: 4 }, p: 2, width: 150 }}
                              endIcon={<DoubleArrowRoundedIcon />}
                              disabled={
                                ((selectNAC === 1 || selectNAC === 7) && data.UserCode === headers.create_by) ||
                                  (selectNAC === 11 && (checkUserWeb === 'admin')) ||
                                  (selectNAC === 11 && userBookValue.includes(data.UserCode)) ? false :
                                  ExamineApprove.length === 0 ? false : true}
                              onClick={handleSubmit
                              }>
                              <React.Fragment>
                                ยื่นคำร้อง
                              </React.Fragment>
                            </Button>
                          </Grid>
                          <Grid item xs>
                          </Grid>
                        </Grid>
                      </Box>
                    </center>
                  </React.Fragment>
                ) : ((selectNAC === 2 && (CheckExamineApprove.includes(data.UserCode) !== false || (checkUserWeb === 'admin'))) || (selectNAC === 3 && (CheckApprove.includes(data.UserCode) !== false || (checkUserWeb === 'admin')))) ? (
                  <React.Fragment>
                    <center>
                      <Box sx={{ flexGrow: 1 }}>
                        <Grid container>
                          <Grid item xs>
                          </Grid>
                          <Grid item xs={2}>
                            <Button
                              variant="contained"
                              onClick={handleClickOpenDialogReply}
                              sx={{ my: { xs: 3, md: 4 }, p: 2, width: 150 }}
                              style={{ 'backgroundColor': 'orange' }}
                              startIcon={<ReplyAllRoundedIcon />}
                              disabled={
                                (selectNAC === 3 && (CheckApprove.includes(data.UserCode) !== false || (checkUserWeb === 'admin'))) ? false :
                                  (selectNAC === 2 && (CheckExamineApprove.includes(data.UserCode) !== false || (checkUserWeb === 'admin'))) ? false :
                                    true
                              }>
                              ตีกลับเอกสาร
                            </Button>
                          </Grid>
                          <Grid item xs={2}>
                            <Button
                              variant="contained"
                              color='error'
                              disabled={(selectNAC === 3 && (CheckApprove.includes(data.UserCode) !== false || (checkUserWeb === 'admin'))) ? false
                                : (selectNAC === 2 && (CheckExamineApprove.includes(data.UserCode) !== false || (checkUserWeb === 'admin'))) ? false :
                                  true
                              }
                              onClick={CancelApprove}
                              startIcon={<ClearRoundedIcon />}
                              sx={{ my: { xs: 3, md: 4 }, p: 2, width: 150 }}>
                              ไม่อนุมัติ
                            </Button>
                          </Grid>
                          <Grid item xs={2}>
                            <Button
                              variant="contained"
                              sx={{ my: { xs: 3, md: 4 }, p: 2, width: 150 }}
                              color={selectNAC === 2 ? 'success' :
                                selectNAC === 3 ? 'success' :
                                  'primary'}
                              onClick={selectNAC === 2 ? handleExamineApprove : handleExecApprove}
                              startIcon={selectNAC === 3 ? <CheckRoundedIcon /> : <VisibilityRoundedIcon />}
                              disabled={
                                (selectNAC === 3 && (CheckApprove.includes(data.UserCode) !== false || (checkUserWeb === 'admin'))) ? false :
                                  (selectNAC === 2 && (CheckExamineApprove.includes(data.UserCode) !== false || (checkUserWeb === 'admin'))) ? false :
                                    true
                              }>
                              <React.Fragment>
                                {selectNAC === 2 ? 'ตรวจสอบ' : 'อนุมัติ'}
                              </React.Fragment>
                            </Button>
                          </Grid>
                          <Grid item xs>
                          </Grid>
                        </Grid>
                      </Box>
                    </center>
                  </React.Fragment>
                ) : ((selectNAC === 4) && (data.UserCode === headers.des_userid || (checkUserWeb === 'admin')) && (!headers.des_date)) ? (
                  <React.Fragment>
                    <center>
                      <Box sx={{ flexGrow: 1 }}>
                        <Grid container>
                          <Grid item xs>
                          </Grid>
                          <Grid item xs={2}>
                            <Button
                              variant="contained"
                              style={{ 'backgroundColor': 'orange' }}
                              sx={{ my: { xs: 3, md: 4 }, p: 2, width: 150 }}
                              disabled={((selectNAC === 4) && (data.UserCode === headers.des_userid || (checkUserWeb === 'admin')) && (!headers.des_date)) ? false : true}
                            //</Grid>onClick={handleSubmitComplete}>
                            >ไม่รับเอกสาร
                            </Button>
                          </Grid>
                          <Grid item xs={2}>
                            <Button
                              variant="contained"
                              sx={{ my: { xs: 3, md: 4 }, p: 2, width: 150 }}
                              disabled={((selectNAC === 4) && (data.UserCode === headers.des_userid || (checkUserWeb === 'admin')) && (!headers.des_date)) ? false : true}
                              onClick={handleSubmitComplete}>
                              ตรวจรับเอกสาร
                            </Button>
                          </Grid>
                          <Grid item xs>
                          </Grid>
                        </Grid>
                      </Box>
                    </center>
                  </React.Fragment>
                ) : (selectNAC === 5) && ((checkUserWeb === 'admin' && headers.des_date !== undefined) || (checkUserWeb === 'operatorI' && headers.des_date !== undefined)) ? (
                  <React.Fragment>
                    <center>
                      <Box sx={{ flexGrow: 1 }}>
                        <Button
                          variant="contained"
                          startIcon={<CloudDownloadRoundedIcon />}
                          sx={{ my: { xs: 3, md: 4 }, p: 2, width: 150 }}
                          disabled={(selectNAC === 5) && ((checkUserWeb === 'admin' && headers.des_date !== undefined) || (checkUserWeb === 'operatorI' && headers.des_date !== undefined)) ? false : true}
                          onClick={handleSubmitComplete}>
                          ปิดรายการ
                        </Button>
                      </Box>
                    </center>
                  </React.Fragment>
                ) : (selectNAC === 12 || selectNAC === 13) && ((headers.create_by === data.UserCode) || (checkUserWeb === 'admin') || (checkUserWeb === 'operatorI')) ? (
                  <React.Fragment>
                    <center>
                      <Box sx={{ flexGrow: 1 }}>
                        <Button
                          variant="contained"
                          sx={{ my: { xs: 3, md: 4 }, p: 2, width: 200 }}
                          disabled={(selectNAC === 12 || selectNAC === 13) && ((headers.create_by === data.UserCode) || (checkUserWeb === 'admin') || (checkUserWeb === 'operatorI')) ? false : true}
                          onClick={handleSubmitComplete}>
                          ส่งรายงานไปยังผู้เกี่ยวข้อง
                        </Button>
                      </Box>
                    </center>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <center>
                      <Box sx={{ flexGrow: 1 }}>
                      </Box>
                    </center>
                  </React.Fragment>
                )}
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
              <Copyright />
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
          </AnimatedPage>
          <Outlet />
        </ThemeProvider>
      </React.Fragment >
    );
  }
}
