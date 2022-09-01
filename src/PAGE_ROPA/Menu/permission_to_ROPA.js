import * as React from 'react';
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridValueGetterParams,
  gridClasses,
  GridApi,
  GridCellValue,
} from '@mui/x-data-grid';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import AnimatedPage from '../../AnimatedPage.jsx'
import Box from '@mui/material/Box';
import logoPure from '../../image/Picture1.png'
import { alpha, styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import ArticleIcon from '@mui/icons-material/Article';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';

const ODD_OPACITY = 0.2;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  '.css-1knaqv7-MuiButtonBase-root-MuiButton-root': {
    color: 'rgba(0, 0, 0, 1)',
  },
  '.css-f3jnds-MuiDataGrid-columnHeaders': {
    backgroundColor: 'rgba(0, 0, 0, 1)',
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

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ลำดับ', headerClassName: 'super-app-theme--header', width: 70 },
  { field: 'inital', headerName: 'อักษรย่อ', headerClassName: 'super-app-theme--header', width: 130 },
  {
    field: 'full_name',
    headerName: 'ชื่อ - นามสกุล',
    headerClassName: 'super-app-theme--header',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 200,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  { field: 'DepID', headerName: 'แผนก', headerClassName: 'super-app-theme--header', width: 130 },
  { field: 'beginDate_permission', headerName: 'วันที่ได้รับสิทธิ์', headerClassName: 'super-app-theme--header', width: 130 },
  {
    field: 'action',
    headerName: 'Action',
    sortable: false,
    width: 200,
    renderCell: (params) => {
      const [open, setOpen] = React.useState(false);
      const [values, setValues] = React.useState([]);

      const handleClose = () => {
        setOpen(false);
      };

      const onClickDeelte = (e) => {
        e.stopPropagation(); // don't select this row after clicking
        setOpen(true);

        const api: GridApi = params.api;
        const thisRow: Record<string, GridCellValue> = {};

        api
          .getAllColumns()
          .filter((c) => c.field !== '__check__' && !!c)
          .forEach(
            (c) => (thisRow[c.field] = params.getValue(params.id, c.field)),
          );
        setValues(thisRow);
      };
      return (
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            direction="row"
            justifyContent="space-around"
            alignItems="flex-start"
          >
            <Grid item xs={4}>
              <Button variant="contained" style={{ backgroundColor: '#008000' }}><ArticleIcon /></Button>
            </Grid>
            <Grid item xs={4}>
              <Button onClick={onClickDeelte} variant="contained" style={{ backgroundColor: '#DC143C' }}><DeleteIcon /></Button>
            </Grid>
          </Grid>
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
                คุณต้องการที่จะลบข้อมูลการเข้าถึงสิทธิส่วนบุคคลของ {values.full_name} ?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Disagree</Button>
              <Button onClick={handleClose} autoFocus>
                Agree
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      );
    },
  },
];

const rows = [
  { id: 1, inital: 'PAB', lastName: 'Anekboonyapirom', DepID: 'ITO', beginDate_permission: '2022/09/01', firstName: 'Pison' },
  { id: 2, inital: 'TPS', lastName: 'สุขแสงเปล่ง', DepID: 'ITO', beginDate_permission: '2022/09/01', firstName: 'ธีรภณ' },
  { id: 3, inital: 'TPD', lastName: 'ดูเรืองรัมย์', DepID: 'ITO', beginDate_permission: '2022/09/01', firstName: 'ธนพล' },
  { id: 4, inital: 'SRD', lastName: 'แดงน้อย', DepID: 'ITO', beginDate_permission: '2022/09/01', firstName: 'สมฤดี' },
  { id: 5, inital: 'SCN', lastName: 'Numplaeg', DepID: 'ITO', beginDate_permission: '2022/09/01', firstName: 'Stc' },
];

export default function DataTable() {
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
              ผู้มีสิทธิ์เข้าถึงข้อมูล
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
          <Container component="main" sx={{ mt: 2, mb: 0 }} maxWidth="lg">
            <Box
              sx={{
                height: 450,
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
                }}
                components={{ Toolbar: GridToolbar }}
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
              //experimentalFeatures={{ newEditingApi: true }}
              //checkboxSelection
              />
            </Box>
          </Container>
        </Box>
      </AnimatedPage>
    </React.Fragment>
  );
}
