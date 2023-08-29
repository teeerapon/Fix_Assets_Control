import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import AnimatedPage from '../../../../AnimatedPage.jsx';
import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { alpha, styled } from '@mui/material/styles';
import { DataGrid, gridClasses, GridToolbar } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Axios from "axios"
import { useNavigate } from "react-router";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import 'reactjs-popup/dist/index.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import swal from 'sweetalert';
import DeleteIcon from '@mui/icons-material/Delete';
import ArticleIcon from '@mui/icons-material/Article'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LinearProgress from '@mui/material/LinearProgress';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import config from '../../../../config.js'

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(0.8),
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  textAlign: 'start',
  color: '#ffffff',
}));

const other = {
  showCellRightBorder: true,
  showColumnRightBorder: true,
};

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

async function store_FA_control_drop_NAC(credentials) {
  return fetch(config.http + '/store_FA_control_drop_NAC', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

export default function History_of_assets() {

  const [selectNAC, setSelectNAC] = React.useState();
  const [progress, setProgress] = React.useState();
  const data = JSON.parse(localStorage.getItem('data'));
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [CheckApprove, setCheckApprove] = React.useState([]);
  const [CheckExamineApprove, setCheckExamineApprove] = React.useState([]);
  const checkUserWeb = localStorage.getItem('sucurity');
  const [getNac_Code, setGetNac_Code] = React.useState();
  const [newPage_value, setNewPage_value] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);
  const [filterNAC, setFilterNAC] = React.useState({ "nac_code": '', "name": '', "source_userid": '', "des_userid": '', "status_name": '' })
  const [selectFilterNAC, setSelectFilterNAC] = React.useState();


  const nacStatusName = [
    'ไม่ผ่านการอนุมัติ'
    , 'รอยืนยันรายการ'
    , 'รอตรวจสอบ'
    , 'รออนุมัติ'
    , 'ปลายทางตรวจรับ'
    , 'รอปิดรายการ'
    , 'ดำเนินการเสร็จสิ้น'
    , 'ตีกลับเอกสาร'
    , 'ไม่พบทรัพย์สิน'
    , 'รอกรอก Book Value'
    , 'กรอกราคาขายจริง'
    , 'รอปิดรายการ'
    , 'ได้รับทรัพย์สินไม่ครบ'
    , 'บัญชีตรวจสอบ'
    , 'ยกเลิกรายการแล้ว'
  ]

  const nacHeaders = [
    'เพิ่มบัญชีทรัพย์สินถาวร'
    , 'โยกย้ายทรัพย์สิน'
    , 'ขายทรัพย์สิน'
    , 'ตัดจากบัญชีทรัพย์สินถาวร'
    , 'เปลี่ยนแปลงรายละเอียดทรัพย์สิน'
  ]

  const filteringNAC_Code = async (e, index) => {
    const NAC_Code = e.target.innerText

    var filter = {
      nac_code: NAC_Code
      , name: filterNAC.name
      , source_userid: filterNAC.source_userid
      , des_userid: filterNAC.des_userid
      , status_name: filterNAC.status_name
    }

    setFilterNAC(filter);

    localStorage.setItem('filterNAC_user', JSON.stringify(filter));

    const check = JSON.parse(JSON.stringify(filter),
      (key, value) => value === null || value === '' ? undefined : value);


    if (JSON.stringify(check) == '{}') {
      setSelectNAC(selectFilterNAC)
    } else {
      // POST request using axios with set headers
      const usercode = { usercode: data.UserCode }
      const headers = {
        'Authorization': 'application/json; charset=utf-8',
        'Accept': 'application/json'
      };

      await Axios.post(config.http + '/store_FA_control_select_NAC', usercode, { headers }).catch(function (error) {
        if (error.toJSON().message === 'Request failed with status code 400') {
          setProgress(1)
        }
      }).then(response => {
        setSelectNAC((response.data.data).filter(function (item) {
          for (var key in check) {
            if (item[key] === undefined || item[key] != check[key])
              return false;
          }
          return true;
        }))
        setProgress(1)
      });
    }
  }

  const filteringNAC_Headers = async (e, index) => {
    const NAC_Headers = e.target.innerText

    var filter = {
      nac_code: filterNAC.nac_code
      , name: NAC_Headers
      , source_userid: filterNAC.source_userid
      , des_userid: filterNAC.des_userid
      , status_name: filterNAC.status_name
    }

    setFilterNAC(filter);

    localStorage.setItem('filterNAC_user', JSON.stringify(filter));

    const check = JSON.parse(JSON.stringify(filter),
      (key, value) => value === null || value === '' ? undefined : value);

    if (JSON.stringify(check) == '{}') {
      setSelectNAC(selectFilterNAC)
    } else {
      // POST request using axios with set headers
      const usercode = { usercode: data.UserCode }
      const headers = {
        'Authorization': 'application/json; charset=utf-8',
        'Accept': 'application/json'
      };

      await Axios.post(config.http + '/store_FA_control_select_NAC', usercode, { headers }).catch(function (error) {
        if (error.toJSON().message === 'Request failed with status code 400') {
          setProgress(1)
        }
      }).then(response => {
        setSelectNAC((response.data.data).filter(function (item) {
          for (var key in check) {
            if (item[key] === undefined || item[key] != check[key])
              return false;
          }
          return true;
        }))
        setProgress(1)
      });
    }
  }

  const filteringNAC_statusName = async (e, index) => {
    const NAC_statusName = e.target.innerText

    var filter = {
      nac_code: filterNAC.nac_code
      , name: filterNAC.name
      , source_userid: filterNAC.source_userid
      , des_userid: filterNAC.des_userid
      , status_name: NAC_statusName
    }

    setFilterNAC(filter);

    localStorage.setItem('filterNAC_user', JSON.stringify(filter));

    const check = JSON.parse(JSON.stringify(filter),
      (key, value) => value === null || value === '' ? undefined : value);

    if (JSON.stringify(check) == '{}') {
      setSelectNAC(selectFilterNAC)
    } else {
      // POST request using axios with set headers
      const usercode = { usercode: data.UserCode }
      const headers = {
        'Authorization': 'application/json; charset=utf-8',
        'Accept': 'application/json'
      };

      await Axios.post(config.http + '/store_FA_control_select_NAC', usercode, { headers }).catch(function (error) {
        if (error.toJSON().message === 'Request failed with status code 400') {
          setProgress(1)
        }
      }).then(response => {
        setSelectNAC((response.data.data).filter(function (item) {
          for (var key in check) {
            if (item[key] === undefined || item[key] != check[key])
              return false;
          }
          return true;
        }))
        setProgress(1)
      });
    }
  }

  const filteringNAC_Source_userid = async (e, index) => {
    const NAC_Source_userid = e.target.innerText

    var filter = {
      nac_code: filterNAC.nac_code
      , name: filterNAC.name
      , source_userid: NAC_Source_userid
      , des_userid: filterNAC.des_userid
      , status_name: filterNAC.status_name
    }

    setFilterNAC(filter);

    localStorage.setItem('filterNAC_user', JSON.stringify(filter));

    const check = JSON.parse(JSON.stringify(filter),
      (key, value) => value === null || value === '' ? undefined : value);

    if (JSON.stringify(check) == '{}') {
      setSelectNAC(selectFilterNAC)
    } else {
      // POST request using axios with set headers
      const usercode = { usercode: data.UserCode }
      const headers = {
        'Authorization': 'application/json; charset=utf-8',
        'Accept': 'application/json'
      };

      await Axios.post(config.http + '/store_FA_control_select_NAC', usercode, { headers }).catch(function (error) {
        if (error.toJSON().message === 'Request failed with status code 400') {
          setProgress(1)
        }
      }).then(response => {
        setSelectNAC((response.data.data).filter(function (item) {
          for (var key in check) {
            if (item[key] === undefined || item[key] != check[key])
              return false;
          }
          return true;
        }))
        setProgress(1)
      });
    }
  }

  const filteringNAC_Des_userid = async (e, index) => {
    const NAC_Des_userid = e.target.innerText

    var filter = {
      nac_code: filterNAC.nac_code
      , name: filterNAC.name
      , source_userid: filterNAC.source_userid
      , des_userid: NAC_Des_userid
      , status_name: filterNAC.status_name
    }

    setFilterNAC(filter);

    localStorage.setItem('filterNAC_user', JSON.stringify(filter));

    const check = JSON.parse(JSON.stringify(filter),
      (key, value) => value === null || value === '' ? undefined : value);

    if (JSON.stringify(check) == '{}') {
      setSelectNAC(selectFilterNAC)
    } else {
      // POST request using axios with set headers
      const usercode = { usercode: data.UserCode }
      const headers = {
        'Authorization': 'application/json; charset=utf-8',
        'Accept': 'application/json'
      };

      await Axios.post(config.http + '/store_FA_control_select_NAC', usercode, { headers }).catch(function (error) {
        if (error.toJSON().message === 'Request failed with status code 400') {
          setProgress(1)
        }
      }).then(response => {
        setSelectNAC((response.data.data).filter(function (item) {
          for (var key in check) {
            if (item[key] === undefined || item[key] != check[key])
              return false;
          }
          return true;
        }))
        setProgress(1)
      });
    }
  }

  const change_page_NacOperation = (newPage) => {
    setNewPage_value(newPage)
  }

  const filterModelChange = (newFilterModel) => {
    localStorage.setItem('filter_model_user', JSON.stringify(newFilterModel));
  }

  React.useEffect(async () => {
    // POST request using axios with set headers
    const usercode = { usercode: data.UserCode }
    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };
    await Axios.post(config.http + '/store_FA_control_select_NAC', usercode, { headers }).catch(function (error) {
      if (error.toJSON().message === 'Request failed with status code 400') {
        setProgress(1)
      }
    }).then(response => {
      setSelectFilterNAC(response.data.data)
      setProgress(1)
      const check = JSON.parse(localStorage.getItem('filterNAC_user'),
        (key, value) => value === null || value === '' ? undefined : value);

      if (JSON.stringify(check) == '{}' || !JSON.stringify(check)) {
        setSelectNAC(response.data.data)
      } else {
        setFilterNAC(check)
        setSelectNAC((response.data.data).filter(function (item) {
          for (var key in check) {
            if (item[key] === undefined || item[key] != check[key])
              return false;
          }
          return true;
        }))
      }
    });
  }, []);

  const handleClickOpen = (event, params) => {
    event.preventDefault();
    setOpen(true);
    setGetNac_Code(params.row.nac_code);
  };

  const handleClose = (event, open) => {
    setOpen(false);
  };

  const handleEditClick = (event, params) => {
    event.preventDefault();
    localStorage.setItem('pagination_user', newPage_value);
    localStorage.removeItem("pagination");
    localStorage.setItem('NacCode', JSON.stringify({ nac_code: params.row.nac_code, nac_status: params.row.nac_status }));
    if (params.row.workflowtypeid === 1) {
      navigate('/NAC_ROW/NAC_CREATE_NEW_WAIT_APPROVE?' + params.row.nac_code)
    } else if (params.row.workflowtypeid === 2) {
      navigate('/NAC_ROW/NAC_CREATE_WAIT_APPROVE?' + params.row.nac_code)
    } else if (params.row.workflowtypeid === 3) {
      navigate('/NAC_ROW/NAC_CHANGE_WAIT_APPROVE?' + params.row.nac_code)
    } else if (params.row.workflowtypeid === 4) {
      navigate('/NAC_ROW/NAC_DELETE_WAIT_APPROVE?' + params.row.nac_code)
    } else if (params.row.workflowtypeid === 5) {
      navigate('/NAC_ROW/NAC_SEALS_APPROVE?' + params.row.nac_code)
    } else {
      navigate('/NAC_MAIN')
    }
  };

  const handleDrop_NAC = async () => {
    const usercode = data.UserCode
    const nac_code = !getNac_Code ? '' : getNac_Code;
    const response = await store_FA_control_drop_NAC({
      usercode,
      nac_code,
    });
    if ('data' in response) {
      swal("แจ้งเตือน", 'ทำการลบรายการ ' + response.data[0].nac_code + ' แล้ว', "success", { buttons: false, timer: 2000 }).then((value) => {
        window.location.href = "/NAC_ROW";
      });
    } else {
      swal("แจ้งเตือน", 'ไม่สามารถลบ ' + response.data[0].nac_code + ' ได้', "error")
    }
    setOpen(false);
  }

  const columns = [
    {
      field: 'nac_code',
      headerName: 'เลขที่เอกสาร',
      headerClassName: 'super-app-theme--header',
      minWidth: 130,
      flex: 1,
      renderCell: (params) => {
        return (
          <React.Fragment>
            <Stack direction="row" spacing={2}>
              <Stack>
                {params.row.nac_code}
              </Stack>
              <Stack>
                {
                  params.row.source_approve_userid || params.row.verify_by_userid || params.row.nac_status === 3 ?
                    <CheckCircleIcon fontSize="small" color={params.row.source_approve_userid ? "success" : "primary"} />
                    : params.row.nac_status === 2 ?
                      <ErrorIcon fontSize="small" color="warning" />
                      : null
                }
              </Stack>
            </Stack>
          </React.Fragment>
        )
      }
    },
    { field: 'name', headerName: 'หัวข้อรายการ', headerClassName: 'super-app-theme--header', minWidth: 170, flex: 1 },
    // {
    //   field: 'create_by',
    //   headerName: 'ผู้ทำรายการ',
    //   headerClassName: 'super-app-theme--header',
    //   width: 120,
    //   headerAlign: 'center',
    //   align: 'center',
    //   renderCell: (params) => {
    //     return (
    //       <React.Fragment>
    //         <Grid container spacing={1}>
    //           <Grid item xs={4}>
    //             <AccountBoxIcon />
    //           </Grid>
    //           <Grid item xs={8}>
    //             {params.row.create_by}
    //           </Grid>
    //         </Grid>
    //       </React.Fragment>
    //     )
    //   }
    // },
    {
      field: 'create_date',
      headerName: 'วันที่สร้างเอกสาร',
      headerClassName: 'super-app-theme--header',
      minWidth: 150,
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return (
          <React.Fragment>
            {params.row.create_date ?
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={1}
              >
                <CalendarMonthIcon />
                <Typography variant='body2'>
                  {params.row.create_date.split('T')[0] || ''}
                </Typography>
              </Stack>
              : null}
          </React.Fragment>
        )
      }
    },
    {
      field: 'source_userid',
      headerName: 'ผู้ส่ง',
      headerClassName: 'super-app-theme--header',
      minWidth: 120,
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return (
          <React.Fragment>
            {!params.row.source_userid ?
              '-'
              :
              <React.Fragment>
                {params.row.source_userid}
              </React.Fragment>
            }
          </React.Fragment>
        )
      }
    },
    {
      field: 'des_userid',
      headerName: 'ผู้รับ',
      headerClassName: 'super-app-theme--header',
      minWidth: 120,
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return (
          <React.Fragment>
            {!params.row.des_userid ?
              '-'
              :
              <React.Fragment>
                {params.row.des_userid}
              </React.Fragment>
            }
          </React.Fragment>
        )
      }
    },
    {
      field: 'status_name',
      headerName: 'สถานะรายการ',
      headerClassName: 'super-app-theme--header',
      minWidth: 160,
      flex: 1,
      headerAlign: 'center',
      renderCell: (params) => {
        return (
          <React.Fragment>
            <Item
              style={{
                //'maxWidth': 'fit-content',
                borderRadius: '100px',
                width: '100%',
                textAlign: 'center',
                'backgroundColor': params.row.nac_status === 1 ?
                  '#1E90FF' : params.row.nac_status === 2 ?
                    '#6495ED' : params.row.nac_status === 3 ?
                      '#FF69B4' : params.row.nac_status === 4 ?
                        '#00CED1' : params.row.nac_status === 5 ?
                          '#6A5ACD' : params.row.nac_status === 6 ?
                            '#008000' : params.row.nac_status === 7 ?
                              '#FFA500' : params.row.nac_status === 8 ?
                                '#F0E68C' : params.row.nac_status === 11 ?
                                  '#F4A460' : params.row.nac_status === 12 ?
                                    '#DDA0DD' : params.row.nac_status === 13 ?
                                      '#6A5ACD' : params.row.nac_status === 14 ?
                                        '#708090' : params.row.nac_status === 15 ?
                                          '#6A5ACD' : '#DC143C'
              }}
            >
              {params.row.status_name}
            </Item>
          </React.Fragment>
        );
      },
    },
    {
      field: 'userid_approver',
      headerName: 'ผู้ตรวจสอบ/อนุมัติ',
      headerClassName: 'super-app-theme--header',
      align: 'center',
      headerAlign: 'center',
      minWidth: 130,
      flex: 1,
      renderCell: (params) => {
        return (
          <React.Fragment>
            {
              (params.row.nac_status === 4 || params.row.nac_status === 14) ?
                params.row.des_userid : (params.row.nac_status === 12) ? params.row.source_userid : params.row.userid_approver
            }
          </React.Fragment>
        )
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
            <Grid container rowSpacing={1}>
              <React.Fragment>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={(event) => handleEditClick(event, params)}
                    sx={{ p: 0.8, pb: 0.5, pt: 0.5 }}
                  >
                    <ArticleIcon />
                  </Button>
                </Grid>
              </React.Fragment>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  color="error"
                  disabled={(checkUserWeb === 'admin' || data.UserCode === params.row.create_by || data.UserCode === params.row.source_userid) && (params.row.nac_status < 4 && params.row.nac_status !== 11) ? false : true}
                  onClick={(event) => handleClickOpen(event, params)}
                  sx={{ p: 0.8, pb: 0.5, pt: 0.5 }}
                >
                  <DeleteIcon />
                </Button>
              </Grid>
            </Grid>
          </React.Fragment>
        );
      },
    },
  ];

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
            <Typography variant="h5" className="scaled-logo-Header" color="inherit" >
              สถานะรายการ NAC
            </Typography>
          </AnimatedPage>
        </Toolbar>
      </AppBar>
      <AnimatedPage>
        {progress !== 1 ? <React.Fragment><Box sx={{ width: '100%' }}><LinearProgress /></Box></React.Fragment> : null}
        <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
          <Container maxWidth="1000px" sx={{ pt: 3, pb: 3 }}>
            <Box
              sx={{
                height: 683,
                width: '100%',
              }}
            >
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="flex-start"
                spacing={{ xs: 1, sm: 2 }}
              >
                <Grid item xs>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    size='small'
                    sx={{ flexGrow: 1, padding: 1 }}
                    value={filterNAC.nac_code}
                    onChange={(e) => filteringNAC_Code(e)}
                    options={selectNAC ? selectNAC.map((res) => res.nac_code) : []}
                    renderInput={(params) => <TextField label="เลขที่ NAC" {...params} />}
                  />
                </Grid>
                <Grid item xs>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    size='small'
                    sx={{ flexGrow: 1, padding: 1 }}
                    value={filterNAC.name}
                    onChange={(e) => filteringNAC_Headers(e)}
                    options={nacHeaders}
                    renderInput={(params) => <TextField label="หัวข้อรายการ" {...params} />}
                  />
                </Grid>
                <Grid item xs>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    size='small'
                    sx={{ flexGrow: 1, padding: 1 }}
                    value={filterNAC.source_userid}
                    onChange={(e) => filteringNAC_Source_userid(e)}
                    options={
                      selectNAC ? selectNAC.map((res) => res.source_userid).filter(x => !!x)
                        .reduce((x, y) => x.includes(y) ? x : [...x, y], []) : []
                    }
                    renderInput={(params) => <TextField label="ผู้ส่งมอบ" {...params} />}
                  />
                </Grid>
                <Grid item xs>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    size='small'
                    sx={{ flexGrow: 1, padding: 1 }}
                    value={filterNAC.des_userid}
                    onChange={(e) => filteringNAC_Des_userid(e)}
                    options={
                      selectNAC ? selectNAC.map((res) => res.des_userid).filter(x => !!x)
                        .reduce((x, y) => x.includes(y) ? x : [...x, y], []) : []
                    }
                    renderInput={(params) => <TextField label="ผู้รับมอบ" {...params} />}
                  />
                </Grid>
                <Grid item xs>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    size='small'
                    sx={{ flexGrow: 1, padding: 1 }}
                    value={filterNAC.status_name}
                    onChange={(e) => filteringNAC_statusName(e)}
                    options={nacStatusName.reduce((x, y) => x.includes(y) ? x : [...x, y], [])}
                    renderInput={(params) => <TextField label="สถานะ" {...params} />}
                  />
                </Grid>
              </Grid>
              <Box
                sx={{
                  p: 1,
                  maxWidth: 500,
                  flexGrow: 1,
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                }}
              >
                <Stack direction="row" spacing={2}>
                  <Typography sx={{ mb: 0.5 }} color="text.secondary">
                    <ErrorIcon fontSize="small" color="warning" />รอตรวจสอบ
                  </Typography>
                  <Typography sx={{ mb: 0.5 }} color="text.secondary">
                    <CheckCircleIcon fontSize="small" color="primary" />ผ่านการตรวจสอบแล้ว
                  </Typography>
                  <Typography sx={{ mb: 0.5 }} color="text.secondary">
                    <CheckCircleIcon fontSize="small" color="success" />ผ่านการอุนมัติแล้ว
                  </Typography>
                </Stack>
              </Box>
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
                componentsProps={{ toolbar: { csvOptions: { utf8WithBom: true } } }}
                rows={selectNAC ?? []}
                columns={columns}
                getRowId={(selectNAC) => selectNAC.nac_code}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                pagination
                rowsPerPageOptions={[10, 20, 50, 100]}
                autoHeight
                disableColumnMenu
                disableSelectionOnClick
                onPageChange={(newPage) => change_page_NacOperation(newPage)}
                initialState={{
                  ...data.initialState,
                  pagination: {
                    page: localStorage.getItem('pagination_user'),
                  },
                  filter: {
                    filterModel: JSON.parse(localStorage.getItem('filter_model_user'))
                  },
                }}
                onFilterModelChange={(newFilterModel) => filterModelChange(newFilterModel)}
                {...other}
              />
            </Box>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"แจ้งเตือน"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  ท่านแน่ใจที่จะลบรายการ {!getNac_Code ? '' : getNac_Code} ใช่หรือไม่
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  variant="contained"
                  sx={{ p: 0.8, pb: 0.5, pt: 0.5 }}
                  onClick={handleDrop_NAC}
                >ใช่
                </Button>
                <Button
                  variant="contained"
                  sx={{ p: 0.8, pb: 0.5, pt: 0.5 }}
                  color='error'
                  onClick={handleClose}
                  autoFocus
                >
                  ไม่
                </Button>
              </DialogActions>
            </Dialog>
          </Container>
        </Box>
      </AnimatedPage>
    </React.Fragment>
  );
}