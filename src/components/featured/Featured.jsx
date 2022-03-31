import './featured.scss';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import {useTranslation} from "react-i18next"


function Featured() {
  const {t} = useTranslation(["featured"])
  return (
    <div className='featured'>
      <div className='top'>
        <h1 className='title'>{t("total")}</h1>
        <MoreVertIcon fontSize='small' />
      </div>
      <div className='bottom'>
        <div className='featuredChart'>
          <CircularProgressbar value={70} text={'70%'} strokeWidth={5} />
        </div>
        <p className='title'>{t('today')}</p>
        <p className='amount'>420€</p>
        <p className='desc'>
          {t("processing")}
        </p>
        <div className='summary'>
          <div className='item'>
            <div className='itemTitle'>{t("target")}</div>
            <div className='itemResult positive'>
              <KeyboardArrowUpOutlinedIcon fontSize='small' />
              <div className='itemResultAmount'>8 000 €</div>
            </div>
          </div>
          <div className='item'>
            <div className='itemTitle'>{t("week")}</div>
            <div className='itemResult positive'>
              <KeyboardArrowUpOutlinedIcon fontSize='small' />
              <div className='itemResultAmount'>12 000 €</div>
            </div>
          </div>
          <div className='item'>
            <div className='itemTitle'>{t('month')}</div>
            <div className='itemResult negative'>
              <KeyboardArrowDownIcon fontSize='small' />
              <div className='itemResultAmount'>2 000 €</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Featured;
