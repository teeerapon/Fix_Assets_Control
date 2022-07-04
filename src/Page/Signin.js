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
  return fetch('http://49.0.64.71:32001/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

async function permission(credentials) {
  return fetch('http://49.0.64.71:32001/api/permission_branch', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

export default function Signin() {
  const classes = useStyles();
  const [UserCode, setUserCode] = useState();
  const [Password, setPassword] = useState();
  const userCode = UserCode;

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await loginUser({
      UserCode,
      Password
    });
    const responseForPermission = await permission({
      userCode
    });
    if (UserCode == null || Password == null) {
      swal("ทำรายการไม่สำเร็จ", 'กรุณากรอกข้อมูลเพื่อล็อคอินเข้าสู่ระบบ', "error");
    } else {
      if ('token' in response) {
        swal("ทำรายการสำเร็จ", 'คุณได้เข้าสู่กระบบแล้ว', "success",{
          buttons: false,
          timer: 1500,
        }).then((value) => {
          localStorage.setItem('token', response['token']);
          localStorage.setItem('data', JSON.stringify(response['data'][0]));
          localStorage.setItem('permission', JSON.stringify(responseForPermission['data']));
          window.location.href = "/HomePage";
        });
      } else {
        swal("ทำรายการไม่สำเร็จ", 'UserCode หรือ Password ไม่ถูกต้อง', "error");
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