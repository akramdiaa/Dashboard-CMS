import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";


export default function  ProductList()  {
  const [tableData, setTableData] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    let result = await fetch(
      "http://websitebuild.herokuapp.com/api/shop-owner/show-product",
      {
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          Accept: "application/json",
          "auth-token": localStorage.getItem("user-info"),
        },
      }
    );
    result = await result.json();
    console.log(result)
    setTableData(result.data);
  }, []);
  const [visible, setVisible] = React.useState(false);
  return (
    
    <div className="productList2">
      <div>
        <Link to="/newproduct">
          <button className="al" href="">
            <span>New Product</span>
            <div className="wave"></div>
          </button>
        </Link>
        <button onClick={() => setVisible(!visible)} className="btnHid">
        {visible ? "Hide Products" : "Display Products"}
      </button>
      </div>
      <div className="dataT">
        <DataGrid
        className="table"
          disableSelectiononClick
          rows={tableData}
          columns={[
            { field: "id", headerName: "ID", width: 120 },
            {
              field: "name",
              headerName: "Product",
              width: 200,
            },
            { field: "brand", headerName: "Brand", width: 200 },
            {
              field: "description",
              headerName: "Status",
              width: 150,
            },
            {
              field: "price",
              headerName: "Price",
              width: 160,
            },
            {
              field: "action",
              headerName: "Action",
              width: 150,
              renderCell: (params) => {
                return (
                  <div>
                    <Link to={"/product/" + params.row.id}>
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

