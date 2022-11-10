import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import AnimatedPage from '../../../AnimatedPage.jsx'
import React from 'react';
import Box from '@mui/material/Box';
import logoPure from '../../../image/Picture1.png'
import CssBaseline from '@mui/material/CssBaseline';

export default function MenuAppBar() {
  return (
    <React.Fragment>
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <AnimatedPage>
            <Typography variant="h5" color="inherit" noWrap>
              หน้าแรกระบบควบคุมและเปลี่ยนแปลงทรัพย์สิน
            </Typography>
          </AnimatedPage>
        </Toolbar>
      </AppBar>
      <AnimatedPage>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '45vh',
          }}
        >
          <CssBaseline />
          <Container component="main" sx={{ mt: 8, mb: 0 }} maxWidth="md">
            <center>
              <img style={{ maxWidth: '50%' }} src={logoPure} loading="lazy" />
              <Typography sx={{ mt: 2 }} variant="h3" component="h2" gutterBottom>
                <b> {'(PURE THAI ENERGY CO.,LTD)'} </b>
              </Typography>
            </center>
          </Container>
          <Container component="main" sx={{ mt: 0, mb: 2 }} maxWidth="sm">
            <center>
              <Typography variant="h5" component="h2" gutterBottom>
                {'ยินดีต้อนรับสู่เว็บไซต์ เพียวพลังงานไทย จำกัด'}
                {'ที่ใช้สำหรับการจัดการเปลี่ยนแปลงและควบคุมทรัพย์สิน'}
              </Typography>
            </center>
          </Container>
        </Box>
      </AnimatedPage>
    </React.Fragment>
  );
}