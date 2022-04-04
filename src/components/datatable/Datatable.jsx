import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, productColumns, orderColumns, deliveryColumns } from "../../datatableSource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {useTranslation} from "react-i18next"
import {collection, deleteDoc, doc, onSnapshot} from "firebase/firestore"
import {db} from "../../firebase"

const Datatable = ({type}) => {
  const [data, setData] = useState([]);
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([])
  const {i18n, t} = useTranslation(["datatable"])



  const handleDelete = async (id) => {
      try {
        await deleteDoc(doc(db, type, id))
      } catch (error) {
        console.log(error)
      }
    
  };

  useEffect(() => {
      const unsub = onSnapshot(collection(db, type), (snapShot) => {
        let list = []
        snapShot.docs.forEach(doc => {
          list.push({id: doc.id, ...doc.data()})
        })
        setData(list)
      }, (error => {
        console.log(error)
      }))
    
    return () => {
      unsub()
    } 

  }, [type])


  useEffect(() => {
    if(type === "users"){
      setColumns(userColumns.map((column, index) =>  {
        switch(index){
          case 0:
            return column;
          case 1:
            return {...column, headerName: t("username")}
          case 2: 
            return {...column, headerName: t("displayName")}
          case 3:
            return {...column, headerName: t("email")}
          case 4:
            return {...column, headerName: t("address")}
          case 5:
              return {...column, headerName: t("country")}
          default:
            return column 
        }
      }  ))  
    }

    if (type === "products"){
      setColumns(productColumns.map((column, index) =>  {
        switch(index){
          case 0:
            return column;
          case 1:
            return {...column, headerName: t("title")}
          case 2: 
            return {...column, headerName: t("category")}
          case 3:
            return {...column, headerName: t("size")}
          case 4:
            return {...column, headerName: t("price")}
          case 5: 
            return {...column, headerName: t("stock")}
          default:
            return column 
        }
      }  ))  
    }
    

    if(type === "orders"){
      setColumns(orderColumns.map((column, index) =>  {
        switch(index){
          case 0:
            return column;
          case 1:
            return {...column, headerName: t("date")}
          case 2: 
            return {...column, headerName: t("username")}
          case 3:
            return {...column, headerName: t("title")}
          case 4:
            return {...column, headerName: t("amount")}
          case 5: 
            return {...column, headerName: t("method")}
          case 6:
            return {...column, headerName: t("status")}
          default:
            return column 
        }
      }  ))  
    }


    if(type === "deliveries"){
      setColumns(deliveryColumns.map((column, index) =>  {
        switch(index){
          case 0:
            return column;
          case 1:
            return {...column, headerName: t("date")}
          case 2: 
            return {...column, headerName: t("order")}
          case 3:
            return {...column, headerName: t("username")}
          case 4:
            return {...column, headerName: t("title")}
          case 5: 
            return {...column, headerName: t("amount")}
          case 6:
            return {...column, headerName: t("method")}
          case 7:
            return {...column, headerName: t("status")}
          default:
            return column 
        }
      }  ))  
    }
   
  },[i18n, t, setRows, type])

  useEffect(() => {
    if(type === "orders" || type === "deliveries"){
      setRows(data.map(row => {
        switch(row.status){
          case "approved":
            switch(row.method){
              case "cash":
                return {...row, method: t("cash"), statusName: t("approved")}
              case "online":
                return {...row, method: t("online"), statusName: t("approved")}
              default: 
                return row
            }
          case "pending":
            case "cash":
              return {...row, method: t("cash"), statusName: t("pending")}
            case "online":
              return {...row, method: t("online"), statusName: t("pending")}
          case "undelivered":
            case "cash":
              return {...row, method: t("cash"), statusName: t("undelivered")}
            case "online":
              return {...row, method: t("online"), statusName: t("undelivered")}
          default:
            return row
        }
    }))
    } else {
      setRows(data)
    }
  }, [i18n, t, data, type])



  const actionColumn = [
    {
      field: "action",
      headerName: t("action"),
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/${type}/${params.row.id}`} state={{type}} style={{ textDecoration: "none" }}>
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
          {(type === "users") && (
            <>
            {t("titleUser")}
            </>
          )}
          {(type === "products") && (
            <>
            {t("titleProduct")}
            </>
          )}
          {type === ("users" || "products") && (
               <Link to={`/${type}/new`} className="link">
               {t("add")}
             </Link>
          ) }
       
      </div>
      <DataGrid
        className="datagrid"
        rows={rows}
        columns={type === "users" || type === "products" ? columns.concat(actionColumn) : columns}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;