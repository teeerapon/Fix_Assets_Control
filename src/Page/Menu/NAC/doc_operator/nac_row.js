import * as React from 'react';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import AnimatedPage from '../../../../AnimatedPage.jsx'
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import 'reactjs-popup/dist/index.css';
import NAC_ReadOnly from './nac_row_readOnly';
import { Outlet, useNavigate } from "react-router";
import swal from 'sweetalert';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5, pb: 2 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'ptec@pure © '}
      <Link color="inherit">
        My Document For NAC
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

async function store_FA_control_select_NAC_approve(credentials) {
  return fetch('http://192.168.220.1:32001/api/store_FA_control_select_NAC_approve', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

export default function NAC_ROW() {

  const [selectNAC, setSelectNAC] = React.useState([]);
  const data = JSON.parse(localStorage.getItem('data'));
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);


  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - selectNAC.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const fetchMyNAC = async () => {
    const usercode = data.UserCode;
    const response = await store_FA_control_select_NAC_approve({
      usercode
    });
    console.log(response);
    setSelectNAC(response.data);
  };

  React.useEffect(() => {
    fetchMyNAC();
  }, []);

  const handleEditClick = (event, selectNAC) => {
    event.preventDefault();
    localStorage.setItem('NacCode', JSON.stringify({ nac_code: selectNAC.nac_code, nac_status: selectNAC.nac_status }));
    if (selectNAC.workflowtypeid === 1) {
      navigate('/NAC_ROW/NAC_CREATE_NEW_WAIT_APPROVE')
    } else if (selectNAC.workflowtypeid === 2) {
      navigate('/NAC_ROW/NAC_CREATE_WAIT_APPROVE')
    } else if (selectNAC.workflowtypeid === 3) {
      navigate('/NAC_ROW/NAC_CHANGE_WAIT_APPROVE')
    } else if (selectNAC.workflowtypeid === 4) {
      navigate('/NAC_ROW/NAC_DELETE_WAIT_APPROVE')
    } else if (selectNAC.workflowtypeid === 5) {
      navigate('/NAC_ROW/NAC_SEALS_APPROVE')
    } else {
      navigate('/HomePage')
    }
  };

  if (!selectNAC || selectNAC === undefined) {
    swal("แจ้งเตือน", 'ไม่พบรายการเปลี่ยนเปลงทรัพย์สิน', "warning", {
      buttons: false,
      timer: 2000,
    }).then((value) => {
      window.location.href = "/HomePage";
    });
  } else {
    return (
      <React.Fragment>
        <div>
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
                  สถานะรายการเปลี่ยนแปลงทรัพย์สิน
                </Typography>
              </AnimatedPage>
            </Toolbar>
          </AppBar>
          <AnimatedPage>
            <Container maxWidth="1000px">
              <React.Fragment>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                  <Typography variant="h5" color="inherit" noWrap sx={{ pl: 1 }}>
                    รายการ NAC ทั้งหมด
                  </Typography>
                  <TableContainer component={Paper} className='pt-1'>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table" id="table-to-xls1">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell align="center" sx={{ width: 200 }}>
                            เลขที่เอกสาร
                          </StyledTableCell>
                          <StyledTableCell align="left" sx={{ maxWidth: 300 }}>หัวข้อรายการ</StyledTableCell>
                          <StyledTableCell align="center" >ผู้ทำรายการ</StyledTableCell>
                          <StyledTableCell align="center">วันที่สร้างเอกสาร</StyledTableCell>
                          <StyledTableCell align="center" sx={{ width: 100 }}>ผู้ส่ง</StyledTableCell>
                          <StyledTableCell align="center" sx={{ width: 100 }}>ผู้รับ</StyledTableCell>
                          <StyledTableCell align="left" >สถานะการทำรายการ</StyledTableCell>
                          <StyledTableCell align="left" sx={{ width: 200 }}>ผู้ตรวจสอบ/อนุมัติ</StyledTableCell>
                          <StyledTableCell align="center" sx={{ width: 200 }}>Action</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {(rowsPerPage > 0
                          ? selectNAC.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          : selectNAC
                        ).map((selectNAC) => (
                          <React.Fragment>
                            <NAC_ReadOnly
                              selectNAC={selectNAC}
                              handleEditClick={handleEditClick}
                            />
                          </React.Fragment>
                        ))}
                        {emptyRows > 0 && (
                          <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                    <hr />
                    <Table sx={{ minWidth: 700 }} aria-label="customized table" id="table-to-xls1">
                      <TableFooter>
                        <TableRow>
                          <TablePagination
                            rowsPerPageOptions={[]}
                            count={selectNAC.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                              inputProps: {
                                'aria-label': 'rows per page',
                              },
                              native: true,
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                          />
                        </TableRow>
                      </TableFooter>
                    </Table>
                  </TableContainer>
                </Paper>
              </React.Fragment>
              <Copyright />
            </Container>
          </AnimatedPage>
        </div >
        <Outlet />
      </React.Fragment>
    );
  }
}