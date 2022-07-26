import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import AnimatedPage from "../../../AnimatedPage.jsx";
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import { Outlet, useNavigate } from "react-router";
import Container from '@mui/material/Container';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';


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

const StyledTableRow2 = styled(TableRow)(({ theme }) => ({
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function MenuAppBar() {
  const AssetsAll = JSON.parse(localStorage.getItem('Allaseets'));
  const aseetsCounted = JSON.parse(localStorage.getItem('aseetsCounted'));
  const assetsWrong = JSON.parse(localStorage.getItem('assetsWrong'));
  const aseetsCounted_Count = aseetsCounted.length
  const AssetsAllCount = AssetsAll.length
  const assetsWrongCount = assetsWrong.length
  const [sumArray_assets, setSumArray_assets] = React.useState()
  const [forcheckAssetCount, setForcheckAssetCount] = React.useState()
  const [forcheckAssetWrong, setForcheckAssetWrong] = React.useState()
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);

  if (!AssetsAll || !aseetsCounted || !assetsWrong) {
    navigate("/Report")
  }

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

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
              รายการการตรวจนับทรัพย์สินทั้งหมดของสาขาที่ {/*{!aseetsCounted[0].BranchID ? AssetsAll[0].BranchID : aseetsCounted[0].BranchID} */}
            </Typography>
          </AnimatedPage>
        </Toolbar>
      </AppBar>
      <AnimatedPage>
        <Container maxWidth="1000px">
          <Box sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label={'รายการทั้งหมด (' + (!aseetsCounted_Count ? '' : (aseetsCounted_Count + assetsWrongCount + AssetsAllCount) + ')')} {...a11yProps(0)} />
                <Tab label={'รายการนับแล้ว (' + (!aseetsCounted_Count ? '' : aseetsCounted_Count) + ')'} {...a11yProps(1)} />
                <Tab label={'สาขาอื่น ๆ (' + (!assetsWrongCount ? '' : assetsWrongCount) + ')'} {...a11yProps(2)} />
                <Tab label={'รายการคงเหลิอ (' + (!sumArray_assets ? '' : (sumArray_assets.length - (forcheckAssetWrong.length + forcheckAssetCount.length))) + ')'} {...a11yProps(3)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <ReactHTMLTableToExcel
                id="test-table-xls-button"
                table="table-to-xls1"
                className="download-table-xls-button btn btn-success mb-3"
                filename="AssetsAllReported"
                sheet="AssetsAllReported"
                buttonText="Export to Excel (รายการทั้งหมด)" />
              <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 } }}>
                <TableContainer component={Paper} className='pt-1'>
                  <Table sx={{ minWidth: 700 }} aria-label="customized table" id="table-to-xls1">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align="center" style={{ 'maxWidth': 'fit-content' }}>
                          ลำดับ
                        </StyledTableCell>
                        <StyledTableCell align="left" style={{ 'maxWidth': 'fit-content' }}>รหัสทรัพย์สิน</StyledTableCell>
                        <StyledTableCell align="left" style={{ 'maxWidth': 'fit-content' }}>ชื่อทรัพย์สิน</StyledTableCell>
                        <StyledTableCell align="center" style={{ 'maxWidth': 'fit-content' }}>วันที่ตรวจนับ</StyledTableCell>

                        <StyledTableCell align="center" style={{ 'maxWidth': 'fit-content' }}>สาขา</StyledTableCell>
                        <StyledTableCell align="center" style={{ 'maxWidth': 'fit-content' }}>ผู้ตรวจนับ</StyledTableCell>
                        <StyledTableCell align="left" style={{ 'maxWidth': 'fit-content' }}>สถานะล่าสุด</StyledTableCell>
                        <StyledTableCell align="left" style={{ 'maxWidth': 'fit-content' }}>สถานะครั้งนี้</StyledTableCell>
                        <StyledTableCell align="center" style={{ 'maxWidth': 'fit-content' }}>หมายเหตุ</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {!sumArray_assets ? '' : sumArray_assets.map((sumArray_assets, index) => (
                        <StyledTableRow key={sumArray_assets.Code}>
                          <StyledTableCell component="th" scope="row" align="center">
                            {index + 1}
                          </StyledTableCell>
                          <StyledTableCell align="left" >{!sumArray_assets.Code ? 'none' : sumArray_assets.Code}</StyledTableCell>
                          <StyledTableCell align="left" >{!sumArray_assets.Name ? 'none' : sumArray_assets.Name}</StyledTableCell>
                          <StyledTableCell align="center" >{!sumArray_assets.Date ? 'none' : sumArray_assets.Date.split('T')[0]}</StyledTableCell>
                          <StyledTableCell align="center" >{!sumArray_assets.BranchID ? 'none' : sumArray_assets.BranchID}</StyledTableCell>
                          <StyledTableCell align="center" >{!sumArray_assets.UserID ? 'none' : sumArray_assets.UserID}</StyledTableCell>
                          <StyledTableCell align="left" >{!sumArray_assets.detail ? 'none' : sumArray_assets.detail}</StyledTableCell>
                          <StyledTableCell align="left" >{!sumArray_assets.Reference ? 'none' : sumArray_assets.Reference}</StyledTableCell>
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
                      <StyledTableRow2>
                        <StyledTableCell component="th" scope="row" align="center" ><b>รวม</b></StyledTableCell>
                        <StyledTableCell align="left" ><b>การรายที่นับแล้ว</b></StyledTableCell>
                        <StyledTableCell align="center" ></StyledTableCell>
                        <StyledTableCell align="center" ></StyledTableCell>
                        <StyledTableCell align="center" ></StyledTableCell>
                        <StyledTableCell align="center" ></StyledTableCell>
                        <StyledTableCell align="center" ><b>{!forcheckAssetCount ? 'Loading...' : forcheckAssetCount.length}</b></StyledTableCell>
                        <StyledTableCell align="center" ><b>รายการ</b></StyledTableCell>
                      </StyledTableRow2>
                      <StyledTableRow2>
                        <StyledTableCell component="th" scope="row" align="center" ><b>รวม</b></StyledTableCell>
                        <StyledTableCell align="left" ><b>รายการที่ไม่ได้อยู่ในสาขา</b></StyledTableCell>
                        <StyledTableCell align="center" ></StyledTableCell>
                        <StyledTableCell align="center" ></StyledTableCell>
                        <StyledTableCell align="center" ></StyledTableCell>
                        <StyledTableCell align="center" ></StyledTableCell>
                        <StyledTableCell align="center" ><b>{!forcheckAssetWrong ? 'Loading...' : forcheckAssetWrong.length}</b></StyledTableCell>
                        <StyledTableCell align="center" ><b>รายการ</b></StyledTableCell>
                      </StyledTableRow2>
                      <StyledTableRow2>
                        <StyledTableCell component="th" scope="row" align="center" ><b>รวม</b></StyledTableCell>
                        <StyledTableCell align="left" ><b>รายการคงเหลือ</b></StyledTableCell>
                        <StyledTableCell align="center" ></StyledTableCell>
                        <StyledTableCell align="center" ></StyledTableCell>
                        <StyledTableCell align="center" ></StyledTableCell>
                        <StyledTableCell align="center" ></StyledTableCell>
                        <StyledTableCell align="center" ><b>{!sumArray_assets ? 'Loading...' : (sumArray_assets.length - (forcheckAssetWrong.length + forcheckAssetCount.length))}</b></StyledTableCell>
                        <StyledTableCell align="center" ><b>รายการ</b></StyledTableCell>
                      </StyledTableRow2>
                      <StyledTableRow2>
                        <StyledTableCell component="th" scope="row" align="center" ><b>รวม</b></StyledTableCell>
                        <StyledTableCell align="left" ><b>รวมรายการทั้งหมด</b></StyledTableCell>
                        <StyledTableCell align="center" ></StyledTableCell>
                        <StyledTableCell align="center" ></StyledTableCell>
                        <StyledTableCell align="center" ></StyledTableCell>
                        <StyledTableCell align="center" ></StyledTableCell>
                        <StyledTableCell align="center" ><b>{!sumArray_assets ? 'Loading...' : sumArray_assets.length}</b></StyledTableCell>
                        <StyledTableCell align="center" ><b>รายการ</b></StyledTableCell>
                      </StyledTableRow2>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <ReactHTMLTableToExcel
                id="test-table-xls-button"
                className="download-table-xls-button btn btn-success mb-3"
                table="table-to-xls1"
                filename="Assets_Counted"
                sheet="Assets_Counted"
                buttonText="Export to Excel (รายการนับแล้ว)" />
              <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 } }}>
                <TableContainer component={Paper} className='pt-1'>
                  <Table sx={{ minWidth: 700 }} aria-label="customized table" id="table-to-xls1">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align="center" style={{ 'maxWidth': 'fit-content' }}>
                          ลำดับ
                        </StyledTableCell>
                        <StyledTableCell align="left" style={{ 'maxWidth': 'fit-content' }}>รหัสทรัพย์สิน</StyledTableCell>
                        <StyledTableCell align="left" style={{ 'maxWidth': 'fit-content' }}>ชื่อทรัพย์สิน</StyledTableCell>
                        <StyledTableCell align="center" style={{ 'maxWidth': 'fit-content' }}>วันที่ตรวจนับ</StyledTableCell>

                        <StyledTableCell align="center" style={{ 'maxWidth': 'fit-content' }}>สาขา</StyledTableCell>
                        <StyledTableCell align="center" style={{ 'maxWidth': 'fit-content' }}>ผู้ตรวจนับ</StyledTableCell>
                        <StyledTableCell align="left" style={{ 'maxWidth': 'fit-content' }}>สถานะล่าสุด</StyledTableCell>
                        <StyledTableCell align="left" style={{ 'maxWidth': 'fit-content' }}>สถานะครั้งนี้</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {aseetsCounted.map((aseetsCounted, index) => (
                        <StyledTableRow key={aseetsCounted.Code}>
                          <StyledTableCell component="th" scope="row" align="center">
                            {index + 1}
                          </StyledTableCell>
                          <StyledTableCell align="left" >{!aseetsCounted.Code ? 'none' : aseetsCounted.Code}</StyledTableCell>
                          <StyledTableCell align="left" >{!aseetsCounted.Name ? 'none' : aseetsCounted.Name}</StyledTableCell>
                          <StyledTableCell align="center" >{!aseetsCounted.Date ? 'none' : aseetsCounted.Date.split('T')[0]}</StyledTableCell>

                          <StyledTableCell align="center" >{!aseetsCounted.BranchID ? 'none' : aseetsCounted.BranchID}</StyledTableCell>
                          <StyledTableCell align="center" >{!aseetsCounted.UserID ? 'none' : aseetsCounted.UserID}</StyledTableCell>
                          <StyledTableCell align="left" >{!aseetsCounted.detail ? 'none' : aseetsCounted.detail}</StyledTableCell>
                          <StyledTableCell align="left" >{!aseetsCounted.Reference ? 'none' : aseetsCounted.Reference}</StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <ReactHTMLTableToExcel
                id="test-table-xls-button"
                className="download-table-xls-button btn btn-success mb-3"
                table="table-to-xls2"
                filename="Assets_Wrong"
                sheet="Assets_Wrong"
                buttonText="Export to Excel (สาขาอื่น ๆ)" />
              <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 } }}>
                <TableContainer component={Paper} className='pt-1'>
                  <Table sx={{ minWidth: 700 }} aria-label="customized table" id="table-to-xls2">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align="center" style={{ 'maxWidth': 'fit-content' }}>
                          ลำดับ
                        </StyledTableCell>
                        <StyledTableCell align="left" style={{ 'maxWidth': 'fit-content' }}>รหัสทรัพย์สิน</StyledTableCell>
                        <StyledTableCell align="left" style={{ 'maxWidth': 'fit-content' }}>ชื่อทรัพย์สิน</StyledTableCell>
                        <StyledTableCell align="center" style={{ 'maxWidth': 'fit-content' }}>วันที่ตรวจนับ</StyledTableCell>

                        <StyledTableCell align="center" style={{ 'maxWidth': 'fit-content' }}>สาขา</StyledTableCell>
                        <StyledTableCell align="center" style={{ 'maxWidth': 'fit-content' }}>ผู้ตรวจนับ</StyledTableCell>
                        <StyledTableCell align="left" style={{ 'maxWidth': 'fit-content' }}>สถานะล่าสุด</StyledTableCell>
                        <StyledTableCell align="left" style={{ 'maxWidth': 'fit-content' }}>สถานะครั้งนี้</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {assetsWrong.map((assetsWrong, index) => (
                        <StyledTableRow key={assetsWrong.Code}>
                          <StyledTableCell component="th" scope="row" align="center" >
                            {index + 1}
                          </StyledTableCell>
                          <StyledTableCell align="left" >{!assetsWrong.Code ? 'none' : assetsWrong.Code}</StyledTableCell>
                          <StyledTableCell align="left" >{!assetsWrong.Name ? 'none' : assetsWrong.Name}</StyledTableCell>
                          <StyledTableCell align="center" >{!assetsWrong.Date ? 'none' : assetsWrong.Date.split('T')[0]}</StyledTableCell>
                          <StyledTableCell align="center" >{!assetsWrong.BranchID ? 'none' : assetsWrong.BranchID}</StyledTableCell>
                          <StyledTableCell align="center" >{!assetsWrong.UserID ? 'none' : assetsWrong.UserID}</StyledTableCell>
                          <StyledTableCell align="left" >{!assetsWrong.detail ? 'none' : assetsWrong.detail}</StyledTableCell>
                          <StyledTableCell align="left" >{!assetsWrong.Reference ? 'none' : assetsWrong.Reference}</StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </TabPanel>
            <TabPanel value={value} index={3}>
              <ReactHTMLTableToExcel
                id="test-table-xls-button"
                className="download-table-xls-button btn btn-success mb-3"
                table="table-to-xls3"
                filename="Assets_Remaining"
                sheet="Assets_Remaining"
                buttonText="Export to Excel (รายการคงเหลือ)" />
              <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 } }}>
                <TableContainer component={Paper} className='pt-1'>
                  <Table sx={{ minWidth: 700 }} aria-label="customized table" id="table-to-xls3">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align="center" style={{ 'maxWidth': 'fit-content' }}>
                          ลำดับ
                        </StyledTableCell>
                        <StyledTableCell align="left" style={{ 'maxWidth': 'fit-content' }}>รหัสทรัพย์สิน</StyledTableCell>
                        <StyledTableCell align="left" style={{ 'maxWidth': 'fit-content' }}>ชื่อทรัพย์สิน</StyledTableCell>
                        <StyledTableCell align="center" style={{ 'maxWidth': 'fit-content' }}>วันที่ตรวจนับ</StyledTableCell>

                        <StyledTableCell align="center" style={{ 'maxWidth': 'fit-content' }}>สาขา</StyledTableCell>
                        <StyledTableCell align="center" style={{ 'maxWidth': 'fit-content' }}>ผู้ตรวจนับ</StyledTableCell>
                        <StyledTableCell align="left" style={{ 'maxWidth': 'fit-content' }}>สถานะล่าสุด</StyledTableCell>
                        <StyledTableCell align="left" style={{ 'maxWidth': 'fit-content' }}>สถานะครั้งนี้</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {AssetsAll.map((AssetsAll, index) => (
                        <StyledTableRow key={AssetsAll.Code}>
                          <StyledTableCell component="th" scope="row" align="center" >
                            {index + 1}
                          </StyledTableCell>
                          <StyledTableCell align="left" >{!AssetsAll.Code ? 'none' : AssetsAll.Code}</StyledTableCell>
                          <StyledTableCell align="left" >{!AssetsAll.Name ? 'none' : AssetsAll.Name}</StyledTableCell>
                          <StyledTableCell align="center" >{!AssetsAll.Date ? 'none' : AssetsAll.Date.split('T')[0]}</StyledTableCell>

                          <StyledTableCell align="center" >{!AssetsAll.BranchID ? 'none' : AssetsAll.BranchID}</StyledTableCell>
                          <StyledTableCell align="center" >{!AssetsAll.UserID ? 'none' : AssetsAll.UserID}</StyledTableCell>
                          <StyledTableCell align="left" >{!AssetsAll.detail ? 'none' : AssetsAll.detail}</StyledTableCell>
                          <StyledTableCell align="left" >{!AssetsAll.Reference ? 'none' : AssetsAll.Reference}</StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </TabPanel>
          </Box>
        </Container>
      </AnimatedPage>
      <div className='pt-3'></div>
      <Outlet />
    </div>
  );
}
