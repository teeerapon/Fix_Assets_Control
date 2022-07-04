import * as React from 'react';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import AnimatedPage from '../../../../AnimatedPage.jsx'
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Axios from "axios"
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

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'ptec@pure © '}
      <Link color="inherit">
        Edit Period
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

export default function EditPeriod() {

  const [EditPeriodData, setEditPeriodData] = React.useState(null);
  const [periodData, setPeriodData] = React.useState([]);
  const [editFormData, setEditFormData] = React.useState({
    PeriodID: '',
    BeginDate: '',
    EndDate: '',
    Description: '',
    BranchID: '',
  });

  const fetchPeriodData = async () => {
    const { data } = await Axios.get(
      "http://49.0.64.71:32001/api/period_round"
    );
    const periodID = data;
    setPeriodData(periodID)
  };

  React.useEffect(() => {
    fetchPeriodData();
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
            <Typography variant="h5" color="inherit" noWrap>
              แก้ไขรอบตรวจนับ
            </Typography>
          </AnimatedPage>
        </Toolbar>
      </AppBar>
      <AnimatedPage>
        <Container>
          <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <TableContainer component={Paper} className='pt-1'>
              <Table sx={{ minWidth: 700 }} aria-label="customized table" id="table-to-xls1">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center" sx={{ width: 100 }}>
                      เลขที่
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ width: 200 }}>วันที่และเวลาเริ่มต้น</StyledTableCell>
                    <StyledTableCell align="center" sx={{ width: 200 }}>วันที่และเวลาสิ้นสุด</StyledTableCell>
                    <StyledTableCell align="center" >คำธิบาย</StyledTableCell>
                    <StyledTableCell align="center" sx={{ width: 100 }}>สาขา</StyledTableCell>
                    <StyledTableCell align="center" >การจัดการ</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {periodData.map((periodData) => (
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
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          <Copyright />
        </Container>
      </AnimatedPage>
    </div >
  );
}