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
  const AssetsAll = JSON.parse(localStorage.getItem('Allaseets'));
  const aseetsCounted = JSON.parse(localStorage.getItem('aseetsCounted'));
  const assetsWrong = JSON.parse(localStorage.getItem('assetsWrong'));
  const aseetsCounted_Count = aseetsCounted.length
  const AssetsAllCount = AssetsAll.length
  const assetsWrongCount = assetsWrong.length
  const allAssetsReport = aseetsCounted.length + AssetsAll.length + assetsWrong.length
  const [showResults, setShowResults] = React.useState(false)
  const [showResults2, setShowResults2] = React.useState(false)
  const [showResults3, setShowResults3] = React.useState(false)
  const [showResultsAll, setShowResultsAll] = React.useState(false)
  const navigate = useNavigate();

  if (!AssetsAll || !aseetsCounted || !assetsWrong) {
    navigate("/Report")
  }

  function ShowDataAll() {
    setShowResultsAll(showResultsAll => !showResultsAll);
  };

  function ShowData1() {
    setShowResults(showResults => !showResults);
  };
  function ShowData2() {
    setShowResults2(showResults2 => !showResults2);
  };
  function ShowData3() {
    setShowResults3(showResults3 => !showResults3);
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
              รายงานการตรวจนับของสาขาที่
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
                    <Col className='col-md-8'><h3 align="left">ทั้งหมด ({allAssetsReport})</h3></Col>
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
              {showResultsAll ?
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
                      {aseetsCounted.map((aseetsCounted) => (
                        <StyledTableRow key={aseetsCounted.Code}>
                          <StyledTableCell component="th" scope="row" align="left" >
                            {aseetsCounted.AssetID}
                          </StyledTableCell>
                          <StyledTableCell align="left" >{aseetsCounted.Code}</StyledTableCell>
                          <StyledTableCell align="left" >{aseetsCounted.Name}</StyledTableCell>
                          <StyledTableCell align="center" >{aseetsCounted.RoundID}</StyledTableCell>
                          <StyledTableCell align="center" >{aseetsCounted.BranchID}</StyledTableCell>
                          <StyledTableCell align="center" >{aseetsCounted.UserID}</StyledTableCell>
                          <StyledTableCell align="center" >{aseetsCounted.Reference}</StyledTableCell>
                          <StyledTableCell align="center" className='col-md-1 bg-success text-white'>นับแล้ว</StyledTableCell>
                        </StyledTableRow>
                      ))}
                      {assetsWrong.map((assetsWrong) => (
                        <StyledTableRow key={assetsWrong.Code}>
                          <StyledTableCell component="th" scope="row" align="left" >
                            {assetsWrong.AssetID}
                          </StyledTableCell>
                          <StyledTableCell align="left" >{assetsWrong.Code}</StyledTableCell>
                          <StyledTableCell align="left" >{assetsWrong.Name}</StyledTableCell>
                          <StyledTableCell align="center" >{assetsWrong.RoundID}</StyledTableCell>
                          <StyledTableCell align="center" >{assetsWrong.BranchID}</StyledTableCell>
                          <StyledTableCell align="center" >{assetsWrong.UserID}</StyledTableCell>
                          <StyledTableCell align="center" >{assetsWrong.Reference}</StyledTableCell>
                          <StyledTableCell align="center" className='col-md-1 bg-danger text-white'>ต่างสาขา</StyledTableCell>
                        </StyledTableRow>
                      ))}
                      {AssetsAll.map((AssetsAll, index) => (
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
                          <StyledTableCell align="center" className='col-md-1 bg-warning text-white'>คงเหลือ</StyledTableCell>
                        </StyledTableRow>
                      ))}
                      <StyledTableRow>
                        <StyledTableCell component="th" scope="row" align="left" >
                          <b>นับแล้ว</b>
                        </StyledTableCell>
                        <StyledTableCell align="left" ></StyledTableCell>
                        <StyledTableCell align="left" ></StyledTableCell>
                        <StyledTableCell align="center" ></StyledTableCell>
                        <StyledTableCell align="center" ></StyledTableCell>
                        <StyledTableCell align="center" ></StyledTableCell>
                        <StyledTableCell align="center" ><b>{aseetsCounted_Count}</b></StyledTableCell>
                        <StyledTableCell align="center" ><b>รายการ</b></StyledTableCell>
                      </StyledTableRow>
                      <StyledTableRow>
                        <StyledTableCell component="th" scope="row" align="left" >
                          <b>ต่างสาขา</b>
                        </StyledTableCell>
                        <StyledTableCell align="left" ></StyledTableCell>
                        <StyledTableCell align="left" ></StyledTableCell>
                        <StyledTableCell align="center" ></StyledTableCell>
                        <StyledTableCell align="center" ></StyledTableCell>
                        <StyledTableCell align="center" ></StyledTableCell>
                        <StyledTableCell align="center" ><b>{assetsWrongCount}</b></StyledTableCell>
                        <StyledTableCell align="center" ><b>รายการ</b></StyledTableCell>
                      </StyledTableRow>
                      <StyledTableRow>
                        <StyledTableCell component="th" scope="row" align="left" >
                          <b>คงเหลือ</b>
                        </StyledTableCell>
                        <StyledTableCell align="left" ></StyledTableCell>
                        <StyledTableCell align="left" ></StyledTableCell>
                        <StyledTableCell align="center" ></StyledTableCell>
                        <StyledTableCell align="center" ></StyledTableCell>
                        <StyledTableCell align="center" ></StyledTableCell>
                        <StyledTableCell align="center" ><b>{AssetsAllCount}</b></StyledTableCell>
                        <StyledTableCell align="center" ><b>รายการ</b></StyledTableCell>
                      </StyledTableRow>
                      <StyledTableRow>
                        <StyledTableCell component="th" scope="row" align="left" >
                          <b>รวมทั้งหมด</b>
                        </StyledTableCell>
                        <StyledTableCell align="left" className='col-md-2 '></StyledTableCell>
                        <StyledTableCell align="left" ></StyledTableCell>
                        <StyledTableCell align="center" ></StyledTableCell>
                        <StyledTableCell align="center" ></StyledTableCell>
                        <StyledTableCell align="center" ></StyledTableCell>
                        <StyledTableCell align="center" ><b>{allAssetsReport}</b></StyledTableCell>
                        <StyledTableCell align="center" ><b>รายการ</b></StyledTableCell>
                      </StyledTableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                : null}
            </div>
          </center>
        </div>
        <div className='container pt-3'>
          <center>
            <div className='col-md-10' align="left">
              <Card style={{ height: '4rem', background: 'linear-gradient(45deg, #5cb85c 30%, #e5ff00 90%)' }} className="block-example text-white">
                <CardContent>
                  <Row>
                    <Col className='col-md-8'><h3 align="left">นับแล้ว ({aseetsCounted_Count})</h3></Col>
                    <Col align="right" >
                      <Button variant="contained" className='text-dark bg-white' onClick={ShowData1}>Show/Hide</Button>
                    </Col>
                    <Col align="right" ><ReactHTMLTableToExcel
                      id="test-table-xls-button"
                      className="download-table-xls-button btn mb-3 text-dark bg-white"
                      table="table-to-xls1"
                      filename="Assets_Counted"
                      sheet="Assets_Counted"
                      buttonText="Export to Excel" />
                    </Col>
                  </Row>
                </CardContent>
              </Card>
              {showResults ?
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
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {aseetsCounted.map((aseetsCounted) => (
                        <StyledTableRow key={aseetsCounted.Code}>
                          <StyledTableCell component="th" scope="row" align="left">
                            {aseetsCounted.AssetID}
                          </StyledTableCell>
                          <StyledTableCell align="left" >{aseetsCounted.Code}</StyledTableCell>
                          <StyledTableCell align="left" >{aseetsCounted.Name}</StyledTableCell>
                          <StyledTableCell align="center" >{aseetsCounted.RoundID}</StyledTableCell>
                          <StyledTableCell align="center" >{aseetsCounted.BranchID}</StyledTableCell>
                          <StyledTableCell align="center" >{aseetsCounted.UserID}</StyledTableCell>
                          <StyledTableCell align="center" >{aseetsCounted.Reference}</StyledTableCell>
                        </StyledTableRow>
                      ))}
                      <StyledTableRow>
                        <StyledTableCell component="th" scope="row" align="left" >
                          <b>รวมทั้งหมด</b>
                        </StyledTableCell>
                        <StyledTableCell align="left" ></StyledTableCell>
                        <StyledTableCell align="left" ></StyledTableCell>
                        <StyledTableCell align="center" ></StyledTableCell>
                        <StyledTableCell align="center" ></StyledTableCell>
                        <StyledTableCell align="center" ><b>{aseetsCounted_Count}</b></StyledTableCell>
                        <StyledTableCell align="center" ><b>รายการ</b></StyledTableCell>
                      </StyledTableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                : null}
            </div>
          </center>
        </div>
        <div className='container pt-3'>
          <center>
            <div className='col-md-10' align="left">
              <Card style={{ height: '4rem', background: 'linear-gradient(45deg, #e8241e 30%, #FF8E53 90%)' }} className='block-example text-white'>
                <CardContent>
                  <Row>
                    <Col className='col-md-8'><h3 align="left">นับแล้วต่างสาขา ({assetsWrongCount})</h3></Col>
                    <Col align="right" >
                      <Button variant="contained" className='text-dark bg-white' onClick={ShowData2}>Show/Hide</Button>
                    </Col>
                    <Col align="right" ><ReactHTMLTableToExcel
                      id="test-table-xls-button"
                      className="download-table-xls-button btn mb-3 text-dark bg-white"
                      table="table-to-xls2"
                      filename="Assets_Wrong"
                      sheet="Assets_Wrong"
                      buttonText="Export to Excel" />
                    </Col>
                  </Row>
                </CardContent>
              </Card>
              {
                showResults2 ?
                  <TableContainer component={Paper} className='pt-1'>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table" id="table-to-xls2">
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
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {assetsWrong.map((assetsWrong) => (
                          <StyledTableRow key={assetsWrong.Code}>
                            <StyledTableCell component="th" scope="row" align="left" >
                              {assetsWrong.AssetID}
                            </StyledTableCell>
                            <StyledTableCell align="left" >{assetsWrong.Code}</StyledTableCell>
                            <StyledTableCell align="left" >{assetsWrong.Name}</StyledTableCell>
                            <StyledTableCell align="center" >{assetsWrong.RoundID}</StyledTableCell>
                            <StyledTableCell align="center" >{assetsWrong.BranchID}</StyledTableCell>
                            <StyledTableCell align="center" >{assetsWrong.UserID}</StyledTableCell>
                            <StyledTableCell align="center" >{assetsWrong.Reference}</StyledTableCell>
                          </StyledTableRow>
                        ))}
                        <StyledTableRow>
                          <StyledTableCell component="th" scope="row" align="left" >
                            <b>รวมทั้งหมด</b>
                          </StyledTableCell>
                          <StyledTableCell align="left" ></StyledTableCell>
                          <StyledTableCell align="left" ></StyledTableCell>
                          <StyledTableCell align="center" ></StyledTableCell>
                          <StyledTableCell align="center" ></StyledTableCell>
                          <StyledTableCell align="center" ><b>{assetsWrongCount}</b></StyledTableCell>
                          <StyledTableCell align="center" ><b>รายการ</b></StyledTableCell>
                        </StyledTableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                  : null
              }
            </div>
          </center>
        </div>
        <div className='container pt-3'>
          <center>
            <div className='col-md-10' align="left">
              <Card style={{ height: '4rem', background: 'linear-gradient(45deg, #0d2840 30%, #184c7a 90%)' }} className='block-example text-white'>
                <CardContent>
                  <Row>
                    <Col className='col-md-8'><h3 align="left">คงเหลือที่ไม่ได้นับ ({AssetsAllCount})</h3></Col>
                    <Col align="right" >
                      <Button variant="contained" className='text-dark bg-white' onClick={ShowData3}>Show/Hide</Button>
                    </Col>
                    <Col align="right" ><ReactHTMLTableToExcel
                      id="test-table-xls-button"
                      className="download-table-xls-button btn mb-3 text-dark bg-white"
                      table="table-to-xls3"
                      filename="Assets_Remaining"
                      sheet="Assets_Remaining"
                      buttonText="Export to Excel" />
                    </Col>
                  </Row>
                </CardContent>
              </Card>
              {
                showResults3 ?
                  <TableContainer component={Paper} className='pt-1'>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table" id="table-to-xls3">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell align="left" sx={{ minWidth: 110 }}>
                            Asset ID
                          </StyledTableCell>
                          <StyledTableCell align="left" sx={{ minWidth: 150 }}>Assets Code</StyledTableCell>
                          <StyledTableCell align="left">ชื่อทรัพย์สิน</StyledTableCell>
                          <StyledTableCell align="center" sx={{ minWidth: 110 }}>รอบที่บันทึก</StyledTableCell>
                          <StyledTableCell align="center" >สาขา</StyledTableCell>
                          <StyledTableCell align="center" sx={{ minWidth: 90 }}>ผู้ตรวจนับ</StyledTableCell>
                          <StyledTableCell align="center" sx={{ minWidth: 90 }}>อ้างอิง</StyledTableCell>
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
                          </StyledTableRow>
                        ))}
                        <StyledTableRow >
                          <StyledTableCell component="th" scope="row" align="left" >
                            <b>รวมทั้งหมด</b>
                          </StyledTableCell>
                          <StyledTableCell align="left" ></StyledTableCell>
                          <StyledTableCell align="left" ></StyledTableCell>
                          <StyledTableCell align="center" ></StyledTableCell>
                          <StyledTableCell align="center" ></StyledTableCell>
                          <StyledTableCell align="center" ><b>{AssetsAllCount}</b></StyledTableCell>
                          <StyledTableCell align="center" ><b>รายการ</b></StyledTableCell>
                        </StyledTableRow>
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
