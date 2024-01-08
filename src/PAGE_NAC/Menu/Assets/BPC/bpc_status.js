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
import Button from '@mui/material/Button';
import ArticleIcon from '@mui/icons-material/Article';
import Paper from '@mui/material/Paper';

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

  const checkUserWeb = localStorage.getItem('sucurity');
  const [dataHistory, setDataHistory] = React.useState();
  const [progress, setProgress] = React.useState();
  const navigate = useNavigate();
  const [filter, setFilter] = React.useState({ "tab_code": '', "CreateBy": '', "CreateDate": '', tab_statusid: '', now_approve: '' })

  const filter_TabCode = async (e, index) => {

    var filterJSON = {
      tab_code: e.target.innerText
      , CreateBy: filter.Name
      , CreateDate: filter.CreateBy
      , tab_statusid: filter.tab_statusid
      , now_approve: filter.now_approve
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
    await Axios.post(config.http + '/FA_Control_BPC_SelectStatus', body, { headers }).catch(function (error) {
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

  const filter_TabStatusid = async (e, index) => {

    var filterJSON = {
      tab_code: filter.tab_code
      , CreateBy: filter.CreateBy
      , CreateDate: filter.CreateDate
      , tab_statusid: e.target.innerText
      , now_approve: filter.now_approve
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
    await Axios.post(config.http + '/FA_Control_BPC_SelectStatus', body, { headers }).catch(function (error) {
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

  const filter_CreateBy = async (e, index) => {

    var filterJSON = {
      tab_code: filter.tab_code
      , CreateBy: e.target.innerText
      , CreateDate: filter.CreateDate
      , tab_statusid: filter.tab_statusid
      , now_approve: filter.now_approve
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
    await Axios.post(config.http + '/FA_Control_BPC_SelectStatus', body, { headers }).catch(function (error) {
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

  const filter_CreateDate = async (e, index) => {

    var filterJSON = {
      tab_code: filter.tab_code
      , CreateBy: filter.CreateBy
      , CreateDate: e.target.innerText
      , tab_statusid: filter.tab_statusid
      , now_approve: filter.now_approve
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
    await Axios.post(config.http + '/FA_Control_BPC_SelectStatus', body, { headers }).catch(function (error) {
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

  const filter_Approve = async (e, index) => {

    var filterJSON = {
      tab_code: filter.tab_code
      , CreateBy: filter.CreateBy
      , CreateDate: filter.CreateDate
      , tab_statusid: filter.tab_statusid
      , now_approve: e.target.innerText
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
    await Axios.post(config.http + '/FA_Control_BPC_SelectStatus', body, { headers }).catch(function (error) {
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

  const handleEditClick = (event, params) => {
    event.preventDefault();
    navigate('/FA_Control_BPC_SELECT_TEMP?keyID=' + params.row.tab_code)
  };

  const columns = [
    { field: 'tab_code', headerName: 'เลขที่อ้างอิง', headerClassName: 'super-app-theme--header', width: 130, headerAlign: 'center', align: 'center', },
    { field: 'CreateBy', headerName: 'ผู้ทำรายการ', headerClassName: 'super-app-theme--header', width: 130, headerAlign: 'center', align: 'center', },
    {
      field: 'CreateDate',
      headerName: 'เวลาที่ทำรายการ',
      headerClassName: 'super-app-theme--header',
      minWidth: 180,
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
    {
      field: 'tab_statusid',
      headerName: 'สถานะการทำรายการ',
      headerClassName: 'super-app-theme--header',
      minWidth: 180,
      maxWidth: 250,
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return (
          <React.Fragment >
            <Item
              style={{
                //'maxWidth': 'fit-content',
                borderRadius: '100px',
                width: '100%',
                textAlign: 'center',
                'backgroundColor': params.row.tab_statusid === 1 || params.row.tab_statusid === 2 || params.row.tab_statusid === 3 ?
                  '#1E90FF' : params.row.tab_statusid === 4 ? '#008000' : '#DC143C'
              }}
            >
              <Typography variant='body2'>
                {params.row.tab_status}
              </Typography>
            </Item>
          </React.Fragment>
        );
      }
    },
    {
      field: 'now_approve',
      headerName: 'ผู้ตรวจสอบ',
      headerClassName: 'super-app-theme--header',
      minWidth: 180,
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return (
          <React.Fragment >
            <Typography variant='body2'>
              {params.row.now_approve}
            </Typography>
          </React.Fragment>
        );
      }
    },
    {
      field: 'action',
      headerName: 'Action',
      headerClassName: 'super-app-theme--header',
      width: 160,
      disableExport: true,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return (
          <React.Fragment>
            <Button
              variant="contained"
              color="warning"
              onClick={(event) => handleEditClick(event, params)}
              sx={{ p: 0.8, pb: 0.5, pt: 0.5 }}
            >
              <ArticleIcon />
            </Button>
          </React.Fragment>
        );
      },
    },
  ]

  React.useEffect(async () => {
    // POST request using axios with set headers
    const body = { keyID: '' }
    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };
    await Axios.post(config.http + '/FA_Control_BPC_SelectStatus', body, { headers }).catch(function (error) {
      if (error.toJSON().message === 'Request failed with status code 400') {
        setProgress(1)
      }
    }).then(response => {
      if (response.data) {
        console.log(response.data);
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
                สถานะรายการทรัพย์สินผู้ร่วม
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
                  // fullWidth
                  size='small'
                  sx={{ flexGrow: 1, padding: 1 }}
                  value={filter.tab_code}
                  onChange={(e) => filter_TabCode(e)}
                  options={
                    dataHistory ? dataHistory.map((res) => res.tab_code).filter(x => !!x)
                      .reduce((x, y) => x.includes(y) ? x : [...x, y], []) : []
                  }
                  renderInput={(params) => <TextField label="เลขที่อ้างอิง" {...params} />}
                />
                <Autocomplete
autoHighlight
                  disablePortal
                  id="combo-box-demo"
                  size='small'
                  sx={{ flexGrow: 1, padding: 1 }}
                  // fullWidth
                  value={filter.CreateDate}
                  onChange={(e) => filter_CreateDate(e)}
                  options={
                    dataHistory ? dataHistory.map((res) => res.CreateDate).filter(x => !!x)
                      .reduce((x, y) => x.includes(y) ? x : [...x, y], []) : []
                  }
                  renderInput={(params) => <TextField label="วันที่-เวลาที่ทำรายการ" {...params} />}
                />
                <Autocomplete
autoHighlight
                  disablePortal
                  id="combo-box-demo"
                  size='small'
                  sx={{ flexGrow: 1, padding: 1 }}
                  // fullWidth
                  value={filter.Name}
                  onChange={(e) => filter_TabStatusid(e)}
                  options={
                    dataHistory ? dataHistory.map((res) => res.tab_status).filter(x => !!x)
                      .reduce((x, y) => x.includes(y) ? x : [...x, y], []) : []
                  }
                  renderInput={(params) => <TextField label="สถานะการทำรายการ" {...params} />}
                />
                <Autocomplete
autoHighlight
                  disablePortal
                  id="combo-box-demo"
                  size='small'
                  sx={{ flexGrow: 1, padding: 1 }}
                  // fullWidth
                  value={filter.CreateBy}
                  onChange={(e) => filter_CreateBy(e)}
                  options={
                    dataHistory ? dataHistory.map((res) => res.CreateBy).filter(x => !!x)
                      .reduce((x, y) => x.includes(y) ? x : [...x, y], []) : []
                  }
                  renderInput={(params) => <TextField label="ผู้ทำรายการ" {...params} />}
                />
                <Autocomplete
autoHighlight
                  disablePortal
                  id="combo-box-demo"
                  size='small'
                  sx={{ flexGrow: 1, padding: 1 }}
                  // fullWidth
                  value={filter.now_approve}
                  onChange={(e) => filter_Approve(e)}
                  options={
                    dataHistory ? dataHistory.map((res) => res.now_approve).filter(x => !!x)
                      .reduce((x, y) => x.includes(y) ? x : [...x, y], []) : []
                  }
                  renderInput={(params) => <TextField label="ผู้ตรวจสอบ" {...params} />}
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

                      }
                    }
                  }}
                  rows={dataHistory ?? []}
                  columns={columns}
                  getRowId={(row) => row?.tab_id}
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