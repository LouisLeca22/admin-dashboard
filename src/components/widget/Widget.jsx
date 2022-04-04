import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import ProductIcon from "@mui/icons-material/Category"
import LocalShippingIcon from "@mui/icons-material/LocalShipping"
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import './widget.scss';
import {collection, query, where, getDocs} from "firebase/firestore"
import {db} from "../../firebase"
import {useTranslation} from "react-i18next"
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Widget({ type }) {
  const {t} = useTranslation(["widget"])
  let data;

  const [amount, setAmount] = useState(null)
  const [percentage, setPercentage] = useState(null)


  switch (type) {
    case 'users':
      data = {
        title: t("users"),
        isMoney: false,
        link: t("linkUsers"),
        icon: <PersonOutlinedIcon className='icon' style={{color: "crimson", backgroundColor: "rgba(255, 0,0,0.2"}}/>,
      };
      break;
    case 'products':
      data = {
        title: t("products"),
        isMoney: false,
        link: t('linkProducts'),
        icon: <ProductIcon className='icon' style={{color: "goldenrod", backgroundColor: "rgba(218,165,32,0.2)"}} />,
      };
      break;
    case 'orders':
      data = {
        title: t("orders"),
        isMoney: true,
        link: t("linkOrders"),
        icon: <ShoppingCartOutlinedIcon className='icon' style={{color: "green", backgroundColor:"rgba(0,128,0,0.2)"}} />,
      };
      break;
      case "deliveries":
        data={
          title: t("deliveries"),
          isMoney: false,
          link: t("linkDeliveries"),
          icon: (
            <LocalShippingIcon className="icon" style={{color: "purple", backgroundColor: "rgba(128,0,128,0.2)"}}/>
          )
        }
        break;
    default:
      break;
  }

  useEffect(() => {
    const fetchData = async () => {
      const today = new Date()
      const lastMonth = new Date(new Date().setMonth(today.getMonth() - 1))
      const previousMonth = new Date(new Date().setMonth(today.getMonth() - 2))
      
      const lastMonthQuery = query(collection(db, type), where("timeStamp", "<=", today), where("timeStamp", ">", lastMonth))

      const previousMonthQuery = query(collection(db, type), where("timeStamp", "<=", lastMonth), where("timeStamp", ">", previousMonth))
    
      const lastMonthData = await getDocs(lastMonthQuery)
      const previousMonthData = await getDocs(previousMonthQuery)
      setAmount(lastMonthData.docs.length)

      setPercentage(Math.floor((lastMonthData.docs.length - previousMonthData.docs.length) / (previousMonthData.docs.length)*100)) 
      
    }
    
    fetchData()
  })

  return (
    <div className='widget'>
      <div className='left'>
        <div className='title'>{data.title}</div>
        <div className='counter'>{amount} {data.isMoney && "€"}</div>
        <div className='link'>
          <Link to={`/${type}`} style={{textDecoration: "none", color: "inherit"}}>{data.link}</Link>
          </div>
      </div>
      <div className='right'>
        <div className={`percentage ${percentage < 0 ? "negative" : "positive"}`}>
          {percentage < 0 ? <KeyboardArrowDownIcon /> :  <KeyboardArrowUpIcon /> }
         
          {percentage} %
        </div>
        {data.icon}
      </div>
    </div>
  );
}

export default Widget;
