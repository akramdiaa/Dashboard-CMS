import "./discountList.css";
import { DataGrid } from "@material-ui/data-grid";
import { Link } from "react-router-dom";
import React,{useState,useEffect} from "react";

export default function ProductList() {
  const [tableData, setTableData] = useState([])
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async()=>{
   let result= await fetch("http://websitebuild.herokuapp.com/api/shop-owner/show-discounts", 
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
         
          <Link to="/discount">
          <button className="al" href="">
          <span>New Discount</span>
          <div className="wave"></div>
        </button>
          </Link>
          <button onClick={() => setVisible(!visible)} className="btnHid">
          {visible ? "Hide Discount" : "Display Discount"}
        </button>
      </div>
      <div className="dataT">
      <DataGrid
        
        disableSelectiononClick
        rows={tableData}
        columns={[
          { field: "id", headerName: "ID", width: 120 },
          { field: "code", headerName: "Code", width: 170 },
          {
            field: "type",
            headerName: "Type",
            width: 170,
            
          },
          { field: "value", headerName: "Value", width: 150 },
          {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
              return (
                <div>
                  <Link to={"/discount/" + params.row.id}>
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

