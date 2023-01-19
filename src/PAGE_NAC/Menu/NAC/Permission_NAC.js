import * as React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { useDemoData } from '@mui/x-data-grid-generator';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Axios from "axios"
import { alpha, styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

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

const theme = createTheme();

const ODD_OPACITY = 0.2;

const other = {
  showCellRightBorder: true,
  showColumnRightBorder: true,
};

const filterOptions2 = createFilterOptions({
  stringify: (option) => option.UserCode,
});

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

export default function Permission_NAC() {

  const [menu, setMenu] = React.useState([]);
  const [user, setUser] = React.useState([]);
  const [menuActive, setMenuActive] = React.useState();

  const selectValue = async (e, index) => {
    const UserCode = e.target.innerText
    const body = { Permission_TypeID: 1, UserCode: UserCode }
    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };
    await Axios.post("http://192.168.220.1:32001/api/Select_Permission_Menu_NAC", body, { headers })
      .then(response => setMenuActive(response.data.data))

  }

  const setActive_User = async (event, params) => {
  }

  async function fetchData() {
    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };

    const { data } = await Axios.get("http://192.168.220.1:32001/api/getsUserForAssetsControl")
    await Axios.post("http://192.168.220.1:32001/api/Permission_Menu_NAC", {}, { headers })
      .then(response => setMenu(response.data.data))

    setUser(data.data);
  }

  React.useEffect(() => {
    fetchData()
  }, []);

  const columns_I = [
    {
      field: 'menuid',
      headerName: 'ลำดับ',
      headerClassName: 'super-app-theme--header',
      width: 100,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return (
          <React.Fragment>
            <Typography variant="body1" gutterBottom>
              {params.row.menuid}
            </Typography>
          </React.Fragment>
        )
      }
    },
    {
      field: 'menu_name',
      headerName: 'ข้อความ',
      headerClassName: 'super-app-theme--header',
      flex: 1,
      renderCell: (params) => {
        return (
          <React.Fragment>
            <Typography variant="body1" gutterBottom>
              {params.row.menu_name}
            </Typography>
          </React.Fragment>
        )
      }
    },
    {
      field: 'Permission',
      headerName: 'สิทธิ์',
      headerClassName: 'super-app-theme--header',
      width: 220,
      disableExport: true,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return (
          <React.Fragment>
            <FormControlLabel
              control={
                <IOSSwitch
                  sx={{ m: 1 }}
                  onChange={(event) => setActive_User(event, params)}
                />
              }
              label='ไม่ได้ใช้งาน'
            />
          </React.Fragment>
        );
      }
    },
  ]

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="lg" sx={{ pt: 3, pb: 3 }}>
        <Autocomplete
          freeSolo
          sx={{ pb: 2 }}
          options={user}
          getOptionLabel={(option) => option.UserCode}
          filterOptions={filterOptions2}
          onChange={selectValue}
          renderInput={(params) =>
            <TextField
              fullWidth
              label='รหัสพนักงาน'
              {...params}
            />}
        />
        <Box
          sx={{
            height: 683,
            width: '100%',
          }}
        >
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
            rows={menu}
            columns={columns_I}
            getRowId={(res) => res.menuid}
            disableColumnMenu
            autoHeight
            pageSize={12}
            disableSelectionOnClick
            {...other}
          //checkboxSelection
          />
        </Box>
      </Container>
    </ThemeProvider>
  );
}