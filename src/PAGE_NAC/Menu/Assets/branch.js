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
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LinearProgress from '@mui/material/LinearProgress';
import Badge from '@mui/material/Badge';
import ImageIcon from '@mui/icons-material/Image';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';


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
  const [pageSize, setPageSize] = React.useState(10);
  const [progress, setProgress] = React.useState();
  const [openImage, setOpenImage] = React.useState(false);
  const [imageData, setImageData] = React.useState({ Code: '', Name: '', image_1: '', image_2: '' })

  const handleUploadFile_1 = async (e, index) => {
    e.preventDefault();

    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };

    if (['jpg', 'png', 'gif'].indexOf((e.target.files[0].name).split('.')[1]) > -1) {

      const formData_1 = new FormData();
      formData_1.append("file", e.target.files[0]);
      formData_1.append("fileName", e.target.files[0].name);

      await Axios.post("http://vpnptec.dyndns.org:32001/api/check_files_NewNAC", formData_1, { headers })
        .then(async (res) => {
          const Code = imageData.Code
          const image_1 = 'http://vpnptec.dyndns.org:33080/NEW_NAC/' + res.data.attach[0].ATT + '.' + e.target.files[0].name.split('.').pop();

          const body = { Code: Code, image_1: image_1 }

          await Axios.post("http://vpnptec.dyndns.org:32001/api/FA_Control_Edit_EBook", body, { headers })
            .then(async (res) => {
              if (res.data) {
                alert('เปลี่ยนแปลงรูปภาพที่ 1 สำเร็จ')
                setImageData({
                  Code: res.data[0].Code
                  , Name: res.data[0].Name
                  , image_1: res.data[0].ImagePath
                  , image_2: res.data[0].ImagePath_2
                })
              }
            })
        })

    } else {
      alert('ไฟล์ประเภทนี้ไม่ได้รับอนุญาติให้ใช้งานในระบบ \nใช้ได้เฉพาะ .csv, .xls, .txt, .ppt, .doc, .pdf, .jpg, .png, .gif')
    }
  }

  const handleUploadFile_2 = async (e, index) => {
    e.preventDefault();

    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };

    if (['csv', 'xls', 'txt', 'ppt', 'doc', 'pdf', 'jpg', 'png', 'gif'].indexOf((e.target.files[0].name).split('.')[1]) > -1) {

      const formData_2 = new FormData();
      formData_2.append("file", e.target.files[0]);
      formData_2.append("fileName", e.target.files[0].name);

      await Axios.post("http://vpnptec.dyndns.org:32001/api/check_files_NewNAC", formData_2, { headers })
        .then(async (res) => {
          const Code = imageData.Code
          const image_1 = 'http://vpnptec.dyndns.org:33080/NEW_NAC/' + res.data.attach[0].ATT + '.' + e.target.files[0].name.split('.').pop();

          const body = { Code: Code, image_1: image_1 }

          await Axios.post("http://vpnptec.dyndns.org:32001/api/FA_Control_Edit_EBook", body, { headers })
            .then(async (res) => {
              if (res.data) {
                alert('เปลี่ยนแปลงรูปภาพที่ 1 สำเร็จ')
                setImageData({
                  Code: res.data[0].Code
                  , Name: res.data[0].Name
                  , image_1: res.data[0].ImagePath
                  , image_2: res.data[0].ImagePath_2
                })
              }
            })
        })

    } else {
      alert('ไฟล์ประเภทนี้ไม่ได้รับอนุญาติให้ใช้งานในระบบ \nใช้ได้เฉพาะ .csv, .xls, .txt, .ppt, .doc, .pdf, .jpg, .png, .gif')
    }
  }

  const handleClickOpenImage = (event, params) => {
    setOpenImage(true);
    setImageData({
      Code: params.row.Code
      , Name: params.row.Name
      , image_1: params.row.ImagePath
      , image_2: params.row.ImagePath_2
    })
  };

  const handleCloseImage = () => {
    setOpenImage(false);
  };

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
    {
      field: 'ImagePath',
      headerName: 'Images',
      headerClassName: 'super-app-theme--header',
      minWidth: 50,
      headerAlign: 'center',
      align: 'center',
      flex: 1,
      renderCell: (params) => {
        return (
          <React.Fragment>
            <IconButton color="primary" onClick={(event) => handleClickOpenImage(event, params)} component="label">
              <Badge
                badgeContent={(params.row.ImagePath && params.row.ImagePath_2) ? 2 : (params.row.ImagePath || params.row.ImagePath_2) ? 1 : 0}
                color="primary">
                <ImageIcon color="action" />
              </Badge>
            </IconButton>
          </React.Fragment>
        )
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
    Axios.post('http://vpnptec.dyndns.org:32001/api/store_FA_control_fetch_assets', userCode, { headers }).catch(function (error) {
      if (error.toJSON().message === 'Request failed with status code 400') {
        setProgress(1)
      }
    }).then(response => {
      setDataHistory((response.data.data).filter((res) => res.BranchID === data.branchid));
      setProgress(1)
    });
  }, []);

  if (checkUserWeb !== 'null') {
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
                ทะเบียนทรัพย์สินสาขา {data.branchid}
              </Typography>
            </AnimatedPage>
          </Toolbar>
        </AppBar>
        <AnimatedPage>
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <Container maxWidth="1000px" sx={{ pt: 3, pb: 3 }}>
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
            </Container>
          </Box>
          <Dialog
            open={openImage}
            onClose={handleCloseImage}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {imageData.Name}
            </DialogTitle>
            <DialogContent>
              <ImageList gap={1} sx={{ transform: 'translateZ(0)' }}>
                <ImageListItem key={imageData.image_1}>
                  <img
                    src={`${imageData.image_1}?w=248&fit=crop&auto=format`}
                    srcSet={`${imageData.image_1}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    alt={imageData.Name}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src = "http://vpnptec.dyndns.org:10280/OPS_Fileupload/ATT_230400022.jpg";
                    }}
                    loading="lazy"
                  />
                  <ImageListItemBar
                    sx={{ backgroundColor: 'rgba(0, 0, 0, 1)', color: 'rgba(255, 255, 255, 1)' }}
                    position="below"
                    title={<span>&nbsp; &nbsp;{imageData.Code} (รูปที่ 1)</span>}
                    actionIcon={
                      <IconButton
                        sx={{ color: 'rgba(255, 255, 255, 1)' }}
                        aria-label={`info about ${imageData.Code}`}
                        component="label"
                      >
                        <input hidden type="file" name='file' onChange={(e) => handleUploadFile_1(e)} />
                        <FilePresentIcon sx={{ fontSize: 20 }} />
                      </IconButton>
                    }
                  />
                </ImageListItem>
                <ImageListItem key={imageData.image_2}>
                  <img
                    src={`${imageData.image_2}?w=248&fit=crop&auto=format`}
                    srcSet={`${imageData.image_2}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    alt={imageData.Name}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src = "http://vpnptec.dyndns.org:10280/OPS_Fileupload/ATT_230400022.jpg";
                    }}
                    loading="lazy"
                  />
                  <ImageListItemBar
                    sx={{ backgroundColor: 'rgba(0, 0, 0, 1)', color: 'rgba(255, 255, 255, 1)' }}
                    position="below"
                    title={<span>&nbsp; &nbsp;{imageData.Code} (รูปที่ 2)</span>}
                    actionIcon={
                      <IconButton
                        sx={{ color: 'rgba(255, 255, 255, 1)' }}
                        aria-label={`info about ${imageData.Code}`}
                        component="label"
                      >
                        <input hidden type="file" name='file' onChange={(e) => handleUploadFile_2(e)} />
                        <FilePresentIcon sx={{ fontSize: 20 }} />
                      </IconButton>
                    }
                  />
                </ImageListItem>
              </ImageList>
            </DialogContent>
            <DialogActions>
              <Button variant='contained' onClick={handleCloseImage}>Close</Button>
            </DialogActions>
          </Dialog>
        </AnimatedPage>
      </React.Fragment>
    );
  }
}