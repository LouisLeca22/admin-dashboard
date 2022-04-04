import './sidebar.scss';
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";


import {Link} from "react-router-dom"
import { useContext } from 'react';
import { DarkModeContext } from '../../context/darkContext';
import {useTranslation} from "react-i18next"


function Sidebar() {
  const {dispatch} = useContext(DarkModeContext)
  const {t} = useTranslation(["sidebar"])

  return (
    <div className='sidebar'>
      <div className='top'>
        <Link style={{textDecoration: "none"}} to="/">
        <span className='logo'>{t('logo')}</span>
        </Link>
      </div>
      <hr />
      <div className='center'>
        <ul>
        <p className="title">{t('main')}</p>
        <Link to="/" style={{ textDecoration: "none" }}>
          <li>
            <DashboardIcon className="icon" />
            <span>{t('overview')}</span>
          </li>
          </Link>
          <p className="title">{t('lists')}</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>{t('users')}</span>
            </li>
          </Link>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>{t('products')}</span>
            </li>
          </Link>
          <Link to="/orders" style={{ textDecoration: "none" }}>
          <li>
            <CreditCardIcon className="icon" />
            <span>{t('orders')}</span>
          </li>
          </Link>
          <Link to="/deliveries" style={{ textDecoration: "none" }}>
          <li>
            <LocalShippingIcon className="icon" />
            <span>{t('deliveries')}</span>
          </li>
          </Link>
        </ul>
      </div>
      <div className='bottom'>
        <div className="colorOption" onClick={() => dispatch({type: "LIGHT"})}></div>
        <div className="colorOption" onClick={() => dispatch({type: "DARK"})}></div>
      </div>
    </div>
  );
}

export default Sidebar;
