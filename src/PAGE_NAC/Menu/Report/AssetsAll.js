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
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import LinearProgress from '@mui/material/LinearProgress';
import config from '../../../config'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import swal from 'sweetalert';

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

export default function Reported_of_assets() {

  const [selectMenu, setSelectMenu] = React.useState();
  const [reported_of_assets, setReported_of_assets] = React.useState();
  const data = JSON.parse(localStorage.getItem('data'));
  const [description_value, setDescription_value] = React.useState('');
  const checkUserWeb = localStorage.getItem('sucurity');
  const [value_status, setValue_status] = React.useState('');
  const [status_all] = React.useState(['none', 'สภาพดี', 'ชำรุดรอซ่อม', 'รอตัดขาย', 'รอตัดชำรุด', 'QR Code ไม่สมบูรณ์ (สภาพดี)', 'QR Code ไม่สมบูรณ์ (ชำรุดรอซ่อม)', 'QR Code ไม่สมบูรณ์ (รอตัดขาย)', 'QR Code ไม่สมบูรณ์ (รอตัดชำรุด)']);
  const [pageSize, setPageSize] = React.useState(10);
  const [progress, setProgress] = React.useState();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [dialogComment, setDialogComment] = React.useState({ Code: '', BranchID: '', RoundID: '', UserID: '', comment: '', personID: '', depCode: '' });

  const handleSumbitComment = async () => {
    const body = dialogComment
    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };
    await Axios.put(config.http + '/updateReference', body, { headers })
      .catch(function (error) {
        reported_of_assets.forEach(function (x, index) {
          if (x.Code === dialogComment.Code) {
            const list = [...reported_of_assets]
            list[index]['comment'] = dialogComment.comment
            setReported_of_assets(list)
            setOpenDialog(false);
          }
        })
      //   if (error.response) {
      //     setOpenDialog(false);
      //     swal("แจ้งเตือน", `หมดเวลาแล้ว`, "error").then((res) => {
      //       reported_of_assets.forEach(function (x, index) {
      //         if (x.Code === dialogComment.Code) {
      //           const list = [...reported_of_assets]
      //           list[index]['comment'] = ''
      //           setReported_of_assets(list)
      //           setOpenDialog(false);
      //         }
      //       })
      //     })
      //   }
      // }).then((res) => {
      //   reported_of_assets.forEach(function (x, index) {
      //     if (x.Code === dialogComment.Code) {
      //       const list = [...reported_of_assets]
      //       list[index]['comment'] = dialogComment.comment
      //       setReported_of_assets(list)
      //       setOpenDialog(false);
      //     }
      //   })
      })
  };

  const handleChangeComment = (e) => {
    setDialogComment({
      Code: dialogComment.Code,
      BranchID: dialogComment.BranchID,
      RoundID: dialogComment.RoundID,
      UserID: data.userid,
      comment: e.target.value,
      personID: dialogComment.personID,
      depCode: dialogComment.depCode,
    })
  };

  const handleClickOpenDialog = (event, params) => {
    setOpenDialog(true);
    setDialogComment({
      Code: params.row.Code,
      BranchID: params.row.BranchID,
      RoundID: params.row.RoundID,
      UserID: params.row.UserID,
      comment: params.row.comment,
      personID: params.row.personID,
      depCode: params.row.DepCode,
    });
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const columns = [
    { field: 'Code', headerName: 'รหัสทรัพย์สิน', headerClassName: 'super-app-theme--header', minWidth: 130, flex: 1 },
    { field: 'Name', headerName: 'ชื่อ', headerClassName: 'super-app-theme--header', minWidth: 130, flex: 1 },
    { field: 'OwnerID', headerName: 'ผู้ถือครอง', headerClassName: 'super-app-theme--header', minWidth: 100, flex: 1, headerAlign: 'center', align: 'center', },
    {
      field: 'Position',
      headerName: 'Location NAC',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      align: 'center',
      minWidth: 100,
      flex: 1,
      valueGetter: (params) =>
        params.row.Position,
    },
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
                  {params.row.Date || ''}
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
                  {params.row.EndDate_Success || ''}
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
      field: 'detail',
      headerName: 'สถานะล่าสุด',
      headerClassName: 'super-app-theme--header',
      minWidth: 130,
      flex: 1,
      valueGetter: (params) =>
        `${params.row.detail || ''}`,
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
          await Axios.put(config.http + '/updateReference', body, { headers })

          reported_of_assets.forEach(function (x, index) {
            if (x.RowID === params.row.RowID) {
              const list = [...reported_of_assets]
              list[index]['Reference'] = event.target.value
              list[index]['remarker'] = event.target.value === 'none' ? 'ยังไม่ได้ตรวจนับ' :
                list[index]['remarker'] = event.target.value !== 'none' && data.UserCode === params.row.OwnerID ? 'ตรวจนับแล้ว' :
                  'ต่างสาขา'
              setReported_of_assets(list)
            }
          })

        };

        return (
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
          </React.Fragment >
        )
      }
    },
    {
      field: 'comment',
      headerName: 'comment',
      headerAlign: 'center',
      align: 'center',
      headerClassName: 'super-app-theme--header',
      minWidth: 130,
      flex: 1,
      renderCell: (params) => {
        return (
          <ListItem
            button
            divider
            aria-haspopup="true"
            id={params.row.comment}
            aria-controls="ringtone-menu"
            aria-label="phone ringtone"
            onClick={(event) => handleClickOpenDialog(event, params)}
          >
            <ListItemText primary={params.row.comment} />
          </ListItem>
        )
      }
    },
    {
      field: 'remarker',
      headerName: 'ผลการตรวจนับ',
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

  React.useEffect(async () => {
    // POST request using axios with set headers
    const Description = { Description: '' }
    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };
    await Axios.post(config.http + '/FA_Control_Report_All_Counted_by_Description', Description, { headers }).catch(function (error) {
      if (error.toJSON().message === 'Request failed with status code 400') {
        setProgress(1)
      }
    }).then(response => {
      setSelectMenu((response.data.data).filter((value, index, self) =>
        index === self.findIndex((t) => (
          t.Description === value.Description
        ))
      ))
      setProgress(1)
    });
  }, []);

  const handleChange = async (event) => {
    setProgress(0)
    setDescription_value(event.target.innerText);
    const Description = { Description: event.target.innerText }
    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };
    await Axios.post(config.http + '/FA_Control_Report_All_Counted_by_Description', Description, { headers }).catch(function (error) {
      if (error.toJSON().message === 'Request failed with status code 400') {
        setProgress(1)
      }
    }).then(response => {
      setReported_of_assets(response.data.data)
      setProgress(1)
    });
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
                รายงานการตรวจนับทั้งหมด
              </Typography>
            </AnimatedPage>
          </Toolbar>
        </AppBar>
        <AnimatedPage>
          {progress !== 1 ? <React.Fragment><Box sx={{ width: '100%' }}><LinearProgress /></Box></React.Fragment> : null}
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <Container maxWidth="1000px" sx={{ pt: 3, pb: 3 }}>
              <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                options={!selectMenu ? [] : selectMenu.map((option) => option.Description)}
                onChange={handleChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="ค้นหาคำอธิบาย"
                    InputProps={{
                      ...params.InputProps,
                      type: 'search',
                    }}
                  />
                )}
              />
              <Box
                sx={{
                  height: 683,
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
                  rows={reported_of_assets ?? []}
                  columns={columns}
                  getRowId={(reported_of_assets) => reported_of_assets.RowID}
                  pageSize={pageSize}
                  onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                  pagination
                  getRowHeight={() => 'auto'}
                  rowsPerPageOptions={[10, 20, 50, 100]}
                  autoHeight
                  disableColumnMenu
                  //autoHeight={true}
                  disableSelectionOnClick
                  {...other}
                //checkboxSelection
                />
              </Box>
            </Container>
          </Box>
          <Dialog fullWidth open={openDialog} onClose={handleCloseDialog}>
            <DialogContent>
              <DialogContentText>
                {dialogComment.Code}
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="comment"
                onChange={handleChangeComment}
                value={dialogComment.comment}
                fullWidth
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleSumbitComment} variant='contained'>Submit</Button>
              <Button onClick={handleCloseDialog} variant='contained' color="error">Cancel</Button>
            </DialogActions>
          </Dialog>
        </AnimatedPage>
      </React.Fragment>
    );
  }
}