import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Button from '@mui/material/Button';
import AnimatedPage from "../../../AnimatedPage.jsx";
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import { Outlet, useNavigate } from "react-router";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function MenuAppBar() {
  const AssetsAll = JSON.parse(localStorage.getItem('Allassets'));
  console.log(AssetsAll.length)
  const AssetsAllCount = AssetsAll.length
  const [showResultsAll, setShowResultsAll] = React.useState(false)
  const navigate = useNavigate();

  if (!AssetsAll) {
    navigate("/ReportAll")
  }

  function ShowDataAll() {
    setShowResultsAll(showResultsAll => !showResultsAll);
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
              รายงานการตรวจนับทั้งหมด
            </Typography>
          </AnimatedPage>
        </Toolbar>
      </AppBar>
      <AnimatedPage>
        <div className='container pt-3' component="main">
          <center>
            <div className='col-md-10' align="left">
              <Card style={{ height: '4rem', background: 'linear-gradient(45deg, #0226d8 30%, #a602d8 90%)' }} className="block-example text-white">
                <CardContent>
                  <Row>
                    <Col className='col-md-8'><h3 align="left">ทั้งหมด ({AssetsAllCount})</h3></Col>
                    <Col align="right" >
                      <Button variant="contained" onClick={ShowDataAll} className="bg-white text-dark">Show/Hide</Button>
                    </Col>
                    <Col align="right" ><ReactHTMLTableToExcel
                      id="test-table-xls-button"
                      variant="contained"
                      className="download-table-xls-button btn mb-3 text-dark bg-white"
                      table="table-to-xls1"
                      filename="AssetsAllReported"
                      sheet="AssetsAllReported"
                      buttonText="Export to Excel" />
                    </Col>
                  </Row>
                </CardContent>
              </Card>
              {
                showResultsAll ?
                <TableContainer component={Paper} className='pt-1'>
                  <Table sx={{ minWidth: 700 }} aria-label="customized table" id="table-to-xls1">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align="left" sx={{ minWidth: 110 }}>
                          Asset ID
                        </StyledTableCell>
                        <StyledTableCell align="left" sx={{ minWidth: 150 }}>Assets Code</StyledTableCell>
                        <StyledTableCell align="left" >ชื่อทรัพย์สิน</StyledTableCell>
                        <StyledTableCell align="center" sx={{ minWidth: 110 }}>รอบที่บันทึก</StyledTableCell>
                        <StyledTableCell align="center" >สาขา</StyledTableCell>
                        <StyledTableCell align="center" sx={{ minWidth: 90 }}>ผู้ตรวจนับ</StyledTableCell>
                        <StyledTableCell align="center" sx={{ minWidth: 90 }}>อ้างอิง</StyledTableCell>
                        <StyledTableCell align="center" sx={{ minWidth: 90 }}>หมายเหตุ</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {AssetsAll.map((AssetsAll) => (
                        <StyledTableRow key={AssetsAll.Code}>
                          <StyledTableCell component="th" scope="row" align="left" >
                            {AssetsAll.AssetID}
                          </StyledTableCell>
                          <StyledTableCell align="left" >{AssetsAll.Code}</StyledTableCell>
                          <StyledTableCell align="left" >{AssetsAll.Name}</StyledTableCell>
                          <StyledTableCell align="center" >{AssetsAll.RoundID}</StyledTableCell>
                          <StyledTableCell align="center" >{AssetsAll.BranchID}</StyledTableCell>
                          <StyledTableCell align="center" >{AssetsAll.UserID}</StyledTableCell>
                          <StyledTableCell align="center" >{AssetsAll.Reference}</StyledTableCell>
                          <StyledTableCell align="center" >{AssetsAll.Reference}</StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                : null
              }
            </div>
          </center>
        </div>
      </AnimatedPage>
      <div className='pt-3'></div>
      <Outlet />
    </div>
  );
}
