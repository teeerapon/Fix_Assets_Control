import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Outlet, useNavigate } from "react-router";
import swal from 'sweetalert';
import config from '../../../../config'

const steps = ['กรอกข้อมูล', 'ตรวจสอบข้อมูล', 'เสร็จสิ้น'];


async function PeriodCreate(credentials) {
  return fetch(config.http + '/craete_period', {
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
  const valueBeginDate = (DataCreatePeriod.valueDateTime1).split('T')[0] + ' 00:00'
  const valueEndDate = (DataCreatePeriod.valueDateTime2).split('T')[0] + ' 00:00'
  const navigate = useNavigate();
  const [activeStep] = React.useState(1);
  const checkUserWeb = localStorage.getItem('sucurity');

  const handleBack = () => {
    navigate("/CreatePeriod")
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const BeginDate = (DataCreatePeriod.valueDateTime1).split('T')[0] + ' 7:00:00'
    const EndDate = (DataCreatePeriod.valueDateTime2).split('T')[0] + ' 7:00:00'
    const BranchID = DataCreatePeriod.valueBrachID1
    const Description = DataCreatePeriod.valueDescription
    const usercode = data.UserCode
    if (DataCreatePeriod.valueDateTime1 !== undefined && DataCreatePeriod.valueDateTime2 !== undefined && DataCreatePeriod.valueDescription !== undefined && DataCreatePeriod.valueBrachID1 !== undefined) {
      const response = await PeriodCreate({
        BeginDate,
        EndDate,
        BranchID,
        Description,
        usercode
      });
      if (response.data[0]) {
        swal("ทำรายการสำเร็จ", `เปิดรอบตรวจนับสาขา ${BranchID === ('901' || 901) ? 'HO' : BranchID} แล้ว`, "success", {
          buttons: false,
          timer: 1500,
        }).then((value) => {
          navigate('/EditPeriod')
        });
      } else {
        swal("ทำรายการไม่สำเร็จ", 'กรุณาลองใหม่อีกครั้ง', "error");
      }
    }
  }

  if (checkUserWeb === 'null') {
    window.location.href = '/NAC_MAIN';
  } else {
    return (
      <>
        <Typography component="h1" variant="h4" align="center" class="font-sm">
          <b>PURE THAI ENERGY CO.,LTD.</b>
        </Typography>
        <Typography component="h1" variant="h6" align="center" className='pt-2 font-vsm'>
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
              <Stack spacing={3}>
                <Alert variant="outlined" severity="error">
                  <Typography variant="body" color='error' >
                    วันที่สิ้นสุด (2022-10-11 0.00 น.) ผลลัพธ์คือ (2022-10-10 24.00 น.)
                  </Typography>
                </Alert>
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
              </Stack>
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
                  value={(DataCreatePeriod.valueBrachID1 === 0 || DataCreatePeriod.valueBrachID1 === '0') ? 'สาขาทั้งหมด' : 'สาขาที่ ' + DataCreatePeriod.valueBrachID1}
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
}