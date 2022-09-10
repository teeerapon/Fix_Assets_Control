import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AnimatedPage from "../../../AnimatedPage.jsx";
import AppBar from '@mui/material/AppBar';
import Table from '@mui/material/Table';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/NoteAdd';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import Stack from '@mui/material/Stack';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { useTheme, styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import NativeSelect from '@mui/material/NativeSelect';
import Axios from "axios"
import InputAdornment from '@mui/material/InputAdornment';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import FormGroup from '@mui/material/FormGroup';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'Code',
    numeric: false,
    disablePadding: false,
    label: 'รหัสทรัพย์สิน',
  },
  {
    id: 'Name',
    numeric: false,
    disablePadding: false,
    label: 'ชื่อทรัพย์สิน',
  },
  {
    id: 'Date',
    numeric: false,
    disablePadding: false,
    label: 'วันที่ตรวจนับ',
  },
  {
    id: 'UserID',
    numeric: false,
    disablePadding: false,
    label: 'ผู้ตรวจนับ',
  },
  {
    id: 'detail',
    numeric: false,
    disablePadding: false,
    label: 'สถานะล่าสุด',
  },
  {
    id: 'Reference',
    numeric: false,
    disablePadding: false,
    label: 'สถานะครั้งนี้',
  },
  {
    id: 'remark',
    numeric: false,
    disablePadding: false,
    label: 'หมายเหตุ',
  },
];

function EnhancedTableHead(props) {

  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, style } =
    props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead >
      <TableRow>
        <TableCell padding="checkbox" style={style}>
          <Checkbox
            style={style}
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            style={style}
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              style={style}
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  style: PropTypes.string.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

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

