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
import Container from '@mui/material/Container';


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
  const [showResults, setShowResults] = React.useState(false)
  const [showResults2, setShowResults2] = React.useState(false)
  const [showResults3, setShowResults3] = React.useState(false)
  const [showResultsAll, setShowResultsAll] = React.useState(false)
  const [sumArray_assets, setSumArray_assets] = React.useState()
  const [forcheckAssetCount, setForcheckAssetCount] = React.useState()
  const [forcheckAssetWrong, setForcheckAssetWrong] = React.useState()
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

  const sum_Array = () => {
    //setSumArray_assets([AssetsAll,aseetsCounted,assetsWrong])
    const sum_assets = []
    const forCheckAsset = []
    const forcheckAssetWrong = []
    aseetsCounted.map((res) => {
      return sum_assets.unshift(res) && forCheckAsset.unshift(res.Code);
    })
    assetsWrong.map((res) => {
      return sum_assets.unshift(res) && forcheckAssetWrong.unshift(res.Code);
    })
    AssetsAll.map((res) => {
      return sum_assets.unshift(res);
    })
    setSumArray_assets(sum_assets.reverse())
    setForcheckAssetCount(forCheckAsset)
    setForcheckAssetWrong(forcheckAssetWrong)
  }

  React.useEffect(() => {
    sum_Array();
  }, []);

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
              รายการการตรวจนับทรัพย์สินทั้งหมดของสาขาที่ {!aseetsCounted[0].BranchID ? AssetsAll[0].BranchID : aseetsCounted[0].BranchID}
            </Typography>
          </AnimatedPage>
        </Toolbar>
      </AppBar>
      <AnimatedPage>
        <Container maxWidth="1000px">
          <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Card style={{ height: '4rem', background: 'linear-gradient(45deg, #0226d8 30%, #a602d8 90%)' }} className="block-example text-white">
              <CardContent>
                <Row>
                  <Col className='col-md-8'><h3 align="left">รายการทั้งหมด ({!sumArray_assets ? 'Loading...' : sumArray_assets.length})</h3></Col>
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
                      <StyledTableCell align="center" sx={{ width: 100 }}>
                        ลำดับ
                      </StyledTableCell>
                      <StyledTableCell align="left" sx={{ width: 200 }}>รหัสทรัพย์สิน</StyledTableCell>
                      <StyledTableCell align="left" sx={{ minWidth: 100 }}>ชื่อทรัพย์สิน</StyledTableCell>
                      <StyledTableCell align="center" sx={{ width: 150 }}>วันที่ตรวจนับ</StyledTableCell>

                      <StyledTableCell align="center" sx={{ width: 100 }}>สาขา</StyledTableCell>
                      <StyledTableCell align="center" sx={{ width: 100 }}>ผู้ตรวจนับ</StyledTableCell>
                      <StyledTableCell align="center" sx={{ width: 200 }}>สถานะรายการ</StyledTableCell>
                      <StyledTableCell align="center" sx={{ width: 150 }}>หมายเหตุ</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sumArray_assets.map((sumArray_assets, index) => (
                      <StyledTableRow key={sumArray_assets.Code}>
                        <StyledTableCell component="th" scope="row" align="center">
                          {index + 1}
                        </StyledTableCell>
                        <StyledTableCell align="left" >{sumArray_assets.Code}</StyledTableCell>
                        <StyledTableCell align="left" >{sumArray_assets.Name}</StyledTableCell>
                        <StyledTableCell align="center" >{sumArray_assets.Date.split('T')[0]}</StyledTableCell>
                        <StyledTableCell align="center" >{sumArray_assets.BranchID}</StyledTableCell>
                        <StyledTableCell align="center" >{sumArray_assets.UserID}</StyledTableCell>
                        <StyledTableCell align="center" >{sumArray_assets.Reference}</StyledTableCell>
                        <StyledTableCell align="center" style={{
                          'backgroundColor': forcheckAssetCount.includes(sumArray_assets.Code) === true ? 'green' :
                            forcheckAssetWrong.includes(sumArray_assets.Code) === true ? 'orange' : 'red'
                          , 'color': 'white'
                        }}>
                          {
                            forcheckAssetCount.includes(sumArray_assets.Code) === true ? 'รายการนับแล้ว' :
                              forcheckAssetWrong.includes(sumArray_assets.Code) === true ? 'สาขาอื่น' : 'ยังไม่ได้นับ'
                          }
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                    <StyledTableRow>
                      <StyledTableCell component="th" scope="row" align="left" ></StyledTableCell>
                      <StyledTableCell align="center" ></StyledTableCell>
                      <StyledTableCell align="center" ></StyledTableCell>
                      <StyledTableCell align="center" ></StyledTableCell>
                      <StyledTableCell align="center" ></StyledTableCell>
                      <StyledTableCell align="center" ></StyledTableCell>
                      <StyledTableCell align="center" ><b>{!forcheckAssetCount ? 'Loading...' : forcheckAssetCount.length}</b></StyledTableCell>
                      <StyledTableCell align="center" ><b>รายการ</b></StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <StyledTableCell component="th" scope="row" align="left" ></StyledTableCell>
                      <StyledTableCell align="center" ></StyledTableCell>
                      <StyledTableCell align="center" ></StyledTableCell>
                      <StyledTableCell align="center" ></StyledTableCell>
                      <StyledTableCell align="center" ></StyledTableCell>
                      <StyledTableCell align="center" ></StyledTableCell>
                      <StyledTableCell align="center" ><b>{!forcheckAssetWrong ? 'Loading...' : forcheckAssetWrong.length}</b></StyledTableCell>
                      <StyledTableCell align="center" ><b>รายการ</b></StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <StyledTableCell component="th" scope="row" align="left" ></StyledTableCell>
                      <StyledTableCell align="center" ></StyledTableCell>
                      <StyledTableCell align="center" ></StyledTableCell>
                      <StyledTableCell align="center" ></StyledTableCell>
                      <StyledTableCell align="center" ></StyledTableCell>
                      <StyledTableCell align="center" ></StyledTableCell>
                      <StyledTableCell align="center" ><b>{!sumArray_assets ? 'Loading...' : (sumArray_assets.length - (forcheckAssetWrong.length + forcheckAssetCount.length))}</b></StyledTableCell>
                      <StyledTableCell align="center" ><b>รายการ</b></StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <StyledTableCell component="th" scope="row" align="left" > </StyledTableCell>
                      <StyledTableCell align="center" ></StyledTableCell>
                      <StyledTableCell align="center" ></StyledTableCell>
                      <StyledTableCell align="center" ></StyledTableCell>
                      <StyledTableCell align="center" ></StyledTableCell>
                      <StyledTableCell align="center" ></StyledTableCell>
                      <StyledTableCell align="center" ><b>{!sumArray_assets ? 'Loading...' : sumArray_assets.length}</b></StyledTableCell>
                      <StyledTableCell align="center" ><b>รายการ</b></StyledTableCell>
                    </StyledTableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              : null
            }
            <Card sx={{ my: { md: 1 } }} style={{ height: '4rem', background: 'linear-gradient(45deg, #5cb85c 30%, #e5ff00 90%)' }} className="block-example text-white">
              <CardContent>
                <Row>
                  <Col className='col-md-8'><h3 align="left">รายการนับแล้ว ({aseetsCounted_Count})</h3></Col>
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
                      <StyledTableCell align="center" sx={{ width: 100 }}>
                        ลำดับ
                      </StyledTableCell>
                      <StyledTableCell align="left" sx={{ width: 200 }}>รหัสทรัพย์สิน</StyledTableCell>
                      <StyledTableCell align="left" sx={{ minWidth: 100 }}>ชื่อทรัพย์สิน</StyledTableCell>
                      <StyledTableCell align="center" sx={{ width: 150 }}>วันที่ตรวจนับ</StyledTableCell>

                      <StyledTableCell align="center" sx={{ width: 100 }}>สาขา</StyledTableCell>
                      <StyledTableCell align="center" sx={{ width: 100 }}>ผู้ตรวจนับ</StyledTableCell>
                      <StyledTableCell align="center" sx={{ width: 200 }}>สถานะรายการ</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {aseetsCounted.map((aseetsCounted, index) => (
                      <StyledTableRow key={aseetsCounted.Code}>
                        <StyledTableCell component="th" scope="row" align="center">
                          {index + 1}
                        </StyledTableCell>
                        <StyledTableCell align="left" >{aseetsCounted.Code}</StyledTableCell>
                        <StyledTableCell align="left" >{aseetsCounted.Name}</StyledTableCell>
                        <StyledTableCell align="center" >{aseetsCounted.Date.split('T')[0]}</StyledTableCell>

                        <StyledTableCell align="center" >{aseetsCounted.BranchID}</StyledTableCell>
                        <StyledTableCell align="center" >{aseetsCounted.UserID}</StyledTableCell>
                        <StyledTableCell align="center" >{aseetsCounted.Reference}</StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              : null}
            <Card sx={{ my: { md: 1 } }} style={{ height: '4rem', background: 'linear-gradient(45deg, #0d2840 30%, #184c7a 90%)' }} className='block-example text-white'>
              <CardContent>
                <Row>
                  <Col className='col-md-8'><h3 align="left">รายการคงเหลือ ({AssetsAllCount})</h3></Col>
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
                        <StyledTableCell align="center" sx={{ width: 100 }}>
                          ลำดับ
                        </StyledTableCell>
                        <StyledTableCell align="left" sx={{ width: 200 }}>รหัสทรัพย์สิน</StyledTableCell>
                        <StyledTableCell align="left" sx={{ minWidth: 100 }}>ชื่อทรัพย์สิน</StyledTableCell>
                        <StyledTableCell align="center" sx={{ width: 150 }}>วันที่ตรวจนับ</StyledTableCell>

                        <StyledTableCell align="center" sx={{ width: 100 }}>สาขา</StyledTableCell>
                        <StyledTableCell align="center" sx={{ width: 100 }}>ผู้ตรวจนับ</StyledTableCell>
                        <StyledTableCell align="center" sx={{ width: 200 }}>สถานะรายการ</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {AssetsAll.map((AssetsAll, index) => (
                        <StyledTableRow key={AssetsAll.Code}>
                          <StyledTableCell component="th" scope="row" align="center" >
                            {index + 1}
                          </StyledTableCell>
                          <StyledTableCell align="left" >{AssetsAll.Code}</StyledTableCell>
                          <StyledTableCell align="left" >{AssetsAll.Name}</StyledTableCell>
                          <StyledTableCell align="center" >{AssetsAll.Date.split('T')[0]}</StyledTableCell>

                          <StyledTableCell align="center" >{AssetsAll.BranchID}</StyledTableCell>
                          <StyledTableCell align="center" >{AssetsAll.UserID}</StyledTableCell>
                          <StyledTableCell align="center" >{AssetsAll.Reference}</StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                : null
            }
            <Card sx={{ my: { md: 1 } }} style={{ height: '4rem', background: 'linear-gradient(45deg, #e8241e 30%, #FF8E53 90%)' }} className='block-example text-white'>
              <CardContent>
                <Row>
                  <Col className='col-md-8'><h3 align="left">สาขาอื่น ๆ ({assetsWrongCount})</h3></Col>
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
                        <StyledTableCell align="center" sx={{ width: 100 }}>
                          ลำดับ
                        </StyledTableCell>
                        <StyledTableCell align="left" sx={{ width: 200 }}>รหัสทรัพย์สิน</StyledTableCell>
                        <StyledTableCell align="left" sx={{ minWidth: 100 }}>ชื่อทรัพย์สิน</StyledTableCell>
                        <StyledTableCell align="center" sx={{ width: 150 }}>วันที่ตรวจนับ</StyledTableCell>

                        <StyledTableCell align="center" sx={{ width: 100 }}>สาขา</StyledTableCell>
                        <StyledTableCell align="center" sx={{ width: 100 }}>ผู้ตรวจนับ</StyledTableCell>
                        <StyledTableCell align="center" sx={{ width: 200 }}>สถานะรายการ</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {assetsWrong.map((assetsWrong, index) => (
                        <StyledTableRow key={assetsWrong.Code}>
                          <StyledTableCell component="th" scope="row" align="center" >
                            {index + 1}
                          </StyledTableCell>
                          <StyledTableCell align="left" >{assetsWrong.Code}</StyledTableCell>
                          <StyledTableCell align="left" >{assetsWrong.Name}</StyledTableCell>
                          <StyledTableCell align="center" >{assetsWrong.Date.split('T')[0]}</StyledTableCell>
                          <StyledTableCell align="center" >{assetsWrong.BranchID}</StyledTableCell>
                          <StyledTableCell align="center" >{assetsWrong.UserID}</StyledTableCell>
                          <StyledTableCell align="center" >{assetsWrong.Reference}</StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                : null
            }
          </Paper>
        </Container>
      </AnimatedPage>
      <div className='pt-3'></div>
      <Outlet />
    </div>
  );
}
