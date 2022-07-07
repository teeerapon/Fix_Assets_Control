import * as React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import ChatIcon from '@mui/icons-material/Chat';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Input from '@mui/material/Input';
import swal from 'sweetalert';
import { useNavigate } from "react-router";
import Stack from '@mui/material/Stack';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TableContainer from '@mui/material/TableContainer';
import TableBody from '@mui/material/TableBody';
import Link from '@mui/material/Link';
//import List from '@mui/material/List';

const theme = createTheme();

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.action.selected,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.white,
  },
  // hide last border
}));

async function store_FA_control_comment(credentials) {
  return fetch('http://192.168.220.1:32001/api/store_FA_control_comment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

async function stroe_FA_control_Path(credentials) {
  return fetch('http://192.168.220.1:32001/api/stroe_FA_control_Path', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

async function qureyNAC_comment(credentials) {
  return fetch('http://192.168.220.1:32001/api/qureyNAC_comment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

async function qureyNAC_path(credentials) {
  return fetch('http://192.168.220.1:32001/api/qureyNAC_path', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

export default function OutlinedCard({ handleClickOpenDialog, openDialog, handleCloseDialog, data
  , nac_code, headers, description, setDescription, setOpenDialog }) {

  const [comment, setComment] = React.useState();
  const [commentFetch, setCommentFetch] = React.useState([]);
  const [path, setPath] = React.useState();
  const [pathFetch, setPathFetch] = React.useState([]);
  const navigate = useNavigate();

  const fetchComment = async () => {
    const responseFetch = await qureyNAC_comment({
      nac_code
    })
    if ('data' in responseFetch) {
      if (responseFetch.data.length !== 0) {
        setCommentFetch(responseFetch.data)
      }
    }

    const responsePath = await qureyNAC_path({
      nac_code
    })
    if ('data' in responsePath) {
      if (responsePath.data.length !== 0) {
        setPathFetch(responsePath.data)
      }
    }
  }

  const handleSubmitComment = async (e) => {
    if (!comment) {
      swal("ทำรายการไม่สำเร็จ", 'กรุณาเติมข้อความ', "error", {
        buttons: false,
        timer: 2000,
      }).then((value) => {
        if (headers.nac_type === 1) {
          navigate('/NAC_ROW/NAC_CREATE_NEW_WAIT_APPROVE')
        } else if (headers.nac_type === 2) {
          navigate('/NAC_ROW/NAC_CREATE_WAIT_APPROVE')
        } else if (headers.nac_type === 3) {
          navigate('/NAC_ROW/NAC_CHANGE_WAIT_APPROVE')
        } else if (headers.nac_type === 4) {
          navigate('/NAC_ROW/NAC_DELETE_WAIT_APPROVE')
        } else if (headers.nac_type === 5) {
          navigate('/NAC_ROW/NAC_SEALS_APPROVE')
        }
      });
    } else {
      const usercode = data.UserCode
      const responseComment = await store_FA_control_comment({
        nac_code,
        usercode,
        comment
      })
      setCommentFetch(responseComment.data)
      setComment(null)
      const elementScroll = document.getElementById('scroll-input')
      elementScroll.scrollTo(0, elementScroll.scrollHeight);
    }
  }

  const handleSubmitPath = async (e) => {
    if (!path || !description) {
      swal("ทำรายการไม่สำเร็จ", 'กรุณาเติมข้อความ', "error", {
        buttons: false,
        timer: 2000,
      }).then((value) => {
        if (headers.nac_type === 1) {
          navigate('/NAC_ROW/NAC_CREATE_NEW_WAIT_APPROVE')
        } else if (headers.nac_type === 2) {
          navigate('/NAC_ROW/NAC_CREATE_WAIT_APPROVE')
        } else if (headers.nac_type === 3) {
          navigate('/NAC_ROW/NAC_CHANGE_WAIT_APPROVE')
        } else if (headers.nac_type === 4) {
          navigate('/NAC_ROW/NAC_DELETE_WAIT_APPROVE')
        } else if (headers.nac_type === 5) {
          navigate('/NAC_ROW/NAC_SEALS_APPROVE')
        }
      });
    } else {
      const usercode = data.UserCode
      const linkpath = path
      const responsePath = await stroe_FA_control_Path({
        nac_code,
        usercode,
        linkpath,
        description
      })
      if ('data' in responsePath) {
        setPathFetch(responsePath.data)
        setPath(null)
        setOpenDialog(false)
      }
    }
  }


  const handleChangePath = (event) => {
    event.preventDefault();
    setPath(event.target.value);
  };

  const handleChangeDescription = (event) => {
    event.preventDefault();
    setDescription(event.target.value);
  };

  const handleChangeComment = (event) => {
    event.preventDefault();
    setComment(event.target.value);
  };

  React.useEffect(() => {
    fetchComment();
  }, []);

  return (
    <React.Fragment>
      <React.Fragment>
        <React.Fragment>
          <Grid
            container
            direction="row"
            spacing={5}
            alignItems="flex-start" sx={{ pb: 2 }}
          >
            <Grid
              item
              xs={12}
              sm={6}
              md={5}
            >
              <Paper>
                <Card>
                  <CardHeader
                    title='เอกสารแนบ'
                    titleTypographyProps={{ align: 'center' }}
                    subheaderTypographyProps={{
                      align: 'center',
                    }}
                    sx={{
                      backgroundColor: (theme) => theme.palette.grey[200]
                    }}
                  />
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      mb: 2,
                    }}
                  >
                    <Grid sx={{ pb: 1 }}></Grid>
                      {!pathFetch[0] ? (
                        <React.Fragment></React.Fragment>
                      ) : (
                        <React.Fragment>
                          <TableContainer sx={{p:2}}>
                            <Table aria-label="customized table" style={{ width: '100%' }}>
                              <TableHead>
                                <TableRow>
                                  <StyledTableCell align="center" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa" }}>คำอธิบาย</StyledTableCell>
                                  <StyledTableCell align="center" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa" }}>ลิ้งแนบ</StyledTableCell>
                                </TableRow>
                              </TableHead>
                              {pathFetch.map((res, index) => (
                                <React.Fragment>
                                  <TableBody>
                                    <StyledTableRow>
                                      <StyledTableCell align="left" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa" }}>
                                        {res.userid} : {res.description}
                                      </StyledTableCell>
                                      <StyledTableCell align="center" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa" }}>
                                        <TextField
                                          variant='standard'
                                          value={res.linkpath}
                                          onClick={() => window.open(res.linkpath, "_blank")}
                                        />
                                      </StyledTableCell>
                                    </StyledTableRow>
                                  </TableBody>
                                </React.Fragment>
                              ))}
                            </Table>
                          </TableContainer>
                        </React.Fragment>
                      )}
                  </Box>
                  <CardActions titleTypographyProps={{ align: 'center' }}
                    subheaderTypographyProps={{
                      align: 'center',
                    }}
                    sx={{ p: 1.5 }}>
                    <Button
                      fullWidth
                      style={{ 'backgroundColor': 'rgb(0, 120, 255)' }}
                      onClick={handleClickOpenDialog}
                      startIcon={<ChatIcon style={{ 'color': 'white' }} />}
                    >
                      <Typography variant='h6' style={{ 'color': 'white' }}>แนบลิ้งเอกสาร</Typography>
                    </Button>
                  </CardActions>
                </Card>
              </Paper>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={7}
            >
              <Paper>
                <Card>
                  <CardHeader
                    title='ช่องแสดงความคิดเห็น'
                    titleTypographyProps={{ align: 'center' }}
                    subheaderTypographyProps={{
                      align: 'center',
                    }}
                    sx={{
                      backgroundColor: (theme) => theme.palette.grey[200]
                    }}
                  />
                  <Grid sx={{ pb: 1 }}></Grid>
                  {commentFetch.map((res, index) => (
                    <React.Fragment>
                      <CardContent cols={3} sx={{ p: 3, pb: 0, pt: 1 }}>
                        <Stack>
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: (res.userid === data.UserCode) ? 'end' : 'start',
                              alignItems: 'baseline',
                              pr: (res.userid === data.UserCode) ? 1 : 0
                            }}
                          >
                            <Typography sx={{ fontSize: 12, pl: 2 }} style={{ 'color': 'rgb(160, 160, 160)', 'font-weight': '400' }}>
                              {res.userid}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{(res.create_date).split('T')[0]}  {(res.create_date).split('T')[1].split('.')[0].split(':')[0]}:{(res.create_date).split('T')[1].split('.')[0].split(':')[1]}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: (res.userid === data.UserCode) ? 'end' : 'start',
                              alignItems: 'baseline',
                            }}
                          >
                            <Card
                              style={{
                                'backgroundColor': (res.userid === data.UserCode) ? 'rgb(0, 120, 255)' : 'rgb(232, 232, 232)',
                                'color': (res.userid === data.UserCode) ? 'white' : 'black',
                                borderTopLeftRadius: 20, borderTopRightRadius: 20, borderBottomLeftRadius: 20, borderBottomRightRadius: 20
                              }}
                            >
                              <CardContent style={{
                                'color': (res.userid === data.UserCode) ? 'white' : 'black'
                                , 'padding-bottom': '12px'
                              }}>
                                {/* <Typography sx={{ fontSize: 12 }}>
                                  {(res.create_date).split('T')[0]}  {(res.create_date).split('T')[1].split('.')[0]}
                                </Typography> */}
                                <Typography sx={{ fontSize: 14 }}>
                                  {res.comment}
                                </Typography>
                              </CardContent>
                            </Card>
                          </Box>
                        </Stack>
                      </CardContent>
                    </React.Fragment>
                  ))}
                  {/* <List
                    id='scroll-input'
                    sx={{
                      width: '100%',
                      bgcolor: 'background.paper',
                      position: 'relative',
                      overflow: 'auto',
                      maxHeight: 'auto',
                      '& ul': { padding: 0 },
                    }}
                    subheader={<li />}> */}
                  {/* </List> */}
                  <CardActions titleTypographyProps={{ align: 'center' }}
                    subheaderTypographyProps={{
                      align: 'center',
                    }}
                    sx={{ p: 1.5, pb: 0 }}>
                    <Input
                      placeholder="Comment..."
                      fullWidth
                      sx={{ p: 0.5 }}
                      value={!comment ? '' : comment}
                      onChange={handleChangeComment}
                    />
                  </CardActions>
                  <CardActions titleTypographyProps={{ align: 'center' }}
                    subheaderTypographyProps={{
                      align: 'center',
                    }}
                    sx={{ p: 1.5 }}>
                    <Button
                      fullWidth
                      style={{ 'backgroundColor': !comment ? 'rgb(240, 240, 240)' : 'rgb(0, 120, 255)' }}
                      disabled={!comment ? true : false}
                      onClick={handleSubmitComment}
                      startIcon={<ChatIcon style={{ 'color': !comment ? 'rgb(200,200,200)' : 'white' }} />}
                    >
                      <Typography variant='h6' style={{ 'color': !comment ? 'rgb(200,200,200)' : 'white' }}>แสดงความคิดเห็น</Typography>
                    </Button>
                  </CardActions>
                </Card>
              </Paper>
            </Grid>
          </Grid>
        </React.Fragment>
      </React.Fragment>
      <Dialog open={openDialog} onClose={handleCloseDialog} >
        <DialogTitle>กรุณาแนบลิ้งเอกสาร</DialogTitle>
        <DialogContent sx={{ width: 500 }}>
          <TextField
            autoFocus
            margin="dense"
            id="link_document"
            label="ลิ้งเอกสารที่ต้องการ"
            type="text"
            onChange={handleChangePath}
            fullWidth
            variant="standard"
            sx={{ pb: 2 }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="like_description"
            label="คำอธิบาย"
            onChange={handleChangeDescription}
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmitPath} variant='contained'>บันทึก</Button>
          <Button onClick={handleCloseDialog} variant='contained' color='error'>ยกเลิก</Button>
        </DialogActions>
      </Dialog>
      <hr></hr>
      <br />
    </React.Fragment>
  );
}