import "./orderList.css"
import { DataGrid } from "@material-ui/data-grid";
import { Link } from "react-router-dom";
import React,{useState,useEffect} from "react";

export default function ProductList() {
  const [tableData, setTableData] = useState([])
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async()=>{
   let result= await fetch("https://websitebuild.herokuapp.com/api/shop-owner/show-orders", 
      {
        headers:{
          "Content-Type":'application/json',
          "X-Requested-With":'XMLHttpRequest',
          Accept:'application/json',
          "auth-token": localStorage.getItem("user-info")
        }
      }
    );
    result = await result.json()
    
    setTableData(result.data)
  },[])

  const [visible, setVisible] = React.useState(false);

  
  return (
       <div className="productList2">
       <div>
    
          <button onClick={() => setVisible(!visible)} className="btnHid">
          {visible ? "Hide Orders" : "Display Orders"}
        </button>
      </div>
      <div className="dataT">
      <DataGrid
        
        disableSelectiononClick
        rows={tableData}
        columns={[
          { field: "id", headerName: "ID", width: 120 },
          {
            field: "shop_user_id",
            headerName: "User Id",
            width: 150,
            
          },
          { field: "status", headerName: "Status", width: 150 },
          {
            field: "subtotal_price",
            headerName: "Price",
            width: 150,
          },
          {
            field: "shipping_price",
            headerName: "Shipping Price",
            width: 200,
          },
          {
            field: "total_price",
            headerName: "Total price",
            width: 160,
          },
          {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
              return (
                <div>
                  <Link to={"/uporder/" + params.row.id}>
                    <button className="productListEdit">Edit</button>
                  </Link>
                </div>
                
              );
            },
          },
        ]}
        pageSize={visible ? 9 : 0}
        rowsPerPageOptions={[5]}
        checkboxSelection
        
      />
     </div>
    </div>
  );
}

