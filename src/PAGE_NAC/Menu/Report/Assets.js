import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import AnimatedPage from '../../../AnimatedPage';
import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import { alpha, styled } from '@mui/material/styles';
import { DataGrid, gridClasses, GridToolbar } from '@mui/x-data-grid';
import Axios from "axios"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import MuiAlert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import NativeSelect from '@mui/material/NativeSelect';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import NoteAdd from '@mui/icons-material/NoteAdd';
import Snackbar from '@mui/material/Snackbar';
import '../../../App.css'

const ODD_OPACITY = 0.2;

const other = {
  showCellRightBorder: true,
  showColumnRightBorder: true,
};

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(0.8),
  paddingTop: theme.spacing(0.5),
  paddingBottom: theme.spacing(0.5),
  textAlign: 'start',
  color: '#ffffff',
}));

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  '.css-1knaqv7-MuiButtonBase-root-MuiButton-root': {
    color: 'rgba(0, 0, 0, 1)',
  },
  '.css-f3jnds-MuiDataGrid-columnHeaders': {
    backgroundColor: 'rgba(0, 0, 0, 1)',
    color: 'rgba(255, 255, 255,1)',
  },
  '.css-1s0hp0k-MuiDataGrid-columnHeadersInner': {
    backgroundColor: 'rgba(0, 0, 0, 1)',
    color: 'rgba(255, 255, 255, 1)',
    '.css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root': {
      color: 'rgba(255, 255, 255, 1)',
      display: 'none'
    },
    '.css-1pe4mpk-MuiButtonBase-root-MuiIconButton-root': {
      color: 'rgba(255, 255, 255,1)'
    },
  },
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[100],
    '&:hover, &.Mui-hovered': {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    '&.Mui-selected': {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity,
      ),
      '&:hover, &.Mui-hovered': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
          theme.palette.action.selectedOpacity +
          theme.palette.action.hoverOpacity,
        ),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  },
  [`& .${gridClasses.row}.odd`]: {
    '&:hover, &.Mui-hovered': {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    '&.Mui-selected': {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity,
      ),
      '&:hover, &.Mui-hovered': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
          theme.palette.action.selectedOpacity +
          theme.palette.action.hoverOpacity,
        ),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  },
}));

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

const filterOptions2 = createFilterOptions({
  stringify: (option) => option.UserCode,
});

