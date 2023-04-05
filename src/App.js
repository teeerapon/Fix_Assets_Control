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
import AssetPage from './PAGE_NAC/Menu/Report/Assets';
import Reported_Assets_Counted from './PAGE_NAC/Menu/Report/AssetsAll';
import HomePage from './PAGE_NAC/Menu/HomePage/HomePage';
import History_of_Assets from './PAGE_NAC/Menu/NAC/historys/history_of_assets';
import CreatePeriod from './PAGE_NAC/Menu/Period/Create/main';
import CreatePeriod2 from './PAGE_NAC/Menu/Period/Create/main2';
import CreatePeriod3 from './PAGE_NAC/Menu/Period/Create/main3';
import EditPeriod from './PAGE_NAC/Menu/Period/Edit/period_round';
import FETCH_ASSETS from './PAGE_NAC/Menu/Assets/main';
import Account_BrnachAssets from './PAGE_NAC/Menu/Assets/branch';
import EBookBranch from './PAGE_NAC/Menu/Assets/eBook_branch';
import EBookMain from './PAGE_NAC/Menu/Assets/eBook_main';
// รายการ อนุมัติ และ ของฉัน
import NAC_ROW from './PAGE_NAC/Menu/NAC/doc_nacs_me/nac_row_main';
import NAC_OPERATOR from './PAGE_NAC/Menu/NAC/doc_operator/nac_row_main';
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
import PERSON_ROPA from './PAGE_ROPA/Menu/Person_RoPA';

// Permission_NAC
import Permission_NAC from './PAGE_NAC/Menu/NAC/Permission_NAC';

const drawerWidth = 250;

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

  const date_login = localStorage.getItem('date_login') ?? undefined;
  const d = new Date();
  const year = (d.getFullYear()).toString();
  const month = ((d.getMonth()) + 101).toString().slice(-2);
  const date = ((d.getDate()) + 100).toString().slice(-2);
  const hours = ((d.getHours()) + 100).toString().slice(-2);
  const mins = ((d.getMinutes()) + 100).toString().slice(-2);
  const seconds = ((d.getSeconds()) + 100).toString().slice(-2);
  const datenow = `${year + month + date + hours + mins + seconds}`

  const location = useLocation();
  const token = localStorage.getItem('token');
  const checkUserWeb = localStorage.getItem('sucurity');
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const roPA = [
    '/ROPA_MAIN',
    '/PERSON_ROPA',
    '*',
  ]
  const nAC_MENU =
    [
      '/NAC_MAIN',
      '/Report',
      '/AssetPage',
      '/Reported_Assets_Counted',
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
      '/FETCH_ASSETS',
      '/Account_BrnachAssets',
      '/Permission_NAC',
      '/EBookBranch',
      '/EBookMain',
      '*',
    ]

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  if (!token || !date_login || ((datenow - date_login) > 30000) === true) {
    localStorage.removeItem("token");
    localStorage.removeItem("data");
    localStorage.removeItem("permission");
    localStorage.removeItem("Allaseets");
    localStorage.removeItem("aseetsCounted");
    localStorage.removeItem("assetsWrong");
    localStorage.removeItem("DataCreatePeriod");
    localStorage.removeItem("NacCode");
    localStorage.removeItem("pagination");
    localStorage.removeItem("pagination_user");
    localStorage.removeItem("filterModel");
    localStorage.removeItem("filterModel_user");
    localStorage.removeItem("filterNAC");
    localStorage.removeItem("filterNAC_user");
    return <Signin />
    // } else if (location.pathname === ('/' || '/DATA_CENTER')) {
    //  เอาตรงนี้ออกเมื่อ DataCenter เสร็จ
  } else if (location.pathname === ('/DATA_CENTER')) {
    // 
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
              <Route path="/DATA_CENTER" element={<DATA_CENTER />} />
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
              <Route path="/PERSON_ROPA" element={<PERSON_ROPA />} />
              <Route path="*" element={<Page404 />} />
            </Routes>
          </AnimatePresence>
        </Main>
      </IntlProvider>
    );
    //} else if (nAC_MENU.includes(location.pathname) === true || ((location.pathname.split('/')[3] ?? '').includes('NAC') === true)) {
    //  เอาตรงนี้ออกเมื่อ DataCenter เสร็จ
  } else if (location.pathname === ('/') || nAC_MENU.includes(location.pathname) === true || ((location.pathname.split('/')[3] ?? '').includes('NAC') === true)) {
    // 
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
              {/* เอาตรงนี้ออกเมื่อ DataCenter เสร็จ */}
              <Route path="/" element={<HomePage />} />
              {/*  */}
              <Route path="/Permission_NAC" element={<Permission_NAC />} />
              <Route path="/NAC_MAIN" element={<HomePage />} />
              <Route path="/Report" element={<Report />} />
              <Route path="/AssetPage" element={<AssetPage />} />
              <Route path="/Reported_Assets_Counted" element={<Reported_Assets_Counted />} />
              <Route path="/CreatePeriod" element={<CreatePeriod />} />
              <Route path="/CreatePeriod2" element={<CreatePeriod2 />} />
              <Route path="/CreatePeriod3" element={<CreatePeriod3 />} />
              <Route path="/EditPeriod" element={<EditPeriod />} />
              <Route path="/History_of_Assets" element={<History_of_Assets />} />
              <Route path="/FETCH_ASSETS" element={<FETCH_ASSETS />} />
              <Route path="/Account_BrnachAssets" element={<Account_BrnachAssets />} />
              <Route path="/EBookBranch" element={<EBookBranch />} />
              <Route path="/EBookMain" element={<EBookMain />} />
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