import './navbar.scss';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { useContext } from 'react';
import { DarkModeContext } from '../../context/darkContext';
import {useEffect} from "react"
import {useTranslation} from "react-i18next"
import i18next from 'i18next';

function Navbar() {
  const {i18n} = useTranslation()

  useEffect(() => {
    if(localStorage.getItem("i18nextLng")?.length > 2){
      i18next.changeLanguage("fr")
    }
  },[])

  const handleLanguageCHange = (e) => {
    i18n.changeLanguage(e.target.value)
  }

  const { darkMode, dispatch } = useContext(DarkModeContext);
  return (
    <div className='navbar'>
      <div className='wrapper'>
        <div></div>
        <div className='items'>
          <div className='item'>
            <LanguageOutlinedIcon />
            <select
              className='languageSelect'
              onChange={handleLanguageCHange}
              value={localStorage.getItem('i18nextLng')}
            >
              <option className='languageOption' value='fr'>
                Français
              </option>
              <option className='languageOption' value='en'>
                English
              </option>
              <option className='languageOption' value='es'>
                Español
              </option>
              <option className='languageOption' value='it'>
                Italiano
              </option>
              <option className='languageOption' value='pt'>
                 Português
              </option>
            </select>
          </div>
          <div
            className='item'
            style={{ cursor: 'pointer' }}
            onClick={() => dispatch({ type: 'TOGGLE' })}
          >
            {darkMode ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
