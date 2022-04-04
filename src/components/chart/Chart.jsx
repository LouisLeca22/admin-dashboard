import "./chart.scss"
import {useTranslation} from "react-i18next"
import {useEffect, useRef, useState} from "react"
import {db} from "../../firebase"
import {
  query,
  collection,
  where,
  getDocs

} from 'firebase/firestore';

import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";




function Chart({title, aspect, user, product}) {
  const {t} = useTranslation(["chart"])
  const [data, setData] = useState([])

  const u = useRef(user).current;
  const p = useRef(product).current;

  useEffect(() => {

    const fetchData = async () => {
      const today = new Date().getFullYear()
      let ref = collection(db, "orders")
      if (u) {
        ref = query(ref, where(...u));
      }
  
      if(p){
        ref = query(ref, where(...p));
      }

      let list = []
      
      const snapShot = await getDocs(ref)
      snapShot.forEach(doc => {
        if(doc.data().timeStamp.toDate().getFullYear() === today){
          list.push(doc.data().timeStamp.toDate().getMonth())
        }
      })
      const occurrences = {}
      for (const num of list){
        occurrences[num] = occurrences[num] ? occurrences[num] + 1 : 1
      }
     

      setData([
        {name: t("feb"), Total: occurrences[1] ? occurrences[1]: 0},
        {name: t("mar"), Total: occurrences[2] ? occurrences[2] : 0},
        {name: t("apr"), Total: occurrences[3] ? occurrences[3]: 0},
        
      ])

    }

    fetchData()

  }, [t, p, u])
  
  

  return (
    <div className="chart">
        <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Chart