async function Store_FA_control_create_doc(credentials) {
  return fetch('http://vpnptec.dyndns.org:32001/api/store_FA_control_create_doc', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
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

async function Store_FA_control_Create_from_reported(credentials) {
  return fetch('http://vpnptec.dyndns.org:32001/api/Store_FA_control_Create_from_reported', {
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

export default function Reported_of_assets() {
  const [reported_of_assets, setReported_of_assets] = React.useState(JSON.parse(localStorage.getItem('Allaseets')));
  const data = JSON.parse(localStorage.getItem('data'));
  const checkUserWeb = localStorage.getItem('sucurity');
  const [status_all] = React.useState(['none', 'สภาพดี', 'ชำรุดรอซ่อม', 'รอตัดขาย', 'รอตัดชำรุด', 'QR Code ไม่สมบูรณ์ (สภาพดี)', 'QR Code ไม่สมบูรณ์ (ชำรุดรอซ่อม)', 'QR Code ไม่สมบูรณ์ (รอตัดขาย)', 'QR Code ไม่สมบูรณ์ (รอตัดชำรุด)']);
  const [valueOfIndex, setValueOfIndex] = React.useState([]);

  // ใช้สำหรับสร้างเวลาปัจจุบัน
  const d = new Date();
  const year = (d.getFullYear()).toString();
  const month = ((d.getMonth()) + 101).toString().slice(-2);
  const date = ((d.getDate()) + 100).toString().slice(-2);
  const hours = ((d.getHours()) + 100).toString().slice(-2);
  const mins = ((d.getMinutes()) + 100).toString().slice(-2);
  const seconds = ((d.getSeconds()) + 100).toString().slice(-2);
  const datenow = `${year}-${month}-${date}T${hours}:${mins}:${seconds}.000Z`;

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState();
  const dataDepID = data.depid
  const [UserForAssetsControl, setUserForAssetsControl] = React.useState([]);
  const [users_pureDep, setUsers_pureDep] = React.useState([]);
  const [nameSource, setNmaeSource] = React.useState();
  const [nameDes, setNmaeDes] = React.useState();

  const [des_Department, setDes_Department] = React.useState();
  const [des_BU, setDes_BU] = React.useState();
  const [des_delivery, setDes_delivery] = React.useState();
  const [source_Department, setSource_Department] = React.useState(data.branchid === 901 ? null : data.DepCode);
  const [source_BU, setSource_BU] = React.useState(data.branchid === 901 ? null : 'Oil');
  const [source, setSource] = React.useState(data.branchid === 901 ? null : data.UserCode);
  const [source_Description, setSource_Description] = React.useState();
  const [alert, setAlert] = React.useState(false);
  const [valueAlert, setValueAlert] = React.useState(false);
  const [pageSize, setPageSize] = React.useState(10);

  const handleClick_Value = async (newSelectionModel) => {
    const nacdtl_assetsCode = newSelectionModel[newSelectionModel.length - 1]
    const responseCheckAssetCode_Process = await store_FA_control_CheckAssetCode_Process({
      nacdtl_assetsCode
    })
    if (responseCheckAssetCode_Process.data[0].checkProcess === 'false') {
      const alert_value = 'ทรัพย์สินนี้กำลังอยู่ในระหว่างการทำรายการ'
      setAlert(true);
      setValueAlert(alert_value)
    } else {
      setValueOfIndex(newSelectionModel);
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

  React.useEffect(() => {
    fetchUserForAssetsControl();
    // 👇️ disable the rule for a single line

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const handleChangeSource_Description = (event) => {
    event.preventDefault();
    setSource_Description(event.target.value);
  };

  const handleAutoSource_DeapartMent = async (e) => {
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

  const handleChangeDes_delivery2 = (event) => {
    event.preventDefault();
    setDes_delivery(event.target.value);
  };

  const handleAutoDes_DeapartMent = async (e) => {
    const UserCode = e.target.innerText
    const response = await AutoDeapartMent({
      UserCode
    });
    setDes_delivery(UserCode)
    if (!UserCode) {
      setDes_Department('')
      setDes_BU('')
      setNmaeDes('')
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

  const handleChangeDes_Name = (event) => {
    event.preventDefault();
    setNmaeDes(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      if (data.branchid === 901) {
        setValue(0)
        setOpen(false);
        setDes_Department(null)
        setDes_BU(null)
        setDes_delivery(null)
        setSource_Department(null)
        setNmaeDes('')
        setSource_BU(null)
        setSource(null)
        setNmaeSource('')
      } else {
        setValue(0)
        setOpen(false);
        setDes_Department(null)
        setDes_BU(null)
        setDes_delivery(null)
        setNmaeDes('')
      }
    }
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  // สำหรับหาค่า Index ของ UserCode of Auto Complete
  let resultIndex = []
  for (let i = 0; i < UserForAssetsControl.length; i++) {
    resultIndex[i] = UserForAssetsControl[i].UserCode;
  }
  resultIndex = [resultIndex]

  const handleCreate_NAC = async () => {
    if (value !== 2 || value !== '2') {
      if (!source || !source_Department || !source_BU || !nameSource) {
        const alert_value = !source ? 'กรุณากรอกข้อมูลผู้ส่ง' : !source_Department ? 'กรุณากรอกข้อมูลแผนกของผู้ส่ง' :
          !nameSource ? 'กรุณาลงชื่อผู้ส่งมอบ' : 'กรุณากรอกวันที่ของผู้ส่ง'
        setAlert(true);
        setValueAlert(alert_value)
      } else if (value === 0 || value === '0' || !value) {
        const alert_value = 'กรุณาเลือกประเภทรายการ'
        setAlert(true);
        setValueAlert(alert_value)
      }
      else {
        const usercode = data.UserCode
        const worktype = value
        const sumPrice = null
        const des_deliveryDate = null
        const des_Description = null
        const sourceDate = datenow
        const navigate_type = (value === 2 || value === '2') ? '/NAC_ROW/NAC_CREATE_WAIT_APPROVE/' :
          (value === 3 || value === '3') ? '/NAC_ROW/NAC_CHANGE_WAIT_APPROVE/' :
            (value === 4 || value === '4') ? '/NAC_ROW/NAC_DELETE_WAIT_APPROVE/' :
              '/NAC_ROW/NAC_SEALS_APPROVE/'
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
          for (let i = 0; i < valueOfIndex.length; i++) {
            const nac_code = response.data[0].nac_code // ได้จาก Response ของ Store_FA_control_create_doc
            const nacdtl_row = i
            const nacdtl_assetsCode = valueOfIndex[i]
            await Store_FA_control_Create_from_reported({
              usercode,
              nac_code,
              nacdtl_row,
              nacdtl_assetsCode,
            });
          }
          localStorage.setItem('NacCode', JSON.stringify({ nac_code: response.data[0].nac_code, nac_status: 1 }));
          window.location.href = navigate_type + response.data[0].nac_code
        }
      }
    } else {
      if (!source || !source_Department || !source_BU || !nameSource) {
        const alert_value = !source ? 'กรุณากรอกข้อมูลผู้ส่ง' : !source_Department ? 'กรุณากรอกข้อมูลแผนกของผู้ส่ง' :
          !nameSource ? 'กรุณาลงชื่อผู้ส่งมอบ' : 'กรุณากรอกวันที่ของผู้ส่ง'
        setAlert(true);
        setValueAlert(alert_value)
      } else if (!des_Department || !des_BU || !des_delivery || !nameDes) {
        const alert_value = !des_delivery ? 'กรุณากรอกข้อมูลผู้รับ' : !des_Department ? 'กรุณากรอกข้อมูลแผนกของผู้รับ' :
          !nameDes ? 'กรุณาลงชื่อผู้รับมอบ' : 'กรุณากรอกวันที่ของผู้รับ'
        setAlert(true);
        setValueAlert(alert_value)
      } else if (value === 0 || value === '0' || !value) {
        const alert_value = 'กรุณาเลือกประเภทรายการ'
        setAlert(true);
        setValueAlert(alert_value)
      }
      else {
        const usercode = data.UserCode
        const worktype = value
        const sumPrice = null
        const des_deliveryDate = null
        const des_Description = null
        const sourceDate = datenow
        const navigate_type = (value === 2 || value === '2') ? '/NAC_ROW/NAC_CREATE_WAIT_APPROVE/' :
          (value === 3 || value === '3') ? '/NAC_ROW/NAC_CHANGE_WAIT_APPROVE/' :
            (value === 4 || value === '4') ? '/NAC_ROW/NAC_DELETE_WAIT_APPROVE/' :
              '/NAC_ROW/NAC_SEALS_APPROVE/'
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
          for (let i = 0; i < valueOfIndex.length; i++) {
            const nac_code = response.data[0].nac_code // ได้จาก Response ของ Store_FA_control_create_doc
            const nacdtl_row = i
            const nacdtl_assetsCode = valueOfIndex[i]
            await Store_FA_control_Create_from_reported({
              usercode,
              nac_code,
              nacdtl_row,
              nacdtl_assetsCode,
            });
          }
          localStorage.setItem('NacCode', JSON.stringify({ nac_code: response.data[0].nac_code, nac_status: 1 }));
          window.location.href = navigate_type + response.data[0].nac_code
        }
      }
    }
  }

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlert(false);
  };

  const columns = [
    { field: 'Code', headerName: 'รหัสทรัพย์สิน', headerClassName: 'super-app-theme--header', minWidth: 130, flex: 1 },
    { field: 'Name', headerName: 'ชื่อ', headerClassName: 'super-app-theme--header', minWidth: 130, flex: 1 },
    {
      field: 'Date',
      headerName: 'วันที่ตรวจนับ',
      headerClassName: 'super-app-theme--header',
      minWidth: 170,
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return (
          <React.Fragment>
            {params.row.Date ?
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={1}
              >
                <CalendarMonthIcon />
                <Typography variant='body2'>
                  {params.row.Date.split('T')[0] || ''}
                </Typography>
              </Stack>
              : null}
          </React.Fragment>
        )
      }
    },
    {
      field: 'EndDate_Success',
      headerName: 'วันที่ทำ NAC ล่าสุด',
      headerClassName: 'super-app-theme--header',
      minWidth: 170,
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return (
          <React.Fragment>
            {params.row.EndDate_Success ?
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={1}
              >
                <CalendarMonthIcon />
                <Typography variant='body2'>
                  {params.row.EndDate_Success.split('T')[0] || ''}
                </Typography>
              </Stack>
              : null}
          </React.Fragment>
        )
      }
    },
    {
      field: 'UserID',
      headerName: 'ผู้ตรวจนับ',
      headerAlign: 'center',
      align: 'center',
      headerClassName: 'super-app-theme--header',
      minWidth: 100,
      flex: 1,
      valueGetter: (params) =>
        `${params.row.UserID || ''}`,
    },
    {
      field: 'Details',
      headerName: 'สถานะล่าสุด',
      headerClassName: 'super-app-theme--header',
      minWidth: 130,
      flex: 1,
      valueGetter: (params) =>
        `${params.row.Details || ''}`,
    },
    {
      field: 'Reference',
      headerName: 'สถานะครั้งนี้',
      headerClassName: 'super-app-theme--header',
      minWidth: 130,
      flex: 1,
      renderCell: (params) => {
        const handleChange_select = async (event, params) => {
          const body = {
            Reference: event.target.value,
            UserID: data.userid,
            Code: params.row.Code,
            RoundID: params.row.RoundID,
            choice: 1
          }

          const headers = {
            'Authorization': 'application/json; charset=utf-8',
            'Accept': 'application/json'
          };
          await Axios.put('http://vpnptec.dyndns.org:32001/api/updateReference', body, { headers })

          reported_of_assets.forEach(function (x, index) {
            if (x.RowID === params.row.RowID) {
              const list = [...reported_of_assets]
              list[index]['Reference'] = event.target.value
              list[index]['remarker'] = event.target.value === 'none' ? 'ยังไม่ได้ตรวจนับ' : 'ตรวจนับแล้ว'
              setReported_of_assets(list)
            }
          })

        };
        return (
          <React.Fragment>
            {data.branchid === 901 ?
              <React.Fragment>
                <FormControl fullWidth size="small">
                  <Select
                    label={false}
                    value={!params.row.Reference ? 'none' : params.row.Reference}
                    onChange={(event) => handleChange_select(event, params)}
                  >
                    {status_all.map((status) => (<MenuItem value={status}>{status}</MenuItem>))}
                  </Select>
                </FormControl>
              </React.Fragment > :
              <React.Fragment>
                <Typography variant='body2'>
                  {params.row.Reference || ''}
                </Typography>
              </React.Fragment >}
          </React.Fragment >
        )
      }
    },
    {
      field: 'remarker',
      headerName: 'หมายเหตุ',
      headerAlign: 'center',
      align: 'center',
      headerClassName: 'super-app-theme--header',
      minWidth: 130,
      flex: 1,
      renderCell: (params) => {
        return (
          <Item
            style={{
              //'maxWidth': 'fit-content',
              borderRadius: '100px',
              width: '100%',
              textAlign: 'center',
              'backgroundColor': params.row.remarker === 'ตรวจนับแล้ว' ? '#008000' :
                params.row.remarker === 'ยังไม่ได้ตรวจนับ' ? '#DC143C' : ' #FFA500'
            }}
          >
            {params.row.remarker}
          </Item>
        )
      }
    },
  ];

  return (
    <React.Fragment>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar align="center" open={alert} autoHideDuration={4500} onClose={handleCloseAlert}>
          <Alert onClose={handleCloseAlert} severity="warning" sx={{ width: '100%' }}>
            {valueAlert}
          </Alert>
        </Snackbar>
      </Stack>
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
            <Typography variant="h5" color="inherit" className='font-vsm'>
              รายการการตรวจนับทรัพย์สินทั้งหมดของสาขาที่ {!reported_of_assets ? 'Loading...' : reported_of_assets[0].BranchID}
            </Typography>
          </AnimatedPage>
        </Toolbar>
      </AppBar>
      <AnimatedPage>
        <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
          <Container maxWidth="1000px" sx={{ pt: 3, pb: 3 }}>
            <TableContainer >
              <Table aria-label="customized table" style={{ width: '100%' }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                  spacing={2}
                  sx={{ mb: 2, mt: 2 }}
                >
                  <Card

                    style={{
                      'cursor': 'pointer',
                      'flex': 1,
                      'margin': '0px 20px',
                      'padding': '15px',
                      'border-radius': '10px',
                    }}
                  >
                    <CardContent>
                      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom className='hide-sm font-md-sm'>
                        รวมทรัพย์สินที่ตรวจนับแล้ว
                      </Typography>
                      <Typography variant="h5" component="div" style={{ color: 'green' }} className='font-vsm font-md-sm'>
                        <b>{reported_of_assets.filter(function (el) { return (el.remarker === 'ตรวจนับแล้ว') }).length} รายการ</b>
                      </Typography>
                    </CardContent>
                  </Card>
                  <Card

                    style={{
                      'cursor': 'pointer',
                      'flex': 1,
                      'margin': '0px 20px',
                      'padding': '15px',
                      'border-radius': '10px',
                    }}
                  >
                    <CardContent>
                      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom className='hide-sm font-md-sm'>
                        รวมทรัพย์สินที่คงเหลือ
                      </Typography>
                      <Typography variant="h5" component="div" style={{ color: 'red' }} className='font-vsm font-md-sm'>
                        <b>{reported_of_assets.filter(function (el) { return (el.remarker === 'ยังไม่ได้ตรวจนับ') }).length} รายการ</b>
                      </Typography>
                    </CardContent>
                  </Card>
                  <Card

                    style={{
                      'cursor': 'pointer',
                      'flex': 1,
                      'margin': '0px 20px',
                      'padding': '15px',
                      'border-radius': '10px',
                    }}
                  >
                    <CardContent>
                      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom className='hide-sm font-md-sm'>
                        ทรัพย์สินสาขาอื่น ๆ
                      </Typography>
                      <Typography variant="h5" component="div" style={{ color: 'orange' }} className='font-vsm font-md-sm'>
                        <b>{reported_of_assets.filter(function (el) { return (el.remarker === 'นับแล้ว ต่างสาขา') }).length} รายการ</b>
                      </Typography>
                    </CardContent>
                  </Card>
                  <Card

                    style={{
                      'cursor': 'pointer',
                      'flex': 1,
                      'margin': '0px 20px',
                      'padding': '15px',
                      'border-radius': '10px',
                    }}
                  >
                    <CardContent>
                      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom className='hide-sm font-md-sm'>
                        ทรัพย์สินทั้งหมด
                      </Typography>
                      <Typography variant="h5" component="div" style={{ color: 'blue' }} className='font-vsm font-md-sm'>
                        <b>{reported_of_assets.length} รายการ</b>
                      </Typography>
                    </CardContent>
                  </Card>
                </Stack>
              </Table>
            </TableContainer>
            <Stack
              direction="row"
              justifyContent="flex-end"
              alignItems="flex-end"
              spacing={2}
              sx={{ mt: 3, mb: 1 }}
            >
              <Button variant='contained' disabled={valueOfIndex.length > 0 ? false : true} onClick={handleClickOpen} startIcon={<NoteAdd />}>New NAC</Button>
            </Stack>
            <Box
              sx={{
                height: 683,
                width: '100%',
              }}
            >
              <StripedDataGrid
                sx={{
                  pl: 2,
                  pr: 2,
                  pt: 2,
                  boxShadow: 1,
                  [`& .${gridClasses.cell}`]: {
                    py: 1,
                  },
                }}
                components={{ Toolbar: GridToolbar }}
                componentsProps={{ toolbar: { csvOptions: { utf8WithBom: true } } }}
                rows={reported_of_assets}
                columns={columns}
                getRowId={(reported_of_assets) => reported_of_assets.Code}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                pagination
                rowsPerPageOptions={[10, 20, 50, 100]}
                disableColumnMenu
                autoHeight
                disableSelectionOnClick
                {...other}
                onSelectionModelChange={(newSelectionModel) => handleClick_Value(newSelectionModel)}
                checkboxSelection
                selectionModel={valueOfIndex}
                keepNonExistentRowsSelected
              />
            </Box>
          </Container>
          <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
            <Stack
              sx={{ mt: 3, p: 2, pb: 0 }}
              direction="row"
              justifyContent="flex-start"
              spacing={2}
            >
              <DialogTitle className='font-vsm'>กรุณาเลือกประเภทรายการ</DialogTitle>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel className='font-vsm' variant="standard" htmlFor="demo-dialog-native"></InputLabel>
                <NativeSelect
                  defaultValue={[]}
                  onChange={handleChange}
                  className='font-vsm'
                  inputProps={{
                    name: 'age',
                    id: 'uncontrolled-native',
                  }}
                >
                  <option value={0}>None</option>
                  <option value={2}>โยกย้ายทรัพย์สิน</option>
                  {/* <option value={3}>เปลี่ยนแปลงรายละเอียดทรัพย์สิน</option> */}
                  <option value={5}>ขายทรัพย์สิน</option>
                  <option value={4}>ตัดจากบัญชีทรัพย์สิน</option>
                </NativeSelect>
              </FormControl>
            </Stack>
            {(value === 0 || value === '0' || !value) ? null
              : (value === 2 || value === '2') ?
                (
                  <React.Fragment>
                    <DialogContent>
                      <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        <Table aria-label="customized table" style={{ width: '100%' }}>
                          <TableHead>
                            <TableRow>
                              <StyledTableCell align="center" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa", width: '30%' }} className='font-vsm-sm'>หน่วยงานที่ส่งมอบ</StyledTableCell>
                              <StyledTableCell align="center" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa", width: '30%' }} className='font-vsm-sm'>หน่วยงานที่รับมอบ</StyledTableCell>
                            </TableRow>
                          </TableHead>
                          <React.Fragment>
                            <TableBody>
                              <StyledTableRow>
                                <StyledTableCell align="center" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa" }}>
                                  <React.Fragment>
                                    <Grid container>
                                      <Grid xs={6}>
                                        <Typography align='center' color="inherit" className='font-vsm-sm'>
                                          Department
                                        </Typography>
                                      </Grid>
                                      <Grid xs={6}>
                                        <Typography align='center' color="inherit" className='font-vsm-sm'>
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
                                        name='source_Department'
                                        onChange={handleChangeSource_Department}
                                        value={source_Department}
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
                                          size="small"
                                          options={users_pureDep}
                                          getOptionLabel={(option) => option.UserCode}
                                          filterOptions={filterOptions2}
                                          onChange={handleAutoSource_DeapartMent}
                                          renderInput={(params) => (
                                            <React.Fragment>
                                              <TextField
                                                {...params}
                                                variant="standard"
                                                label='ผู้ส่งมอบ'
                                                error={valueAlert === 'กรุณากรอกข้อมูลผู้ส่ง' ? true : false}
                                                fullWidth
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
                                          error={valueAlert === 'กรุณาลงชื่อผู้ส่งมอบ' ? true : false}
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
                                    ) : (
                                      <React.Fragment>
                                        <TextField
                                          required
                                          fullWidth
                                          name='source'
                                          id='source'
                                          label='ผู้ส่งมอบ'
                                          error={valueAlert === 'กรุณากรอกข้อมูลผู้ส่ง' ? true : false}
                                          value={source}
                                          sx={{ pt: 1 }}
                                          variant="standard"
                                        />
                                        <TextField
                                          variant="standard"
                                          fullWidth
                                          autoComplete="family-name"
                                          error={valueAlert === 'กรุณาลงชื่อผู้ส่งมอบ' ? true : false}
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
                                            <Typography color="black" className='font-vsm-sm'>
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
                                    <Grid container>
                                      <Grid xs={6}>
                                        <Typography align='center' color="inherit" className='font-vsm-sm'>
                                          Department
                                        </Typography>
                                      </Grid>
                                      <Grid xs={6}>
                                        <Typography align='center' color="inherit" className='font-vsm-sm'>
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
                                        value={des_Department}
                                        inputProps={{ style: { '-webkit-text-fill-color': 'rgba(0,0,0,1)', textAlign: 'center' } }}
                                        onChange={handleChangeDes_Department}
                                      />
                                      <TextField
                                        required
                                        align='center'
                                        name='des_BU'
                                        fullWidth
                                        disabled
                                        variant="standard"
                                        value={des_BU}
                                        inputProps={{ style: { '-webkit-text-fill-color': 'rgba(0,0,0,1)', textAlign: 'center' } }}
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
                                      //value={des_delivery[resultIndex[0].indexOf(des_delivery)]}
                                      onChange={handleAutoDes_DeapartMent}
                                      renderInput={(params) => (
                                        <React.Fragment>
                                          <TextField
                                            fullWidth
                                            autoComplete="family-name"
                                            onChange={handleChangeDes_delivery2}
                                            value={des_delivery}
                                            sx={{ pt: 1 }}
                                            variant="standard"
                                            label='ผู้รับมอบ'
                                            error={valueAlert === 'กรุณากรอกข้อมูลผู้รับ' ? true : false}
                                            {...params}
                                          />
                                        </React.Fragment>
                                      )}
                                    />
                                    <TextField
                                      variant="standard"
                                      fullWidth
                                      autoComplete="family-name"
                                      inputProps={{ style: { '-webkit-text-fill-color': 'rgba(0,0,0,1)' } }}
                                      onChange={handleChangeDes_Name}
                                      value={nameDes}
                                      error={valueAlert === 'กรุณาลงชื่อผู้รับมอบ' ? true : false}
                                      InputProps={{
                                        startAdornment: (
                                          <InputAdornment position="start">
                                            <Typography color="black">
                                              ลงชื่อผู้รับมอบ :
                                            </Typography>
                                          </InputAdornment>
                                        ),
                                      }}
                                      sx={{ pt: 1 }}
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
                                            <Typography color="black" className='font-vsm-sm'>
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
                      </Box>
                    </DialogContent>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <DialogContent>
                      <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        <Table aria-label="customized table" style={{ width: '100%' }}>
                          <TableHead>
                            <TableRow>
                              <StyledTableCell align="center" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa", width: '30%' }} className='font-vsm-sm'>หน่วยงานที่ส่งมอบ</StyledTableCell>
                              <StyledTableCell align="center" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa", width: '30%' }} className='font-vsm-sm'>หน่วยงานที่รับมอบ</StyledTableCell>
                            </TableRow>
                          </TableHead>
                          <React.Fragment>
                            <TableBody>
                              <StyledTableRow>
                                <StyledTableCell align="center" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa" }}>
                                  <React.Fragment>
                                    <Grid container>
                                      <Grid xs={6}>
                                        <Typography align='center' color="inherit" className='font-vsm-sm'>
                                          Department
                                        </Typography>
                                      </Grid>
                                      <Grid xs={6}>
                                        <Typography align='center' color="inherit" className='font-vsm-sm'>
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
                                        name='source_Department'
                                        onChange={handleChangeSource_Department}
                                        value={source_Department}
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
                                          size="small"
                                          options={users_pureDep}
                                          getOptionLabel={(option) => option.UserCode}
                                          filterOptions={filterOptions2}
                                          //value={UserForAssetsControl[resultIndex[0].indexOf(source)]}
                                          onChange={handleAutoSource_DeapartMent}
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
                                          disabled
                                          inputProps={{ style: { '-webkit-text-fill-color': 'rgba(0,0,0,1)' } }}
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
                                          error={valueAlert === 'กรุณากรอกข้อมูลผู้ส่ง' ? true : false}
                                          value={source}
                                          sx={{ pt: 1 }}
                                          variant="standard"
                                        />
                                        <TextField
                                          variant="standard"
                                          fullWidth
                                          autoComplete="family-name"
                                          disabled
                                          inputProps={{ style: { '-webkit-text-fill-color': 'rgba(0,0,0,1)' } }}
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
                                    )}
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
                                            <Typography color="black" className='font-vsm-sm'>
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
                      </Box>
                    </DialogContent>
                  </React.Fragment>
                )}
            <DialogActions>
              <Button variant="contained" onClick={handleCreate_NAC}>ต่อไป</Button>
              <Button variant="contained" color='error' onClick={handleClose}>ยกเลิก</Button>
            </DialogActions>
          </Dialog>
        </Box>
      </AnimatedPage>
    </React.Fragment>
  );
}