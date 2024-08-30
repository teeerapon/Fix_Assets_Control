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
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import config from '../../../config'
import swal from 'sweetalert';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';


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
      width: 100,
      headerAlign: 'center',
      align: 'center',
      valueGetter: (params) =>
        params.row.BranchID === 901 ? 'HO' : params.row.Position,
    },
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
    {
      field: 'ImagePath',
      headerName: 'Images 1',
      headerClassName: 'super-app-theme--header',
      minWidth: 200,
      headerAlign: 'center',
      align: 'center',
      flex: 1,
      renderCell: (params) => {

        const handleUploadFile_1 = async (e, params) => {
          e.preventDefault();

          const headers = {
            'Authorization': 'application/json; charset=utf-8',
            'Accept': 'application/json'
          };

          if (['jpg', 'png', 'gif'].indexOf((e.target.files[0].name).split('.').pop()) > -1) {

            const formData_1 = new FormData();
            formData_1.append("file", e.target.files[0]);
            formData_1.append("fileName", e.target.files[0].name);

            await Axios.post(config.http + "/check_files_NewNAC", formData_1, { headers })
              .then(async (res) => {
                const Code = params.row.Code
                const image_1 = 'http://vpnptec.dyndns.org:33080/NEW_NAC/' + res.data.attach[0].ATT + '.' + e.target.files[0].name.split('.').pop();

                const body = { Code: Code, image_1: image_1 }

                await Axios.post(config.http + "/FA_Control_Edit_EBook", body, { headers })
                  .then(async (res) => {
                    if (res.data) {
                      swal("แจ้งเตือน", 'เปลี่ยนแปลงรูปภาพที่ 1 สำเร็จ', "success", { buttons: false, timer: 2000 }).then((value) => {
                        dataHistory.forEach(function (x, index) {
                          if (x.Code === params.row.Code) {
                            const list = [...dataHistory]
                            list[index]['ImagePath'] = image_1
                            setDataHistory(list)
                          }
                        })
                      })
                    }
                  })
              })

          } else {
            swal("แจ้งเตือน", 'ไฟล์ประเภทนี้ไม่ได้รับอนุญาติให้ใช้งานในระบบ \nใช้ได้เฉพาะ .csv, .xls, .txt, .ppt, .doc, .pdf, .jpg, .png, .gif', "error")
          }
        }

        return (
          <ImageListItem key={params.row.ImagePath}>
            <img
              src={`${params.row.ImagePath}?w=248&fit=crop&auto=format`}
              srcSet={`${params.row.ImagePath}?w=248&fit=crop&auto=format&dpr=2 2x`}
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
              title={<span>&nbsp; &nbsp;{params.row.Code}_1</span>}
              actionIcon={
                <IconButton
                  sx={{ color: 'rgba(255, 255, 255, 1)' }}
                  aria-label={`info about ${params.row.Code}`}
                  component="label"
                >
                  <input hidden type="file" name='file' onChange={(e) => handleUploadFile_1(e, params)} />
                  <FilePresentIcon sx={{ fontSize: 20 }} />
                </IconButton>
              }
            />
          </ImageListItem>
        )
      }
    },
    {
      field: 'ImagePath_2',
      headerName: 'Images 2',
      headerClassName: 'super-app-theme--header',
      minWidth: 200,
      headerAlign: 'center',
      align: 'center',
      flex: 1,
      renderCell: (params) => {

        const handleUploadFile_2 = async (e, params) => {
          e.preventDefault();

          const headers = {
            'Authorization': 'application/json; charset=utf-8',
            'Accept': 'application/json'
          };

          if (['csv', 'xls', 'txt', 'ppt', 'doc', 'pdf', 'jpg', 'png', 'gif'].indexOf((e.target.files[0].name).split('.').pop()) > -1) {

            const formData_2 = new FormData();
            formData_2.append("file", e.target.files[0]);
            formData_2.append("fileName", e.target.files[0].name);

            await Axios.post(config.http + "/check_files_NewNAC", formData_2, { headers })
              .then(async (res) => {
                const Code = params.row.Code
                const image_2 = 'http://vpnptec.dyndns.org:33080/NEW_NAC/' + res.data.attach[0].ATT + '.' + e.target.files[0].name.split('.').pop();

                const body = { Code: Code, image_2: image_2 }

                await Axios.post(config.http + "/FA_Control_Edit_EBook", body, { headers })
                  .then(async (res) => {
                    if (res.data) {
                      swal("แจ้งเตือน", 'เปลี่ยนแปลงรูปภาพที่ 1 สำเร็จ', "success", { buttons: false, timer: 2000 }).then((value) => {
                        dataHistory.forEach(function (x, index) {
                          if (x.Code === params.row.Code) {
                            const list = [...dataHistory]
                            list[index]['ImagePath_2'] = image_2
                            setDataHistory(list)
                          }
                        })
                      })
                    }
                  })
              })

          } else {
            swal("แจ้งเตือน", 'ไฟล์ประเภทนี้ไม่ได้รับอนุญาติให้ใช้งานในระบบ \nใช้ได้เฉพาะ .csv, .xls, .txt, .ppt, .doc, .pdf, .jpg, .png, .gif', "error")
          }
        }

        return (
          <ImageListItem key={params.row.ImagePath_2}>
            <img
              src={`${params.row.ImagePath_2}?w=248&fit=crop&auto=format`}
              srcSet={`${params.row.ImagePath_2}?w=248&fit=crop&auto=format&dpr=2 2x`}
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
                  aria-label={`info about ${params.row.Code}`}
                  component="label"
                >
                  <input hidden type="file" name='file' onChange={(e) => handleUploadFile_2(e, params)} />
                  <FilePresentIcon sx={{ fontSize: 20 }} />
                </IconButton>
              }
            />
          </ImageListItem>
        )
      }
    },
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
        setFilteredData((response.data.data).filter((res) => res.BranchID === data.branchid && res.bac_status === 1 && typeGroup.toLowerCase().includes(res.type_group.toLowerCase())));
        setLoading(false)
        setProgress(1)
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
                  mt: 3,
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
                        fileName: `ทะเบียนทรัพย์สินอิเล็กทรอนิกสาขา ${data.branchid}`,

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
                  getRowHeight={() => 'auto'}
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