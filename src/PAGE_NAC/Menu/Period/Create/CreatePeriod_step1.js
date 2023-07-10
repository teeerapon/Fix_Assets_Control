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
import Alert from '@mui/material/Alert';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterDateFns';
import swal from 'sweetalert';
import Radio from '@mui/material/Radio';
import DatePicker from '@mui/lab/DatePicker';
import { Outlet, useNavigate } from "react-router";
import '../../../../App.css'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Axios from "axios"
import config from '../../../../config.js'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

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

  // ใช้สำหรับสร้างเวลาปัจจุบัน
  const d = new Date();
  const year = (d.getFullYear()).toString();
  const month = ((d.getMonth()) + 101).toString().slice(-2);
  const date = ((d.getDate()) + 100).toString().slice(-2);
  const datenow = `${year}-${month}-${date}T00:00:00.000Z`;

  const data = JSON.parse(localStorage.getItem('data'));
  const navigate = useNavigate();
  const [showResults, setShowResults] = React.useState(false)
  const [valueDateTime1, setValueDateTime1] = React.useState(datenow) //datenow
  const [valueDateTime2, setValueDateTime2] = React.useState(datenow) //datenow
  const [valueDescription, setValueDescription] = React.useState()
  const [brachID1, setBrachID1] = React.useState()
  const [activeStep] = React.useState(0);
  const checkUserWeb = localStorage.getItem('sucurity');

  const [PositionName, setPositionName] = React.useState([]);
  const [PositionAPIName, setPositionAPIName] = React.useState([]);
  const [branchName, setBranchName] = React.useState([]);
  const [branchAPIName, setBranchAPIName] = React.useState([]);
  const [checked, setChecked] = React.useState([true, false]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPositionName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleBranchID = (event) => {
    const {
      target: { value },
    } = event;
    setBranchName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };


  const handleDescription = (newValue) => {
    setValueDescription(newValue.target.value);
  };

  const toggleCheckbox = (event) => {

    setBrachID1(event.target.value)

    if (event.target.value === '0') {
      setShowResults(event.target.value)
    } else if (event.target.value === '1') {
      setPositionName([])
      setShowResults(event.target.value)
    } else if (event.target.value === '2') {
      setBranchName([])
      setShowResults(event.target.value)
    }
  }

  const handleDateTime1 = (newValue) => {
    setValueDateTime1(newValue);
  };

  const handleDateTime2 = (newValue) => {
    setValueDateTime2(newValue);
  };

  const handleNext = async () => {

    let keyID = (Math.random() + 1).toString(36).substring(7);

    if (brachID1 === '0' && valueDescription) {

      const BeginDate = valueDateTime1 === datenow ? datenow : (valueDateTime1).toISOString().split('T')[0] + ' 7:00:00'
      const EndDate = valueDateTime2 === datenow ? datenow : (valueDateTime2).toISOString().split('T')[0] + ' 7:00:00'
      const BranchID = brachID1
      const Description = valueDescription
      const usercode = data.UserCode
      const response = await PeriodCreate({
        BeginDate,
        EndDate,
        BranchID,
        Description,
        usercode,
        keyID
      });
      if (response.data[0]) {
        swal("แจ้งเตือน", `เปิดรอบตรวจนับสำหรับ HO แล้ว`, "success", {
          buttons: false,
          timer: 1500,
        }).then((value) => {
          navigate('/EditPeriod')
        });
      }

    } else if (branchName.length === 0 && PositionName.length > 0 && brachID1 === '2' && valueDescription) {

      for (let i = 0; i < PositionName.length; i++) {
        const BeginDate = valueDateTime1 === datenow ? datenow : (valueDateTime1).toISOString().split('T')[0] + ' 7:00:00'
        const EndDate = valueDateTime2 === datenow ? datenow : (valueDateTime2).toISOString().split('T')[0] + ' 7:00:00'
        const BranchID = 901
        const Description = `${valueDescription} (แผนก ${PositionName[i]})`
        const usercode = data.UserCode
        const depcode = PositionName[i]
        const response = await PeriodCreate({
          BeginDate,
          EndDate,
          BranchID,
          Description,
          usercode,
          depcode,
          keyID,
        });
        if (response.data[0] && (i + 1 === PositionName.length)) {
          swal("แจ้งเตือน", `เปิดรอบตรวจนับสาขา ${PositionName.join(', ')} แล้ว`, "success", {
            buttons: false,
            timer: 1500,
          }).then((value) => {
            navigate('/EditPeriod')
          });
        }
      }

    } else if (branchName.length > 0 && PositionName.length === 0 && brachID1 === '1' && valueDescription) {

      for (let i = 0; i < branchName.length; i++) {
        const BeginDate = valueDateTime1 === datenow ? datenow : (valueDateTime1).toISOString().split('T')[0] + ' 7:00:00'
        const EndDate = valueDateTime2 === datenow ? datenow : (valueDateTime2).toISOString().split('T')[0] + ' 7:00:00'
        const BranchID = branchName[i]
        const Description = `${valueDescription} (สาขา ${branchName === 1000001 ? 'CJ001' : branchName === 1000002 ? 'CJ002' : branchName === 1000003 ? 'PUREPARK' : branchName === 1000004 ? 'CJ003' : branchName})`
        const usercode = data.UserCode
        const response = await PeriodCreate({
          BeginDate,
          EndDate,
          BranchID,
          Description,
          usercode,
          keyID
        });
        if (response.data[0] && (i + 1 === branchName.length)) {
          swal("แจ้งเตือน", `เปิดรอบตรวจนับสาขา ${branchName.join(', ')} แล้ว`, "success", {
            buttons: false,
            timer: 1500,
          }).then((value) => {
            navigate('/EditPeriod')
          });
        }
      }
    } else {
      swal("แจ้งเตือน", "กรูณาระบุข้อมูลให้ครบถ้วน", "warning")
    }
  };

  React.useEffect(() => {
    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };

    const body = {
      "branchid": data.branchid
    }

    Axios.get(config.http + `/users`, { headers }).then((res) => {
      console.log(res.data);
    })

    Axios.post(config.http + '/Department_List', body, { headers })
      .then(response => {

        var newArray = (response.data.data).filter((res) => res.depid > 14);

        newArray.unshift({
          depid: 0,
          branchid: 901,
          depcode: "ALL",
          depname: "HO ALL",
          name: "HO ALL",
        })

        newArray.push({
          depid: 1,
          branchid: 901,
          depcode: "IT CENTER",
          depname: "IT Center",
          name: "IT Center",
          userid: 19
        },
          {
            depid: 22,
            branchid: 901,
            depcode: "TRAINING",
            depname: "TRAINING CENTER",
            name: "TRAINING CENTER",
            userid: 249
          },
          {
            depid: 29,
            branchid: 901,
            depcode: "BANGBAN",
            depname: "W1 Bang Ban",
            name: "W1 Bang Ban",
            userid: 249
          },
          {
            depid: 0,
            branchid: 901,
            depcode: "ADMIN",
            depname: "ADMIN CENTER",
            name: "ADMIN CENTER",
            userid: 251
          });

        setPositionAPIName(newArray)
      });

    Axios.get(config.http + '/Branch_ListAll', { headers })
      .then(response => {
        setBranchAPIName((response.data.data).filter((res) => res.branchid <= 120 ||
          res.branchid === 1000001 || res.branchid === 1000002 || res.branchid === 1000003 || res.branchid === 1000004
        ));
      });

  }, []);

  if (checkUserWeb === 'null') {
    window.location.href = '/NAC_MAIN';
  } else {
    return (
      <React.Fragment>
        <center>
          <Typography component="h1" variant="h4" align="center" class="font-sm">
            <b>PURE THAI ENERGY CO.,LTD.</b>
          </Typography>
          <Typography component="h1" variant="h6" align="center" className='pt-2 font-vsm'>
            ขั้นตอนการกรอกข้อมูล
          </Typography>
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
                <Alert variant="outlined" severity="error">
                  <Typography variant="body" color='error' >
                    วันที่สิ้นสุด (2022-10-11 0.00 น.) ผลลัพธ์คือ (2022-10-10 24.00 น.)
                  </Typography>
                </Alert>
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
                <TextField
                  required
                  id="discription"
                  name="discription"
                  label='คำอธิบาย'
                  onChange={handleDescription}
                  value={valueDescription}
                  fullWidth
                  autoComplete="family-name"
                  variant="standard"
                />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControlLabel
                control={<Radio
                  color="secondary"
                  id="1"
                  value={0}
                  defaultChecked
                  onChange={toggleCheckbox}
                  checked={brachID1 === '0' ? true : false} />}
                label="เปิดทุกสาขา"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControlLabel
                control={<Radio
                  color="secondary"
                  id="0"
                  value={1}
                  onChange={toggleCheckbox}
                  checked={brachID1 === '1' ? true : false} />}
                label="บางสาขา"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControlLabel
                control={<Radio
                  color="secondary"
                  id="0"
                  value={2}
                  onChange={toggleCheckbox}
                  checked={brachID1 === '2' ? true : false} />}
                label="สำนักงาน"
              />
            </Grid>
            {showResults === '1' ?
              <>
                <Grid item xs={12} sm={12} mt={2}>
                  <p className='text-danger'>*หมายเหตุ กรุณาเลือกสาขา</p>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <div>
                    <FormControl fullWidth>
                      <InputLabel id="demo-multiple-checkbox-label">เลือกสาขา</InputLabel>
                      <Select
                        multiple
                        value={branchName}
                        onChange={handleBranchID}
                        fullWidth
                        input={<OutlinedInput label="เลือกสาขา" />}
                        renderValue={(selected) => `สาขาที่ ${selected.join(', สาขาที่ ')}`}
                        MenuProps={MenuProps}
                      >
                        {branchAPIName.map((res) => (
                          <MenuItem key={res.branchid} value={res.branchid}>
                            <Checkbox checked={branchName.indexOf(res.branchid) > -1} />
                            <ListItemText primary={`สาขาที่ ${res.branchid === 1000001 ? 'CJ001' :
                              res.branchid === 1000002 ? 'CJ002' :
                                res.branchid === 1000003 ? 'PUREPARK' :
                                  res.branchid === 1000004 ? 'CJ003' : res.branchid
                              }`} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </Grid>
              </>
              : null
            }
            {showResults === '2' ?
              <div>
                <Grid item xs={12} sm={12} mt={2}>
                  <p className='text-danger'>*หมายเหตุ กรุณาเลือกแผนก</p>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <div>
                    <FormControl fullWidth>
                      <InputLabel id="demo-multiple-checkbox-label">เลือกแผนก</InputLabel>
                      <Select
                        multiple
                        value={PositionName}
                        onChange={handleChange}
                        fullWidth
                        input={<OutlinedInput label="เลือกแผนก" />}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                      >
                        {PositionAPIName.map((res) => (
                          <MenuItem key={res.depcode} value={res.depcode}>
                            <Checkbox checked={PositionName.indexOf(res.depcode) > -1} />
                            <ListItemText primary={res.depcode} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </Grid>
              </div>
              : null
            }
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
                Submit
              </Button>
            </Box>
          </React.Fragment>
        </React.Fragment>
        <Outlet />
      </React.Fragment>

    );
  }
}