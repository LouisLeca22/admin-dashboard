import "./table.scss"
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import {useTranslation} from "react-i18next"

const List = () => {
  const orders = [
    {
      id: 1143155,
      product: "Acer Nitro 5",
      img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "John Smith",
      date: "01-03-2021",
      amount: 785,
      method: "cash",
      methodName: "Cash",
      status: "Approved",
      statusName: "Approved"
    },
    {
      id: 2235235,
      product: "Playstation 5",
      img: "https://m.media-amazon.com/images/I/31JaiPXYI8L._AC_UY327_FMwebp_QL65_.jpg",
      customer: "Michael Doe",
      date: "03-04-2021",
      amount: 900,
      method: "online",
      methodName: "Online",
      status: "Pending",
      statusName: "Pending"
    },
    {
      id: 2342353,
      product: "Redragon S101",
      img: "https://m.media-amazon.com/images/I/71kr3WAj1FL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "John Smith",
      date: "02-02-2021",
      amount: 35,
      method: "cash",
      methodName: "Cash",
      status: "Pending",
      statusName: "Pending"
    },
    {
      id: 2357741,
      product: "Razer Blade 15",
      img: "https://m.media-amazon.com/images/I/71wF7YDIQkL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "Jane Smith",
      date: "02-03-03",
      amount: 920,
      method: "cash",
      methodName: "Cash",
      status: "Approved",
      statusName: "Approved"
    },
    {
      id: 2342355,
      product: "ASUS ROG Strix",
      img: "https://m.media-amazon.com/images/I/81hH5vK-MCL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "Harold Carol",
      date: "03-04-2021",
      amount: 2000,
      method: "online",
      methodName: "online",
      status: "Pending",
      statusName: "Pending"
    },
  ];

  const {i18n, t} = useTranslation(["table"])
  const [rows, setRows] = useState(orders)

  useEffect(() => {
    setRows(prev => prev.map(row => {
      let newMethod;
      let newStatus;
      switch(row.method){
        case "online":
          newMethod = t("online")
          break;
        case "cash":
          newMethod = t("cash")
          break;
        default: 
          newMethod = row.method 
      }

      switch(row.status){
        case "Approved":
          newStatus = t("approved")
          break;
        case "Pending":
          newStatus = t("pending")
          break;
        default: 
          newStatus = row.status
      }

      return {...row, methodName: newMethod, statusName: newStatus}

    }))
  }, [i18n, t])

  return (
    <TableContainer component={Paper} className="table">
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell className="tableCell">{t("colId")}</TableCell>
          <TableCell className="tableCell">{t("colProduct")}</TableCell>
          <TableCell className="tableCell">{t("colCostumer")}</TableCell>
          <TableCell className="tableCell">{t("colDate")}</TableCell>
          <TableCell className="tableCell">{t("colAmount")}</TableCell>
          <TableCell className="tableCell">{t("colMethod")}</TableCell>
          <TableCell className="tableCell">{t("colStatus")}</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell className="tableCell">{row.id}</TableCell>
            <TableCell className="tableCell">
              <div className="cellWrapper">
                <img src={row.img} alt="" className="image" />
                {row.product}
              </div>
            </TableCell>
            <TableCell className="tableCell">{row.customer}</TableCell>
            <TableCell className="tableCell">{row.date}</TableCell>
            <TableCell className="tableCell">{row.amount}</TableCell>
            <TableCell className="tableCell">{row.methodName}</TableCell>
            <TableCell className="tableCell">
              <span className={`status ${row.status}`}>{row.statusName}</span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  )
}

export default List