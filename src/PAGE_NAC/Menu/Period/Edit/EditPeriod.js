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
import ReadOnly from './ReadOnly.js';
import EditRow from './EditRow.js';
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
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

async function getPeriods(credentials) {
  return fetch('http://vpnptec.dyndns.org:32001/api/round_website', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

export default function EditPeriod() {

  const [EditPeriodData, setEditPeriodData] = React.useState(null);
  const data = JSON.parse(localStorage.getItem('data'));
  const [periodData, setPeriodData] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [editFormData, setEditFormData] = React.useState({
    PeriodID: '',
    BeginDate: '',
    EndDate: '',
    Description: '',
    BranchID: '',
  });
  const [dense, setDense] = React.useState(false);

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - periodData.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const fetchPeriodData = async () => {
    const BranchID = data.branchid;
    const response_data = await getPeriods({
      BranchID
    })
    setPeriodData(response_data);
  };

  React.useEffect(() => {
    fetchPeriodData();
    // 👇️ disable the rule for a single line

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEditClickCancel = () => {
    setEditPeriodData(null)
  }

  const handleEditFromChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFromData = { ...editFormData };
    newFromData[fieldName] = fieldValue;
    setEditFormData(newFromData);
  }

  const handleEditClick = (event, periodData) => {
    event.preventDefault();
    setEditPeriodData(periodData.PeriodID);

    const FromValues = {
      PeriodID: periodData.PeriodID,
      BeginDate: periodData.BeginDate,
      EndDate: periodData.EndDate,
      Description: periodData.Description,
      BranchID: periodData.BranchID,
    }

    setEditFormData(FromValues);
  };

  return (
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
            <Typography variant="h5" color="inherit" >
              แก้ไขรอบตรวจนับ
            </Typography>
          </AnimatedPage>
        </Toolbar>
      </AppBar>
      <AnimatedPage>
        <Container maxWidth="1000px">
          <FormControlLabel
            sx={{ pt: 2 }}
            control={<Switch checked={dense} onChange={handleChangeDense} />}
            label="Dense padding"
          />
          <Paper variant="outlined" sx={{ my: 2, p: { xs: 2, md: 3 } }}>
            <Toolbar
              sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
              }}
            >
              <Typography
                sx={{ flex: '1 1 100%' }}
                variant="h5"
                component="div"
              >
                สถานะรอบตรวจนับทั้งหมด
              </Typography>
            </Toolbar>
            <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
              <TableContainer component={Paper} className='pt-1'>
                <Table
                  size={dense ? 'small' : 'medium'}
                  sx={{ minWidth: 750 }}
                  aria-label="customized table"
                  id="table-to-xls1"
                >
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="left" sx={{ minWidth: 100 }}>วันที่และเวลาเริ่มต้น</StyledTableCell>
                      <StyledTableCell align="left" sx={{ minWidth: 100 }}>วันที่และเวลาสิ้นสุด</StyledTableCell>
                      <StyledTableCell align="left" sx={{ minWidth: 100 }}>คำธิบาย</StyledTableCell>
                      <StyledTableCell align="center" sx={{ minWidth: 100 }}>สาขา</StyledTableCell>
                      <StyledTableCell align="left" sx={{ minWidth: 100 }}>สถานะ</StyledTableCell>
                      <StyledTableCell align="center" sx={{ width: 200 }}>Action</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(rowsPerPage > 0
                      ? periodData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      : periodData
                    ).map((periodData) => (
                      <React.Fragment>
                        {EditPeriodData === periodData.PeriodID ? (
                          <EditRow
                            editFormData={editFormData}
                            handleEditFromChange={handleEditFromChange}
                            handleEditClickCancel={handleEditClickCancel}
                          />
                        ) : (
                          <ReadOnly
                            periodData={periodData}
                            handleEditClick={handleEditClick}
                          />
                        )}
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
                <Table sx={{ minWidth: 750 }} aria-label="customized table" id="table-to-xls1">
                  <TableFooter>
                    <TableRow>
                      <TablePagination
                        rowsPerPageOptions={[]}
                        count={periodData.length}
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
            </Box>
          </Paper>
          
        </Container>
      </AnimatedPage>
    </div >
  );
}