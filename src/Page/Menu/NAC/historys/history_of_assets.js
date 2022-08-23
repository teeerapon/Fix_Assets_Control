import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import AnimatedPage from '../../../../AnimatedPage.jsx'
import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';
import Axios from "axios"

export default function History_of_assets() {

  const [dense, setDense] = React.useState(false);
  const [dataHistory, setDataHistory] = React.useState();
  const [dataChange, setDataChange] = React.useState();
  const data = JSON.parse(localStorage.getItem('data'));

  const columns = [
    { field: 'nac_code', headerName: 'รหัสทรัพย์สิน', width: 130 },
    { field: 'nacdtl_assetsName', headerName: 'ชื่อ', width: 250 },
    { field: 'nacdtl_assetsPrice', headerName: 'ราคา (บาท)', width: 200 },
    { field: 'name', headerName: 'หัวข้อรายการ', width: 250 },
    { field: 'create_by', headerName: 'ผู้ทำรายการ', width: 130 },
    { field: 'source_approve_userid', headerName: 'ผู้อนุมัติ', width: 130 },
    { field: 'account_aprrove_id', headerName: 'ผู้ปิดรายการ', width: 130 },
    { field: 'update_date', headerName: 'วันที่ปิดรายการ', type: 'date', width: 200 },
  ];

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  React.useEffect(() => {
    // POST request using axios with set headers
    const userCode = { userCode: data.UserCode }
    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };
    Axios.post('http://vpnptec.dyndns.org:32001/api/store_FA_control_HistorysAssets', userCode, { headers })
      .then(response => setDataHistory(response.data.data));
  }, []);

  return (
    <React.Fragment>
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
              ประวัติทรัพย์สิน
            </Typography>
          </AnimatedPage>
        </Toolbar>
      </AppBar>
      <AnimatedPage>
        <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
          <Container maxWidth="1000px" sx={{ pt: 3 }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
              spacing={2}
            >
              <Card
                style={{
                  'cursor': 'pointer',
                  'flex': 1,
                  'margin': '0px 20px',
                  'padding': '15px',
                  'border-radius': '10px',
                }}
              >
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    เพิ่มบัญชีทรัพย์สินถาวร
                  </Typography>
                  <Typography variant="h5" component="div">
                    <b>100 รายการ</b>
                  </Typography>
                </CardContent>
              </Card>
              <Card
                style={{
                  'cursor': 'pointer',
                  'flex': 1,
                  'margin': '0px 20px',
                  'padding': '15px',
                  'border-radius': '10px',
                }}
              >
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    โยกย้ายทรัพย์สิน
                  </Typography>
                  <Typography variant="h5" component="div">
                    <b>86 รายการ</b>
                  </Typography>
                </CardContent>
              </Card>
              <Card
                style={{
                  'cursor': 'pointer',
                  'flex': 1,
                  'margin': '0px 20px',
                  'padding': '15px',
                  'border-radius': '10px',
                }}
              >
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    เปลี่ยนแปลงรายละเอียด
                  </Typography>
                  <Typography variant="h5" component="div">
                    <b>13 รายการ</b>
                  </Typography>
                </CardContent>
              </Card>
              <Card
                style={{
                  'cursor': 'pointer',
                  'flex': 1,
                  'margin': '0px 20px',
                  'padding': '15px',
                  'border-radius': '10px',
                }}
              >
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    ตัดทรัพย์สินถาวร
                  </Typography>
                  <Typography variant="h5" component="div">
                    <b>41 รายการ</b>
                  </Typography>
                </CardContent>
              </Card>
              <Card
                style={{
                  'cursor': 'pointer',
                  'flex': 1,
                  'margin': '0px 20px',
                  'padding': '15px',
                  'border-radius': '10px',
                }}
              >
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    ขายทรัพย์สิน
                  </Typography>
                  <Typography variant="h5" component="div">
                    <b>5 รายการ</b>
                  </Typography>
                </CardContent>
              </Card>
            </Stack>
            <div style={{ height: 387, width: '100%' }}>
              <DataGrid
                sx={{ mt: 3, pl: 2, pt: 2 }}
                rows={!dataHistory ? [] : dataHistory}
                columns={columns}
                getRowId={(dataHistory) => dataHistory.nacdtl_id}
                pageSize={5}
                rowsPerPageOptions={[5]}
              //checkboxSelection
              />
            </div>
          </Container>
        </Box>
      </AnimatedPage>
    </React.Fragment>
  );
}