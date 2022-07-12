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

async function DeletePeriodData(credentials) {
    return fetch('http://similan.1:32001/api/delete_period', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
  }

export default function ReadOnly({ periodData, handleEditClick}) {
    const [open, setOpen] = React.useState(false);
    const BeginDate = (periodData.BeginDate).split('T')[0] + ' ' + (periodData.BeginDate).split('T')[1].split('Z')[0].split('.')[0]
    const EndDate = (periodData.EndDate).split('T')[0] + ' ' + (periodData.EndDate).split('T')[1].split('Z')[0].split('.')[0]
    const PeriodID = periodData.PeriodID;
    const BranchID = periodData.BranchID;

    const handleClickOpen = (event, open) => {
        setOpen(true);
      };
    
      const handleClose = (event, open) => {
        setOpen(false);
      };

      const handleSubmit = async e => {
        handleClose()
        e.preventDefault();
        const response = await DeletePeriodData({
          PeriodID,
          BranchID,
        });
        if (response.message !== 'ไม่สามารถลบได้ เนื่องจากมีการตรวจนับทรัพย์สิน') {
          swal("ทำรายการสำเร็จ", response.message, "success", {
            buttons: false,
            timer: 2000,
          })
            .then((value) => {
              window.location.href = "/EditPeriod";
            });
        } else {
          swal("ทำรายการไม่สำเร็จ", response.message, "error")
          .then((value) => {
            window.location.href = "/EditPeriod";
          });
        }
      }

    return (
        <StyledTableRow key={periodData.PeriodID}>
            <StyledTableCell component="th" scope="row" align="center">
                {periodData.PeriodID}
            </StyledTableCell>
            <StyledTableCell align="center" >{BeginDate.split(':')[0] +':'+ BeginDate.split(':')[1]}</StyledTableCell>
            <StyledTableCell align="center" >{EndDate.split(':')[0] +':'+ EndDate.split(':')[1]}</StyledTableCell>
            <StyledTableCell align="center" >{periodData.Description}</StyledTableCell>
            <StyledTableCell align="center" >{(periodData.BranchID === 0 || periodData.BranchID === '0') ? 'ทุกสาขา' : periodData.BranchID}</StyledTableCell>
            <StyledTableCell align="center" >
                <Grid container rowSpacing={1}>
                    <Grid item xs={6}>
                        <Button variant="contained" color="warning" onClick={(event) => handleEditClick(event, periodData)}>แก้ไข</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained" color="error" onClick={handleClickOpen}>ลบ</Button>
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
                                    ท่านแน่ใจที่จะลบรอบตรวจนับทรัพย์สินรอบที่ {periodData.PeriodID} ใช่หรือไม่ 
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button variant="contained" onClick={handleSubmit}>ใช่</Button>
                                <Button variant="contained" color='error' onClick={handleClose} autoFocus>
                                    ไม่
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Grid>
                </Grid>
            </StyledTableCell>
        </StyledTableRow>
    );
}