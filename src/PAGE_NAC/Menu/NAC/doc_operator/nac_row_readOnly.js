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
import DeleteIcon from '@mui/icons-material/Delete';
import ArticleIcon from '@mui/icons-material/Article';
import Paper from '@mui/material/Paper';
// import Typography from '@mui/material/Typography';
// import { useNavigate } from "react-router";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(0.8),
  paddingTop: theme.spacing(0.5),
  paddingBottom: theme.spacing(0.5),
  textAlign: 'start',
  color: '#ffffff',
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
  return fetch('http://vpnptec.dyndns.org:32001/api/store_FA_control_drop_NAC', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

async function store_FA_control_execDocID(credentials) {
  return fetch('http://vpnptec.dyndns.org:32001/api/store_FA_control_execDocID', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

async function ChackUserWeb(credentials) {
  return fetch('http://vpnptec.dyndns.org:32001/api/ChackUserWeb', {
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
  const data = JSON.parse(localStorage.getItem('data'));
  const [CheckApprove, setCheckApprove] = React.useState([]);
  const [CheckExamineApprove, setCheckExamineApprove] = React.useState([]);
  const [checkUserWeb, setCheckUserWeb] = React.useState();
  // const navigate = useNavigate();

  const fetchCheckUser = async () => {
    const usercode = data.UserCode;
    const response = await ChackUserWeb({
      usercode
    });
    if ('data' in response) {
      setCheckUserWeb(response.data[0].approverid)
    }
  }

  React.useEffect(() => {
    fetchCheckUser();
    // 👇️ disable the rule for a single line

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickOpen = (event, open) => {
    setOpen(true);
  };

  const handleClose = (event, open) => {
    setOpen(false);
  };

  // const handlefechtAprrove = async () => {
  //   const user_source = selectNAC.source_userid
  //   const nac_code = selectNAC.nac_code
  //   const responseExecDocID = await store_FA_control_execDocID({
  //     user_source,
  //     nac_code,
  //   });

  //   const CheckApprove = []
  //   const CheckExamineApprove = []
  //   const price_approve = selectNAC.sum_price;

  //   for (let i = 0; i < (responseExecDocID.data.length); i++) {
  //     if (responseExecDocID.data[i].limitamount < price_approve && responseExecDocID.data[i].limitamount !== null && responseExecDocID.data[i].workflowlevel < 5) {
  //       CheckExamineApprove[i] = responseExecDocID.data[i].workflowlevel === 0 ? 'AM' :
  //         responseExecDocID.data[i].workflowlevel === 1 ? 'SM' :
  //           responseExecDocID.data[i].workflowlevel === 2 ? 'DM' :
  //             responseExecDocID.data[i].workflowlevel === 3 ? 'FM' : 'MD'
  //     }
  //   }

  //   setCheckExamineApprove(CheckExamineApprove)

  //   for (let i = 0; i < (responseExecDocID.data.length); i++) {
  //     if (responseExecDocID.data[i].limitamount >= price_approve && responseExecDocID.data[i].limitamount !== null && responseExecDocID.data[i].workflowlevel < 5) {
  //       CheckApprove[i] = responseExecDocID.data[i].workflowlevel === 0 ? 'AM' :
  //         responseExecDocID.data[i].workflowlevel === 1 ? 'SM' :
  //           responseExecDocID.data[i].workflowlevel === 2 ? 'DM' :
  //             responseExecDocID.data[i].workflowlevel === 3 ? 'FM' : 'MD'
  //     }
  //   }
  //   setCheckApprove(CheckApprove)
  // }

  // React.useEffect(() => {
  //   handlefechtAprrove();
  //   // 👇️ disable the rule for a single line

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

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
        window.location.href = "/NAC_OPERATOR";
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
      <StyledTableCell align="center" >{!selectNAC.create_date ? '' : selectNAC.create_date.split('T')[0]}</StyledTableCell>
      <StyledTableCell align="center" >{selectNAC.source_userid}</StyledTableCell>
      <StyledTableCell align="center" >{!selectNAC.des_userid ? 'ไม่มี' : selectNAC.des_userid}</StyledTableCell>
      <StyledTableCell align="left">
        <Item style={{
          'maxWidth': 'fit-content',
          borderRadius: '100px',
          'backgroundColor': selectNAC.nac_status === 1 ?
            '#1E90FF' : selectNAC.nac_status === 2 ?
              '#6495ED' : selectNAC.nac_status === 3 ?
                '#FF69B4' : selectNAC.nac_status === 4 ?
                  '#00CED1' : selectNAC.nac_status === 5 ?
                    '#6A5ACD' : selectNAC.nac_status === 6 ?
                      '#008000' : selectNAC.nac_status === 7 ?
                        '#FFA500' : selectNAC.nac_status === 8 ?
                          '#F0E68C' : selectNAC.nac_status === 11 ?
                            '#F4A460' : selectNAC.nac_status === 12 ?
                              '#DDA0DD' : selectNAC.nac_status === 13 ?
                                '#6A5ACD' : selectNAC.nac_status === 14 ?
                                  '#708090' : '#DC143C'
        }}>
          {selectNAC.status_name}
        </Item>
      </StyledTableCell>
      <StyledTableCell align="left">{
        (selectNAC.nac_status === 2 && selectNAC.name !== 'เปลี่ยนแปลงรายละเอียดทรัพย์สิน' && selectNAC.name !== 'เพิ่มบัญชีทรัพย์สินถาวร') ? '' + selectNAC.vertify + '' :
          (selectNAC.nac_status === 3 && selectNAC.name !== 'เปลี่ยนแปลงรายละเอียดทรัพย์สิน' && selectNAC.name !== 'เพิ่มบัญชีทรัพย์สินถาวร') ? '' + selectNAC.approved + '' :
            ((selectNAC.nac_status === 2) && (selectNAC.name === 'เปลี่ยนแปลงรายละเอียดทรัพย์สิน' || selectNAC.name === 'เพิ่มบัญชีทรัพย์สินถาวร')) ? '' + selectNAC.vertify + '' :
              (selectNAC.nac_status === 13) ? 'การเงิน' : (selectNAC.nac_status === 5) ? 'บัญชี' : 'none'
      }</StyledTableCell>
      <StyledTableCell align="center">
        <Grid container rowSpacing={1}>
          <React.Fragment>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="warning"
                onClick={(event) => handleEditClick(event, selectNAC)}
                sx={{ p: 0.8, pb: 0.5, pt: 0.5 }}
              >
                <ArticleIcon />
              </Button>
            </Grid>
          </React.Fragment>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="error"
              disabled={checkUserWeb === 'admin' ? false : true}
              onClick={handleClickOpen}
              sx={{ p: 0.8, pb: 0.5, pt: 0.5 }}
            >
              <DeleteIcon />
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
                <Button
                  variant="contained"
                  sx={{ p: 0.8, pb: 0.5, pt: 0.5 }}
                  name={selectNAC.nac_code}
                  onClick={(event) => handleDrop_NAC(event)}
                >ใช่
                </Button>
                <Button
                  variant="contained"
                  sx={{ p: 0.8, pb: 0.5, pt: 0.5 }}
                  color='error'
                  onClick={handleClose}
                  autoFocus
                >
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