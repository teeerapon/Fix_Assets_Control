import React from 'react';
import './App.css';
import { AnimatePresence } from "framer-motion";
import Signin from './Page/Signin';
import Report from './Page/Menu/Report/Report';
import ReportAll from './Page/Menu/Report/report_all';
import AssetPage from './Page/Menu/Report/Assets';
import AssetPage2 from './Page/Menu/Report/AssetsAll';
import Page404 from './Page/Page404';
import HomePage from './Page/Menu/HomePage/HomePage';
import History_of_Assets from './Page/Menu/NAC/historys/history_of_assets';
import CreatePeriod from './Page/Menu/Period/Create/main';
import CreatePeriod2 from './Page/Menu/Period/Create/main2';
import CreatePeriod3 from './Page/Menu/Period/Create/main3';
import EditPeriod from './Page/Menu/Period/Edit/EditPeriod';
// รายการ อนุมัติ และ ของฉัน
import NAC_ROW from './Page/Menu/NAC/doc_nacs_me/nac_row';
import NAC_OPERATOR from './Page/Menu/NAC/doc_operator/nac_row';
// ทำการราย
import NAC_CREATE_STEP1 from './Page/Menu/NAC/nac_create/page_create/nac_create_step1';
import NAC_CREATE_MAIN1 from './Page/Menu/NAC/nac_create/page_nac/nac_main_stepCreate';
import NAC_CHANGE_STEP1 from './Page/Menu/NAC/nac_create/nac_change/nac_change_step1';
import NAC_DELETE_STEP1 from './Page/Menu/NAC/nac_create/nac_delete/nac_delete_step1';
import NAC_SEALS_STEP1 from './Page/Menu/NAC/nac_create/nac_Seals/nac_create_seals';
// รออนุมัติ
import NAC_CREATE_WAIT_APPROVE from './Page/Menu/NAC/nac_create/page_nac/nac_main_wait_approve';
import NAC_CHANGE_WAIT_APPROVE from './Page/Menu/NAC/nac_create/nac_change/nac_change_wait_approve';
import NAC_CREATE_NEW_WAIT_APPROVE from './Page/Menu/NAC/nac_create/page_create/nac_create_wait_approve';
import NAC_DELETE_WAIT_APPROVE from './Page/Menu/NAC/nac_create/nac_delete/nac_delete_wait_approve';
import NAC_SEALS_APPROVE from './Page/Menu/NAC/nac_create/nac_Seals/nac_seals_approve';
// Routes
import NavBar from './Page/Nav/Nav';
import { IntlProvider } from 'react-intl';
import { styled, useTheme } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import { Route, Routes, useLocation } from "react-router";

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
    ...(open && {
      flexGrow: 1,
      whiteSpace: 'pre-wrap',
      //opacity: 0.05,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: `+${drawerWidth}px`,
    }),
  }),
);



const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));


function App() {

  const location = useLocation();
  const token = localStorage.getItem('token');
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  if (!token) {
    return <Signin />
  }

  return (
    <IntlProvider>
      <NavBar
        AppBar={AppBar}
        theme={theme}
        open={open}
        drawerWidth={drawerWidth}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
        DrawerHeader={DrawerHeader}
      />
        <Main open={open}>
          <AnimatePresence exitBeforeEnter>
            <Routes key={location.pathname} location={location}>
              <Route path="/" element={<HomePage />} />
              <Route path="/HomePage" element={<HomePage />} />
              <Route path="/Report" element={<Report />} />
              <Route path="/ReportAll" element={<ReportAll />} />
              <Route path="/AssetPage" element={<AssetPage />} />
              <Route path="/AssetPage2" element={<AssetPage2 />} />
              <Route path="/CreatePeriod" element={<CreatePeriod />} />
              <Route path="/CreatePeriod2" element={<CreatePeriod2 />} />
              <Route path="/CreatePeriod3" element={<CreatePeriod3 />} />
              <Route path="/EditPeriod" element={<EditPeriod />} />
              <Route path="/History_of_Assets" element={<History_of_Assets />} />
              {/* รายการ อนุมัติ และ ของฉัน */}
              <Route path="/NAC_ROW" element={<NAC_ROW />} />
              <Route path="/NAC_OPERATOR" element={<NAC_OPERATOR />} />
              {/* ทำการราย */}
              <Route path="/NAC_CREATE_MAIN1" element={<NAC_CREATE_MAIN1 />} />
              <Route path="/NAC_CREATE_STEP1" element={<NAC_CREATE_STEP1 />} />
              <Route path="/NAC_CHANGE_STEP1" element={<NAC_CHANGE_STEP1 />} />
              <Route path="/NAC_DELETE_STEP1" element={<NAC_DELETE_STEP1 />} />
              <Route path="/NAC_SEALS_STEP1" element={<NAC_SEALS_STEP1 />} />
              {/* รออนุมัติ */}
              <Route path="/NAC_ROW/NAC_CREATE_WAIT_APPROVE/:nac_id" element={<NAC_CREATE_WAIT_APPROVE />} />
              <Route path="/NAC_ROW/NAC_CHANGE_WAIT_APPROVE/:nac_id" element={<NAC_CHANGE_WAIT_APPROVE />} />
              <Route path="/NAC_ROW/NAC_CREATE_NEW_WAIT_APPROVE/:nac_id" element={<NAC_CREATE_NEW_WAIT_APPROVE />} />
              <Route path="/NAC_ROW/NAC_DELETE_WAIT_APPROVE/:nac_id" element={<NAC_DELETE_WAIT_APPROVE />} />
              <Route path="/NAC_ROW/NAC_SEALS_APPROVE/:nac_id" element={<NAC_SEALS_APPROVE />} />
              <Route path="*" element={<Page404 />} />
            </Routes>
          </AnimatePresence>
        </Main>
    </IntlProvider>
  );
}

export default App;