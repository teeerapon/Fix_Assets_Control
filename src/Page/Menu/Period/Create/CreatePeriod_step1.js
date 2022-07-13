import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterDateFns';
import swal from 'sweetalert';
import Radio from '@mui/material/Radio';
import DatePicker from '@mui/lab/DatePicker';
import { Outlet, useNavigate } from "react-router";

const steps = ['กรอกข้อมูล', 'ตรวจสอบข้อมูล', 'เสร็จสิ้น'];

export default function AddressForm() {

  // ใช้สำหรับสร้างเวลาปัจจุบัน
  const d = new Date();
  const year = (d.getFullYear()).toString();
  const month = ((d.getMonth()) + 101).toString().slice(-2);
  const date = ((d.getDate()) + 100).toString().slice(-2);
  const hours = ((d.getHours()) + 100).toString().slice(-2);
  const mins = ((d.getMinutes()) + 100).toString().slice(-2);
  const seconds = ((d.getSeconds()) + 100).toString().slice(-2);
  const datenow = `${year}-${month}-${date}T${hours}:${mins}:${seconds}.000Z`;

  const data = JSON.parse(localStorage.getItem('data'));
  const navigate = useNavigate();
  const [showResults, setShowResults] = React.useState(false)
  const [valueDateTime1, setValueDateTime1] = React.useState(datenow) //datenow
  const [valueDateTime2, setValueDateTime2] = React.useState(datenow) //datenow
  const [valueDescription, setValueDescription] = React.useState()
  const [valueBrachID1, setValueBrachID1] = React.useState()
  const [brachID1, setBrachID1] = React.useState()
  const [activeStep] = React.useState(0);


  const handleDescription = (newValue) => {
    setValueDescription(newValue.target.value);
  };

  const toggleCheckbox = (event) => {
    setBrachID1(event.target.value)
    if (event.target.value == '0') {
      setValueBrachID1(0);
      setShowResults(showResults => false)
    } else {
      setShowResults(showResults => true)
    }
  }

  const handleDateTime1 = (newValue) => {
    setValueDateTime1(newValue);
  };

  const handleBranchID = (newValue) => {
    setValueBrachID1(newValue.target.value);
  };

  const handleDateTime2 = (newValue) => {
    setValueDateTime2(newValue);
  };

  const handleNext = () => {
    if (brachID1 != null && valueDateTime1 != null && valueDateTime2 != null && valueDescription != null && valueBrachID1 != null) {
      localStorage.setItem('DataCreatePeriod', JSON.stringify({ brachID1, valueDateTime1, valueDateTime2, valueDescription, valueBrachID1 }));
      navigate("/CreatePeriod2")
    } else if (valueBrachID1 == null) {
      swal("ทำรายการไม่สำเร็จ", "กรุณากรอกข้อมูลหมายเลขสาขา", "warning")
    } else {
      swal("ทำรายการไม่สำเร็จ", "กรุณากรอกข้อมูลในครบถ้วน", "warning")
    }
    //console.warn(new Date(valueDateTime1).toISOString().split('T')[0])
    //console.warn(new Date(valueDateTime2).toISOString().split('T')[0])
  };

  return (
    <React.Fragment>
      <Typography component="h1" variant="h4" align="center">
        <b>PURE THAI ENERGY CO.,LTD.</b>
      </Typography>
      <Typography component="h1" variant="h6" align="center" className='pt-2'>
        ขั้นตอนการกรอกข้อมูล
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
              id="fulltName"
              name="fulltName"
              label="ชื่อผู้เปิดรอบบันทึก"
              value={data.name}
              fullWidth
              autoComplete="given-name"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={3}>
              <LocalizationProvider dateAdapter={DateAdapter}>
                <DatePicker
                  label="วันที่และเวลาเริ่มต้น"
                  value={valueDateTime1}
                  onChange={handleDateTime1}
                  inputFormat="yyyy-MM-dd 00:00"
                  renderInput={(params) =>
                    <TextField
                      fullWidth
                      autoComplete="family-name"
                      variant="standard"
                      {...params} />}
                />
              </LocalizationProvider>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={3}>
              <LocalizationProvider dateAdapter={DateAdapter}>
                <DatePicker
                  label="วันที่และเวลาสิ้นสุด"
                  value={valueDateTime2}
                  onChange={handleDateTime2}
                  inputFormat="yyyy-MM-dd 23:59"
                  renderInput={(params) =>
                    <TextField
                      fullWidth
                      autoComplete="family-name"
                      variant="standard"
                      {...params} />}
                />
              </LocalizationProvider>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="discription"
              name="discription"
              onChange={handleDescription}
              value={valueDescription == undefined ? '' : valueDescription}
              helperText="กรุณาเลือกตัวเลือกอย่างน้อย 1 อย่าง"
              fullWidth
              autoComplete="family-name"
              variant="standard"
            />
          </Grid>
          {showResults ?
            <>
              <Grid item xs={12} sm={6} mt={2}>
                <p className='text-danger'>*หมายเหตุ กรุณาระบุสาขาให้ถูกต้อง</p>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  inputProps={{ min: 1 }}
                  min={1}
                  id="branchID"
                  name="branchID"
                  onChange={handleBranchID}
                  label="สาขา"
                  type="number"
                  fullWidth
                />
              </Grid>
            </>
            : null
          }
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={<Radio
                color="secondary"
                id="1"
                value={0}
                defaultChecked
                onChange={toggleCheckbox}
                checked={brachID1 == 0 ? true : false} />}
              label="เปิดทุกสาขา"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={<Radio
                color="secondary"
                id="0"
                value={1}
                onChange={toggleCheckbox}
                checked={brachID1 == 1 ? true : false} />}
              label="เปิดเฉพาะบางสาขา"
            />
          </Grid>
        </Grid>
      </React.Fragment>
      <React.Fragment>
        <React.Fragment>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              onClick={handleNext}
              sx={{ mt: 3, ml: 1 }}
            >
              ต่อไป
            </Button>
          </Box>
        </React.Fragment>
      </React.Fragment>
      <Outlet />
    </React.Fragment>

  );
}