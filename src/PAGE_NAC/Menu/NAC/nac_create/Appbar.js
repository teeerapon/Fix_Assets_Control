import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Outlet, useNavigate } from "react-router";
import Box from '@mui/material/Box';
import SummarizeIcon from '@mui/icons-material/Summarize';
import IconButton from '@mui/material/IconButton';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AnimatedPage from '../../../../AnimatedPage.jsx';
import Table from '@mui/material/Table';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import '../../../../App.css'

const theme = createTheme();

export default function Nac_Main({ nac_code, nac_type, approveData, sendHeader }) {
  // routes
  const data = JSON.parse(localStorage.getItem('data'));
  const navigate = useNavigate();
  const queryString = window.location.search;

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar
          position="absolute"
          color="default"
          elevation={0}
          sx={{
            position: 'relative',
            borderBottom: (t) => `1px solid ${t.palette.divider}`,
            minWidth: window.innerWidth
          }}
        >
          <Toolbar>
            <Box sx={{ width: 1 }}>
              <Box display="grid" gridTemplateColumns="repeat(12, 1fr)">
                <Box gridColumn="span 10">
                  <AnimatedPage>
                    <Typography className='scaled-480px-Header' color="inherit" sx={{ pt: 1 }}>
                      {nac_type === 1 ? `เพิ่มบัญชีทรัพย์สิน` :
                        nac_type === 2 ? `โยกย้ายทรัพย์สิน` :
                          nac_type === 3 ? `เปลี่ยนแปลงรายละเอียดทรัพย์สิน` :
                            nac_type === 4 ? `ตัดบัญชีทรัพย์สิน` :
                              nac_type === 5 ? `ขายบัญชีทรัพย์สิน` : ''} {nac_code}
                    </Typography>
                  </AnimatedPage>
                </Box>
                <Box gridColumn="span 0">
                  <AnimatedPage>
                    <IconButton sx={{ color: 'rgb(0,0,0)' }} onClick={() => navigate('/NAC_ROW')}>
                      <SummarizeIcon className='scaled-480px-Header text-center' />
                    </IconButton>
                  </AnimatedPage>
                </Box>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
        <Container component="main" maxWidth="lg" sx={{ mb: 5, minWidth: window.innerWidth * 0.8 }}>
          <Paper variant="outlined" sx={{ mt: 4, p: { xs: 2, md: 3 } }}>
            {nac_code && approveData ? (
              <React.Fragment>
                <Table>
                  <Stack
                    direction="row"
                    alignItems="flex-start"
                    spacing={1}
                  >
                    <Typography className='scaled-480px-Header'>
                      ผู้มีสิทธิอนุมัติเอกสารฉบับนี้ :
                    </Typography>
                    {approveData.filter((res) => res.limitamount >= sendHeader[0].sumPrice && sendHeader[0].nac_type !== 1).map((resMap) => (
                      <Typography className='scaled-480px-Header' style={{ 'color': resMap.status === 1 ? 'blue' : 'black' }}>
                        {
                          resMap.workflowlevel === 1 ? `(${resMap.approverid})` :
                            resMap.workflowlevel === 2 ? `(${resMap.approverid})` :
                              resMap.workflowlevel === 3 ? `(${resMap.approverid})` :
                                resMap.workflowlevel === 4 ? `(${resMap.approverid})` :
                                  resMap.workflowlevel === 5 ? `(${resMap.approverid})`
                                    : null}
                      </Typography>
                    ))}
                  </Stack>
                  <hr />
                  <Stack
                    direction="row"
                    alignItems="flex-start"
                    spacing={1}
                  >
                    <Typography className='scaled-480px-Header'>
                      ผู้มีสิทธิตรวจสอบเอกสารฉบับนี้ :
                    </Typography>
                    {approveData.filter((res) => res.limitamount < sendHeader[0].sumPrice && sendHeader[0].nac_type !== 1).map((resMap) => (
                      <Typography className='scaled-480px-Header' style={{ 'color': resMap.status === 1 ? 'blue' : 'black' }}>
                        {
                          resMap.workflowlevel === 1 ? `(${resMap.approverid})` :
                            resMap.workflowlevel === 2 ? `(${resMap.approverid})` :
                              resMap.workflowlevel === 3 ? `(${resMap.approverid})` :
                                resMap.workflowlevel === 4 ? `(${resMap.approverid})` :
                                  resMap.workflowlevel === 5 ? `(${resMap.approverid})`
                                    : null}
                      </Typography>
                    ))}
                  </Stack>
                </Table>
              </React.Fragment>
            ) : null}
          </Paper>
        </Container>
      </ThemeProvider>
      <Outlet />
    </React.Fragment >
  );
}