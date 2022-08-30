import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import AnimatedPage from '../../../AnimatedPage.jsx'
import React from 'react';
import Box from '@mui/material/Box';
import logoPure from '../../../image/Picture1.png'

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
              หน้าแรกเว็บไซต์
            </Typography>
          </AnimatedPage>
        </Toolbar>
      </AppBar>
      <AnimatedPage>
        <Box
          sx={{
            marginTop: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img style={{ maxWidth: '30%' }} src={logoPure} loading="lazy" />
          <Container sx={{pt:1}}>
            <body className="text-center text-dark bg-white" style={{ height: "45vh" }}>
              <div className='container bg-white' style={{ height: "40vh", width: "100vh" }}>
                <main className="px-3">
                  <h1>PURE THAI ENERGY CO.,LTD</h1>
                  <hr></hr>
                  <p className="lead">ยินดีต้อนรับสู่เว็บไซต์เดโม เพียวพลังงานไทย จำกัด <b>(PURE THAI ENERGY CO.,LTD)</b> ที่ใช้สำหรับการจัดการเปลี่ยนแปลงและควบคุมระบบงานทรัพย์สินทั้งหมด</p>
                </main>
              </div>
              <footer className="mt-auto text-dark-50 bg-white">
                <p>Facebook Fanpage By <a href='https://www.facebook.com/essopurethai/' className="text-dark">@Purethai</a></p>
                <div className='pt-2'></div>
              </footer>
            </body>
          </Container>
        </Box>
      </AnimatedPage>
    </React.Fragment>
  );
}