import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {useTranslation} from "react-i18next"


const Datatable = () => {
  const [rows, setRows] = useState(userRows);
  const [columns, setColumns] = useState(userColumns)
  const {i18n, t} = useTranslation(["datatable"])


  const handleDelete = (id) => {
    setRows(rows.filter((item) => item.id !== id));
  };

  useEffect(() => {

    setColumns(prev => prev.map((column, index) =>  {
      switch(index){
        case 0:
          return column;
        case 1:
          return {...column, headerName: t("username")}
        case 2: 
          return {...column, headerName: t("email")}
        case 3:
          return {...column, headerName: t("age")}
        case 4:
          return {...column, headerName: t("status")}
        default:
          return column 
      }
    }  ))

    setRows(prev => prev.map(row => {
      switch(row.status){
        case "active":
          return {...row, statusName: t("active")}
        case "pending":
          return {...row, statusName: t("pending")}
        case "passive":
          return {...row, statusName: t("passive")}
        default:
          return row
      }
  }))

  },[i18n, t, setRows])



  const actionColumn = [
    {
      field: "action",
      headerName: t("action"),
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/users/${params.row.id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">{t("view")}</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              {t("delete")}
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {t("title")}
        <Link to="/users/new" className="link">
          {t("add")}
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={rows}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;