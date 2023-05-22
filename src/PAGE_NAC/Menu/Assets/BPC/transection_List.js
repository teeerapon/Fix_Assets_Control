import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import AnimatedPage from '../../../../AnimatedPage';
import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { alpha, styled } from '@mui/material/styles';
import { DataGrid, gridClasses, GridToolbar } from '@mui/x-data-grid';
import Axios from "axios"
import TextField from '@mui/material/TextField';
import LinearProgress from '@mui/material/LinearProgress';
import config from '../../../../config'
import { Outlet, useNavigate } from "react-router";
import Autocomplete from '@mui/material/Autocomplete';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

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

  const checkUserWeb = localStorage.getItem('sucurity');
  const [dataHistory, setDataHistory] = React.useState();
  const [progress, setProgress] = React.useState();
  const navigate = useNavigate();
  const [filter, setFilter] = React.useState({ "Code": '', "Name": '', "CreateBy": '', "CreateDate": '', "tab_code": '' })

  const filter_Code = (e, index) => {

    var filterJSON = {
      Code: e.target.innerText
      , Name: filter.Name
      , CreateBy: filter.CreateBy
      , CreateDate: filter.CreateDate
      , tab_code: filter.tab_code
    }

    setFilter(filterJSON);

    const check = JSON.parse(JSON.stringify(filterJSON),
      (key, value) => value === null || value === '' ? undefined : value);

    // POST request using axios with set headers
    const body = { keyID: '' }
    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };
    Axios.post(config.http + '/FA_Control_BPC_GroupBy', body, { headers }).catch(function (error) {
      if (error.toJSON().message === 'Request failed with status code 400') {
        setProgress(1)
      }
    }).then(response => {
      if (response.data) {
        setProgress(1)
        setDataHistory((response.data).filter(function (item) {
          for (var key in check) {
            if (item[key] === undefined || item[key] != check[key])
              return false;
          }
          return true;
        }))
      }
    });
  }

  const filter_CreateBy = (e, index) => {

    var filterJSON = {
      Code: filter.Code
      , Name: filter.Name
      , CreateBy: e.target.innerText
      , CreateDate: filter.CreateDate
      , tab_code: filter.tab_code
    }

    setFilter(filterJSON);

    const check = JSON.parse(JSON.stringify(filterJSON),
      (key, value) => value === null || value === '' ? undefined : value);

    // POST request using axios with set headers
    const body = { keyID: '' }
    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };
    Axios.post(config.http + '/FA_Control_BPC_GroupBy', body, { headers }).catch(function (error) {
      if (error.toJSON().message === 'Request failed with status code 400') {
        setProgress(1)
      }
    }).then(response => {
      if (response.data) {
        setProgress(1)
        setDataHistory((response.data).filter(function (item) {
          for (var key in check) {
            if (item[key] === undefined || item[key] != check[key])
              return false;
          }
          return true;
        }))
      }
    });
  }

  const filter_TabCode = (e, index) => {

    var filterJSON = {
      Code: filter.Code
      , Name: filter.Name
      , CreateBy: filter.CreateBy
      , CreateDate: filter.CreateDate
      , tab_code: e.target.innerText
    }

    setFilter(filterJSON);

    const check = JSON.parse(JSON.stringify(filterJSON),
      (key, value) => value === null || value === '' ? undefined : value);

    // POST request using axios with set headers
    const body = { keyID: '' }
    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };
    Axios.post(config.http + '/FA_Control_BPC_GroupBy', body, { headers }).catch(function (error) {
      if (error.toJSON().message === 'Request failed with status code 400') {
        setProgress(1)
      }
    }).then(response => {
      if (response.data) {
        setProgress(1)
        setDataHistory((response.data).filter(function (item) {
          for (var key in check) {
            if (item[key] === undefined || item[key] != check[key])
              return false;
          }
          return true;
        }))
      }
    });
  }

  const filter_CreateDate = (e, index) => {

    var filterJSON = {
      Code: filter.Code
      , Name: filter.Name
      , CreateBy: filter.CreateBy
      , CreateDate: e.target.innerText
      , tab_code: filter.tab_code
    }

    setFilter(filterJSON);

    const check = JSON.parse(JSON.stringify(filterJSON),
      (key, value) => value === null || value === '' ? undefined : value);

    // POST request using axios with set headers
    const body = { keyID: '' }
    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };
    Axios.post(config.http + '/FA_Control_BPC_GroupBy', body, { headers }).catch(function (error) {
      if (error.toJSON().message === 'Request failed with status code 400') {
        setProgress(1)
      }
    }).then(response => {
      if (response.data) {
        setProgress(1)
        setDataHistory((response.data).filter(function (item) {
          for (var key in check) {
            if (item[key] === undefined || item[key] != check[key])
              return false;
          }
          return true;
        }))
      }
    });
  }

  const filter_Name = (e, index) => {

    var filterJSON = {
      Code: filter.Code
      , Name: e.target.innerText
      , CreateBy: filter.CreateBy
      , CreateDate: filter.CreateDate
      , tab_code: filter.tab_code
    }

    setFilter(filterJSON);

    const check = JSON.parse(JSON.stringify(filterJSON),
      (key, value) => value === null || value === '' ? undefined : value);

    // POST request using axios with set headers
    const body = { keyID: '' }
    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };
    Axios.post(config.http + '/FA_Control_BPC_GroupBy', body, { headers }).catch(function (error) {
      if (error.toJSON().message === 'Request failed with status code 400') {
        setProgress(1)
      }
    }).then(response => {
      if (response.data) {
        setProgress(1)
        setDataHistory((response.data).filter(function (item) {
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
    { field: 'Code', headerName: 'รหัสทรัพย์สิน', headerClassName: 'super-app-theme--header', minWidth: 150, flex: 1, headerAlign: 'center', align: 'center', },
    { field: 'Name', headerName: 'ชื่อ', headerClassName: 'super-app-theme--header', width: 250, headerAlign: 'center' },
    { field: 'CreateBy', headerName: 'ผู้ทำรายการ', headerClassName: 'super-app-theme--header', width: 130, headerAlign: 'center', align: 'center', },
    {
      field: 'CreateDate',
      headerName: 'เวลาที่ทำรายการ',
      headerClassName: 'super-app-theme--header',
      minWidth: 150,
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return (
          <React.Fragment >
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={1}
            >
              <CalendarMonthIcon />
              <Typography variant='body2'>
                {params.row.CreateDate}
              </Typography>
            </Stack>
          </React.Fragment >
        )
      }
    },
    { field: 'Details', headerName: 'รายละเอียด', headerClassName: 'super-app-theme--header', minWidth: 150, flex: 1, headerAlign: 'center' },
    { field: 'Comments', headerName: 'ความคิดเห็น', headerClassName: 'super-app-theme--header', minWidth: 150, flex: 1, headerAlign: 'center', },
    { field: 'tab_code', headerName: 'เลขที่อ้างอิง', headerClassName: 'super-app-theme--header', width: 130, headerAlign: 'center', align: 'center', },
  ]

  React.useEffect(() => {
    // POST request using axios with set headers
    const body = { keyID: '' }
    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };
    Axios.post(config.http + '/FA_Control_BPC_GroupBy', body, { headers }).catch(function (error) {
      if (error.toJSON().message === 'Request failed with status code 400') {
        setProgress(1)
      }
    }).then(response => {
      if (response.data) {
        setProgress(1)
        setDataHistory(response.data)
      }
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
                ประวัติการดำเนินการทรัพย์สินผู้ร่วม
              </Typography>
            </AnimatedPage>
          </Toolbar>
        </AppBar>
        <AnimatedPage>
          {progress !== 1 ? <React.Fragment><Box sx={{ width: '100%' }}><LinearProgress /></Box></React.Fragment> : null}
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <Container maxWidth="1000px" sx={{ pt: 3, pb: 3 }}>
              <Stack direction="row" spacing={2} sx={{ pb: 2, pt: 1 }}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  size='small'
                  sx={{ width: 300 }}
                  value={filter.Code}
                  onChange={(e) => filter_Code(e)}
                  options={
                    dataHistory ? dataHistory.map((res) => res.Code).filter(x => !!x)
                      .reduce((x, y) => x.includes(y) ? x : [...x, y], []) : []
                  }
                  renderInput={(params) => <TextField label="ค้นหาด้วยรหัสทรัพย์สิน..." {...params} />}
                />
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  size='small'
                  sx={{ width: 300 }}
                  value={filter.Name}
                  onChange={(e) => filter_Name(e)}
                  options={
                    dataHistory ? dataHistory.map((res) => res.Name).filter(x => !!x)
                      .reduce((x, y) => x.includes(y) ? x : [...x, y], []) : []
                  }
                  renderInput={(params) => <TextField label="ค้นหาด้วยชื่อทรัพย์สิน..." {...params} />}
                />
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  size='small'
                  sx={{ width: 300 }}
                  value={filter.CreateBy}
                  onChange={(e) => filter_CreateBy(e)}
                  options={
                    dataHistory ? dataHistory.map((res) => res.CreateBy).filter(x => !!x)
                      .reduce((x, y) => x.includes(y) ? x : [...x, y], []) : []
                  }
                  renderInput={(params) => <TextField label="ค้นหาด้วย initial..." {...params} />}
                />
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  size='small'
                  sx={{ width: 300 }}
                  value={filter.CreateDate}
                  onChange={(e) => filter_CreateDate(e)}
                  options={
                    dataHistory ? dataHistory.map((res) => res.CreateDate).filter(x => !!x)
                      .reduce((x, y) => x.includes(y) ? x : [...x, y], []) : []
                  }
                  renderInput={(params) => <TextField label="ค้นหาด้วยวันที่-เวลา..." {...params} />}
                />
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  size='small'
                  sx={{ width: 300 }}
                  value={filter.CreateDate}
                  onChange={(e) => filter_TabCode(e)}
                  options={
                    dataHistory ? dataHistory.map((res) => res.tab_code).filter(x => !!x)
                      .reduce((x, y) => x.includes(y) ? x : [...x, y], []) : []
                  }
                  renderInput={(params) => <TextField label="ค้นหาด้วยเลขที่อ้างอิง..." {...params} />}
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
                        delimiter: ';',
                      }
                    }
                  }}
                  rows={dataHistory ?? []}
                  columns={columns}
                  getRowId={(row) => row?.AssetID}
                  // getRowHeight={(res) => 'auto'}
                  pageSize={10}
                  // autoHeight
                  disableColumnMenu
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