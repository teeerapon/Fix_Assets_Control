// eslint-disable-next-line 
import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import swal from 'sweetalert';
import { useLocation } from 'react-router';
//DATA_CENTER
import DATA_CENTER from './DATA_CENTER/data_center'

import config from './config';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(http://vpnptec.dyndns.org:10280/OPS_Fileupload/ATT_220300007.jpg)',
    backgroundSize: 'cover',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


// เพื่อใช้ทดสอบ
async function loginUser(credentials) {
  return fetch(config.http + '/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

async function permission(credentials) {
  return fetch(config.http + '/permission_branch', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

async function ChackUserWeb(credentials) {
  return fetch(config.http + '/ChackUserWeb', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

export default function Signin() {

  const d = new Date();
  const year = (d.getFullYear()).toString();
  const month = ((d.getMonth()) + 101).toString().slice(-2);
  const date = ((d.getDate()) + 100).toString().slice(-2);
  const hours = ((d.getHours()) + 100).toString().slice(-2);
  const mins = ((d.getMinutes()) + 100).toString().slice(-2);
  const seconds = ((d.getSeconds()) + 100).toString().slice(-2);
  const datenow = `${year + month + date + hours + mins + seconds}`

  const classes = useStyles();
  const URL_LINK = useLocation()
  const [UserCode, setUserCode] = useState();
  const [Password, setPassword] = useState();
  const [checkUserWeb, setCheckUserWeb] = React.useState();
  const userCode = UserCode;
  const usercode = UserCode;

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await loginUser({
      UserCode,
      Password
    });
    const responseForPermission = await permission({
      userCode
    });
    const resChackUserWeb = await ChackUserWeb({
      usercode
    });
    if (UserCode == null || Password == null) {
      swal("แจ้งเตือน", 'กรุณากรอกข้อมูลเพื่อล็อคอินเข้าสู่ระบบ', "error");
    } else {
      if ('token' in response) {
        swal("แจ้งเตือน", 'คุณได้เข้าสู่กระบบแล้ว', "success", {
          buttons: false,
          timer: 1500,
        }).then((value) => {
          if (URL_LINK.pathname !== '/') {
            localStorage.setItem('sucurity', resChackUserWeb['data'][0]['approverid']);
            localStorage.setItem('token', response['token']);
            localStorage.setItem('data', JSON.stringify(response['data'][0]));
            localStorage.setItem('date_login', datenow);
            localStorage.setItem('permission', JSON.stringify(responseForPermission['data']));
            window.location.href = URL_LINK.pathname;
          } else {
            localStorage.setItem('sucurity', resChackUserWeb['data'][0]['approverid']);
            localStorage.setItem('token', response['token']);
            localStorage.setItem('data', JSON.stringify(response['data'][0]));
            localStorage.setItem('date_login', datenow);
            localStorage.setItem('permission', JSON.stringify(responseForPermission['data']));
            window.location.href = '/NAC_MAIN';
          }
        });
      } else {
        swal("แจ้งเตือน", 'UserCode หรือ Password ไม่ถูกต้อง', "error", {
          buttons: false,
          timer: 2000,
        });
      }
    }
  }


  return (
    <Grid container className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} md={7} className={classes.image} />
      <Grid item xs={12} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="userCode"
              name="userCode"
              label="UserCode"
              onChange={e => setUserCode(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="Password"
              name="Password"
              label="Password"
              type="Password"
              onChange={e => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              เข้าสู่ระบบ
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}