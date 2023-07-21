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
import swal from 'sweetalert';
import Radio from '@mui/material/Radio';
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
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import dayjs from 'dayjs';
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterDateFns';
import de from 'date-fns/locale/de';
import DesktopDateTimePicker from '@mui/lab/DesktopDateTimePicker';

dayjs.extend(utc);
dayjs.extend(timezone);
var dateNow = (dayjs().utc().local().format()).split('+')[0]

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

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

  const data = JSON.parse(localStorage.getItem('data'));
  const navigate = useNavigate();
  const [showResults, setShowResults] = React.useState(false)
  const [valueDateTime1, setValueDateTime1] = React.useState(dateNow) //dayjs()
  const [valueDateTime2, setValueDateTime2] = React.useState(dateNow) //dayjs()
  const [valueDescription, setValueDescription] = React.useState()
  const [brachID1, setBrachID1] = React.useState()
  const [activeStep] = React.useState(0);
  const checkUserWeb = localStorage.getItem('sucurity');

  const [PositionName, setPositionName] = React.useState([]);
  const [topic, setTopic] = React.useState();
  const [PositionAPIName, setPositionAPIName] = React.useState([]);
  const [branchName, setBranchName] = React.useState([]);
  const [branchAPIName, setBranchAPIName] = React.useState([]);
  const [userGroupAPI, setUserGroupAPI] = React.useState([]); //DepCode
  const [userGroup, setUserGroup] = React.useState([]); //DepCode
  const [userGroupCenterAPI, setUserGroupCenterAPI] = React.useState([]); //DepCode
  const [userGroupCenter, setUserGroupCenter] = React.useState([]); //DepCode
  const [topicBranch, setTopicBranch] = React.useState();

  const handleChangeTopic = (event) => {
    setTopic(event.target.value);
  };

  const handleChangeTopicBranch = (event) => {
    setTopicBranch(event.target.value);
  };


  const handleDescription = (newValue) => {
    setValueDescription(newValue.target.value);
  };

  const toggleCheckbox = (event) => {

    setBrachID1(event.target.value)

    if (event.target.value === '1') {
      setTopic(null)
      setPositionName([])
      setShowResults(event.target.value)
    } else if (event.target.value === '2') {
      setTopicBranch(null);
      setBranchName([])
      setShowResults(event.target.value)
    }
  }

  const handleDateTime1 = (newValue) => {
    setValueDateTime2(newValue.toLocaleString("sv-SE"));
  };

  const handleDateTime2 = (newValue) => {
    setValueDateTime2(newValue.toLocaleString("sv-SE"));
  };

  const handleNext = async () => {

    let keyID = (Math.random() + 1).toString(36).substring(7);

    if (topicBranch === 0 && !topic && valueDescription) {

      const BeginDate = valueDateTime1
      const EndDate = valueDateTime2
      const BranchID = 0
      const Description = `${valueDescription} (CO)`
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
        swal("แจ้งเตือน", `เปิดรอบตรวจนับสำหรับ CO แล้ว`, "success", {
          buttons: false,
          timer: 1500,
        }).then((value) => {
          navigate('/EditPeriod')
        });
      }

    } else if (topicBranch === 1 && !topic && valueDescription) {

      const BeginDate = valueDateTime1
      const EndDate = valueDateTime2
      const BranchID = branchName.map((res) => res.branchid).join(`, `)
      const Description = `${valueDescription}`
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
        swal("แจ้งเตือน", `เปิดรอบตรวจนับสาขา ${branchName.map((res) => res.branchid).join(', ')} แล้ว`, "success", {
          buttons: false,
          timer: 1500,
        }).then((value) => {
          navigate('/EditPeriod')
        });
      }

    } else if (!topicBranch && topic === 0 && valueDescription) {

      const BeginDate = valueDateTime1
      const EndDate = valueDateTime2
      const BranchID = 901
      const Description = `${valueDescription} (HO)`
      const usercode = data.UserCode
      const response = await PeriodCreate({
        BeginDate,
        EndDate,
        BranchID,
        Description,
        usercode,
        keyID,
      });
      if (response.data[0]) {
        swal("แจ้งเตือน", `เปิดรอบตรวจนับสาขา HO แล้ว`, "success", {
          buttons: false,
          timer: 1500,
        }).then((value) => {
          navigate('/EditPeriod')
        });
      }

    } else if (!topicBranch && topic === 1 && valueDescription) {

      const BeginDate = valueDateTime1
      const EndDate = valueDateTime2
      const BranchID = 901
      const Description = `${valueDescription}`
      const usercode = data.UserCode
      const personID = userGroupCenter.map((res) => res.UserCode).join(', ')
      const response = await PeriodCreate({
        BeginDate,
        EndDate,
        BranchID,
        Description,
        usercode,
        personID,
        keyID,
      });
      if (response.data[0]) {
        swal("แจ้งเตือน", `เปิดรอบตรวจนับสาขา ${userGroupCenter.map((res) => res.UserCode).join(', ')} แล้ว`, "success", {
          buttons: false,
          timer: 1500,
        }).then((value) => {
          navigate('/EditPeriod')
        });
      }

    } else if (!topicBranch && topic === 2 && valueDescription) {

      const BeginDate = valueDateTime1
      const EndDate = valueDateTime2
      const BranchID = 901
      const Description = `${valueDescription}`
      const usercode = data.UserCode
      const depcode = PositionName.map((res) => res.depcode).join(', ')
      const response = await PeriodCreate({
        BeginDate,
        EndDate,
        BranchID,
        Description,
        usercode,
        depcode,
        keyID,
      });
      if (response.data[0]) {
        swal("แจ้งเตือน", `เปิดรอบตรวจนับสาขา ${PositionName.map((res) => res.depcode).join(', ')} แล้ว`, "success", {
          buttons: false,
          timer: 1500,
        }).then((value) => {
          navigate('/EditPeriod')
        });
      }

    } else if (!topicBranch && topic === 3 && valueDescription) {

      const BeginDate = valueDateTime1
      const EndDate = valueDateTime2
      const BranchID = 901
      const Description = `${valueDescription}`
      const usercode = data.UserCode
      const personID = userGroup.map((res) => res.UserCode).join(', ')
      const response = await PeriodCreate({
        BeginDate,
        EndDate,
        BranchID,
        Description,
        usercode,
        personID,
        keyID,
      });
      if (response.data[0]) {
        swal("แจ้งเตือน", `เปิดรอบตรวจนับสาขา ${userGroup.map((res) => res.UserCode).join(', ')} แล้ว`, "success", {
          buttons: false,
          timer: 1500,
        }).then((value) => {
          navigate('/EditPeriod')
        });
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
      setUserGroupAPI((res.data).filter((res) => res.BranchID === 901 && res.UserType !== 'CENTER'));
      setUserGroupCenterAPI((res.data).filter((res) => res.BranchID === 901 && res.UserType === 'CENTER'));
    })

    Axios.post(config.http + '/Department_List', body, { headers })
      .then(response => {
        var newArray = (response.data.data).filter((res) => res.depid > 14);
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
                    ข้อควรระวัง ไม่สามารถลงเวลาซ้ำกันได้
                  </Typography>
                </Alert>
                <LocalizationProvider dateAdapter={DateAdapter} adapterLocale={de}>
                  <DesktopDateTimePicker
                    label="วันที่และเวลาเริ่มต้น"
                    value={valueDateTime1}
                    onChange={handleDateTime1}
                    timezone={dayjs.tz.guess()}
                    inputFormat="yyyy-MM-dd HH:mm:ss"
                    ampm={false}
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
                <LocalizationProvider dateAdapter={DateAdapter} adapterLocale={de}>
                  <DesktopDateTimePicker
                    label="วันที่และเวลาสิ้นสุด"
                    value={valueDateTime2}
                    onChange={handleDateTime2}
                    timezone={dayjs.tz.guess()}
                    inputFormat="yyyy-MM-dd HH:mm:ss"
                    ampm={false}
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
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={<Radio
                  color="secondary"
                  id="0"
                  value={1}
                  onChange={toggleCheckbox}
                  checked={brachID1 === '1' ? true : false} />}
                label="CO"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={<Radio
                  color="secondary"
                  id="0"
                  value={2}
                  onChange={toggleCheckbox}
                  checked={brachID1 === '2' ? true : false} />}
                label="HO"
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
                      <InputLabel id="demo-multiple-checkbox-label">เลือกคำตอบ</InputLabel>
                      <Select
                        value={topicBranch}
                        onChange={handleChangeTopicBranch}
                        fullWidth
                        input={<OutlinedInput label="เลือกแผนก" />}
                      >
                        <MenuItem value={0}>ALL</MenuItem>
                        <MenuItem value={1}>SELECT BRANCH</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </Grid>
                {topicBranch === 1 ? (
                  <Grid item xs={12} sm={12}>
                    <Autocomplete
                      multiple
                      fullWidth
                      id="checkboxes-tags-demo"
                      options={branchAPIName}
                      disableCloseOnSelect
                      getOptionLabel={(option) => option.name}
                      onChange={(event, newValue) => {
                        setBranchName(newValue);
                      }}
                      renderOption={(props, option, { selected }) => (
                        <li {...props}>
                          <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                          />
                          {option.name}
                        </li>
                      )}
                      renderInput={(params) => (
                        <TextField {...params} label="เลือกแผนก" placeholder="Favorites" />
                      )}
                    />
                  </Grid>
                ) : null}
              </>
              : null
            }
            {showResults === '2' ?
              <>
                <Grid item xs={12} sm={12} mt={2}>
                  <p className='text-danger'>*หมายเหตุ กรุณาเลือกคำตอบ</p>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <div>
                    <FormControl fullWidth>
                      <InputLabel id="demo-multiple-checkbox-label">เลือกคำตอบ</InputLabel>
                      <Select
                        value={topic}
                        onChange={handleChangeTopic}
                        fullWidth
                        input={<OutlinedInput label="เลือกแผนก" />}
                      >
                        <MenuItem value={0}>ALL</MenuItem>
                        <MenuItem value={1}>CENTER</MenuItem>
                        <MenuItem value={2}>DEPRTMENTS</MenuItem>
                        <MenuItem value={3}>PERSON</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </Grid>
                {topic === 1 ? (
                  <Grid item xs={12} sm={12}>
                    <Autocomplete
                      multiple
                      fullWidth
                      id="checkboxes-tags-demo"
                      options={userGroupCenterAPI}
                      disableCloseOnSelect
                      getOptionLabel={(option) => option.UserCode}
                      onChange={(event, newValue) => {
                        setUserGroupCenter(newValue);
                      }}
                      renderOption={(props, option, { selected }) => (
                        <li {...props}>
                          <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                          />
                          {option.UserCode}
                        </li>
                      )}
                      renderInput={(params) => (
                        <TextField {...params} label="เลือกบุคคล" placeholder="Favorites" />
                      )}
                    />
                  </Grid>
                ) : null}
                {topic === 2 ? (
                  <Grid item xs={12} sm={12}>
                    <Autocomplete
                      multiple
                      fullWidth
                      id="checkboxes-tags-demo"
                      options={PositionAPIName}
                      disableCloseOnSelect
                      getOptionLabel={(option) => option.depcode}
                      onChange={(event, newValue) => {
                        setPositionName(newValue);
                      }}
                      renderOption={(props, option, { selected }) => (
                        <li {...props}>
                          <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                          />
                          {option.depcode}
                        </li>
                      )}
                      renderInput={(params) => (
                        <TextField {...params} label="เลือกแผนก" placeholder="Favorites" />
                      )}
                    />
                  </Grid>
                ) : null}
                {topic === 3 ? (
                  <Grid item xs={12} sm={12}>
                    <Autocomplete
                      multiple
                      fullWidth
                      id="checkboxes-tags-demo"
                      options={userGroupAPI}
                      disableCloseOnSelect
                      getOptionLabel={(option) => option.UserCode}
                      onChange={(event, newValue) => {
                        setUserGroup(newValue);
                      }}
                      renderOption={(props, option, { selected }) => (
                        <li {...props}>
                          <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                          />
                          {option.UserCode}
                        </li>
                      )}
                      renderInput={(params) => (
                        <TextField {...params} label="เลือกบุคคล" placeholder="Favorites" />
                      )}
                    />
                  </Grid>
                ) : null}
              </>
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
      </React.Fragment >

    );
  }
}