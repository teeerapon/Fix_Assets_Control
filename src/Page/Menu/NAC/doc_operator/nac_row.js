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
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import SummarizeIcon from '@mui/icons-material/Summarize';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import 'reactjs-popup/dist/index.css';

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
  return fetch('http://vpnptec.dyndns.org:32001/api/store_FA_control_select_NAC_approve', {
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
  const [search, setSearchTerm] = React.useState('');
  const [tableSearch, setTableSearch] = React.useState([]);
  const data = JSON.parse(localStorage.getItem('data'));
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  const [dense, setDense] = React.useState(false);

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - (tableSearch.length === 0 ? selectNAC.filter((val) => {
      if (search === '') {
        return val
      } else if (val.nac_code.toLowerCase().includes(search.toLowerCase()) ||
        val.name.toLowerCase().includes(search.toLowerCase()) ||
        val.create_by.toLowerCase().includes(search.toLowerCase()) ||
        val.status_name.toLowerCase().includes(search.toLowerCase())) {
        return val
      }
    }).length : tableSearch.filter((val) => {
      if (search === '') {
        return val
      } else if (val.nac_code.toLowerCase().includes(search.toLowerCase()) ||
        val.name.toLowerCase().includes(search.toLowerCase()) ||
        val.create_by.toLowerCase().includes(search.toLowerCase()) ||
        val.status_name.toLowerCase().includes(search.toLowerCase())) {
        return val
      }
    })).length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 20));
    setPage(0);
  };

  const fetchMyNAC = async () => {
    const usercode = data.UserCode;
    const response = await store_FA_control_select_NAC_approve({
      usercode
    });
    setSelectNAC(response.data);
  };


  function handleGoNAC() {
    navigate('/NAC_ROW')
  }


  const handleSetSearch = (event) => {
    setSearchTerm(event.target.value)
    setTableSearch(selectNAC.filter((val) => {
      if (event.target.value === '') {
        return val
      } else if (val.nac_code.toLowerCase().includes((event.target.value).toLowerCase()) ||
        val.name.toLowerCase().includes((event.target.value).toLowerCase()) ||
        val.create_by.toLowerCase().includes((event.target.value).toLowerCase()) ||
        val.status_name.toLowerCase().includes((event.target.value).toLowerCase())) {
        return val
      }
    }));
  }

  React.useEffect(() => {
    fetchMyNAC();
    // 👇️ disable the rule for a single line

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEditClick = (event, selectNAC) => {
    event.preventDefault();
    localStorage.setItem('NacCode', JSON.stringify({ nac_code: selectNAC.nac_code, nac_status: selectNAC.nac_status }));
    if (selectNAC.workflowtypeid === 1) {
      navigate('/NAC_ROW/NAC_CREATE_NEW_WAIT_APPROVE/' + selectNAC.nac_code)
    } else if (selectNAC.workflowtypeid === 2) {
      navigate('/NAC_ROW/NAC_CREATE_WAIT_APPROVE/' + selectNAC.nac_code)
    } else if (selectNAC.workflowtypeid === 3) {
      navigate('/NAC_ROW/NAC_CHANGE_WAIT_APPROVE/' + selectNAC.nac_code)
    } else if (selectNAC.workflowtypeid === 4) {
      navigate('/NAC_ROW/NAC_DELETE_WAIT_APPROVE/' + selectNAC.nac_code)
    } else if (selectNAC.workflowtypeid === 5) {
      navigate('/NAC_ROW/NAC_SEALS_APPROVE/' + selectNAC.nac_code)
    } else {
      navigate('/HomePage')
    }
  };

  if (!selectNAC || selectNAC === undefined) {
    swal("ยินดีด้วย", 'ไม่พบรายการเปลี่ยนเปลงทรัพย์สิน', "success", {
      buttons: false,
      timer: 2500,
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
              <Box sx={{ width: 1 }}>
                <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={17}>
                  <Box gridColumn="span 10">
                    <AnimatedPage>
                      <Typography variant="h5" color="inherit" noWrap sx={{ pt: 1 }}>
                        สถานะรายการเปลี่ยนแปลงทรัพย์สิน
                      </Typography>
                    </AnimatedPage>
                  </Box>
                  <Box gridColumn="span 0">
                    <AnimatedPage>
                      <IconButton sx={{ color: 'rgb(0,0,0)' }} component="label" size="large" onClick={handleGoNAC}>
                        <SummarizeIcon />
                      </IconButton>
                    </AnimatedPage>
                  </Box>
                </Box>
              </Box>
            </Toolbar>
          </AppBar>
          <AnimatedPage>
            <Container maxWidth="1000px">
              <React.Fragment>
                <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', pl: 1 }}>
                    <Typography variant="h6" color="inherit" noWrap>
                      ค้นหา
                    </Typography>
                  </Box>
                  <TextField
                    id="outlined-basic"
                    label="Search..."
                    variant="outlined"
                    size="small"
                    onChange={handleSetSearch}
                    value={search}
                  />
                  <FormControlLabel
                    control={<Switch checked={dense} onChange={handleChangeDense} />}
                    label="Dense padding"
                  />
                </Stack>
                <Paper variant="outlined" sx={{ my: 2, p: { xs: 2, md: 3 } }}>
                  <Typography variant="h5" color="inherit" noWrap sx={{ pl: 1 }}>
                    รายการ NAC ทั้งหมด
                  </Typography>
                  <TableContainer component={Paper} className='pt-1'>
                    <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 700 }} aria-label="customized table" id="table-to-xls1">
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
                          <StyledTableCell align="left" sx={{ width: 150 }}>ผู้ตรวจสอบ/อนุมัติ</StyledTableCell>
                          <StyledTableCell align="center" sx={{ width: 200 }}>Action</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {tableSearch.length === 0 ? (rowsPerPage > 0
                          ? selectNAC.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).filter((selectNAC) => {
                            if (search === '') {
                              return selectNAC
                            } else if (selectNAC.nac_code.toLowerCase().includes(search.toLowerCase()) ||
                              selectNAC.name.toLowerCase().includes(search.toLowerCase()) ||
                              selectNAC.create_by.toLowerCase().includes(search.toLowerCase()) ||
                              selectNAC.status_name.toLowerCase().includes(search.toLowerCase())) {
                              return selectNAC
                            }
                          })
                          : selectNAC.filter((selectNAC) => {
                            if (search === '') {
                              return selectNAC
                            } else if (selectNAC.nac_code.toLowerCase().includes(search.toLowerCase()) ||
                              selectNAC.name.toLowerCase().includes(search.toLowerCase()) ||
                              selectNAC.create_by.toLowerCase().includes(search.toLowerCase()) ||
                              selectNAC.status_name.toLowerCase().includes(search.toLowerCase())) {
                              return selectNAC
                            }
                          })
                        ).map((selectNAC) => (
                          <React.Fragment>
                            <NAC_ReadOnly
                              selectNAC={selectNAC}
                              handleEditClick={handleEditClick}
                            />
                          </React.Fragment>
                        ))
                          : (rowsPerPage > 0
                            ? tableSearch.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).filter((selectNAC) => {
                              if (search === '') {
                                return selectNAC
                              } else if (selectNAC.nac_code.toLowerCase().includes(search.toLowerCase()) ||
                                selectNAC.name.toLowerCase().includes(search.toLowerCase()) ||
                                selectNAC.create_by.toLowerCase().includes(search.toLowerCase()) ||
                                selectNAC.status_name.toLowerCase().includes(search.toLowerCase())) {
                                return selectNAC
                              }
                            })
                            : tableSearch.filter((selectNAC) => {
                              if (search === '') {
                                return selectNAC
                              } else if (selectNAC.nac_code.toLowerCase().includes(search.toLowerCase()) ||
                                selectNAC.name.toLowerCase().includes(search.toLowerCase()) ||
                                selectNAC.create_by.toLowerCase().includes(search.toLowerCase()) ||
                                selectNAC.status_name.toLowerCase().includes(search.toLowerCase())) {
                                return selectNAC
                              }
                            })
                          ).map((selectNAC) => (
                            <React.Fragment>
                              <NAC_ReadOnly
                                selectNAC={selectNAC}
                                handleEditClick={handleEditClick}
                              />
                            </React.Fragment>
                          ))}
                        {emptyRows > 0 && (
                          <TableRow
                            style={{
                              height: (dense ? 33 : 53) * emptyRows,
                            }}
                          >
                            <TableCell colSpan={9} />
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
                            count={tableSearch.length === 0 ? selectNAC.filter((val) => {
                              if (search === '') {
                                return val
                              } else if (val.nac_code.toLowerCase().includes(search.toLowerCase()) ||
                                val.name.toLowerCase().includes(search.toLowerCase()) ||
                                val.create_by.toLowerCase().includes(search.toLowerCase()) ||
                                val.status_name.toLowerCase().includes(search.toLowerCase())) {
                                return val
                              }
                            }).length
                              : tableSearch.filter((val) => {
                                if (search === '') {
                                  return val
                                } else if (val.nac_code.toLowerCase().includes(search.toLowerCase()) ||
                                  val.name.toLowerCase().includes(search.toLowerCase()) ||
                                  val.create_by.toLowerCase().includes(search.toLowerCase()) ||
                                  val.status_name.toLowerCase().includes(search.toLowerCase())) {
                                  return val
                                }
                              }).length}
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