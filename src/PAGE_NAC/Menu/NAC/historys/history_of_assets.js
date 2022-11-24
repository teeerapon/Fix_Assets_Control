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

export default function History_of_assets() {

  const d = new Date();
  const year = (d.getFullYear()).toString();
  const month = ((d.getMonth()) + 101).toString().slice(-2);
  const date = ((d.getDate()) + 100).toString().slice(-2);
  const datenow = `${year}-${month}-${date}`;
  const monthString = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];

  const [dataHistory, setDataHistory] = React.useState();
  const data = JSON.parse(localStorage.getItem('data'));
  const checkUserWeb = localStorage.getItem('sucurity');

  const dataChange = !dataHistory ? [] : dataHistory.map(function (elt) {
    if (elt.name === 'เปลี่ยนแปลงรายละเอียดทรัพย์สิน' && (datenow.split('-')[1] === (!elt.update_date ? '' : elt.update_date.split('-')[1]))) {
      return 1
    } else {
      return 0
    }
  }).reduce(function (a, b) { // sum all resulting numbers
    return a + b
  })

  const dataAdd = !dataHistory ? [] : dataHistory.map(function (elt) {
    if (elt.name === 'เพิ่มบัญชีทรัพย์สินถาวร' && (datenow.split('-')[1] === (!elt.update_date ? '' : elt.update_date.split('-')[1]))) {
      return 1
    } else {
      return 0
    }
  }).reduce(function (a, b) { // sum all resulting numbers
    return a + b
  })

  const dataTranfers = !dataHistory ? [] : dataHistory.map(function (elt) {
    if (elt.name === 'โยกย้ายทรัพย์สิน' && (datenow.split('-')[1] === (!elt.update_date ? '' : elt.update_date.split('-')[1]))) {
      return 1
    } else {
      return 0
    }
  }).reduce(function (a, b) { // sum all resulting numbers
    return a + b
  })

  const dataDelete = !dataHistory ? [] : dataHistory.map(function (elt) {
    if (elt.name === 'ตัดจากบัญชีทรัพย์สินถาวร' && (datenow.split('-')[1] === (!elt.update_date ? '' : elt.update_date.split('-')[1]))) {
      return 1
    } else {
      return 0
    }
  }).reduce(function (a, b) { // sum all resulting numbers
    return a + b
  })

  const dataSeals = !dataHistory ? [] : dataHistory.map(function (elt) {
    if (elt.name === 'ขายทรัพย์สิน' && (datenow.split('-')[1] === (!elt.update_date ? '' : elt.update_date.split('-')[1]))) {
      return 1
    } else {
      return 0
    }
  }).reduce(function (a, b) { // sum all resulting numbers
    return a + b
  })

  const columns = [
    { field: 'nacdtl_assetsCode', headerName: 'รหัสทรัพย์สิน', headerClassName: 'super-app-theme--header', width: 130, },
    { field: 'nacdtl_assetsName', headerName: 'ชื่อ', headerClassName: 'super-app-theme--header', flex: 1, },
    {
      field: 'nacdtl_assetsPrice',
      headerName: 'ราคาทุน',
      headerClassName: 'super-app-theme--header',
      width: 150,
      valueGetter: (params) =>
        `${params.row.nacdtl_assetsPrice.toLocaleString() || ''}`,
    },
    { field: 'nac_code', headerName: 'เลขที่ NAC', headerClassName: 'super-app-theme--header', headerAlign: 'center', align: 'center', width: 130 },
    { field: 'name', headerName: 'หัวข้อรายการ', headerClassName: 'super-app-theme--header', flex: 1 },
    { field: 'create_by', headerName: 'ผู้ทำรายการ', headerClassName: 'super-app-theme--header', headerAlign: 'center', align: 'center', width: 100, },
    { field: 'source_approve_userid', headerName: 'ผู้อนุมัติ', headerClassName: 'super-app-theme--header', headerAlign: 'center', align: 'center', width: 100, },
    { field: 'account_aprrove_id', headerName: 'ผู้ปิดรายการ', headerClassName: 'super-app-theme--header', headerAlign: 'center', align: 'center', width: 100, },
    {
      field: 'update_date',
      headerName: 'วันที่ปิดรายการ',
      type: 'date',
      headerClassName: 'super-app-theme--header',
      width: 150,
      headerAlign: 'center',
      align: 'center',
    },
  ];

  React.useEffect(() => {
    // POST request using axios with set headers
    const userCode = { userCode: data.UserCode }
    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };
    Axios.post('http://192.168.220.1:32001/api/store_FA_control_HistorysAssets', userCode, { headers })
      .then(response => setDataHistory(response.data.data));
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
              <Typography variant="h5" color="inherit" noWrap>
                ประวัติทรัพย์สินที่ดำเนินการเสร็จสิ้น
              </Typography>
            </AnimatedPage>
          </Toolbar>
        </AppBar>
        <AnimatedPage>
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <Container maxWidth="1000px" sx={{ pt: 3, pb: 3 }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
                spacing={2}
              >
                <Card
                  style={{
                    'cursor': 'pointer',
                    'flex': 1,
                    'margin': '0px 20px',
                    'padding': '15px',
                    'paddingBottom': '5px',
                    'border-radius': '10px',
                  }}
                >
                  <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      เพิ่มบัญชีทรัพย์สินถาวร
                    </Typography>
                    <Typography sx={{ fontSize: 16 }} component="div">
                      <b>{!dataHistory ? 0 : dataAdd} รายการ</b>
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      เดือน {monthString[d.getMonth()]}
                    </Typography>
                  </CardContent>
                </Card>
                <Card
                  style={{
                    'cursor': 'pointer',
                    'flex': 1,
                    'margin': '0px 20px',
                    'padding': '15px',
                    'paddingBottom': '5px',
                    'border-radius': '10px',
                  }}
                >
                  <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      โยกย้ายทรัพย์สิน
                    </Typography>
                    <Typography sx={{ fontSize: 16 }} component="div">
                      <b>{!dataHistory ? 0 : dataTranfers} รายการ</b>
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      เดือน {monthString[d.getMonth()]}
                    </Typography>
                  </CardContent>
                </Card>
                <Card
                  style={{
                    'cursor': 'pointer',
                    'flex': 1,
                    'margin': '0px 20px',
                    'padding': '15px',
                    'paddingBottom': '5px',
                    'border-radius': '10px',
                  }}
                >
                  <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      เปลี่ยนแปลงรายละเอียด
                    </Typography>
                    <Typography sx={{ fontSize: 16 }} component="div">
                      <b>{!dataHistory ? 0 : dataChange} รายการ</b>
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      เดือน {monthString[d.getMonth()]}
                    </Typography>
                  </CardContent>
                </Card>
                <Card
                  style={{
                    'cursor': 'pointer',
                    'flex': 1,
                    'margin': '0px 20px',
                    'padding': '15px',
                    'paddingBottom': '5px',
                    'border-radius': '10px',
                  }}
                >
                  <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      ตัดทรัพย์สินถาวร
                    </Typography>
                    <Typography sx={{ fontSize: 16 }} component="div">
                      <b>{!dataHistory ? 0 : dataDelete} รายการ</b>
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      เดือน {monthString[d.getMonth()]}
                    </Typography>
                  </CardContent>
                </Card>
                <Card
                  style={{
                    'cursor': 'pointer',
                    'flex': 1,
                    'margin': '0px 20px',
                    'padding': '15px',
                    'paddingBottom': '5px',
                    'border-radius': '10px',
                  }}
                >
                  <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      ขายทรัพย์สิน
                    </Typography>
                    <Typography sx={{ fontSize: 16 }} component="div">
                      <b>{!dataHistory ? 0 : dataSeals} รายการ</b>
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      เดือน {monthString[d.getMonth()]}
                    </Typography>
                  </CardContent>
                </Card>
              </Stack>
              <Box
                sx={{
                  height: 423,
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
                  rows={dataHistory ?? []}
                  columns={columns}
                  getRowId={(dataHistory) => dataHistory.nacdtl_id}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  //getRowHeight={() => 'auto'}
                  disableColumnMenu
                  //autoHeight={true}
                  getRowClassName={(params) =>
                    params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                  }
                  disableSelectionOnClick
                //checkboxSelection
                />
              </Box>
            </Container>
          </Box>
        </AnimatedPage>
      </React.Fragment>
    );
  }
}