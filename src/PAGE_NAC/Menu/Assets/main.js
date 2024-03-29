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
import PropTypes from 'prop-types';

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress sx={{ fontSize: 100 }} variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="body2" component="div">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};



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
  const [asset_group, setAsset_group] = React.useState()
  const [group_name, setGroup_name] = React.useState()
  const [ownerCode, setOwnerCode] = React.useState()
  const [position, setPosition] = React.useState()

  React.useEffect(async () => {
    // POST request using axios with set headers
    const body = { Permission_TypeID: 1, userID: data.userid }
    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };
    await Axios.post(config.http + '/select_Permission_Menu_NAC', body, { headers }).catch(function (error) {
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
    event.stopPropagation();
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
        if (col[i] === 'BranchID' || col[i] === 'Price' || col[i] === 'Position') {
          arrayField[i] = {
            field: col[i],
            width: 80,
          }
        } else if (col[i] === 'Code' || col[i] === 'Name' || col[i] === 'Asset_group' || col[i] === 'Group_name') {
          arrayField[i] = {
            field: col[i],
            width: 160,
          }
        } else if (col[i] === 'CreateDate' || col[i] === 'OwnerCode') {
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
        swal("แจ้งเตือน", 'ไม่พบหัวข้อรหัสทรัพย์สิน (Code !)', "error")
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
      field[3].field === 'Asset_group' &&
      field[4].field === 'Group_name' &&
      field[5].field === 'BranchID' &&
      field[6].field === 'SerialNo' &&
      field[7].field === 'Price' &&
      field[8].field === 'CreateDate' &&
      field[9].field === 'CreateBy' &&
      field[10].field === 'Position' &&
      field[11].field === 'Details'
    ) {
      await Axios.post(config.http + '/FA_Control_BPC_Running_NO', data, { headers })
        .then(async (resTAB) => {
          for (let i = 0; i < dataFile.length; i++) {
            const body = {
              UserCode: data.UserCode
              , Code: dataFile[i].Code
              , Name: dataFile[i].Name
              , OwnerCode: dataFile[i].OwnerCode
              , Asset_group: dataFile[i].Asset_group
              , Group_name: dataFile[i].Group_name
              , BranchID: dataFile[i].BranchID
              , SerialNo: dataFile[i].SerialNo
              , Price: dataFile[i].Price
              , CreateDate: dataFile[i].CreateDate
              , CreateBy: dataFile[i].CreateBy
              , Position: dataFile[i].Position
              , Details: dataFile[i].Details
              , keyID: resTAB.data[0].TAB
            }
            await Axios.post(config.http + '/FA_Control_New_Assets_Xlsx', body, { headers })
              .then((response) => {
                if (response.data[0].res) {
                  setOpenXlsx(false)
                  setOpen(false);
                  setCode(null)
                  setName(null)
                  setSerialNo(null)
                  setPrice(null)
                  setDetails(null)
                  setCeate_Date(null)
                  swal("แจ้งเตือน", response.data[0].res, "error")
                } else {
                  setArraySubmit((i / (dataFile.length - 1)) * 100);
                  if (i === (dataFile.length - 1)) {
                    const body = { count: dataFile.length, keyID: resTAB.data[0].TAB }
                    Axios.post(config.http + '/FA_Control_import_dataXLSX_toAssets', body, { headers })
                      .then((response) => {
                        if (response.data[0].response === 'ทำรายการสำเร็จ') {
                          swal("แจ้งเตือน", response.data[0].response, "success", { buttons: false, timer: 2000 }).then((value) => {
                            setOpenXlsx(false)
                            setOpen(false);
                            setCode(null)
                            setName(null)
                            setSerialNo(null)
                            setPrice(null)
                            setDetails(null)
                            setCeate_Date(null)
                            window.location.href = '/FETCH_ASSETS';
                          })
                        } else if (response.data[0].response) {
                          setOpenXlsx(false)
                          swal("แจ้งเตือน", response.data[0].response, "error")
                        } else {
                          setOpenXlsx(false)
                          swal("แจ้งเตือน", response.data, "error")
                        }
                      })
                  }
                }
              })
          }
        })
    } else {
      swal("แจ้งเตือน", 'ข้อมูล (Columns) ไม่ถูกต้อง กรุณาตรวจสอบ', "error")
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit_Add = async () => {
    const body = {
      UserCode: data.UserCode,
      Code: code,
      Name: name,
      Asset_group: asset_group,
      Group_name: group_name,
      OwnerCode: ownerCode,
      Position: position,
      BranchID: branchID,
      Details: details,
      SerialNo: serialNo,
      Price: price,
      Create_Date: create_Date
    }
    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };
    if (!code) {
      swal("แจ้งเตือน", 'กรุณากรอกรหัสทรัพย์สินให้ถูกต้อง', "error")
    } else if (!name) {
      swal("แจ้งเตือน", 'กรุณากรอกชื่อทรัพย์สินให้ถูกต้อง', "error")
    } else if (!branchID || branchID < 1) {
      swal("แจ้งเตือน", 'กรุณากรอกสาขาให้ถูกต้อง', "error")
    } else if (!price || price < 1) {
      swal("แจ้งเตือน", 'กรุณากรอกราคาให้ถูกต้อง', "error")
    } else {
      await Axios.post(config.http + '/FA_Control_New_Assets', body, { headers })
        .then(response => {
          if (response.data !== undefined) {
            const userCode = { userCode: data.UserCode }
            const headers = {
              'Authorization': 'application/json; charset=utf-8',
              'Accept': 'application/json'
            };
            swal("แจ้งเตือน", `เพิ่มทรัพย์สินสำเร็จ`, "success", { buttons: false, timer: 2000 }).then((value) => {
              const bodyPermission = { Permission_TypeID: 1, userID: data.userid }
              const permission = Axios.post(config.http + '/select_Permission_Menu_NAC', bodyPermission, { headers })
                .then(response => response.data.data.map((res) => res.Permission_MenuID));
              Axios.post(config.http + '/store_FA_control_fetch_assets', userCode, { headers })
                .then(response => {
                  if (permission.includes(5) === true) {
                    setDataHistory(response.data.data.filter((res) => res.bac_status === 1))
                  } else {
                    setDataHistory(response.data.data.filter((res) => res.bac_status === 1 && res.OwnerID === data.UserCode))
                  }
                  setOpen(false);
                });
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
    { field: 'OwnerID', headerName: 'ผู้ถือครอง', headerClassName: 'super-app-theme--header', minWidth: 100, flex: 1, headerAlign: 'center', align: 'center', },
    {
      field: 'Position',
      headerName: 'Location NAC',
      headerClassName: 'super-app-theme--header',
      minWidth: 150,
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      valueGetter: (params) =>
        params.row.Position,
    },
    { field: 'Asset_group', headerName: 'Asset_group', headerClassName: 'super-app-theme--header', minWidth: 150, flex: 1 },
    { field: 'Group_name', headerName: 'Group_name', headerClassName: 'super-app-theme--header', minWidth: 150, flex: 1 },
    { field: 'Details', headerName: 'รายละเอียด', headerClassName: 'super-app-theme--header', minWidth: 100, flex: 1 },
    {
      field: 'Price',
      headerName: 'ราคาทุน',
      headerClassName: 'super-app-theme--header',
      minWidth: 130,
      flex: 1,
      valueGetter: (params) =>
        data.branchid === 901 ? params.row.Price.toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 0 }) : 'ถูกจำกัดสิทธิ์'
      // `${(params.row.BranchID === 901) ? (params.row.Price.toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 0 })) : 'ถูกปิดเนื่องจากสิทธิ์'}`,
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
  ];

  React.useEffect(async () => {
    // POST request using axios with set headers
    const userCode = { userCode: data.UserCode }
    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };

    const bodyPermission = { Permission_TypeID: 1, userID: data.userid }
    const permissionAssets = await Axios.post(config.http + '/select_Permission_Menu_NAC', bodyPermission, { headers })
      .then(response => response.data.data.map((res) => res.Permission_MenuID));
    await Axios.post(config.http + '/store_FA_control_fetch_assets', userCode, { headers })
      .then(response => {
        if (permissionAssets.includes(5) === true) {
          setDataHistory(response.data.data.filter((res) => res.bac_status === 1))
        } else {
          setDataHistory(response.data.data.filter((res) => res.bac_status === 1 && res.OwnerID === data.UserCode))
        }
      });
  }, []);

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
                getRowHeight={() => 'auto'}
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
                        <TextField
                          size="small"
                          autoComplete="given-name"
                          name="Asset_group"
                          value={asset_group}
                          onChange={(event) => setAsset_group(event.target.value)}
                          required
                          fullWidth
                          label="Asset Group"
                          autoFocus
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          size="small"
                          autoComplete="given-name"
                          name="group_name"
                          value={group_name}
                          onChange={(event) => setGroup_name(event.target.value)}
                          required
                          fullWidth
                          label="Group_name"
                          autoFocus
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          size="small"
                          autoComplete="OwerCode"
                          name="OwerCode"
                          value={ownerCode}
                          onChange={(event) => setOwnerCode(event.target.value)}
                          required
                          fullWidth
                          label="OwerCode"
                          autoFocus
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          size="small"
                          autoComplete="Position"
                          name="Position"
                          value={position}
                          onChange={(event) => setPosition(event.target.value)}
                          required
                          fullWidth
                          label="Position"
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
                <Button onClick={handleSubmit_Add} variant="contained">Submit</Button>
                <Button onClick={handleClose} autoFocus variant="contained" color="error">
                  Cancel
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
                !arraySubmit ?
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
                  !arraySubmit ?
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
                        components={{ Toolbar: GridToolbar }}
                        componentsProps={{
                          toolbar: {
                            csvOptions: {
                              utf8WithBom: true,
                              fileName: `ทะเบียนทรัพย์สินทั้งหมด`,

                            }
                          }
                        }}
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
                        <CircularProgressWithLabel value={arraySubmit} />
                      </Box>
                    </React.Fragment>
                }
              </DialogContent>
              {
                !arraySubmit ?
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