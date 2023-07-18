import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import AnimatedPage from '../../../../AnimatedPage';
import React from 'react';
import Box from '@mui/material/Box';
import { alpha, styled } from '@mui/material/styles';
import { DataGrid, gridClasses, GridToolbar } from '@mui/x-data-grid';
import Axios from "axios"
import LinearProgress from '@mui/material/LinearProgress';
import config from '../../../../config'
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import swal from 'sweetalert';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';
import CommentBPC from './comments'
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import FilePresentIcon from '@mui/icons-material/FilePresent';

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

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(0.8),
  paddingTop: theme.spacing(0.5),
  paddingBottom: theme.spacing(0.5),
  textAlign: 'start',
  color: '#ffffff',
}));

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
  const [progress, setProgress] = React.useState();
  const queryString = window.location.search;
  const keyID = queryString.split('=')[1]
  const [permission_menuID, setPermission_menuID] = React.useState();
  const [valueOfIndex, setValueOfIndex] = React.useState();
  const [arraySubmitSendMail, setArraySubmitSendMail] = React.useState()

  //comments
  const [openDialogComment, setOpenDialogComment] = React.useState()
  const [openLoadingDialog, setOpenLoadingDialog] = React.useState(false)
  const [openLoading, setOpenLoading] = React.useState(0)
  const [openDialog, setOpenDialog] = React.useState(false);
  const [description, setDescription] = React.useState()
  const [openDialog2, setOpenDialog2] = React.useState(false);
  const [dialogComment, setDialogComment] = React.useState({ Code: '', Name: '', keyID: '', ImagePath_2: '', Comments: '' });

  const handleSumbitComment = async () => {
    const body = dialogComment

    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };

    await Axios.post(config.http + '/FA_Control_BPC_UpdateTemp', body, { headers })
      .then((res) => {
        dataHistory.forEach(function (x, index) {
          if (x.Code === dialogComment.Code) {
            const list = [...dataHistory]
            list[index]['Comments'] = dialogComment.Comments
            setDataHistory(list)
            setOpenDialog2(false);
          }
        })
      })
  };

  const handleChangeComment = (e) => {
    setDialogComment({
      Code: dialogComment.Code,
      Name: dialogComment.Name,
      keyID: dialogComment.keyID,
      ImagePath_2: data.ImagePath_2,
      Comments: e.target.value,
    })
  };

  const handleClickOpenDialog = (event, params) => {

    if (params.row.tab_status === 'ดำเนินการเสร็จสิ้น') {
      swal("แจ้งเตือน", 'ไม่สามารถเปลี่ยนแปลงรายละเอียดได้ (ดำเนินการเสร็จสิ้นแล้ว)', "error", {
        buttons: false,
        timer: 2000,
      })
    } else {
      setOpenDialog2(true);
      setDialogComment({
        Code: params.row.Code,
        Name: params.row.Name,
        keyID: params.row.keyID,
        ImagePath_2: params.row.ImagePath_2,
        Comments: params.row.Comments,
      });
    }

  };

  const handleCloseDialog = () => {
    setOpenDialog2(false);
  };


  const handleClickOpenDialogComment = () => {
    setOpenDialogComment(true);
  };

  const handleCloseDialogComment = () => {
    setOpenDialogComment(false);
  };

  const handleClick_Value = async (newSelectionModel) => {
    setValueOfIndex(newSelectionModel);
    setArraySubmitSendMail(dataHistory.filter((res) => !newSelectionModel.includes(res.AssetID)));
  }

  const submit_CancelJobs = async () => {
    const body = {
      tab_code: keyID,
      assetID: null,
      userid: data.userid,
      statusid: 5,
      count: 0,
    }
    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };
    await Axios.post(config.http + '/FA_Control_BPC_SubmitVertify', body, { headers }).catch(function (error) {
      if (error.toJSON().message === 'Request failed with status code 400') {
        setProgress(1)
      }
    })
    setOpenLoadingDialog(false)
    swal("แจ้งเตือน", 'ตรวจสอบรายการสำเร็จ', "success", {
      buttons: false,
      timer: 2000,
    }).then((value) => {
      window.location.href = '/FA_Control_BPC_SELECT_TEMP?keyID=' + keyID
    })
  }

  const submit_Vertify = async () => {

    if (!arraySubmitSendMail || (arraySubmitSendMail.length === dataHistory.length)) {
      swal("แจ้งเตือน", `กรุณาเลือกอย่างน้อย 1 รายการเพื่อตรวจสอบ`, "warning", {
        buttons: false,
        timer: 2000,
      })
    } else {
      if (arraySubmitSendMail.length === 0) {
        const body = {
          tab_code: keyID,
          assetID: null,
          userid: data.userid,
          statusid: ((dataHistory ? dataHistory[0].tab_statusid : null) === 1 && ((permission_menuID ? permission_menuID.includes(10) : null) === true) || data.UserCode === 'TCM' || data.UserCode === 'JRK') ? 2 :
            ((dataHistory ? dataHistory[0].tab_statusid : null) === 2 && ((permission_menuID ? permission_menuID.includes(10) : null) === true) || data.UserCode === 'KTT') ? 3 :
              ((dataHistory ? dataHistory[0].tab_statusid : null) === 3 && ((permission_menuID ? permission_menuID.includes(10) : null) === true) || data.UserCode === 'GRP') ? 4 : null,
          count: 0,
        }
        const headers = {
          'Authorization': 'application/json; charset=utf-8',
          'Accept': 'application/json'
        };
        await Axios.post(config.http + '/FA_Control_BPC_SubmitVertify', body, { headers }).catch(function (error) {
          if (error.toJSON().message === 'Request failed with status code 400') {
            setProgress(1)
          }
        })
      } else {
        for (let i = 0; i < arraySubmitSendMail.length; i++) {
          const body = {
            tab_code: keyID,
            assetID: arraySubmitSendMail[i].AssetID,
            userid: data.userid,
            statusid: ((dataHistory ? dataHistory[0].tab_statusid : null) === 1 && ((permission_menuID ? permission_menuID.includes(10) : null) === true) || data.UserCode === 'TCM' || data.UserCode === 'JRK') ? 2 :
              ((dataHistory ? dataHistory[0].tab_statusid : null) === 2 && ((permission_menuID ? permission_menuID.includes(10) : null) === true) || data.UserCode === 'KTT') ? 3 :
                ((dataHistory ? dataHistory[0].tab_statusid : null) === 3 && ((permission_menuID ? permission_menuID.includes(10) : null) === true) || data.UserCode === 'GRP') ? 4 : null,
            count: i,
          }
          const headers = {
            'Authorization': 'application/json; charset=utf-8',
            'Accept': 'application/json'
          };
          await Axios.post(config.http + '/FA_Control_BPC_SubmitVertify', body, { headers }).catch(function (error) {
            if (error.toJSON().message === 'Request failed with status code 400') {
              setProgress(1)
            }
          }).then((response) => {
            setOpenLoadingDialog(true)
            setOpenLoading((i / arraySubmitSendMail.length) * 100)
          })
        }
      }
      setOpenLoadingDialog(false)
      swal("แจ้งเตือน", 'ตรวจสอบรายการสำเร็จ', "success", {
        buttons: false,
        timer: 2000,
      }).then((value) => {
        window.location.href = '/FA_Control_BPC_SELECT_TEMP?keyID=' + keyID
      })
    }
  }

  React.useEffect(async () => {
    // POST request using axios with set headers
    const body = { Permission_TypeID: 1, userID: data.userid }
    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };

    const body_permission = { Permission_TypeID: 1, userID: data.userid }
    await Axios.post(config.http + '/select_Permission_Menu_NAC', body_permission, { headers })
      .then(async (response) => {

        setPermission_menuID(response.data.data.map((res) => res.Permission_MenuID))

        await Axios.post(config.http + '/select_Permission_Menu_NAC', body, { headers }).catch(function (error) {
          if (error.toJSON().message === 'Request failed with status code 400') {
            setProgress(1)
          }
        }).then(response => {
          setProgress(1)
        });
      });


  }, []);

  const columns = [
    { field: 'Code', headerName: 'รหัสทรัพย์สิน', headerClassName: 'super-app-theme--header', minWidth: 150, flex: 1, headerAlign: 'center', align: 'center', },
    { field: 'Name', headerName: 'ชื่อ', headerClassName: 'super-app-theme--header', minWidth: 150, flex: 1, },
    { field: 'OwnerID', headerName: 'ผู้ถือครอง', headerClassName: 'super-app-theme--header', width: 130, headerAlign: 'center', align: 'center', },
    {
      field: 'Position',
      headerName: 'Location NAC',
      headerClassName: 'super-app-theme--header',
      width: 110,
      headerAlign: 'center',
      align: 'center',
      valueGetter: (params) =>
        params.row.BranchID === 901 ? 'HO' : params.row.Position,
    },
    {
      field: 'Details',
      headerName: 'สถานะปัจจุบัน',
      headerClassName: 'super-app-theme--header',
      minWidth: 130,
      flex: 1,
      valueGetter: (params) =>
        params.row.Details === '' || !params.row.Details ? '' :
          !params.row.UpdateBy ? `${params.row.Details}` :
            `ผู้อัปเดท/เวลาอัปเดท : ${params.row.UpdateBy ? `${params.row.UpdateBy} (${params.row.UpdateDate})` : 'none'} สถานะปัจจุบัน : ${params.row.Details ?? 'none'}`
    },
    {
      field: 'Comments',
      headerName: 'Comments',
      headerClassName: 'super-app-theme--header',
      minWidth: 130,
      flex: 1,
      renderCell: (params) => {
        return (
          <ListItem
            button
            divider
            aria-haspopup="true"
            id={params.row.Comments}
            aria-controls="ringtone-menu"
            aria-label="phone ringtone"
            onClick={(event) => handleClickOpenDialog(event, params)}
          >
            <ListItemText primary={params.row.Comments} />
          </ListItem>
        )
      }
    },
    {
      field: 'ImagePath_2',
      headerName: 'Images 2',
      headerClassName: 'super-app-theme--header',
      width: 200,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {

        const handleUploadFile_2 = async (e, params) => {
          e.preventDefault();

          const headers = {
            'Authorization': 'application/json; charset=utf-8',
            'Accept': 'application/json'
          };

          if (params.row.tab_status === 'ดำเนินการเสร็จสิ้น') {
            swal("แจ้งเตือน", 'ไม่สามารถเปลี่ยนแปลงรายละเอียดได้ (ดำเนินการเสร็จสิ้นแล้ว)', "error", {
              buttons: false,
              timer: 2000,
            })
          } else if (['csv', 'xls', 'txt', 'ppt', 'doc', 'pdf', 'jpg', 'png', 'gif'].indexOf((e.target.files[0].name).split('.').pop()) > -1) {

            const formData_2 = new FormData();
            formData_2.append("file", e.target.files[0]);
            formData_2.append("fileName", e.target.files[0].name);

            await Axios.post(config.http + "/check_files_NewNAC", formData_2, { headers })
              .then(async (res) => {

                const image_2 = 'http://vpnptec.dyndns.org:33080/NEW_NAC/' + res.data.attach[0].ATT + '.' + e.target.files[0].name.split('.').pop();

                const body = {
                  Code: params.row.Code,
                  Name: params.row.Name,
                  keyID: params.row.keyID,
                  ImagePath_2: image_2,
                }

                await Axios.post(config.http + '/FA_Control_BPC_UpdateTemp', body, { headers })
                  .then((res) => {
                    dataHistory.forEach(function (x, index) {
                      if (x.Code === dialogComment.Code) {
                        const list = [...dataHistory]
                        list[index]['ImagePath_2'] = image_2
                        setDataHistory(list)
                        setOpenDialog2(false);
                      }
                    })
                  })

              })
          } else {
            swal("แจ้งเตือน", 'ไฟล์ประเภทนี้ไม่ได้รับอนุญาติให้ใช้งานในระบบ \nใช้ได้เฉพาะ .csv, .xls, .txt, .ppt, .doc, .pdf, .jpg, .png, .gif', "error", {
              buttons: false,
              timer: 2000,
            })
          }
        }

        return (
          <React.Fragment>
            <ImageListItem key={params.row.ImagePath_2}>
              <img
                src={`${params.row.ImagePath_2}?w = 248 & fit=crop & auto=format`}
                srcSet={`${params.row.ImagePath_2}?w = 248 & fit=crop & auto=format & dpr=2 2x`}
                alt={params.row.Name}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = "http://vpnptec.dyndns.org:10280/OPS_Fileupload/ATT_230400022.jpg";
                }}
                loading="lazy"
              />
              <ImageListItemBar
                sx={{ backgroundColor: 'rgba(0, 0, 0, 1)', color: 'rgba(255, 255, 255, 1)' }}
                position="below"
                title={<span>&nbsp; &nbsp;{params.row.Code}_2</span>}
                actionIcon={
                  <IconButton
                    sx={{ color: 'rgba(255, 255, 255, 1)' }}
                    aria-label={`info about ${params.row.Code} `}
                    component="label"
                  >
                    <input
                      hidden type="file"
                      name='file'
                      onChange={(e) => handleUploadFile_2(e, params)}
                    />
                    <FilePresentIcon sx={{ fontSize: 20 }} />
                  </IconButton>
                }
              />
            </ImageListItem>
          </React.Fragment>
        )
      }
    },
  ];

  React.useEffect(() => {
    // POST request using axios with set headers
    const body = { keyID: keyID }
    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };
    Axios.post(config.http + '/FA_Control_BPC_SELECT_TEMP', body, { headers })
      .then(response => setDataHistory(response.data));
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
                ทะเบียนทรัพย์สินผู้ร่วมเลขที่ {keyID}
              </Typography>
            </AnimatedPage>
          </Toolbar>
        </AppBar>
        <AnimatedPage>
          {progress !== 1 ? <React.Fragment><Box sx={{ width: '100%' }}><LinearProgress /></Box></React.Fragment> : null}
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <Container maxWidth="1000px" sx={{ pt: 3, pb: 3 }}>
              <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
                <React.Fragment>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={submit_Vertify}
                    disabled={(dataHistory ? dataHistory[0].tab_statusid : null) === 4 || (dataHistory ? dataHistory[0].tab_statusid : 0) === 5 ? true : false}
                  >
                    ตรวจสอบ
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={submit_CancelJobs}
                    disabled={(dataHistory ? dataHistory[0].tab_statusid : null) === 4 || (dataHistory ? dataHistory[0].tab_statusid : 0) === 5 ? true : false}
                  >
                    ยกเลิก
                  </Button>
                </React.Fragment>
                <Paper variant="outlined" sx={{ width: 'fit-content', padding: 1 }}>
                  <Typography>
                    ผู้ทำรายการ : {dataHistory ? dataHistory[0].user_name : 0}
                  </Typography>
                </Paper>
                <Paper variant="outlined" sx={{ width: 'fit-content', padding: 1 }}>
                  <Typography>
                    สถานะรายการ : ({dataHistory ? dataHistory[0].tab_status : null})
                  </Typography>
                </Paper>
                <Paper variant="outlined" sx={{ flexGrow: 1, padding: 1 }}>
                  <Stack direction="row" spacing={2}>
                    <Typography>
                      ผู้มีสิทธิตรวจสอบรายการ :
                    </Typography>
                    <Typography style={{ 'color': !(dataHistory ? dataHistory[0].grp_approve : 0) ? 'black' : 'blue' }}>
                      &nbsp; (GRP)
                    </Typography>
                    <Typography style={{ 'color': !(dataHistory ? dataHistory[0].ktt_approve : 0) ? 'black' : 'blue' }}>
                      (KTT)
                    </Typography>
                    <Typography style={{ 'color': !(dataHistory ? dataHistory[0].rod_approve : 0) ? 'black' : 'blue' }}>
                      (RSS)
                    </Typography>
                  </Stack>
                </Paper>
              </Stack>
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
                  componentsProps={{
                    toolbar: {
                      csvOptions: {
                        utf8WithBom: true,
                        fileName: `ทะเบียนทรัพย์สินผู้ร่วมวันที่ ${dataHistory ? dataHistory[0].UpdateDate : '...'}`,

                      }
                    }
                  }}
                  rows={dataHistory ?? []}
                  columns={columns}
                  getRowId={(row) => row?.AssetID}
                  getRowHeight={(res) => 'auto'}
                  pageSize={10}
                  // autoHeight
                  disableColumnMenu
                  {...other}
                  disableSelectionOnClick
                  checkboxSelection={(dataHistory ? dataHistory[0].tab_statusid : 0) === 4 || (dataHistory ? dataHistory[0].tab_statusid : 0) === 5 ? false : true}
                  onSelectionModelChange={(newSelectionModel) => handleClick_Value(newSelectionModel)}
                  selectionModel={valueOfIndex}
                  keepNonExistentRowsSelected
                />
              </Box>
              <CommentBPC
                handleClickOpenDialogComment={handleClickOpenDialogComment}
                openDialog={openDialog}
                handleCloseDialogComment={handleCloseDialogComment}
                data={data}
                keyID={keyID}
                description={description}
                setDescription={setDescription}
                setOpenDialog={setOpenDialog}
              />
            </Container>
            <Dialog
              fullWidth
              maxWidth='lg'
              open={openLoadingDialog}
            >
              <DialogTitle>
                กำลังอัปโหลดข้อมูล กรุณาอย่าปิดหน้าจอนี้ !!
              </DialogTitle>
              <Box
                sx={{
                  mt: 10,
                  mb: 10,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <CircularProgressWithLabel value={openLoading} />
              </Box>
            </Dialog>
            <Dialog fullWidth open={openDialog2} onClose={handleCloseDialog}>
              <DialogContent>
                <DialogContentText>
                  {dialogComment.Code} ({dialogComment.Name})
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="comment"
                  onChange={handleChangeComment}
                  value={dialogComment.Comments}
                  fullWidth
                  variant="standard"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleSumbitComment} variant='contained'>Submit</Button>
                <Button onClick={handleCloseDialog} variant='contained' color="error">Cancel</Button>
              </DialogActions>
            </Dialog>
          </Box>
        </AnimatedPage>
      </React.Fragment>
    );
  }
}