import React from 'react';
import './App.css';
import { IntlProvider } from 'react-intl';
import { styled, useTheme } from '@mui/material/styles';
import { AnimatePresence } from "framer-motion";
// Routes //
import Signin from './Signin';
import Page404 from './Page404';
import NavBar from './PAGE_NAC/Nav/Nav';
import MuiAppBar from '@mui/material/AppBar';
import { Route, Routes, useLocation, useParams } from "react-router";

// NAC* //
import Report from './PAGE_NAC/Menu/Report/Report';
import ReportAll from './PAGE_NAC/Menu/Report/report_all';
import AssetPage from './PAGE_NAC/Menu/Report/Assets';
import AssetPage2 from './PAGE_NAC/Menu/Report/AssetsAll';
import HomePage from './PAGE_NAC/Menu/HomePage/HomePage';
import History_of_Assets from './PAGE_NAC/Menu/NAC/historys/history_of_assets';
import CreatePeriod from './PAGE_NAC/Menu/Period/Create/main';
import CreatePeriod2 from './PAGE_NAC/Menu/Period/Create/main2';
import CreatePeriod3 from './PAGE_NAC/Menu/Period/Create/main3';
import EditPeriod from './PAGE_NAC/Menu/Period/Edit/EditPeriod';
// รายการ อนุมัติ และ ของฉัน
import NAC_ROW from './PAGE_NAC/Menu/NAC/doc_nacs_me/nac_row';
import NAC_OPERATOR from './PAGE_NAC/Menu/NAC/doc_operator/nac_row';
// ทำการราย
import NAC_CREATE_STEP1 from './PAGE_NAC/Menu/NAC/nac_create/page_create/nac_create_step1';
import NAC_CREATE_MAIN1 from './PAGE_NAC/Menu/NAC/nac_create/page_nac/nac_main_stepCreate';
import NAC_CHANGE_STEP1 from './PAGE_NAC/Menu/NAC/nac_create/nac_change/nac_change_step1';
import NAC_DELETE_STEP1 from './PAGE_NAC/Menu/NAC/nac_create/nac_delete/nac_delete_step1';
import NAC_SEALS_STEP1 from './PAGE_NAC/Menu/NAC/nac_create/nac_Seals/nac_create_seals';
// รออนุมัติ
import NAC_CREATE_WAIT_APPROVE from './PAGE_NAC/Menu/NAC/nac_create/page_nac/nac_main_wait_approve';
import NAC_CHANGE_WAIT_APPROVE from './PAGE_NAC/Menu/NAC/nac_create/nac_change/nac_change_wait_approve';
import NAC_CREATE_NEW_WAIT_APPROVE from './PAGE_NAC/Menu/NAC/nac_create/page_create/nac_create_wait_approve';
import NAC_DELETE_WAIT_APPROVE from './PAGE_NAC/Menu/NAC/nac_create/nac_delete/nac_delete_wait_approve';
import NAC_SEALS_APPROVE from './PAGE_NAC/Menu/NAC/nac_create/nac_Seals/nac_seals_approve';

// DATA_CENTER* //
import DATA_CENTER from './DATA_CENTER/data_center'
import DATA_CENTER_NAV from './DATA_CENTER/Nav/Nav'

// ROPA* //
import ROPA_MAIN from './PAGE_ROPA/main';
import ROPA_NAV from './PAGE_ROPA/Nav/Nav';
import PERMISSION_TO_ROPA from './PAGE_ROPA/Menu/permission_to_ROPA';

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
  const roPA = [
    '/ROPA_MAIN',
    '/PERMISSION_TO_ROPA',
    '*',
  ]
  const nAC_MENU =
    [
      '/NAC_MAIN',
      '/Report',
      '/ReportAll',
      '/AssetPage',
      '/AssetPage2',
      '/CreatePeriod',
      '/CreatePeriod2',
      '/CreatePeriod3',
      '/EditPeriod',
      '/History_of_Assets',
      '/NAC_ROW',
      '/NAC_OPERATOR',
      '/NAC_CREATE_MAIN1',
      '/NAC_CREATE_STEP1',
      '/NAC_CHANGE_STEP1',
      '/NAC_DELETE_STEP1',
      '/NAC_SEALS_STEP1',
      '/NAC_ROW/NAC_CREATE_WAIT_APPROVE/',
      '/NAC_ROW/NAC_CHANGE_WAIT_APPROVE/',
      '/NAC_ROW/NAC_CREATE_NEW_WAIT_APPROVE/',
      '/NAC_ROW/NAC_DELETE_WAIT_APPROVE/',
      '/NAC_ROW/NAC_SEALS_APPROVE/',
      '*',
    ]

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  if (!token) {
    return <Signin />
  } else if (location.pathname === ('/' || '/DATA_CENTER')) {
    return (
      <IntlProvider>
        <DATA_CENTER_NAV
          AppBar={AppBar}
          theme={theme}
          open={open}
          drawerWidth={drawerWidth}
          handleDrawerOpen={handleDrawerOpen}
          handleDrawerClose={handleDrawerClose}
          setOpen={setOpen}
          DrawerHeader={DrawerHeader}
        />
        <Main open={open}>
          <AnimatePresence exitBeforeEnter>
            <Routes key={location.pathname} location={location}>
              <Route path="/" element={<DATA_CENTER />} />
              <Route path="*" element={<Page404 />} />
            </Routes>
          </AnimatePresence>
        </Main>
      </IntlProvider>
    );
  } else if (roPA.includes(location.pathname) === true || ((location.pathname.split('/')[3] ?? '').includes('ROPA') === true)) {
    return (
      <IntlProvider>
        <ROPA_NAV
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
              <Route path="/ROPA_MAIN" element={<ROPA_MAIN />} />
              <Route path="/PERMISSION_TO_ROPA" element={<PERMISSION_TO_ROPA />} />
              <Route path="*" element={<Page404 />} />
            </Routes>
          </AnimatePresence>
        </Main>
      </IntlProvider>
    );
  } else if (nAC_MENU.includes(location.pathname) === true || ((location.pathname.split('/')[3] ?? '').includes('NAC') === true)) {
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
              <Route path="/NAC_MAIN" element={<HomePage />} />
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
}

export default App;