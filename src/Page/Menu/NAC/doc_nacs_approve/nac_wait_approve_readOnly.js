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

export default function ReadOnly({ selectNAC, handleEditClick }) {

  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState();
  const data = JSON.parse(localStorage.getItem('data'));

  const handleClickOpen = (event, open) => {
    setOpen(true);
  };

  const handleClose = (event, open) => {
    setOpen(false);
  };

  const handleChackStatus = () => {
    if (selectNAC.nac_status === 1) {
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

  return (
    <StyledTableRow key={selectNAC.nac_code}>
      <StyledTableCell component="th" scope="row" align="center">
        {selectNAC.nac_code}
      </StyledTableCell>
      <StyledTableCell align="left">{selectNAC.name}</StyledTableCell>
      <StyledTableCell align="center">{selectNAC.create_by}</StyledTableCell>
      <StyledTableCell align="center" >{selectNAC.source_userid}</StyledTableCell>
      <StyledTableCell
        align="center"
        style={{ 'color': selectNAC.des_userid === data.UserCode ? 'blue' : 'black' }}>
        {!selectNAC.des_userid ? 'ไม่มี' : selectNAC.des_userid}
      </StyledTableCell>
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
        <React.Fragment>
          <Button
            variant="contained"
            color="warning"
            onClick={(event) => handleEditClick(event, selectNAC)}
            sx={{ width: 100 }}>
            ดู
          </Button>
        </React.Fragment>
      </StyledTableCell >
    </StyledTableRow >
  );
}