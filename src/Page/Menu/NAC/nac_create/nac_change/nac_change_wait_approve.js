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
  return fetch('http://192.168.220.1:32001/api/store_FA_control_select_dtl', {
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
  return fetch('http://192.168.220.1:32001/api/store_FA_control_select_headers', {
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

const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: (option) => option.Code,
});

const filterOptions2 = createFilterOptions({
  matchFrom: 'start',
  stringify: (option) => option.UserCode,
});

async function store_FA_control_update_DTLandHeaders(credentials) {
  return fetch('http://192.168.220.1:32001/api/store_FA_control_update_DTLandHeaders', {
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
  return fetch('http://192.168.220.1:32001/api/store_FA_control_update_DTL', {
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
  return fetch('http://192.168.220.1:32001/api/store_FA_control_execDocID', {
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
  return fetch('http://192.168.220.1:32001/api/store_FA_control_updateStatus', {
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
  return fetch('http://192.168.220.1:32001/api/store_FA_control_comment', {
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
  return fetch('http://192.168.220.1:32001/api/ChackUserWeb', {
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
  return fetch('http://192.168.220.1:32001/api/store_FA_control_CheckAssetCode_Process', {
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
  return fetch('http://192.168.220.1:32001/api/stroe_FA_control_DTL_ConfirmSuccess', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

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
  const [serviceList, setServiceList] = React.useState([{ dtl_id: "", assetsCode: "", serialNo: "", name: "", dtl: "", count: "", price: "", asset_id: "", code_main: "", no_main: "", name_main: "", dtl_main: "", price_main: "" }]);
  const sum_price = serviceList.reduce((total, serviceList) => total = total + serviceList.price * serviceList.count, 0);
  const data = JSON.parse(localStorage.getItem('data'));
  const dataDepID = data.depid
  const [users_pureDep, setUsers_pureDep] = React.useState([]);
  const data_nac = JSON.parse(localStorage.getItem('NacCode'));
  const nac_code = data_nac.nac_code
  const nac_status = data_nac.nac_status
  const [selectNAC, setSelectNAC] = React.useState(nac_status);
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
  const [CheckExamineApproveDes, setCheckExamineApproveDes] = React.useState([]);
  const [checked, setChecked] = React.useState([{ assets_code: "", statusCheck: "", asset_id: "" }]);
  const [ExamineApproveDes, setExamineApproveDes] = React.useState([]);
  const [path, setPath] = React.useState();
  const [description, setDescription] = React.useState();
  const [checkPath, setCheckPath] = React.useState(path);
  const [checkUserWeb, setCheckUserWeb] = React.useState();
  const navigate = useNavigate();
  const [valuesVisibility, setValuesVisibility] = React.useState({
    text: serviceList[0].price,
    showText: false,
  });

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
      "http://192.168.220.1:32001/api/getsUserForAssetsControl"
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
        asset_id: responseDTLs[i].nacdtl_id,
        code_main: responesCode[i].Code,
        no_main: responesCode[i].SerialNo,
        name_main: responesCode[i].Name,
        dtl_main: responesCode[i].Details,
        price_main: responesCode[i].Price
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
        asset_id: res.asset_id,
        code_main: res.code_main,
        no_main: res.no_main,
        name_main: res.name_main,
        dtl_main: res.dtl_main,
        price_main: res.price_main,
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
    const ExamineApproveDes = []
    const ExecApprove = []
    const CheckApprove = []
    const CheckExamineApprove = []

    for (let i = 0; i < (responseExecDocID.data.length); i++) {
      if (responseExecDocID.data[i].limitamount === null && responseExecDocID.data[i].workflowlevel < 5) {
        ExecApprove[i] = {
          approverid: responseExecDocID.data[i].approverid, status: responseExecDocID.data[i].status
        }
        CheckApprove[i] = responseExecDocID.data[i].approverid
      }

      if (responseExecDocID.data[i].limitamount !== null && responseExecDocID.data[i].workflowlevel < 3) {
        ExamineApprove[i] = {
          approverid: responseExecDocID.data[i].workflowlevel === 1 ? 'SM' :
            responseExecDocID.data[i].workflowlevel === 2 ? 'DM' :
              responseExecDocID.data[i].workflowlevel === 3 ? 'FM' : 'MD', status: responseExecDocID.data[i].status
        }
        CheckExamineApprove[i] = responseExecDocID.data[i].approverid
      }
    }
    setCheckExamineApprove(CheckExamineApprove)
    setExamineApprove(ExamineApprove)
    setExamineApproveDes(ExamineApproveDes)
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
    setServiceList([...serviceList, { dtl_id: 0, assetsCode: "", serialNo: "", name: "", dtl: "", count: "", price: "", asset_id: "" }]);
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
      swal("แจ้งเตือน", 'ทรัพย์สินนี้กำลังอยู่ในระหว่างการทำรายการ NAC', "warning");
      const list = [...serviceList];
      list.splice(index, 1);
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
        setDes_Department('ROD')
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

  // Update Document||
  const handleSave = async () => {
    if (!source || !source_department || !source_BU || !sourceDate) {
      swal("แจ้งเตือน", 'กรุณากรอกข้อมูล||ผู้ยื่นคำร้องให้ครบถ้วน', "warning");
    } else {
      if (!des_department || !des_BU || !des_delivery || !des_deliveryDate) {
        swal("แจ้งเตือน", 'กรุณากรอกข้อมูลผู้รับคำร้องให้ครบถ้วน', "warning");
      } else {
        if (!serviceList[0].assetsCode) {
          swal("แจ้งเตือน", 'กรุณากรอกข้อมูลทรัพย์สินให้ครบถ้วน', "warning");
        } else {
          const usercode = data.UserCode
          const nac_status = 1
          const sumPrice = sum_price
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
                swal("ทำรายการสำเร็จ", 'อัปเดตรายการ ' + responseDTL.data[0].nac_code + ' แล้ว', "success", {
                  buttons: false,
                  timer: 2000,
                }).then((value) => {
                  if (checkUserWeb === 'true') {
                    navigate('/NAC_OPERATOR')
                  } else {
                    navigate('/NAC_ROW')
                  }
                });
              } else {
                swal("ล้มเหลว", 'คำขออัปเดตรายการผิดพลาด', "error");
              }
            }
          } else {
            swal("ทำรายการไม่สำเร็จ", 'กรุณาลองใหม่ภายหลัง', "error");
          }
        }
      }
    }
    //navigate("/NAC_CREATE_MAIN1/NAC_CREATE_MAIN1_STEP2")
  };

  const handleSubmit = async () => {
    if (!source || !source_department || !source_BU || !sourceDate) {
      swal("แจ้งเตือน", 'กรุณากรอกข้อมูลผู้ยื่นคำร้องให้ครบถ้วน', "warning");
    } else {
      if (!des_department || !des_BU || !des_delivery) {
        swal("แจ้งเตือน", 'กรุณากรอกข้อมูลผู้รับคำร้องให้ครบถ้วน', "warning");
      } else {
        if (!serviceList[0].assetsCode) {
          swal("แจ้งเตือน", 'กรุณากรอกข้อมูลทรัพย์สินให้ครบถ้วน', "warning");
        } else {
          if (sum_price !== headers.sum_price || headers.source_userid !== source || headers.des_userid !== des_delivery) {
            swal("แจ้งเตือน", 'ข้อมูลมีการเปลี่ยนแปลง กรุณากดบันทึกรายการก่อนยื่นคำร้อง', "warning");
          } else {
            if (data.UserCode === headers.create_by) {
              const usercode = data.UserCode
              const nac_status = 3
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
                verify_date,
              });
              const comment = 'ยื่นคำร้อง ' + responseForUpdate.data[0].nac_code + ' แล้ว'
              const responseComment = await store_FA_control_comment({
                nac_code,
                usercode,
                comment
              })
              if ('data' in responseComment) {
                swal("ทำรายการสำเร็จ", 'คุณ ' + responseForUpdate.data[0].usercode + ' ได้ยื่นคำร้อง ' + responseForUpdate.data[0].nac_code + ' แล้ว', "success", {
                  buttons: false,
                  timer: 2000,
                }).then((value) => {
                  if (checkUserWeb === 'true') {
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
                  navigate('/NAC_ROW/NAC_CHANGE_WAIT_APPROVE')
                });
              }
            } else {
              swal("ทำรายการไม่สำเร็จ", 'เกิดข้อพิดพลาด', "error", {
                buttons: false,
                timer: 2000,
              }).then((value) => {
                navigate('/NAC_ROW/NAC_CHANGE_WAIT_APPROVE')
              });
            }
          }
        }
      }
    }
  };

  // ExamineApprove
  const handleExamineApprove = async () => {
    if (CheckExamineApprove.length > 1 && ExamineApprove.includes(undefined) === false) {
      const usercode = data.UserCode
      const nac_status = (ExamineApprove.includes(data.UserCode) !== false && ExamineApprove[ExamineApprove.length - 2].status === 0) ? 2 : 3
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
        if ('data' in responseComment) {
          swal("ทำรายการสำเร็จ", 'คุณ ' + responseForUpdate.data[0].usercode + ' ตรวจสอบรายการ ' + responseForUpdate.data[0].nac_code + ' แล้ว', "success", {
            buttons: false,
            timer: 2000,
          }).then((value) => {
            if (checkUserWeb === 'true') {
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
            navigate('/NAC_ROW/NAC_CHANGE_WAIT_APPROVE')
          });
        }
      } else {
        swal("ทำรายการไม่สำเร็จ", 'คุณไม่ได้รับอนุญาติให้ทำรายการนี้', "error", {
          buttons: false,
          timer: 2000,
        }).then((value) => {
          navigate('/NAC_ROW/NAC_CHANGE_WAIT_APPROVE')
        });
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
        if ('data' in responseComment) {
          swal("ทำรายการสำเร็จ", 'คุณ ' + responseForUpdate.data[0].usercode + ' ตรวจสอบรายการ ' + responseForUpdate.data[0].nac_code + ' แล้ว', "success", {
            buttons: false,
            timer: 2000,
          }).then((value) => {
            if (checkUserWeb === 'true') {
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
            navigate('/NAC_ROW/NAC_CHANGE_WAIT_APPROVE')
          });
        }
      } else {
        swal("ทำรายการไม่สำเร็จ", 'เกิดข้อพิดพลาด', "error", {
          buttons: false,
          timer: 2000,
        }).then((value) => {
          navigate('/NAC_ROW/NAC_CHANGE_WAIT_APPROVE')
        });
      }
    }
  };

  // ExecApprove
  const handleExecApprove = async () => {
    if (CheckApprove.includes(data.UserCode) !== false || checkUserWeb === 'true') {
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
      if ('data' in responseComment) {
        swal("ทำรายการสำเร็จ", 'คุณ ' + responseForUpdate.data[0].usercode + ' อนุมัติรายการ ' + responseForUpdate.data[0].nac_code + ' แล้ว', "success", {
          buttons: false,
          timer: 2000,
        }).then((value) => {
          if (checkUserWeb === 'true') {
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
          navigate('/NAC_ROW/NAC_CHANGE_WAIT_APPROVE')
        });
      }
    }
  };

  //
  const handleSubmitComplete = async () => {
    if (selectNAC === 4 || selectNAC === 5) {
      const usercode = data.UserCode
      const nac_status = selectNAC === 4 ? 5 : 6
      const source_approve = sourceApprove
      const source_approve_date = sourceDateApproveDate
      const des_delivery = data.UserCode
      const des_deliveryDate = datenow
      // const nac_status = (CheckExamineApproveDes.includes(data.UserCode) !== false) ? 6 : 5
      // const source_approve = (CheckExamineApproveDes.includes(data.UserCode) !== false) ? data.UserCode : sourceApprove
      // const source_approve_date = (CheckExamineApproveDes.includes(data.UserCode) !== false) ? datenow : sourceDateApproveDate
      // const des_delivery = (data.UserCode === headers.des_userid) ? data.UserCode : des_deliveryApprove
      // const des_deliveryDate = (data.UserCode === headers.des_userid) ? datenow : des_deliveryApproveDate
      const verify_by = bossApprove
      const verify_date = bossApproveDate
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
        const comment = 'ตรวจรับเอกสาร ' + responseForUpdate.data[0].nac_code + ' แล้ว'
        const responseComment = await store_FA_control_comment({
          nac_code,
          usercode,
          comment
        })
        if ('data' in responseComment) {
          swal("ทำรายการสำเร็จ", 'คุณ ' + responseForUpdate.data[0].usercode + ' ได้ตรวจรับเอกสาร ' + responseForUpdate.data[0].nac_code + ' แล้ว', "success", {
            buttons: false,
            timer: 2000,
          }).then((value) => {
            if (checkUserWeb === 'true') {
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
            if (checkUserWeb === 'true') {
              navigate('/NAC_OPERATOR')
            } else {
              navigate('/NAC_ROW')
            }
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
      swal("ทำรายการไม่สำเร็จ", 'สถานะการทำรายการผิด', "error", {
        buttons: false,
        timer: 2000,
      }).then((value) => {
        if (checkUserWeb === 'true') {
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
      (selectNAC === 2 && (CheckExamineApprove.includes(data.UserCode) !== false || checkUserWeb === 'true')) ? sourceApprove : data.UserCode
    const source_approve_date =
      (selectNAC === 2 && (CheckExamineApprove.includes(data.UserCode) !== false || checkUserWeb === 'true')) ? sourceDateApproveDate : datenow
    const des_approve = des_deliveryApprove
    const des_approve_date = des_deliveryApproveDate
    const verify_by = (selectNAC === 3 && (CheckApprove.includes(data.UserCode) !== false || checkUserWeb === 'true')) ? data.UserCode : bossApprove
    const verify_date = (selectNAC === 3 && (CheckApprove.includes(data.UserCode) !== false || checkUserWeb === 'true')) ? datenow : bossApproveDate
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
          if (checkUserWeb === 'true') {
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
          if (checkUserWeb === 'true') {
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
        if (checkUserWeb === 'true') {
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
      verify_date,
    });
    if ('data' in responseForUpdate) {
      const comment = commentReply
      const responseComment = await store_FA_control_comment({
        nac_code,
        usercode,
        comment
      })
      if ('data' in responseComment) {
        setOpenDialogReply(false);
        if (checkUserWeb === 'true') {
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
                  <Grid container>
                    ผู้มีสิทธิอนุมัติเอกสารฉบับนี้ : {
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
                      </Table>
                    </TableContainer>
                  </Grid>
                </Grid>
                <React.Fragment>
                  <Typography sx={{ pb: 1, pt: 1 }} color='error'>
                    * กรุณากรอกข้อมูลสำหรับเปลี่ยนแปลงรายละเอียดทรัพย์สิน
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
                                    <Typography variant='h4' color='primary'>
                                      เปลี่ยนแปลงรายละเอียดทรัพย์สิน
                                    </Typography>
                                    <Typography variant='h6' color='error'>
                                      (ไม่ผ่านการอนุมัติ)
                                    </Typography>
                                  </center>
                                </FormGroup>
                              ) : selectNAC === 6 ? (
                                <FormGroup>
                                  <center>
                                    <Typography variant='h4' color='primary'>
                                      เปลี่ยนแปลงรายละเอียดทรัพย์สินวันที่รับคำร้อง :
                                    </Typography>
                                    <Typography variant='h6' style={{ 'color': 'green' }}>
                                      (ดำเนินการเสร็จสิ้น)
                                    </Typography>
                                  </center>
                                </FormGroup>
                              ) : (
                                <FormGroup>
                                  <center>
                                    <Typography variant='h4' color='primary'>
                                      เปลี่ยนแปลงรายละเอียดทรัพย์สิน
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
                                  disabled={(selectNAC === 1 || selectNAC === 7) ? false : true}
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
                                    disabled={(selectNAC === 1 || selectNAC === 7) ? false : true}
                                    align="center"
                                    name='des_department'
                                    variant="standard"
                                    value={des_department}
                                    inputProps={{ style: { textAlign: 'center' } }}
                                    onChange={handleChangeDes_Department}
                                  />
                                  <TextField
                                    required
                                    fullWidth
                                    disabled={(selectNAC === 1 || selectNAC === 7) ? false : true}
                                    align='center'
                                    name='des_BU'
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
                                  size="small"
                                  disabled={(selectNAC === 1 || selectNAC === 7) ? false : true}
                                  options={UserForAssetsControl}
                                  getOptionLabel={(option) => option.UserCode}
                                  filterOptions={filterOptions2}
                                  value={!des_delivery ? '' : UserForAssetsControl[resultIndex[0].indexOf(des_delivery)]}
                                  onChange={handleAutoDes_DeapartMent}
                                  renderInput={(params) =>
                                    <TextField
                                      {...params}
                                      variant="standard"
                                      label='ผู้รับคำร้อง'
                                      fullWidth
                                      autoComplete="family-name"
                                      onChange={handleChangeDes_delivery2}
                                      sx={{ pt: 1 }}
                                    />
                                  } />
                                <LocalizationProvider dateAdapter={DateAdapter}>
                                  <DatePicker
                                    inputFormat="yyyy-MM-dd"
                                    name='des_deliveryDate'
                                    disabled={(selectNAC === 4 && (des_deliveryDate === data.UserCode)) ? false : true}
                                    value={!des_deliveryDate ? datenow : des_deliveryDate}
                                    onChange={handleChangeDes_deliveryDate}
                                    InputProps={{
                                      startAdornment: (
                                        <InputAdornment position="start">
                                          <Typography color="black">
                                            วันที่รับคำร้อง :
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
                                  name='des_description'
                                  value={des_description}
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
                              disabled={(selectNAC === 1 || selectNAC === 7) ? false : true}
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
                                <TextField
                                  sx={{ pt: 1 }}
                                  fullWidth
                                  disabled
                                  name='assetsCode'
                                  variant="standard"
                                  value={singleService.code_main}
                                />
                                <Autocomplete
                                  freeSolo
                                  sx={{ pt: 1 }}
                                  key={index}
                                  disabled={(selectNAC >= 3) ? true : false}
                                  name='assetsCode'
                                  id='assetsCode'
                                  options={AllAssetsControl}
                                  getOptionLabel={(option) => option.Code || ''}
                                  filterOptions={filterOptions}
                                  onChange={(e) => handleServiceChangeHeader(e, index)}
                                  //value={!singleService.assetsCode? '' : AllAssetsControl[resultIndexAssets[0].indexOf(singleService.assetsCode)]}
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
                              </StyledTableCell>
                              <StyledTableCell align="center" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa" }}>
                                <TextField
                                  sx={{ pt: 1 }}
                                  fullWidth
                                  disabled
                                  variant="standard"
                                  inputProps={{ style: { textAlign: 'center' } }}
                                  value={singleService.no_main}
                                />
                                <TextField
                                  key={index}
                                  fullWidth
                                  sx={{ pt: 1 }}
                                  disabled={(selectNAC >= 3) ? true : false}
                                  name="serialNo"
                                  id="serialNo"
                                  variant="standard"
                                  onChange={(e) => handleServiceChange(e, index)}
                                  inputProps={{ style: { textAlign: 'center', color: !singleService.serialNo ? 'red' : '' } }}
                                  value={!singleService.serialNo ? '' : singleService.serialNo}
                                />
                              </StyledTableCell>
                              <StyledTableCell align="center" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa" }}>
                                <TextField
                                  sx={{ pt: 1 }}
                                  fullWidth
                                  disabled
                                  variant="standard"
                                  value={singleService.name_main}
                                />
                                <TextField
                                  sx={{ pt: 1 }}
                                  key={index}
                                  fullWidth
                                  disabled={(selectNAC >= 3) ? true : false}
                                  name="name"
                                  id="name"

                                  variant="standard"
                                  onChange={(e) => handleServiceChange(e, index)}
                                  value={singleService.name}
                                />
                              </StyledTableCell>
                              <StyledTableCell align="center" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa" }}>
                                <TextField
                                  sx={{ pt: 1 }}
                                  fullWidth
                                  disabled
                                  variant="standard"
                                  value={singleService.dtl_main}
                                />
                                <TextField
                                  sx={{ pt: 1 }}
                                  key={index}
                                  fullWidth
                                  disabled={(selectNAC >= 3) ? true : false}
                                  name="dtl"
                                  id="dtl"

                                  variant="standard"
                                  onChange={(e) => handleServiceChange(e, index)}
                                  value={singleService.dtl}
                                />
                              </StyledTableCell>
                              <StyledTableCell align="center" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa" }}>
                                <TextField
                                  sx={{ pt: 1 }}
                                  fullWidth
                                  disabled
                                  variant="standard"
                                  value={singleService.count}
                                />
                                <TextField
                                  sx={{ pt: 1 }}
                                  key={index}
                                  fullWidth
                                  disabled={(selectNAC >= 3) ? true : false}
                                  name="count"
                                  id="count"
                                  type='number'
                                  inputProps={{ style: { textAlign: 'center' } }}
                                  InputProps={{ inputProps: { min: 1 } }}
                                  variant="standard"
                                  onChange={(e) => handleServiceChange(e, index)}
                                  value={singleService.count}
                                />
                              </StyledTableCell>
                              <StyledTableCell align="center" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa" }}>
                                <TextField
                                  sx={{ pt: 1 }}
                                  fullWidth
                                  disabled
                                  type={valuesVisibility.showText ? "text" : "password"}
                                  variant="standard"
                                  value={!singleService.price ? singleService.price : (singleService.price).toLocaleString()}
                                  inputProps={{ style: { textAlign: 'center' } }}
                                />
                                <TextField
                                  sx={{ pt: 1 }}
                                  key={index}
                                  fullWidth
                                  disabled={(selectNAC >= 3) ? true : false}
                                  name="price"
                                  id="price"
                                  onChange={(e) => handleServiceChange(e, index)}
                                  type={valuesVisibility.showText ? "text" : "password"}
                                  value={!singleService.price ? singleService.price : (singleService.price).toLocaleString()}
                                  inputProps={{ style: { textAlign: 'center' } }}
                                  variant="standard"
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
                              inputProps={{ style: { textAlign: 'center', color: 'red' } }}
                              value={sum_price.toLocaleString() === 0 ? '' : sum_price.toLocaleString()}
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
                                          ExamineApprove.map((Approve) => (
                                            <Typography style={{ 'color': 'black' }}>
                                              {Approve.status === 1 ? '[' + [Approve.approverid] + ']' : ''}
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
                {((selectNAC === 1 || selectNAC === 7) && (data.UserCode === headers.create_by || (checkUserWeb === 'true'))) ? (
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
                              style={{ 'backgroundColor': 'orange' }}
                              disabled={(data.UserCode === headers.create_by || (checkUserWeb === 'true')) ? false : true}>
                              อัปเดต
                            </Button>
                          </Grid>
                          <Grid item xs={2}>
                            <Button
                              variant="contained"
                              sx={{ my: { xs: 3, md: 4 }, p: 2, width: 150 }}
                              disabled={
                                (data.UserCode === headers.create_by || (checkUserWeb === 'true')) ? false :
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
                ) : ((selectNAC === 2 && (CheckExamineApprove.includes(data.UserCode) !== false || (checkUserWeb === 'true'))) || (selectNAC === 3 && (CheckApprove.includes(data.UserCode) !== false || (checkUserWeb === 'true')))) ? (
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
                              disabled={
                                (selectNAC === 3 && (CheckApprove.includes(data.UserCode) !== false || (checkUserWeb === 'true'))) ? false :
                                  (selectNAC === 2 && (CheckExamineApprove.includes(data.UserCode) !== false || (checkUserWeb === 'true'))) ? false :
                                    true
                              }>
                              ตีกลับเอกสาร
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
                              disabled={
                                (selectNAC === 3 && (CheckApprove.includes(data.UserCode) !== false || (checkUserWeb === 'true'))) ? false :
                                  (selectNAC === 2 && (CheckExamineApprove.includes(data.UserCode) !== false || (checkUserWeb === 'true'))) ? false :
                                    true
                              }>
                              <React.Fragment>
                                {selectNAC === 2 ? 'ตรวจสอบ' : 'อนุมัติ'}
                              </React.Fragment>
                            </Button>
                          </Grid>
                          <Grid item xs={2}>
                            <Button
                              variant="contained"
                              color='error'
                              disabled={(selectNAC === 3 && (CheckApprove.includes(data.UserCode) !== false || (checkUserWeb === 'true'))) ? false
                                : (selectNAC === 2 && (CheckExamineApprove.includes(data.UserCode) !== false || (checkUserWeb === 'true'))) ? false :
                                  true
                              }
                              onClick={CancelApprove}
                              sx={{ my: { xs: 3, md: 4 }, p: 2, width: 150 }}>
                              ไม่อนุมัติ
                            </Button>
                          </Grid>
                          <Grid item xs>
                          </Grid>
                        </Grid>
                      </Box>
                    </center>
                  </React.Fragment>
                ) : ((selectNAC === 4) && (data.UserCode === headers.des_userid || (checkUserWeb === 'true')) && (!headers.des_date)) ? (
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
                              disabled={((selectNAC === 4) && (data.UserCode === headers.des_userid || (checkUserWeb === 'true')) && (!headers.des_date)) ? false : true}
                            //</Grid>onClick={handleSubmitComplete}>
                            >ไม่รับเอกสาร
                            </Button>
                          </Grid>
                          <Grid item xs={2}>
                            <Button
                              variant="contained"
                              sx={{ my: { xs: 3, md: 4 }, p: 2, width: 150 }}
                              disabled={((selectNAC === 4) && (data.UserCode === headers.des_userid || (checkUserWeb === 'true')) && (!headers.des_date)) ? false : true}
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
                ) : ((selectNAC === 5) && (CheckExamineApproveDes.includes(data.UserCode) !== false || (checkUserWeb === 'true')) && (headers.des_date !== undefined)) ? (
                  <React.Fragment>
                    <center>
                      <Box sx={{ flexGrow: 1 }}>
                        <Button
                          variant="contained"
                          sx={{ my: { xs: 3, md: 4 }, p: 2, width: 150 }}
                          disabled={((selectNAC === 5) && (CheckExamineApproveDes.includes(data.UserCode) !== false || (checkUserWeb === 'true')) && (headers.des_date !== undefined)) ? false : true}
                          onClick={handleSubmitComplete}>
                          รับรองเอกสาร
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
                path={path}
                description={description}
                setPath={setPath}
                setDescription={setDescription}
                setCheckPath={setCheckPath}
                setOpenDialog={setOpenDialog}
              />
              <Copyright />
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
          </AnimatedPage>
          <Outlet />
        </ThemeProvider>
      </React.Fragment >
    );
  }
}
