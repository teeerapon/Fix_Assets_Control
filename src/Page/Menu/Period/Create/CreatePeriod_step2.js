import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Outlet, useNavigate } from "react-router";
import swal from 'sweetalert';

const steps = ['กรอกข้อมูล', 'ตรวจสอบข้อมูล', 'เสร็จสิ้น'];


async function PeriodCreate(credentials) {
  return fetch('http://192.168.220.1:32001/api/craete_period', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

export default function AddressForm() {

  const data = JSON.parse(localStorage.getItem('data'));
  const DataCreatePeriod = JSON.parse(localStorage.getItem('DataCreatePeriod'));
  const valueBeginDate = (DataCreatePeriod.valueDateTime1).split('T')[0] + ' ' + '00:00'
  const valueEndDate = (DataCreatePeriod.valueDateTime2).split('T')[0] + ' ' + '23:59'
  const navigate = useNavigate();
  const [activeStep] = React.useState(1);

  const handleBack = () => {
    navigate("/CreatePeriod")
  };

  const handleSubmit = async e => {
    const BeginDate = (DataCreatePeriod.valueDateTime1).split('T')[0] + ' ' + '07:00:00'
    const EndDate = (DataCreatePeriod.valueDateTime2).split('T')[0] + ' ' + '06:59:00'
    const BranchID = DataCreatePeriod.valueBrachID1
    const Description = DataCreatePeriod.valueDescription
    e.preventDefault();
    if(DataCreatePeriod.valueDateTime1 != null && DataCreatePeriod.valueDateTime2 != null && DataCreatePeriod.valueDescription != null && DataCreatePeriod.valueBrachID1 != null){
      const response = await PeriodCreate({
        BeginDate,
        EndDate,
        BranchID,
        Description
      });
      if (response['data'] != 'มีการเปิดช่วงเวลาทับกัน'){
        if(response['data'] != 'ข้อมูลสาขาที่บันทึกไม่ถูกต้อง'){
          localStorage.removeItem("DataCreatePeriod");
          navigate("/CreatePeriod3")
        }else{
          swal("ทำรายการไม่สำเร็จ", response.data, "error");
        }
      }else {
        if(response['data'] == 'มีการเปิดช่วงเวลาทับกัน'){
          swal("ทำรายการไม่สำเร็จ", response.data + 'กับรอบตรวจนับที่ ' + response.wrongPeriod, "error");
        }else{
          swal("ทำรายการไม่สำเร็จ", response.data, "error");
        }
      }
    }
  }

  return (
    <>
      <Typography component="h1" variant="h4" align="center">
        <b>PURE THAI ENERGY CO.,LTD.</b>
      </Typography>
      <Typography component="h1" variant="h6" align="center" className='pt-2'>
        ขั้นตอนตรวจสอบข้อมูล
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
        <Typography variant="h6" gutterBottom>
          *กรุณากรอกข้อมูลให้ครบถ้วน
        </Typography>
        <Grid container spacing={3} className='pt-2'>
          <Grid item xs={12}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="ชื่อผู้เปิดรอบบันทึก"
              value={data.name}
              fullWidth
              autoComplete="given-name"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="beginDate"
              label='วันที่และเวลาเริ่มต้น'
              name="beginDate"
              inputFormat="yyyy/MM/dd hh:mm a"
              value={valueBeginDate}
              fullWidth
              autoComplete="family-name"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="beginDate"
              name="beginDate"
              label='วันที่และเวลาสิ้นสุด'
              inputFormat="yyyy/MM/dd hh:mm a"
              value={valueEndDate}
              fullWidth
              autoComplete="family-name"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="discription"
              name="discription"
              label='คำอธิบาย'
              value={DataCreatePeriod.valueDescription}
              fullWidth
              autoComplete="family-name"
              variant="standard"
            />
          </Grid>
          <>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                inputProps={{ min: 1, max: 150 }}
                min={1}
                id="branchID"
                name="branchID"
                label="สาขา"
                value={DataCreatePeriod.valueBrachID1 == 0 ? 'สาขาทั้งหมด' : 'สาขาที่ ' + DataCreatePeriod.valueBrachID1}
                type="text"
                fullWidth
              />
            </Grid>
          </>
        </Grid>
      </React.Fragment>
      <React.Fragment>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
            ย้อนกลับ
          </Button>

          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{ mt: 3, ml: 1 }}
          >
            เสร็จสิ้น
          </Button>
        </Box>
      </React.Fragment>
      <Outlet />
    </>
  );
}