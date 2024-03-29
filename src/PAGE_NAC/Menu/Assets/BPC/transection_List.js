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
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

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
  const [filter, setFilter] = React.useState({ "Code": '', "Name": '', "CreateBy": '', "CreateDate": '', Position: '', "tab_code": '', "Details": '' })

  const filter_Code = async (e, index) => {

    var filterJSON = {
      Code: e.target.innerText
      , Name: filter.Name
      , CreateBy: filter.CreateBy
      , CreateDate: filter.CreateDate
      , Position: filter.Position
      , tab_code: filter.tab_code
      , Details: filter.Details
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
    await Axios.post(config.http + '/FA_Control_BPC_GroupBy', body, { headers }).catch(function (error) {
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

  const filter_Position = async (e, index) => {

    var filterJSON = {
      Code: filter.Code
      , Name: filter.Name
      , CreateBy: filter.CreateBy
      , CreateDate: filter.CreateDate
      , Position: e.target.innerText
      , tab_code: filter.tab_code
      , Details: filter.Details
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
    await Axios.post(config.http + '/FA_Control_BPC_GroupBy', body, { headers }).catch(function (error) {
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
      Code: filter.Code
      , Name: filter.Name
      , CreateBy: e.target.innerText
      , CreateDate: filter.CreateDate
      , Position: filter.Position
      , tab_code: filter.tab_code
      , Details: filter.Details
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
    await Axios.post(config.http + '/FA_Control_BPC_GroupBy', body, { headers }).catch(function (error) {
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

  const filter_TabCode = async (e, index) => {

    var filterJSON = {
      Code: filter.Code
      , Name: filter.Name
      , CreateBy: filter.CreateBy
      , CreateDate: filter.CreateDate
      , Position: filter.Position
      , tab_code: e.target.innerText
      , Details: filter.Details
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
    await Axios.post(config.http + '/FA_Control_BPC_GroupBy', body, { headers }).catch(function (error) {
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
      Code: filter.Code
      , Name: filter.Name
      , CreateBy: filter.CreateBy
      , CreateDate: e.target.innerText
      , Position: filter.Position
      , tab_code: filter.tab_code
      , Details: filter.Details
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
    await Axios.post(config.http + '/FA_Control_BPC_GroupBy', body, { headers }).catch(function (error) {
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

  const filter_Name = async (e, index) => {

    var filterJSON = {
      Code: filter.Code
      , Name: e.target.innerText
      , CreateBy: filter.CreateBy
      , CreateDate: filter.CreateDate
      , Position: filter.Position
      , tab_code: filter.tab_code
      , Details: filter.Details
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
    await Axios.post(config.http + '/FA_Control_BPC_GroupBy', body, { headers }).catch(function (error) {
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

  const filter_Details = async (e, index) => {

    var filterJSON = {
      Code: filter.Code
      , Name: filter.Name
      , CreateBy: filter.CreateBy
      , CreateDate: filter.CreateDate
      , Position: filter.Position
      , tab_code: filter.tab_code
      , Details: e.target.innerText
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
    await Axios.post(config.http + '/FA_Control_BPC_GroupBy', body, { headers }).catch(function (error) {
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

  const columns = [
    { field: 'Code', headerName: 'รหัสทรัพย์สิน', headerClassName: 'super-app-theme--header', minWidth: 150, flex: 1, headerAlign: 'center', align: 'center', },
    { field: 'Name', headerName: 'ชื่อ', headerClassName: 'super-app-theme--header', width: 250, headerAlign: 'center' },
    { field: 'Position', headerName: 'Location NAC', headerClassName: 'super-app-theme--header', width: 130, headerAlign: 'center', align: 'center', },
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
    { field: 'Details', headerName: 'รายละเอียด', headerClassName: 'super-app-theme--header', minWidth: 150, flex: 1, headerAlign: 'center' },
    { field: 'Comments', headerName: 'ความคิดเห็น', headerClassName: 'super-app-theme--header', minWidth: 150, flex: 1, headerAlign: 'center', },
    { field: 'tab_code', headerName: 'เลขที่อ้างอิง', headerClassName: 'super-app-theme--header', width: 130, headerAlign: 'center', align: 'center', },
    // {
    //   field: 'ImagePath',
    //   headerName: 'Images 1',
    //   headerClassName: 'super-app-theme--header',
    //   width: 200,
    //   headerAlign: 'center',
    //   align: 'center',
    //   renderCell: (params) => {
    //     return (
    //       <React.Fragment>
    //         <ImageListItem key={params.row.ImagePath}>
    //           <img
    //             src={`${params.row.ImagePath}?w = 248 & fit=crop & auto=format`}
    //             srcSet={`${params.row.ImagePath}?w = 248 & fit=crop & auto=format & dpr=2 2x`}
    //             alt={params.row.Name}
    //             onError={({ currentTarget }) => {
    //               currentTarget.onerror = null; // prevents looping
    //               currentTarget.src = "http://vpnptec.dyndns.org:10280/OPS_Fileupload/ATT_230400022.jpg";
    //             }}
    //             loading="lazy"
    //           />
    //           <ImageListItemBar
    //             sx={{ backgroundColor: 'rgba(0, 0, 0, 1)', color: 'rgba(255, 255, 255, 1)' }}
    //             position="below"
    //             title={<span>&nbsp; &nbsp;{params.row.Code}_1</span>}
    //           />
    //         </ImageListItem>
    //       </React.Fragment>
    //     )
    //   }
    // },
    // {
    //   field: 'ImagePath_2',
    //   headerName: 'Images 2',
    //   headerClassName: 'super-app-theme--header',
    //   width: 200,
    //   headerAlign: 'center',
    //   align: 'center',
    //   renderCell: (params) => {
    //     return (
    //       <React.Fragment>
    //         <ImageListItem key={params.row.ImagePath_2}>
    //           <img
    //             src={`${params.row.ImagePath_2}?w = 248 & fit=crop & auto=format`}
    //             srcSet={`${params.row.ImagePath_2}?w = 248 & fit=crop & auto=format & dpr=2 2x`}
    //             alt={params.row.Name}
    //             onError={({ currentTarget }) => {
    //               currentTarget.onerror = null; // prevents looping
    //               currentTarget.src = "http://vpnptec.dyndns.org:10280/OPS_Fileupload/ATT_230400022.jpg";
    //             }}
    //             loading="lazy"
    //           />
    //           <ImageListItemBar
    //             sx={{ backgroundColor: 'rgba(0, 0, 0, 1)', color: 'rgba(255, 255, 255, 1)' }}
    //             position="below"
    //             title={<span>&nbsp; &nbsp;{params.row.Code}_2</span>}
    //           />
    //         </ImageListItem>
    //       </React.Fragment>
    //     )
    //   }
    // },
  ]

  React.useEffect(async () => {
    // POST request using axios with set headers
    const body = { keyID: '' }
    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };
    await Axios.post(config.http + '/FA_Control_BPC_GroupBy', body, { headers }).catch(function (error) {
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
                ประวัติการดำเนินการทรัพย์สินผู้ร่วม
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
                  sx={{ flexGrow: 1, padding: 1 }}
                  size='small'
                  value={filter.Code}
                  onChange={(e) => filter_Code(e)}
                  options={
                    dataHistory ? dataHistory.map((res) => res.Code).filter(x => !!x)
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
                  value={filter.Name}
                  onChange={(e) => filter_Name(e)}
                  options={
                    dataHistory ? dataHistory.map((res) => res.Name).filter(x => !!x)
                      .reduce((x, y) => x.includes(y) ? x : [...x, y], []) : []
                  }
                  renderInput={(params) => <TextField label="ชื่อทรัพย์สิน" {...params} />}
                />
                <Autocomplete
autoHighlight
                  disablePortal
                  id="combo-box-demo"
                  size='small'
                  sx={{ flexGrow: 1, padding: 1 }}
                  value={filter.Position}
                  onChange={(e) => filter_Position(e)}
                  options={
                    dataHistory ? dataHistory.map((res) => res.Position).filter(x => !!x)
                      .reduce((x, y) => x.includes(y) ? x : [...x, y], []) : []
                  }
                  renderInput={(params) => <TextField label="Position" {...params} />}
                />
                <Autocomplete
autoHighlight
                  disablePortal
                  id="combo-box-demo"
                  size='small'
                  sx={{ flexGrow: 1, padding: 1 }}
                  value={filter.CreateBy}
                  onChange={(e) => filter_CreateBy(e)}
                  options={
                    dataHistory ? dataHistory.map((res) => res.CreateBy).filter(x => !!x)
                      .reduce((x, y) => x.includes(y) ? x : [...x, y], []) : []
                  }
                  renderInput={(params) => <TextField label="ผู้ทำรายการ" {...params} />}
                />
              </Stack>
              <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
                <Autocomplete
autoHighlight
                  disablePortal
                  id="combo-box-demo"
                  size='small'
                  sx={{ flexGrow: 1, padding: 1 }}
                  value={filter.CreateDate}
                  onChange={(e) => filter_CreateDate(e)}
                  options={
                    dataHistory ? dataHistory.map((res) => res.CreateDate).filter(x => !!x)
                      .reduce((x, y) => x.includes(y) ? x : [...x, y], []) : []
                  }
                  renderInput={(params) => <TextField label="วันที่-เวลา" {...params} />}
                />
                <Autocomplete
autoHighlight
                  disablePortal
                  id="combo-box-demo"
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
                  value={filter.Details}
                  onChange={(e) => filter_Details(e)}
                  options={
                    dataHistory ? dataHistory.map((res) => res.Details).filter(x => !!x)
                      .reduce((x, y) => x.includes(y) ? x : [...x, y], []) : []
                  }
                  renderInput={(params) => <TextField label="รายละเอียด" {...params} />}
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
                  getRowId={(row) => row?.AssetID}
                  getRowHeight={(res) => 'auto'}
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