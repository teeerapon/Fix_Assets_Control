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
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import AddCardIcon from '@mui/icons-material/AddCard';
import ChatIcon from '@mui/icons-material/Chat';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
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

async function store_FA_control_select_NAC(credentials) {
  return fetch('http://192.168.220.1:32001/api/store_FA_control_select_NAC', {
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
  const sum_price = (serviceList.reduce((total, serviceList) => total = total + (serviceList.price * serviceList.count), 0)).toFixed(3);
  const data = JSON.parse(localStorage.getItem('data'));
  const data_nac = JSON.parse(localStorage.getItem('NacCode'));
  const nac_code = data_nac.nac_code
  const nac_status = data_nac.nac_status
  const [selectNAC, setSelectNAC] = React.useState(nac_status);
  const [dtl, setDtl] = React.useState([]);
  const [headers, setHeaders] = React.useState([]);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [UserForAssetsControl, setUserForAssetsControl] = React.useState([]);
  const [AllAssetsControl, setAllAssetsControl] = React.useState([]);

  const [ExamineApprove, setExamineApprove] = React.useState([]);
  const [ExecApprove, setExecApprove] = React.useState([]);
  const [CheckApprove, setCheckApprove] = React.useState([]);
  const [CheckExamineApprove, setCheckExamineApprove] = React.useState([]);

  const navigate = useNavigate();
  const [valuesVisibility, setValuesVisibility] = React.useState({
    text: dtl.nacdtl_assetsPrice,
    showText: false,
  });

  // สำหรับหาค่า Index ของ UserCode of Auto Complete
  let resultIndex = Array();
  for (let i = 0; i < UserForAssetsControl.length; i++) {
    resultIndex[i] = UserForAssetsControl[i].UserCode;
  }
  resultIndex = [resultIndex]

  // สำหรับหาค่า Index ของ AssetsCode of Auto Complete
  let resultIndexAssets = Array();
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
    setDtl(responseDTL.data)
    const responseDTLs = responseDTL.data
    const DataCodeDTL = Array()
    const responesCode = Array()
    for (let i = 0; i < responseDTLs.length; i++) {
      const Code = responseDTLs[i].nacdtl_assetsCode
      DataCodeDTL[i] = await SelectDTL_Control({
        Code
      })
      if ('data' in DataCodeDTL[i]) {
        responesCode[i] = DataCodeDTL[i].data[0]
      }
    }
    let listPoST = Array()
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
    let ExamineApprove = Array();
    let ExecApprove = Array();
    let CheckApprove = Array();
    let CheckExamineApprove = Array();
    let price_approve = responseHeaders.data[0].sum_price;

    for (let i = 0; i < (responseExecDocID.data.length); i++) {
      if (responseExecDocID.data[i].limitamount === null && responseExecDocID.data[i].workflowlevel < responseExecDocID.data[responseExecDocID.data.length -1].workflowlevel) {
        ExamineApprove[i] = { approverid: responseExecDocID.data[i].approverid, status: responseExecDocID.data[i].status }
        CheckExamineApprove[i] = responseExecDocID.data[i].approverid
      }
    }
    setCheckExamineApprove(CheckExamineApprove)
    setExamineApprove(ExamineApprove)

    for (let i = 0; i < (responseExecDocID.data.length); i++) {
      if (responseExecDocID.data[i].limitamount === null && responseExecDocID.data[i].workflowlevel === responseExecDocID.data[responseExecDocID.data.length -1].workflowlevel) {
        ExecApprove[i] = { approverid: responseExecDocID.data[i].approverid, status: responseExecDocID.data[i].status }
        CheckApprove[i] = responseExecDocID.data[i].approverid
      }
    }
    setExecApprove(ExecApprove)
    setCheckApprove(CheckApprove)
  }


  React.useEffect(() => {
    fetchSelectDTL_Headers();
    fetchUserForAssetsControl();
  }, []);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPassword = () => {
    if (data.branchid != 901) {
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
    const list = [...serviceList];
    list[index][name] = value;
    list[index]['assetsCode'] = assetsCodeSelect;
    if (list[index]['assetsCode'] === null || list[index]['assetsCode'] === undefined) {
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
      if (response['data'].length != 0) {
        list[index]['name'] = response['data'][0].Name
        list[index]['dtl'] = response['data'][0].Details
        list[index]['count'] = 1
        list[index]['serialNo'] = response['data'][0].SerialNo
        list[index]['price'] = response['data'][0].Price
        setServiceList(list);
      }
    }
  };

  //Source

  const handleChangeSource_Department = (event) => {
    event.preventDefault();
    setSource_Department(event.target.value);
    console.log(event.target.value)
  };

  const handleChangeSource_BU = (event) => {
    event.preventDefault();
    setSource_BU(event.target.value);
    console.log(event.target.value)
  };

  const handleChangeSource_delivery2 = (event) => {
    event.preventDefault();
    setSource(event.target.value);
    console.log(event.target.value)
  };

  const handleChangeSource_deliveryDate = (newValue) => {
    setSourceDate(newValue);
    console.log(newValue)
  };

  const handleChangeSource_deliveryApprove = (event) => {
    event.preventDefault();
    setSource_Approve(event.target.value);
    console.log(event.target.value)
  };

  const handleChangeSource_deliveryApproveDate = (newValue) => {
    setSource_DateApproveDate(newValue);
    console.log(newValue)
  };

  const handleChangeSource_Description = (event) => {
    event.preventDefault();
    setSource_Description(event.target.value);
    console.log(event.target.value)
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
      if (response.data[0].DepID == null) {
        setSource_Department('CO')
        setSource_BU('Oil')
      } else if (response.data[0].DepID == 1) {
        setSource_Department('ITO')
        setSource_BU('Center')
      }
      else if (response.data[0].DepID == 2) {
        setSource_Department('AFD')
        setSource_BU('Center')
      }
      else if (response.data[0].DepID == 3) {
        setSource_Department('ROD')
        setSource_BU('Center')
      }
      else if (response.data[0].DepID == 4) {
        setSource_Department('SSD')
        setSource_BU('Center')
      }
      else if (response.data[0].DepID == 5) {
        setSource_Department('HRD')
        setSource_BU('Center')
      }
      else if (response.data[0].DepID == 6) {
        setSource_Department('GAD')
        setSource_BU('Center')
      }
      else if (response.data[0].DepID == 7) {
        setSource_Department('SLD')
        setSource_BU('Center')
      }
      else if (response.data[0].DepID == 8) {
        setSource_Department('MMD')
        setSource_BU('Center')
      }
      else if (response.data[0].DepID == 9) {
        setSource_Department('PMD')
        setSource_BU('Center')
      }
      else if (response.data[0].DepID == 10) {
        setSource_Department('SCD')
        setSource_BU('Center')
      }
      else if (response.data[0].DepID == 11) {
        setSource_Department('BDO')
        setSource_BU('Center')
      }
      else if (response.data[0].DepID == 12) {
        setSource_Department('MDO')
        setSource_BU('Center')
      }
      else if (response.data[0].DepID == 14) {
        setSource_Department('CSO')
        setSource_BU('Center')
      }
      else if (response.data[0].DepID == 15) {
        setSource_Department('MMD2')
        setSource_BU('Center')
      }
    }
  };

  //Des
  const handleChangeDes_Department = (event) => {
    event.preventDefault();
    setDes_Department(event.target.value);
    console.log(event.target.value)
  };

  const handleDes_ChangeBU = (event) => {
    event.preventDefault();
    setDes_BU(event.target.value);
    console.log(event.target.value)
  };

  const handleChangeDes_delivery2 = (event) => {
    event.preventDefault();
    setDes_delivery(event.target.value);
    console.log(event.target.value)
  };

  const handleChangeDes_deliveryDate = (newValue) => {
    setDes_deliveryDate(newValue);
    console.log(newValue)
  };

  const handleChangeDes_deliveryApprove = (event) => {
    event.preventDefault();
    setDes_deliveryApprove(event.target.value);
    console.log(event.target.value)
  };

  const handleChangeDes_deliveryApproveDate = (newValue) => {
    setDes_deliveryApproveDate(newValue);
    console.log(newValue)
  };

  const handleChangeDes_Description = (event) => {
    event.preventDefault();
    setDes_Description(event.target.value);
    console.log(event.target.value)
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
      if (response.data[0].DepID == null) {
        setDes_Department('CO')
        setDes_BU('Oil')
      } else if (response.data[0].DepID == 1) {
        setDes_Department('ITO')
        setDes_BU('Center')
      }
      else if (response.data[0].DepID == 2) {
        setDes_Department('AFD')
        setDes_BU('Center')
      }
      else if (response.data[0].DepID == 3) {
        setDes_Department('ROD')
        setDes_BU('Center')
      }
      else if (response.data[0].DepID == 4) {
        setDes_Department('SSD')
        setDes_BU('Center')
      }
      else if (response.data[0].DepID == 5) {
        setDes_Department('HRD')
        setDes_BU('Center')
      }
      else if (response.data[0].DepID == 6) {
        setDes_Department('GAD')
        setDes_BU('Center')
      }
      else if (response.data[0].DepID == 7) {
        setDes_Department('SLD')
        setDes_BU('Center')
      }
      else if (response.data[0].DepID == 8) {
        setDes_Department('MMD')
        setDes_BU('Center')
      }
      else if (response.data[0].DepID == 9) {
        setDes_Department('PMD')
        setDes_BU('Center')
      }
      else if (response.data[0].DepID == 10) {
        setDes_Department('SCD')
        setDes_BU('Center')
      }
      else if (response.data[0].DepID == 11) {
        setDes_Department('BDO')
        setDes_BU('Center')
      }
      else if (response.data[0].DepID == 12) {
        setDes_Department('MDO')
        setDes_BU('Center')
      }
      else if (response.data[0].DepID == 14) {
        setDes_Department('CSO')
        setDes_BU('Center')
      }
      else if (response.data[0].DepID == 15) {
        setDes_Department('MMD2')
        setDes_BU('Center')
      }
    }
  };

  // Update Document
  const handleSave = async () => {
    if (!source && !source_department && !source_BU && !sourceDate) {
      swal("แจ้งเตือน", 'กรุณากรอกข้อมูลผู้ยื่นคำร้องให้ครบถ้วน', "warning");
    } else {
      if (!des_department && !des_BU && !des_delivery && !des_deliveryDate) {
        swal("แจ้งเตือน", 'กรุณากรอกข้อมูลผู้รับคำร้องให้ครบถ้วน', "warning");
      } else {
        if (!serviceList[0].assetsCode) {
          swal("แจ้งเตือน", 'กรุณากรอกข้อมูลทรัพย์สินให้ครบถ้วน', "warning");
        } else {
          const usercode = data.UserCode
          const nac_status = 1
          const sumPrice = sum_price
          const response = await store_FA_control_update_DTLandHeaders({
            usercode,
            nac_code,
            nac_status,
            sumPrice,
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
              console.log(responseDTL)
              if ('data' in responseDTL) {
                swal("ทำรายการสำเร็จ", 'อัปเดตรายการ ' + responseDTL.data[0].nac_code + ' แล้ว', "success", {
                  buttons: false,
                  timer: 2000,
                }).then((value) => {
                  if (data.UserCode === headers.create_by) {
                    navigate('/NAC_ROW')
                  } else {
                    navigate('/NAC_WAIT_APPROVE')
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
      if ('data' in responseForUpdate) {
        swal("ทำรายการสำเร็จ", 'คุณ ' + responseForUpdate.data[0].usercode + ' ได้ยื่นคำร้อง ' + responseForUpdate.data[0].nac_code + ' แล้ว', "success", {
          buttons: false,
          timer: 2000,
        }).then((value) => {
          if (data.UserCode === headers.create_by) {
            navigate('/NAC_ROW')
          } else {
            navigate('/NAC_WAIT_APPROVE')
          }
        });
      }
    } else {
      swal("ทำรายการไม่สำเร็จ", 'คุณไม่ได้รับอนุญาตให้ทำรายการนี้', "error")
    }
  };

  // ExamineApprove
  const handleExamineApprove = async () => {
    if (CheckExamineApprove.indexOf(data.UserCode) !== -1) {
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
        swal("ทำรายการสำเร็จ", 'คุณ ' + responseForUpdate.data[0].usercode + ' อนุมัติรายการ ' + responseForUpdate.data[0].nac_code + ' แล้ว', "success", {
          buttons: false,
          timer: 2000,
        }).then((value) => {
          if (data.UserCode === headers.create_by) {
            navigate('/NAC_ROW')
          } else {
            navigate('/NAC_WAIT_APPROVE')
          }
        });
      }
    } else {
      swal("ทำรายการไม่สำเร็จ", 'คุณไม่ได้รับอนุญาตให้อนุมัติรายการนี้', "error")
    }
  };

  // ExecApprove
  const handleExecApprove = async () => {
    if (CheckApprove.indexOf(data.UserCode) !== -1) {
      setBossApprove(data.UserCode)
      setBossApproveDate(datenow)
      const usercode = data.UserCode
      const nac_status = 4
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
        swal("ทำรายการสำเร็จ", 'คุณ ' + responseForUpdate.data[0].usercode + ' อนุมัติรายการ ' + responseForUpdate.data[0].nac_code + ' แล้ว', "success", {
          buttons: false,
          timer: 2000,
        }).then((value) => {
          if (data.UserCode === headers.create_by) {
            navigate('/NAC_ROW')
          } else {
            navigate('/NAC_WAIT_APPROVE')
          }
        });
      }
    }
  };

  //
  const handleSubmitComplete = async () => {
    if (data.UserCode === headers.des_userid) {
      const usercode = data.UserCode
      const nac_status = 5
      const source_approve = sourceApprove
      const source_approve_date = sourceDateApproveDate
      const des_approve = data.UserCode
      const des_approve_date = datenow
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
        swal("ทำรายการสำเร็จ", 'คุณ ' + responseForUpdate.data[0].usercode + ' ได้รับรองเอกสาร ' + responseForUpdate.data[0].nac_code + ' แล้ว', "success", {
          buttons: false,
          timer: 2000,
        }).then((value) => {
          if (data.UserCode === headers.create_by) {
            navigate('/NAC_ROW')
          } else {
            navigate('/NAC_WAIT_APPROVE')
          }
        });
      }
    } else {
      swal("ทำรายการไม่สำเร็จ", 'คุณไม่ได้รับอนุญาตให้ทำรายการนี้', "error")
    }
  };

  // CancelApprove
  const CancelApprove = async () => {
    if (selectNAC === 3 && CheckApprove.indexOf(data.UserCode) !== -1) {
      const usercode = data.UserCode
      const nac_status = 0
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
        swal("ทำรายการสำเร็จ", 'คุณ ' + responseForUpdate.data[0].usercode + ' ได้ยกเลิกรายการ ' + responseForUpdate.data[0].nac_code + ' แล้ว', "success", {
          buttons: false,
          timer: 2000,
        }).then((value) => {
          if (data.UserCode === headers.create_by) {
            navigate('/NAC_ROW')
          } else {
            navigate('/NAC_WAIT_APPROVE')
          }
        });
      }
    } else if (selectNAC === 2 && CheckExamineApprove.indexOf(data.UserCode) !== -1) {
      const usercode = data.UserCode
      const nac_status = 0
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
        swal("ทำรายการสำเร็จ", 'คุณ ' + responseForUpdate.data[0].usercode + ' ได้ยกเลิกรายการ ' + responseForUpdate.data[0].nac_code + ' แล้ว', "success", {
          buttons: false,
          timer: 2000,
        }).then((value) => {
          if (data.UserCode === headers.create_by) {
            navigate('/NAC_ROW')
          } else {
            navigate('/NAC_WAIT_APPROVE')
          }
        });
      }
    }
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
                            ) : selectNAC === 5 ? (
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
                                  disabled={selectNAC === 1 ? false : true}
                                  name='source_department'
                                  onChange={handleChangeSource_Department}
                                  value={source_department}
                                  inputProps={{ style: { textAlign: 'center' } }}
                                  variant="standard"
                                />
                                <TextField
                                  required
                                  fullWidth
                                  disabled={selectNAC === 1 ? false : true}
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
                                disabled={selectNAC === 1 ? false : true}
                                options={UserForAssetsControl}
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
                                  disabled={selectNAC === 1 ? false : true}
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
                                disabled={(selectNAC === 2 && CheckExamineApprove.indexOf(data.UserCode) !== -1) ? false : true}
                                name='sourceApprove'
                                onChange={handleChangeSource_deliveryApprove}
                                value='ไม่มีผู้ตรวจสอบ'
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
                                  name='sourceDateApproveDate'
                                  onChange={handleChangeSource_deliveryApproveDate}
                                  disabled={(selectNAC === 2 && CheckExamineApprove.indexOf(data.UserCode) !== -1) ? false : true}
                                  value={!sourceDateApproveDate ? datenow : sourceDateApproveDate}
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
                                  disabled={selectNAC === 1 ? false : true}
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
                                  disabled={selectNAC === 1 ? false : true}
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
                                disabled={selectNAC === 1 ? false : true}
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
                                          วันที่รับคำร้อง : :
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
                                disabled={selectNAC === 4 ? false : true}
                                value='ไม่มีผู้ตรวจสอบ'
                                name='des_deliveryApprove'
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
                                  name='des_deliveryApproveDate'
                                  disabled={selectNAC === 4 ? false : true}
                                  value={!des_deliveryApproveDate ? datenow : des_deliveryApproveDate}
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
                                      disabled={selectNAC === 1 ? true : false}
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
                            disabled={(selectNAC >= 3) ? true : false}
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
                                value={!singleService.price_main ? '' : (singleService.price_main).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
                                value={!singleService.price ? '' : (singleService.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                inputProps={{ style: { textAlign: 'center' } }}
                                variant="standard"
                              />
                            </StyledTableCell>
                            <StyledTableCell align="center" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa" }}>
                              {serviceList.length !== 0 && (
                                <IconButton
                                  size="large"
                                  disabled={(selectNAC >= 3) ? true : false}
                                  aria-label="delete"
                                  color="error"
                                  onClick={serviceList.length == 1 ? false : () => handleServiceRemove(index)}
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
                            inputProps={{ style: { textAlign: 'center', color: 'red' } }}
                            value={!sum_price ? '' : (sum_price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
                            value={headers.create_by}
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
                              value={headers.create_date}
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
                            disabled={(selectNAC === 3 && CheckApprove.indexOf(data.UserCode) !== -1) ? false : true}
                            value={bossApprove}
                            sx={{ pt: 1 }}
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
                          <LocalizationProvider dateAdapter={DateAdapter}>
                            <DatePicker
                              disabled={(selectNAC === 3 && CheckApprove.indexOf(data.UserCode) !== -1) ? false : true}
                              value={!bossApproveDate ? datenow : bossApproveDate}
                              inputFormat="yyyy-MM-dd"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <Typography color="black">
                                      วันที่อนุมัติ :
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
                      </StyledTableRow>
                    </TableHead>
                  </Table>
                </TableContainer>
              </React.Fragment>
              {(selectNAC === 1 && (data.UserCode === headers.create_by)) ? (
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
                            disabled={(data.UserCode === headers.create_by) ? false : true}>
                            บันทึกเอกสาร
                          </Button>
                        </Grid>
                        <Grid item xs={2}>
                          <Button
                            variant="contained"
                            sx={{ my: { xs: 3, md: 4 }, p: 2, width: 150 }}
                            disabled={(data.UserCode === headers.create_by) ? false : true}
                            onClick={handleSubmit}>
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
              ) : (selectNAC > 1 && selectNAC < 4) ? (
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
                            disabled={(selectNAC === 3 && (CheckApprove.indexOf(data.UserCode) !== -1)) ? false : (selectNAC === 2 && (CheckExamineApprove.indexOf(data.UserCode) !== -1)) ? false : true}
                            sx={{ my: { xs: 3, md: 4 }, p: 2, width: 150 }}
                            style={{ 'backgroundColor': 'orange' }}>
                            บันทึกเอกสาร
                          </Button>
                        </Grid>
                        <Grid item xs={2}>
                          <Button
                            variant="contained"
                            disabled={(selectNAC === 3 && (CheckApprove.indexOf(data.UserCode) !== -1)) ? false : (selectNAC === 2 && (CheckExamineApprove.indexOf(data.UserCode) !== -1)) ? false : true}
                            onClick={selectNAC === 2 ? handleExamineApprove : handleExecApprove}
                            sx={{ my: { xs: 3, md: 4 }, p: 2, width: 150 }}
                            color={selectNAC === 2 ? 'success' :
                              selectNAC === 3 ? 'success' :
                                'primary'}>
                            <React.Fragment>
                              {selectNAC === 2 ? 'อนุมัติ' :
                                selectNAC === 3 ? 'อนุมัติ' :
                                  'รับรองเอกสาร'
                              }
                            </React.Fragment>
                          </Button>
                        </Grid>
                        <Grid item xs={2}>
                          <Button
                            variant="contained"
                            color='error'
                            disabled={(selectNAC === 3 && (CheckApprove.indexOf(data.UserCode) !== -1)) ? false : (selectNAC === 2 && (CheckExamineApprove.indexOf(data.UserCode) !== -1)) ? false : true}
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
              ) : (selectNAC === 4) ? (
                <React.Fragment>
                  <center>
                    <Box sx={{ flexGrow: 1 }}>
                      <Button
                        variant="contained"
                        sx={{ my: { xs: 3, md: 4 }, p: 2, width: 150 }}
                        disabled={(data.UserCode === headers.des_userid) ? false : true}
                        onClick={handleSubmitComplete}>
                        <React.Fragment>
                          รับรองเอกสาร
                        </React.Fragment>
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
            <React.Fragment>
              <React.Fragment>
                <Grid container spacing={5} alignItems="flex-end" sx={{ pb: 2 }}>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={5}
                  >
                    <Paper>
                      <Card>
                        <CardHeader
                          title='เอกสารแนบ'
                          titleTypographyProps={{ align: 'center' }}
                          subheaderTypographyProps={{
                            align: 'center',
                          }}
                          sx={{
                            backgroundColor: (theme) => theme.palette.grey[200]
                          }}
                        />
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'baseline',
                            mb: 2,
                          }}
                        >
                          <CardContent>
                          </CardContent>
                        </Box>
                        <CardActions titleTypographyProps={{ align: 'center' }}
                          subheaderTypographyProps={{
                            align: 'center',
                          }}
                          sx={{
                            backgroundColor: (theme) => theme.palette.info.main
                          }}>
                          <Button fullWidth
                            sx={{ backgroundColor: (theme) => theme.palette.info.main }}
                            className='text-white'
                            startIcon={<AddCardIcon />}
                          >
                            <Typography variant='h6' onClick={handleClickOpenDialog}>แนบลิ้งเอกสาร</Typography>
                          </Button>
                        </CardActions>
                      </Card>
                    </Paper>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={7}
                  >
                    <Paper>
                      <Card>
                        <CardHeader
                          title='ช่องแสดงความคิดเห็น'
                          titleTypographyProps={{ align: 'center' }}
                          subheaderTypographyProps={{
                            align: 'center',
                          }}
                          sx={{
                            backgroundColor: (theme) => theme.palette.grey[200]
                          }}
                        />
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'baseline',
                            mb: 2,
                          }}
                        >
                          <CardContent>
                          </CardContent>
                        </Box>
                        <CardActions titleTypographyProps={{ align: 'center' }}
                          subheaderTypographyProps={{
                            align: 'center',
                          }}
                          sx={{
                            backgroundColor: (theme) => theme.palette.info.main
                          }}>
                          <Button fullWidth
                            sx={{ backgroundColor: (theme) => theme.palette.info.main }}
                            className='text-white'
                            startIcon={<ChatIcon />}
                          >
                            <Typography variant='h6'>แสดงความคิดเห็น</Typography>
                          </Button>
                        </CardActions>
                      </Card>
                    </Paper>
                  </Grid>
                </Grid>
              </React.Fragment>
            </React.Fragment>
            <Dialog open={openDialog} onClose={handleCloseDialog} >
              <DialogTitle>กรุณาแนบลิ้งเอกสาร</DialogTitle>
              <DialogContent sx={{ width: 500 }}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="link_document"
                  label="ลิ้งเอกสารที่ต้องการ"
                  type="text"
                  fullWidth
                  variant="standard"
                  sx={{ pb: 2 }}
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="like_description"
                  label="คำอธิบาย"
                  type="text"
                  fullWidth
                  variant="standard"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog} variant='contained'>บันทึก</Button>
                <Button onClick={handleCloseDialog} variant='contained' color='error'>ยกเลิก</Button>
              </DialogActions>
            </Dialog>
            <hr></hr>
            <br />
            <Copyright />
          </Container>
        </AnimatedPage>
      </ThemeProvider>
      <Outlet />
    </React.Fragment >
  );
}
