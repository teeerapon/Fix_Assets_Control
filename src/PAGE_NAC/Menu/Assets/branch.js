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
import swal from 'sweetalert';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import config from '../../../config'


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

  const [dataHistory, setDataHistory] = React.useState([]);
  const data = JSON.parse(localStorage.getItem('data'));
  const checkUserWeb = localStorage.getItem('sucurity');
  const [pageSize, setPageSize] = React.useState(10);
  const [progress, setProgress] = React.useState();
  const [typeGroup, setTypeGroup] = React.useState("PTEC");
  const [filteredData, setFilteredData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const columns = [
    { field: 'Code', headerName: 'รหัสทรัพย์สิน', headerClassName: 'super-app-theme--header', minWidth: 150, flex: 1 },
    { field: 'Name', headerName: 'ชื่อ', headerClassName: 'super-app-theme--header', minWidth: 150, flex: 1 },
    { field: 'SerialNo', headerName: 'SerialNo', headerClassName: 'super-app-theme--header', minWidth: 150, flex: 1 },
    { field: 'OwnerID', headerName: 'ผู้ถือครอง', headerClassName: 'super-app-theme--header', minWidth: 100, flex: 1, headerAlign: 'center', align: 'center', },
    {
      field: 'Position',
      headerName: 'Location NAC',
      headerClassName: 'super-app-theme--header',
      minWidth: 100,
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      valueGetter: (params) =>
        params.row.BranchID === 901 ? 'HO' : params.row.Position,
    },
    { field: 'Details', headerName: 'ผลการตรวจนับ', headerClassName: 'super-app-theme--header', minWidth: 100, flex: 1 },
    {
      field: 'Price',
      headerName: 'ราคาทุน',
      headerClassName: 'super-app-theme--header',
      minWidth: 130,
      flex: 1,
      valueGetter: (params) =>
        data.branchid === 901 ? params.row.Price.toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 0 }) : 'ถูกจำกัดสิทธิ์'
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
    // {
    //   field: 'ImagePath',
    //   headerName: 'Images',
    //   headerClassName: 'super-app-theme--header',
    //   minWidth: 50,
    //   headerAlign: 'center',
    //   align: 'center',
    //   flex: 1,
    //   renderCell: (params) => {
    //     return (
    //       <React.Fragment>
    //         <IconButton color="primary" onClick={(event) => handleClickOpenImage(event, params)} component="label">
    //           <Badge
    //             badgeContent={(params.row.ImagePath && params.row.ImagePath_2) ? 2 : (params.row.ImagePath || params.row.ImagePath_2) ? 1 : 0}
    //             color="primary">
    //             <ImageIcon color="action" />
    //           </Badge>
    //         </IconButton>
    //       </React.Fragment>
    //     )
    //   }
    // },
  ];

  React.useEffect(() => {
    // POST request using axios with set headers
    const fatData = async () => {
      const userCode = { userCode: data.UserCode }
      const headers = {
        'Authorization': 'application/json; charset=utf-8',
        'Accept': 'application/json'
      };
      await Axios.post(config.http + '/store_FA_control_fetch_assets', userCode, { headers }).catch(function (error) {
        if (error.toJSON().message === 'Request failed with status code 400') {
          setProgress(1)
        }
      }).then(response => {
        setDataHistory((response.data.data).filter((res) => res.BranchID === data.branchid && res.bac_status === 1));
        setProgress(1)
        setFilteredData((response.data.data).filter((res) => res.BranchID === data.branchid && res.bac_status === 1 && typeGroup.toLowerCase().includes(res.type_group.toLowerCase())));
        setLoading(false)
      });
    }
    fatData();
  }, [data.UserCode, data.branchid, typeGroup]);

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
                  mt: 1,
                }}
              >
                <ToggleButtonGroup
                  color="primary"
                  value={typeGroup}
                  exclusive
                  onChange={(e) => {
                    setTypeGroup(e.target.value)
                    // จำลองการโหลดข้อมูล
                    setLoading(true);
                    setTimeout(() => {
                      const filteredData = dataHistory.filter(item =>
                        e.target.value.toLowerCase().includes(item.type_group.toLowerCase())
                      );
                      setFilteredData(filteredData);
                      setLoading(false);
                    }, 1000);
                  }}
                  aria-label="Platform"
                >
                  <ToggleButton value="PTEC">PTEC</ToggleButton>
                  <ToggleButton value="PARTNER">PARTNER</ToggleButton>
                </ToggleButtonGroup>
                <StripedDataGrid
                  sx={{
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
                        fileName: `ทะเบียนทรัพย์สินสาขา ${data.branchid}`,
                        delimiter: ';',
                      }
                    }
                  }}
                  rows={filteredData}
                  loading={loading}
                  columns={columns}
                  getRowId={(dataHistory) => dataHistory.AssetID}
                  pageSize={pageSize}
                  onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                  pagination
                  rowsPerPageOptions={[10, 20, 50, 100]}
                  autoHeight
                  getRowHeight={() => 'auto'}
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