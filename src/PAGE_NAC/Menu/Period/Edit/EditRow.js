import * as React from 'react';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import 'reactjs-popup/dist/index.css';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import swal from 'sweetalert';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';

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

async function EditPeriodData(credentials) {
  return fetch('http://vpnptec.dyndns.org:32001/api/update_period', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

export default function EditPeriod({ editFormData, handleEditClickCancel }) {

  // ใช้สำหรับสร้างเวลาปัจจุบัน
  const d = new Date();
  const year = (d.getFullYear()).toString();
  const month = ((d.getMonth()) + 101).toString().slice(-2);
  const date = ((d.getDate()) + 100).toString().slice(-2);
  const hours = ((d.getHours()) + 100).toString().slice(-2);
  const mins = ((d.getMinutes()) + 100).toString().slice(-2);
  const seconds = ((d.getSeconds()) + 100).toString().slice(-2);
  const datenow = `${year}-${month}-${date}T${hours}:${mins}:${seconds}.000Z`;

  const [PeriodID] = React.useState(editFormData.PeriodID);
  const [BeginDate, setBeginDate] = React.useState(editFormData.BeginDate);
  const [EndDate, setEndDate] = React.useState(editFormData.EndDate);
  const [Description] = React.useState(editFormData.Description);
  const [BranchID] = React.useState(editFormData.BranchID);
  // const TimeZoneEndDate = moment.tz(EndDate, "Asia/Thailand").format();

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await EditPeriodData({
      PeriodID,
      BeginDate,
      EndDate,
      Description,
      BranchID,
    });
    if (response.message !== 'ไม่สามารถแก้ไขได้ เนื่องจากมีการตรวจนับทรัพย์สิน') {
      if (response['data'] !== 'มีการเปิดช่วงเวลาทับกัน') {
        swal("ทำรายการสำเร็จ", response.message, "success", {
          buttons: false,
          timer: 2000,
        })
          .then((value) => {
            window.location.href = "/EditPeriod";
          });
      } else {
        swal("ทำรายการไม่สำเร็จ", response['data'], "error")
          .then((value) => {
            window.location.href = "/EditPeriod";
          });
      }
    } else {
      swal("ทำรายการไม่สำเร็จ", response.message, "error")
        .then((value) => {
          window.location.href = "/EditPeriod";
        });
    }
  }

  const handleChangeBeginDate = (newValue) => {
    setBeginDate(newValue);
  };

  const handleChangeEndDate = (newValue) => {
    setEndDate(newValue);
  };

  return (
    <StyledTableRow >
      <StyledTableCell align="left">
        <LocalizationProvider dateAdapter={DateAdapter}>
          <DatePicker
            value={BeginDate}
            onChange={handleChangeBeginDate}
            inputFormat="yyyy-MM-dd 00:00:00"
            renderInput={(params) =>
              <TextField
                fullWidth
                focused
                name="BeginDate"
                color='warning'
                autoComplete="family-name"
                variant="standard"
                {...params} />}
          />
        </LocalizationProvider>
      </StyledTableCell>
      <StyledTableCell align="left">
        <LocalizationProvider dateAdapter={DateAdapter}>
          <DatePicker
            value={EndDate}
            onChange={handleChangeEndDate}
            inputFormat="yyyy-MM-dd 23:59:59"
            renderInput={(params) =>
              <TextField
                fullWidth
                focused
                name="EndDate"
                color='warning'
                autoComplete="family-name"
                variant="standard"
                {...params} />}
          />
        </LocalizationProvider>
      </StyledTableCell>
      <StyledTableCell align="left" >
        <Typography focused color="inherit" variant="body2" name="Description" >
          {Description}
        </Typography>
      </StyledTableCell>
      <StyledTableCell align="center" >
        <Typography focused color="inherit" variant="body2" name="BranchID" >
          {(BranchID === 0 || BranchID === '0') ? 'ทุกสาขา' : BranchID}
        </Typography>
      </StyledTableCell>
      <StyledTableCell align="left" >
        <Typography focused style={{'color': datenow >= BeginDate && datenow <=EndDate ? 'green' : 'red' }} name="Datetime" variant="body2" >
          {datenow >= BeginDate && datenow <=EndDate ? 'อยู่ระหว่างเปิดใช้งาน' : 'ปิดการใช้งานแล้ว' }
        </Typography>
      </StyledTableCell>
      <StyledTableCell align="center" >
        <Grid container rowSpacing={1}>
          <Grid item xs={6}>
            <Button variant="contained" color="success" onClick={handleSubmit}>ยืนยัน</Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" color="error" onClick={handleEditClickCancel}>ยกเลิก</Button>
          </Grid>
        </Grid>
      </StyledTableCell>
    </StyledTableRow>
  );
}
