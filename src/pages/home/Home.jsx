import Chart from "../../components/chart/Chart"
import Featured from "../../components/featured/Featured"
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import Table from "../../components/table/Table"
import Widget from "../../components/widget/Widget"
import "./home.scss"
import {useTranslation} from "react-i18next"

const Home = () => {
  const {t} = useTranslation(["chart", "table"])

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
          <div className="widgets">
            <Widget type="users"/>
            <Widget type="products"/>
            <Widget type="orders"/>
            <Widget type="deliveries"/>
          </div>
          <div className="charts">
            <Featured />
            <Chart title={t("chart:last")} aspect={2/1} />
          </div>
          <div className="listContainer">
            <div className="listTitle">{t("table:transaction")}</div>
            <Table /> 
          </div>
      </div>
    </div>
  )
}

export default Home