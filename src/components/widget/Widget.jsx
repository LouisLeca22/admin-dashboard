import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import ProductIcon from "@mui/icons-material/Category"
import LocalShippingIcon from "@mui/icons-material/LocalShipping"
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import './widget.scss';
import {useTranslation} from "react-i18next"

function Widget({ type }) {
  const {t} = useTranslation(["widget"])
  let data;

  const amount = 100
  const percentage = 20

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
          isMoney: true,
          link: t("linkDeliveries"),
          icon: (
            <LocalShippingIcon className="icon" style={{color: "purple", backgroundColor: "rgba(128,0,128,0.2)"}}/>
          )
        }
        break;
    default:
      break;
  }

  return (
    <div className='widget'>
      <div className='left'>
        <div className='title'>{data.title}</div>
        <div className='counter'>{amount} {data.isMoney && "€"}</div>
        <div className='link'>{data.link}</div>
      </div>
      <div className='right'>
        <div className='percentage positive'>
          <KeyboardArrowUpIcon />
          {percentage} %
        </div>
        {data.icon}
      </div>
    </div>
  );
}

export default Widget;