const EnhancedTableToolbar = (props) => {

  // ใช้สำหรับสร้างเวลาปัจจุบัน
  const d = new Date();
  const year = (d.getFullYear()).toString();
  const month = ((d.getMonth()) + 101).toString().slice(-2);
  const date = ((d.getDate()) + 100).toString().slice(-2);
  const hours = ((d.getHours()) + 100).toString().slice(-2);
  const mins = ((d.getMinutes()) + 100).toString().slice(-2);
  const seconds = ((d.getSeconds()) + 100).toString().slice(-2);
  const datenow = `${year}-${month}-${date}T${hours}:${mins}:${seconds}.000Z`;

  const { numSelected } = props;
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState();
  const data = JSON.parse(localStorage.getItem('data'));
  const dataDepID = data.depid
  const [UserForAssetsControl, setUserForAssetsControl] = React.useState([]);
  const [users_pureDep, setUsers_pureDep] = React.useState([]);

  const [des_Department, setDes_Department] = React.useState();
  const [des_BU, setDes_BU] = React.useState();
  const [des_delivery, setDes_delivery] = React.useState();
  const [source_Department, setSource_Department] = React.useState(data.branchid === 901 ? null : 'ROD');
  const [source_BU, setSource_BU] = React.useState(data.branchid === 901 ? null : 'Oil');
  const [source, setSource] = React.useState(data.branchid === 901 ? null : data.UserCode);
  const [source_Description, setSource_Description] = React.useState();
  const [alert, setAlert] = React.useState(false);
  const [valueAlert, setValueAlert] = React.useState(false);

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
  //Source

  const handleChangeSource_Department = (event) => {
    event.preventDefault();
    if (data.branchid !== 901) {
      setSource_Department('ROD');
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

  const handleAutoDes_DeapartMent = async (e) => {
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
        if (response.data[0].branchid !== 901) {
          setDes_BU('Oil')
        } else {
          setDes_BU('Center')
        }
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setValue(0)
      setOpen(false);
      setDes_Department(null)
      setDes_BU(null)
      setDes_delivery(null)
      setSource_Department(null)
      setSource_BU(null)
      setSource(null)
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
      if (!source || !source_Department || !source_BU) {
        const alert_value = !source ? 'กรุณากรอกข้อมูลผู้ส่ง' : !source_Department ? 'กรุณากรอกข้อมูลแผนกของผู้ส่ง' : 'กรุณากรอกวันที่ของผู้ส่ง'
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
          des_deliveryDate,
          source_Department,
          source_BU,
          source,
          sourceDate,
          des_Description,
          source_Description,
          sumPrice,
        });
        if ('data' in response) {
          for (let i = 0; i < numSelected.length; i++) {
            const nac_code = response.data[0].nac_code // ได้จาก Response ของ Store_FA_control_create_doc
            const nacdtl_row = i
            const nacdtl_assetsCode = numSelected[i]
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
      if (!source || !source_Department || !source_BU) {
        const alert_value = !source ? 'กรุณากรอกข้อมูลผู้ส่ง' : !source_Department ? 'กรุณากรอกข้อมูลแผนกของผู้ส่ง' : 'กรุณากรอกวันที่ของผู้ส่ง'
        setAlert(true);
        setValueAlert(alert_value)
      } else if (!des_Department || !des_BU || !des_delivery) {
        const alert_value = !des_delivery ? 'กรุณากรอกข้อมูลผู้รับ' : !des_Department ? 'กรุณากรอกข้อมูลแผนกของผู้รับ' : 'กรุณากรอกวันที่ของผู้รับ'
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
          des_deliveryDate,
          source_Department,
          source_BU,
          source,
          sourceDate,
          des_Description,
          source_Description,
          sumPrice,
        });
        if ('data' in response) {
          for (let i = 0; i < numSelected.length; i++) {
            const nac_code = response.data[0].nac_code // ได้จาก Response ของ Store_FA_control_create_doc
            const nacdtl_row = i
            const nacdtl_assetsCode = numSelected[i]
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

  return (
    <React.Fragment>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar align="center" open={alert} autoHideDuration={4500} onClose={handleCloseAlert}>
          <Alert onClose={handleCloseAlert} severity="warning" sx={{ width: '100%' }}>
            {valueAlert}
          </Alert>
        </Snackbar>
      </Stack>
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected.length > 0 && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
          }),
        }}
      >
        {numSelected.length > 0 ? (
          <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected.length} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Nutrition
          </Typography>
        )}

        {numSelected.length > 0 ? (
          <React.Fragment>
            <Typography
              sx={{ flex: '11%', color: 'black', pt: 0.5 }}
              variant="subtitle1"
              component="div"
            >
              สร้างรายการ NAC
            </Typography>
            <Tooltip title="สร้างรายการ">
              <IconButton onClick={handleClickOpen}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
              <Stack
                sx={{ mt: 3, p: 2, pb: 0 }}
                direction="row"
                justifyContent="flex-start"
                spacing={2}
              >
                <DialogTitle>กรุณาเลือกประเภทรายการ</DialogTitle>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel variant="standard" htmlFor="demo-dialog-native"></InputLabel>
                  <NativeSelect
                    defaultValue={[]}
                    onChange={handleChange}
                    inputProps={{
                      name: 'age',
                      id: 'uncontrolled-native',
                    }}
                  >
                    <option value={0}>None</option>
                    <option value={2}>โยกย้ายทรัพย์สิน</option>
                    <option value={3}>เปลี่ยนแปลงรายละเอียดทรัพย์สิน</option>
                    <option value={4}>ตัดจากบัญชีทรัพย์สินถาวร</option>
                    <option value={5}>ขายทรัพย์สิน</option>
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
                                <StyledTableCell align="center" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa", width: '30%' }}>หน่วยงานที่ส่งมอบ</StyledTableCell>
                                <StyledTableCell align="center" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa", width: '30%' }}>หน่วยงานที่รับมอบ</StyledTableCell>
                              </TableRow>
                            </TableHead>
                            <React.Fragment>
                              <TableBody>
                                <StyledTableRow>
                                  <StyledTableCell align="center" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa" }}>
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
                                          name='source_Department'
                                          onChange={handleChangeSource_Department}
                                          value={source_Department}
                                          inputProps={{ style: { '-webkit-text-fill-color': 'rgba(0,0,0,1)', textAlign: 'center' } }}
                                          variant="standard"
                                        />
                                        <TextField
                                          required
                                          fullWidth
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
                                              <TextField
                                                {...params}
                                                variant="standard"
                                                label='ผู้ส่งมอบ'
                                                fullWidth
                                                autoComplete="family-name"
                                                sx={{ pt: 1 }}
                                              />
                                            )}
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
                                        renderInput={(params) =>
                                          <TextField
                                            fullWidth
                                            autoComplete="family-name"
                                            onChange={handleChangeDes_delivery2}
                                            value={des_delivery}
                                            sx={{ pt: 1 }}
                                            variant="standard"
                                            label='ผู้รับมอบ'
                                            {...params}
                                          />}
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
                                <StyledTableCell align="center" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa", width: '30%' }}>หน่วยงานที่ส่งมอบ</StyledTableCell>
                                <StyledTableCell align="center" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa", width: '30%' }}>หน่วยงานที่รับมอบ</StyledTableCell>
                              </TableRow>
                            </TableHead>
                            <React.Fragment>
                              <TableBody>
                                <StyledTableRow>
                                  <StyledTableCell align="center" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa" }}>
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
                                          name='source_Department'
                                          onChange={handleChangeSource_Department}
                                          value={source_Department}
                                          inputProps={{ style: { '-webkit-text-fill-color': 'rgba(0,0,0,1)', textAlign: 'center' } }}
                                          variant="standard"
                                        />
                                        <TextField
                                          required
                                          fullWidth
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
                                              <TextField
                                                {...params}
                                                variant="standard"
                                                label='ผู้ส่งมอบ'
                                                fullWidth
                                                autoComplete="family-name"
                                                sx={{ pt: 1 }}
                                              />
                                            )}
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
                        </Box>
                      </DialogContent>
                    </React.Fragment>
                  )}
              <DialogActions>
                <Button variant="contained" onClick={handleCreate_NAC}>ต่อไป</Button>
                <Button variant="contained" color='error' onClick={handleClose}>ยกเลิก</Button>
              </DialogActions>
            </Dialog>
          </React.Fragment>
        ) : (
          <Tooltip title="Filter list">
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    </React.Fragment>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.string.isRequired,
};

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

