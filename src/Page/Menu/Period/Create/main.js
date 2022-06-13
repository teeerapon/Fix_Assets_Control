import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Step1 from './CreatePeriod_step1';
import AnimatedPage from '../../../../AnimatedPage.jsx'

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'ptec@pure © '}
      <Link color="inherit">
        Create Period
      </Link>{' '}
      {new Date().getFullYear()}
    </Typography>
  );
}
const theme = createTheme();

export default function Checkout() {

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
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
                เพิ่มรอบตรวจนับ
              </Typography>
            </AnimatedPage>
          </Toolbar>
        </AppBar>
        <AnimatedPage>
          <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
              <Step1 />
            </Paper>
            <Copyright />
          </Container>
        </AnimatedPage>
      </ThemeProvider>
    </div>
  );
}