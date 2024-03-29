import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import AnimatedPage from '../../../../AnimatedPage';
import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { alpha, styled } from '@mui/material/styles';
import { DataGrid, gridClasses, GridToolbar } from '@mui/x-data-grid';
import Axios from "axios"
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import * as XLSX from 'xlsx';
import LinearProgress from '@mui/material/LinearProgress';
import config from '../../../../config'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import CircularProgress from '@mui/material/CircularProgress';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress sx={{ fontSize: 100 }} variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="body2" component="div">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};


const ODD_OPACITY = 0.2;

const other = {
  showCellRightBorder: true,
  showColumnRightBorder: true,
};

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  '.css-1knaqv7-MuiButtonBase-root-MuiButton-root': {
    color: 'rgba(0, 0, 0, 1)',
  },
  '.css-f3jnds-MuiDataGrid-columnHeaders': {
    backgroundColor: 'rgba(0, 0, 0, 1)',
    color: 'rgba(255, 255, 255,1)',
  },
  '.css-1s0hp0k-MuiDataGrid-columnHeadersInner': {
    backgroundColor: 'rgba(0, 0, 0, 1)',
    color: 'rgba(255, 255, 255, 1)',
    '.css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root': {
      color: 'rgba(255, 255, 255, 1)',
      display: 'none'
    },
    '.css-1pe4mpk-MuiButtonBase-root-MuiIconButton-root': {
      color: 'rgba(255, 255, 255,1)'
    },
  },
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[100],
    '&:hover, &.Mui-hovered': {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    '&.Mui-selected': {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity,
      ),
      '&:hover, &.Mui-hovered': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
          theme.palette.action.selectedOpacity +
          theme.palette.action.hoverOpacity,
        ),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  },
  [`& .${gridClasses.row}.odd`]: {
    '&:hover, &.Mui-hovered': {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    '&.Mui-selected': {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity,
      ),
      '&:hover, &.Mui-hovered': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
          theme.palette.action.selectedOpacity +
          theme.palette.action.hoverOpacity,
        ),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  },
}));

