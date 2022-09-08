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
import { alpha, styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import ArticleIcon from '@mui/icons-material/Visibility';
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
import { Switch } from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PersonAddAlt1 from '@mui/icons-material/PersonAddAlt1';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';

const ODD_OPACITY = 0.2;

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

  const [selectedUser, setSelectedUser] = React.useState();
  const [openDialogDelete, setOpenDialogDelete] = React.useState(false);
  const [openDialogDeleteII, setOpenDialogDeleteII] = React.useState(false);

  const [rows_pageMAIN, setRows_pageMAIN] = React.useState();
  const [columns_pageMAIN, setColumns_pageMAIN] = React.useState();

  const [rows_pageII, setRows_pageII] = React.useState();
  const [rows_pageII_I, setRows_pageII_I] = React.useState();
  const [rows_pageIII, setRows_pageIII] = React.useState();

  const [columns_pageII, setColumns_pageII] = React.useState();
  const [columns_pageII_I, setColumns_pageII_I] = React.useState();
  const [columns_pageIII, setColumns_pageIII] = React.useState();

  const handleCloseDeleteII = () => {
    setOpenDialogDeleteII(false);
  };

  const handleCloseDelete = () => {
    setOpenDialogDelete(false);
  };

  const row_PageIII = [
    { id: 1, type_name: 'หมายเลขบัตรประจำตัวประชาชน', },
    { id: 2, type_name: 'ที่อยู่', },
    { id: 3, type_name: 'ข้อมูลการศึกษา', },
    { id: 4, type_name: 'ข้อมูลทางการเงิน', },
    { id: 5, type_name: 'ประวัติการทำงาน', },
    { id: 6, type_name: 'ข้อมูลอ่อนไหว', },
  ];

  const column_PageIII: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ลำดับ',
      headerClassName: 'super-app-theme--header',
      flex: 1,
      hide: true,
    },
    {
      field: 'type_name',
      headerName: 'หัวข้อ',
      headerClassName: 'super-app-theme--header',
      flex: 1,
    },
    {
      field: 'checked',
      headerName: '',
      flex: 1,
      type: 'number',
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            style={{ backgroundColor: '#DC143C' }}
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        );
      }
    },
  ];

  const row_PageII = [
    { id: 1, inital: 'PAB', lastName: 'Anekboonyapirom', depID: 'ITO', beginDate_permission: '2022/08/01', date_permission: '2022/08/01', firstName: 'Pison' },
    { id: 2, inital: 'TPS', lastName: 'สุขแสงเปล่ง', depID: 'ITO', beginDate_permission: '2022/09/04', date_permission: '2022/08/01', firstName: 'ธีรภณ' },
    { id: 3, inital: 'TPD', lastName: 'ดูเรืองรัมย์', depID: 'ITO', beginDate_permission: '2022/08/25', date_permission: '2022/08/01', firstName: 'ธนพล' },
    { id: 4, inital: 'SRD', lastName: 'แดงน้อย', depID: 'ITO', beginDate_permission: '2022/09/01', date_permission: '2022/08/01', firstName: 'สมฤดี' },
    { id: 5, inital: 'SCN', lastName: 'Numplaeg', depID: 'ITO', beginDate_permission: '2022/09/01', date_permission: '2022/08/01', firstName: 'Stc' },
  ];

  const column_PageII: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ลำดับ',
      headerClassName: 'super-app-theme--header',
      flex: 1,
      hide: true,
    },
    {
      field: 'inital',
      headerName: 'อักษรย่อ',
      headerClassName: 'super-app-theme--header',
      width: 100,
    },
    {
      field: 'full_name',
      headerName: 'ชื่อ - นามสกุล',
      headerClassName: 'super-app-theme--header',
      flex: 1,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
      field: 'depID',
      headerName: 'แผนก',
      headerClassName: 'super-app-theme--header',
      width: 100,
    },
    {
      field: 'beginDate_permission',
      headerName: 'วันที่ได้รับความยินยอม',
      type: 'dateTime',
      headerClassName: 'super-app-theme--header',
      width: 130,
    },
    {
      field: 'date_permission',
      headerName: 'วันที่เก็บข้อมูล',
      type: 'dateTime',
      headerClassName: 'super-app-theme--header',
      width: 130,
    },
    {
      field: 'permission',
      headerName: 'Permission',
      flex: 1,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const onClickPermission = (e) => {
          e.stopPropagation(); // don't select this row after clicking

          const value = params.colDef.field;
          const api: GridApi = params.api;
          const thisRow: Record<string, GridCellValue> = {};

          api
            .getAllColumns()
            .filter((c) => c.field !== "__check__" && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
            );
          setRows_pageIII(row_PageIII);
          setColumns_pageIII(column_PageIII)
          setRows_pageMAIN(row_PageIII)
          setColumns_pageMAIN(column_PageIII)
          setRows_pageII(null);
          setColumns_pageII(null)
          setRows_pageII_I(null);
          setColumns_pageII_I(null);
        };
        return (
          <Button
            variant="contained"
            onClick={onClickPermission}
            style={{ backgroundColor: '#008000' }}
            startIcon={<ArticleIcon />}
          >
            Permission
          </Button>
        );
      }
    },
    {
      field: 'delete',
      headerName: 'Delete',
      flex: 1,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const onClickDelete = (e) => {
          e.stopPropagation(); // don't select this row after clicking

          const value = params.colDef.field;
          const api: GridApi = params.api;
          const thisRow: Record<string, GridCellValue> = {};

          api
            .getAllColumns()
            .filter((c) => c.field !== "__check__" && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
            );
          setSelectedUser(thisRow);
          setOpenDialogDelete(true);
        };
        return (
          <Button
            variant="contained"
            onClick={onClickDelete}
            style={{ backgroundColor: '#DC143C' }}
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        );
      }
    },
  ];

  const row_PageII_I = [
    { id: 1, inital: 'PAB', lastName: 'Anekboonyapirom', depID: 'ITO', beginDate_permission: '2022/09/01', firstName: 'Pison' },
    { id: 2, inital: 'TPS', lastName: 'สุขแสงเปล่ง', depID: 'ITO', beginDate_permission: '2022/09/01', firstName: 'ธีรภณ' },
    { id: 3, inital: 'TPD', lastName: 'ดูเรืองรัมย์', depID: 'ITO', beginDate_permission: '2022/09/01', firstName: 'ธนพล' },
    { id: 4, inital: 'SRD', lastName: 'แดงน้อย', depID: 'ITO', beginDate_permission: '2022/09/01', firstName: 'สมฤดี' },
    { id: 5, inital: 'SCN', lastName: 'Numplaeg', depID: 'ITO', beginDate_permission: '2022/09/01', firstName: 'Stc' },
  ];

  const column_PageII_I: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ลำดับ',
      headerClassName: 'super-app-theme--header',
      flex: 1,
      hide: true,
    },
    {
      field: 'inital',
      headerName: 'อักษรย่อ',
      headerClassName: 'super-app-theme--header',
      flex: 1,
    },
    {
      field: 'full_name',
      headerName: 'ชื่อ - นามสกุล',
      headerClassName: 'super-app-theme--header',
      description: 'This column has a value getter and is not sortable.',
      flex: 1,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
      field: 'depID',
      headerName: 'แผนก',
      headerClassName: 'super-app-theme--header',
      flex: 1,
    },
    {
      field: 'beginDate_permission',
      headerName: 'วันที่ได้รับสิทธิ์',
      type: 'dateTime',
      headerClassName: 'super-app-theme--header',
      flex: 1,
    },
    {
      field: 'action',
      headerName: 'Action',

      flex: 1,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const onClickDelete = (e) => {
          e.stopPropagation(); // don't select this row after clicking

          const value = params.colDef.field;
          const api: GridApi = params.api;
          const thisRow: Record<string, GridCellValue> = {};

          api
            .getAllColumns()
            .filter((c) => c.field !== "__check__" && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
            );
          setSelectedUser(thisRow);
          setOpenDialogDeleteII(true);
        };
        return (
          <Button
            variant="contained"
            onClick={onClickDelete}
            color='error'
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        );
      }
    },
  ];

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      headerClassName: 'super-app-theme--header',
      width: 80,
      hide: true,
    },
    {
      field: 'code',
      headerName: 'Code',
      headerClassName: 'super-app-theme--header',
      width: 80,
    },
    {
      field: 'name_ROPA',
      headerName: 'ชือหัวข้อ',
      headerClassName: 'super-app-theme--header',
      flex: 1,
    },
    {
      field: 'scope_group',
      headerName: 'กลุ่มเป้าหมาย',
      headerClassName: 'super-app-theme--header',
      flex: 1,
    },
    {
      field: 'layer_security',
      headerName: 'ขั้นตอนในการรักษาความปลอดภัยของข้อมูล',
      headerClassName: 'super-app-theme--header',
      flex: 1,
    },
    {
      field: 'begin_date_security',
      headerName: 'วันที่ล่าสุดที่ประมวลผล',
      type: 'dateTime',
      headerClassName: 'super-app-theme--header',
      flex: 1,
    },
    {
      field: 'permission',
      headerName: 'Permission',
      flex: 1,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const onClickPermission = (e) => {
          e.stopPropagation(); // don't select this row after clicking

          const value = params.colDef.field;
          const api: GridApi = params.api;
          const thisRow: Record<string, GridCellValue> = {};

          api
            .getAllColumns()
            .filter((c) => c.field !== "__check__" && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
            );
          setRows_pageII(row_PageII);
          setColumns_pageII(column_PageII)
          setRows_pageMAIN(row_PageII)
          setColumns_pageMAIN(column_PageII)
          setRows_pageII_I(null);
          setColumns_pageII_I(null);
          setRows_pageIII(null);
          setColumns_pageIII(null);
        };
        return (
          <Button
            variant="contained"
            onClick={onClickPermission}
            style={{ backgroundColor: '#008000' }}
            startIcon={<ArticleIcon />}
          >
            PERSON
          </Button>
        );
      }
    },
    {
      field: 'permission_person',
      headerName: 'Person',
      flex: 1,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const onClickPermission = (e) => {
          e.stopPropagation(); // don't select this row after clicking

          const value = params.colDef.field;
          const api: GridApi = params.api;
          const thisRow: Record<string, GridCellValue> = {};

          api
            .getAllColumns()
            .filter((c) => c.field !== "__check__" && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
            );
          setRows_pageII_I(row_PageII_I);
          setColumns_pageII_I(column_PageII_I);
          setRows_pageMAIN(row_PageII_I)
          setColumns_pageMAIN(column_PageII_I)
          setRows_pageII(null);
          setColumns_pageII(null);
          setRows_pageIII(null);
          setColumns_pageIII(null);
        };
        return (
          <Button
            variant="contained"
            onClick={onClickPermission}
            color="secondary"
            startIcon={<AccountBoxIcon />}
          >
            USERS
          </Button>
        );
      }
    },
  ];

  const rows = [
    { id: 1, code: 'HRM', name_ROPA: 'ข้อมูลการสมัครงาน', scope_group: 'ผู้สมัครงาน, กลุ่มเป้าหมาย', layer_security: 'ตู้เก็บเอกสารมีกุญแจล็อค, ระบบ Tigersoft มีการกำหนดสิทธิ์', begin_date_security: '2022/09/05' },
  ];

  function backToPageI() {
    setRows_pageMAIN(null)
    setColumns_pageMAIN(null)
    setRows_pageII(null)
    setRows_pageII_I(null)
    setRows_pageIII(null)
    setColumns_pageII(null)
    setColumns_pageII_I(null)
    setColumns_pageIII(null)
  };

  function backToPageII() {
    setRows_pageMAIN(row_PageII)
    setColumns_pageMAIN(column_PageII)
    setRows_pageII(row_PageII)
    setColumns_pageII(column_PageII)
    setRows_pageII_I(null)
    setColumns_pageII_I(null)
    setRows_pageIII(null)
    setColumns_pageIII(null)
  };

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
              สิทธิ์เข้าถึงข้อมูล
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
                height: 480,
                width: '100%',
              }}
            >
              {rows_pageII ?
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <div role="presentation">
                    <Breadcrumbs aria-label="breadcrumb">
                      <Chip variant="outlined" label="สิทธิ์เข้าถึงข้อมูล" onClick={backToPageI} />
                      <Chip variant="outlined" label="ราชชื่อผู้ยินยอม" />
                    </Breadcrumbs>
                  </div>
                </Stack> : rows_pageIII ?
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <div role="presentation">
                      <Breadcrumbs aria-label="breadcrumb">
                        <Chip variant="outlined" label="สิทธิ์เข้าถึงข้อมูล" onClick={backToPageI} />
                        <Chip variant="outlined" label="ราชชื่อผู้ยินยอม" onClick={backToPageII} />
                        <Chip variant="outlined" label="ข้อมูลที่ยินยอม" />
                      </Breadcrumbs>
                    </div>
                  </Stack> : rows_pageII_I ?
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <div role="presentation">
                        <Breadcrumbs aria-label="breadcrumb">
                          <Chip variant="outlined" label="สิทธิ์เข้าถึงข้อมูล" onClick={backToPageI} />
                          <Chip variant="outlined" label="รายชื่อผู้มีสิทธิ์" />
                        </Breadcrumbs>
                      </div>
                      <Button
                        size="small"
                        variant="contained"
                        color='secondary'
                        startIcon={<PersonAddAlt1 size="small" />}
                      >
                        Add User
                      </Button>
                    </Stack>
                    : <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <div role="presentation">
                        <Breadcrumbs aria-label="breadcrumb">
                          <Chip variant="outlined" label="สิทธิ์เข้าถึงข้อมูล" />
                        </Breadcrumbs>
                      </div>
                    </Stack>
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
                rows={!rows_pageMAIN ? rows : rows_pageMAIN}
                columns={!columns_pageMAIN ? columns : columns_pageMAIN}
                getRowHeight={() => 'auto'}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableColumnMenu
                disableSelectionOnClick
              />
              <Dialog
                open={openDialogDelete}
                onClose={handleCloseDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"แจ้งเตือน"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    คุณต้องการที่จะลบข้อมูลของ {!selectedUser ? null : selectedUser.full_name} ?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseDelete}>ไม่ใช่</Button>
                  <Button onClick={handleCloseDelete} autoFocus>
                    ใช่
                  </Button>
                </DialogActions>
              </Dialog>
              <Dialog
                open={openDialogDeleteII}
                onClose={handleCloseDeleteII}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"แจ้งเตือน"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    คุณต้องการที่จะลบข้อมูลของ {!selectedUser ? null : selectedUser.full_name} ?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseDeleteII}>ไม่ใช่</Button>
                  <Button onClick={handleCloseDeleteII} autoFocus>
                    ใช่
                  </Button>
                </DialogActions>
              </Dialog>
            </Box>
          </Container>
        </Box>
      </AnimatedPage>
    </React.Fragment>
  );
}
