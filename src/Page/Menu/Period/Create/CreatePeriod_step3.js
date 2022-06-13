import * as React from 'react';
import Typography from '@mui/material/Typography';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Outlet } from "react-router";

const steps = ['กรอกข้อมูล', 'ตรวจสอบข้อมูล', 'เสร็จสิ้น'];

export default function AddressForm() {
  const [activeStep] = React.useState(3);

  return (
    <>
      <Typography component="h1" variant="h4" align="center">
        <b>PURE THAI ENERGY CO.,LTD.</b>
      </Typography>
      <Typography component="h1" variant="h6" align="center" className='pt-2'>
        บันทึกข้อมูลเสร็จสิ้น
      </Typography>
      <center>
        <Stepper activeStep={activeStep} sx={{ pt: 5, pb: 5 }} className="col-md-10">
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </center>
      <React.Fragment>
        <Typography variant="h5" gutterBottom>
          สร้างรอบบันทึกใหม่เสร็จสิ้น
        </Typography>
        <Typography variant="subtitle1">
          Your order number is #2001539. We have emailed your order
          confirmation, and will send you an update when your order has
          shipped.
        </Typography>
      </React.Fragment>
      <Outlet />
    </>
  );
}