import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import AnimatedPage from '../../../AnimatedPage';
import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import { alpha, styled } from '@mui/material/styles';
import { DataGrid, gridClasses, GridToolbar } from '@mui/x-data-grid';
import Axios from "axios"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

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

export default function Reported_of_assets() {

  const [selectMenu, setSelectMenu] = React.useState();
  const [reported_of_assets, setReported_of_assets] = React.useState();
  console.log(!reported_of_assets ? 0 : reported_of_assets.length);
  const data = JSON.parse(localStorage.getItem('data'));
  const [description_value, setDescription_value] = React.useState('');
  const checkUserWeb = localStorage.getItem('sucurity');

  const columns = [
    { field: 'Code', headerName: 'รหัสทรัพย์สิน', headerClassName: 'super-app-theme--header', width: 130 },
    { field: 'Name', headerName: 'ชื่อ', headerClassName: 'super-app-theme--header', width: 200 },
    { field: 'BranchID', headerName: 'สาขา', headerClassName: 'super-app-theme--header', width: 100, headerAlign: 'center', align: 'center', },
    {
      field: 'Date',
      headerName: 'วันที่ตรวจนับ',
      headerClassName: 'super-app-theme--header',
      width: 150,
      headerAlign: 'center',
      align: 'center',
      valueGetter: (params) =>
        `${params.row.Date || ''}`,
    },
    { field: 'EndDate_Success', headerName: 'วันที่ทำ NAC ล่าสุด', headerClassName: 'super-app-theme--header', width: 150, headerAlign: 'center', align: 'center', },
    {
      field: 'UserID',
      headerName: 'ผู้ตรวจนับ',
      headerAlign: 'center',
      align: 'center',
      headerClassName: 'super-app-theme--header',
      width: 100,
      valueGetter: (params) =>
        `${params.row.UserID || ''}`,
    },
    {
      field: 'detail',
      headerName: 'สถานะล่าสุด',
      headerClassName: 'super-app-theme--header',
      flex: 1,
      valueGetter: (params) =>
        `${params.row.detail || ''}`,
    },
    {
      field: 'Reference',
      headerName: 'สถานะครั้งนี้',
      headerClassName: 'super-app-theme--header',
      flex: 1,
      valueGetter: (params) =>
        `${params.row.Reference || ''}`,
    },
    {
      field: 'remarker',
      headerName: 'หมายเหตุ',
      headerClassName: 'super-app-theme--header',
      width: 120,
      renderCell: (params) => {
        return (
          <Typography
            variant='body2'
            style={{
              color: params.row.remarker === 'ตรวจนับแล้ว' ? '#008000' :
                params.row.remarker === 'ยังไม่ได้ตรวจนับ' ? '#DC143C' : ' #FFA500'
            }}
          >
            {params.row.remarker}
          </Typography>
        )
      }
    },
  ];

  React.useEffect(() => {
    // POST request using axios with set headers
    const Description = { Description: '' }
    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };
    Axios.post('http://192.168.220.1:32001/api/FA_Control_Report_All_Counted_by_Description', Description, { headers })
      .then(response => setSelectMenu(response.data.data));
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    setDescription_value(event.target.innerText);
    const Description = { Description: event.target.innerText }
    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };
    Axios.post('http://192.168.220.1:32001/api/FA_Control_Report_All_Counted_by_Description', Description, { headers })
      .then(response => setReported_of_assets(response.data.data));
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
              <Typography variant="h5" color="inherit" noWrap>
                รายงานการตรวจนับทั้งหมด
              </Typography>
            </AnimatedPage>
          </Toolbar>
        </AppBar>
        <AnimatedPage>
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <Container maxWidth="1000px" sx={{ pt: 3, pb: 3 }}>
              <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                sx={{ pb: 2 }}
                options={!selectMenu ? null : selectMenu.map((option) => option.Description)}
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
                  rows={reported_of_assets ?? []}
                  columns={columns}
                  getRowId={(reported_of_assets) => reported_of_assets.RowID}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
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