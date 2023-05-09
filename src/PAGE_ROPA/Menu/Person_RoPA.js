import * as React from 'react';
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridValueGetterParams,
  gridClasses,
  GridApi,
  GridCellValue,
  GridCellParams,
} from '@mui/x-data-grid';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import AnimatedPage from '../../AnimatedPage.jsx'
import Box from '@mui/material/Box';
import logoPure from '../../image/Picture1.png'
import { alpha, styled, Theme, useTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import ArticleIcon from '@mui/icons-material/Article';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import { formLabelClasses, Switch } from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PersonAddAlt1 from '@mui/icons-material/PersonAddAlt1';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Axios from "axios"
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import AddIcon from '@mui/icons-material/Add';
import ButtonGroup from '@mui/material/ButtonGroup';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import ImageList from '@mui/material/ImageList';
import LayersIcon from '@mui/icons-material/Layers';
import FormControlLabel from '@mui/material/FormControlLabel';
import config from '../../config'
import swal from 'sweetalert';

const ODD_OPACITY = 0.2;

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  '.css-1knaqv7-MuiButtonBase-root-MuiButton-root': {
    color: 'rgba(0, 0, 0, 1)',
  },
  '.css-f3jnds-MuiDataGrid-columnHeaders': {
    backgroundColor: 'rgba(0, 0, 0, 1)',
    color: 'rgba(255, 255, 255, 1)',
  },
  '.css-1s0hp0k-MuiDataGrid-columnHeadersInner': {
    backgroundColor: 'rgba(0, 0, 0, 1)',
    color: 'rgba(255, 255, 255, 1)',
    '.css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root': {
      color: 'rgba(255, 255, 255, 1)',
      display: 'none'
    },
    '.css-1pe4mpk-MuiButtonBase-root-MuiIconButton-root': {
      display: 'none'
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

export default function Permission_to_RoPA() {

  const [ropa_List, setRopa_List] = React.useState();
  const [columns, setColumns] = React.useState();
  const [list_dep, setList_dep] = React.useState();
  const [valueRopa_type, setValueRopa_type] = React.useState();
  const [valueAllowner, setValueAllowner] = React.useState();
  const [valueAllaccess, setValueAllaccess] = React.useState();
  const [openII, setOpenII] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [openAdd_main, setOpenAdd_main] = React.useState(false);
  const [openAdd_user, setOpenAdd_user] = React.useState(false);
  const [openAdd_data, setOpenAdd_data] = React.useState(false);
  const [serviceList, setServiceList] = React.useState([{ Ropa_ID: "", Depcode: "", DataItem_Name: "", Ropa_Type: "", Data_Subject: "", Data_Collection: "", Step: "", Last_Review: "", allowner: "", allaccess: "" }]);
  const [allowner, setAllowner] = React.useState();
  const [allaccess, setAllaccess] = React.useState();
  const [ropa_type, setRopa_type] = React.useState();
  const [index, setIndex] = React.useState();
  const data = JSON.parse(localStorage.getItem('data'));

  const handleCloseAdd_main = () => {
    setOpenAdd_main(false)
  }

  const handleCloseAdd_user = () => {
    setOpenAdd_user(false)
  }

  const handleCloseAdd_data = () => {
    setOpenAdd_data(false)
  }

  const handleOpenAdd_main = () => {
    setOpenAdd_main(true)
  }

  const handleOpenAdd_user = () => {
    setOpenAdd_user(true)
  }

  const handleOpenAdd_data = () => {
    setOpenAdd_data(true)
  }


  const setActive_User = async (event, params) => {
    const body = { ropaid: params.row.Ropa_ID, ropauserid: params.row.RopaUser_ID }

    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };

    const columns_User = [
      {
        field: 'UserName',
        headerName: 'ชื่อ-นามสกุล',
        headerClassName: 'super-app-theme--header',
        flex: 1,
      },
      {
        field: 'Active',
        headerName: 'สถานะการเปิดใช้งาน',
        width: 220,
        align: 'center',
        headerAlign: 'center',
        disableClickEventBubbling: true,
        renderCell: (params) => {
          return (
            <React.Fragment>
              <FormControlLabel
                control={
                  <IOSSwitch
                    sx={{ m: 1 }}
                    defaultChecked={(params.row.Active === true) ? true : false}
                    onChange={(event) => setActive_User(event, params)}
                  />
                }
                label={(params.row.Active === true) ? 'กำลังใช้งาน' : 'ไม่ได้ใช้งาน'}
              />
            </React.Fragment>
          );
        }
      },
      {
        field: 'action',
        headerName: 'Action',
        width: 220,
        align: 'center',
        headerAlign: 'center',
        disableClickEventBubbling: true,
        renderCell: (params) => {
          return (
            <React.Fragment>
              <Button
                variant="contained"
                color='secondary'
                disabled={(params.row.Active === true) ? false : true}
                onClick={(event) => handleClickRopa_UserID(event, params)}
              >
                <LayersIcon />
              </Button>
            </React.Fragment>
          );
        }
      },
    ];

    await Axios.post(config.http + '/Ropa_SetActive_User', body, { headers })
      .then(response => {
        setColumns(columns_User)
        setRopa_List(response.data.data)
      });
  }

  const ropa_main_click = async () => {
    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };
    await Axios.get(config.http + '/Ropa_List', { headers })
      .then(response => {
        setColumns(null)
        setRopa_List(response.data)
      });
  }

  const ropa_userBack_click = async () => {
    const body = { ropaid: ropa_List[0].Ropa_ID }

    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };

    const columns_User = [
      {
        field: 'UserName',
        headerName: 'ชื่อ-นามสกุล',
        headerClassName: 'super-app-theme--header',
        flex: 1,
      },
      {
        field: 'Active',
        headerName: 'สถานะการเปิดใช้งาน',
        width: 220,
        align: 'center',
        headerAlign: 'center',
        disableClickEventBubbling: true,
        renderCell: (params) => {
          return (
            <React.Fragment>
              <FormControlLabel
                control={
                  <IOSSwitch
                    sx={{ m: 1 }}
                    defaultChecked={(params.row.Active === true) ? true : false}
                    onChange={(event) => setActive_User(event, params)}
                  />
                }
                label={(params.row.Active === true) ? 'กำลังใช้งาน' : 'ไม่ได้ใช้งาน'}
              />
            </React.Fragment>
          );
        }
      },
      {
        field: 'action',
        headerName: 'Action',
        width: 220,
        align: 'center',
        headerAlign: 'center',
        disableClickEventBubbling: true,
        renderCell: (params) => {
          return (
            <React.Fragment>
              <Button
                variant="contained"
                color='secondary'
                disabled={(params.row.Active === true) ? false : true}
                onClick={(event) => handleClickRopa_UserID(event, params)}
              >
                <LayersIcon />
              </Button>
            </React.Fragment>
          );
        }
      },
    ];

    await Axios.post(config.http + '/Ropa_List_User', body, { headers })
      .then(response => {
        setColumns(columns_User)
        setRopa_List(response.data.data)
      });
  }

  const handleClickOpenII = (event, params) => {
    setOpenII(true);

    const FromValues = {
      Ropa_ID: params.row.Ropa_ID,
      Depcode: params.row.Depcode,
      DataItem_Name: params.row.DataItem_Name,
      Ropa_Type: params.row.Ropa_Type,
      Data_Subject: params.row.Data_Subject,
      Data_Collection: params.row.Data_Collection,
      Step: params.row.Step,
      Last_Review: params.row.Last_Review,
      allowner: params.row.allowner,
      allaccess: params.row.allaccess
    }

    setServiceList(FromValues);

  }

  const handleCloseII = () => {
    setOpenII(false);
  };

  const handleClickRopa_UserID = async (event, params) => {
    const body = { ropauserid: params.row.RopaUser_ID }

    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };

    const columns_User_Collection = [
      {
        field: 'DataName',
        headerName: 'ข้อมูลที่จัดเก็บ',
        headerClassName: 'super-app-theme--header',
        flex: 1,
      },
      {
        field: 'Action',
        headerName: 'Action',
        width: 220,
        align: 'center',
        headerAlign: 'center',
        disableClickEventBubbling: true,
        renderCell: (params) => {
          return (
            <React.Fragment>
              <Button variant='contained' color='error'>
                <DeleteIcon />
              </Button>
            </React.Fragment>
          );
        }
      },
    ];

    await Axios.post(config.http + '/Ropa_List_Collection', body, { headers })
      .then(response => {
        setColumns(columns_User_Collection)
        setRopa_List(response.data.data);
      });

  }

  const handleClickOpen_User = async (event, params) => {
    const body = { ropaid: params.row.Ropa_ID }

    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };

    const columns_User = [
      {
        field: 'UserName',
        headerName: 'ชื่อ-นามสกุล',
        headerClassName: 'super-app-theme--header',
        flex: 1,
      },
      {
        field: 'Active',
        headerName: 'สถานะการเปิดใช้งาน',
        width: 220,
        align: 'center',
        headerAlign: 'center',
        disableClickEventBubbling: true,
        renderCell: (params) => {
          return (
            <React.Fragment>
              <FormControlLabel
                control={
                  <IOSSwitch
                    sx={{ m: 1 }}
                    defaultChecked={(params.row.Active === true) ? true : false}
                    onChange={(event) => setActive_User(event, params)}
                  />
                }
                label={(params.row.Active === true) ? 'กำลังใช้งาน' : 'ไม่ได้ใช้งาน'}
              />
            </React.Fragment>
          );
        }
      },
      {
        field: 'action',
        headerName: 'Action',
        width: 220,
        align: 'center',
        headerAlign: 'center',
        disableClickEventBubbling: true,
        renderCell: (params) => {
          return (
            <React.Fragment>
              <Button
                variant="contained"
                color='secondary'
                disabled={(params.row.Active === true) ? false : true}
                onClick={(event) => handleClickRopa_UserID(event, params)}
              >
                <LayersIcon />
              </Button>
            </React.Fragment>
          );
        }
      },
    ];

    await Axios.post(config.http + '/Ropa_List_User', body, { headers })
      .then(response => {
        setColumns(columns_User)
        setRopa_List(response.data.data)
      });
  }

  const handleClickOpen = async (event, params) => {
    setOpen(true);

    const FromValues = {
      Ropa_ID: params.row.Ropa_ID,
      Depcode: params.row.Depcode,
      DataItem_Name: params.row.DataItem_Name,
      Ropa_Type: params.row.Ropa_Type,
      Data_Subject: params.row.Data_Subject,
      Data_Collection: params.row.Data_Collection,
      Step: params.row.Step,
      Last_Review: params.row.Last_Review,
      allowner: params.row.allowner,
      allaccess: params.row.allaccess
    }

    setServiceList(FromValues);

    const body = { RopaType_ID: params.row.Ropa_ID }

    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };

    await Axios.post(config.http + '/Ropa_List_By_ID', body, { headers })
      .then(response => {
        setRopa_type(response.data.data)
        setAllowner(response.data.data)
        setAllaccess(response.data.data)
      })

    setIndex(list_dep.findIndex(object => {
      return object.DepCode === params.row.Depcode;
    }))

  }


  const handleClose = () => {
    setOpen(false);
  };

  const handleRopa_Save_Update = async () => {
    const body = {
      ropaid: serviceList.Ropa_ID,
      depcode: serviceList.Depcode,
      name: serviceList.DataItem_Name,
      target: serviceList.Data_Subject,
      collectiontype: serviceList.Data_Collection,
      step: serviceList.Step,
      lastreview: serviceList.Last_Review,
      user: data.UserCode,
    }

    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };
    await Axios.post(config.http + '/RopaSave', body, { headers })

    window.location.href = '/PERSON_ROPA';
    setOpen(false);
  };

  const handleClose_Dialog_Svae = () => {
    const body = {
      ropaid: serviceList.Ropa_ID,
    }

    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };
    Axios.post(config.http + '/Ropa_Close_Save', body, { headers })

    setOpen(false);
  };

  const handleChangeValue_DataItem_Name = (event) => {
    event.preventDefault();
    const FromValues = {
      Ropa_ID: serviceList.Ropa_ID,
      Depcode: serviceList.Depcode,
      DataItem_Name: event.target.value,
      Ropa_Type: serviceList.Ropa_Type,
      Data_Subject: serviceList.Data_Subject,
      Data_Collection: serviceList.Data_Collection,
      Step: serviceList.Step,
      Last_Review: serviceList.Last_Review,
      allowner: serviceList.allowner,
      allaccess: serviceList.allaccess
    }

    setServiceList(FromValues);
  };

  const handleChangeValue_Data_Subject = (event) => {
    event.preventDefault();
    const FromValues = {
      Ropa_ID: serviceList.Ropa_ID,
      Depcode: serviceList.Depcode,
      DataItem_Name: serviceList.DataItem_Name,
      Ropa_Type: serviceList.Ropa_Type,
      Data_Subject: event.target.value,
      Data_Collection: serviceList.Data_Collection,
      Step: serviceList.Step,
      Last_Review: serviceList.Last_Review,
      allowner: serviceList.allowner,
      allaccess: serviceList.allaccess
    }

    setServiceList(FromValues);
  };

  const handleChangeValue_Step = (event) => {
    event.preventDefault();
    const FromValues = {
      Ropa_ID: serviceList.Ropa_ID,
      Depcode: serviceList.Depcode,
      DataItem_Name: serviceList.DataItem_Name,
      Ropa_Type: serviceList.Ropa_Type,
      Data_Subject: serviceList.Data_Subject,
      Data_Collection: serviceList.Data_Collection,
      Step: event.target.value,
      Last_Review: serviceList.Last_Review,
      allowner: serviceList.allowner,
      allaccess: serviceList.allaccess
    }

    setServiceList(FromValues);
  };

  const filterOptions2 = createFilterOptions({
    stringify: (option) => option.DepCode,
  });

  React.useEffect(() => {
    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };
    Axios.get(config.http + '/Ropa_List', { headers })
      .then(response => setRopa_List(response.data));

    Axios.get(config.http + '/Ropa_List_Dep', { headers })
      .then(response => setList_dep(response.data));
  }, []);

  const handleChange_RopaType = (event) => {
    event.preventDefault();
    setValueRopa_type(event.target.value);
  };

  const handleChange_allowner = (event) => {
    event.preventDefault();
    setValueAllowner(event.target.value);
  };

  const handleChange_allaccess = (event) => {
    event.preventDefault();
    setValueAllaccess(event.target.value);
  };

  const handleAdd_RopaType = async () => {

    const body = { ropaid: serviceList.Ropa_ID, typeid: 0, typename: valueRopa_type, user: data.UserCode }

    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };

    await Axios.post(config.http + '/addType', body, { headers })
      .then(response => setRopa_type(response.data.data));

    setValueRopa_type('')
  }

  const handleAdd_Owner = async () => {

    const body = { ropaid: serviceList.Ropa_ID, ownercode: valueAllowner, user: data.UserCode }

    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };

    await Axios.post(config.http + '/addOwner', body, { headers })
      .then(response => {
        if (!response.data) {
          swal("แจ้งเตือน", 'ไม่พบ user นี้ในระบบ', "error", {
            buttons: false,
            timer: 2000,
          })
        } else {
          setAllowner(response.data)
        }
      });

    setValueAllowner('')
  }

  const handleAdd_Access = async () => {

    const body = { ropaid: serviceList.Ropa_ID, acecode: valueAllaccess, user: data.UserCode }

    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };

    await Axios.post(config.http + '/addPermissionAccess', body, { headers })
      .then(response => {
        if (!response.data) {
          swal("แจ้งเตือน", 'ไม่พบ user นี้ในระบบ', "error", {
            buttons: false,
            timer: 2000,
          })
        } else {
          setAllaccess(response.data)
        }
      });

    setValueAllaccess('')
  }

  const handleDelete = async (ropa_type) => {

    const body = { ropaid: serviceList.Ropa_ID, ropa_type: ropa_type, user: data.UserCode }

    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };

    await Axios.post(config.http + '/removeType', body, { headers })
      .then(response => setRopa_type(response.data))

  };

  const handleRemoveOwner = async (allowner) => {

    const body = { ropaid: serviceList.Ropa_ID, ropaownerCode: allowner, user: data.UserCode }

    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };

    await Axios.post(config.http + '/removeOwner', body, { headers })
      .then(response => setAllowner(response.data))

  };

  const handleRemoveAccess = async (allaccess) => {

    const body = { ropaid: serviceList.Ropa_ID, permissionaccessCode: allaccess, user: data.UserCode }

    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };

    await Axios.post(config.http + '/removePermissionAccess', body, { headers })
      .then(response => setAllaccess(response.data))

  };

  const handleChange_DepCode = async (e, index) => {
    setIndex(list_dep.findIndex(object => {
      return object.DepCode === e.target.innerText;
    }))
  }

  const columns_main = [
    {
      field: 'Depcode',
      headerName: 'DepCode',
      headerClassName: 'super-app-theme--header',
      width: 80,
    },
    {
      field: 'DataItem_Name',
      headerName: 'ชือหัวข้อ',
      headerClassName: 'super-app-theme--header',
      flex: 1,
    },
    {
      field: 'Ropa_Type',
      headerName: 'ประเภทข้อมูล',
      headerClassName: 'super-app-theme--header',
      flex: 1,
    },
    {
      field: 'Data_Subject',
      headerName: 'กลุ่มเป้าหมาย',
      headerClassName: 'super-app-theme--header',
      flex: 1,
    },
    {
      field: 'Step',
      headerName: 'ขั้นตอนในการรักษา',
      headerClassName: 'super-app-theme--header',
      flex: 1,
    },
    {
      field: 'allowner',
      headerName: 'ผู้รับผิดชอบ',
      headerAlign: 'center',
      align: 'center',
      headerClassName: 'super-app-theme--header',
      flex: 1,
    },
    {
      field: 'allaccess',
      headerName: 'ผู้ที่มีสิทธิ์',
      headerAlign: 'center',
      align: 'center',
      headerClassName: 'super-app-theme--header',
      flex: 1,
    },
    {
      field: 'Last_Review',
      headerName: 'ประมวลผลล่าสุด',
      type: 'dateTime',
      headerClassName: 'super-app-theme--header',
      width: 150,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 220,
      align: 'center',
      headerAlign: 'center',
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <React.Fragment>
            <Stack spacing={1} direction="row">
              <Button
                variant="contained"
                color="secondary"
                onClick={(event) => handleClickOpen_User(event, params)}
              >
                <AccountCircleIcon />
              </Button>
              <Button
                variant="contained"
                color="warning"
                onClick={(event) => handleClickOpen(event, params)}
              >
                <ArticleIcon />
              </Button>
              <Button
                variant="contained"
                color="error"
                disabled
                onClick={(event) => handleClickOpenII(event, params)}
              >
                <DeleteIcon />
              </Button>
            </Stack>
          </React.Fragment>
        );
      }
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
            <Typography variant="h5" color="inherit" >
              ประเภทข้อมูลส่วนบุคคล
            </Typography>
          </AnimatedPage>
        </Toolbar>
      </AppBar>
      <AnimatedPage>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '45vh',
          }}
        >
          <CssBaseline />
          <Container component="main" sx={{ mt: 3, mb: 0 }} maxWidth="1000px">
            <Box
              sx={{
                height: 423,
                width: '100%',
              }}
            >
              {
                (!ropa_List ? null : ropa_List[0].RopaCollection_ID) !== undefined ?
                  <React.Fragment>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <div role="presentation">
                        <Breadcrumbs aria-label="breadcrumb">
                          <Chip variant="outlined" label="ประเภทข้อมูลส่วนบุคคล" onClick={ropa_main_click} />
                          <Chip variant="outlined" label={!ropa_List ? null : ropa_List[0].DataItem_Name} onClick={ropa_userBack_click} />
                          <Chip variant="outlined" label={!ropa_List ? null : ropa_List[0].UserName} color="primary" />
                        </Breadcrumbs>
                      </div>
                      <Button
                        variant="contained"
                        color='primary'
                        onClick={handleOpenAdd_data}
                        startIcon={<AddIcon size="small" />}
                      >
                        Add Data
                      </Button>
                    </Stack>
                    <Dialog
                      open={openAdd_data}
                      onClose={handleCloseAdd_data}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">
                        {"แจ้งเตือน"}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          เนื้อหา
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button
                          variant="contained"
                          onClick={handleCloseAdd_data}
                          sx={{ p: 0.8, pb: 0.5, pt: 0.5 }}
                        >ใช่
                        </Button>
                        <Button
                          variant="contained"
                          color='error'
                          sx={{ p: 0.8, pb: 0.5, pt: 0.5 }}
                          onClick={handleCloseAdd_data} autoFocus
                        >
                          ไม่
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </React.Fragment>
                  : (!(!ropa_List ? null : ropa_List[0].RopaCollection_ID) && (!ropa_List ? null : ropa_List[0].RopaUser_ID) !== undefined) ?
                    <React.Fragment>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <div role="presentation">
                          <Breadcrumbs aria-label="breadcrumb">
                            <Chip variant="outlined" label="ประเภทข้อมูลส่วนบุคคล" onClick={ropa_main_click} />
                            <Chip variant="outlined" label={!ropa_List ? null : ropa_List[0].DataItem_Name} color="primary" />
                          </Breadcrumbs>
                        </div>
                        <Button
                          variant="contained"
                          color='primary'
                          onClick={handleOpenAdd_user}
                          startIcon={<AddIcon size="small" />}
                        >
                          Add User
                        </Button>
                      </Stack>
                      <Dialog
                        open={openAdd_user}
                        onClose={handleCloseAdd_user}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <DialogTitle id="alert-dialog-title">
                          {"แจ้งเตือน"}
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                            เนื้อหา
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button
                            variant="contained"
                            onClick={handleCloseAdd_user}
                            sx={{ p: 0.8, pb: 0.5, pt: 0.5 }}
                          >ใช่
                          </Button>
                          <Button
                            variant="contained"
                            color='error'
                            sx={{ p: 0.8, pb: 0.5, pt: 0.5 }}
                            onClick={handleCloseAdd_user} autoFocus
                          >
                            ไม่
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </React.Fragment>
                    :
                    <React.Fragment>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <div role="presentation">
                          <Breadcrumbs aria-label="breadcrumb">
                            <Chip variant="outlined" label="ประเภทข้อมูลส่วนบุคคล" color="primary" />
                          </Breadcrumbs>
                        </div>
                        <Button
                          variant="contained"
                          color='primary'
                          onClick={handleOpenAdd_main}
                          startIcon={<AddIcon size="small" />}
                        >
                          Add Main
                        </Button>
                      </Stack>
                      <Dialog
                        open={openAdd_main}
                        onClose={handleCloseAdd_main}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <DialogTitle id="alert-dialog-title">
                          {"แจ้งเตือน"}
                        </DialogTitle>
                        <DialogContent>
                          <FormControl variant="standard" fullWidth>
                            <Autocomplete
                              freeSolo
                              size="small"
                              options={list_dep}
                              getOptionLabel={(option) => option.DepCode}
                              filterOptions={filterOptions2}
                              onChange={handleChange_DepCode}
                              value={!list_dep ? '' : list_dep[index]}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  variant="standard"
                                  fullWidth
                                  autoComplete="family-name"
                                  sx={{ pt: 1 }}
                                />
                              )}
                            />
                          </FormControl>
                          <TextField
                            required
                            fullWidth
                            value={serviceList.DataItem_Name}
                            onChange={handleChangeValue_DataItem_Name}
                            name='DataItem_Name'
                            sx={{ pt: 1 }}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Typography color="black">
                                    ชือหัวข้อ :
                                  </Typography>
                                </InputAdornment>
                              ),
                            }}
                            variant="standard"
                          />
                          <TextField
                            required
                            fullWidth
                            value={serviceList.Data_Subject}
                            onChange={handleChangeValue_Data_Subject}
                            name='Data_Subject'
                            sx={{ pt: 1 }}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Typography color="black">
                                    กลุ่มเป้าหมาย :
                                  </Typography>
                                </InputAdornment>
                              ),
                            }}
                            variant="standard"
                          />
                          <TextField
                            required
                            fullWidth
                            value={serviceList.Step}
                            onChange={handleChangeValue_Step}
                            name='Step'
                            sx={{ pt: 1 }}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Typography color="black">
                                    ขั้นตอนในการรักษา :
                                  </Typography>
                                </InputAdornment>
                              ),
                            }}
                            variant="standard"
                          />
                        </DialogContent>
                        <DialogActions>
                          <Button
                            variant="contained"
                            onClick={handleCloseAdd_main}
                            sx={{ p: 0.8, pb: 0.5, pt: 0.5 }}
                          >บันทึก
                          </Button>
                          <Button
                            variant="contained"
                            color='error'
                            sx={{ p: 0.8, pb: 0.5, pt: 0.5 }}
                            onClick={handleCloseAdd_main} autoFocus
                          >
                            ยกเลิก
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </React.Fragment>
              }
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
                rows={!ropa_List ? [] : ropa_List}
                columns={!columns ? columns_main : columns}
                //getRowHeight={() => 'auto'}
                getRowId={(ropa_List) => ropa_List.RopaCollection_ID ?? ropa_List.RopaUser_ID ?? ropa_List.Ropa_ID}
                pageSize={5}
                //autoHeight={true}
                rowsPerPageOptions={[5]}
                disableColumnMenu
                disableSelectionOnClick
              />
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"แก้ไขข้อมูลหลัก"}
                </DialogTitle>
                <DialogContent>
                  <FormControl variant="standard" fullWidth>
                    <Autocomplete
                      freeSolo
                      size="small"
                      options={list_dep}
                      getOptionLabel={(option) => option.DepCode}
                      filterOptions={filterOptions2}
                      onChange={handleChange_DepCode}
                      value={!list_dep ? '' : list_dep[index]}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="standard"
                          fullWidth
                          autoComplete="family-name"
                          sx={{ pt: 1 }}
                        />
                      )}
                    />
                  </FormControl>
                  <TextField
                    required
                    fullWidth
                    value={serviceList.DataItem_Name}
                    onChange={handleChangeValue_DataItem_Name}
                    name='DataItem_Name'
                    sx={{ pt: 1 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Typography color="black">
                            ชือหัวข้อ :
                          </Typography>
                        </InputAdornment>
                      ),
                    }}
                    variant="standard"
                  />
                  <TextField
                    required
                    fullWidth
                    sx={{ pt: 1 }}
                    onChange={handleChange_RopaType}
                    value={valueRopa_type}
                    placeholder="กรุณาเพิ่มข้อความ"
                    multiline
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Typography color="black" sx={{ mb: 1 }}>
                            ประเภทข้อมูล :
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 0.5, m: 1, mt: 0 }}>
                            {(!ropa_type ? [] : ropa_type[0].Ropa_Type.split(",")).map((ropa_type) => (
                              <Chip key={ropa_type} label={ropa_type} onDelete={(event) => handleDelete(ropa_type)} />
                            ))}
                          </Box>
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <IconButton aria-label="upload picture" component="label" disabled={!valueRopa_type ? true : false} onClick={handleAdd_RopaType}>
                          <AddIcon />
                        </IconButton>
                      ),
                    }}
                    variant="standard"
                  />
                  <TextField
                    required
                    fullWidth
                    value={serviceList.Data_Subject}
                    onChange={handleChangeValue_Data_Subject}
                    name='Data_Subject'
                    sx={{ pt: 1 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Typography color="black">
                            กลุ่มเป้าหมาย :
                          </Typography>
                        </InputAdornment>
                      ),
                    }}
                    variant="standard"
                  />
                  <TextField
                    required
                    fullWidth
                    value={serviceList.Step}
                    onChange={handleChangeValue_Step}
                    name='Step'
                    sx={{ pt: 1 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Typography color="black">
                            ขั้นตอนในการรักษา :
                          </Typography>
                        </InputAdornment>
                      ),
                    }}
                    variant="standard"
                  />
                  <TextField
                    required
                    fullWidth
                    name='allowner'
                    value={valueAllowner}
                    onChange={handleChange_allowner}
                    placeholder='ระบุ Initial'
                    sx={{ pt: 1 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Typography color="black" sx={{ mb: 1 }}>
                            ผู้รับผิดชอบ :
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 0.5, m: 1, mt: 0 }}>
                            {(!allowner ? [] : allowner[0].Owner.split(",")).map((allowner) => (
                              <Chip key={allowner} label={allowner} onDelete={(event) => handleRemoveOwner(allowner)} />
                            ))}
                          </Box>
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <IconButton aria-label="upload picture" component="label" disabled={!valueAllowner ? true : false} onClick={handleAdd_Owner}>
                          <AddIcon />
                        </IconButton>
                      ),
                    }}
                    variant="standard"
                  />
                  <TextField
                    required
                    fullWidth
                    name='allaccess'
                    onChange={handleChange_allaccess}
                    value={valueAllaccess}
                    placeholder='ระบุ Initial'
                    sx={{ pt: 1 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Typography color="black" sx={{ mb: 1 }}>
                            ผู้มีสิทธิ์ :
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 0.5, m: 1, mt: 0 }}>
                            {(!allaccess ? [] : allaccess[0].Access.split(",")).map((allaccess) => (
                              <Chip key={allaccess} label={allaccess} onDelete={(event) => handleRemoveAccess(allaccess)} />
                            ))}
                          </Box>
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <IconButton aria-label="upload picture" component="label" disabled={!valueAllaccess ? true : false} onClick={handleAdd_Access}>
                          <AddIcon />
                        </IconButton>
                      ),
                    }}
                    variant="standard"
                  />
                </DialogContent>
                <DialogActions>
                  <Button
                    variant="contained"
                    onClick={handleRopa_Save_Update}
                    sx={{ p: 0.8, pb: 0.5, pt: 0.5 }}
                  >บันทึก
                  </Button>
                  <Button
                    variant="contained"
                    color='error'
                    sx={{ p: 0.8, pb: 0.5, pt: 0.5 }}
                    onClick={handleClose_Dialog_Svae} autoFocus
                  >
                    ยกเลิก
                  </Button>
                </DialogActions>
              </Dialog>
              <Dialog
                open={openII}
                onClose={handleCloseII}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"แจ้งเตือน"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    คุณต้องการที่จะลบหัวข้อ <b>{!serviceList ? '' : serviceList.DataItem_Name}</b> นี้ใช่หรือไม่?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    variant="contained"
                    onClick={handleCloseII}
                    sx={{ p: 0.8, pb: 0.5, pt: 0.5 }}
                  >ใช่
                  </Button>
                  <Button
                    variant="contained"
                    color='error'
                    sx={{ p: 0.8, pb: 0.5, pt: 0.5 }}
                    onClick={handleCloseII} autoFocus
                  >
                    ไม่
                  </Button>
                </DialogActions>
              </Dialog>
            </Box>
          </Container>
        </Box>
      </AnimatedPage >
    </React.Fragment >
  );
}
