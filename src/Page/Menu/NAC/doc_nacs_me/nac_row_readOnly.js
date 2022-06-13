import * as React from 'react';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import 'reactjs-popup/dist/index.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import swal from 'sweetalert';
import { Outlet, useNavigate } from "react-router";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

async function store_FA_control_drop_NAC(credentials) {
  return fetch('http://192.168.220.1:32001/api/store_FA_control_drop_NAC', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

export default function ReadOnly({ selectNAC, handleEditClick }) {

  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState();
  const data = JSON.parse(localStorage.getItem('data'));
  const navigate = useNavigate();

  const handleClickOpen = (event, open) => {
    setOpen(true);
  };

  const handleClose = (event, open) => {
    setOpen(false);
  };

  const handleChackStatus = () => {
    if (selectNAC.nac_status == 1) {
      setStatus('รอยื่นคำร้อง')
    } else if (selectNAC.nac_status === 2) {
      setStatus('รอตรวจสอบ')
    } else if (selectNAC.nac_status === 3) {
      setStatus('รออนุมัติ')
    } else if (selectNAC.nac_status === 4) {
      setStatus('ผ่านการอนุมัติ')
    } else if (selectNAC.nac_status === 5) {
      setStatus('ดำเนินการเสร็จสิ้น')
    } else if (selectNAC.nac_status === 0) {
      setStatus('ไม่ผ่านการอนุมัติ')
    }
  };

  React.useEffect(() => {
    handleChackStatus();
  }, []);

  const handleDrop_NAC = async (event) => {
    event.preventDefault();
    const usercode = data.UserCode
    const nac_code = event.target.getAttribute("name")
    const response = await store_FA_control_drop_NAC({
      usercode,
      nac_code,
    });
    if ('data' in response) {
      swal("ทำรายการสำเร็จ", 'ทำการลบรายการ ' + response.data[0].nac_code + ' แล้ว', "success", {
        buttons: false,
        timer: 2000,
      }).then((value) => {
        window.location.href = "/NAC_ROW";
      });
    } else {
      swal("ทำรายการไม่สำเร็จ", 'ไม่สามารถลบ ' + response.data[0].nac_code + ' ได้', "error")
    }
    setOpen(false);
  }

  return (
    <StyledTableRow key={selectNAC.nac_code}>
      <StyledTableCell component="th" scope="row" align="center">
        {selectNAC.nac_code}
      </StyledTableCell>
      <StyledTableCell align="left" >{selectNAC.name}</StyledTableCell>
      <StyledTableCell align="center" >{selectNAC.create_by}</StyledTableCell>
      <StyledTableCell align="center" >{selectNAC.source_userid}</StyledTableCell>
      <StyledTableCell align="center" >{!selectNAC.des_userid ? 'ไม่มี' : selectNAC.des_userid}</StyledTableCell>
      <StyledTableCell
        align="center"
        style={{
          'color': status === 'รอยื่นคำร้อง' ?
            'black' : status === 'รอตรวจสอบ' ?
              'blue' : status === 'รออนุมัติ' ?
                'orange' : status === 'ผ่านการอนุมัติ' ?
                  'green' : status === 'ดำเนินการเสร็จสิ้น' ?
                    'black' : 'red'
        }}>
        {status}
      </StyledTableCell>
      <StyledTableCell align="center" >
        <Grid container rowSpacing={1}>
          <React.Fragment>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="warning"
                onClick={(event) => handleEditClick(event, selectNAC)}
                sx={{ width: 100 }}>
                ดู
              </Button>
            </Grid>
          </React.Fragment>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="error"
              disabled={(selectNAC.nac_status > 1 || selectNAC.nac_status === 0 ? true : false) ? true : false}
              onClick={handleClickOpen}
              sx={{ width: 100 }}>
              ลบ
            </Button>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"แจ้งเตือน"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  ท่านแน่ใจที่จะลบรายการ {selectNAC.nac_code} ใช่หรือไม่
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button variant="contained" name={selectNAC.nac_code} onClick={(event) => handleDrop_NAC(event)}>ใช่</Button>
                <Button variant="contained" color='error' onClick={handleClose} autoFocus>
                  ไม่
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
      </StyledTableCell >
    </StyledTableRow >

  );
}