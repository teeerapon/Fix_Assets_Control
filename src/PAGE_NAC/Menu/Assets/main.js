import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import AnimatedPage from '../../../AnimatedPage';
import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { alpha, styled } from '@mui/material/styles';
import { DataGrid, gridClasses, GridToolbar } from '@mui/x-data-grid';
import Axios from "axios"
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import * as XLSX from 'xlsx';
import LinearProgress from '@mui/material/LinearProgress';
import config from '../../../config'
import CircularProgress from '@mui/material/CircularProgress';
import swal from 'sweetalert';



const ODD_OPACITY = 0.2;

const other = {
  showCellRightBorder: true,
  showColumnRightBorder: true,
};

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

export default function History_of_assets() {

  const [dataHistory, setDataHistory] = React.useState();
  const data = JSON.parse(localStorage.getItem('data'));
  const checkUserWeb = localStorage.getItem('sucurity');
  const [open, setOpen] = React.useState(false);
  const [code, setCode] = React.useState();
  const [name, setName] = React.useState();
  const [serialNo, setSerialNo] = React.useState();
  const [create_Date, setCeate_Date] = React.useState(null);
  const [price, setPrice] = React.useState();
  const [details, setDetails] = React.useState();
  const [branchID, setBranchID] = React.useState();
  const [pageSize, setPageSize] = React.useState(10);
  const [dataFile, setDataFile] = React.useState();
  const [field, setField] = React.useState()
  const [openXlsx, setOpenXlsx] = React.useState(false);
  const [nameExcel, setNameExcel] = React.useState()
  const [permission_menuID, setPermission_menuID] = React.useState();
  const [progress, setProgress] = React.useState();
  const [arraySubmit, setArraySubmit] = React.useState()

  React.useEffect(() => {
    // POST request using axios with set headers
    const body = { Permission_TypeID: 1, userID: data.userid }
    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };
    Axios.post(config.http + '/select_Permission_Menu_NAC', body, { headers }).catch(function (error) {
      if (error.toJSON().message === 'Request failed with status code 400') {
        setProgress(1)
      }
    }).then(response => {
      setPermission_menuID(response.data.data.map((res) => res.Permission_MenuID))
      setProgress(1)
    });
  }, []);

  const fileSelected = (event) => {
    event.preventDefault();
    var files = event.target.files, f = files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
      var data = e.target.result;
      let readedData = XLSX.read(data, { type: 'binary', cellText: false, cellDates: true });
      const wsname = readedData.SheetNames[0];
      const ws = readedData.Sheets[wsname];

      /* Convert array to json*/
      const columnsHeader = XLSX.utils.sheet_to_json(ws, { header: 1, raw: false, dateNF: 'dd/mm/yyyy', rawNumbers: false });
      const dataParse = XLSX.utils.sheet_to_json(ws, { range: 1, header: columnsHeader[0], raw: false, dateNF: 'dd/mm/yyyy' });
      const col = columnsHeader[0]
      let arrayField = []

      for (let i = 0; i < col.length; i++) {
        if (col[i] === 'BranchID' || col[i] === 'Price' || col[i] === 'Position' || col[i] === 'OwnerCode') {
          arrayField[i] = {
            field: col[i],
            width: 80,
          }
        } else if (col[i] === 'Code' || col[i] === 'Name') {
          arrayField[i] = {
            field: col[i],
            width: 160,
          }
        } else if (col[i] === 'CreateDate') {
          arrayField[i] = {
            field: col[i],
            width: 120,
          }
        } else {
          arrayField[i] = {
            field: col[i],
            flex: 1,
          }
        }
      }
      if (columnsHeader[0].indexOf('Code') >= 0) {
        setField(arrayField)
        setDataFile(dataParse)
        setOpenXlsx(true)
        setNameExcel(f.name)
      } else {
        swal("แจ้งเตือน", 'ไม่พบหัวข้อรหัสทรัพย์สิน (Code !)', "error", {
          buttons: false,
          timer: 2000,
        })
      }
    };
    reader.readAsBinaryString(f)
  }

  const handleCloseXlsx = () => {
    setOpenXlsx(false);
  };

  const handleSubmitXlsx = async () => {
    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };
    if (
      field[0].field === 'Code' &&
      field[1].field === 'Name' &&
      field[2].field === 'OwnerCode' &&
      field[3].field === 'BranchID' &&
      field[4].field === 'SerialNo' &&
      field[5].field === 'Price' &&
      field[6].field === 'CreateDate' &&
      field[7].field === 'CreateBy' &&
      field[8].field === 'Position' &&
      field[9].field === 'Details'
    ) {
      const accessToken = Math.random().toString(36).substr(2)
      for (let i = 0; i < dataFile.length; i++) {
        const data = {
          Code: dataFile[i].Code
          , Name: dataFile[i].Name
          , OwnerCode: dataFile[i].OwnerCode
          , BranchID: dataFile[i].BranchID
          , SerialNo: dataFile[i].SerialNo
          , Price: dataFile[i].Price
          , CreateDate: dataFile[i].CreateDate
          , CreateBy: dataFile[i].CreateBy
          , Position: dataFile[i].Position
          , Details: dataFile[i].Details
          , keyID: accessToken
        }
        await Axios.post(config.http + '/FA_Control_New_Assets_Xlsx', data, { headers })
          .then((response) => {
            setArraySubmit(i + 1);
          })
      }
      const body = { count: dataFile.length, keyID: accessToken }
      await Axios.post(config.http + '/FA_Control_import_dataXLSX_toAssets', body, { headers })
        .then((response) => {
          if (response.data[0].response === 'ทำรายการสำเร็จ') {
            swal("แจ้งเตือน", response.data[0].response, "success", {
              buttons: false,
              timer: 2000,
            }).then((value) => {
              setOpen(false);
              setCode(null)
              setName(null)
              setSerialNo(null)
              setPrice(null)
              setDetails(null)
              setCeate_Date(null)
              window.location.href = '/FETCH_ASSETS';
            })
          } else {
            swal("แจ้งเตือน", response.data[0].response, "error", {
              buttons: false,
              timer: 2000,
            })
          }
        })
    } else {
      swal("แจ้งเตือน", 'ข้อมูล (Columns) ไม่ถูกต้อง กรุณาตรวจสอบ', "error", {
        buttons: false,
        timer: 2000,
      })
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCode(null)
    setName(null)
    setSerialNo(null)
    setPrice(null)
    setDetails(null)
    setCeate_Date(null)
  };

  const handleSubmit_Add = async () => {
    const body = { UserCode: data.UserCode, Code: code, Name: name, BranchID: branchID, Details: details, SerialNo: serialNo, Price: price, Create_Date: create_Date }
    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };
    if (!code) {
      swal("แจ้งเตือน", 'กรุณากรอกรหัสทรัพย์สินให้ถูกต้อง', "error", {
        buttons: false,
        timer: 2000,
      })
    } else if (!name) {
      swal("แจ้งเตือน", 'กรุณากรอกชื่อทรัพย์สินให้ถูกต้อง', "error", {
        buttons: false,
        timer: 2000,
      })
    } else if (!branchID || branchID < 1) {
      swal("แจ้งเตือน", 'กรุณากรอกสาขาให้ถูกต้อง', "error", {
        buttons: false,
        timer: 2000,
      })
    } else if (!price || price < 1) {
      swal("แจ้งเตือน", 'กรุณากรอกราคาให้ถูกต้อง', "error", {
        buttons: false,
        timer: 2000,
      })
    } else {
      await Axios.post(config.http + '/FA_Control_New_Assets', body, { headers })
        .then(response => {
          if (response.data !== undefined) {
            const userCode = { userCode: data.UserCode }
            const headers = {
              'Authorization': 'application/json; charset=utf-8',
              'Accept': 'application/json'
            };
            swal("แจ้งเตือน", `เพิ่มทรัพย์สินสำเร็จ`, "success", {
              buttons: false,
              timer: 2000,
            }).then((value) => {
              Axios.post(config.http + '/store_FA_control_fetch_assets', userCode, { headers })
                .then(response => setDataHistory(response.data.data.filter((res) => res.bac_status === 1)));
              setOpen(false);
            })
          }
        });
    }

  };

  const handleChange_Code = (event) => {
    setCode(event.target.value)
  }
  const handleChange_Name = (event) => {
    setName(event.target.value)
  }
  const handleChange_SerialNo = (event) => {
    setSerialNo(event.target.value)
  }
  const handleChange_Price = (event) => {
    setPrice(event.target.value)
  }
  const handleChange_Details = (event) => {
    setDetails(event.target.value)
  }
  const handleChange_Ceate_Date = (newValue) => {
    setCeate_Date(!newValue.toISOString().split('T')[0] ? null : newValue.toISOString().split('T')[0])
  }
  const handleChange_BranchID = (event) => {
    setBranchID(event.target.value)
  }

  const columns = [
    { field: 'Code', headerName: 'รหัสทรัพย์สิน', headerClassName: 'super-app-theme--header', minWidth: 150, flex: 1 },
    { field: 'Name', headerName: 'ชื่อ', headerClassName: 'super-app-theme--header', minWidth: 150, flex: 1 },
    { field: 'SerialNo', headerName: 'SerialNo', headerClassName: 'super-app-theme--header', minWidth: 150, flex: 1 },
    { field: 'OwnerID', headerName: 'ผู้ถือครอง', headerClassName: 'super-app-theme--header', minWidth: 100, flex: 1 },
    { field: 'Details', headerName: 'หมายเหตุ', headerClassName: 'super-app-theme--header', minWidth: 100, flex: 1 },
    {
      field: 'Price',
      headerName: 'ราคาทุน',
      headerClassName: 'super-app-theme--header',
      minWidth: 130,
      flex: 1,
      valueGetter: (params) =>
        `${params.row.Price.toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 0 }) || ''}`,
    },
    {
      field: 'BranchID',
      headerName: 'สาขา',
      headerClassName: 'super-app-theme--header',
      minWidth: 100,
      flex: 1,
      valueGetter: (params) =>
        params.row.BranchID === 901 ? 'HO' : params.row.BranchID,
    },
    {
      field: 'Position',
      headerName: 'Position',
      headerClassName: 'super-app-theme--header',
      minWidth: 100,
      flex: 1,
      valueGetter: (params) =>
        params.row.BranchID === 901 ? 'HO' : params.row.Position,
    },
    {
      field: 'CreateDate',
      headerName: 'วันที่ขึ้นทะเบียน',
      headerClassName: 'super-app-theme--header',
      minWidth: 170,
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return (
          <React.Fragment>
            {params.row.CreateDate ?
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={1}
              >
                <CalendarMonthIcon />
                <Typography variant='body2'>
                  {params.row.CreateDate.split('T')[0] || ''}
                </Typography>
              </Stack>
              : null}
          </React.Fragment>
        )
      }
    },
    // {
    //   field: 'ImagePath',
    //   headerName: 'Images',
    //   headerClassName: 'super-app-theme--header',
    //   minWidth: 50,
    //   headerAlign: 'center',
    //   align: 'center',
    //   flex: 1,
    //   renderCell: (params) => {
    //     return (
    //       <React.Fragment>
    //         <IconButton color="primary" onClick={(event) => handleClickOpenImage(event, params)} component="label">
    //           <Badge
    //             badgeContent={(params.row.ImagePath && params.row.ImagePath_2) ? 2 : (params.row.ImagePath || params.row.ImagePath_2) ? 1 : 0}
    //             color="primary">
    //             <ImageIcon color="action" />
    //           </Badge>
    //         </IconButton>
    //       </React.Fragment>
    //     )
    //   }
    // },
  ];

  React.useEffect(() => {
    // POST request using axios with set headers
    const userCode = { userCode: data.UserCode }
    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };
    Axios.post(config.http + '/store_FA_control_fetch_assets', userCode, { headers })
      .then(response => setDataHistory(response.data.data.filter((res) => res.bac_status === 1)));
  }, []);

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
                ทรัพย์สินทั้งหมด
              </Typography>
            </AnimatedPage>
          </Toolbar>
        </AppBar>
        <AnimatedPage>
          {progress !== 1 ? <React.Fragment><Box sx={{ width: '100%' }}><LinearProgress /></Box></React.Fragment> : null}
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <Container maxWidth="1000px" sx={{ pt: 3, pb: 3 }}>
              <Grid
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                spacing={2}
              >
                <Grid item>
                  <Button variant="contained" disabled={(permission_menuID ? permission_menuID.includes(6) : null) === true ? false : true} color='success' component="label">
                    Upload XLSX
                    <input hidden multiple type="file" onChange={fileSelected} />
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color='success' disabled={(permission_menuID ? permission_menuID.includes(6) : null) === true ? false : true} onClick={handleClickOpen}>
                    เพิ่มทรัพย์สิน
                  </Button>
                </Grid>
              </Grid>
              <Box
                sx={{
                  height: 683,
                  width: '100%',
                }}
              >
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
                  componentsProps={{ toolbar: { csvOptions: { utf8WithBom: true } } }}
                  rows={dataHistory ?? []}
                  columns={columns}
                  getRowId={(dataHistory) => dataHistory.AssetID}
                  pageSize={pageSize}
                  onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                  pagination
                  rowsPerPageOptions={[10, 20, 50, 100]}
                  autoHeight
                  disableColumnMenu
                  disableSelectionOnClick
                  {...other}
                //checkboxSelection
                />
              </Box>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle>
                  <b>{"กรุณากรอกข้อมูลให้ครบถ้วน"}</b>
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    <Box component="form" noValidate sx={{ mt: 4, width: 300, }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <TextField
                            size="small"
                            autoComplete="given-name"
                            name="Code"
                            value={code}
                            onChange={(event) => handleChange_Code(event)}
                            required
                            fullWidth
                            label="รหัสทรัพย์สิน"
                            autoFocus
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            size="small"
                            autoComplete="given-name"
                            name="Name"
                            value={name}
                            onChange={(event) => handleChange_Name(event)}
                            required
                            fullWidth
                            label="ชื่อ"
                            autoFocus
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            size="small"
                            autoComplete="given-name"
                            name="branchID"
                            value={branchID}
                            onChange={(event) => handleChange_BranchID(event)}
                            required
                            fullWidth
                            type='number'
                            label="สาขา"
                            autoFocus
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <LocalizationProvider dateAdapter={DateAdapter}>
                            <DatePicker
                              label="วันที่ขึ้นทะเบียน"
                              value={create_Date}
                              onChange={handleChange_Ceate_Date}
                              inputFormat="yyyy-MM-dd"
                              renderInput={(params) =>
                                <TextField
                                  fullWidth
                                  size="small"
                                  autoComplete="family-name"
                                  required
                                  {...params} />}
                            />
                          </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            size="small"
                            autoComplete="given-name"
                            name="SerialNo"
                            value={serialNo}
                            onChange={(event) => handleChange_SerialNo(event)}
                            fullWidth
                            label="SerialNo"
                            autoFocus
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            size="small"
                            autoComplete="given-name"
                            name="Details"
                            value={details}
                            onChange={(event) => handleChange_Details(event)}
                            fullWidth
                            label="รายะลเอียดทรัพย์สิน"
                            autoFocus
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            size="small"
                            autoComplete="given-name"
                            name="Price"
                            value={price}
                            onChange={(event) => handleChange_Price(event)}
                            required
                            fullWidth
                            type='number'
                            label="ราคาทุน"
                            autoFocus
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleSubmit_Add} variant="contained">บันทึก</Button>
                  <Button onClick={handleClose} autoFocus variant="contained" color="error">
                    ยกเลิก
                  </Button>
                </DialogActions>
              </Dialog>
              <Dialog
                fullWidth
                maxWidth='lg'
                open={openXlsx}
                onClose={handleCloseXlsx}
              >
                {
                  ((dataFile ? dataFile.length : []) === (arraySubmit ? arraySubmit : (dataFile ? dataFile.length : []))) ?
                    <React.Fragment>
                      <DialogTitle>
                        ต้องการอัปโหลดไฟล์ {nameExcel} ไปที่ข้อมูลหลักใช่หรือไม่ ?
                      </DialogTitle>
                    </React.Fragment>
                    :
                    <React.Fragment>
                      <DialogTitle>
                        กำลังอัปโหลดข้อมูล กรุณาอย่าปิดหน้าจอนี้ !!
                      </DialogTitle>
                    </React.Fragment>
                }
                <DialogContent>
                  {
                    ((dataFile ? dataFile.length : []) === (arraySubmit ? arraySubmit : (dataFile ? dataFile.length : []))) ?
                      <React.Fragment>
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
                          componentsProps={{ toolbar: { csvOptions: { utf8WithBom: true } } }}
                          rows={dataFile}
                          columns={field}
                          getRowId={(row) => row?.Code}
                          pageSize={10}
                          autoHeight
                          disableColumnMenu
                          disableSelectionOnClick
                          {...other}
                        />
                      </React.Fragment>
                      :
                      <React.Fragment>
                        <Box
                          sx={{
                            mt: 10,
                            mb: 10,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                          }}
                        >
                          <Stack direction="row" spacing={3}>
                            <CircularProgress disableShrink color="inherit" />
                            <Typography variant="h4" color="inherit" >
                              ({arraySubmit}/{dataFile ? dataFile.length : 0}) Loading...
                            </Typography>
                          </Stack>
                        </Box>
                      </React.Fragment>
                  }
                </DialogContent>
                {
                  ((dataFile ? dataFile.length : []) === (arraySubmit ? arraySubmit : (dataFile ? dataFile.length : []))) ?
                    <React.Fragment>
                      <DialogActions>
                        <Button onClick={handleSubmitXlsx} variant='contained'>Submit</Button>
                        <Button onClick={handleCloseXlsx} variant='contained' color='error' autoFocus>
                          Cancel
                        </Button>
                      </DialogActions>
                    </React.Fragment>
                    : null
                }
              </Dialog>
            </Container>
          </Box>
        </AnimatedPage>
      </React.Fragment>
    );
  }
}