import "./chart.scss"
import {useTranslation} from "react-i18next"

import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";




function Chart({title, aspect}) {
  const {t} = useTranslation(["chart"])

  
  const data = [
    { name: t("feb"), Total: 1200 },
    { name: t('mar'), Total: 2100 },
    { name: t("apr"), Total: 800 },
    { name: t("may"), Total: 1600 },
    { name: t("jun"), Total: 900 },
    { name: t("jul"), Total: 1700 },
  ];

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