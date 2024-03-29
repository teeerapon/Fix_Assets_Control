import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import AnimatedPage from '../../../../AnimatedPage.jsx'
import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { alpha, styled } from '@mui/material/styles';
import { DataGrid, gridClasses, GridToolbar } from '@mui/x-data-grid';
import Axios from "axios"
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import ArticleIcon from '@mui/icons-material/Article';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import 'reactjs-popup/dist/index.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Paper from '@mui/material/Paper';
import LinearProgress from '@mui/material/LinearProgress';
import config from '../../../../config'
import dayjs from 'dayjs';
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterDateFns';
import DesktopDateTimePicker from '@mui/lab/DesktopDateTimePicker';
import swal from 'sweetalert';

dayjs.extend(utc);
dayjs.extend(timezone);
var dateNow = (dayjs().utc().local().format()).split('+')[0]

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

async function EditPeriodData_Update(credentials) {
  return fetch(config.http + '/update_period', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

async function DeletePeriodData(credentials) {
  return fetch(config.http + '/delete_period', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

export default function History_of_assets() {



  const [dataBranchID_Main, setDataBranchID_Main] = React.useState([]);
  const data = JSON.parse(localStorage.getItem('data'));
  const checkUserWeb = localStorage.getItem('sucurity');
  const [open, setOpen] = React.useState(false);
  const [openII, setOpenII] = React.useState(false);
  const [EditPeriodData, setEditPeriodData] = React.useState(null);
  const [editFormData, setEditFormData] = React.useState({
    PeriodID: '',
    BeginDate: '',
    EndDate: '',
    Description: '',
    BranchID: '',
    Code: ''
  });
  const [progress, setProgress] = React.useState();

  const handleClickOpen = (event, params) => {
    setOpen(true);

    setEditPeriodData(params.row.PeriodID);

    const FromValues = {
      PeriodID: params.row.PeriodID,
      BeginDate: params.row.BeginDate,
      EndDate: params.row.EndDate,
      Description: params.row.Description,
      BranchID: params.row.BranchID,
      Code: params.row.Code,
    }

    setEditFormData(FromValues);
  };

  const handleClickOpenII = (event, params) => {
    setOpenII(true);

    setEditPeriodData(params.row.PeriodID);

    const FromValues = {
      PeriodID: params.row.PeriodID,
      BeginDate: params.row.BeginDate,
      EndDate: params.row.EndDate,
      Description: params.row.Description,
      BranchID: params.row.BranchID,
      Code: params.row.Code,
    }

    setEditFormData(FromValues);
  };

  const handleCloseII = () => {
    setOpenII(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    { field: 'Description', headerName: 'คำอธิบาย', headerClassName: 'super-app-theme--header', minWidth: 170, flex: 1 },
    {
      field: 'BranchID',
      headerName: 'หน่วยงาน',
      headerClassName: 'super-app-theme--header',
      width: 100,
      valueGetter: (params) =>
        params.row.BranchID === 901 ? "HO" : "CO",
    },
    {
      field: 'personID',
      headerName: 'Location NAC',
      headerAlign: 'center',
      align: 'center',
      headerClassName: 'super-app-theme--header',
      width: 130,
      valueGetter: (params) =>
        params.row.BranchID === 901 && params.row.personID && params.row.DepCode ?
          params.row.personID :
          params.row.BranchID === 901 && params.row.DepCode && !params.row.personID ?
            params.row.DepCode :
            params.row.BranchID !== 901 && !params.row.DepCode && !params.row.personID ?
              params.row.Code : ''

    },
    {
      field: 'BeginDate',
      headerName: 'วันที่เริ่มต้น',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      align: 'center',
      minWidth: 170,
      flex: 1,
      renderCell: (params) => {
        return (
          <React.Fragment>
            {params.row.BeginDate ?
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={1}
              >
                <CalendarMonthIcon />
                <Typography variant='body2'>
                  {params.row.BeginDate}
                </Typography>
              </Stack>
              : null}
          </React.Fragment>
        )
      }
    },
    {
      field: 'EndDate',
      headerName: 'วันที่สิ้นสุด',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      align: 'center',
      minWidth: 170,
      flex: 1,
      renderCell: (params) => {
        return (
          <React.Fragment>
            {params.row.EndDate ?
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={1}
              >
                <CalendarMonthIcon />
                <Typography variant='body2'>
                  {params.row.EndDate.toLocaleString("sv-SE")}
                </Typography>
              </Stack>
              : null}
          </React.Fragment >
        )
      }
    },
    {
      field: 'status',
      headerName: 'สถานะการใช้งาน',
      headerClassName: 'super-app-theme--header',
      minWidth: 150,
      flex: 1,
      renderCell: (params) => {
        return (
          <React.Fragment>
            <Typography variant='body2' style={{ 'color': dateNow >= params.row.BeginDate && dateNow <= params.row.EndDate ? 'green' : 'red' }}>
              {dateNow >= params.row.BeginDate && dateNow <= params.row.EndDate ? 'อยู่ระหว่างเปิดใช้งาน' : 'ปิดการใช้งานแล้ว'}
            </Typography>
          </React.Fragment>
        );
      },
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 180,
      disableClickEventBubbling: true,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        return (
          <React.Fragment>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={(event) => handleClickOpen(event, params)}
                >
                  <ArticleIcon />
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  color="error"
                  onClick={(event) => handleClickOpenII(event, params)}
                >
                  <DeleteIcon />
                </Button>
              </Grid>
            </Grid>
          </React.Fragment>
        );
      }
    },
  ];

  React.useEffect(() => {
    // POST request using axios with set headers
    const userCode = { userCode: data.UserCode }
    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };
    Axios.post(config.http + '/get_branch_period', userCode, { headers }).catch(function (error) {
      if (error.toJSON().message === 'Request failed with status code 400') {
        setProgress(1)
      }
    }).then(response => {
      setDataBranchID_Main(response.data.data)
      setProgress(1)
    });
  }, []);

  const handleSubmit_Update = async () => {
    const PeriodID = editFormData.PeriodID;
    const BeginDate = editFormData.BeginDate;
    const EndDate = editFormData.EndDate;
    const Description = editFormData.Description;
    const BranchID = editFormData.BranchID;
    const response = await EditPeriodData_Update({
      PeriodID,
      BeginDate,
      EndDate,
      Description,
      BranchID,
    });
    if (response.message !== 'ไม่สามารถแก้ไขได้ เนื่องจากมีการตรวจนับทรัพย์สิน') {
      if (response['data'] !== 'มีการเปิดช่วงเวลาทับกัน') {
        swal("แจ้งเตือน", response.message, "success", { buttons: false, timer: 2000 })
          .then((value) => {
            window.location.href = "/EditPeriod";
          });
      } else {
        swal("แจ้งเตือน", response['data'], "error")
          .then((value) => {
            window.location.href = "/EditPeriod";
          });
      }
    } else {
      swal("แจ้งเตือน", response.message, "error")
        .then((value) => {
          window.location.href = "/EditPeriod";
        });
    }
    setOpen(false);
  }

  const handleSubmit_Delete = async e => {
    e.preventDefault();
    const PeriodID = editFormData.PeriodID;
    const BranchID = editFormData.BranchID;
    const response = await DeletePeriodData({
      PeriodID,
      BranchID,
    });
    if (response.message !== 'ไม่สามารถลบได้ เนื่องจากมีการตรวจนับทรัพย์สิน') {
      swal("แจ้งเตือน", 'รอบตรวจนับทรัพย์สินถูกลบแล้ว', "success", { buttons: false, timer: 2000 })
        .then((value) => {
          window.location.href = "/EditPeriod";
        });
    } else {
      swal("แจ้งเตือน", response.message, "error")
        .then((value) => {
          window.location.href = "/EditPeriod";
        });
    }
    setOpenII(false);
  }

  const handleChangeBeginDate = (newValue) => {
    const FromValues = {
      PeriodID: editFormData.PeriodID,
      BeginDate: newValue.toLocaleString("sv-SE"),
      EndDate: editFormData.EndDate,
      Description: editFormData.Description,
      BranchID: editFormData.BranchID,
      Code: editFormData.Code,
    }
    setEditFormData(FromValues);
  };

  const handleChangeEndDate = (newValue) => {
    const FromValues = {
      PeriodID: editFormData.PeriodID,
      BeginDate: editFormData.BeginDate,
      EndDate: newValue.toLocaleString("sv-SE"),
      Description: editFormData.Description,
      BranchID: editFormData.BranchID,
      Code: editFormData.Code,
    }
    setEditFormData(FromValues);
  };

  if (checkUserWeb === 'null') {
    window.location.href = '/NAC_MAIN';
  } else {
    return (
      <React.Fragment>
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
              <Typography variant="h5" color="inherit" >
                สถานะรอบตรวจนับทั้งหมด
              </Typography>
            </AnimatedPage>
          </Toolbar>
        </AppBar>
        <AnimatedPage>
          {progress !== 1 ? <React.Fragment><Box sx={{ width: '100%' }}><LinearProgress /></Box></React.Fragment> : null}
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <Container maxWidth="1000px" sx={{ pt: 3, pb: 3 }}>
              <Box
                sx={{
                  height: 667,
                  width: '100%',
                }}
              >
                <Alert variant="outlined" severity="error">
                  <Typography variant="body" color='error' sx={{ mt: 5 }}>
                    ข้อควรระวัง ไม่สามารถลงเวลาซ้ำกันได้
                  </Typography>
                </Alert>
                <StripedDataGrid
                  sx={{
                    pl: 2,
                    pr: 2,
                    mt: 2,
                    boxShadow: 1,
                    [`& .${gridClasses.cell}`]: {
                      py: 1,
                    },
                  }}
                  components={{ Toolbar: GridToolbar }}
                  componentsProps={{ toolbar: { csvOptions: { utf8WithBom: true } } }}
                  rows={dataBranchID_Main ?? []}
                  columns={columns}
                  pageSize={10}
                  getRowHeight={() => 'auto'}
                  getRowSpacing={() => 'auto'}
                  getRowId={(dataBranchID_Main) => dataBranchID_Main.PeriodID}
                  autoHeight={true}
                  disableColumnMenu
                  disableSelectionOnClick
                  {...other}
                />
              </Box>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {editFormData.Code}
                </DialogTitle>
                <DialogContent>
                  <TextField
                    id="standard-basic"
                    value={editFormData.Description}
                    onChange={(e) => setEditFormData({
                      PeriodID: editFormData.PeriodID,
                      BeginDate: editFormData.BeginDate,
                      EndDate: editFormData.EndDate,
                      Description: e.target.value,
                      BranchID: editFormData.BranchID,
                      Code: editFormData.Code,
                    })}
                    variant="standard"
                    sx={{ pb: 3 }}
                    fullWidth
                  />
                  <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6}>
                      <LocalizationProvider dateAdapter={DateAdapter}>
                        <DesktopDateTimePicker
                          value={editFormData.BeginDate}
                          onChange={handleChangeBeginDate}
                          timezone={dayjs.tz.guess()}
                          inputFormat="yyyy-MM-dd HH:mm:ss"
                          ampm={false}
                          renderInput={(params) =>
                            <TextField
                              fullWidth
                              focused
                              name="BeginDate"
                              autoComplete="family-name"
                              variant="standard"
                              {...params} />}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={6}>
                      <LocalizationProvider dateAdapter={DateAdapter}>
                        <DesktopDateTimePicker
                          value={editFormData.EndDate}
                          onChange={handleChangeEndDate}
                          timezone={dayjs.tz.guess()}
                          inputFormat="yyyy-MM-dd HH:mm:ss"
                          ampm={false}
                          renderInput={(params) =>
                            <TextField
                              fullWidth
                              focused
                              name="EndDate"
                              autoComplete="family-name"
                              variant="standard"
                              {...params} />}
                        />
                      </LocalizationProvider>
                    </Grid>
                  </Grid>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleSubmit_Update} variant='contained'>Submit</Button>
                  <Button onClick={handleClose} variant='contained' color='error' autoFocus>
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog>
              <Dialog
                open={openII}
                onClose={handleCloseII}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"แจ้งเตือน"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    ท่านแน่ใจที่จะลบรอบตรวจนับทรัพย์สินของ {editFormData.Code === 'CO' ? 'HO' : editFormData.Code} ใช่หรือไม่ ?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    variant="contained"
                    onClick={handleSubmit_Delete}
                    sx={{ p: 0.8, pb: 0.5, pt: 0.5 }}
                  >ใช่
                  </Button>
                  <Button
                    variant="contained"
                    color='error'
                    sx={{ p: 0.8, pb: 0.5, pt: 0.5 }}
                    onClick={handleCloseII} autoFocus
                  >
                    ไม่
                  </Button>
                </DialogActions>
              </Dialog>
            </Container>
          </Box>
        </AnimatedPage>
      </React.Fragment>
    );
  }
}