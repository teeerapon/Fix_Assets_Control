import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import AnimatedPage from '../../../../AnimatedPage.jsx'
import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import { alpha, styled } from '@mui/material/styles';
import { DataGrid, gridClasses, GridToolbar } from '@mui/x-data-grid';
import Axios from "axios"
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import ArticleIcon from '@mui/icons-material/Article';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import 'reactjs-popup/dist/index.css';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import swal from 'sweetalert';

const ODD_OPACITY = 0.2;

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
  return fetch('http://vpnptec.dyndns.org:32001/api/update_period', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

async function DeletePeriodData(credentials) {
  return fetch('http://vpnptec.dyndns.org:32001/api/delete_period', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

export default function History_of_assets() {

  // ใช้สำหรับสร้างเวลาปัจจุบัน
  const d = new Date();
  const year = (d.getFullYear()).toString();
  const month = ((d.getMonth()) + 101).toString().slice(-2);
  const date = ((d.getDate()) + 100).toString().slice(-2);
  const hours = ((d.getHours()) + 100).toString().slice(-2);
  const mins = ((d.getMinutes()) + 100).toString().slice(-2);
  const seconds = ((d.getSeconds()) + 100).toString().slice(-2);
  const datenow = `${year}-${month}-${date}T${hours}:${mins}:${seconds}.000Z`;

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
  console.log(editFormData)

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
    { field: 'Description', headerName: 'คำอธิบาย', headerClassName: 'super-app-theme--header', flex: 1 },
    {
      field: 'BeginDate',
      headerName: 'วันที่เริ่มต้น',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      align: 'center',
      flex: 1,
      valueGetter: (params) =>
        `${!params.row.BeginDate ? '' : params.row.BeginDate.split('T')[0] || ''} ${!params.row.BeginDate ? '' : '00:00' || ''}`,
    },
    {
      field: 'EndDate',
      headerName: 'วันที่สิ้นสุด',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      align: 'center',
      flex: 1,
      valueGetter: (params) =>
        `${!params.row.EndDate ? '' : params.row.EndDate.split('T')[0] || ''} ${!params.row.EndDate ? '' : '00:00' || ''}`,
    },
    {
      field: 'Code',
      headerName: 'สาขา',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      align: 'center',
      width: 100,
      valueGetter: (params) =>
        `${params.row.Code || ''}`,
    },
    {
      field: 'status',
      headerName: 'สถานะการใช้งาน',
      headerClassName: 'super-app-theme--header',
      flex: 1,
      renderCell: (params) => {
        return (
          <React.Fragment>
            <Typography variant='body2' style={{ 'color': datenow >= params.row.BeginDate && datenow <= params.row.EndDate ? 'green' : 'red' }}>
              {datenow >= params.row.BeginDate && datenow <= params.row.EndDate ? 'อยู่ระหว่างเปิดใช้งาน' : 'ปิดการใช้งานแล้ว'}
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
    Axios.post('http://vpnptec.dyndns.org:32001/api/get_branch_period', userCode, { headers })
      .then(response => setDataBranchID_Main(response.data.data));
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
        swal("ทำรายการสำเร็จ", response.message, "success", {
          buttons: false,
          timer: 2000,
        })
          .then((value) => {
            window.location.href = "/EditPeriod";
          });
      } else {
        swal("ทำรายการไม่สำเร็จ", response['data'], "error")
          .then((value) => {
            window.location.href = "/EditPeriod";
          });
      }
    } else {
      swal("ทำรายการไม่สำเร็จ", response.message, "error")
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
      swal("ทำรายการสำเร็จ", 'รอบตรวจนับทรัพย์สินถูกลบแล้ว', "success", {
        buttons: false,
        timer: 2000,
      })
        .then((value) => {
          window.location.href = "/EditPeriod";
        });
    } else {
      swal("ทำรายการไม่สำเร็จ", response.message, "error")
        .then((value) => {
          window.location.href = "/EditPeriod";
        });
    }
    setOpenII(false);
  }

  const handleChangeBeginDate = (newValue) => {
    const FromValues = {
      PeriodID: editFormData.PeriodID,
      BeginDate: newValue,
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
      EndDate: newValue,
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
              <Typography variant="h5" color="inherit" noWrap>
                สถานะรอบตรวจนับทั้งหมด
              </Typography>
            </AnimatedPage>
          </Toolbar>
        </AppBar>
        <AnimatedPage>
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <Container maxWidth="1000px" sx={{ pt: 3 }}>
              <Box
                sx={{
                  height: 480,
                  width: '100%',
                }}
              >
                <StripedDataGrid
                  sx={{
                    mt: 3,
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
                  rows={!dataBranchID_Main ? [] : dataBranchID_Main}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  getRowId={(dataBranchID_Main) => dataBranchID_Main.PeriodID}
                  autoHeight={true}
                  disableColumnMenu
                  getRowClassName={(params) =>
                    params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                  }
                  disableSelectionOnClick
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
                    variant="standard"
                    sx={{ pb: 3 }}
                    fullWidth
                  />
                  <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6}>
                      <LocalizationProvider dateAdapter={DateAdapter}>
                        <DatePicker
                          value={editFormData.BeginDate}
                          inputFormat="yyyy-MM-dd 00:00"
                          onChange={handleChangeBeginDate}
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
                        <DatePicker
                          value={editFormData.EndDate}
                          inputFormat="yyyy-MM-dd 00:00"
                          onChange={handleChangeEndDate}
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
                    ท่านแน่ใจที่จะลบรอบตรวจนับทรัพย์สินของ {editFormData.Code} ใช่หรือไม่ ?
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