export default function EnhancedTable() {

  const AssetsAll = JSON.parse(localStorage.getItem('Allaseets'));
  const aseetsCounted = JSON.parse(localStorage.getItem('aseetsCounted'));
  const assetsWrong = JSON.parse(localStorage.getItem('assetsWrong'));
  const [sumArray_assets, setSumArray_assets] = React.useState()
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [forcheckAssetCount, setForcheckAssetCount] = React.useState()
  const [forcheckAssetWrong, setForcheckAssetWrong] = React.useState()
  const [alert, setAlert] = React.useState(false);
  const [valueAlert, setValueAlert] = React.useState(false);


  const rows = !sumArray_assets ? [] : sumArray_assets
  const sum_Array = () => {
    const sum_assets = []
    const forCheckAsset = []
    const forcheckAssetWrong = []
    aseetsCounted.map((res) => {
      return sum_assets.unshift(res) && forCheckAsset.unshift(res.Code);
    })
    assetsWrong.map((res) => {
      return sum_assets.unshift(res) && forcheckAssetWrong.unshift(res.Code);
    })
    AssetsAll.map((res) => {
      return sum_assets.unshift(res);
    })
    setSumArray_assets(sum_assets.reverse())
    setForcheckAssetCount(forCheckAsset)
    setForcheckAssetWrong(forcheckAssetWrong)
  }

  React.useEffect(() => {
    sum_Array();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.Code);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = async (event, Code) => {
    const nacdtl_assetsCode = Code
    const responseCheckAssetCode_Process = await store_FA_control_CheckAssetCode_Process({
      nacdtl_assetsCode
    })
    console.log(responseCheckAssetCode_Process);
    if (responseCheckAssetCode_Process.data[0].checkProcess === 'false') {
      const alert_value = 'ทรัพย์สินนี้กำลังอยู่ในระหว่างการทำรายการ'
      setAlert(true);
      setValueAlert(alert_value)
    } else {
      const selectedIndex = selected.indexOf(Code);
      let newSelected = [];
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, Code);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
        );
      }
      setSelected(newSelected);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (Code) => selected.indexOf(Code) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlert(false);
  };

  return (
    <div>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={alert} autoHideDuration={4500} onClose={handleCloseAlert}>
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
            <Typography variant="h5" color="inherit" noWrap>
              รายการการตรวจนับทรัพย์สินทั้งหมดของสาขาที่ {!AssetsAll ? 'Loading...' :
                !aseetsCounted ? 'Loading...' :
                  !assetsWrong ? 'Loading...' :
                    !sumArray_assets ? 'Loading...' : sumArray_assets[0].BranchID}
            </Typography>
          </AnimatedPage>
        </Toolbar>
      </AppBar>
      <AnimatedPage>
        <Container maxWidth="1000px" sx={{ pt: 3 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            spacing={2}
          >
            <Card
              sx={{ minWidth: 275 }}
              style={{
                'cursor': 'pointer',
                'flex': 1,
                'margin': '0px 20px',
                'padding': '15px',
                'border-radius': '10px',
              }}
            >
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  รวมทรัพย์สินที่ตรวจนับแล้ว
                </Typography>
                <Typography variant="h5" component="div" style={{ color: 'green' }}>
                  <b>{!aseetsCounted ? 0 : aseetsCounted.length} รายการ</b>
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
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  รวมทรัพย์สินที่คงเหลือ
                </Typography>
                <Typography variant="h5" component="div" style={{ color: 'red' }}>
                  <b>{!AssetsAll ? 0 : AssetsAll.length} รายการ</b>
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
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  ทรัพย์สินสาขาอื่น ๆ
                </Typography>
                <Typography variant="h5" component="div" style={{ color: 'orange' }}>
                  <b>{!assetsWrong ? 0 : assetsWrong.length} รายการ</b>
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
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  ทรัพย์สินทั้งหมด
                </Typography>
                <Typography variant="h5" component="div" style={{ color: 'blue' }}>
                  <b>{!sumArray_assets ? 0 : sumArray_assets.length} รายการ</b>
                </Typography>
              </CardContent>
            </Card>
          </Stack>
          <Stack direction="row" justifyContent="space-between" sx={{ pt: 5 }}>
            <FormControlLabel
              control={<Switch checked={dense} onChange={handleChangeDense} />}
              label="Dense padding"
            />
            <ReactHTMLTableToExcel
              id="test-table-xls-button"
              table="table-to-xls1"
              className="download-table-xls-button btn btn-success mb-1"
              filename="AssetsAllReported"
              sheet="AssetsAllReported"
              buttonText="Export to Excel (รายการทั้งหมด)" />
          </Stack>
          <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 } }}>
            <EnhancedTableToolbar numSelected={selected} />
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 750 }}
                aria-label="customized table"
                size={dense ? 'small' : 'medium'}
                id="table-to-xls1"
              >
                <EnhancedTableHead
                  style={{ backgroundColor: 'black', color: 'white' }}
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                />
                <TableBody>
                  {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                  {stableSort(rows, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = isSelected(row.Code);
                      const labelId = `enhanced-table-checkbox-${index}`;
                      return (
                        <TableRow
                          hover
                          onClick={(event) => handleClick(event, row.Code)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.Code}
                          selected={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                              inputProps={{
                                'aria-labelledby': labelId,
                              }}
                            />
                          </TableCell>
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                            align="left"
                            style={{ 'maxWidth': 'fit-content' }}
                          >
                            {row.Code}
                          </TableCell>
                          {/* <TableCell align="left" style={{ 'maxWidth': 'fit-content' }}>{row.Code}</TableCell> */}
                          <TableCell align="left" style={{ 'maxWidth': 'fit-content' }}>{row.Name}</TableCell>
                          <TableCell align="left" style={{ 'maxWidth': 'fit-content' }}>{!row.Date ? '' : row.Date.split('T')[0]}</TableCell>
                          <TableCell align="left" style={{ 'maxWidth': 'fit-content' }}>{row.UserID}</TableCell>
                          <TableCell align="left" style={{ 'maxWidth': 'fit-content' }}>{row.detail}</TableCell>
                          <TableCell align="left" style={{ 'maxWidth': 'fit-content' }}>{row.Reference}</TableCell>
                          <TableCell align="left" style={{
                            'backgroundColor': forcheckAssetCount.includes(row.Code) === true ? 'green' :
                              forcheckAssetWrong.includes(row.Code) === true ? 'orange' : 'red'
                            , 'color': 'white'
                          }}>
                            {
                              forcheckAssetCount.includes(row.Code) === true ? 'รายการนับแล้ว' :
                                forcheckAssetWrong.includes(row.Code) === true ? 'สาขาอื่น' : 'ยังไม่ได้นับ'
                            }
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {
                    (stableSort(rows, getComparator(order, orderBy))
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .length) === rows.length ?
                      <React.Fragment>
                        <TableRow>
                          <TableCell colSpan={6}>
                            รวม รายการตรวจนับแล้ว
                          </TableCell>
                          <TableCell>
                            {!aseetsCounted ? 0 : aseetsCounted.length}
                          </TableCell>
                          <TableCell>
                            รายการ
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={6}>
                            รวม รายการคงเหลือ
                          </TableCell>
                          <TableCell>
                            {!AssetsAll ? 0 : AssetsAll.length}
                          </TableCell>
                          <TableCell>
                            รายการ
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={6}>
                            รวม รายการที่ตรวจนับแล้ว (สาขาอื่น ๆ)
                          </TableCell>
                          <TableCell>
                            {!assetsWrong ? 0 : assetsWrong.length}
                          </TableCell>
                          <TableCell>
                            รายการ
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={6}>
                            รวม รายการทั้งหมด
                          </TableCell>
                          <TableCell>
                            {!sumArray_assets ? 0 : sumArray_assets.length}
                          </TableCell>
                          <TableCell>
                            รายการ
                          </TableCell>
                        </TableRow>
                      </React.Fragment>
                      : null}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: (dense ? 33 : 53) * emptyRows,
                      }}
                    >
                      <TableCell colSpan={8} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              <Table sx={{ minWidth: 750 }} aria-label="customized table" id="table-to-xls1">
                <TablePagination
                  component="div"
                  labelRowsPerPage={''}
                  rowsPerPageOptions={[10, 25, 50, { label: "ทั้งหมด", value: rows.length }]}
                  colSpan={3}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </Table>
            </TableContainer>
          </Paper>
        </Container>
      </AnimatedPage>
      <div className='pt-3'></div>
    </div>
  );
}
