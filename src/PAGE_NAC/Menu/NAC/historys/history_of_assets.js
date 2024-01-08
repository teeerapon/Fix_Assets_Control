import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import AnimatedPage from '../../../../AnimatedPage.jsx'
import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import { alpha, styled } from '@mui/material/styles';
import { DataGrid, gridClasses, GridToolbar } from '@mui/x-data-grid';
import Axios from "axios"
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import LinearProgress from '@mui/material/LinearProgress';
import config from '../../../../config.js'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

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

  const d = new Date();
  const year = (d.getFullYear()).toString();
  const month = ((d.getMonth()) + 101).toString().slice(-2);
  const date = ((d.getDate()) + 100).toString().slice(-2);
  const datenow = `${year}-${month}-${date}`;
  const monthString = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];

  const [dataHistory, setDataHistory] = React.useState();
  const data = JSON.parse(localStorage.getItem('data'));
  const checkUserWeb = localStorage.getItem('sucurity');
  const [pageSize, setPageSize] = React.useState(10);
  const [progress, setProgress] = React.useState();
  const [filter, setFilter] = React.useState({ "nacdtl_assetsCode": '', "name": '', "source_approve_userid": '', "update_date": '', "nac_code": '' })


  const filter_Code = async (e, index) => {

    var filterJSON = {
      nacdtl_assetsCode: e.target.innerText
      , name: filter.name
      , source_approve_userid: filter.source_approve_userid
      , update_date: filter.update_date
      , nac_code: filter.nac_code
    }

    setFilter(filterJSON);

    const check = JSON.parse(JSON.stringify(filterJSON),
      (key, value) => value === null || value === '' ? undefined : value);

    // POST request using axios with set headers
    const body = { userCode: data.UserCode }
    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };
    await Axios.post(config.http + '/store_FA_control_HistorysAssets', body, { headers }).catch(function (error) {
      if (error.toJSON().message === 'Request failed with status code 400') {
        setProgress(1)
      }
    }).then(response => {
      if (response.data) {
        setProgress(1)
        setDataHistory((response.data.data).filter(function (item) {
          for (var key in check) {
            if (item[key] === undefined || item[key] != check[key])
              return false;
          }
          return true;
        }))
      }
    });
  }

  const filter_CreateBy = async (e, index) => {

    var filterJSON = {
      nacdtl_assetsCode: filter.nacdtl_assetsCode
      , name: filter.name
      , source_approve_userid: e.target.innerText
      , update_date: filter.update_date
      , nac_code: filter.nac_code
    }

    setFilter(filterJSON);

    const check = JSON.parse(JSON.stringify(filterJSON),
      (key, value) => value === null || value === '' ? undefined : value);

    // POST request using axios with set headers
    const body = { userCode: data.UserCode }
    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };
    await Axios.post(config.http + '/store_FA_control_HistorysAssets', body, { headers }).catch(function (error) {
      if (error.toJSON().message === 'Request failed with status code 400') {
        setProgress(1)
      }
    }).then(response => {
      if (response.data) {
        setProgress(1)
        setDataHistory((response.data.data).filter(function (item) {
          for (var key in check) {
            if (item[key] === undefined || item[key] != check[key])
              return false;
          }
          return true;
        }))
      }
    });
  }

  const filter_TabCode = async (e, index) => {

    var filterJSON = {
      nacdtl_assetsCode: filter.nacdtl_assetsCode
      , name: filter.name
      , source_approve_userid: filter.source_approve_userid
      , update_date: filter.update_date
      , nac_code: e.target.innerText
    }

    setFilter(filterJSON);

    const check = JSON.parse(JSON.stringify(filterJSON),
      (key, value) => value === null || value === '' ? undefined : value);

    // POST request using axios with set headers
    const body = { userCode: data.UserCode }
    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };
    await Axios.post(config.http + '/store_FA_control_HistorysAssets', body, { headers }).catch(function (error) {
      if (error.toJSON().message === 'Request failed with status code 400') {
        setProgress(1)
      }
    }).then(response => {
      if (response.data) {
        setProgress(1)
        setDataHistory((response.data.data).filter(function (item) {
          for (var key in check) {
            if (item[key] === undefined || item[key] != check[key])
              return false;
          }
          return true;
        }))
      }
    });
  }

  const filter_CreateDate = async (e, index) => {

    var filterJSON = {
      nacdtl_assetsCode: filter.nacdtl_assetsCode
      , name: filter.name
      , source_approve_userid: filter.source_approve_userid
      , update_date: e.target.innerText
      , nac_code: filter.nac_code
    }

    setFilter(filterJSON);

    const check = JSON.parse(JSON.stringify(filterJSON),
      (key, value) => value === null || value === '' ? undefined : value);

    // POST request using axios with set headers
    const body = { userCode: data.UserCode }
    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };
    await Axios.post(config.http + '/store_FA_control_HistorysAssets', body, { headers }).catch(function (error) {
      if (error.toJSON().message === 'Request failed with status code 400') {
        setProgress(1)
      }
    }).then(response => {
      if (response.data) {
        setProgress(1)
        setDataHistory((response.data.data).filter(function (item) {
          for (var key in check) {
            if (item[key] === undefined || item[key] != check[key])
              return false;
          }
          return true;
        }))
      }
    });
  }

  const filter_Name = async (e, index) => {

    var filterJSON = {
      nacdtl_assetsCode: filter.nacdtl_assetsCode
      , name: e.target.innerText
      , source_approve_userid: filter.source_approve_userid
      , update_date: filter.update_date
      , nac_code: filter.nac_code
    }

    setFilter(filterJSON);

    const check = JSON.parse(JSON.stringify(filterJSON),
      (key, value) => value === null || value === '' ? undefined : value);

    // POST request using axios with set headers
    const body = { userCode: data.UserCode }
    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };
    await Axios.post(config.http + '/store_FA_control_HistorysAssets', body, { headers }).catch(function (error) {
      if (error.toJSON().message === 'Request failed with status code 400') {
        setProgress(1)
      }
    }).then(response => {
      if (response.data) {
        setProgress(1)
        setDataHistory((response.data.data).filter(function (item) {
          for (var key in check) {
            if (item[key] === undefined || item[key] != check[key])
              return false;
          }
          return true;
        }))
        setProgress(1)
      }
    });
  }

  const columns = [
    { field: 'nacdtl_assetsCode', headerName: 'รหัสทรัพย์สิน', headerClassName: 'super-app-theme--header', minWidth: 130, flex: 1 },
    { field: 'nacdtl_assetsName', headerName: 'ชื่อ', headerClassName: 'super-app-theme--header', minWidth: 130, flex: 1 },
    {
      field: 'nacdtl_assetsPrice',
      headerName: 'ราคาทุน',
      headerClassName: 'super-app-theme--header',
      minWidth: 100,
      flex: 1,
      valueGetter: (params) =>
        `${params.row.nacdtl_assetsPrice.toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 0 }) || ''}`,
    },
    { field: 'nac_code', headerName: 'เลขที่ NAC', headerClassName: 'super-app-theme--header', headerAlign: 'center', align: 'center', minWidth: 130, flex: 1 },
    { field: 'name', headerName: 'หัวข้อรายการ', headerClassName: 'super-app-theme--header', minWidth: 200, flex: 1 },
    { field: 'create_by', headerName: 'ผู้ทำรายการ', headerClassName: 'super-app-theme--header', headerAlign: 'center', align: 'center', minWidth: 100, flex: 1 },
    { field: 'source_approve_userid', headerName: 'ผู้อนุมัติ', headerClassName: 'super-app-theme--header', headerAlign: 'center', align: 'center', minWidth: 100, flex: 1 },
    { field: 'account_aprrove_id', headerName: 'ผู้ปิดรายการ', headerClassName: 'super-app-theme--header', headerAlign: 'center', align: 'center', minWidth: 100, flex: 1 },
    {
      field: 'update_date',
      headerName: 'วันที่ปิดรายการ',
      type: 'date',
      headerClassName: 'super-app-theme--header',
      minWidth: 170,
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return (
          <React.Fragment>
            {params.row.update_date ?
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={1}
              >
                <CalendarMonthIcon />
                <Typography variant='body2'>
                  {params.row.update_date.split('T')[0] || ''}
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
    await Axios.post(config.http + '/store_FA_control_HistorysAssets', userCode, { headers }).catch(function (error) {
      if (error.toJSON().message === 'Request failed with status code 400') {
        setProgress(1)
      }
    }).then(response => {
      setDataHistory(response.data.data)
      setProgress(1)
    });
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
                ประวัติทรัพย์สินที่ดำเนินการเสร็จสิ้น
              </Typography>
            </AnimatedPage>
          </Toolbar>
        </AppBar>
        <AnimatedPage>
          {progress !== 1 ? <React.Fragment><Box sx={{ width: '100%' }}><LinearProgress /></Box></React.Fragment> : null}
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <Container maxWidth="1000px" sx={{ pt: 3, pb: 3 }}>
              <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
                <Autocomplete
                  autoHighlight
                  disablePortal
                  id="combo-box-demo"
                  size='small'
                  sx={{ flexGrow: 1, padding: 1 }}
                  value={filter.nacdtl_assetsCode}
                  onChange={(e) => filter_Code(e)}
                  options={
                    dataHistory ? dataHistory.map((res) => res.nacdtl_assetsCode).filter(x => !!x)
                      .reduce((x, y) => x.includes(y) ? x : [...x, y], []) : []
                  }
                  renderInput={(params) => <TextField label="รหัสทรัพย์สิน" {...params} />}
                />
                <Autocomplete
                  autoHighlight
                  disablePortal
                  id="combo-box-demo"
                  size='small'
                  sx={{ flexGrow: 1, padding: 1 }}
                  value={filter.name}
                  onChange={(e) => filter_Name(e)}
                  options={
                    dataHistory ? dataHistory.map((res) => res.name).filter(x => !!x)
                      .reduce((x, y) => x.includes(y) ? x : [...x, y], []) : []
                  }
                  renderInput={(params) => <TextField label="ชื่อหัวข้อ" {...params} />}
                />
                <Autocomplete
                  autoHighlight
                  disablePortal
                  id="combo-box-demo"
                  size='small'
                  sx={{ flexGrow: 1, padding: 1 }}
                  value={filter.source_approve_userid}
                  onChange={(e) => filter_CreateBy(e)}
                  options={
                    dataHistory ? dataHistory.map((res) => res.source_approve_userid).filter(x => !!x)
                      .reduce((x, y) => x.includes(y) ? x : [...x, y], []) : []
                  }
                  renderInput={(params) => <TextField label="ผู้อนุมัติรายการ" {...params} />}
                />
                <Autocomplete
                  autoHighlight
                  disablePortal
                  id="combo-box-demo"
                  size='small'
                  sx={{ flexGrow: 1, padding: 1 }}
                  value={filter.update_date}
                  onChange={(e) => filter_CreateDate(e)}
                  options={
                    dataHistory ? dataHistory.map((res) => res.update_date).filter(x => !!x)
                      .reduce((x, y) => x.includes(y) ? x : [...x, y], []) : []
                  }
                  renderInput={(params) => <TextField label="วันที่ปิดรายการ" {...params} />}
                />
                <Autocomplete
                  autoHighlight
                  disablePortal
                  id="combo-box-demo"
                  size='small'
                  sx={{ flexGrow: 1, padding: 1 }}
                  value={filter.nac_code}
                  onChange={(e) => filter_TabCode(e)}
                  options={
                    dataHistory ? dataHistory.map((res) => res.nac_code).filter(x => !!x)
                      .reduce((x, y) => x.includes(y) ? x : [...x, y], []) : []
                  }
                  renderInput={(params) => <TextField label="เลขที่ NAC" {...params} />}
                />
              </Stack>
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
                  rows={dataHistory ?? []}
                  columns={columns}
                  getRowId={(dataHistory) => dataHistory.nacdtl_id}
                  pageSize={pageSize}
                  onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                  pagination
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
        </AnimatedPage>
      </React.Fragment>
    );
  }
}