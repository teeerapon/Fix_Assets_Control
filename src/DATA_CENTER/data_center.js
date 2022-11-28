import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import AnimatedPage from '../AnimatedPage'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box';
import { Outlet, useNavigate } from "react-router";
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import MobileStepper from '@mui/material/MobileStepper';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);


const mainFeaturedPost = [
  {
    title: 'PURE THAI ENERGY CO.,LTD',
    description:
      "สถานีบริการน้ำมันเอสโซ่เพียวไทย ภายใต้การบริหารของ บริษัท เพียวพลังงานไทย จำกัด (เดิมชื่อ โยธินปิโตรเลียม จำกัด) เป็น บริษัทในเครือของ บริษัท อาร์พีซีจี จำกัด (มหาชน) (RPCG) โดยผู้ถือหุ้นเป็นคนไทยทั้งสิ้น เริ่มเปิดดำเนินการสาขาแรก เดือนกุมภาพันธ์ พ.ศ 2542 ที่จังหวัดนครสวรรค์ ในแบรนด์สถานีบริการน้ำมันเพียว และเมื่อวันที่ 6 พฤศจิกายน ปี 2562 ได้จับมือเป็นพันธมิตรทางธุรกิจกับ บริษัท เอสโซ่ (ประเทศไทย) จำกัด (มหาชน) เปลี่ยนสถานีบริการน้ำมัน“เพียว” ให้เป็นเครื่องหมายการค้า“เอสโซ่” โดยบริษัท เพียวฯ ยังคงเป็นผู้บริหารสถานีบริการน้ำมันดังกล่าวเช่นเดิม",
    imgPath: 'http://192.168.220.1:10280/OPS_Fileupload/ATT_221000230.jpg',
    imageText: 'main image description',
  },
  {
    title: 'PURE THAI ENERGY CO.,LTD',
    description:
      "สถานีบริการน้ำมันเอสโซ่เพียวไทย ภายใต้การบริหารของ บริษัท เพียวพลังงานไทย จำกัด (เดิมชื่อ โยธินปิโตรเลียม จำกัด) เป็น บริษัทในเครือของ บริษัท อาร์พีซีจี จำกัด (มหาชน) (RPCG) โดยผู้ถือหุ้นเป็นคนไทยทั้งสิ้น เริ่มเปิดดำเนินการสาขาแรก เดือนกุมภาพันธ์ พ.ศ 2542 ที่จังหวัดนครสวรรค์ ในแบรนด์สถานีบริการน้ำมันเพียว และเมื่อวันที่ 6 พฤศจิกายน ปี 2562 ได้จับมือเป็นพันธมิตรทางธุรกิจกับ บริษัท เอสโซ่ (ประเทศไทย) จำกัด (มหาชน) เปลี่ยนสถานีบริการน้ำมัน“เพียว” ให้เป็นเครื่องหมายการค้า“เอสโซ่” โดยบริษัท เพียวฯ ยังคงเป็นผู้บริหารสถานีบริการน้ำมันดังกล่าวเช่นเดิม",
    imgPath: 'http://192.168.220.1:10280/OPS_Fileupload/ATT_221000236.jpg',
    imageText: 'main image description',
  },
  {
    title: 'PURE THAI ENERGY CO.,LTD',
    description:
      "สถานีบริการน้ำมันเอสโซ่เพียวไทย ภายใต้การบริหารของ บริษัท เพียวพลังงานไทย จำกัด (เดิมชื่อ โยธินปิโตรเลียม จำกัด) เป็น บริษัทในเครือของ บริษัท อาร์พีซีจี จำกัด (มหาชน) (RPCG) โดยผู้ถือหุ้นเป็นคนไทยทั้งสิ้น เริ่มเปิดดำเนินการสาขาแรก เดือนกุมภาพันธ์ พ.ศ 2542 ที่จังหวัดนครสวรรค์ ในแบรนด์สถานีบริการน้ำมันเพียว และเมื่อวันที่ 6 พฤศจิกายน ปี 2562 ได้จับมือเป็นพันธมิตรทางธุรกิจกับ บริษัท เอสโซ่ (ประเทศไทย) จำกัด (มหาชน) เปลี่ยนสถานีบริการน้ำมัน“เพียว” ให้เป็นเครื่องหมายการค้า“เอสโซ่” โดยบริษัท เพียวฯ ยังคงเป็นผู้บริหารสถานีบริการน้ำมันดังกล่าวเช่นเดิม",
    imgPath: 'http://192.168.220.1:10280/OPS_Fileupload/ATT_221000232.jpg',
    imageText: 'main image description',
  },
  {
    title: 'PURE THAI ENERGY CO.,LTD',
    description:
      "สถานีบริการน้ำมันเอสโซ่เพียวไทย ภายใต้การบริหารของ บริษัท เพียวพลังงานไทย จำกัด (เดิมชื่อ โยธินปิโตรเลียม จำกัด) เป็น บริษัทในเครือของ บริษัท อาร์พีซีจี จำกัด (มหาชน) (RPCG) โดยผู้ถือหุ้นเป็นคนไทยทั้งสิ้น เริ่มเปิดดำเนินการสาขาแรก เดือนกุมภาพันธ์ พ.ศ 2542 ที่จังหวัดนครสวรรค์ ในแบรนด์สถานีบริการน้ำมันเพียว และเมื่อวันที่ 6 พฤศจิกายน ปี 2562 ได้จับมือเป็นพันธมิตรทางธุรกิจกับ บริษัท เอสโซ่ (ประเทศไทย) จำกัด (มหาชน) เปลี่ยนสถานีบริการน้ำมัน“เพียว” ให้เป็นเครื่องหมายการค้า“เอสโซ่” โดยบริษัท เพียวฯ ยังคงเป็นผู้บริหารสถานีบริการน้ำมันดังกล่าวเช่นเดิม",
    imgPath: 'http://192.168.220.1:10280/OPS_Fileupload/ATT_221000237.jpg',
    imageText: 'main image description',
  },
];

