export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 180,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "displayName",
    headerName: "DisplayName",
    width: 160,
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
  },
  {
    field: "address",
    headerName: "Address",
    width: 260,
  },
  {
    field: "country",
    headerName: "Country",
    width: 150,
  }
];


export const productColumns = [
  { field: "id", headerName: "ID", width: 200 },
  {
    field: "title",
    headerName: "Title",
    width: 250,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.title}
        </div>
      );
    },
  },
  {
    field: "category",
    headerName: "Category",
    width: 150,
  },
  {
    field: "size",
    headerName: "Size",
    width: 100,
  },
  {
    field: "price",
    headerName: "Price",
    width: 100
  },
  {
    field: "stock",
    headerName: "Stock",
    width: 100,
  }
];


export const orderColumns = [
  { field: "id", headerName: "ID", width: 160 },
  {
    field: "date",
    headerName: "Date",
    width: 160,
    renderCell: (params) => {
      return (
        <div>
          {` ${params.row.timeStamp.toDate().getDate()}/ ${params.row.timeStamp.toDate().getMonth()}/ ${params.row.timeStamp.toDate().getFullYear()}`}
         
        </div>
      );
    },
  },
  {
    field: "client",
    headerName: "Client",
    width: 200,
  },
  {
    field: "product",
    headerName: "Product",
    width: 200,
  },{
    field: "amount",
    headerNAme: "Amount",
  } ,
  {
    field: "method",
    headerName: "Method",
    width: 160,
  },
  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.statusName}
        </div>
      );
    },
  },
  
];


export const deliveryColumns = [
  { field: "id", headerName: "ID", width: 160 },
  {
    field: "date",
    headerName: "Date",
    width: 80,
    renderCell: (params) => {
      return (
        <div>
          {` ${params.row.timeStamp.toDate().getDate()}/ ${params.row.timeStamp.toDate().getMonth()}/ ${params.row.timeStamp.toDate().getFullYear()}`}
         
        </div>
      );
    },
  },
  {
    field: "order",
    headerName: "Order",
    width: 200,
  },
  {
    field: "client",
    headerName: "Client",
    width: 150,
  },
  {
    field: "product",
    headerName: "Product",
    width: 200,
  },{
    field: "amount",
    headerNAme: "Amount",
  } ,
  {
    field: "method",
    headerName: "Method",
    width: 160,
  },
  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.statusName}
        </div>
      );
    },
  },
  
];
