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
    imgPath: 'https://scontent.fbkk14-1.fna.fbcdn.net/v/t39.30808-6/292265093_5364529780260631_8318749687930611200_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=730e14&_nc_eui2=AeHb5AJOcQJP4N1rGe5JlfkSu7aTeaI7MYa7tpN5ojsxhpbpuFMKUiItjfoD3EBIm9C2ViibV7jP-PxEtiOaatRz&_nc_ohc=Zdc6gC3Gw0EAX-p1_Jd&_nc_ht=scontent.fbkk14-1.fna&oh=00_AT-Jy2JjK5w5nyp8mdB5gAi2xCeW8LACxpLQrkqLLxksIw&oe=6312A6FC',
    imageText: 'main image description',
  },
  {
    title: 'PURE THAI ENERGY CO.,LTD',
    description:
      "สถานีบริการน้ำมันเอสโซ่เพียวไทย ภายใต้การบริหารของ บริษัท เพียวพลังงานไทย จำกัด (เดิมชื่อ โยธินปิโตรเลียม จำกัด) เป็น บริษัทในเครือของ บริษัท อาร์พีซีจี จำกัด (มหาชน) (RPCG) โดยผู้ถือหุ้นเป็นคนไทยทั้งสิ้น เริ่มเปิดดำเนินการสาขาแรก เดือนกุมภาพันธ์ พ.ศ 2542 ที่จังหวัดนครสวรรค์ ในแบรนด์สถานีบริการน้ำมันเพียว และเมื่อวันที่ 6 พฤศจิกายน ปี 2562 ได้จับมือเป็นพันธมิตรทางธุรกิจกับ บริษัท เอสโซ่ (ประเทศไทย) จำกัด (มหาชน) เปลี่ยนสถานีบริการน้ำมัน“เพียว” ให้เป็นเครื่องหมายการค้า“เอสโซ่” โดยบริษัท เพียวฯ ยังคงเป็นผู้บริหารสถานีบริการน้ำมันดังกล่าวเช่นเดิม",
    imgPath: 'https://harnoisenergies.com/wp-content/uploads/2022/03/essproxi1.jpg',
    imageText: 'main image description',
  },
  {
    title: 'PURE THAI ENERGY CO.,LTD',
    description:
      "สถานีบริการน้ำมันเอสโซ่เพียวไทย ภายใต้การบริหารของ บริษัท เพียวพลังงานไทย จำกัด (เดิมชื่อ โยธินปิโตรเลียม จำกัด) เป็น บริษัทในเครือของ บริษัท อาร์พีซีจี จำกัด (มหาชน) (RPCG) โดยผู้ถือหุ้นเป็นคนไทยทั้งสิ้น เริ่มเปิดดำเนินการสาขาแรก เดือนกุมภาพันธ์ พ.ศ 2542 ที่จังหวัดนครสวรรค์ ในแบรนด์สถานีบริการน้ำมันเพียว และเมื่อวันที่ 6 พฤศจิกายน ปี 2562 ได้จับมือเป็นพันธมิตรทางธุรกิจกับ บริษัท เอสโซ่ (ประเทศไทย) จำกัด (มหาชน) เปลี่ยนสถานีบริการน้ำมัน“เพียว” ให้เป็นเครื่องหมายการค้า“เอสโซ่” โดยบริษัท เพียวฯ ยังคงเป็นผู้บริหารสถานีบริการน้ำมันดังกล่าวเช่นเดิม",
    imgPath: 'https://www.purethai.co.th/wp-content/uploads/2022/05/11.jpg',
    imageText: 'main image description',
  },
  {
    title: 'PURE THAI ENERGY CO.,LTD',
    description:
      "สถานีบริการน้ำมันเอสโซ่เพียวไทย ภายใต้การบริหารของ บริษัท เพียวพลังงานไทย จำกัด (เดิมชื่อ โยธินปิโตรเลียม จำกัด) เป็น บริษัทในเครือของ บริษัท อาร์พีซีจี จำกัด (มหาชน) (RPCG) โดยผู้ถือหุ้นเป็นคนไทยทั้งสิ้น เริ่มเปิดดำเนินการสาขาแรก เดือนกุมภาพันธ์ พ.ศ 2542 ที่จังหวัดนครสวรรค์ ในแบรนด์สถานีบริการน้ำมันเพียว และเมื่อวันที่ 6 พฤศจิกายน ปี 2562 ได้จับมือเป็นพันธมิตรทางธุรกิจกับ บริษัท เอสโซ่ (ประเทศไทย) จำกัด (มหาชน) เปลี่ยนสถานีบริการน้ำมัน“เพียว” ให้เป็นเครื่องหมายการค้า“เอสโซ่” โดยบริษัท เพียวฯ ยังคงเป็นผู้บริหารสถานีบริการน้ำมันดังกล่าวเช่นเดิม",
    imgPath: 'https://scontent.fbkk10-1.fna.fbcdn.net/v/t39.30808-6/291901402_5356611007719175_3843897491518363884_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=730e14&_nc_eui2=AeHYUZGMv_ALWYRpV1GvJYXsyF-ZDzFCAarIX5kPMUIBqrZnPTxOoL1TCJ_NRs1P1N0ojjDrgkVcR-3TH9Poq-4u&_nc_ohc=qPcwauoem2UAX80PELG&_nc_ht=scontent.fbkk10-1.fna&oh=00_AT9A9X40TpkxLEffkNtIlF1_QNrNcGtrFqrUfZr1mYcUDw&oe=631297FF',
    imageText: 'main image description',
  },
];

const featuredPosts = [
  {
    title: 'Notice of Asset Change',
    initial: 'NAC',
    description: '',
    url_link: '/NAC_MAIN',
  },
  {
    title: 'Online Billing System',
    initial: 'OBS',
    description: '',
    url_link: '/',
  },
  {
    title: 'Record of Processing Activity',
    initial: 'RoPA',
    description: '',
    url_link: '/',
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
              height: '350px',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundImage: `url(${mainFeaturedPost[activeStep].imgPath})`,
            }}
          >
            <AutoPlaySwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={activeStep}
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
                    md={4}
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
                          <Typography component="body1" variant="body2" color="text.primary">
                            {post.title}
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
                  // <Grid item xs={12} md={4}>
                  //   <CardActionArea component="a" onClick={() => navigate(post.url_link)}>
                  //     <Card sx={{ display: 'flex' }}>
                  //       <CardContent sx={{ flex: 1 }} style={{ textAlign: 'center' }}>
                  //         <Typography component="h2" variant="body2">
                  //           {post.title}
                  //         </Typography>
                  //       </CardContent>
                  //     </Card>
                  //   </CardActionArea>
                  // </Grid>
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