export default function History_of_assets() {

  const [dataHistory, setDataHistory] = React.useState([]);
  const data = JSON.parse(localStorage.getItem('data'));
  const checkUserWeb = localStorage.getItem('sucurity');
  const [open, setOpen] = React.useState(false);
  const [bac_type, setBac_type] = React.useState();
  const [name, setName] = React.useState();
  const [serialNo, setSerialNo] = React.useState();
  const [price, setPrice] = React.useState();
  const [details, setDetails] = React.useState();
  const [branchID, setBranchID] = React.useState();
  const [pageSize, setPageSize] = React.useState(10);
  const [dataFile, setDataFile] = React.useState();
  const [field, setField] = React.useState()
  const [openXlsx, setOpenXlsx] = React.useState(false);
  const [nameExcel, setNameExcel] = React.useState()
  const [permission_menuID, setPermission_menuID] = React.useState();
  const [progress, setProgress] = React.useState();
  const [status_all] = React.useState(['none', 'สภาพดี', 'ชำรุด', 'สูญหาย', 'คืนผู้ร่วมแล้ว', 'ไม่ระบุในสัญญา (สภาพดี)', 'ไม่ระบุในสัญญา (ชำรุด)', 'ไม่ระบุในสัญญา (สูญหาย)', 'ไม่ระบุในสัญญา (คืนผู้ร่วมแล้ว)']);
  const [openSendMail, setOpenSendMail] = React.useState(false);
  const [arraySubmitSendMail, setArraySubmitSendMail] = React.useState()
  const [valueOfIndex, setValueOfIndex] = React.useState();
  const [mailto, setMailto] = React.useState({ ME: true, KTT: false, GRP: false, ROD: false });
  const [user_name, setUser_name] = React.useState();
  const [user_Lastname, setUser_Lastname] = React.useState();
  const [progressIcon, setProgressIcon] = React.useState(0);
  const [nameImage2, setNameImage2] = React.useState();

  const handleClick_Value = async (newSelectionModel) => {
    setValueOfIndex(newSelectionModel);
    setArraySubmitSendMail(dataHistory.filter((res) => newSelectionModel.includes(res.AssetID)));
  }

  const handleSubmit_SendMail = async () => {

    if (user_name && user_Lastname) {

      const headers = {
        'Authorization': 'application/json; charset=utf-8',
        'Accept': 'application/json'
      };

      await Axios.post(config.http + '/FA_Control_BPC_Running_NO', data, { headers })
        .then(async (resTAB) => {
          for (let i = 0; i < arraySubmitSendMail.length; i++) {
            const bodyDetails =
            {
              "userCode": data.UserCode,
              "Code": arraySubmitSendMail[i].Code,
              "Details": arraySubmitSendMail[i].Details,
              "keyID": resTAB.data[0].TAB,
              "Comments": arraySubmitSendMail[i].Comments,
              "image_1": arraySubmitSendMail[i].image_1,
              "image_2": arraySubmitSendMail[i].image_2,
              "user_name": `${user_name} ${user_Lastname}`,
            }
            await Axios.post(config.http + '/FA_Control_BPC_UpdateDetails', bodyDetails, { headers })

            setProgressIcon((i / arraySubmitSendMail.length) * 100)
          }
          setOpenSendMail(false);
          swal("แจ้งเตือน", 'ทำรายการสำเร็จ', "success", { buttons: false, timer: 2000 }).then((value) => {
            window.location.href = '/FA_Control_BPC_SELECT_TEMP?keyID=' + resTAB.data[0].TAB
          })
        });
    } if (!user_name && !user_Lastname) {
      swal("แจ้งเตือน", 'กรุณากรอกชื่อและนามสกุล (ผู้ทำรายการ)', "warning")
    }

  };

  React.useEffect(async () => {
    // POST request using axios with set headers
    const body = { Permission_TypeID: 1, userID: data.userid }
    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };
    await Axios.post(config.http + '/select_Permission_Menu_NAC', body, { headers }).catch(function (error) {
      if (error.toJSON().message === 'Request failed with status no 400') {
        setProgress(1)
      }
    }).then(response => {
      setPermission_menuID(response.data.data.map((res) => res.Permission_MenuID))
      setProgress(1)
    });
  }, []);

  const fileSelected = (event) => {
    event.preventDefault();
    var files = event.target.files, f = files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
      var data = e.target.result;
      let readedData = XLSX.read(data, { type: 'binary', cellText: false, cellDates: true });
      const wsname = readedData.SheetNames[0];
      const ws = readedData.Sheets[wsname];

      /* Convert array to json*/
      const columnsHeader = XLSX.utils.sheet_to_json(ws, { header: 1, raw: false, dateNF: 'dd/mm/yyyy', rawNumbers: false });
      const dataParse = XLSX.utils.sheet_to_json(ws, { range: 1, header: columnsHeader[0], raw: false, dateNF: 'dd/mm/yyyy' });
      const col = columnsHeader[0]
      let arrayField = []

      for (let i = 0; i < col.length; i++) {
        if (col[i] === 'BranchID' || col[i] === 'Price' || col[i] === 'Position' || col[i] === 'OwnerCode' || col[i] === 'No' || col[i] === 'bac_type') {
          arrayField[i] = {
            field: col[i],
            width: 80,
          }
        } else {
          arrayField[i] = {
            field: col[i],
            flex: 1,
          }
        }
      }
      if (columnsHeader[0].indexOf('No') >= 0) {
        setField(arrayField)
        setDataFile(dataParse)
        setOpenXlsx(true)
        setNameExcel(f.name)
      } else {
        swal("แจ้งเตือน", 'ไม่พบหัวข้อรหัสทรัพย์สิน (No !)', "error")
      }
    };
    reader.readAsBinaryString(f)
  }

  const handleCloseXlsx = () => {
    setOpenXlsx(false);
  };

  const handleSubmitXlsx = async () => {
    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };

    if (
      field[0].field === 'No' &&
      field[1].field === 'Name' &&
      field[2].field === 'OwnerCode' &&
      field[3].field === 'BranchID' &&
      field[4].field === 'SerialNo' &&
      field[5].field === 'Price' &&
      field[6].field === 'Position' &&
      field[7].field === 'Details' &&
      field[8].field === 'bac_type' &&
      user_name && user_Lastname
    ) {
      await Axios.post(config.http + '/FA_Control_BPC_Running_NO', data, { headers })
        .then(async (resTAB) => {
          for (let i = 0; i < dataFile.length; i++) {
            const body = {
              UserCode: data.UserCode
              , bac_type: dataFile[i].bac_type
              , Name: dataFile[i].Name
              , OwnerCode: dataFile[i].OwnerCode
              , BranchID: dataFile[i].BranchID
              , SerialNo: dataFile[i].SerialNo
              , Price: dataFile[i].Price
              , Position: dataFile[i].Position
              , Details: !dataFile[i].Details ? 'สภาพดี' : dataFile[i].Details
              , keyID: resTAB.data[0].TAB
              , user_name: `${user_name} ${user_Lastname}`,
            }
            await Axios.post(config.http + '/FA_Control_New_Assets_Xlsx', body, { headers })
              .then((response) => {
                if (response.data[0].res) {
                  setOpenXlsx(false)
                  setOpenSendMail(false);
                  setOpen(false)
                  setBac_type(null)
                  setName(null)
                  setSerialNo(null)
                  setPrice(null)
                  setDetails(null)
                  swal("แจ้งเตือน", response.data[0].res, "error")
                } else {
                  setProgressIcon((i / (dataFile.length - 1)) * 100)
                  if (((i / (dataFile.length - 1)) * 100) === 100) {
                    setOpenXlsx(false)
                    setOpenSendMail(false);
                    setOpen(false)
                    setBac_type(null)
                    setName(null)
                    setSerialNo(null)
                    setPrice(null)
                    setDetails(null)
                    swal("แจ้งเตือน", 'ทำรายการสำเร็จ', "success", { buttons: false, timer: 2000 }).then((value) => {
                      window.location.href = '/FA_Control_BPC_SELECT_TEMP?keyID=' + resTAB.data[0].TAB
                    })
                  }
                }
              })
          }
        })
    } else if (!user_name && !user_Lastname) {
      swal("แจ้งเตือน", 'กรุณากรอกชื่อและนามสกุล (ผู้ทำรายการ)', "warning")
    } else {
      swal("แจ้งเตือน", 'ข้อมูล (Columns) ไม่ถูกต้อง กรุณาตรวจสอบ', "warning")
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setBac_type(null)
    setName(null)
    setSerialNo(null)
    setPrice(null)
    setDetails(null)
  };

  const handleSubmit_Add = async () => {

    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };

    if (user_name && user_Lastname) {
      await Axios.post(config.http + '/FA_Control_BPC_Running_NO', data, { headers })
        .then(async (resTAB) => {
          const body = {
            UserCode: data.UserCode,
            bac_type: bac_type,
            Name: name,
            BranchID: branchID,
            Details: details,
            SerialNo: serialNo,
            Price: price,
            keyID: resTAB.data[0].TAB,
            image_2: nameImage2,
            "user_name": `${user_name} ${user_Lastname}`,
          }
          const headers = {
            'Authorization': 'application/json; charset=utf-8',
            'Accept': 'application/json'
          };
          if (!bac_type) {
            swal("แจ้งเตือน", 'กรุณากรอกลำดับเลขที่', "error")
          } else if (!name) {
            swal("แจ้งเตือน", 'กรุณากรอกชื่อทรัพย์สินให้ถูกต้อง', "error")
          } else if (!branchID || branchID < 1) {
            swal("แจ้งเตือน", 'กรุณากรอกสาขาให้ถูกต้อง', "error")
          } else if (!price) {
            swal("แจ้งเตือน", 'กรุณากรอกราคาให้ถูกต้อง', "error")
          } else {
            await Axios.post(config.http + '/FA_Control_New_Assets', body, { headers })
              .then(async (response) => {
                if (response.data !== undefined) {
                  setOpenSendMail(false);
                  setOpen(false);
                  setBac_type(null)
                  setName(null)
                  setSerialNo(null)
                  setPrice(null)
                  setDetails(null)
                  swal("แจ้งเตือน", 'ดำเนินการเสร็จสิ้น', "success", { buttons: false, timer: 2000 }).then((value) => {
                    window.location.href = '/FA_Control_BPC_SELECT_TEMP?keyID=' + resTAB.data[0].TAB
                  })
                }
              });
          }
        })
    } if (!user_name && !user_Lastname) {
      swal("แจ้งเตือน", 'กรุณากรอกชื่อและนามสกุล (ผู้ทำรายการ)', "warning")
    }
  };

  const handleChange_Code = (event) => {
    setBac_type(event.target.value)
  }
  const handleChange_Name = (event) => {
    setName(event.target.value)
  }
  const handleChange_SerialNo = (event) => {
    setSerialNo(event.target.value)
  }
  const handleChange_Price = (event) => {
    setPrice(event.target.value)
  }
  const handleChange_Details = (event) => {
    setDetails(event.target.value)
  }
  const handleChange_BranchID = (event) => {
    setBranchID(event.target.value)
  }

  const columns_Mail = [
    { field: 'Code', headerName: 'รหัสทรัพย์สิน', headerClassName: 'super-app-theme--header', minWidth: 150, flex: 1, headerAlign: 'center', align: 'center', },
    { field: 'Name', headerName: 'ชื่อ', headerClassName: 'super-app-theme--header', minWidth: 150, flex: 1, },
    { field: 'OwnerID', headerName: 'ผู้ถือครอง', headerClassName: 'super-app-theme--header', width: 100, headerAlign: 'center', align: 'center', },
    {
      field: 'Position',
      headerName: 'Location NAC',
      headerClassName: 'super-app-theme--header',
      width: 100,
      headerAlign: 'center',
      align: 'center',
      valueGetter: (params) =>
        params.row.BranchID === 901 ? 'HO' : params.row.Position,
    },
    {
      field: 'Details',
      headerName: 'สถานะปัจจุบัน',
      headerClassName: 'super-app-theme--header',
      minWidth: 150,
      flex: 1,
      renderCell: (params) => {
        const handleChange_select = async (event, params) => {

          arraySubmitSendMail.forEach(function (x, index) {
            if (x.AssetID === params.row.AssetID) {
              const list = [...arraySubmitSendMail]
              list[index]['Details'] = event.target.value
              setArraySubmitSendMail(list)
            }
          })
        };

        return (
          <React.Fragment>
            <FormControl fullWidth size="small">
              <Select
                label={false}
                value={!params.row.Details ? 'none' : params.row.Details === 'ไม่ระบุในสัญญา' ? 'ไม่ระบุในสัญญา (สภาพดี)' : params.row.Details}
                onChange={(event) => handleChange_select(event, params)}
              >
                {status_all.map((status) => (<MenuItem value={status}>{status}</MenuItem>))}
              </Select>
            </FormControl>
          </React.Fragment >
        )
      }
    },
    {
      field: 'Comments',
      headerName: 'Comments',
      headerClassName: 'super-app-theme--header',
      minWidth: 150,
      flex: 1,
      renderCell: (params) => {
        const handleChange_comments = async (event, params) => {
          arraySubmitSendMail.forEach(function (x, index) {
            if (x.AssetID === params.row.AssetID) {
              const list = [...arraySubmitSendMail]
              list[index]['Comments'] = event.target.value
              setArraySubmitSendMail(list)
            }
          })
        }

        return (
          <React.Fragment>
            <TextField
              id="outlined-multiline-flexible"
              size='small'
              value={params.row.Comments}
              multiline
              onChange={(event) => handleChange_comments(event, params)}
              label="Comments..."
            />
          </React.Fragment >
        )
      }
    },
    {
      field: 'ImagePath_2',
      headerName: 'Images 2',
      headerClassName: 'super-app-theme--header',
      width: 200,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {

        const handleUploadFile_2 = async (e, params) => {
          e.preventDefault();

          const headers = {
            'Authorization': 'application/json; charset=utf-8',
            'Accept': 'application/json'
          };

          if (['csv', 'xls', 'txt', 'ppt', 'doc', 'pdf', 'jpg', 'png', 'gif'].indexOf((e.target.files[0].name).split('.').pop()) > -1) {

            const formData_2 = new FormData();
            formData_2.append("file", e.target.files[0]);
            formData_2.append("fileName", e.target.files[0].name);

            await Axios.post(config.http + "/check_files_NewNAC", formData_2, { headers })
              .then(async (res) => {
                const image_2 = 'http://vpnptec.dyndns.org:33080/NEW_NAC/' + res.data.attach[0].ATT + '.' + e.target.files[0].name.split('.').pop();

                arraySubmitSendMail.forEach(function (x, index) {
                  if (x.AssetID === params.row.AssetID) {
                    const list = [...arraySubmitSendMail]
                    list[index]['image_2'] = image_2
                    setArraySubmitSendMail(list)
                  }
                })

              })
          } else {
            swal("แจ้งเตือน", 'ไฟล์ประเภทนี้ไม่ได้รับอนุญาติให้ใช้งานในระบบ \nใช้ได้เฉพาะ .csv, .xls, .txt, .ppt, .doc, .pdf, .jpg, .png, .gif', "error")
          }
        }

        return (
          <React.Fragment>
            <ImageListItem key={params.row.ImagePath_2}>
              <img
                src={`${params.row.ImagePath_2}?w = 248 & fit=crop & auto=format`}
                srcSet={`${params.row.ImagePath_2}?w = 248 & fit=crop & auto=format & dpr=2 2x`}
                alt={params.row.Name}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = "http://vpnptec.dyndns.org:10280/OPS_Fileupload/ATT_230400022.jpg";
                }}
                loading="lazy"
              />
              <ImageListItemBar
                sx={{ backgroundColor: 'rgba(0, 0, 0, 1)', color: 'rgba(255, 255, 255, 1)' }}
                position="below"
                title={<span>&nbsp; &nbsp;{params.row.Code}_2</span>}
                actionIcon={
                  <IconButton
                    sx={{ color: 'rgba(255, 255, 255, 1)' }}
                    aria-label={`info about ${params.row.Code} `}
                    component="label"
                  >
                    <input hidden type="file" name='file' onChange={(e) => handleUploadFile_2(e, params)} />
                    <FilePresentIcon sx={{ fontSize: 20 }} />
                  </IconButton>
                }
              />
            </ImageListItem>
          </React.Fragment>
        )
      }
    },
  ];

  const columns = [
    { field: 'Code', headerName: 'รหัสทรัพย์สิน', headerClassName: 'super-app-theme--header', width: 150, headerAlign: 'center', align: 'center', },
    { field: 'Name', headerName: 'ชื่อ', headerClassName: 'super-app-theme--header', minWidth: 150, flex: 1, },
    { field: 'OwnerID', headerName: 'ผู้ถือครอง', headerClassName: 'super-app-theme--header', width: 100, headerAlign: 'center', align: 'center', },

    {
      field: 'Position',
      headerName: 'Location NAC',
      headerClassName: 'super-app-theme--header',
      width: 120,
      headerAlign: 'center',
      align: 'center',
      valueGetter: (params) =>
        params.row.BranchID === 901 ? 'HO' : params.row.Position,
    },
    {
      field: 'Details',
      headerName: 'สถานะปัจจุบัน',
      headerClassName: 'super-app-theme--header',
      minWidth: 130,
      flex: 1,
      valueGetter: (params) =>
        params.row.Details === '' || !params.row.Details ? '' :
          !params.row.UpdateBy ? `${params.row.Details}` :
            `ผู้อัปเดท/เวลาอัปเดท : ${params.row.UpdateBy ? `${params.row.UpdateBy} (${params.row.UpdateDate})` : 'none'} สถานะปัจจุบัน : ${params.row.Details ?? 'none'}`
    },
    {
      field: 'ImagePath',
      headerName: 'รูปในสัญญา',
      headerClassName: 'super-app-theme--header',
      width: 200,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {

        const handleUploadFile_1 = async (e, params) => {
          e.preventDefault();

          const headers = {
            'Authorization': 'application/json; charset=utf-8',
            'Accept': 'application/json'
          };

          if (['jpg', 'png', 'gif'].indexOf((e.target.files[0].name).split('.').pop()) > -1) {

            const formData_1 = new FormData();
            formData_1.append("file", e.target.files[0]);
            formData_1.append("fileName", e.target.files[0].name);

            await Axios.post(config.http + "/check_files_NewNAC", formData_1, { headers })
              .then(async (res) => {
                const Code = params.row.Code
                const image_1 = 'http://vpnptec.dyndns.org:33080/NEW_NAC/' + res.data.attach[0].ATT + '.' + e.target.files[0].name.split('.').pop();

                const body = { Code: Code, image_1: image_1 }

                await Axios.post(config.http + "/FA_Control_Edit_EBook", body, { headers })
                  .then(async (res) => {
                    if (res.data) {
                      swal("แจ้งเตือน", 'เปลี่ยนแปลงรูปภาพที่ 1 สำเร็จ', "success", { buttons: false, timer: 2000 }).then((value) => {
                        dataHistory.forEach(function (x, index) {
                          if (x.Code === params.row.Code) {
                            const list = [...dataHistory]
                            list[index]['ImagePath'] = image_1
                            setDataHistory(list)
                          }
                        })
                      })
                    }
                  })
              })

          } else {
            swal("แจ้งเตือน", 'ไฟล์ประเภทนี้ไม่ได้รับอนุญาติให้ใช้งานในระบบ \nใช้ได้เฉพาะ .csv, .xls, .txt, .ppt, .doc, .pdf, .jpg, .png, .gif', "error")
          }
        }


        return (
          <React.Fragment>
            <ImageListItem key={params.row.ImagePath}>
              <img
                src={`${params.row.ImagePath}?w = 248 & fit=crop & auto=format`}
                srcSet={`${params.row.ImagePath}?w = 248 & fit=crop & auto=format & dpr=2 2x`}
                alt={params.row.Name}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = "http://vpnptec.dyndns.org:10280/OPS_Fileupload/ATT_230400022.jpg";
                }}
                loading="lazy"
              />
              <ImageListItemBar
                sx={{ backgroundColor: 'rgba(0, 0, 0, 1)', color: 'rgba(255, 255, 255, 1)' }}
                position="below"
                title={<span>&nbsp; &nbsp;{params.row.Code}_1</span>}
                actionIcon={
                  <IconButton
                    sx={{ color: 'rgba(255, 255, 255, 1)' }}
                    aria-label={`info about ${params.row.Code} `}
                    component="label"
                  >
                    <input hidden type="file" name='file' onChange={(e) => handleUploadFile_1(e, params)} />
                    <FilePresentIcon sx={{ fontSize: 20 }} />
                  </IconButton>
                }
              />
            </ImageListItem>
          </React.Fragment>
        )
      }
    },
    {
      field: 'ImagePath_2',
      headerName: 'รูปปัจจุบัน',
      headerClassName: 'super-app-theme--header',
      width: 200,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {

        const handleUploadFile_2 = async (e, params) => {
          e.preventDefault();

          const headers = {
            'Authorization': 'application/json; charset=utf-8',
            'Accept': 'application/json'
          };

          if (['csv', 'xls', 'txt', 'ppt', 'doc', 'pdf', 'jpg', 'png', 'gif'].indexOf((e.target.files[0].name).split('.').pop()) > -1) {

            const formData_2 = new FormData();
            formData_2.append("file", e.target.files[0]);
            formData_2.append("fileName", e.target.files[0].name);

            await Axios.post(config.http + "/check_files_NewNAC", formData_2, { headers })
              .then(async (res) => {
                const Code = params.row.Code
                const image_2 = 'http://vpnptec.dyndns.org:33080/NEW_NAC/' + res.data.attach[0].ATT + '.' + e.target.files[0].name.split('.').pop();

                const body = { Code: Code, image_2: image_2 }

                await Axios.post(config.http + "/FA_Control_Edit_EBook", body, { headers })
                  .then(async (res) => {
                    if (res.data) {
                      swal("แจ้งเตือน", 'เปลี่ยนแปลงรูปภาพที่ 1 สำเร็จ', "success", { buttons: false, timer: 2000 }).then((value) => {
                        dataHistory.forEach(function (x, index) {
                          if (x.Code === params.row.Code) {
                            const list = [...dataHistory]
                            list[index]['ImagePath_2'] = image_2
                            setDataHistory(list)
                          }
                        })
                      })
                    }
                  })
              })
          } else {
            swal("แจ้งเตือน", 'ไฟล์ประเภทนี้ไม่ได้รับอนุญาติให้ใช้งานในระบบ \nใช้ได้เฉพาะ .csv, .xls, .txt, .ppt, .doc, .pdf, .jpg, .png, .gif', "error")
          }
        }

        return (
          <React.Fragment>
            <ImageListItem key={params.row.ImagePath_2}>
              <img
                src={`${params.row.ImagePath_2}?w = 248 & fit=crop & auto=format`}
                srcSet={`${params.row.ImagePath_2}?w = 248 & fit=crop & auto=format & dpr=2 2x`}
                alt={params.row.Name}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = "http://vpnptec.dyndns.org:10280/OPS_Fileupload/ATT_230400022.jpg";
                }}
                loading="lazy"
              />
              <ImageListItemBar
                sx={{ backgroundColor: 'rgba(0, 0, 0, 1)', color: 'rgba(255, 255, 255, 1)' }}
                position="below"
                title={<span>&nbsp; &nbsp;{params.row.Code}_2</span>}
                actionIcon={
                  <IconButton
                    sx={{ color: 'rgba(255, 255, 255, 1)' }}
                    aria-label={`info about ${params.row.Code} `}
                    component="label"
                  >
                    <input hidden type="file" name='file' onChange={(e) => handleUploadFile_2(e, params)} />
                    <FilePresentIcon sx={{ fontSize: 20 }} />
                  </IconButton>
                }
              />
            </ImageListItem>
          </React.Fragment>
        )
      }
    },
  ];

  React.useEffect(async () => {
    // POST request using axios with set headers
    const userCode = { userCode: data.UserCode }
    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };
    await Axios.post(config.http + '/store_FA_control_fetch_assets', userCode, { headers })
      .then(response => setDataHistory(response.data.data.filter((res) => res.bac_status === 2)));
  }, []);

  const handleClickOpenSendMail = () => {
    setOpenSendMail(true);
  };

  const handleCloseSendMail = () => {
    setOpenSendMail(false);
  };



  const handleUploadFile_2_Out = async (e, params) => {
    e.preventDefault();

    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };

    if (['csv', 'xls', 'txt', 'ppt', 'doc', 'pdf', 'jpg', 'png', 'gif'].indexOf((e.target.files[0].name).split('.').pop()) > -1) {

      const formData_2 = new FormData();
      formData_2.append("file", e.target.files[0]);
      formData_2.append("fileName", e.target.files[0].name);

      await Axios.post(config.http + "/check_files_NewNAC", formData_2, { headers })
        .then(async (res) => {
          const image_2 = 'http://vpnptec.dyndns.org:33080/NEW_NAC/' + res.data.attach[0].ATT + '.' + e.target.files[0].name.split('.').pop();
          setNameImage2(image_2)
        })
    } else {
      swal("แจ้งเตือน", 'ไฟล์ประเภทนี้ไม่ได้รับอนุญาติให้ใช้งานในระบบ \nใช้ได้เฉพาะ .csv, .xls, .txt, .ppt, .doc, .pdf, .jpg, .png, .gif', "error")
    }
  }


  if (checkUserWeb === 'null') {
    window.location.href = '/NAC_MAIN';
  } else {
    return (
      <React.Fragment>
        <AppBar
          position="absolute"
          color="default"
          elevation={0}
          sx={{
            position: 'relative',
            borderBottom: (t) => `1px solid ${t.palette.divider} `,
          }}
        >
          <Toolbar>
            <AnimatedPage>
              <Typography variant="h5" color="inherit" >
                ทรัพย์สินผู้ร่วมทั้งหมด
              </Typography>
            </AnimatedPage>
          </Toolbar>
        </AppBar>
        <AnimatedPage>
          {progress !== 1 ? <React.Fragment><Box sx={{ width: '100%' }}><LinearProgress /></Box></React.Fragment> : null}
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <Container maxWidth="1000px" sx={{ pt: 3, pb: 3 }}>
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
              >
                <Grid item>
                  <Button variant="contained" onClick={handleClickOpenSendMail} disabled={valueOfIndex ? false : true} component="label">
                    Send Mail
                  </Button>
                </Grid>
                <Grid item>
                  <Stack direction="row" spacing={2}>
                    <React.Fragment>
                      <Button variant="contained" disabled={(permission_menuID ? permission_menuID.includes(14) : null) === true ? false : true} color='success' component="label">
                        Upload XLSX
                        <input hidden multiple type="file" onChange={fileSelected} />
                      </Button>
                      <Button variant="contained" color='success' disabled={(permission_menuID ? permission_menuID.includes(15) : null) === true ? false : true} onClick={handleClickOpen}>
                        เพิ่มทรัพย์สิน
                      </Button>
                    </React.Fragment>
                  </Stack>
                </Grid>
              </Grid>
              <Box
                sx={{
                  height: 683,
                  width: '100%',
                }}
              >
                <StripedDataGrid
                  sx={{
                    mt: 1,
                    pl: 2,
                    pr: 2,
                    pt: 2,
                    boxShadow: 1,
                    [`& .${gridClasses.cell} `]: {
                      py: 1,
                    },
                  }}
                  components={{ Toolbar: GridToolbar }}
                  componentsProps={{ toolbar: { csvOptions: { utf8WithBom: true } } }}
                  rows={dataHistory ?? []}
                  columns={columns}
                  getRowId={(dataHistory) => dataHistory.AssetID}
                  pageSize={pageSize}
                  onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                  pagination
                  rowsPerPageOptions={[10, 20, 50, 100]}
                  getRowHeight={() => 'auto'}
                  // autoHeight
                  disableColumnMenu
                  disableSelectionOnClick
                  checkboxSelection
                  onSelectionModelChange={(newSelectionModel) => handleClick_Value(newSelectionModel)}
                  selectionModel={valueOfIndex}
                  keepNonExistentRowsSelected
                  {...other}
                />
              </Box>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle>
                  <b>{"กรุณากรอกข้อมูลให้ครบถ้วน"}</b>
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    <Box component="form" noValidate sx={{ mt: 4, width: 400, }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Typography variant="body" color="error" >
                            *ลงชื่อ-นามสกุล (ผู้ทำรายการ)
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            id="outlined-controlled"
                            label="ชื่อจริง"
                            fullWidth
                            size="small"
                            value={user_name}
                            onChange={(event) => {
                              setUser_name(event.target.value);
                            }}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            id="outlined-controlled"
                            label="นามสกุล"
                            fullWidth
                            size="small"
                            value={user_Lastname}
                            onChange={(event) => {
                              setUser_Lastname(event.target.value);
                            }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            size="small"
                            autoComplete="given-name"
                            name="Name"
                            value={name}
                            onChange={(event) => handleChange_Name(event)}
                            required
                            fullWidth
                            label="ชื่อทรัพย์สิน"
                            autoFocus
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <FormControl fullWidth size='small'>
                            <InputLabel id="demo-multiple-checkbox-label">ประเภททรัพย์สิน</InputLabel>
                            <Select
                              value={bac_type}
                              onChange={(event) => setBac_type(event.target.value)}
                              input={<OutlinedInput label="ประเภททรัพย์สิน" />}
                            >
                              <MenuItem value={`BLD`}>BLD (อาคาร,สิ่งปลูกสร้าง)</MenuItem>
                              <MenuItem value={`COP`}>COP (อุปกรณ์คอมพิวเตอร์)</MenuItem>
                              <MenuItem value={`EQU`}>EQU (อุปกรณ์และเครื่องมือ เช่น ตู้จ่าย ตู้เติมลม ถังน้ำมัน)</MenuItem>
                              <MenuItem value={`ITG`}>ITG (ระบบ POS, GSM, Software)</MenuItem>
                              <MenuItem value={`FUR`}>FUR (เฟอนิเจอร์)</MenuItem>
                              <MenuItem value={`OFC`}>OFC (เครื่องมือเครื่องใช้สำนักงาน)</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            size="small"
                            autoComplete="given-name"
                            name="branchID"
                            value={branchID}
                            onChange={(event) => handleChange_BranchID(event)}
                            required
                            fullWidth
                            type='number'
                            label="สาขา"
                            autoFocus
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            size="small"
                            autoComplete="given-name"
                            name="SerialNo"
                            value={serialNo}
                            onChange={(event) => handleChange_SerialNo(event)}
                            fullWidth
                            label="SerialNo"
                            autoFocus
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            size="small"
                            autoComplete="given-name"
                            name="Details"
                            value={details}
                            onChange={(event) => handleChange_Details(event)}
                            fullWidth
                            label="รายะลเอียดทรัพย์สิน"
                            autoFocus
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            size="small"
                            autoComplete="given-name"
                            name="Price"
                            value={price}
                            onChange={(event) => handleChange_Price(event)}
                            required
                            fullWidth
                            type='number'
                            label="ราคาทุน"
                            autoFocus
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <React.Fragment>
                            <ImageListItemBar
                              sx={{ backgroundColor: 'rgba(0, 0, 0, 1)', color: 'rgba(255, 255, 255, 1)' }}
                              position="below"
                              title={<span>&nbsp; &nbsp;{nameImage2 ? `เลือกแล้ว 1 รูป` : `เลือกรูปภาพ`}</span>}
                              actionIcon={
                                <IconButton
                                  sx={{ color: 'rgba(255, 255, 255, 1)' }}
                                  aria-label={`info about ${nameImage2 ? `${nameImage2}` : null} `}
                                  component="label"
                                >
                                  <input hidden type="file" name='file' onChange={(e) => handleUploadFile_2_Out(e)} />
                                  <FilePresentIcon sx={{ fontSize: 20 }} />
                                </IconButton>
                              }
                            />
                          </React.Fragment>
                        </Grid>
                      </Grid>
                    </Box>
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleSubmit_Add} variant="contained">Submit</Button>
                  <Button onClick={handleClose} autoFocus variant="contained" color="error">
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog>
              <Dialog
                fullWidth
                maxWidth='lg'
                open={openXlsx}
                onClose={handleCloseXlsx}
              >
                {
                  (progressIcon === 0) ?
                    <React.Fragment>
                      <DialogTitle>
                        ต้องการอัปโหลดไฟล์ {nameExcel} ไปที่ข้อมูลหลักใช่หรือไม่ ?
                      </DialogTitle>
                    </React.Fragment>
                    :
                    <React.Fragment>
                      <DialogTitle>
                        กำลังอัปโหลดข้อมูล กรุณาอย่าปิดหน้าจอนี้ !!
                      </DialogTitle>
                    </React.Fragment>
                }
                <DialogContent>
                  {
                    (progressIcon === 0) ?
                      <React.Fragment>
                        <Typography variant="body" color="error" >
                          *ลงชื่อ-นามสกุล (ผู้ทำรายการ)
                        </Typography>
                        <Box
                          component="form"
                          sx={{
                            '& > :not(style)': { m: 1, ml: 0, width: '25ch' },
                          }}
                          noValidate
                          autoComplete="off"
                        >
                          <TextField
                            id="outlined-controlled"
                            label="ชื่อจริง"
                            size="small"
                            value={user_name}
                            onChange={(event) => {
                              setUser_name(event.target.value);
                            }}
                          />
                          <TextField
                            id="outlined-controlled"
                            label="นามสกุล"
                            size="small"
                            value={user_Lastname}
                            onChange={(event) => {
                              setUser_Lastname(event.target.value);
                            }}
                          />
                        </Box>
                        <StripedDataGrid
                          sx={{
                            mt: 1,
                            pl: 2,
                            pr: 2,
                            pt: 2,
                            boxShadow: 1,
                            [`& .${gridClasses.cell} `]: {
                              py: 1,
                            },
                          }}
                          components={{ Toolbar: GridToolbar }}
                          componentsProps={{ toolbar: { csvOptions: { utf8WithBom: true } } }}
                          rows={dataFile}
                          columns={field}
                          getRowHeight={() => 'auto'}
                          getRowId={(row) => `${row?.No} `}
                          pageSize={10}
                          autoHeight
                          disableColumnMenu
                          disableSelectionOnClick
                          {...other}
                        />
                      </React.Fragment>
                      :
                      <React.Fragment>
                        <Box
                          sx={{
                            mt: 10,
                            mb: 10,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                          }}
                        >
                          <CircularProgressWithLabel value={progressIcon} />
                        </Box>
                      </React.Fragment>
                  }
                </DialogContent>
                {
                  (progressIcon === 0) ?
                    <React.Fragment>
                      <DialogActions>
                        <Button onClick={handleSubmitXlsx} variant='contained'>Submit</Button>
                        <Button onClick={handleCloseXlsx} variant='contained' color='error' autoFocus>
                          Cancel
                        </Button>
                      </DialogActions>
                    </React.Fragment>
                    : null
                }
              </Dialog>
              <Dialog
                fullWidth
                maxWidth='lg'
                open={openSendMail}
                onClose={handleCloseSendMail}
              >
                <DialogTitle>
                  {"กรุณาตรวจสอบข้อมูลให้ถูกต้องก่อนท่จะส่งอีเมล"}
                </DialogTitle>
                <DialogContent>
                  <React.Fragment>
                    <Typography variant="body" color="error" >
                      *ลงชื่อ-นามสกุล (ผู้ทำรายการ)
                    </Typography>
                    <Box
                      component="form"
                      sx={{
                        '& > :not(style)': { m: 1, ml: 0, width: '25ch' },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <TextField
                        id="outlined-controlled"
                        label="ชื่อจริง"
                        size="small"
                        value={user_name}
                        onChange={(event) => {
                          setUser_name(event.target.value);
                        }}
                      />
                      <TextField
                        id="outlined-controlled"
                        label="นามสกุล"
                        size="small"
                        value={user_Lastname}
                        onChange={(event) => {
                          setUser_Lastname(event.target.value);
                        }}
                      />
                    </Box>
                    <StripedDataGrid
                      sx={{
                        mt: 1,
                        pl: 2,
                        pr: 2,
                        pt: 2,
                        boxShadow: 1,
                        [`& .${gridClasses.cell} `]: {
                          py: 1,
                        },
                      }}
                      components={{ Toolbar: GridToolbar }}
                      componentsProps={{
                        toolbar: {
                          csvOptions: {
                            utf8WithBom: true,
                            fileName: `ทะเบียนทรัพย์สินผู้ร่วม`,

                          }
                        }
                      }}
                      rows={arraySubmitSendMail ?? []}
                      columns={columns_Mail}
                      getRowId={(row) => row.AssetID}
                      pageSize={10}
                      getRowHeight={() => 'auto'}
                      autoHeight
                      disableColumnMenu
                      disableSelectionOnClick
                      checkboxSelection
                      onSelectionModelChange={(newSelectionModel) => handleClick_Value(newSelectionModel)}
                      selectionModel={valueOfIndex}
                      keepNonExistentRowsSelected
                      {...other}
                    />
                  </React.Fragment>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleSubmit_SendMail} variant='contained'>Submit</Button>
                  <Button onClick={handleCloseSendMail} autoFocus variant='contained' color='error'>
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog>
            </Container>
          </Box>
        </AnimatedPage>
      </React.Fragment>
    );
  }
}