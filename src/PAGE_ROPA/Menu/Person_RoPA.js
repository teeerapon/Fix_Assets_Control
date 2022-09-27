import * as React from 'react';
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridValueGetterParams,
  gridClasses,
  GridApi,
  GridCellValue,
  GridCellParams,
} from '@mui/x-data-grid';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import AnimatedPage from '../../AnimatedPage.jsx'
import Box from '@mui/material/Box';
import logoPure from '../../image/Picture1.png'
import { alpha, styled, Theme, useTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import ArticleIcon from '@mui/icons-material/Article';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import { Switch } from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PersonAddAlt1 from '@mui/icons-material/PersonAddAlt1';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Axios from "axios"
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import AddIcon from '@mui/icons-material/Add';

const ODD_OPACITY = 0.2;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  '.css-1knaqv7-MuiButtonBase-root-MuiButton-root': {
    color: 'rgba(0, 0, 0, 1)',
  },
  '.css-f3jnds-MuiDataGrid-columnHeaders': {
    backgroundColor: 'rgba(0, 0, 0, 1)',
    color: 'rgba(255, 255, 255, 1)',
  },
  '.css-1s0hp0k-MuiDataGrid-columnHeadersInner': {
    backgroundColor: 'rgba(0, 0, 0, 1)',
    color: 'rgba(255, 255, 255, 1)',
    '.css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root': {
      color: 'rgba(255, 255, 255, 1)',
      display: 'none'
    },
    '.css-1pe4mpk-MuiButtonBase-root-MuiIconButton-root': {
      display: 'none'
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

export default function Permission_to_RoPA() {

  const [ropa_List, setRopa_List] = React.useState();
  const [ropa_type, setRopa_type] = React.useState();
  const [openII, setOpenII] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [serviceList, setServiceList] = React.useState([{ Ropa_ID: "", Depcode: "", DataItem_Name: "", Ropa_Type: "", Data_Subject: "", Step: "", Last_Review: "", allowner: "", allaccess: "" }]);
  const allowner = !serviceList.allowner ? [] : serviceList.allowner.split(",");
  const allaccess = !serviceList.allaccess ? [] : serviceList.allaccess.split(",");

  const handleDelete = () => {
    alert('You clicked the delete icon.');
  };

  const handleClickOpenII = (event, params) => {
    setOpenII(true);

    const FromValues = {
      Ropa_ID: params.row.Ropa_ID,
      Depcode: params.row.Depcode,
      DataItem_Name: params.row.DataItem_Name,
      Ropa_Type: params.row.Ropa_Type,
      Data_Subject: params.row.Data_Subject,
      Step: params.row.Step,
      Last_Review: params.row.Last_Review,
      allowner: params.row.allowner,
      allaccess: params.row.allaccess
    }

    setServiceList(FromValues);
  }

  const handleCloseII = () => {
    setOpenII(false);
  };

  const handleClickOpen = (event, params) => {
    setOpen(true);

    const FromValues = {
      Ropa_ID: params.row.Ropa_ID,
      Depcode: params.row.Depcode,
      DataItem_Name: params.row.DataItem_Name,
      Ropa_Type: params.row.Ropa_Type,
      Data_Subject: params.row.Data_Subject,
      Step: params.row.Step,
      Last_Review: params.row.Last_Review,
      allowner: params.row.allowner,
      allaccess: params.row.allaccess
    }

    setServiceList(FromValues);

    const ropaType_ID = { RopaType_ID: params.row.Ropa_ID }
    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };

    Axios.post('http://192.168.220.1:32001/api/Ropa_List_By_ID', ropaType_ID, { headers })
      .then(response => setRopa_type(response.data.data));
  }


  const handleClose = () => {
    setOpen(false);
  };

  const handleRopa_Save_Update = () => {
    setOpen(false);
  };

  const handleChangeValue_DataItem_Name = (event) => {
    event.preventDefault();
    const FromValues = {
      Ropa_ID: serviceList.Ropa_ID,
      Depcode: serviceList.Depcode,
      DataItem_Name: event.target.value,
      Ropa_Type: serviceList.Ropa_Type,
      Data_Subject: serviceList.Data_Subject,
      Step: serviceList.Step,
      Last_Review: serviceList.Last_Review,
      allowner: serviceList.allowner,
      allaccess: serviceList.allaccess
    }

    setServiceList(FromValues);
  };

  const handleChangeValue_Data_Subject = (event) => {
    event.preventDefault();
    const FromValues = {
      Ropa_ID: serviceList.Ropa_ID,
      Depcode: serviceList.Depcode,
      DataItem_Name: serviceList.DataItem_Name,
      Ropa_Type: serviceList.Ropa_Type,
      Data_Subject: event.target.value,
      Step: serviceList.Step,
      Last_Review: serviceList.Last_Review,
      allowner: serviceList.allowner,
      allaccess: serviceList.allaccess
    }

    setServiceList(FromValues);
  };

  const handleChangeValue_Step = (event) => {
    event.preventDefault();
    const FromValues = {
      Ropa_ID: serviceList.Ropa_ID,
      Depcode: serviceList.Depcode,
      DataItem_Name: serviceList.DataItem_Name,
      Ropa_Type: serviceList.Ropa_Type,
      Data_Subject: serviceList.Data_Subject,
      Step: event.target.value,
      Last_Review: serviceList.Last_Review,
      allowner: serviceList.allowner,
      allaccess: serviceList.allaccess
    }

    setServiceList(FromValues);
  };

  React.useEffect(() => {
    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };
    Axios.get('http://192.168.220.1:32001/api/Ropa_List', { headers })
      .then(response => setRopa_List(response.data));
  }, []);

  const columns: GridColDef[] = [
    {
      field: 'Ropa_ID',
      headerName: 'ID',
      headerClassName: 'super-app-theme--header',
      width: 80,
      hide: true,
    },
    {
      field: 'Depcode',
      headerName: 'DepCode',
      headerClassName: 'super-app-theme--header',
      width: 80,
    },
    {
      field: 'DataItem_Name',
      headerName: 'ชือหัวข้อ',
      headerClassName: 'super-app-theme--header',
      flex: 1,
    },
    {
      field: 'Ropa_Type',
      headerName: 'ประเภทข้อมูล',
      headerClassName: 'super-app-theme--header',
      flex: 1,
    },
    {
      field: 'Data_Subject',
      headerName: 'กลุ่มเป้าหมาย',
      headerClassName: 'super-app-theme--header',
      flex: 1,
    },
    {
      field: 'Step',
      headerName: 'ขั้นตอนในการรักษา',
      headerClassName: 'super-app-theme--header',
      flex: 1,
    },
    {
      field: 'allowner',
      headerName: 'ผู้รับผิดชอบ',
      headerAlign: 'center',
      align: 'center',
      headerClassName: 'super-app-theme--header',
      flex: 1,
    },
    {
      field: 'allaccess',
      headerName: 'ผู้ที่มีสิทธิ์',
      headerAlign: 'center',
      align: 'center',
      headerClassName: 'super-app-theme--header',
      flex: 1,
    },
    {
      field: 'Last_Review',
      headerName: 'วันที่ล่าสุดที่ประมวลผล',
      type: 'dateTime',
      headerClassName: 'super-app-theme--header',
      flex: 1,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      align: 'center',
      headerAlign: 'center',
      disableClickEventBubbling: true,
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
                  disabled
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
              สิทธิ์เข้าถึงข้อมูล
            </Typography>
          </AnimatedPage>
        </Toolbar>
      </AppBar>
      <AnimatedPage>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '45vh',
          }}
        >
          <CssBaseline />
          <Container component="main" sx={{ mt: 3, mb: 0 }} maxWidth="1000px">
            <Box
              sx={{
                height: 480,
                width: '100%',
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <div role="presentation">
                  <Breadcrumbs aria-label="breadcrumb">
                    <Chip variant="outlined" label="สิทธิ์เข้าถึงข้อมูล" />
                    <Chip variant="outlined" label="รายชื่อผู้มีสิทธิ์" color="primary" />
                  </Breadcrumbs>
                </div>
                <Button
                  size="small"
                  variant="contained"
                  color='secondary'
                  startIcon={<AddIcon size="small" />}
                >
                  Add Main
                </Button>
              </Stack>
              <StripedDataGrid
                sx={{
                  mt: 1,
                  pl: 2,
                  pr: 2,
                  pt: 2,
                  boxShadow: 1,
                  [`& .${gridClasses.cell}`]: {
                    py: 1,
                  },
                }}
                components={{ Toolbar: GridToolbar }}
                rows={!ropa_List ? [] : ropa_List}
                columns={columns}
                getRowHeight={() => 'auto'}
                getRowId={(ropa_List) => ropa_List.Ropa_ID}
                pageSize={5}
                autoHeight={true}
                rowsPerPageOptions={[5]}
                disableColumnMenu
                disableSelectionOnClick
              />
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"แก้ไขข้อมูลหลัก"}
                </DialogTitle>
                <DialogContent>
                  <FormControl variant="standard" fullWidth>
                    <InputLabel id="demo-simple-select-standard-label">Dep Code</InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      label="Dep Code"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>HRM</MenuItem>
                      <MenuItem value={20}>ITO</MenuItem>
                      <MenuItem value={30}>ROD</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    required
                    fullWidth
                    value={serviceList.DataItem_Name}
                    onChange={handleChangeValue_DataItem_Name}
                    name='DataItem_Name'
                    sx={{ pt: 1 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Typography color="black">
                            ชือหัวข้อ :
                          </Typography>
                        </InputAdornment>
                      ),
                    }}
                    variant="standard"
                  />
                  <TextField
                    required
                    fullWidth
                    sx={{ pt: 1 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Typography color="black" sx={{ mb: 1 }}>
                            ประเภทข้อมูล :
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 0.5, m: 1, mt: 0 }}>
                            {(!ropa_type ? [] : ropa_type).map((ropa_type) => (
                              <Chip key={ropa_type.RopaType_Name} label={ropa_type.RopaType_Name} onDelete={handleDelete} />
                            ))}
                          </Box>
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <IconButton aria-label="upload picture" component="label">
                          <AddIcon />
                        </IconButton>
                      ),
                    }}
                    variant="standard"
                  />
                  <TextField
                    required
                    fullWidth
                    value={serviceList.Data_Subject}
                    onChange={handleChangeValue_Data_Subject}
                    name='Data_Subject'
                    sx={{ pt: 1 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Typography color="black">
                            กลุ่มเป้าหมาย :
                          </Typography>
                        </InputAdornment>
                      ),
                    }}
                    variant="standard"
                  />
                  <TextField
                    required
                    fullWidth
                    value={serviceList.Step}
                    onChange={handleChangeValue_Step}
                    name='Step'
                    sx={{ pt: 1 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Typography color="black">
                            ขั้นตอนในการรักษา :
                          </Typography>
                        </InputAdornment>
                      ),
                    }}
                    variant="standard"
                  />
                  <TextField
                    required
                    fullWidth
                    name='allowner'
                    sx={{ pt: 1 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Typography color="black" sx={{ mb: 1 }}>
                            ผู้รับผิดชอบ :
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 0.5, m: 1, mt: 0 }}>
                            {allowner.map((allowner) => (
                              <Chip key={allowner} label={allowner} onDelete={handleDelete} />
                            ))}
                          </Box>
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <IconButton aria-label="upload picture" component="label">
                          <AddIcon />
                        </IconButton>
                      ),
                    }}
                    variant="standard"
                  />
                  <TextField
                    required
                    fullWidth
                    name='allaccess'
                    sx={{ pt: 1 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Typography color="black" sx={{ mb: 1 }}>
                            ผู้ที่มีสิทธิ์ :
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 0.5, m: 1, mt: 0 }}>
                            {allaccess.map((allaccess) => (
                              <Chip key={allaccess} label={allaccess} onDelete={handleDelete} />
                            ))}
                          </Box>
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <IconButton aria-label="upload picture" component="label">
                          <AddIcon />
                        </IconButton>
                      ),
                    }}
                    variant="standard"
                  />
                </DialogContent>
                <DialogActions>
                  <Button
                    variant="contained"
                    onClick={handleRopa_Save_Update}
                    sx={{ p: 0.8, pb: 0.5, pt: 0.5 }}
                  >ใช่
                  </Button>
                  <Button
                    variant="contained"
                    color='error'
                    sx={{ p: 0.8, pb: 0.5, pt: 0.5 }}
                    onClick={handleClose} autoFocus
                  >
                    ไม่
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
                    คุณต้องการที่จะลบหัวข้อ <b>{!serviceList ? '' : serviceList.DataItem_Name}</b> นี้ใช่หรือไม่?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    variant="contained"
                    onClick={handleCloseII}
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
            </Box>
          </Container>
        </Box>
      </AnimatedPage >
    </React.Fragment >
  );
}
