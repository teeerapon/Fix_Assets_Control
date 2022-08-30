import * as React from 'react';
import Typography from '@mui/material/Typography';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { Outlet } from "react-router";
import { styled } from '@mui/material/styles';

const steps = ['กรอกข้อมูล', 'ตรวจสอบข้อมูล', 'เสร็จสิ้น'];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export default function AddressForm() {
  const [activeStep] = React.useState(3);
  const period_round = JSON.parse(localStorage.getItem('period_round'));
  console.log(period_round);

  return (
    <>
      <Typography component="h1" variant="h4" align="center">
        <b>PURE THAI ENERGY CO.,LTD.</b>
      </Typography>
      <Typography component="h1" variant="h6" align="center" className='pt-2'>
        บันทึกข้อมูลเสร็จสิ้น
      </Typography>
      <center>
        <Stepper activeStep={activeStep} sx={{ pt: 5, pb: 5 }} className="col-md-10">
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </center>
      <React.Fragment>
        <Typography variant="h5" gutterBottom sx={{pl:2}}>
          สร้างรอบบันทึกใหม่เสร็จสิ้น
        </Typography>
        <Typography variant="subtitle1" sx={{pl:2, mt:2}}>
          รายละเอียด
        </Typography>
        <TableContainer component={Paper} sx={{pl:1,pr:1,mb:2, mt: 2}}>
          <Table aria-label="customized table">
            <TableBody>
              <StyledTableCell align="left" sx={{ width: 200 }}>ผู้สร้างรายการ</StyledTableCell>
              <StyledTableCell align="left" sx={{ width: 50 }}>:</StyledTableCell>
              <StyledTableCell align="left" sx={{ width: 250 }}>{period_round.create_by}</StyledTableCell>
            </TableBody>
            <TableBody>
              <StyledTableCell align="left" sx={{ width: 200 }}>หัวข้อการทำรายการ</StyledTableCell>
              <StyledTableCell align="left" sx={{ width: 50 }}>:</StyledTableCell>
              <StyledTableCell align="left" sx={{ width: 250 }}>{period_round.Description}</StyledTableCell>
            </TableBody>
            <TableBody>
              <StyledTableCell align="left" sx={{ width: 200 }}>เลขที่รอบบันทึกที่สร้าง</StyledTableCell>
              <StyledTableCell align="left" sx={{ width: 50 }}>:</StyledTableCell>
              <StyledTableCell align="left" sx={{ width: 250 }}>รอบที่ {period_round.PeriodID}</StyledTableCell>
            </TableBody>
            <TableBody>
              <StyledTableCell align="left" sx={{ width: 200 }}>วันที่และเวลาเริ่มต้น</StyledTableCell>
              <StyledTableCell align="left" sx={{ width: 50 }}>:</StyledTableCell>
              <StyledTableCell align="left" sx={{ width: 250 }}>{period_round.BeginDate.split('T')[0]} ( 00:00 )</StyledTableCell>
            </TableBody>
            <TableBody>
              <StyledTableCell align="left" sx={{ width: 200 }}>วันที่และเวลาสิ้นสุด</StyledTableCell>
              <StyledTableCell align="left" sx={{ width: 50 }}>:</StyledTableCell>
              <StyledTableCell align="left" sx={{ width: 250 }}>{period_round.EndDate.split('T')[0]} ( 23:59 )</StyledTableCell>
            </TableBody>
          </Table>
        </TableContainer>
      </React.Fragment>
      <Outlet />
    </>
  );
}