const featuredPosts = [
  {
    title: 'Notice of Asset Change',
    thai_sub: 'การเปลี่ยนแปลงทรัพย์สิน',
    initial: 'NAC',
    description: '',
    url_link: '/NAC_MAIN',
  },
  {
    title: 'Record of Processing Activity',
    thai_sub: 'บันทึกกิจกรรมการประมวลข้อมูลส่วนบุคคล',
    initial: 'RoPA',
    description: '',
    url_link: '/ROPA_MAIN',
  },
];

const theme = createTheme();

export default function Blog() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = mainFeaturedPost.length;

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <React.Fragment>
      <AnimatedPage>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Paper
            square
            elevation={0}
            sx={{
              position: 'relative',
              backgroundColor: 'grey.800',
              color: '#fff',
              mb: 4,
              height: '330px',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundImage: `url(${mainFeaturedPost[activeStep].imgPath})`,
            }}
          >
            <AutoPlaySwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={activeStep}
              interval={4000}
              onChangeIndex={handleStepChange}
              enableMouseEvents
            >
              {mainFeaturedPost.map((step, index) => (
                <div key={step.imageText}>
                  {<img style={{ display: 'none' }} src={step.imgPath} alt={step.imageText} />}
                </div>
              ))}
            </AutoPlaySwipeableViews>
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                backgroundColor: 'rgba(0,0,0,0.3)',
              }}
            >
              <Grid container>
                <Grid item md={8}>
                  <Box
                    sx={{
                      position: 'relative',
                      p: { xs: 3, md: 6 },
                      pr: { md: 0 },
                      pb: { md: 0 },
                    }}
                  >
                    <Typography component="h1" variant="h3" gutterBottom>
                      <b>{mainFeaturedPost[0].title}</b>
                    </Typography>
                  </Box>
                </Grid>
                <Grid item md={6}>
                  <Box
                    sx={{
                      position: 'relative',
                      p: { xs: 3, md: 6 },
                      pr: { md: 0 },
                      pt: { md: 0 },
                    }}
                  >
                    <Typography variant="body2" paragraph>
                      {mainFeaturedPost[0].description}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <MobileStepper
              steps={maxSteps}
              position="static"
              activeStep={activeStep}
              sx={{ position: 'fixed', background: 'rgba(255,255,255,0)' }}
            />
          </Paper>
          <Typography
            component="h3"
            variant="h4"
            align="center"
            color="text.primary"
            sx={{
              fontFamily: 'monospace',
              letterSpacing: '.2rem',
              textDecoration: 'none',
              fontWeight: 'bold',
            }}
            gutterBottom
          >
            <Divider>MENU</Divider>
          </Typography>
          <Container disableGutters maxWidth="md" component="main" sx={{ pb: 6 }}>
            <main>
              <Grid container spacing={5} alignItems="flex-end" sx={{ pt: 2 }}>
                {featuredPosts.map((post) => (
                  <Grid
                    item
                    key={post.url_link}
                    xs={12}
                    sm={post.url_link === '/' ? 6 : 12}
                    md={6}
                  >
                    <Card>
                      <CardHeader
                        title={post.initial}
                        titleTypographyProps={{ align: 'center', fontSize: 18, fontWeight: 'bold' }}
                        // action={<StarIcon />}
                        subheaderTypographyProps={{
                          align: 'center',
                        }}
                        sx={{
                          backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                              ? theme.palette.grey[200]
                              : theme.palette.grey[700],
                        }}
                      />
                      <CardContent>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'baseline',
                          }}
                        >
                          <Typography component="body1" variant="body2" color="text.primary" sx={{ fontWeight: 'bold' }}>
                            {post.title}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'baseline',
                          }}
                        >
                          <Typography variant="caption" color="text.primary" sx={{ pt: 0.5 }}>
                            {post.thai_sub}
                          </Typography>
                        </Box>
                      </CardContent>
                      <CardActions>
                        <Button
                          fullWidth
                          variant={post.url_link === '/' ? 'outlined' : 'contained'}
                          disabled={post.url_link === '/' ? true : false}
                          onClick={() => navigate(post.url_link)}
                        >
                          {post.url_link === '/' ? 'Coming Soon' : 'GO'}
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </main>
          </Container>
        </ThemeProvider>
      </AnimatedPage>
      <Outlet />
    </React.Fragment>

  );
}