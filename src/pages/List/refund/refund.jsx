import "./refund.css";
import { DataGrid } from "@material-ui/data-grid";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

export default function ProductList() {
  const [tableData, setTableData] = useState([]);
  const [visible, setVisible] = React.useState(false);

  return (
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
      let result = await fetch(
        "http://websitebuild.herokuapp.com/api/shop-owner/show_refund",
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
      setTableData(result?.data);
    }, []),
    (
      <div className="productList2">
        <div>
          <button onClick={() => setVisible(!visible)} className="btnHid">
            {visible ? "Hide Refund" : "Display Refund"}
          </button>
        </div>
        <div className="dataT">
          <DataGrid
            disableSelectiononClick
            rows={tableData}
            columns={[
              { field: "id", headerName: "ID", width: 120 },
              {
                field: "customer id",
                headerName: "Customer id",
                width: 200,
              },
              { field: "order id", headerName: "Order id", width: 150 },
              {
                field: "refund_status",
                headerName: "Status",
                width: 150,
              },
              {
                field: "reason",
                headerName: "Reason",
                width: 200,
              },
              {
                field: "details",
                headerName: "Refund Details",
                width: 200,
              },
              {
                field: "action",
                headerName: "Action",
                width: 130,
                renderCell: (params) => {
                  localStorage.setItem("shipment", params.row.id);
                  return (
                    <>
                      <Link to={"/uprefund/" + params.row.id}>
                        <button className="productListEdit">Edit</button>
                      </Link>
                    </>
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
    )
  );
}
