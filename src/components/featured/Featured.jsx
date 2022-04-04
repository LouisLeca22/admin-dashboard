import './featured.scss';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import {useTranslation} from "react-i18next"
import {useEffect, useState} from "react"
import {db} from "../../firebase"
import {
  query,
  collection,
  where,
  getDocs

} from 'firebase/firestore';

function Featured() {

  const [total, setTotal] = useState(null)
  const [totalPaid, setTotalPaid] = useState(null)
  const [percentage, setPercentage] = useState(null)
  const [thisMonthAmount, setThisMonthAmount] = useState(null)
  const [lastMonthAmount, setLastMonthAmount] = useState(null)

  useEffect(() => {
    const fetchTotal = async () => {
      const snapShot = await getDocs(collection(db, "orders"))
      let list = []
      snapShot.forEach(doc => {
        list.push(+(doc.data().amount))
      })

      setTotal(list.reduce((a,b) => a+b, 0))
    }


    const fetchPaid = async () => {
      const q = query(collection(db, "orders"), where("status", "==", "approved"))
      const snapShot = await getDocs(q)
      let list = []
      snapShot.forEach(doc => {
        list.push(+(doc.data().amount))
      })

      setTotalPaid(list.reduce((a,b) => a+b,0))
    }

    fetchPaid()
    fetchTotal()
    setPercentage(Math.floor(totalPaid * 100 / total))


    const fetchByMonth = async () => {
      const today = new Date()
      const lastMonth = new Date(new Date().setMonth(today.getMonth() - 1))
      const previousMonth = new Date(new Date().setMonth(today.getMonth() - 2))
      
      const thisMonthQuery = query(collection(db, "orders"), where("timeStamp", "<=", today), where("timeStamp", ">", lastMonth))

      const lastMonthQuery = query(collection(db, "orders"), where("timeStamp", "<=", lastMonth), where("timeStamp", ">", previousMonth))
      
      let thisMonthList = []
      let lastMonthList = []
      const thisMonthData= await getDocs(thisMonthQuery)
      const lastMonthData = await getDocs(lastMonthQuery)
      thisMonthData.forEach(doc => {
        thisMonthList.push(+(doc.data().amount))
      })
      lastMonthData.forEach(doc => {
        lastMonthList.push(+(doc.data().amount))
      })

      setThisMonthAmount(thisMonthList.reduce((a,b) => a + b, 0))
      setLastMonthAmount(lastMonthList.reduce((a,b) => a + b, 0))

    }

    fetchByMonth()

  },  [totalPaid, total])



  const {t} = useTranslation(["featured"])
  return (
    <div className='featured'>
      <div className='top'>
        <h1 className='title'>{t("total")}</h1>
        <MoreVertIcon fontSize='small' />
      </div>
      <div className='bottom'>
        <div className='featuredChart'>
          <CircularProgressbar value={percentage} text={`${percentage}%`} strokeWidth={5} />
        </div>
        <p className='title'>{t('today')}</p>
        <p className='amount'>{totalPaid} €</p>
        <p className='desc'>
          {t("processing")}
        </p>
        <div className='summary'>
          <div className='item'>
            <div className='itemTitle'>{t("target")}</div>
            <div className='itemResult positive'>
              <KeyboardArrowUpOutlinedIcon fontSize='small' />
              <div className='itemResultAmount'>{total} €</div>
            </div>
          </div>
          <div className='item'>
            <div className='itemTitle'>{t("week")}</div>
            <div className='itemResult positive'>
              <KeyboardArrowUpOutlinedIcon fontSize='small' />
              <div className='itemResultAmount'>{thisMonthAmount}€</div>
            </div>
          </div>
          <div className='item'>
            <div className='itemTitle'>{t('month')}</div>
            <div className='itemResult negative'>
              <KeyboardArrowDownIcon fontSize='small' />
              <div className='itemResultAmount'>{lastMonthAmount} €</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Featured;
