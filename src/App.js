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

// BPC* //
import BSAssetsMain from './PAGE_NAC/Menu/Assets/BPC/bs_assets';
import TempBSAssetsMain from './PAGE_NAC/Menu/Assets/BPC/tempBS_assets';
import TransectionList from './PAGE_NAC/Menu/Assets/BPC/transection_List';
import BpcStatus from './PAGE_NAC/Menu/Assets/BPC/bpc_status';

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

// ROPA* //
import ROPA_MAIN from './PAGE_ROPA/main';
import PERSON_ROPA from './PAGE_ROPA/Menu/Person_RoPA';

// Permission_NAC
import Permission_NAC from './PAGE_NAC/Menu/NAC/Permission_NAC';

function getCurrentDimension() {
  if (window.innerWidth > 769) {
    return (window.innerWidth / 100) * 20;
  } else if (window.innerWidth > 481 && window.innerWidth <= 768) {
    return (window.innerWidth / 100) * 25;
  } else {
    return (window.innerWidth / 100) * 30;
  }
}

const drawerWidth = getCurrentDimension();

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
      position: 'flex',
      whiteSpace: 'pre-wrap',
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,

      }),
      // marginLeft: `+${drawerWidth}px`,
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
    width: `calc(100% - ${drawerWidth})`,
    marginLeft: `${drawerWidth}`,
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

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  if (!token || !date_login || ((datenow - date_login) > 120000) === true) {
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
  } else {
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
              {/* BPC */}
              <Route path="/BSAssetsMain" element={<BSAssetsMain />} />
              <Route path="/FA_Control_BPC_SELECT_TEMP" element={<TempBSAssetsMain />} />
              <Route path="/TransectionList" element={<TransectionList />} />
              <Route path="/BpcStatus" element={<BpcStatus />} />
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
              <Route path="/NAC_ROW/NAC_CREATE_WAIT_APPROVE" element={<NAC_CREATE_WAIT_APPROVE />} />
              <Route path="/NAC_ROW/NAC_CHANGE_WAIT_APPROVE" element={<NAC_CHANGE_WAIT_APPROVE />} />
              <Route path="/NAC_ROW/NAC_CREATE_NEW_WAIT_APPROVE" element={<NAC_CREATE_NEW_WAIT_APPROVE />} />
              <Route path="/NAC_ROW/NAC_DELETE_WAIT_APPROVE" element={<NAC_DELETE_WAIT_APPROVE />} />
              <Route path="/NAC_ROW/NAC_SEALS_APPROVE" element={<NAC_SEALS_APPROVE />} />
              <Route path="*" element={<Page404 />} />
              {/* ROPA */}
              <Route path="/ROPA_MAIN" element={<ROPA_MAIN />} />
              <Route path="/PERSON_ROPA" element={<PERSON_ROPA />} />
            </Routes>
          </AnimatePresence>
        </Main>
      </IntlProvider>
    );
  }
}

// ngrok config add-authtoken 2ODQXHspvsX1qfxOO6f2RkDnQoW_7G3R1v2aeJmoHKEiGS99X

export default App;