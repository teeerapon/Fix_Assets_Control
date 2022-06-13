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
  return fetch('http://192.168.220.1:32001/api/update_period', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

export default function EditPeriod({ editFormData, handleEditClickCancel }) {

  const [PeriodID] = React.useState(editFormData.PeriodID);
  const [BeginDate, setBeginDate] = React.useState(editFormData.BeginDate);
  const [EndDate, setEndDate] = React.useState(editFormData.EndDate);
  const [Description, setDescription] = React.useState(editFormData.Description);
  const [BranchID, setBranchID] = React.useState(editFormData.BranchID);
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
    if (response.message != 'ไม่สามารถแก้ไขได้ เนื่องจากมีการตรวจนับทรัพย์สิน') {
      if (response['data'] != 'มีการเปิดช่วงเวลาทับกัน') {
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

  const handleChangeDescription = (event) => {
    event.preventDefault();
    setDescription(event.target.value);
  };

  const handleChangeBranchID = (event) => {
    event.preventDefault();
    setBranchID(event.target.value);
  };

  return (
    <StyledTableRow >
      <StyledTableCell component="th" scope="row" align="center">
        <Typography color="inherit" name="PeriodID" noWrap>
          {PeriodID}
        </Typography>
      </StyledTableCell>
      <StyledTableCell align="center">
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
      <StyledTableCell align="center">
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
      <StyledTableCell align="center" >
        <Typography focused color="inherit" name="Description" noWrap>
          {Description}
        </Typography>
      </StyledTableCell>
      <StyledTableCell align="center" >
        <Typography focused color="inherit" name="BranchID" noWrap>
          {BranchID == 0 ? 'ทุกสาขา' : BranchID}
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
